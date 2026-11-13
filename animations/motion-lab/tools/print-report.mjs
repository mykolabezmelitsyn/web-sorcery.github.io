import { chromium } from "/private/tmp/reanimate-hardened-lw9q4tke/reanimate/scripts/node_modules/playwright/index.mjs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const browser = await chromium.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.goto(
  pathToFileURL(resolve("animations/motion-lab/report.html")).href,
);
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: "animations/motion-lab/report.pdf",
  format: "A4",
  printBackground: true,
  preferCSSPageSize: true,
});
await browser.close();
console.log("Created animations/motion-lab/report.pdf");
