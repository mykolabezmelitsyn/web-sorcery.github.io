# Atlas — Interactive 3D Earth Explorer

A full-viewport, physics-lit **realistic Earth you explore country by country**. A NASA-textured globe hangs in deep space as the **O** in a huge "W(🌐)RLD" wordmark, auto-rotates, and answers drag/scroll with momentum. Hover **any** of ~180 countries and it fills red and names itself under the cursor; click one and the globe **flies it to face the camera** and glides aside while its name goes big and a panel of that country's cultural highlights slides in. Open a highlight to a cinematic **full-bleed** with `COUNTRY · PLACE`.

> **Quality bar.** The depth is a *real lit sphere* (day/night terminator, ocean sun-glint, a whisper-thin cloud shell, limb darkening) and the picking is **pixel-accurate for every country on Earth** — not a handful of clickable hotspots. Everything rests, nothing auto-plays gimmicks, and there is no floating HUD chrome.

---

## 0. Build stack

- **Three.js** (`three`, r0.160+) — one `WebGLRenderer` (alpha, antialias), one `PerspectiveCamera`, `SphereGeometry`, `ShaderMaterial`, `Raycaster`, `CanvasTexture`, `Points`. Raw shaders (below) — **not** MeshStandardMaterial.
- **GSAP** (`gsap`) — entrance scale, the fly-to, and the open/close glides only.
- A single `requestAnimationFrame` loop drives spin, momentum, the sun-fixed terminator, the hover cross-fade, and the ocean ripple clock.
- DOM overlays (React/JSX in the reference, but any framework works) for the wordmark, search, hover label, and the country panel / full-bleed. CSS `@keyframes` (listed in §11) drive every DOM animation.
- Renders full-viewport (`position: relative; height: 100vh; width: 100%; overflow: hidden`). `touch-action: none` on the root so touch-drag rotates the globe instead of scrolling the page.

No external UI library. Two typefaces only (see §4).

---

## 1. The beats (what the visitor experiences)

1. **Load** — a solid veil (`#01040c`) covers the stage and **fades up** the instant the day texture decodes, so the reveal is a clean curtain-up from black (no texture pop). Behind it the globe scales from a point (`scale 0.001 → 1`, `power3.out`, 1.8s) and **rests on its first view** — Africa · Europe · Middle East · Asia, the land-rich "old world", centred on the Middle East (`spin.rotation.y = 4.0`). **No spin-up flourish** — the globe holds that view and only the slow idle auto-spin drifts it. The wordmark **rises + fades in** as a delayed second beat; the search fades in last. A small pulsing loader dot (bottom-left) fades out on ready.
2. **Wordmark** — a huge "W · 🌐 · RLD" where the globe is the **O** (no lead-in copy — the globe speaks). It sits **behind** the canvas (`z-index: 5`) so the sphere occludes the O. Fades out on select. **The word is centred, not the globe:** because RLD (3 letters) outweighs W (1), the globe + both flanks are shifted **left by the same amount** so "WORLD" reads centred and the globe/O lands a touch left of dead-centre (see §5 / §12). Desktop only — on mobile "WORLD" is a separate word above a **centred** globe.
3. **Spin, scroll & search** — idle auto-rotation; **drag** to spin (yaw + pitch) with momentum; **scroll/wheel over the globe also spins it** (wheel energy → the same yaw-momentum as a drag flick, clamped, with `preventDefault` so scroll energy goes into rotation). A **minimal underline search field** (no pill/HUD — a search glyph + placeholder on a hairline that brightens on focus, quiet results list below) finds any country by name and flies to it. Drag/scroll work **even while a country is open** (auto-spin pauses; the open overlay is click-through so the globe below still receives the drag; starting a drag cancels the fly-to).
4. **Hover** — raycast → the country under the cursor **fills red** (in-shader) and its name **trails the cursor** on a label. The fill **cross-fades** (~0.2s) so sweeping between countries glides. Over **open water**, no fill — instead the water answers with **concentric ripples** spreading from the cursor (as if a finger dipped in) and the ocean's name shows dimmed.
5. **Open** — click a country: it locks red, the globe **flies it to face the camera** (solved rotation, shortest-path, 1.3s) then, on desktop, **glides left** (world x → −1.3) to clear the right panel; on **mobile it stays centred** (world x → 0) since the panel is a bottom sheet. The name rises in big (low-left, clear of the globe) with a tagline; the right panel slides in with the highlights — a **featured photo card** (glass expand icon, prev/next arrows + position dots) over a **numbered list**. Clicking a list row glides the card to it (0.85s). Switching to a *different* country cross-fades the details in place (§10).
6. **Full-bleed** — click the featured card → it opens **edge-to-edge** with a cinematic zoom-in (image `scale 1.15 → 1`) and `COUNTRY · PLACE` + blurb rising in, staggered. Loads a **4K source** (a low thumbnail shows instantly underneath while the 4K fades in over it). `← Globe` / ✕ / the backdrop all return, one level at a time.

All closes **ease out** (never snap); **Esc** backs out one level at a time (full-bleed → panel → globe).

---

## 2. Assets (host these on your own CDN; reference by static URL)

All assets are static files. The four globe textures are equirectangular; the two projection-sensitive ones (day, night) must share the same 0°-centred longitude layout so the surface, the city lights and the country ID map all line up.

