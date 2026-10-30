import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vituum from 'vituum'
import nunjucks from '@vituum/vite-plugin-nunjucks'

// Absolute path helper so paths work no matter which folder you run npm from.
const fromRoot = (path) => fileURLToPath(new URL(path, import.meta.url))

// The Nunjucks plugin builds each page from a "<page>.njk.html" entry. By default
// it renames src/pages/*.njk to *.njk.html on disk for the length of every build.
// That breaks `vite build --watch` (renames retrigger the watcher in a loop) and
// leaves renamed files behind if a build is interrupted. Turn the renaming off...
const nunjucksPlugins = nunjucks({
  root: fromRoot('./src/templates'),
  options: {
    // Drop the blank lines Nunjucks tags would otherwise leave in the HTML.
    trimBlocks: true,
    lstripBlocks: true,
  },
})
delete nunjucksPlugins[0].buildStart
delete nunjucksPlugins[0].buildEnd

// Render the root HTML entry with the same Nunjucks pipeline as child pages.
// The plugin recognizes template extensions, so supply a virtual .njk filename.
const renderNunjucks = nunjucksPlugins[0].transformIndexHtml.handler
nunjucksPlugins[0].transformIndexHtml.handler = (content, context) => {
  const filename = context.filename === fromRoot('./index.html')
    ? fromRoot('./index.njk.html')
    : context.filename

  return renderNunjucks(content, { ...context, filename })
}

// ...and serve each "<page>.njk.html" entry straight from "<page>.njk" instead.
// In watch mode it also watches pages, templates and data, so `npm run watch`
// rebuilds when any of them is saved. (A new page needs a watch restart.)
const nunjucksPagesInPlace = () => ({
  name: 'nunjucks-pages-in-place',
  apply: 'build',
  enforce: 'pre',
  resolveId(id) {
    if (id.endsWith('.njk.html')) return id
  },
  load(id) {
    if (!id.endsWith('.njk.html')) return
    const source = id.slice(0, -'.html'.length)
    this.addWatchFile(source)
    return readFileSync(source, 'utf8')
  },
  buildStart() {
    if (!this.meta.watchMode) return
    for (const dir of ['./src/templates', './src/data']) {
      const absoluteDir = fromRoot(dir)
      for (const file of readdirSync(absoluteDir, { recursive: true })) {
        this.addWatchFile(`${absoluteDir}/${file}`)
      }
    }
  },
})

export default defineConfig({
  plugins: [
    {
      name: 'root-template-entry',
      configureServer(server) {
        // Serve the root entry before Vituum rewrites page URLs into src/pages.
        server.middlewares.use(async (req, res, next) => {
          const pathname = new URL(req.url, 'http://localhost').pathname
          if (!['/', '/index.html'].includes(pathname)) return next()

          try {
            const source = readFileSync(fromRoot('./index.html'), 'utf8')
            const html = await server.transformIndexHtml('/index.html', source)
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(html)
          }
          catch (error) {
            next(error)
          }
        })
      },
    },
    // Vituum discovers root index.html and child templates as HTML entries
    // (src/pages/about.njk -> /about.html in dev and dist/about.html in build).
    vituum({
      // Only pages are build entries. Styles and scripts are pulled in by the
      // <link>/<script> tags in the layout, so they are bundled once, not twice.
      input: [],
      pages: {
        root: './src',
        dir: './src/pages',
      },
      // Turn off Vituum's auto-generated "+.scss" / "+.js" import files,
      // so nothing is written into src/ behind your back.
      imports: {
        paths: [],
      },
    }),

    // Renders .njk pages. {% extends %}, {% include %} and {% import %} paths
    // are resolved from src/templates (e.g. "layouts/base.njk").
    // Every JSON file in src/data/ is merged into the template context.
    ...nunjucksPlugins,
    nunjucksPagesInPlace(),
  ],

  css: {
    // Source maps for SCSS while developing, so DevTools points at .scss lines.
    devSourcemap: true,
  },

  build: {
    outDir: 'dist',
    // Wipe dist/ before each build so stale files never ship.
    emptyOutDir: true,
    // Hashed JS, CSS and images go to dist/assets/.
    assetsDir: 'assets',
    // JavaScript minifier, set explicitly: Oxc (built into Vite 8) strips
    // whitespace/comments and mangles local names. Alternative: 'terser'
    // (needs `npm i -D terser`). Set to false to debug unminified output.
    minify: 'oxc',
    // CSS minifier, set explicitly: Lightning CSS (built into Vite 8).
    // Alternative: 'esbuild' (needs `npm i -D esbuild`).
    cssMinify: 'lightningcss',
    // No source maps in production; set to true if you need them.
    sourcemap: false,
    // Every browser that runs ES modules already supports <link rel="modulepreload">,
    // so skip the ~0.7 kB polyfill Vite would otherwise inject.
    modulePreload: {
      polyfill: false,
    },
    rolldownOptions: {
      output: {
        // Page entries are named after their template ("index.njk"); strip the
        // ".njk" so bundles are named assets/index-[hash].js, not index.njk-[hash].js.
        entryFileNames: (chunk) => `assets/${chunk.name.replace(/\.njk$/, '')}-[hash].js`,
      },
    },
  },
})
