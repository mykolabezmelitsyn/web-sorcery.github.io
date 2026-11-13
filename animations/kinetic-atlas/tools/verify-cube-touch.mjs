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
await send("Emulation.setDeviceMetricsOverride", {
  width: 375,
  height: 667,
  deviceScaleFactor: 1,
  mobile: true,
});
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
});
await send("Emulation.setTouchEmulationEnabled", {
  enabled: true,
  maxTouchPoints: 1,
});
await send("Page.navigate", {
  url: "http://localhost:8080/animations/kinetic-atlas/index.html",
});
await waitFor(
  'document.querySelector(".gsap-container")?.dataset.ready === "true"',
);
await evaluate(
  'document.querySelector(".atlas-cube-stage").scrollIntoView({block:"center",behavior:"instant"})',
);
await delay(400);
const point = await evaluate(`(() => {
  const rect=document.querySelector('.atlas-cube').getBoundingClientRect();
  return {x:rect.left+rect.width/2,y:rect.top+rect.height/2};
})()`);
const before = await evaluate(
  'Number(gsap.getProperty(document.querySelector(".atlas-cube"),"rotationY"))',
);
await send("Input.dispatchTouchEvent", {
  type: "touchStart",
  touchPoints: [point],
});
for (let step = 1; step <= 5; step++) {
  await send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: point.x + step * 12, y: point.y }],
  });
  await delay(30);
}
await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
await delay(600);
const after = await evaluate(
  'Number(gsap.getProperty(document.querySelector(".atlas-cube"),"rotationY"))',
);
assert.ok(after - before > 25);
assert.deepEqual(errors, []);
await screenshot("cube-mobile");
const result = { touchRotation: true, before, after, errors, warnings };
await fs.writeFile(
  new URL("cube-touch.json", out),
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify(result));
await send("Emulation.setTouchEmulationEnabled", { enabled: false });
socket.close();
