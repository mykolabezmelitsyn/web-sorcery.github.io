import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";

const out = ".reanimate/field-notes/carousel-states";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  chromiumSandbox: true,
});
const page = await browser.newPage({ viewport: { width: 1500, height: 844 } });
await page.goto("http://localhost:8080/animations/field-notes/index.html");
await page.locator(".fn-note img").evaluateAll(async (images) => {
  await Promise.all(
    images.map((image) => {
      image.loading = "eager";
      return image.decode();
    }),
  );
});
await page.evaluate(() => {
  const rect = document
    .querySelector(".fn-carousel-window")
    .getBoundingClientRect();
  scrollTo(0, scrollY + rect.top - (innerHeight - rect.height) / 2);
});
await page.waitForTimeout(200);
const timeline = await page.evaluateHandle(async () => {
  const { gsap } = await import("/animations/field-notes/vendor/gsap/index.js");
  const wrapping = document.querySelector(".fn-carousel").lastElementChild;
  document.querySelector("[data-prev]").click();
  return {
    animation: gsap
      .getTweensOf(wrapping)
      .find((tween) => tween.vars.scale === 1)
      .parent.pause(0),
  };
});
for (let frame = 0; frame <= 12; frame++) {
  await timeline.evaluate(({ animation }, seconds) => {
    animation.time(seconds);
  }, frame * 0.05);
  await page
    .locator(".fn-carousel-window")
    .screenshot({ path: `${out}/frame-${String(frame).padStart(3, "0")}.png` });
}
await timeline.dispose();
await browser.close();
console.log(
  "Captured the corrected carousel every 50ms using its synchronized timeline.",
);
