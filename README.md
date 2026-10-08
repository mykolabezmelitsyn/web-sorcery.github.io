# Web Sorcery favicon pack

Upload the files into your GitHub Pages site's root directory (next to `index.html`).

Add these tags inside `<head>`:

```html
<link rel="icon" type="image/svg+xml" href="./favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
<link rel="shortcut icon" href="./favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png">
<link rel="manifest" href="./site.webmanifest">
<meta name="theme-color" content="#092e2c">
```

For pages inside subdirectories, use a root-based prefix appropriate to your GitHub Pages deployment instead of `./` if the assets are in the site root. On a project Pages URL such as `/web-sorcery.github.io/`, use `/web-sorcery.github.io/favicon.svg`, or use the relevant relative `../` paths.
