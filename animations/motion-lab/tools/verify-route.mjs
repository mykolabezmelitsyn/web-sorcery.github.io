import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
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
  await page.goto("http://localhost:8080/animations/motion-lab/index.html");
  await page.waitForTimeout(500);
  const geometry = await page.evaluate(async () => {
    const { ScrollTrigger } =
      await import("/animations/motion-lab/vendor/gsap/ScrollTrigger.js");
    const trigger = ScrollTrigger.getAll().find(
      (item) => item.trigger.id === "ml-path",
    );
    const rect = trigger.trigger.getBoundingClientRect();
    return {
      start: trigger.start,
      end: trigger.end,
      expectedStart: scrollY + rect.top + rect.height * 0.1 - innerHeight,
    };
  });
  assert.ok(Math.abs(geometry.start - geometry.expectedStart) <= 1);
  const read = () =>
    page.evaluate(async () => {
      const { ScrollTrigger } =
        await import("/animations/motion-lab/vendor/gsap/ScrollTrigger.js");
      const trigger = ScrollTrigger.getAll().find(
        (item) => item.trigger.id === "ml-path",
      );
      return {
        progress: trigger.progress,
        transform: document
          .querySelector("[data-traveler]")
          .getAttribute("transform"),
      };
    });
  await page.evaluate((y) => scrollTo(0, y), geometry.start - 2);
  await page.waitForTimeout(150);
  const before = await read();
  assert.equal(before.progress, 0);
  await page.waitForTimeout(250);
  assert.deepEqual(
    await read(),
    before,
    "Route must remain still before the threshold.",
  );
  const samples = [];
  for (const progress of [0.2, 0.5, 0.8]) {
    await page.evaluate(
      (y) => scrollTo(0, y),
      geometry.start + (geometry.end - geometry.start) * progress,
    );
    await page.waitForTimeout(120);
    const sample = await read();
    assert.ok(Math.abs(sample.progress - progress) < 0.005);
    samples.push(sample);
    await page.waitForTimeout(150);
    assert.deepEqual(
      await read(),
      sample,
      "Route must hold its position when scrolling stops.",
    );
  }
  assert.notEqual(samples[0].transform, samples[2].transform);
  await page.screenshot({
    path: `animations/motion-lab/checks/route-scroll-${width}.png`,
  });
  await page.evaluate((y) => scrollTo(0, y), geometry.start - 2);
  await page.waitForTimeout(120);
  assert.equal((await read()).progress, 0);
  results.push({
    width,
    height,
    geometry,
    before,
    samples,
    reverses: true,
    holdsWhenIdle: true,
  });
  await page.close();
}
assert.deepEqual(errors, []);
await writeFile(
  "animations/motion-lab/checks/route-results.json",
  JSON.stringify({ results, errors }, null, 2),
);
console.log(
  "PASS: exact 10% section visibility threshold, scroll-synchronized travel, idle hold, and reverse at all three sizes.",
);
await browser.close();
