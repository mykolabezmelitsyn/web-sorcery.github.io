import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const results = [];
const errors = [];
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
  await page.goto("http://localhost:8080/animations/motion-lab/index.html");
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `animations/motion-lab/checks/${name}.png` });
  results.push({
    name,
    screens: await page.locator(".ml-screen").count(),
    overflow: await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    heading: await page.locator("h1").innerText(),
  });
  // Pause must work with keyboard and remove pinning without hiding the finale.
  await page.locator("[data-pause]").focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  results.push({
    name,
    paused: await page.locator("[data-pause]").getAttribute("aria-pressed"),
    pinSpacers: await page.locator(".pin-spacer").count(),
  });
  await page.locator("[data-layout]").click();
  results.push({
    name,
    list: await page
      .locator(".ml-tiles")
      .evaluate((el) => el.classList.contains("ml-list")),
  });
  await page.locator("[data-layout]").click();
  await page.locator("[data-next]").click();
  await page.waitForTimeout(100);
  results.push({
    name,
    nextSlide: await page.locator("[data-slide-status]").innerText(),
  });
  await page.locator("[data-mini-menu]").click();
  results.push({
    name,
    menu: await page.locator(".ml-mini-links").isVisible(),
  });
  await page.locator("[data-accordion]").click();
  results.push({
    name,
    accordion: await page.locator(".ml-answer").isVisible(),
  });
  await page.locator(".ml-slide:not([hidden]) [data-modal-open]").click();
  results.push({
    name,
    dialog: await page.locator("dialog").evaluate((el) => el.open),
  });
  await page.keyboard.press("Escape");
  await page.locator(".ml-puck").focus();
  await page.keyboard.press("ArrowRight");
  results.push({
    name,
    puckMoved: await page
      .locator(".ml-puck")
      .evaluate((el) => getComputedStyle(el).transform),
  });
  await page.locator(".ml-cube-stage").focus();
  await page.keyboard.press("ArrowRight");
  await page.locator("#ml-interface").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: `animations/motion-lab/checks/${name}-interface.png`,
  });
  await page.locator("[data-pause]").click();
  await page.setViewportSize({ width: width === 375 ? 600 : 650, height });
  await page.waitForTimeout(400);
  results.push({
    name,
    resizedOverflow: await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  });
  await page.close();
}
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
page.on("pageerror", (error) => errors.push(`reduced: ${error.message}`));
await page.goto("http://localhost:8080/animations/motion-lab/index.html");
await page.waitForTimeout(600);
const first = await page.locator(".ml-flower").getAttribute("style");
await page.waitForTimeout(400);
results.push({
  reducedStatic:
    first === (await page.locator(".ml-flower").getAttribute("style")),
  pinSpacers: await page.locator(".pin-spacer").count(),
});
await page.screenshot({ path: "animations/motion-lab/checks/reduced.png" });
// A second mount is an isolated fixture for lifecycle and selector scoping checks.
results.push(
  await page.evaluate(async () => {
    const { mountAnimation } =
      await import("/animations/motion-lab/showcase.js");
    const { ScrollTrigger } =
      await import("/animations/motion-lab/vendor/gsap/ScrollTrigger.js");
    const fixture = document.createElement("div");
    fixture.className = "gsap-container";
    fixture.innerHTML = document.querySelector(".gsap-container").innerHTML;
    document.body.append(fixture);
    const before = fixture.innerHTML;
    const triggers = ScrollTrigger.getAll().length;
    const api = mountAnimation(fixture);
    api.pause();
    api.play();
    api.destroy();
    const result = {
      cleanupRestored: fixture.innerHTML === before,
      cleanupTriggers: ScrollTrigger.getAll().length === triggers,
    };
    fixture.remove();
    return result;
  }),
);
await page.goto("http://localhost:8080/gsap-animations.html");
await page.waitForTimeout(1500);
results.push({
  integrated: await page.locator(".gsap-container .ml-screen").count(),
});
await page.screenshot({ path: "animations/motion-lab/checks/integrated.png" });
await writeFile(
  "animations/motion-lab/checks/results.json",
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ results, errors }, null, 2));
await browser.close();
if (errors.length) process.exitCode = 1;
