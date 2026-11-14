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
  await page.waitForTimeout(600);
  const range = await page.evaluate(async () => {
    const { ScrollTrigger } =
      await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
    const trigger = ScrollTrigger.getById("fn-wave");
    return { start: trigger.start, end: trigger.end };
  });
  const samples = [];
  for (const progress of [0, 0.25, 0.5, 1]) {
    await page.evaluate(
      (y) => scrollTo(0, y),
      range.start + (range.end - range.start) * progress,
    );
    await page.waitForTimeout(150);
    const sample = await page.evaluate(async () => {
      const { gsap } =
        await import("/animations/field-notes/vendor/gsap/index.js");
      const stage = document
        .querySelector(".fn-wave-stage")
        .getBoundingClientRect();
      const text = document.querySelector(".fn-wave-text");
      const first = text.firstElementChild.getBoundingClientRect();
      return {
        x: Number(gsap.getProperty(text, "x")),
        stageRight: stage.right,
        firstLeft: first.left,
        maxGlyphY: Math.max(
          ...[...text.children].map((char) =>
            Math.abs(Number(gsap.getProperty(char, "y"))),
          ),
        ),
      };
    });
    if (progress === 0) assert.ok(sample.firstLeft >= sample.stageRight);
    if (progress === 1) assert.ok(sample.maxGlyphY < 0.1);
    samples.push({ progress, ...sample });
  }
  assert.ok(
    samples[0].x > samples[1].x &&
      samples[1].x > samples[2].x &&
      samples[2].x > samples[3].x,
  );
  results.push({ width, height, samples });
  await page.close();
}
assert.deepEqual(errors, []);
await writeFile(
  "animations/field-notes/checks/wave-results.json",
  JSON.stringify({ results, errors }, null, 2),
);
await browser.close();
console.log(
  "PASS: text starts beyond the right edge, travels left with scroll, and settles at the end at all three viewport sizes.",
);
