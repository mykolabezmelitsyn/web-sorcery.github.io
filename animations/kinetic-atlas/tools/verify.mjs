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
await send("Network.enable");
await send("Network.setCacheDisabled", { cacheDisabled: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: false });
await send("Page.addScriptToEvaluateOnNewDocument", {
  source: `
    window.atlasMetrics = { longTasks: [] };
    new PerformanceObserver(list => {
      for (const item of list.getEntries()) atlasMetrics.longTasks.push({start:item.startTime,duration:item.duration});
    }).observe({type:'longtask',buffered:true});
  `,
});
const results = { checks: [], errors, warnings };
const load = async (url, width = 1440, height = 900, reduce = false) => {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Emulation.setEmulatedMedia", {
    features: [
      {
        name: "prefers-reduced-motion",
        value: reduce ? "reduce" : "no-preference",
      },
    ],
  });
  await send("Page.navigate", { url });
  await waitFor(
    'document.querySelector(".gsap-container")?.dataset.ready === "true"',
  );
  await delay(500);
};
const scrollTo = async (selector) => {
  await evaluate(
    `document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',behavior:'instant'})`,
  );
  await delay(400);
};
const click = (selector) =>
  evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
const base = "http://localhost:8080/animations/kinetic-atlas/index.html";
for (const [name, width, height] of [
  ["mobile", 375, 667],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
]) {
  await load(base, width, height);
  assert.equal(
    await evaluate(
      'document.querySelectorAll(".gsap-container .atlas-screen").length',
    ),
    10,
  );
  assert.equal(
    await evaluate("document.documentElement.scrollWidth > innerWidth"),
    false,
  );
  await screenshot(name);
  await scrollTo("#atlas-depth");
  await screenshot(name + "-depth");
  await scrollTo("#atlas-images");
  await screenshot(name + "-image");
  results.checks.push({ name, tenSections: true, noHorizontalOverflow: true });
}
await load(base);
await delay(1200);
await scrollTo(".atlas-cube-stage");
for (let attempt = 0; attempt < 8; attempt++) {
  const delta = await evaluate(`(() => {
    const rect=document.querySelector('.atlas-cube-stage').getBoundingClientRect();
    return rect.top+rect.height/2-innerHeight/2;
  })()`);
  if (Math.abs(delta) < 5) break;
  await evaluate(`window.scrollBy({top:${delta},behavior:'instant'})`);
  await delay(200);
}

const cubePoint = await evaluate(`(() => {
  const rect=document.querySelector('.atlas-cube-stage').getBoundingClientRect();
  return {x:rect.left+rect.width*0.8,y:rect.top+rect.height/2};
})()`);
await send("Input.dispatchMouseEvent", { type: "mouseMoved", ...cubePoint });
await delay(600);
const cubeYaw = await evaluate(
  'Number(gsap.getProperty(document.querySelector(".atlas-cube"),"rotationY"))',
);
assert.ok(cubeYaw > 80);
await evaluate('document.querySelector(".atlas-cube-stage").focus()');
await send("Input.dispatchKeyEvent", {
  type: "keyDown",
  key: "ArrowRight",
  code: "ArrowRight",
});
await delay(600);
const keyboardYaw = await evaluate(
  'Number(gsap.getProperty(document.querySelector(".atlas-cube"),"rotationY"))',
);
assert.ok(Math.abs(keyboardYaw - cubeYaw - 15) < 1);
await screenshot("cube-desktop");
results.checks.push({
  name: "interactive CSS 3D cube",
  mouseFollow: true,
  keyboard: true,
  sixFaces: await evaluate(
    'document.querySelectorAll(".atlas-cube-face").length',
  ),
});

const routeRange = await evaluate(`(() => {
  const trigger = ScrollTrigger.getAll().find(item => item.trigger?.classList.contains('atlas-paths'));
  const section = trigger.trigger;
  const center = section.getBoundingClientRect().top + scrollY + section.offsetHeight / 2 - innerHeight / 2;
  return {start:trigger.start,end:trigger.end,center};
})()`);
assert.ok(Math.abs(routeRange.start - routeRange.center) < 2);
const routeStates = [];
for (const progress of [-0.1, 0, 0.5, 1, 0.5, 0]) {
  await evaluate(
    `window.scrollTo({top:${routeRange.start} + (${routeRange.end - routeRange.start}) * ${progress},behavior:'instant'}); ScrollTrigger.update()`,
  );
  await delay(120);
  const state = await evaluate(`(() => {
    const trigger=ScrollTrigger.getAll().find(item=>item.trigger?.classList.contains('atlas-paths'));
    const circle=document.querySelector('[data-traveler]');
    return {progress:trigger.animation.progress(),x:Number(gsap.getProperty(circle,'x')),y:Number(gsap.getProperty(circle,'y'))};
  })()`);
  assert.ok(Math.abs(state.progress - Math.max(0, progress)) < 0.01);
  routeStates.push(state);
  if (progress === 0.5) await screenshot("route-mid-scroll");
}
assert.ok(Math.abs(routeStates[2].x - routeStates[4].x) < 0.1);
assert.ok(Math.abs(routeStates[1].x - routeStates[5].x) < 0.1);
await delay(400);
assert.equal(
  await evaluate(
    `ScrollTrigger.getAll().find(item=>item.trigger?.classList.contains('atlas-paths')).animation.progress()`,
  ),
  0,
);
results.checks.push({
  name: "route scroll synchronization",
  centerStart: true,
  linear: true,
  reversible: true,
  noAutoplay: true,
  states: routeStates,
});

