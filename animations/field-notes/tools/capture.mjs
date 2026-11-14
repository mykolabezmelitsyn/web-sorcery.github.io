import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  chromiumSandbox: true,
});
const base = ".reanimate/field-notes/clone-4";
await mkdir(base, { recursive: true });
const records = [];
for (const [name, scene] of [
  ["cursor-driven-perspective-tilt", "tilt"],
  ["scrubbed-bento-gallery", "fn-bento"],
  ["image-mask-on-scroll", "fn-mask"],
  ["horizontal-text", "fn-wave"],
  ["horizontal-scrolling-gallery", "fn-gallery"],
  ["flip-carousel", "flip"],
]) {
  const directory = `${base}/${name}`;
  await mkdir(directory, { recursive: true });
  const context = await browser.newContext({
    viewport: { width: 1500, height: 844 },
    recordVideo: { dir: directory, size: { width: 1500, height: 844 } },
  });
  const page = await context.newPage();
  await page.goto("http://localhost:8080/animations/field-notes/index.html");
  await page.locator(".fn-bento-tile img").evaluateAll(async (images) => {
    await Promise.all(images.map((image) => image.decode()));
  });
  await page.waitForTimeout(500);
  const samples = [];
  if (scene.startsWith("fn-")) {
    const range = await page.evaluate(async (id) => {
      const { ScrollTrigger } =
        await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
      const trigger = ScrollTrigger.getById(id);
      return { start: trigger.start, end: trigger.end };
    }, scene);
    for (let index = 0; index <= 50; index++) {
      const progress = index / 50;
      await page.evaluate(
        (y) => scrollTo(0, y),
        range.start + (range.end - range.start) * progress,
      );
      await page.waitForTimeout(40);
      if ([0, 25, 50].includes(index)) {
        await page.screenshot({ path: `${directory}/state-${index / 25}.png` });
        const state = await page.evaluate(async (id) => {
          const { ScrollTrigger } =
            await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
          const trigger = ScrollTrigger.getById(id);
          return {
            progress: trigger.progress,
            pinY: trigger.trigger.getBoundingClientRect().y,
            navY: document.querySelector(".fn-nav").getBoundingClientRect().y,
          };
        }, scene);
        samples.push(state);
      }
    }
    for (let index = 50; index >= 0; index -= 2) {
      await page.evaluate(
        (y) => scrollTo(0, y),
        range.start + ((range.end - range.start) * index) / 50,
      );
      await page.waitForTimeout(30);
    }
    records.push({ name, range, samples });
  } else if (scene === "tilt") {
    const bounds = await page.locator(".fn-tilt-stage").boundingBox();
    for (const [index, x, y] of [
      [0, 0.5, 0.5],
      [1, 0.9, 0.1],
      [2, 0.1, 0.9],
    ]) {
      await page.mouse.move(
        bounds.x + bounds.width * x,
        bounds.y + bounds.height * y,
        { steps: 12 },
      );
      await page.waitForTimeout(600);
      await page.screenshot({ path: `${directory}/state-${index}.png` });
      samples.push(await page.locator(".fn-tilt-card").getAttribute("style"));
    }
    records.push({ name, samples });
  } else {
    await page
      .locator(".fn-saved")
      .evaluate((el) =>
        scrollTo(0, scrollY + el.getBoundingClientRect().top - 76),
      );
    await page.waitForTimeout(300);
    await page.locator("[data-prev]").scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${directory}/state-0.png` });
    await page.locator("[data-prev]").click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${directory}/state-1.png` });
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${directory}/state-2.png` });
    records.push({
      name,
      duration: 0.65,
      order: await page
        .locator(".fn-carousel > .fn-note")
        .evaluateAll((cards) => cards.map((card) => card.dataset.note)),
    });
  }
  await context.close();
}
// Separate performance sample without video/screenshot work during measured playback.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8080/animations/field-notes/index.html");
await page.waitForTimeout(700);
const range = await page.evaluate(async () => {
  const { ScrollTrigger } =
    await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
  const trigger = ScrollTrigger.getById("fn-mask");
  scrollTo(0, trigger.start);
  return { start: trigger.start, end: trigger.end };
});
await page.waitForTimeout(300);
await page.evaluate(() => {
  window.checkLongTasks = [];
  new PerformanceObserver((list) =>
    window.checkLongTasks.push(
      ...list.getEntries().map((entry) => entry.duration),
    ),
  ).observe({ type: "longtask" });
});
const client = await page.context().newCDPSession(page);
const events = [];
client.on("Tracing.dataCollected", (event) => events.push(...event.value));
await client.send("Tracing.start", {
  categories: "devtools.timeline",
  options: "record-as-much-as-possible",
});
for (let index = 0; index <= 100; index++) {
  await page.evaluate(
    (y) => scrollTo(0, y),
    range.start + ((range.end - range.start) * index) / 100,
  );
  await page.waitForTimeout(20);
}
const complete = new Promise((resolve) =>
  client.once("Tracing.tracingComplete", resolve),
);
await client.send("Tracing.end");
await complete;
const longTasks = await page.evaluate(() => window.checkLongTasks);
await writeFile(
  "animations/field-notes/checks/performance-trace.json",
  JSON.stringify({ traceEvents: events }),
);
await writeFile(
  "animations/field-notes/checks/capture-results.json",
  JSON.stringify(
    {
      records,
      longTasks,
      viewport: [1500, 844],
      note: "Reference timings cannot be measured against scroll progress without source scroll telemetry; snapshots compare behavior and adapted states.",
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    { capturedScenes: records.length, longTasks, records },
    null,
    2,
  ),
);
await browser.close();
