import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  chromiumSandbox: true,
});
const results = [];
const errors = [];
for (const [width, height] of [
  [375, 667],
  [768, 1024],
  [1440, 900],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://localhost:8080/animations/field-notes/index.html");
  await page.waitForTimeout(500);
  assert.equal(await page.locator("[data-curve]").count(), 0);
  const range = await page.evaluate(async () => {
    const { ScrollTrigger } =
      await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
    const trigger = ScrollTrigger.getById("fn-curve");
    return {
      start: trigger.start,
      end: trigger.end,
      maxScroll: ScrollTrigger.maxScroll(window),
    };
  });
  assert.ok(
    range.end <= range.maxScroll + 1,
    "The end of the footer sequence must be reachable.",
  );
  const samples = [];
  for (const progress of [0, 0.1, 0.5, 0.9, 1, 0.5, 0.1]) {
    await page.evaluate(
      (y) => scrollTo(0, y),
      range.start + (range.end - range.start) * progress,
    );
    await page.waitForTimeout(120);
    const sample = await page.locator(".fn-footer").evaluate((footer) => ({
      value: Number(footer.dataset.curveProgress),
      path: footer.querySelector("[data-curve-path]").getAttribute("d"),
      top: footer.getBoundingClientRect().top,
    }));
    samples.push({ progress, ...sample });
    if (width === 1440 && [0.1, 0.5, 0.9].includes(progress))
      await page.screenshot({
        path: `animations/field-notes/checks/curve-scroll-${progress}.png`,
      });
  }
  assert.ok(samples[1].value > 0 && samples[1].value < 1);
  assert.ok(samples[2].value > 0.99);
  assert.ok(samples[3].value > 0 && samples[3].value < 1);
  assert.ok(samples[4].value < 0.01);
  assert.ok(Math.abs(samples[1].value - samples[6].value) < 0.01);
  const idlePath = await page.locator("[data-curve-path]").getAttribute("d");
  await page.waitForTimeout(250);
  assert.equal(
    await page.locator("[data-curve-path]").getAttribute("d"),
    idlePath,
  );
  await page.locator("[data-pause]").evaluate((button) => button.click());
  assert.equal(
    await page.locator(".fn-footer").getAttribute("data-curve-progress"),
    "0.0000",
  );
  assert.equal(await page.locator(".pin-spacer").count(), 0);
  await page.locator("[data-pause]").evaluate((button) => button.click());
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page.locator(".fn-footer").getAttribute("data-curve-progress"),
    "0.0000",
  );
  assert.equal(await page.locator(".pin-spacer").count(), 0);
  results.push({
    width,
    height,
    range,
    samples,
    noButton: true,
    holdsWhenIdle: true,
    reverses: true,
    pause: true,
    reducedMotion: true,
  });
  await page.close();
}
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8080/animations/field-notes/index.html");
const cleanup = await page.evaluate(async () => {
  const { mountAnimation } =
    await import("/animations/field-notes/animation.js");
  const { ScrollTrigger } =
    await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
  mountAnimation(document.querySelector(".gsap-container")).destroy();
  return (
    ScrollTrigger.getAll().length === 0 &&
    !document.querySelector(".fn-footer").hasAttribute("data-curve-progress")
  );
});
assert.ok(cleanup);
await page.goto("http://localhost:8080/gsap-animations.html");
assert.equal(await page.locator("[data-curve]").count(), 0);
assert.equal(await page.locator(".fn-curve-panel").count(), 1);
assert.deepEqual(errors, []);
await writeFile(
  "animations/field-notes/checks/curve-results.json",
  JSON.stringify(
    { results, trigger: "scroll", cleanup, integrated: true, errors },
    null,
    2,
  ),
);
console.log(
  "PASS: scroll-driven rise/hold/exit, reachable end, reverse scroll, idle hold, no button, pause, reduced motion, cleanup, and three viewport sizes.",
);
await browser.close();
