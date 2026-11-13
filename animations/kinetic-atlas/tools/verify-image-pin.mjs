import fs from "node:fs/promises";
import assert from "node:assert/strict";
process.on("uncaughtException", (error) => {
  console.error(
    error.message,
    error.code || error.name,
    error.stack
      .split("\n")
      .filter((line) => line.trim().startsWith("at "))
      .join("\n"),
  );
  process.exit(1);
});
const out = new URL("../checks/", import.meta.url);
const tabs = await (await fetch("http://localhost:9223/json")).json();
const socket = new WebSocket(
  tabs.find((t) => t.type === "page").webSocketDebuggerUrl,
);
await new Promise((resolve) =>
  socket.addEventListener("open", resolve, { once: true }),
);
let serial = 0;
const pending = new Map(),
  errors = [],
  warnings = [];
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const item = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) item.reject(new Error(JSON.stringify(message.error)));
    else item.resolve(message.result);
  }
  if (message.method === "Runtime.exceptionThrown")
    errors.push(
      message.params.exceptionDetails.text +
        ": " +
        (message.params.exceptionDetails.exception?.description || ""),
    );
  if (
    message.method === "Runtime.consoleAPICalled" &&
    ["error", "warning"].includes(message.params.type)
  ) {
    (message.params.type === "error" ? errors : warnings).push(
      message.params.args.map((a) => a.value || a.description).join(" "),
    );
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++serial;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails)
    throw new Error(
      result.exceptionDetails.exception?.description ||
        result.exceptionDetails.text,
    );
  return result.result.value;
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitFor(expression) {
  for (let i = 0; i < 600; i++) {
    if (await evaluate(expression)) return;
    await delay(30);
  }
  throw new Error("Timed out waiting for " + expression);
}
async function screenshot(name, clip) {
  const { data } = await send("Page.captureScreenshot", {
    format: "png",
    ...(clip ? { clip: { ...clip, scale: 1 } } : {}),
  });
  if (name)
    await fs.writeFile(
      new URL(name + ".png", out),
      Buffer.from(data, "base64"),
    );
  return data;
}
await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setTouchEmulationEnabled", { enabled: false });
const checks = [];
for (const [name, width, height, url] of [
  [
    "image-pin-mobile",
    375,
    667,
    "http://localhost:8080/animations/kinetic-atlas/index.html",
  ],
  [
    "image-pin-tablet",
    768,
    1024,
    "http://localhost:8080/animations/kinetic-atlas/index.html",
  ],
  [
    "image-pin-desktop",
    1440,
    900,
    "http://localhost:8080/animations/kinetic-atlas/index.html",
  ],
  [
    "image-pin-integrated",
    1440,
    900,
    "http://localhost:8080/gsap-animations.html",
  ],
]) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
  });
  await send("Page.navigate", { url });
  await waitFor(
    'document.querySelector(".gsap-container")?.dataset.ready === "true"',
  );
  await delay(300);
  const range = await evaluate(`(() => {
    const trigger=ScrollTrigger.getAll().find(item=>item.trigger?.classList.contains('atlas-image-frame'));
    return {start:trigger.start,end:trigger.end};
  })()`);
  const states = [];
  for (const progress of [0.05, 0.5, 0.95, 0.5]) {
    await evaluate(
      `window.scrollTo({top:${range.start}+${range.end - range.start}*${progress},behavior:'instant'});ScrollTrigger.update()`,
    );
    await delay(150);
    const state = await evaluate(`(() => {
      const frame=document.querySelector('.atlas-image-frame');
      const rect=frame.getBoundingClientRect();
      return {center:rect.top+rect.height/2,viewport:innerHeight/2,scale:Number(gsap.getProperty(document.querySelector('.atlas-image-art'),'scaleX'))};
    })()`);
    assert.ok(
      Math.abs(state.center - state.viewport) < 2,
      JSON.stringify({ name, progress, state }),
    );
    states.push(state);
    if (progress === 0.5) await screenshot(name);
  }
  assert.ok(
    states[0].scale > states[1].scale && states[1].scale > states[2].scale,
  );
  assert.ok(Math.abs(states[1].scale - states[3].scale) < 0.001);
  await evaluate(
    `window.scrollTo({top:${range.end + 100},behavior:'instant'});ScrollTrigger.update()`,
  );
  await delay(150);
  assert.equal(
    await evaluate(
      'getComputedStyle(document.querySelector(".atlas-image-frame")).position === "fixed"',
    ),
    false,
  );
  checks.push({
    name,
    centeredThroughout: true,
    scales: true,
    reversible: true,
    releases: true,
    states,
  });
}
await send("Page.navigate", {
  url: "http://localhost:8080/animations/kinetic-atlas/index.html",
});
await waitFor(
  'document.querySelector(".gsap-container")?.dataset.ready === "true"',
);
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await delay(400);
assert.equal(
  await evaluate(
    'ScrollTrigger.getAll().some(item=>item.trigger?.classList.contains("atlas-image-frame"))',
  ),
  false,
);
const cleanup = await evaluate(`(async () => {
  const module=await import('/animations/kinetic-atlas/showcase.js');
  module.getAnimation(document.querySelector('.gsap-container')).destroy();
  return ScrollTrigger.getAll().length;
})()`);
assert.equal(cleanup, 0);
assert.deepEqual(errors, []);
assert.deepEqual(warnings, []);
const result = {
  checks,
  reducedMotionUnpinned: true,
  cleanupTriggers: cleanup,
  errors,
  warnings,
};
await fs.writeFile(
  new URL("image-pin-results.json", out),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(result));
socket.close();
