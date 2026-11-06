import fs from "node:fs/promises";
import assert from "node:assert/strict";
process.on("uncaughtException", (error) => {
  console.error(
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
// Isolate cube input from the full-page Soldier overlay.
await send("Page.addScriptToEvaluateOnNewDocument", {
  source: `new MutationObserver(() => document.querySelector('#webgl-soldier')?.remove()).observe(document, {childList:true,subtree:true});`,
});
await send("Network.enable");
await send("Network.setCacheDisabled", { cacheDisabled: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: false });
await send("Input.dispatchMouseEvent", {
  type: "mouseReleased",
  x: 0,
  y: 0,
  button: "left",
  clickCount: 1,
});
const results = { checks: [], errors, warnings };
for (const [name, width, height] of [
  ["mobile", 375, 667],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
]) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", {
    url: "http://localhost:8080/gsap-animations.html",
  });
  await waitFor(
    'window.gsap && document.querySelector("[data-cube-refresh]").disabled === false',
  );
  await evaluate(
    'document.querySelector(".motion-cube-stage").scrollIntoView({block:"center",behavior:"instant"})',
  );
  await delay(500);
  const point = await evaluate(`(() => {
    const r = document.querySelector('[data-cube]').getBoundingClientRect();
    return {x:r.x+r.width/2,y:r.y+r.height/2};
  })()`);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", ...point });
  await send("Input.dispatchMouseEvent", {
    type: "mousePressed",
    ...point,
    button: "left",
    clickCount: 1,
  });
  assert.equal(
    await evaluate(
      'document.querySelector("[data-cube]").classList.contains("is-dragging")',
    ),
    true,
  );
  const before = await evaluate(
    'Number(gsap.getProperty(document.querySelector("[data-cube]"),"rotationY"))',
  );
  await send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: point.x + 40,
    y: point.y + 20,
    button: "left",
    buttons: 1,
  });
  const after = await evaluate(
    'Number(gsap.getProperty(document.querySelector("[data-cube]"),"rotationY"))',
  );
  assert.ok(Math.abs(after - before - 20) < 0.1);
  await send("Input.dispatchMouseEvent", {
    type: "mouseReleased",
    x: point.x + 40,
    y: point.y + 20,
    button: "left",
    clickCount: 1,
  });
  await delay(400);
  assert.equal(
    await evaluate(
      'Number(gsap.getProperty(document.querySelector("[data-cube]"),"rotationY"))',
    ),
    after,
  );
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "ArrowRight",
    code: "ArrowRight",
  });
  assert.ok(
    Math.abs(
      (await evaluate(
        'Number(gsap.getProperty(document.querySelector("[data-cube]"),"rotationY"))',
      )) -
        after -
        15,
    ) < 0.1,
  );
  await screenshot(name);
  results.checks.push({
    name,
    drag: true,
    holdsAfterRelease: true,
    keyboard: true,
  });
}
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
await delay(500);
const still = await evaluate(
  'getComputedStyle(document.querySelector("[data-cube]")).transform',
);
await delay(300);
assert.equal(
  await evaluate(
    'getComputedStyle(document.querySelector("[data-cube]")).transform',
  ),
  still,
);
await screenshot("reduced");
results.checks.push({ name: "reduced motion", static: true });
assert.deepEqual(errors, []);
await fs.writeFile(
  new URL("results.json", out),
  JSON.stringify(results, null, 2) + "\n",
);
console.log(JSON.stringify(results));
await send("Emulation.setEmulatedMedia", { features: [] });
socket.close();