| Asset | What | Source (public-domain / permissive) |
|---|---|---|
| **Day map** `earth-day.jpg` | Green, cloud-free NASA Blue Marble "land & oceans", equirectangular 2:1 (≥3840×1920). Snow-minimal (only Greenland/Antarctica ice) so it reads timeless, not wintery. | `https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Whole_world_-_land_and_oceans.jpg/3840px-Whole_world_-_land_and_oceans.jpg` (NASA, public domain) |
| **Night lights** `earth_lights_2048.png` | City-lights map (shows on the dark side only). 2048×1024. | `https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png` |
| **Specular / ocean mask** `earth_specular_2048.jpg` | Bright over water, dark over land — used for the sun-glint + ocean deepening. 2048×1024. | `https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg` |
| **Clouds** `earth_clouds_1024.png` | Cloud map (rendered as a near-invisible whisper). 1024×512. | `https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png` |
| **Country geometry** `countries.geojson` | Natural Earth admin-0 countries, equirectangular lon/lat, with `NAME`, `ADM0_A3` (iso3), `LABEL_X` / `LABEL_Y` (label points, used for the fly-to). ~180–240 features. | `https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson` |
| **Landmark photos** | Per-place card image (small) + optional 4K `hi` URL for the full-bleed. See the data model (§3). | Wikimedia Commons (hotlink to demo; localise + licence-check for production) |

Texture load rules (important): mark the **day and night** textures as sRGB color space; the **specular and clouds** as no color space (linear/data). Set anisotropy to `min(8, maxAnisotropy)`. The ID canvas texture (§8) uses **NearestFilter**, **no mipmaps**, no color space.

---

## 3. Country content data model

Content is keyed by iso3 (`ADM0_A3`). Two layers merged, curated wins:

```ts
interface Place   { label: string; blurb: string; image: string; hi?: string }
interface Country { name: string; tagline: string; places: Place[] }
type Content = Record<string /* iso3 */, Country>;
```

- **Auto layer** — for (almost) every country, its top few UNESCO World Heritage Sites (queryable from Wikidata: entities with `P1435 = wd:Q9259`, ordered by `wikibase:sitelinks` for fame), each with a Wikimedia image + one-line description. `image` is a hotlinked Wikimedia thumbnail at `?width=1000`; there's no separate `hi`, so the full-bleed derives 4K by rewriting `width=1000`→`width=3840`.
- **Curated layer** — hand-built showcase countries with custom blurbs + local photos and a hotlinked 4K `hi`. Overrides the auto entry.

Example curated entry (verbatim shape):

```json
"CHN": {
  "name": "China",
  "tagline": "The Middle Kingdom",
  "places": [
    { "label": "Great Wall", "blurb": "Thirteen thousand miles of rammed earth and stone winding over the northern ridges.",
      "image": "/places/chn/great-wall.jpg",
      "hi": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/3840px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg" }
    /* … up to ~8 places */
  ]
}
```

Countries with **no content** still hover + select; their panel shows a graceful `"Highlights for <name> are on the way."` (right-aligned, muted).

Helpers on top of the raw names:
- **Display shortener** — map a handful of unwieldy official names to short forms for the hover label + big title: `United States of America → United States`, `Democratic Republic of the Congo → DR Congo`, `Central African Republic → Central African Rep.`, `United Arab Emirates → UAE`, `Bosnia and Herzegovina → Bosnia & Herz.`, `Dominican Republic → Dominican Rep.`, `Republic of the Congo → Congo`, `Solomon Islands → Solomon Is.`, `Northern Cyprus → N. Cyprus`, `Equatorial Guinea → Eq. Guinea`.
- **Search aliases** — so common shorthands resolve: `usa/us/america → United States`, `uk/britain/england/… → United Kingdom`, `uae/dubai/abu dhabi → UAE`, `holland → Netherlands`, `czech republic → Czechia`, `burma → Myanmar`, `macedonia → North Macedonia`, `swaziland → Eswatini`, `drc/congo → DR Congo`, `korea → South Korea`, `russian federation → Russia`.

---

## 4. Design tokens

**Colors**

| Token | Value | Use |
|---|---|---|
| Stage background | `radial-gradient(120% 108% at 50% 44%, #0a1a30 0%, #05101f 46%, #020812 78%, #01040c 100%)` | the deep-space stage (faint deep-blue behind the globe → near-black at the edges) |
| Load veil | `#01040c` | the fade-up-from-black veil |
| Corner vignette | `inset 0 0 260px 70px rgba(0,0,0,0.6)` | soft edge darkening to focus the globe |
| Wordmark ink | `#eaf1ff` | the huge W / RLD / WORLD |
| Country red (hover) | `rgb(0.86,0.09,0.10)` at 50% mix | in-shader hover fill |
| Country red (selected) | same red at 62% mix + a rim | locked selection |
| List active dot | `#e23b3b` | numbered-list active marker |
| Card placeholder | `linear-gradient(135deg, #0e1e38, #0a1526)` | dark card shown while a photo loads |
| Panel sheet (mobile) | `linear-gradient(to top, rgba(6,18,44,0.97), rgba(6,18,44,0.84) 70%, transparent)` | bottom-sheet backing on mobile |
| Search results panel | `rgba(6,13,26,0.82)` + `blur(16px)` + `1px solid rgba(255,255,255,0.07)` | quiet results dropdown |

**Fonts** — two families, self-host or Google Fonts:
- **Poppins** — headings & the wordmark & the big country name & place labels. Weights **400 / 500 / 600 only** (no bold). Used at the sizes below.
- **Geist Sans** (or any clean grotesque) — body: blurbs, list numbers, the tagline, the search input.

**Grain** — a fixed full-bleed layer at `opacity: 0.05`, an SVG fractal-noise tile (`feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"`, 140×140, repeated) to **dither the dark gradient** (kills 8-bit banding). Data-URI:
```
url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")
```

---

## 5. DOM layer stack (z-index)

The root is the stage. Layers, back to front:

