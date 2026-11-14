import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  chromiumSandbox: true,
});
const errors = [];
const results = [];
for (const [name, width, height] of [
  ["mobile", 375, 667],
  ["tablet", 768, 1024],
  ["desktop", 1440, 900],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on("pageerror", (error) => errors.push(`${name}: ${error.message}`));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type()))
      errors.push(`${name}: ${message.text()}`);
  });
  page.on("requestfailed", (request) =>
    errors.push(`${name}: ${request.url()} ${request.failure()?.errorText}`),
  );
  await page.goto("http://localhost:8080/animations/field-notes/index.html");
  await page.waitForTimeout(700);
  assert.equal(await page.locator("[data-reference]").count(), 7);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.screenshot({ path: `animations/field-notes/checks/${name}.png` });
  const sceneResults = [];
  for (const scene of ["fn-bento", "fn-mask", "fn-wave", "fn-gallery"]) {
    const range = await page.evaluate(async (id) => {
      const { ScrollTrigger } =
        await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
      const trigger = ScrollTrigger.getById(id);
      return { start: trigger.start, end: trigger.end };
    }, scene);
    const samples = [];
    for (const progress of [0.1, 0.5, 0.9]) {
      await page.evaluate(
        (y) => scrollTo(0, y),
        range.start + (range.end - range.start) * progress,
      );
      await page.waitForTimeout(100);
      const state = await page.evaluate(async (id) => {
        const { ScrollTrigger } =
          await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
        const { gsap } =
          await import("/animations/field-notes/vendor/gsap/index.js");
        const trigger = ScrollTrigger.getById(id);
        const bento = document.querySelector(".fn-bento-grid");
        const mask = document.querySelector(".fn-mask-reveal");
        const wave = document.querySelector(".fn-wave-text");
        const gallery = document.querySelector(".fn-gallery-track");
        return {
          progress: trigger.progress,
          pinY: trigger.trigger.getBoundingClientRect().y,
          scale: gsap.getProperty(bento, "scale"),
          clip: getComputedStyle(mask).clipPath,
          waveX: gsap.getProperty(wave, "x"),
          glyphTransforms: [...wave.children].map((el) => el.style.transform),
          galleryX: gsap.getProperty(gallery, "x"),
        };
      }, scene);
      assert.ok(Math.abs(state.progress - progress) < 0.01);
      samples.push(state);
      if (width === 1440)
        await page.screenshot({
          path: `animations/field-notes/checks/${scene}-${progress}.png`,
        });
    }
    assert.ok(Math.abs(samples[0].pinY - samples[2].pinY) < 2);
    if (scene === "fn-bento") assert.ok(samples[2].scale > samples[0].scale);
    if (scene === "fn-mask") {
      assert.notEqual(samples[0].clip, samples[2].clip);
      const firstInsets = samples[0].clip.match(/[\d.]+/g).map(Number);
      const lastInsets = samples[2].clip.match(/[\d.]+/g).map(Number);
      assert.equal(firstInsets[1], 0);
      assert.ok(
        firstInsets[3] > lastInsets[3],
        "Reveal must advance from right to left.",
      );
    }
    if (scene === "fn-wave") assert.ok(samples[2].waveX < samples[0].waveX);
    if (scene === "fn-gallery")
      assert.ok(samples[2].galleryX < samples[0].galleryX);
    await page.evaluate((y) => scrollTo(0, y), range.start - 2);
    await page.waitForTimeout(100);
    const reversed = await page.evaluate(async (id) => {
      const { ScrollTrigger } =
        await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
      return ScrollTrigger.getById(id).progress;
    }, scene);
    assert.equal(reversed, 0);
    sceneResults.push({ scene, range, samples, reversed });
  }
  await page.locator("[data-next]").click();
  await page.waitForTimeout(750);
  assert.match(await page.locator(".fn-carousel-status").innerText(), /02$/);
  await page.locator("[data-prev]").click();
  await page.waitForTimeout(750);
  assert.match(await page.locator(".fn-carousel-status").innerText(), /01$/);
  assert.equal(await page.locator(".fn-wrap-ghost").count(), 0);
  const widths = await page
    .locator(".fn-note")
    .evaluateAll((cards) =>
      cards.map((card) => card.getBoundingClientRect().width),
    );
  assert.ok(Math.max(...widths) - Math.min(...widths) < 1);
  await page.locator(".fn-carousel-window").focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(750);
  assert.match(await page.locator(".fn-carousel-status").innerText(), /02$/);
  await page.locator("[data-pause]").focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(".pin-spacer").count(), 0);
  await page.setViewportSize({ width: width === 375 ? 600 : 650, height });
  await page.waitForTimeout(250);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.locator("[data-pause]").click();
  await page.waitForTimeout(250);
  assert.equal(await page.locator(".pin-spacer").count(), 5);
  const imageErrors = await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map((image) => {
        image.loading = "eager";
        return image.decode().catch(() => {});
      }),
    );
    return images
      .filter((image) => !image.complete || !image.naturalWidth)
      .map((image) => image.src);
  });
  assert.deepEqual(imageErrors, []);
  results.push({
    name,
    width,
    height,
    references: 7,
    overflow: false,
    sceneResults,
    carousel: "pass",
    pause: "pass",
    resize: "pass",
    imageErrors,
  });
  await page.close();
}
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
page.on("pageerror", (error) => errors.push(`reduced: ${error.message}`));
await page.goto("http://localhost:8080/animations/field-notes/index.html");
await page.waitForTimeout(300);
assert.equal(await page.locator(".pin-spacer").count(), 0);
await page.screenshot({ path: "animations/field-notes/checks/reduced.png" });
const cleanup = await page.evaluate(async () => {
  const { mountAnimation } =
    await import("/animations/field-notes/animation.js");
  const { ScrollTrigger } =
    await import("/animations/field-notes/vendor/gsap/ScrollTrigger.js");
  const root = document.querySelector(".gsap-container");
  const api = mountAnimation(root);
  api.destroy();
  const result = {
    triggers: ScrollTrigger.getAll().length,
    calmRemoved: !root.hasAttribute("data-calm"),
    splitRemoved: root.querySelector(".fn-wave-text").children.length === 0,
  };
  return result;
});
assert.equal(cleanup.triggers, 0);
assert.ok(cleanup.calmRemoved && cleanup.splitRemoved);
await page.goto("http://localhost:8080/gsap-animations.html");
await page.waitForTimeout(400);
assert.equal(await page.locator("[data-reference]").count(), 7);
await page.screenshot({ path: "animations/field-notes/checks/integrated.png" });
await page.locator(".theme-toggle").click();
await page.screenshot({ path: "animations/field-notes/checks/dark.png" });
assert.deepEqual(errors, []);
await writeFile(
  "animations/field-notes/checks/results.json",
  JSON.stringify(
    { results, reducedMotion: "pass", cleanup, integrated: "pass", errors },
    null,
    2,
  ),
);
console.log(
  "PASS: three viewports, four scrubbed reversible scenes, equal-size FLIP, keyboard, pause, resize, images, reduced motion, cleanup, integrated page.",
);
await browser.close();
