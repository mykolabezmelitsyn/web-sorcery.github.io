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
  await page.goto("http://localhost:8080/animations/field-notes/index.html", {
    waitUntil: "domcontentloaded",
  });
  const initial = await page
    .locator(".fn-hero-copy h1")
    .evaluate((heading) => ({
      height: heading.getBoundingClientRect().height,
      masks: heading.querySelectorAll(".fn-hero-line-mask").length,
      label: heading.getAttribute("aria-label"),
    }));
  assert.ok(
    initial.masks >= 3,
    "Hero title must use line masks during its reveal.",
  );
  assert.ok(initial.label.includes("seeing"));
  await page.waitForTimeout(200);
  await page.screenshot({
    path: `animations/field-notes/checks/hero-${width}-revealing.png`,
  });
  await page.waitForFunction(
    () =>
      document.querySelectorAll(".fn-hero-copy .fn-hero-line-mask").length ===
      0,
  );
  const final = await page.locator(".fn-hero-copy").evaluate((copy) => ({
    height: copy.querySelector("h1").getBoundingClientRect().height,
    heading: copy.querySelector("h1").innerHTML,
    paragraphs: [...copy.querySelectorAll("p")].map((paragraph) =>
      paragraph.textContent.trim(),
    ),
    masks: copy.querySelectorAll(".fn-hero-line-mask,.fn-hero-p-line-mask")
      .length,
  }));
  assert.equal(final.heading, "A slower<br>way of<br><em>seeing.</em>");
  assert.equal(final.masks, 0);
  assert.ok(
    Math.abs(final.height - initial.height) < 1,
    `Heading layout shifts: ${initial.height} to ${final.height}`,
  );
  await page.setViewportSize({ width: width === 375 ? 500 : 650, height });
  await page.waitForTimeout(100);
  assert.equal(
    await page.locator(".fn-hero-copy .fn-hero-line-mask").count(),
    0,
  );
  await page.screenshot({
    path: `animations/field-notes/checks/hero-${width}-final.png`,
  });
  results.push({ width, height, initial, final, noReplayOnResize: true });
  await page.close();
}
const reduced = await browser.newPage({ reducedMotion: "reduce" });
await reduced.goto("http://localhost:8080/animations/field-notes/index.html", {
  waitUntil: "domcontentloaded",
});
assert.equal(await reduced.locator(".fn-hero-line-mask").count(), 0);
assert.ok(await reduced.locator("h1").isVisible());
const pause = await browser.newPage();
pause.on("pageerror", (error) => errors.push(error.message));
await pause.goto("http://localhost:8080/animations/field-notes/index.html", {
  waitUntil: "domcontentloaded",
});
await pause.locator("[data-pause]").click();
assert.equal(await pause.locator(".fn-hero-line-mask").count(), 0);
await pause.locator("[data-pause]").click();
assert.equal(await pause.locator(".fn-hero-line-mask").count(), 0);
await pause.reload({ waitUntil: "domcontentloaded" });
const cleanup = await pause.evaluate(async () => {
  const { mountAnimation } =
    await import("/animations/field-notes/animation.js");
  mountAnimation(document.querySelector(".gsap-container")).destroy();
  return (
    document.querySelectorAll(".fn-hero-line-mask,.fn-hero-p-line-mask")
      .length === 0
  );
});
assert.ok(cleanup);
await pause.goto("http://localhost:8080/gsap-animations.html", {
  waitUntil: "domcontentloaded",
});
await pause.waitForFunction(
  () => document.querySelectorAll(".fn-hero-line-mask").length === 0,
);
assert.ok(await pause.locator(".fn-hero-copy h1").isVisible());
const noScript = await browser.newPage({ javaScriptEnabled: false });
await noScript.goto("http://localhost:8080/animations/field-notes/index.html");
assert.ok(await noScript.locator("h1").isVisible());
assert.deepEqual(errors, []);
await writeFile(
  "animations/field-notes/checks/hero-results.json",
  JSON.stringify(
    {
      results,
      reducedMotion: true,
      pause: true,
      cleanup,
      noScript: true,
      integrated: true,
      errors,
    },
    null,
    2,
  ),
);
console.log(
  "PASS: masked title and paragraph reveal, stable heading height, one-time playback, resize, pause, reduced motion, no-script fallback, cleanup, and three viewport sizes.",
);
await browser.close();
