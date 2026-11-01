# web-sorcery.github.io

Empty frontend starter: Vite 8, Nunjucks templates, SCSS. No backend.

Requires Node.js `^20.19.0` or `>=22.12.0`.

## Commands

| Command           | What it does                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| `npm install`     | Installs Vite, the Nunjucks plugin and Sass into `node_modules/`.             |
| `npm run dev`     | Starts the dev server at http://localhost:5173 with live reload.             |
| `npm run build`   | Renders the pages, compiles SCSS and writes a minified site to `dist/` and the project root.      |
| `npm run watch`   | Same as `build`, then rebuilds `dist/` every time a source file is saved.    |
| `npm run preview` | Serves the built `dist/` folder locally to check the production output.      |

## Structure

```
index.html            Generated server-ready home page (do not edit)
assets/               Generated compiled CSS and JavaScript (do not edit)
src/
  pages/              Source pages: index.njk, gsap-animations.njk
  templates/
    layouts/          Page skeletons that pages {% extends %} (base.njk)
    partials/         Visible page sections that layouts {% include %} (header, footer)
    includes/         Non-visual snippets (meta tags in <head>)
  data/               JSON files merged into every template's context (site.json -> {{ site.name }})
  scss/
    main.scss         SCSS entry, linked from the base layout
    abstracts/        Variables and other code that emits no CSS by itself
    base/             Reset and element defaults
  scripts/
    main.js           JavaScript entry (ES module), loaded by the base layout
public/               Copied to dist/ as-is (favicon.svg)
dist/                 Build output (generated, git-ignored)
```

Edit `src/pages/index.njk` for home page content and `src/templates/layouts/base.njk`
for the shared document layout. `npm run build` renders all pages into `dist/`, then
copies the complete compiled site to the project root so a static server can serve
`/index.html`, child pages, and their assets directly. `npm run watch` keeps these
generated files updated as sources change. Do not edit generated HTML or `assets/`.
Development with `npm run dev` renders the source templates directly.

Template paths in `{% extends %}`, `{% include %}` and `{% import %}` are relative to
`src/templates/`, e.g. `{% include "partials/header.njk" %}`.

## Checking that the build is minified

After `npm run build`, open the files in `dist/assets/`:

- `*.css` is one line: no comments, no indentation, shortened values (`#ffffff` becomes `#fff`).
- `*.js` is one line: no comments, and local names are shortened (`markJavaScriptEnabled` is gone).

From a terminal: `wc -l dist/assets/*` reports 0 or 1 line per file, and
`grep -c "markJavaScriptEnabled" dist/assets/*.js` prints `0`.

Minifiers are set in `vite.config.js` (`build.minify: 'oxc'`, `build.cssMinify: 'lightningcss'`).
HTML pages are not minified.

## Deployment

The compiled site uses relative URLs, so it works at a domain root or a GitHub Pages
repository path. Run `npm run build`, then deploy the generated HTML pages, `assets/`,
and static icons together. For deployment from a Git branch, commit these generated
files together; uploading HTML alone leaves its compiled CSS and JavaScript missing.

## GSAP showcase

`gsap-animations.html` contains eleven animation studies inside `.gsap-container`.
Edit `src/templates/partials/gsap/showcase.njk` for content,
`src/scss/components/_gsap-showcase.scss` for scoped styles, and
`src/scripts/modules/gsap-showcase.js` for the section initializers.

The showcase loads GSAP 3.15.0 and its plugins from jsDelivr only when its root
exists. It requires internet access for interactive animation; if the CDN is
unavailable, the artwork, text, and chapter links remain readable. No external
image assets are used. The Pause motion control and the system reduced-motion
preference disable autoplay, pinning, and scrubbing while preserving interactive
navigation, layout controls, and the miniature website. Desktop horizontal cards
become a static stack when motion is paused or the screen is narrow or short.

The 3D cube has six generated SVG faces. Its rotation changes direction automatically
and pauses offscreen, in background tabs, or when motion is paused/reduced. Use
New artwork to regenerate the faces without restarting the rotation.
