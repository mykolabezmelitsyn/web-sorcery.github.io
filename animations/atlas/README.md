# Atlas

Atlas is a full-viewport Earth explorer at `/atlas.html`. Drag or wheel over the globe to rotate it, hover to see country and ocean names, and select a country to browse its landmarks. The page has no shared site header or footer.

## Technology

Three.js renders the Earth, cloud shell and fixed starfield. The Earth shader lights the planet and reads the same rasterized country ID map as the pointer lookup. GSAP drives the entrance, fly-to and globe position; CSS animates the wordmark, panels and full-bleed dialog.

## Inputs

| Input                                                                                                                                                                                        | Parameters used                                                                                                                                                                               | Implementation                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [atlas.md](../../atlas.md)                                                                                                                                                                   | Interaction, layout, shader, asset and timing specification                                                                                                                                   | `src/pages/atlas.njk`, `atlas.css`, `index.js`, `globe.js`, `shaders.js` |
| NASA Blue Marble and the [Three.js planet textures](https://github.com/mrdoob/three.js/tree/master/examples/textures/planets)                                                                | 3840×1920 day map, 2048×1024 lights and specular mask, 1024×512 cloud map                                                                                                                     | `globe.js`, `shaders.js`                                                 |
| [Natural Earth 1:50m admin-0 countries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson)                                                | 242 features, country codes, polygons and label positions                                                                                                                                     | `countries.js`, `globe.js`                                               |
| [Wikidata mirror](https://qlever.dev/wikidata), [UNESCO DataHub](https://data.unesco.org/explore/dataset/whc001/)                                                                            | Static catalog for 175 country codes, with Commons image references for 170                                                                                                                   | `assets/highlights.json`                                                 |
| [Great Wall](https://commons.wikimedia.org/wiki/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg), [Taj Mahal](https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit3.jpg) | Local thumbnails and remote high-resolution sources, both CC BY-SA 3.0. Great Wall by Severin.stalder, edited by Brandmeister. Taj Mahal by Yann Forget, edited by King of Hearts and Jbarta. | Curated entries in `index.js`                                            |

## Assumptions

- The standalone route is `/atlas.html`, following the repository’s Vite and GitHub Pages convention.
- The detailed responsive table takes precedence over the checklist wording. Mobile search is below the globe. The camera pulls back in portrait desktop layouts to fit both wordmark flanks. The mobile sheet and desktop glide leave canvas space available for dragging.
- The live globe uses one Earth sphere and one cloud shell. The brief's transparent atmosphere shell has no visible effect, so it is omitted.
- Country coverage follows Natural Earth’s scale and boundary data. Ocean names use coarse geographic regions. Tiny coastal features can be smaller than one pixel in the ID texture.
- Two curated entries lead their respective panels, followed by the automatic catalog. Sites without a Commons image use the dark card background. Full-bleed images use the largest size the source supplies up to the requested 3840-pixel width. Remote photos and fonts require network access.

## Run

From the repository root:

```sh
npm ci
npm run build
python3 -m http.server 8080
```

Open `http://localhost:8080/atlas.html`.

## Customise

| CONFIG key   | Default              | Effect                                                                   |
| ------------ | -------------------- | ------------------------------------------------------------------------ |
| `initialYaw` | `4`                  | Old World starting longitude                                             |
| `autoSpin`   | `0.028`              | Idle yaw in radians per second                                           |
| `sun`        | `[0.32, 0.18, 0.95]` | World-space direction of the light                                       |
| `flySeconds` | `1.3`                | Country rotation and lateral glide duration                              |
| `dpr`        | `1.75`               | Renderer pixel ratio cap                                                 |
| `idMap`      | `[4096, 2048]`       | Picking raster dimensions                                                |
| `breakpoint` | `720`                | Mobile globe framing cutoff. Match the CSS media query when changing it. |

## Embed

Copy the `main.atlas` markup from the page template and include `atlas.css`. The page module mounts the first `.atlas` automatically. For an explicit mount in a host application, create the markup after importing the module and call the exported function.

```js
import { mountAnimation } from "./animations/atlas/index.js";

const atlas = mountAnimation(container, { autoSpin: 0.02 });
atlas.pause();
atlas.play();
atlas.destroy();
```

## Accessibility and browser support

Search and panel controls work with the keyboard. Escape closes one level at a time and focus returns to the preceding control. The pause button stops ambient motion. Reduced motion uses a still scene with immediate updates on direct interaction. The animation loop stops when the stage leaves the viewport or the tab is hidden. Where WebGL is unavailable, a static Earth and country search remain available.
