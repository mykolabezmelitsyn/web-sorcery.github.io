# Motion, by design

Ten interactive chapters turn GSAP techniques into an editorial landing page. Every chapter, control, artwork, and animation lives in `.gsap-container`. The standalone demo and the existing `gsap-animations.html` page share the same content.

## Technology

GSAP 3.15.0 and twelve plugins are vendored locally for offline operation. DOM and SVG handle the typography, interfaces, and artwork; CSS transforms handle the cube; Canvas 2D renders the particle field. Three.js is unnecessary for this scene. Version 3.15.1 was confirmed as current; the repository's installed 3.15.0 is retained and pinned by the vendored files.

## Inputs used

| Input                               | Extracted                                               | Implementation                                    |
| ----------------------------------- | ------------------------------------------------------- | ------------------------------------------------- |
| User brief, preserved in `brief.md` | All 25 categories, at most 15 screens, original artwork | Ten chapters listed below                         |
| `.gsap-container`                   | Single root, scoped selectors and initialization        | `sections.html`, `showcase.css`, `mountAnimation` |
| Cleared site page                   | Existing shared layout and route                        | `src/pages/gsap-animations.njk`                   |

There are no supplied images, videos, or JSON datasets. No brief categories were omitted.

## Chapter and technique map

| Chapter                      | Techniques                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| 01 / First impressions       | Move, rotate, scale, skew, fade, labeled synchronized timeline, magnetic buttons, repeat/yoyo       |
| 02 / A little perspective    | ScrollTrigger, desktop pinning, scrubbing, layered parallax, perspective                            |
| 03 / Words with rhythm       | SplitText character stagger/reveal, TextPlugin typing, ScrambleTextPlugin                           |
| 04 / The scenic route        | DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin custom path, elastic easing                         |
| 05 / A change of pace        | Flip grid/list layout transition, stagger, spring-like back easing                                  |
| 06 / Serious about play      | Draggable, InertiaPlugin throw, grid snap, Physics2DPlugin gravity and velocity, bounce             |
| 07 / Small gestures          | Overlapping crossfade, enter/exit page transitions, carousel, pointer swipe, menu, modal, accordion |
| 08 / Beyond the surface      | Generated SVG landscape, clipping/mask reveal, centered pinned scale-up, cursor following           |
| 09 / Organized chaos         | Canvas 2D particles, pointer repulsion, touch ripple, infinite marquee                              |
| 10 / Every side of the story | Interactive CSS 3D cube, drag and keyboard rotation, horizontal scrolling, scroll-to navigation     |

## Assumptions

- Ten chapters are sufficient to cover all requested categories.
- Full-screen means a minimum viewport height minus the 76px component navigation; dense content can grow vertically.
- The palette is the home page’s blue, slate, and neutral surfaces, following its light/dark theme; system fonts avoid external requests.
- Canvas 2D satisfies the Canvas/WebGL category. CSS 3D provides a real six-face cube without a WebGL dependency.
- Desktop pinning requires a container at least 768px wide and a viewport taller than 720px. Compact or short screens stack the finale and use lighter parallax.
- Pause and reduced motion remove scroll pinning, reveal content, and stop ambient motion. Direct navigation and controls remain operable with immediate state changes.
- Pausing resets entrance effects to their readable final state. Playing restarts the animation setup.
- One showcase is automatically mounted per document. `mountAnimation` supports manual mounts in separate roots; unique IDs should be supplied when embedding multiple copies for accessible label references.
- Application integration is local in the current repository; no external deployment was requested.

## Run

From the repository root:

```bash
python3 animations/motion-lab/tools/serve.py
```

The helper serves the repository with a connection backlog suitable for parallel ES-module requests. A standard `python3 -m http.server 8080` also works for the compiled page.

Open `http://localhost:8080/animations/motion-lab/index.html` for the standalone demo or `http://localhost:8080/gsap-animations.html` for the compiled site page. Local ES modules need HTTP; opening with `file://` is unsupported.

To regenerate and rebuild after content changes:

```bash
python3 animations/motion-lab/tools/sync-page.py
npm run build
```

`sections.html` is the shared content source. The sync tool writes the standalone HTML and the named site template. Vite bundles local modules into the generated root page. The standalone folder can be copied to any static host as a complete unit.

## Customise