| z | Layer | Notes |
|---|---|---|
| root | Stage background (radial gradient) + `touch-action: none` | |
| 1 | Grain dither overlay | `pointer-events: none` |
| 5 | **Wordmark** (W / RLD or WORLD) | click-through; fades + rises out on select |
| 10 | **`<canvas>`** (the WebGL globe) | `position: absolute; inset: 0; width/height: 100%` — receives pointer/wheel |
| 20 | Corner vignette + loader dot | click-through |
| 30 | **Hover label** + **country panel** overlay | overlay is click-through; the ← Globe button + panel opt back in to clicks |
| 40 | **Search field** + **full-bleed** | search hides while a country is open |
| 60 | **Load veil** | click-through; opacity → 0 on ready |

**Wordmark geometry (desktop).** The globe is the O. `W` and `RLD` are absolutely positioned, vertically centred, sized `min(31vh, 21vw)`, color `#eaf1ff`, `text-shadow: 0 4px 60px rgba(3,16,40,0.5)`:
- `W` : `right: calc(50% + 26vh + 12.4vh)` (i.e. its right edge sits 26vh left of centre, then the whole word is shifted left by `HEADLINE_DX = 12.4vh`).
- `RLD` : `left: calc(50% + 26vh - 12.4vh)`.
- The globe itself is shifted the **same physical distance** left in 3D via `world.position.x = −0.4` (world units), because `1 world unit ≈ 31.1vh at the globe's depth`, so `0.4 × 31.1 ≈ 12.4vh`. Globe + both flanks move as one rigid word → "WORLD" reads centred, the O lands ~12vh left of dead-centre.

**Wordmark (mobile, <720px).** Just the word `WORLD` (Poppins 600, `2rem`, `letter-spacing: 0.18em`, `#eaf1ff`) centred at `top: 11%` (clear of the ~72px header); the globe is **dead-centre** (`world.position.x = 0`); the search moves to the **bottom** (see §13) so nothing slices across the globe. No flanking.

The wordmark container: `opacity` + `translateY(14px→0)` when `ready && !country-open`, `transition: opacity 0.85s ease 0.45s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.45s`.

---

## 6. The 3D globe (scene graph)

```
scene
├── stars (Points, r≈45–70 shell)          // NOT parented to world → fixed as globe spins
└── world (Group, position.x = browseX)     // slides left/right on open/close
    └── tilt (Group, rotation.z = -0.409)   // 23.4° axial tilt
        ├── atmo  (Mesh, r=1.05)            // transparent no-op (kept for future glow)
        └── spin (Group, rotation.y = 4.0)  // the idle/drag rotation
            ├── earth  (Mesh, r=1, 96×96)
            └── clouds (Mesh, r=1.006, 64×64)
```

- **Renderer**: `WebGLRenderer({ alpha:true, antialias:true, powerPreference:"high-performance" })`, `setClearAlpha(0)` (transparent canvas over the DOM stage), pixel-ratio capped at **1.75**.
- **Camera**: `PerspectiveCamera(fov 30, near 0.1, far 100)` at `(0, 0, z)`. **`z` is responsive** so the globe never overflows a narrow screen: on wide screens `z = 6` (globe ≈ 62% of viewport *height*); on a portrait/narrow screen the camera pulls **back** so the globe fits ≈ 82% of the *width* instead — `z = max(6, 1 / (0.82 · tan(fov/2) · (W/H)))` (`tan(15°) ≈ 0.2679`). Recompute on resize/orientation change. (Without this, a globe sized to 62% of an 844px height is ~523px wide and clips on a 390px-wide phone.)
- **`world.position.x`** = `browseX()` = `0` if viewport < 720px else `−0.4`. Set on init, and re-applied on resize (only while no country is open). On open it tweens to `−1.3`; on close/fly-home back to `browseX()`.
- **Axial tilt** = `tilt.rotation.z = −0.409` rad (23.4°), fixed. Drag pitch adds to `tilt.rotation.x`, clamped to ±1.2. Fly-to sets `tilt.rotation.x`; close resets it to 0.
- **Sun** = fixed world-space direction `normalize(0.32, 0.18, 0.95)` — because it's world-fixed and the Earth spins under it, the day/night terminator **sweeps** as the globe rotates.
- Clouds drift independently: `clouds.rotation.y += 0.006 * dt`.

### Earth shader (verbatim — this is the look)

Vertex passes the equirectangular `uv`, the world normal, a **local** normal (for the geodesic ocean ripple), and the view direction:

```glsl
varying vec2 vUv; varying vec3 vNormalW; varying vec3 vNormalL; varying vec3 vViewDir;
void main() {
  vUv = uv;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vNormalL = normalize(position);            // geometry-local dir (ocean ripple centre)
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vViewDir = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
```

Fragment — day/night + ocean glint + limb darkening + country highlight + ocean ripple, then a **manual linear→sRGB encode** (critical: raw ShaderMaterial does NOT re-encode, and three uploads sRGB textures as hardware-sRGB so `texture2D` returns *linear* — without the `pow(col, 1/2.2)` the globe renders far too dark):

