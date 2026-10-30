# web-sorcery.github.io

Empty frontend starter: Vite 8, Nunjucks templates, SCSS. No backend.

Requires Node.js `^20.19.0` or `>=22.12.0`.

## Commands

| Command           | What it does                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| `npm install`     | Installs Vite, the Nunjucks plugin and Sass into `node_modules/`.             |
| `npm run dev`     | Starts the dev server at http://localhost:5173 with live reload.             |
| `npm run build`   | Renders the pages, compiles SCSS and writes a minified site to `dist/`.      |
| `npm run watch`   | Same as `build`, then rebuilds `dist/` every time a source file is saved.    |
| `npm run preview` | Serves the built `dist/` folder locally to check the production output.      |

## Structure

```
src/
  pages/              One .njk file per page: index.njk -> index.html, about.njk -> about.html
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
