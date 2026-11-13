import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto("http://localhost:8080/animations/motion-lab/index.html");
await page.waitForTimeout(2100);
const results = {};
results.pins = await page.locator(".pin-spacer").count();
for (const id of [
  "ml-depth",
  "ml-words",
  "ml-path",
  "ml-layout",
  "ml-play",
  "ml-images",
  "ml-particles",
  "ml-finish",
]) {
  await page
    .locator(`#${id}`)
    .evaluate((el) =>
      window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 90),
    );
  await page.waitForTimeout(id === "ml-path" ? 3200 : 1000);
  await page.screenshot({ path: `animations/motion-lab/checks/${id}.png` });
}
await page
  .locator("#ml-interface")
  .evaluate((el) =>
    window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top),
  );
await page.locator("[data-next]").click();
await page.waitForTimeout(800);
results.playingSlider = await page.locator("[data-slide-status]").innerText();
const slides = page.locator(".ml-slides");
await slides.dispatchEvent("pointerdown", { clientX: 400, clientY: 300 });
await slides.dispatchEvent("pointerup", { clientX: 200, clientY: 300 });
await page.waitForTimeout(800);
results.swipe = await page.locator("[data-slide-status]").innerText();
await page.locator(".ml-puck").scrollIntoViewIfNeeded();
const puck = await page.locator(".ml-puck").boundingBox();
await page.mouse.move(puck.x + 50, puck.y + 50);
await page.mouse.down();
await page.mouse.move(puck.x + 170, puck.y + 100, { steps: 12 });
await page.mouse.up();
await page.waitForTimeout(1500);
results.drag = await page
  .locator(".ml-puck")
  .evaluate((el) => getComputedStyle(el).transform);
await page.locator("[data-launch]").click();
await page.waitForTimeout(500);
results.projectile = await page.locator(".ml-projectile").getAttribute("style");
await page
  .locator("#ml-particles")
  .evaluate((el) =>
    window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - 76),
  );
await page.waitForTimeout(800);
await page.evaluate(() => {
  window.motionLongTasks = [];
  new PerformanceObserver((list) =>
    window.motionLongTasks.push(
      ...list.getEntries().map((entry) => entry.duration),
    ),
  ).observe({ type: "longtask" });
});
const client = await page.context().newCDPSession(page);
const trace = [];
client.on("Tracing.dataCollected", (event) => trace.push(...event.value));
await client.send("Tracing.start", {
  categories: "devtools.timeline",
  options: "record-as-much-as-possible",
});
await page.waitForTimeout(2500);
const complete = new Promise((resolve) =>
  client.once("Tracing.tracingComplete", resolve),
);
await client.send("Tracing.end");
await complete;
results.longTasks = await page.evaluate(() => window.motionLongTasks);
await writeFile(
  "animations/motion-lab/checks/performance-trace.json",
  JSON.stringify({ traceEvents: trace }),
);
await page.locator("[data-pause]").click();
const before = await page.locator("canvas").evaluate((el) => el.toDataURL());
await page.waitForTimeout(500);
results.canvasPaused =
  before === (await page.locator("canvas").evaluate((el) => el.toDataURL()));
results.errors = errors;
await writeFile(
  "animations/motion-lab/checks/motion-results.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
await browser.close();
