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
  await page.waitForTimeout(600);
  const range = await page.evaluate(async () => {
    const { ScrollTrigger } =
      await import("/animations/motion-lab/vendor/gsap/ScrollTrigger.js");
    const trigger = ScrollTrigger.getAll().find((item) =>
      item.trigger.matches(".ml-image-stage"),
    );
    return { start: trigger.start, end: trigger.end };
  });
  const samples = [];
  for (const progress of [0.1, 0.5, 0.9]) {
    await page.evaluate(
      (y) => window.scrollTo(0, y),
      range.start + (range.end - range.start) * progress,
    );
    await page.waitForTimeout(150);
    const clip = await page
      .locator(".ml-image")
      .evaluate((el) => getComputedStyle(el).clipPath);
    const inset = clip.match(/[\d.]+/g).map(Number);
    assert.ok(
      inset.every((value) => Math.abs(value - inset[0]) < 0.01),
      "Visible image must expand symmetrically from center.",
    );
    const bounds = await page.locator(".ml-image").boundingBox();
    assert.ok(
      Math.abs(bounds.x + bounds.width / 2 - width / 2) < 2,
      "Image must remain horizontally centered.",
    );
    assert.ok(
      Math.abs(bounds.y + bounds.height / 2 - height / 2) < 2,
      "Image must remain vertically centered.",
    );
    samples.push({ progress, bounds });
    await page.screenshot({
      path: `animations/motion-lab/checks/image-${width}-${progress}.png`,
    });
  }
  assert.ok(
    samples[2].bounds.width > samples[0].bounds.width,
    "Image must scale up.",
  );
  await page.locator("[data-pause]").click();
  assert.equal(
    await page
      .locator(".ml-image-stage")
      .evaluate((el) => el.parentElement.classList.contains("pin-spacer")),
    false,
  );
  results.push({ width, height, samples, pauseRemovesPin: true });
  await page.close();
}
const page = await browser.newPage({ reducedMotion: "reduce" });
await page.goto("http://localhost:8080/animations/motion-lab/index.html");
assert.equal(
  await page
    .locator(".ml-image-stage")
    .evaluate((el) => el.parentElement.classList.contains("pin-spacer")),
  false,
);
await page.goto("http://localhost:8080/gsap-animations.html");
await page.waitForTimeout(400);
assert.equal(await page.locator(".ml-image-stage").count(), 1);
assert.deepEqual(errors, []);
await writeFile(
  "animations/motion-lab/checks/image-results.json",
  JSON.stringify(
    { results, reducedMotionStatic: true, integrated: true, errors },
    null,
    2,
  ),
);
console.log(
  "PASS: image scales up and stays within 2px of viewport center at all sampled progress points and all three sizes; pause and reduced motion remove pinning.",
);
await browser.close();
