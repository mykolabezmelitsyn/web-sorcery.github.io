import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const errors = [];
const results = [];
page.on("pageerror", (error) => errors.push(error.message));
for (const theme of ["light", "dark"]) {
  await page.goto("http://localhost:8080/index.html");
  await page.evaluate(
    (value) => localStorage.setItem("portfolio-theme", value),
    theme,
  );
  await page.reload();
  const home = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      ["background", "text", "accent", "border"].map((key) => [
        key,
        style.getPropertyValue(`--color-${key}`).trim(),
      ]),
    );
  });
  await page.goto("http://localhost:8080/gsap-animations.html");
  await page.waitForTimeout(400);
  const showcase = await page.locator(".gsap-container").evaluate((element) => {
    const style = getComputedStyle(element);
    return Object.fromEntries(
      ["paper", "ink", "orange", "line"].map((key) => [
        key,
        style.getPropertyValue(`--${key}`).trim(),
      ]),
    );
  });
  assert.equal(showcase.paper, home.background);
  assert.equal(showcase.ink, home.text);
  assert.equal(showcase.orange, home.accent);
  assert.equal(showcase.line, home.border);
  await page.screenshot({
    path: `animations/motion-lab/checks/theme-${theme}.png`,
  });
  const before = await page
    .locator("canvas")
    .evaluate((canvas) => canvas.toDataURL());
  await page.locator(".theme-toggle").click();
  await page.waitForTimeout(150);
  const after = await page
    .locator("canvas")
    .evaluate((canvas) => canvas.toDataURL());
  assert.notEqual(
    before,
    after,
    "Static canvas must redraw with the changed theme.",
  );
  results.push({ theme, home, showcase, canvasUpdates: true });
}
await page.goto("http://localhost:8080/animations/motion-lab/index.html");
await page.emulateMedia({ colorScheme: "dark" });
assert.equal(
  await page
    .locator(".gsap-container")
    .evaluate((el) => getComputedStyle(el).getPropertyValue("--paper").trim()),
  "#101722",
);
await page.emulateMedia({ colorScheme: "light" });
assert.equal(
  await page
    .locator(".gsap-container")
    .evaluate((el) => getComputedStyle(el).getPropertyValue("--paper").trim()),
  "#fcfdff",
);
assert.deepEqual(errors, []);
await writeFile(
  "animations/motion-lab/checks/theme-results.json",
  JSON.stringify({ results, standaloneSystemTheme: true, errors }, null, 2),
);
console.log(
  "PASS: home palette matches in both themes; live canvas redraw and standalone system themes work.",
);
await browser.close();
