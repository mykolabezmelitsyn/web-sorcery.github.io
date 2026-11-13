# Kinetic atlas

Ten full-viewport studies turn the existing Web Sorcery palette into an interactive field guide to motion. The standalone page and the GSAP site page share the same content, styles, and JavaScript. All scene markup, selectors, styles, and initialization are scoped to `.gsap-container`.

## Technology

GSAP 3.15.1 drives CSS transforms, inline SVG, and Canvas 2D. ScrollTrigger, ScrollToPlugin, SplitText, TextPlugin, ScrambleTextPlugin, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, Flip, Draggable, InertiaPlugin, and Physics2DPlugin are loaded from pinned jsDelivr URLs and registered before mounting. CSS perspective covers the requested 3D transform category; a separate WebGL renderer is unnecessary.

## The ten screens

| Screen        | Techniques                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| Arrival       | Move, rotate, scale, skew, fade, stagger, synchronized timeline, magnetic button, hover/focus                   |
| Depth         | ScrollTrigger, desktop pinning, linear scrubbing, parallax, perspective, 3D rotation, interactive six-face cube |
| Typography    | Accessible SplitText, typing, scrambling, character reveals, replay                                             |
| Vector routes | DrawSVG, shape morphing, custom scroll-linked MotionPath, labeled synchronization                               |
| Layout        | FLIP grid/list transition, stagger, responsive geometry                                                         |
| Playground    | Drag, throw, inertia, snap, gravity, velocity, bounce easing, keyboard control                                  |
| Interface     | Enter/exit page transitions, crossfade carousel, touch swipe, menu, modal, native accordion                     |
| Imagery       | Original inline SVG, clipping, mask, zoom, scroll reveal, following cursor                                      |
| Constellation | Canvas 2D, graphical object tweens, particles, pointer attraction, elastic staggered burst                      |
| Horizons      | Desktop horizontal scrolling, mobile stacked cards, infinite marquee, repeat/yoyo, scroll navigation            |

## Inputs used

| Input                           | Extracted                                                      | Where used                                    |
| ------------------------------- | -------------------------------------------------------------- | --------------------------------------------- |
| `brief.md`                      | Exact user brief; all categories, root class, ten-screen limit | Scene plan and implementation                 |
| `src/scss/base/_root.scss`      | Existing light/dark slate and blue palette                     | Scoped CSS aliases and original illustrations |
| `src/pages/gsap-animations.njk` | Existing site page and layout                                  | Integrated landing page                       |

There are no input images or video references. All illustrations are native SVG, CSS, or canvas; no external image requests are made. Input measurements and assumptions are in `inputs.json`.

## Assumptions

- Ten sections cover all categories; desktop pinning adds scroll distance, not extra screens.
- The page-transition demonstration is a miniature three-page site inside screen seven.
- Canvas 2D fulfills the Canvas/WebGL category; CSS perspective fulfills 3D transforms.
- On narrow or short viewports, depth and finale pins become flowing layouts. The image frame remains centered during its zoom. Sections may grow beyond one viewport to keep mobile content accessible.
- Reduced motion or the pause control yields calm static scenes; direct UI controls and keyboard dragging remain usable.
- Pausing rebuilds the static presentation and resets transient demonstrations; playing starts the active presentation again.
- Native CSS/SVG shapes replace all external imagery. Serif and sans-serif system fonts avoid font downloads.

## Run

From the repository root:

```sh
python3 -m http.server 8080
```

Open either:

- `http://localhost:8080/animations/kinetic-atlas/index.html`
- `http://localhost:8080/gsap-animations.html`

The existing project also supports:

```sh
npm run dev
npm run build
```

An HTTP server is recommended because browser module security can block `file://` imports. The CDN dependencies require an internet connection on a cold cache; content remains readable if loading fails.

## Edit content

`sections.html` is the canonical shared markup. After changing it, synchronize the two page entries:

```sh
python3 animations/kinetic-atlas/tools/sync-pages.py
npm run build
```

`showcase.css` and `showcase.js` are the only runtime files besides the markup. The built site also retains its existing shared header, navigation, and theme control outside the showcase.

## Customise

Pass overrides to `mountAnimation(container, options)` or edit `CONFIG` at the top of `showcase.js`.

| Key                | Default                            | Effect                                                           |
| ------------------ | ---------------------------------- | ---------------------------------------------------------------- |
| `version`          | `3.15.1`                           | Matching CDN dependency version; selected before library loading |
| `desktop`          | `(min-width: 768px)`               | Desktop media condition                                          |
| `mobile`           | `(max-width: 767px)`               | Mobile media condition                                           |
| `pinHeight`        | `(min-height: 800px)`              | Minimum viewport height for desktop pins                         |
| `reduced`          | `(prefers-reduced-motion: reduce)` | Static presentation condition                                    |
| `ease`             | `power2.out`                       | Default entrance curve                                           |
| `duration`         | `0.7`                              | Default entrance duration                                        |
| `stagger`          | `0.06`                             | Default entrance stagger                                         |
| `pinOffset`        | `80`                               | Offset below the host site's header                              |
| `routeStart`       | `center center`                    | Start when the parent section is centered in the viewport        |
| `routeEnd`         | `bottom center`                    | Complete when the parent section bottom reaches viewport center  |
| `loopDuration`     | `28`                               | Orbit and marquee loop duration                                  |
| `dragGrid`         | `24`                               | Playground snap distance                                         |
| `particlesDesktop` | `48`                               | Desktop particle count                                           |
| `particlesMobile`  | `24`                               | Mobile particle count                                            |
| `particleDistance` | `100`                              | Maximum connection distance                                      |
| `pixelRatio`       | `2`                                | Canvas pixel ratio cap                                           |
| `colors`           | Blue light/dark fallbacks          | Canvas theme fallback; CSS tokens normally supply the color      |

