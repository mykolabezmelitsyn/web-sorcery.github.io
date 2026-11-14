import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { resolve, dirname } from "node:path";

const hash = async (path) =>
  createHash("sha256")
    .update(await readFile(path))
    .digest("hex");
const names = (await readdir("source-images")).filter((name) =>
  name.endsWith(".jpg"),
);
for (const name of names) {
  assert.equal(
    await hash(`source-images/${name}`),
    await hash(`animations/field-notes/assets/${name}`),
  );
}
const sourceTheme = await readFile("src/scss/base/_root.scss", "utf8");
const demoTheme = await readFile("animations/field-notes/theme.css", "utf8");
assert.equal(sourceTheme.replace(/\s/g, ""), demoTheme.replace(/\s/g, ""));
const css = await readFile("animations/field-notes/style.css", "utf8");
assert.equal(
  css.match(/#[0-9a-fA-F]{3,8}\b/),
  null,
  "Component styles must use existing theme tokens.",
);
for (const page of [
  "gsap-animations.html",
  "dist/gsap-animations.html",
  "animations/field-notes/index.html",
]) {
  const html = await readFile(page, "utf8");
  const paths = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(
    (match) => match[1],
  );
  for (const path of paths) {
    assert.ok(!/^https?:/.test(path), `Unexpected external asset: ${path}`);
    const local = path.startsWith("/")
      ? resolve(path.slice(1))
      : resolve(dirname(page), path.split("#")[0]);
    await readFile(local);
  }
}
console.log(
  `PASS: ${names.length} photographs match source bytes, theme tokens are unchanged, and standalone/root/dist asset paths resolve.`,
);