| CONFIG key       | Default                          | Effect                                            |
| ---------------- | -------------------------------- | ------------------------------------------------- |
| `duration`       | `0.8`                            | Entrance and interaction duration                 |
| `ease`           | `power3.out`                     | Default entrance easing                           |
| `stagger`        | `0.06`                           | Letter/card offsets in seconds                    |
| `accent`         | `null` (inherit)                 | Accent and particle color                         |
| `paper`          | `null` (inherit)                 | Main background                                   |
| `ink`            | `null` (inherit)                 | Main foreground                                   |
| `breakpoint`     | `768`                            | Compact motion breakpoint                         |
| `particleCount`  | `100`                            | Desktop count; halved on compact containers       |
| `particleSpeed`  | `0.7`                            | Particle drift                                    |
| `loopDuration`   | `24`                             | Rotation and marquee period                       |
| `scrollDistance` | `0.65`                           | Depth pin scroll length/container width           |
| `snap`           | `24`                             | Drag grid spacing                                 |
| `cubeStep`       | `30`                             | Arrow-key rotation in degrees                     |
| `typingText`     | `Make a little room for wonder.` | Typed line; update accessible markup too          |
| `scrambleText`   | `ORDER FROM CURIOSITY`           | Scramble final line; update accessible markup too |
| `pauseLabel`     | `Pause animation`                | Running-state button text                         |
| `playLabel`      | `Play animation`                 | Paused-state button text                          |

Edit prose and artwork in `sections.html`. Chapter-specific geometry, palettes, and timings are beside their implementation in CSS and JavaScript.

## Embed

Copy `sections.html`, `showcase.css`, `showcase.js`, and `vendor/` together. Include the stylesheet and module from the host document. The module automatically mounts the first `.gsap-container`.

For manual lifecycle control on another root:

```js
import { mountAnimation } from "./showcase.js";

const container = host.querySelector(".gsap-container");
const animation = mountAnimation(container, { particleCount: 60 });
animation.pause();
animation.play();
// On removal or route unmount:
animation.destroy();
```

Do not manually mount the root already initialized by the module. `destroy()` aborts listeners, removes observers and the ticker callback, kills dragging, reverts scoped contexts and SplitText, restores original HTML and inline styles, and removes this mount's ScrollTriggers.

## Accessibility and browser notes

Real text, meaningful SVG/canvas labels, keyboard controls, visible focus rings, native dialog behavior, menu expanded states, carousel announcements, and a visible keyboard-operable pause control are included. System reduced motion disables ambient loops, large reveals, parallax, and pinning. Static content remains readable if scripts fail. The canvas has a descriptive label and requires Canvas 2D support.

Modern Chromium, Firefox, and Safari with ES modules, ResizeObserver, Pointer Events, native dialog, and CSS 3D are targeted. Chrome was tested; other engines and physical touch devices were not. The decorative artwork uses local SVG, CSS, and canvas only. Vendored GSAP files retain upstream license headers; consult `vendor/gsap/LICENSE-NOTES.md` and the GSAP Standard License for terms.

## Verification

See `checks/results.json` for viewport, keyboard, interaction, reduced-motion, integrated page, resize, and cleanup results. `checks/motion-results.json` records playing interactions, pinning, swipe dispatch, real mouse dragging, canvas pause, and sampled playback long tasks. `checks/performance-trace.json` is a Chrome timeline recording of particle playback. Screenshots cover three required sizes and the individual chapters.

The browser runners use the session's Playwright installation and Chrome executable; adjust their imports and executable paths on another machine. Synthetic swipe dispatch verifies gesture logic; real mobile hardware was not tested. No video timing reference was supplied, so no frame-by-frame reference comparison applies.

Color defaults inherit the home page tokens. Explicit `CONFIG.accent`, `paper`, or `ink` values override them. Standalone fallbacks mirror the home page and follow the system theme. Canvas colors update immediately when the site theme changes, including while paused.

## Centered image scaling

Chapter 08 pins `.ml-image-stage` when its center reaches the viewport center. A scrubbed timeline scales `.ml-image` from `CONFIG.imageStartScale` (`0.72`) to `1`, over `CONFIG.imageScrollDistance` (`0.9`) viewport heights of scrolling. The stable wrapper is pinned; only its child scales around its center. The image stays centered horizontally and vertically throughout the scale-up. Pause and reduced motion show the full-size image without pinning. The replay button scrolls back to the start of the sequence.

`checks/image-results.json` records bounding boxes at 10%, 50%, and 90% progress at all three required viewport sizes; `tools/verify-image.mjs` asserts both center coordinates stay within two pixels and the image grows.

## Scroll-driven SVG route

Chapter 04 begins when 10% of its parent section is visible: ScrollTrigger start is `"10% bottom"`. The circle, path drawing, and morph follow scroll progress until the section bottom reaches the viewport center. Scrolling backward reverses the sequence; stopping scroll holds the circle still. `CONFIG.routeStartVisibility` adjusts the threshold (default `0.1`). The replay button scrolls back to that start. Reduced motion and Pause preserve the static artwork.

The image mask opens equally on all four sides from the exact center, matching its explicit `50% 50%` scaling origin. It no longer reveals from the left edge.