Scene-specific timing and geometry are grouped inside each initializer. The original content and its labels stay in semantic markup. CSS aliases inherit the site's `--color-*` tokens; standalone fallbacks follow the system light/dark preference.

## Embed and cleanup

Insert the shared markup, link `showcase.css`, and use:

```js
import {
  loadLibraries,
  mountAnimation,
} from "/animations/kinetic-atlas/showcase.js";

await loadLibraries();
await document.fonts.ready;
const root = document.querySelector(".gsap-container");
const animation = mountAnimation(root, { particlesDesktop: 36 });
animation.pause();
animation.play();
// Before removing this dedicated animation root:
animation.destroy();
```

The module automatically mounts existing `[data-atlas]` roots. Repeated mounting returns the current instance. `destroy()` is idempotent: it aborts listeners, disconnects observers, removes ticker callbacks, reverts this root's GSAP/media contexts and ScrollTriggers, closes dialogs, and restores initial markup and attributes. Use a dedicated root: restoring markup also replaces descendant nodes.

## Accessibility and browser notes

Real headings, original readable text, labeled SVG/canvas artwork, accessible SplitText, visible keyboard focus, and native dialog/details controls preserve meaning. Arrow keys move the draggable circle; Home resets it. Arrow keys and swipe navigate the carousel. Escape closes the dialog/menu. The pause button uses `aria-pressed`; reduced motion disables autonomous motion and motion-only replay buttons. No flashing effects are used.

Use modern Chromium, Firefox, and Safari with modules, Pointer Events, `ResizeObserver`, abortable event listeners, `inert`, native dialog, and small viewport units. The tested environment is Chromium. CSS includes `vh` before `svh`, scoped dark-mode fallbacks, and prefixed image masking. Legacy engines are not polyfilled; failed startup preserves static stories and artwork.

## Performance and verification

Pointer followers use reusable `quickTo` tweens. Canvas uses persistent particle objects, squared-distance connection checks, a capped pixel ratio, and a single GSAP ticker that stops offscreen or in hidden tabs. Loops use the same visibility gate. No permanent `will-change` declarations or extra animation clock are installed. ResizeObserver refreshes geometry with one scheduled frame; breakpoints revert their own contexts.

```sh
node --check animations/kinetic-atlas/showcase.js
node animations/kinetic-atlas/tools/verify.mjs
```

Browser checks require the HTTP server on 8080 and Chromium remote debugging on 9223. `checks/results.json` records actual results; screenshots cover 375×667, 768×1024, 1440×900, reduced motion, the integrated page, light theme, and blocked-CDN fallback. Checks include real mouse dragging, touch swipe emulation, keyboard control, FLIP, menu, dialog Escape, accordion, physics, pause/play, live resize, and destroy/remount. A DevTools rendering trace is saved as `checks/performance-trace.json`.

Physical mobile hardware, Firefox/Safari, real-user Core Web Vitals, and CDN availability under every network condition are not verified. The short steady-state long-task sample is not an FPS guarantee. SVG morphing, clipping, text updates, and canvas drawing still require main-thread/paint work.

## Route scroll behavior

The route circle, stroke drawing and shape morph are scrubbed by a single ScrollTrigger. Motion starts at `center center`: the parent `.atlas-paths` section center aligns with the viewport center. It finishes at `bottom center`, and reverses continuously when scrolling upward. Before the start, the circle stays at the first path point. The “Travel again” button scrolls back to the start instead of starting a separate playback clock. `CONFIG.routeStart` and `CONFIG.routeEnd` expose these positions. Reduced motion keeps the existing static endpoint.

## Interactive cube

The depth screen includes a dedicated six-face CSS 3D cube subsection. Move the mouse anywhere over its stage to rotate it; the last orientation remains on pointer leave. Touch users drag the cube (empty stage space preserves vertical page scrolling). Focus the stage and use arrow keys for 15-degree steps. Pause/reduced motion presents a static cube. The subsection preserves the original ten-screen composition and adds no external images or rendering dependency.

`CONFIG.cubePitch` (-22) and `cubeYaw` (32) set the starting angles. `cubeRange` (160) controls mouse rotation; `cubeDragSensitivity` (0.6) sets touch degrees per pixel; `cubeKeyboardStep` (15) sets keyboard increments; `cubeResponse` (0.35 seconds) controls smoothing. All pointer rotations reuse two `quickTo` tweens. The existing media context reverts them and releases active touch capture on cleanup.

The cube mouse/keyboard check is included in `tools/verify.mjs`. Run `node animations/kinetic-atlas/tools/verify-cube-touch.mjs` for the focused emulated touch-drag check; its result is stored in `checks/cube-touch.json`.

## Centered image zoom

The `.atlas-image-frame` pins when its center reaches the viewport center and stays there while the artwork scales, the shutter reveals and the clip opens. ScrollTrigger releases the frame into normal page flow afterward, with pin spacing keeping later content aligned. Scrolling upward reverses the same sequence. `CONFIG.imageScrollFactor` (1.2 × frame height) and `imageScrollMinimum` (320 CSS pixels) set its scroll interval; refresh recalculates it after resizing. Reduced motion and user pause leave the image unpinned and static.

Run `node animations/kinetic-atlas/tools/verify-image-pin.mjs` to check centering and reverse scrolling at mobile, tablet, desktop and integrated-page sizes, plus release, reduced motion and cleanup. Results are saved to `checks/image-pin-results.json`.