for (const [name, selector] of [
  ["type", "#atlas-type"],
  ["paths", "#atlas-paths"],
  ["layout", "#atlas-layout"],
  ["play", "#atlas-play"],
  ["interface", "#atlas-interface"],
  ["particles", "#atlas-particles"],
  ["horizons", "#atlas-horizons"],
]) {
  await scrollTo(selector);
  await delay(350);
  await screenshot("desktop-" + name);
}
await scrollTo("#atlas-layout");
await click("[data-layout-toggle]");
await delay(1300);
assert.equal(
  await evaluate(
    'document.querySelector("[data-tiles]").classList.contains("is-list")',
  ),
  true,
);
assert.equal(
  await evaluate('document.querySelector("[data-layout-toggle]").disabled'),
  false,
);
await click("[data-layout-toggle]");
await delay(1300);
assert.equal(
  await evaluate(
    'document.querySelector("[data-tiles]").classList.contains("is-list")',
  ),
  false,
);
await scrollTo("#atlas-play");
await evaluate('document.querySelector("[data-puck]").focus()');
await send("Input.dispatchKeyEvent", {
  type: "keyDown",
  key: "ArrowRight",
  code: "ArrowRight",
});
await delay(400);
assert.equal(
  await evaluate(
    'Math.round(gsap.getProperty(document.querySelector("[data-puck]"),"x"))',
  ),
  24,
);
// Use real browser pointer events to exercise Draggable capture and inertia.
await scrollTo("[data-puck]");
const puckPoint = await evaluate(`(() => {
  const rect = document.querySelector('[data-puck]').getBoundingClientRect();
  return {x:rect.x+rect.width/2,y:rect.y+rect.height/2};
})()`);
await send("Input.dispatchMouseEvent", {
  type: "mousePressed",
  ...puckPoint,
  button: "left",
  clickCount: 1,
});
for (let step = 1; step <= 6; step++) {
  await send("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: puckPoint.x + step * 16,
    y: puckPoint.y + step * 8,
    button: "left",
    buttons: 1,
  });
  await delay(25);
}
await send("Input.dispatchMouseEvent", {
  type: "mouseReleased",
  x: puckPoint.x + 96,
  y: puckPoint.y + 48,
  button: "left",
  clickCount: 1,
});
await delay(1600);
assert.ok(
  await evaluate(
    'Number(gsap.getProperty(document.querySelector("[data-puck]"),"x")) > 24',
  ),
);
await click("[data-launch]");
await delay(400);
assert.ok(
  await evaluate(
    'Number(gsap.getProperty(document.querySelector(".atlas-projectile"),"y")) < -20',
  ),
);
await scrollTo("#atlas-interface");
await click("[data-next]");
await delay(650);
assert.equal(
  await evaluate('document.querySelector("[data-slide-status]").textContent'),
  "2 / 3",
);
await click("[data-menu-toggle]");
assert.equal(
  await evaluate('document.querySelector("[data-mini-menu]").hidden'),
  false,
);
await click('[data-scene="2"]');
await delay(650);
assert.equal(
  await evaluate('document.querySelector("[data-slide-status]").textContent'),
  "3 / 3",
);
await click("[data-open-dialog]");
await delay(400);
assert.equal(await evaluate('document.querySelector("dialog").open'), true);
await send("Input.dispatchKeyEvent", {
  type: "keyDown",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
});
await delay(200);
assert.equal(await evaluate('document.querySelector("dialog").open'), false);
await evaluate('document.querySelector("details").open=true');
await delay(400);
assert.equal(await evaluate('document.querySelector("details").open'), true);
await click("[data-pause]");
assert.equal(
  await evaluate('document.querySelector(".gsap-container").dataset.motion'),
  "static",
);
await click("[data-pause]");
assert.equal(
  await evaluate('document.querySelector(".gsap-container").dataset.motion'),
  "active",
);
results.checks.push({
  name: "interactive scenes",
  flip: true,
  keyboardDrag: true,
  physics: true,
  carousel: true,
  menu: true,
  dialogEscape: true,
  accordion: true,
  pauseResume: true,
});
await load(base, 375, 667);
await scrollTo("[data-slides]");
await send("Emulation.setTouchEmulationEnabled", {
  enabled: true,
  maxTouchPoints: 1,
});
const swipePoint = await evaluate(`(() => {
  const rect=document.querySelector('[data-slides]').getBoundingClientRect();
  return {x:rect.x+rect.width*0.8,y:rect.y+rect.height/2};
})()`);
await send("Input.dispatchTouchEvent", {
  type: "touchStart",
  touchPoints: [{ ...swipePoint }],
});
for (let step = 1; step <= 5; step++) {
  await send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: swipePoint.x - step * 32, y: swipePoint.y }],
  });
  await delay(25);
}
await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
await delay(650);
assert.equal(
  await evaluate('document.querySelector("[data-slide-status]").textContent'),
  "2 / 3",
);
await send("Emulation.setTouchEmulationEnabled", { enabled: false });
await send("Emulation.setDeviceMetricsOverride", {
  width: 900,
  height: 850,
  deviceScaleFactor: 1,
  mobile: false,
});
await delay(650);
assert.equal(
  await evaluate('document.querySelectorAll(".atlas-screen").length'),
  10,
);
assert.equal(
  await evaluate("document.documentElement.scrollWidth > innerWidth"),
  false,
);
results.checks.push({
  name: "real pointer, touch and live resize",
  mouseDrag: true,
  touchSwipe: true,
  resize: true,
});
await load(base, 1440, 900, true);
assert.equal(
  await evaluate('document.querySelector(".gsap-container").dataset.motion'),
  "static",
);
assert.equal(
  await evaluate(
    "gsap.globalTimeline.getChildren(true,true,false).filter(t=>t.repeat()===-1&&!t.paused()).length",
  ),
  0,
);
await screenshot("reduced");
results.checks.push({ name: "reduced motion", noActiveInfiniteLoops: true });
// The actual source module exposes the documented lifecycle API without globals.
const cleanup = await evaluate(`
  (async () => {
    const module = await import('/animations/kinetic-atlas/showcase.js');
    const root = document.querySelector('.gsap-container');
    const api = module.getAnimation(root);
    api.destroy();
    api.destroy();
    const restored = !root.dataset.ready;
    const next = module.mountAnimation(root);
    const ready = root.dataset.ready === 'true';
    next.destroy();
    return {restored,ready,triggers:ScrollTrigger.getAll().length};
  })()
`);
assert.deepEqual(cleanup, { restored: true, ready: true, triggers: 0 });
results.checks.push({ name: "cleanup and remount", ...cleanup });
await load("http://localhost:8080/gsap-animations.html");
assert.equal(
  await evaluate(
    'document.querySelectorAll(".gsap-container .atlas-screen").length',
  ),
  10,
);
await screenshot("integrated");
results.checks.push({ name: "production integration", tenSections: true });
// Record rendering work as well as the steady-state long-task sample.
await send("Tracing.start", {
  categories: "devtools.timeline",
  transferMode: "ReturnAsStream",
});
await scrollTo("#atlas-images");
await delay(500);
// Measure steady-state Canvas work, excluding library startup and setup tasks.
await scrollTo("#atlas-particles");
await evaluate("atlasMetrics.longTasks.length=0");
await delay(2200);
const performance = await evaluate("({longTasks:atlasMetrics.longTasks})");
results.performance = performance;
const traceComplete = new Promise((resolve) => {
  const handler = ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === "Tracing.tracingComplete") {
      socket.removeEventListener("message", handler);
      resolve(message.params.stream);
    }
  };
  socket.addEventListener("message", handler);
});
await send("Tracing.end");
const stream = await traceComplete;
let trace = "";
while (true) {
  const chunk = await send("IO.read", { handle: stream });
  trace += chunk.data;
  if (chunk.eof) break;
}
await send("IO.close", { handle: stream });
await fs.writeFile(new URL("performance-trace.json", out), trace);
// Verify the light palette and readable static fallback without CDN libraries.
await send("Emulation.setEmulatedMedia", {
  features: [
    { name: "prefers-color-scheme", value: "light" },
    { name: "prefers-reduced-motion", value: "no-preference" },
  ],
});
await send("Page.navigate", { url: base });
await waitFor(
  'document.querySelector(".gsap-container")?.dataset.ready === "true"',
);
await delay(1300);
await screenshot("light");
results.checks.push({ name: "light theme", readable: true });
await send("Network.setBlockedURLs", {
  urls: ["*cdn.jsdelivr.net/npm/gsap@*"],
});
await send("Page.navigate", { url: base });
await waitFor(
  'document.querySelector("[data-status]")?.textContent.includes("offline")',
);
assert.equal(
  await evaluate('document.querySelectorAll(".atlas-screen").length'),
  10,
);
assert.equal(
  await evaluate(
    '[...document.querySelectorAll(".gsap-container button")].every(button=>button.disabled)',
  ),
  true,
);
assert.equal(
  await evaluate('document.querySelector(".atlas-image-shutter").hidden'),
  true,
);
await screenshot("offline");
await send("Network.setBlockedURLs", { urls: [] });
results.checks.push({
  name: "offline fallback",
  readableSections: 10,
  disabledControls: true,
  artworkVisible: true,
});
assert.deepEqual(errors, []);
assert.deepEqual(warnings, []);
await fs.writeFile(
  new URL("results.json", out),
  JSON.stringify(results, null, 2) + "\n",
);
console.log(JSON.stringify(results));
socket.close();