```glsl
precision highp float;
uniform sampler2D dayTex, nightTex, specTex, uIdMap;
uniform vec3 sunDir;
uniform float uHoverId, uHoverPrevId, uHoverMix, uSelectId;
uniform vec3 uOceanDir; uniform float uOceanActive, uOceanTime;
varying vec2 vUv; varying vec3 vNormalW; varying vec3 vNormalL; varying vec3 vViewDir;

void main() {
  vec3 n = normalize(vNormalW);
  vec3 s = normalize(sunDir);
  float day = smoothstep(-0.32, 0.18, dot(n, s));      // soft, wide terminator → mostly lit

  vec3 dayCol   = texture2D(dayTex,   vUv).rgb;
  vec3 nightCol = texture2D(nightTex, vUv).rgb;

  // ocean sun-glint (specular is bright over water)
  float ocean = texture2D(specTex, vUv).r;
  vec3  hlf   = normalize(s + vViewDir);
  float spec  = pow(max(dot(n, hlf), 0.0), 42.0) * ocean * day;

  vec3 col = dayCol * (0.48 + 1.05 * day);             // ambient fill + strong day side
  col += nightCol * (1.0 - day) * 0.5;                 // city lights only where dark
  col += spec * vec3(0.7, 0.82, 1.0) * 0.28;           // restrained glint (not a wash)
  col = mix(col, col * vec3(0.72, 0.86, 1.12), texture2D(specTex, vUv).r * 0.5); // deepen oceans blue

  // limb darkening — a hint of shadow at the silhouette (no dark ring, no glow)
  float facing = max(dot(n, vViewDir), 0.0);
  col *= mix(0.86, 1.0, smoothstep(0.0, 0.5, facing));

  // country id map (red channel = id). hover cross-fades old→new; selected holds a brighter red + rim
  float sid = texture2D(uIdMap, vUv).r * 255.0;
  float hovCur  = step(0.5, uHoverId)     * (1.0 - step(0.5, abs(sid - uHoverId)));
  float hovPrev = step(0.5, uHoverPrevId) * (1.0 - step(0.5, abs(sid - uHoverPrevId)));
  float hov = max(hovCur * uHoverMix, hovPrev * (1.0 - uHoverMix));
  float sel = step(0.5, uSelectId) * (1.0 - step(0.5, abs(sid - uSelectId)));
  col = mix(col, vec3(0.86, 0.09, 0.10), max(hov * 0.5, sel * 0.62));
  col += sel * pow(1.0 - facing, 3.0) * vec3(0.9, 0.2, 0.2) * 0.4;

  // ocean hover: concentric ripples from the cursor (finger-in-water). GEODESIC distance
  // (acos of the dot) → true circles on the sphere. Masked to water (id 0).
  if (uOceanActive > 0.001) {
    float water = 1.0 - step(0.5, sid);
    float d = acos(clamp(dot(normalize(vNormalL), uOceanDir), -1.0, 1.0));
    float env   = 1.0 - smoothstep(0.0, 0.16, d);                    // compact reach
    float wave  = sin(d * 78.0 - uOceanTime * 3.0);                  // rings travelling out
    float crest = pow(max(wave, 0.0), 3.2) * smoothstep(0.014, 0.05, d);
    float touch = 1.0 - smoothstep(0.0, 0.02, d);                    // contact point
    col += (crest * env * 0.72 + touch * 0.32) * water * uOceanActive * vec3(0.52, 0.80, 1.0);
  }

  col = pow(max(col, 0.0), vec3(0.4545));               // ⚠ linear → sRGB (the #1 gotcha)
  gl_FragColor = vec4(col, 1.0);
}
```

⚠ Every `smoothstep(a,b,x)` here uses `a < b`. The reversed form (`smoothstep(b,a,x)`) renders in software/headless GL but is **undefined on real GPUs** — never write it.

### Clouds shader (a near-invisible whisper)

Only the densest cloud, ~8% alpha on the day side, so the planet reads as a clean topographic Earth, not overcast:

```glsl
uniform sampler2D cloudsTex; uniform vec3 sunDir; varying vec2 vUv; varying vec3 vNormalW;
void main() {
  float c   = smoothstep(0.66, 0.99, texture2D(cloudsTex, vUv).r);
  float day = smoothstep(-0.05, 0.45, dot(normalize(vNormalW), normalize(sunDir)));
  gl_FragColor = vec4(vec3(0.85) * (0.5 + day * 0.5), c * day * 0.08);
}
```
Cloud material: `transparent`, `depthWrite:false`. Atmosphere mesh (`r=1.05`, BackSide, transparent) currently outputs `vec4(0.0)` — a **no-op shell** kept as a hook; the lit globe reads clean on black without a halo. (If you want an atmospheric rim later, it lives here.)

### Starfield

`2000` points on a random shell, radius `45 + rand*25`, parented to the **scene** (not `world`) so they stay fixed as the globe spins. Sizes skewed so most are pinpricks and a few are bright: `size = 1.8 + pow(rand, 2.6) * 4.4`. Each point has a random phase for a gentle twinkle. Custom `ShaderMaterial` (`transparent`, `depthWrite:false`):

```glsl
// vertex
attribute float aSize; attribute float aPhase; uniform float uTime; uniform float uDpr;
varying float vTw;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vTw = 0.72 + 0.28 * sin(uTime * 1.5 + aPhase);      // subtle twinkle
  gl_PointSize = aSize * uDpr * (0.92 + 0.25 * vTw);  // ×DPR so it matches on retina
}
// fragment — soft round dot with a crisp bright centre
varying float vTw;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = pow(smoothstep(0.5, 0.0, d), 2.0);
  gl_FragColor = vec4(vec3(0.9, 0.94, 1.0), min(1.0, a * vTw * 1.15));
}
```
Advance `uTime += dt` each frame. `frustumCulled = false`.

---

## 7. Lighting the loop (per frame)

