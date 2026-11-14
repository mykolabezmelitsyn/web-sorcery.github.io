import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const baseline = process.argv.includes("--before");
const label = baseline ? "before" : "after";
const output = `.reanimate/field-notes/carousel-${label}`;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  chromiumSandbox: true,
});
const results = [];
const errors = [];
for (const [width, height] of baseline
  ? [[1440, 900]]
  : [
      [375, 667],
      [768, 1024],
      [1440, 900],
    ]) {
  const context = await browser.newContext({
    viewport: { width, height },
    recordVideo: { dir: output, size: { width, height } },
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
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
    const row = document
      .querySelector(".fn-carousel-window")
      .getBoundingClientRect();
    scrollTo(0, scrollY + row.top - (innerHeight - row.height) / 2);
  });
  await page.waitForTimeout(250);
  for (const direction of ["next", "prev"]) {
    const data = await page.evaluate(async (direction) => {
      const row = document.querySelector(".fn-carousel-window");
      const cards = [...document.querySelector(".fn-carousel").children];
      const wrapping =
        direction === "next"
          ? cards[0].dataset.note
          : cards.at(-1).dataset.note;
      const snapshot = () => ({
        time: performance.now(),
        rowHeight: row.getBoundingClientRect().height,
        cards: cards.map((card) => {
          const bounds = card.getBoundingClientRect();
          return {
            id: card.dataset.note,
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height,
            opacity: Number(getComputedStyle(card).opacity),
          };
        }),
      });
      const start = snapshot();
      const frames = [];
      document.querySelector(`[data-${direction}]`).click();
      const until = performance.now() + 1000;
      await new Promise((resolve) => {
        const frame = () => {
          frames.push(snapshot());
          if (performance.now() < until) requestAnimationFrame(frame);
          else resolve();
        };
        requestAnimationFrame(frame);
      });
      return {
        start,
        wrapping,
        frames,
        finalOrder: [...document.querySelector(".fn-carousel").children].map(
          (card) => card.dataset.note,
        ),
        ghosts: document.querySelectorAll(".fn-wrap-ghost").length,
      };
    }, direction);
    let maxVisibleJump = 0;
    let maxNormalizedSpeed = 0;
    for (let index = 1; index < data.frames.length; index++) {
      const previous = data.frames[index - 1];
      const current = data.frames[index];
      for (const card of current.cards) {
        const before = previous.cards.find((item) => item.id === card.id);
        if (card.opacity < 0.2 || before.opacity < 0.2) continue;
        const jump = Math.abs(card.x - before.x);
        maxVisibleJump = Math.max(maxVisibleJump, jump);
        maxNormalizedSpeed = Math.max(
          maxNormalizedSpeed,
          ((jump / Math.max(1, current.time - previous.time)) * 16.67) /
            data.start.cards[0].width,
        );
      }
    }
    const heights = data.frames.map((frame) => frame.rowHeight);
    const heightDrift = Math.max(...heights) - Math.min(...heights);
    results.push({
      width,
      height,
      direction,
      maxVisibleJump,
      maxNormalizedSpeed,
      heightDrift,
      ...data,
    });
    if (!baseline) {
      assert.ok(
        maxNormalizedSpeed < 0.2,
        `Visible card jumps at ${width}px: ${maxNormalizedSpeed}`,
      );
      assert.ok(
        heightDrift < 1,
        `Row height changes during transition: ${heightDrift}`,
      );
      assert.equal(data.ghosts, 0);
    }
    await page.screenshot({ path: `${output}/${width}-${direction}.png` });
  }
  if (!baseline) {
    // A fast second input is queued, rather than interrupting or dropping the transition.
    await page.evaluate(() => {
      document.querySelector("[data-next]").click();
      document.querySelector("[data-next]").click();
    });
    await page.waitForTimeout(1400);
    assert.match(await page.locator(".fn-carousel-status").innerText(), /03$/);
    await page.locator("[data-pause]").click();
    await page.locator("[data-next]").click();
    assert.match(await page.locator(".fn-carousel-status").innerText(), /04$/);
    await page.locator("[data-pause]").click();
    await page.locator("[data-next]").click();
    await page.waitForTimeout(120);
    await page.locator("[data-pause]").click();
    assert.equal(await page.locator(".fn-wrap-ghost").count(), 0);
    assert.equal(
      await page.locator(".fn-carousel-window").getAttribute("aria-busy"),
      null,
    );
    await page.locator("[data-pause]").click();
    await page.locator("[data-next]").click();
    await page.waitForTimeout(100);
    await page.setViewportSize({ width: width === 375 ? 420 : 700, height });
    await page.waitForTimeout(200);
    assert.equal(await page.locator(".fn-wrap-ghost").count(), 0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator("[data-next]").click();
    assert.equal(await page.locator(".fn-wrap-ghost").count(), 0);
  }
  await context.close();
}
assert.deepEqual(errors, []);
await writeFile(
  `animations/field-notes/checks/carousel-${label}-results.json`,
  JSON.stringify({ results, errors }, null, 2),
);
console.log(
  JSON.stringify(
    results.map(
      ({
        width,
        direction,
        maxVisibleJump,
        maxNormalizedSpeed,
        heightDrift,
      }) => ({
        width,
        direction,
        maxVisibleJump,
        maxNormalizedSpeed,
        heightDrift,
      }),
    ),
    null,
    2,
  ),
);
await browser.close();