```
dt = clamp((now - last)/1000, 0, 0.05)
if (!dragging):
  if (!countryOpen)  spin.rotation.y += AUTO_SPIN * dt          // idle drift (0.028 rad/s)
  spin.rotation.y   += velY;  velY *= MOMENTUM_DECAY            // yaw momentum (drag/scroll flick)
  tilt.rotation.x    = clamp(tilt.rotation.x + velX, -1.2, 1.2) // pitch momentum
  velX *= MOMENTUM_DECAY
clouds.rotation.y   += 0.006 * dt
star uTime          += dt
hoverMix            += dt * 5.0   (→ 1)                          // ease the country cross-fade (~0.2s)
oceanActive         += ((oceanHover?1:0) - oceanActive) * min(1, dt*9)  // ease ripple in/out
if (oceanActive > 0) oceanTime += dt
render()
```

Pause the loop when the tab is hidden (`visibilitychange` → skip render, reset `last`). On resize: re-set pixel-ratio + size, update camera aspect, and re-apply `world.position.x = browseX()` if no country is open.

---

## 8. Country picking (the core technique)

**One equirectangular ID map serves BOTH the GPU highlight and the CPU name lookup**, so they can never disagree.

1. **Rasterise once.** Fetch the GeoJSON; draw every country's polygons onto a **4096×2048** canvas filled `#000`, each country filled `rgb(id,0,0)` where `id = feature index + 1` (fits the red channel). Ocean stays black (id 0). `imageSmoothingEnabled = false` (crisp borders); fill with `"evenodd"` (holes). The 4096 width is what lets tiny nations survive as pickable pixels. Wrap it in a `CanvasTexture` with **NearestFilter**, **no mipmaps**, **no color space**. Cache the pixel buffer (`getImageData().data`) for O(1) CPU reads. Record `id → {name, iso3}`, `id → {LABEL_X, LABEL_Y}` (label point for the fly-to), and a sorted `name → id` list for search.
2. **GPU highlight.** The Earth shader samples the ID map at `vUv`; `id == uHoverId → mix red`, `id == uSelectId → brighter red + rim` (see the fragment shader).
3. **CPU name (on pointer move).** Raycast the sphere → world hit → transform into the mesh's local frame → the exact `SphereGeometry` UV:
   `u = (atan2(z, -x) / 2π + 1) mod 1`, `v = 1 - acos(clamp(y,-1,1))/π` → read the cached buffer at `(floor(u·W), floor((1-v)·H))`.
   ⚠ **The screen→NDC math must be** `ndc.y = -(((cy - top)/h)*2 - 1)` — a missing paren silently sends the ray off-sphere.
   ⚠ **Canvas `fill()` antialiases polygon edges**, so a lone border/coast pixel decodes to a garbage id (Nigeria's rim reading "Niger"/"Tanzania"; scattered specks). So the read is a **3×3 majority vote**: keep the centre pixel only if a neighbour backs it (small countries with ≥2px survive), else snap to the dominant land id, else it's ocean.
4. **Ocean.** If the vote lands on water (id 0), name it from the hit lon/lat with a coarse ocean-bounds classifier (Pacific / Atlantic / Indian / Southern / Arctic) and flip on the ripple, feeding the shader the local hit direction (`uOceanDir`) as the ripple centre.

**Fly-to a country.** From the country's label lon/lat, solve the `spin.rotation.y` (and `tilt.rotation.x`) that lands that surface point on **+z** (facing the camera), accounting for the axial-tilt roll — the transform is `Rx(tiltX)·Rz(axial)·Ry(spinY)`; solve for `spinY` and `tiltX`, take the shortest angular path, then GSAP `spin.rotation.y` + `tilt.rotation.x` over **1.3s** `power3.inOut`, and `world.position.x → −1.3` over 1.3s `power2.inOut`.

---

## 9. Layout of the open state (pixel-perfect)

When a country is open, the overlay is `position:absolute; inset:0; z-index:30; pointer-events:none` (globe stays draggable underneath); the back button and panel opt back in.

- **← Globe** back button: `left: 32px`, `top: 32px` on desktop but **`72px` on mobile (<720px)** so it clears the section's floating nav pill (which is centred and spans nearly the full width on a phone — at `top:32px` the back control would sit *under* it and be untappable). Geist 500, `0.66rem`, `letter-spacing: 0.16em`, uppercase, `rgba(255,255,255,0.75)`, a `←` glyph before it. `animation: fade 0.6s ease 0.2s both`.
- **Big country name** (desktop): container `left: 5%; bottom: 4.5%`. Name = Poppins 600, `clamp(1.9rem, 4.6vw, 4.4rem)`, `rgba(255,255,255,0.96)`, `line-height: 0.95`, `text-shadow: 0 8px 60px rgba(3,16,40,0.5)`, `max-width: 46vw`, UPPERCASE. Tagline under it: Geist 500, `0.7rem`, `letter-spacing: 0.34em`, uppercase, `rgba(255,255,255,0.62)`, `margin-top: 14px`.
- **Highlights panel** (desktop): `position:absolute; right:0; top:0; height:100%`, `width: min(48%, 42rem)`, `padding: 0 4% 0 1.5%`, vertical-centred flex column, `gap: 20px`. Contains:
  - **Featured card**: `aspect-ratio: 16/10`, `border-radius: 16px`, `overflow:hidden`, `box-shadow: 0 30px 70px -30px rgba(0,0,0,0.7)`. Inside: a horizontal **track** (`display:flex`) translated `translateX(-index·100%)` with `transition: transform 0.85s cubic-bezier(0.45,0,0.12,1)`. Each slide holds the photo (`object-cover`, dark placeholder + fade-in, §12) + a bottom scrim `linear-gradient(to top, rgba(6,18,44,0.92), transparent 60%)` + label (Poppins 600 `1.2rem`) & blurb (Geist `0.72rem`, `rgba(255,255,255,0.78)`) at `bottom: 24px`. Overlaid: a glass **expand** button `top-right (12px)`, `36×36`, round, `rgba(255,255,255,0.16)` + `blur(6px)` (icon = the diagonal-arrows expand glyph); **prev/next** arrows (`left/right: 8px`, vertically centred, `32×32`, `rgba(0,0,0,0.42)` + `blur(4px)`, chevrons) shown only when there's a prev/next; **position dots** centred at `bottom: 10px`, `gap: 6px`, each `6×6` (active = `16` wide, `#fff`; else `rgba(255,255,255,0.45)`), `transition: all 0.3s`.
  - **Numbered list**: a column; each row = a button, `padding: 10px 0`, `border-top: 1px solid rgba(255,255,255,0.13)`, `opacity: 1` if active else `0.5` (`transition: opacity`). Row = a 2-digit index (Geist `0.6rem`, `rgba(255,255,255,0.5)`, width `1.4rem`) + the place label (Poppins 500, `0.98rem`, `letter-spacing: 0.05em`, uppercase) + (active only) a `6×6` `#e23b3b` dot pushed right.
- **Mobile panel** (<720px): a **bottom sheet** — `position:absolute; inset-x:0; bottom:0`, `max-height: 88vh; overflow-y:auto`, `padding: 1.1rem 5% calc(1.6rem + env(safe-area-inset-bottom)) 5%`, backing `linear-gradient(to top, rgba(6,18,44,0.98), rgba(6,18,44,0.92) 72%, rgba(6,18,44,0.4) 92%, transparent)`. On mobile the **big country name lives INSIDE the sheet as its first child** (above the card, `clamp(1.55rem, 7.4vw, 2.3rem)`) — grouped with the card + list, so it isn't stranded up top with a huge gap. (Desktop keeps the name floating low-left over the shifted globe.) A no-content country on mobile shows the name + "highlights on the way" together at `bottom: 15%`.

**Full-bleed** (any size): `position:absolute; inset:0; z-index:40; overflow:hidden`, click backdrop to close. Two stacked `<img>` filling it (`object-cover`): the small `image` underneath (instant, no blank), and the 4K (`hi` or `image` with `width→3840`) on top starting `opacity:0`, `transition: opacity 0.6s`, → 1 `onload`. A top scrim `linear-gradient(to top, rgba(4,12,30,0.78), rgba(4,12,30,0.05) 45%, rgba(4,12,30,0.45))`. Text block at `bottom: 9%; left: 6%`: eyebrow = COUNTRY (Geist 500, `letter-spacing: 0.42em`, uppercase, `clamp(0.7rem,1.2vw,0.9rem)`, `rgba(255,255,255,0.72)`); title = PLACE (Poppins 600, `clamp(2.4rem, 7vw, 6rem)`, `#fff`, `line-height:1`); blurb (Geist `clamp(0.9rem,1.4vw,1.1rem)`, `line-height:1.5`, `max-width: 34rem`). Round ✕ close, `44×44`, dark glass (`rgba(0,0,0,0.32)` + `blur(6px)`) + `1px solid rgba(255,255,255,0.3)`, white ✕ — the dark fill keeps it legible over bright photos. Position: `top: 32px; right: 32px` on desktop, but **`top: 72px; right: 20px` on mobile (<720px)** so it drops **below** the section's nav pill instead of hiding under the nav avatar. Tap-anywhere (the whole overlay is the backdrop) and **Esc** also close it.

**Hover label** — a click-through element pinned `top-left` that you move imperatively to `translate(cursorX + 18px, cursorY − 34px)`; Poppins 600, `clamp(0.95rem, 1.9vw, 1.5rem)`, `letter-spacing: 0.1em`, uppercase, `#fff`, `text-shadow: 0 2px 22px rgba(0,0,0,0.65)`, `transition: opacity 0.2s`. Opacity `1` over a country, `0.6` over named ocean (signals not-clickable), `0` otherwise.

---

## 10. Switching from one open country to another (the polished bit)

Clicking a *different* country while a panel is open must **transition the details in place** — the panel never disappears/re-opens, and text must never cross-fade into a garbled blur (two big titles / two lists on top of each other). The rule: **animate each part by its own rule**, with the old and new details rendered at once (two stacked layers):

- **Name** (big title): *slides*, fast — outgoing goes **up + fades** (`atlasNameOut`, 0.22s), incoming **rises from below + fades** (`atlasNameIn`, 0.32s). The titles pass instead of overlapping.
- **Details panel** (card + list — the star of the switch): the old **lifts up and fades away** (`atlasDetailsOut`, 0.32s), the new **rises in from below** (`atlasDetailsIn`, 0.58s with 0.24s delay). Staggered (old out fast, new in delayed) so the two lists never superimpose.
- Keep a state `shown` (the settled country) and `outgoing` (the previous, held for ~560ms then dropped). First open / same-country / close swap immediately (`mode: "open"` → the entrance animations). Read `shown` via a ref inside the switch effect and depend only on the selection — depending on `shown` too makes the effect re-run the instant it updates and its cleanup would clear the drop-timer, leaking a ghost layer.
- Within a country, switching the featured place just glides the photo track (`translateX`) — no remount.

---

## 11. Every animation & keyframe

**On-load (CSS transitions, keyed to a `ready` flag):**
- Veil: `opacity: ready ? 0 : 1; transition: opacity 1.15s ease 0.15s`.
- Wordmark: `opacity` + `translateY(14px→0)`, `transition: opacity 0.85s ease 0.45s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.45s` (delayed second beat).
- Search: `opacity` + `translateY(-6px→0)`, `transition: 0.45s ease` (fades in last; also fades out when a country opens).
- Loader dot: `animation: atlasPulse 1.1s ease-in-out infinite`, `opacity → 0` on ready.
- Globe: GSAP `scale 0.001 → 1`, 1.8s `power3.out`.

**On-open:** GSAP fly-to (1.3s `power3.inOut` for spin/tilt; 1.3s `power2.inOut` for `world.x → -1.3`). Name in = `atlasRiseIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s`. Panel in = desktop `atlasSlideIn 0.72s … 0.1s`, mobile `atlasSheetIn 0.68s … 0.1s`. Back button = `atlasFade 0.6s ease 0.2s`.

**On-close (never snaps):** the overlay plays `atlasPanelOut 0.44s cubic-bezier(0.4,0,1,1)` while the globe glides home (GSAP `world.x → browseX`, tilt.x → 0, ~0.9–1.0s `power3.inOut`), then unmounts. Full-bleed close = `atlasFbOut 0.36s` + `atlasCollapseImg 0.4s`. **Esc** backs out one level at a time (full-bleed → panel → globe; a focused search field keeps its own Esc, which clears the query).

**Full-bleed open:** container `atlasFade 0.4s`, image zoom `atlasExpandImg 1.2s cubic-bezier(0.16,1,0.3,1)`, the 3 text lines `atlasRiseIn` staggered at 0.3s / 0.4s / 0.52s.

**Country cross-fade (§10):** `atlasNameIn/Out`, `atlasDetailsIn/Out`.

**Hover country cross-fade:** in-shader — `uHoverMix` eases 0→1 at `dt·5` (~0.2s) while the previous id fades out.
**Ocean ripple:** in-shader — `uOceanActive` eases in/out at `dt·9`; `uOceanTime` advances while active; rings `sin(d·78 − t·3)`.
**Featured track slide:** `transform: translateX(-i·100%); transition: transform 0.85s cubic-bezier(0.45,0,0.12,1)`.
**Card photo fade-in:** each `<img>` starts `opacity:0; transition: opacity 0.5s`, → 1 `onload`; a ref-`complete` check shows cached images instantly and stops re-fading when the track slides; first image gets `fetchpriority="high"`.

**Keyframes (verbatim):**
```css
@keyframes atlasPulse   { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(1.6);opacity:1} }
@keyframes atlasFade    { from{opacity:0} to{opacity:1} }
@keyframes atlasRiseIn  { from{opacity:0; transform:translateY(32px)} to{opacity:1; transform:translateY(0)} }
@keyframes atlasSlideIn { from{opacity:0; transform:translateX(48px)} to{opacity:1; transform:translateX(0)} }
@keyframes atlasSheetIn { from{opacity:0; transform:translateY(70px)} to{opacity:1; transform:translateY(0)} }
@keyframes atlasExpandImg   { from{opacity:0; transform:scale(1.15)} to{opacity:1; transform:scale(1)} }
@keyframes atlasFbOut       { from{opacity:1} to{opacity:0} }
@keyframes atlasCollapseImg { from{transform:scale(1)} to{transform:scale(1.06)} }
@keyframes atlasPanelOut { from{opacity:1; transform:translateY(0)} to{opacity:0; transform:translateY(16px)} }
@keyframes atlasNameIn   { from{opacity:0; transform:translateY(26px)} to{opacity:1; transform:translateY(0)} }
@keyframes atlasNameOut  { from{opacity:1; transform:translateY(0)} to{opacity:0; transform:translateY(-22px)} }
@keyframes atlasDetailsIn  { from{opacity:0; transform:translateY(38px)} to{opacity:1; transform:translateY(0)} }
@keyframes atlasDetailsOut { from{opacity:1; transform:translateY(0)} to{opacity:0; transform:translateY(-28px)} }
```

---

## 12. Interactions & input

- **Drag** (pointerdown/move/up on the canvas): `velY = dx · 0.005`, `velX = dy · 0.005` per move; apply instantly to `spin.rotation.y` (yaw) and `tilt.rotation.x` (pitch, clamped ±1.2). On up, the momentum block in the loop carries + decays it (`× 0.94`). Starting a drag cancels any running fly-to (`kill` the spin/tilt tweens). Works even while a country is open.
- **Click vs drag**: on pointerup, if total movement `< 6px` and a country is under the cursor → **select** it. So a click selects/switches; a drag spins.
- **Scroll/wheel** over the canvas: `preventDefault()`, cancel fly-to tweens, `velY = clamp(velY + deltaY · 0.00034, -0.16, 0.16)` → the globe spins (and eases out via the same decay). Trap is intentional: over the globe, scroll rotates rather than scrolls the page.
- **Hover**: pointermove → `pick()` (3×3-voted). Country → red fill + label; ocean → ripple + dimmed label. Leaving the canvas fades the last highlight out and hides the label.
- **Cursor**: `grab` over ocean, `pointer` over a country, `grabbing` while dragging.
- **Keyboard**: Enter in the search picks the top match; Esc in the search clears the query; Esc otherwise backs out one panel level.
- **Touch**: the whole interaction is built on **Pointer Events**, so mouse and finger share one code path — a touch-drag spins the globe (yaw + pitch) with the same momentum, and a tap (`<6px`) opens a country. `touch-action: none` on **both the root and the `<canvas>`** so the gesture rotates the globe instead of scrolling/zooming the page. Use `setPointerCapture` on down so a finger that slides off the globe keeps dragging, and handle **`pointercancel`** (system gesture, notification, a second finger) by clearing the drag flag — otherwise the globe would freeze mid-drag. On mobile the details panel is a scrollable bottom sheet and the globe stays centred (not glided aside).

---

## 13. Responsiveness

Breakpoint: **`viewport width < 720px` = mobile.**

| | Desktop (≥720) | Mobile (<720) |
|---|---|---|
| Wordmark | W + globe + RLD, globe shifted left (`world.x = -0.4`, flanks `±12.4vh`) so "WORLD" reads centred | just "WORLD" (2rem) at `top: 11%`; globe **dead-centre** (`world.x = 0`) |
| Search | minimal underline, `top: 88px; right: 24px`, `width: min(78vw, 15.5rem)`; results open **downward** | same field, **bottom-centred** (`left: 50%; bottom: 6%; width: 80vw`), results open **upward** (`flex-col-reverse`) so they stay on-screen; keeps it off the globe |
| Big country name | floats `left: 5%; bottom: 4.5%`, up to `clamp(1.9rem,4.6vw,4.4rem)` | **inside the bottom sheet** (first child, above the card), `clamp(1.55rem,7.4vw,2.3rem)` |
| Highlights panel | right column, `min(48%, 42rem)`, slides in from the right | **bottom sheet**, `max-height: 86vh`, scrolls, safe-area padding |
| Resize across 720 | globe re-centres to the correct `browseX()` (only when no country open) | ← same |

Always verify **390×844** (mobile portrait): globe fits, wordmark legible, search doesn't collide with the wordmark, panel sheet scrolls, tap-to-open works.

---

## 14. Tunables

| Constant | Value | Meaning |
|---|---|---|
| camera | fov 30, z = max(6, 1/(0.82·tan(15°)·aspect)) | z=6 on wide screens (globe ≈62% of height); pulls back on portrait so the globe fits ≈82% of width |
| earth radius / clouds / atmo | 1 / 1.006 / 1.05 | shell radii (atmo is a transparent no-op) |
| `AUTO_SPIN` | 0.028 rad/s | idle rotation |
| initial `spin.rotation.y` | 4.0 | first view — Africa/Europe/Middle East/Asia (no spin-up flourish) |
| `DRAG_SENS` / `MOMENTUM_DECAY` | 0.005 / 0.94 | drag → spin, inertia |
| `SCROLL_SENS` | 0.00034 (clamp ±0.16) | wheel deltaY → spin momentum |
| axial tilt | −0.409 rad (23.4°) | `tilt.rotation.z` |
| pitch clamp | ±1.2 | `tilt.rotation.x` limit |
| sun dir | normalize(0.32, 0.18, 0.95) | world-fixed → sweeping terminator |
| `BROWSE_X` / `HEADLINE_DX` | −0.4 / 12.4vh | left-shift so the WORLD wordmark reads centred (desktop only) |
| `world.position.x` on open | −1.3 desktop / 0 mobile | globe glide-aside (mobile keeps it centred behind the bottom sheet) |
| ID map | 4096×2048 | picking resolution (small-country survival) |
| DPR cap | 1.75 | |
| terminator | smoothstep(−0.32, 0.18) | soft, mostly-lit |
| star count | 2000 | sparse fixed sky |

---

## 15. Acceptance checklist

- [ ] Load: black veil **fades up** to reveal the space stage + starfield; the globe **scales in** and **rests on Africa/Europe/Asia** (no spin-up whipping it away); wordmark rises in as a second beat; loader dot fades.
- [ ] "W(🌐)RLD" wordmark: globe is the O, occluded correctly, the **word** is centred (globe a touch left of dead-centre); fades out on select. Mobile: "WORLD" above a centred globe.
- [ ] Globe: day/night terminator sweeps, ocean glint, faint clouds, limb darkening; **bright, not dark** (the sRGB encode is present); reads clean on the black space stage. Day map is **green** (Russia/Canada green, not winter-white).
- [ ] Deep-space stage: near-black gradient + a sparse twinkling **starfield** (fixed as the globe spins), no 8-bit banding (grain dither), soft vignette.
- [ ] Auto-rotates; **drag** spins with momentum; vertical drag rights itself (clamped); **scroll over the globe** spins it.
- [ ] Hover fills the country red + names it under the cursor; fill **cross-fades** between countries; works across all ~180 countries. **No antialiasing garbage** (Nigeria reads "Nigeria"). Hovering open ocean shows the ocean name (dimmed) + **ripples** spreading from the cursor (true circles on the sphere).
- [ ] Click → globe **flies the country to face the camera** then glides left; big name + tagline (low-left); right panel of highlights; list row switches the featured card (0.85s glide); arrows/dots work.
- [ ] Switching straight to another country **transitions in place** (name slides, details lift/rise, staggered) — never a garbled text blur, never a reopen-from-blank, no ghost layer left behind.
- [ ] Featured card → **full-bleed** landmark with `COUNTRY · PLACE` + blurb, cinematic zoom, 4K image; ✕ / backdrop / "← Globe" return. First open of a country shows a **dark placeholder** while the photo loads (no blank flash), then it fades in; cached photos appear instantly.
- [ ] Countries without content still open to a graceful "highlights on the way".
- [ ] Every close **eases out** (panel fades + drifts, full-bleed dissolves, globe glides home) instead of snapping. **Esc** backs out one level at a time.
- [ ] Search is a **minimal underline** field (no pill), top-right on desktop / centred under the wordmark on mobile; hairline brightens on focus; quiet results list; hides while a country is open; Enter picks the top match; aliases resolve (usa, uk, holland…).
- [ ] **390×844** mobile: globe fits, wordmark legible, search doesn't collide, panel is a scrollable bottom sheet with safe-area padding.
- [ ] Clean teardown: textures, geometries, materials, the ID canvas, and all listeners disposed; loop pauses when the tab is hidden.
</content>
