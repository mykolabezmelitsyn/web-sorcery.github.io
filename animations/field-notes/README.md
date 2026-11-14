# Field Notes

A single editorial page about taking a slower look at the world. The flow moves from an intimate forest image to a collage, a changing landscape, a rolling sentence, a sideways gallery, and a set of collectible visual notes. It uses only the ten supplied photographs and the existing site color tokens.

## Technology

GSAP 3.15.0, ScrollTrigger, Flip, and SplitText are copied locally from the repository's installed package. Vite bundles the integrated page; the standalone version uses native ES modules and has no build step. GSAP 3.15.1 was confirmed as the current release, but the installed version is retained to avoid dependency changes. CSS perspective is sufficient for the shallow card tilt; WebGL is not needed.

## Inputs used and animation traceability

Both the video and Markdown description of every selected example were read. Reference sheets are in `checks/reference/`; extracted metadata, palettes, sizes, and normalized changed-pixel paths are in `inputs.json`.

| Example in `GSAP-Demos`          | Extracted behavior                                                                                        | Destination in `sections.html` and `animation.js`                          |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `Cursor-driven perspective tilt` | Shallow X/Y tilt that eases toward the pointer                                                            | `#fn-home`, `.fn-tilt-card`, `quickTo` pointer and keyboard handlers       |
| `Scrubbed bento gallery`         | Whole collage expands into its central tile; reverse scroll restores it                                   | `#fn-collection`, `.fn-bento-grid`, `fn-bento` ScrollTrigger               |
| `Image Mask On Scroll`           | Reversible full-frame reveal from right to left with a moving vertical boundary                           | `#fn-perspective`, `.fn-mask-reveal`, `fn-mask` ScrollTrigger              |
| `Horizontal Text`                | Horizontal sentence travel with individually bending/rotating glyphs                                      | `.fn-wave-section`, SplitText, `fn-wave` ScrollTrigger                     |
| `Horizontal scrolling gallery`   | Portrait cards arrive, travel left at staggered heights, then depart upward                               | `#fn-horizons`, `.fn-gallery-track`, `fn-gallery` timeline                 |
| `FLIP Carousel`                  | Four equal-width layout slots change order; the wrapping card shrinks temporarily while crossing the edge | `#fn-saved`, `moveCarousel`, Flip and a temporary decorative wrapping copy |
| `Curve swipe`                    | A bowed panel rises, flattens, holds, then recedes with footer scroll progress                            | Footer, `data-curve`, editable SVG path and one labeled timeline           |

Reference-derived regions carry a `data-reference` attribute with the exact demo name. The custom hero entrance is a separate, explicitly user-requested addition marked `data-custom-motion="hero-text-reveal"`. There are no idle loops or animated navigation effects. The existing shared site layout remains outside the component.

The unused examples are `MotionPath Waypoints`, `Pinned panels with overscroll`, and `Shader on Scroll`. They were not incorporated because they would add competing transitions or rendering machinery to this narrative; no behavior is claimed from them.

## Photography and theme

| Source image (unchanged file name) | Role                                              |
| ---------------------------------- | ------------------------------------------------- |
| `oboinastol.com_416.jpg`           | Hero forest, mask base, winter gallery card       |
| `oboinastol.com_2301.jpg`          | Central bento landscape and autumn gallery card   |
| `oboinastol.com_2331.jpg`          | Mask reveal, bento tile, reflective gallery card  |
| `oboinastol.com_1645.jpg`          | Valley bento tile and opening gallery card        |
| `oboinastol.com_484.jpg`           | Architecture bento tile and gallery card          |
| `oboinastol.com_1344.jpg`          | Macro berries bento tile                          |
| `oboinastol.com_130.jpg`           | Chameleon bento tile and first collectible card   |
| `oboinastol.com_822.jpg`           | Flowers bento tile and second collectible card    |
| `oboinastol.com_931.jpg`           | Imaginative bento tile and third collectible card |
| `oboinastol.com_97.jpg`            | Dragonfly bento tile and fourth collectible card  |

All files are copied byte-for-byte from `source-images/` into `assets/`, retaining their names. `tools/sync-page.py` converts the local paths into Vite source paths for the site template, so production builds copy and hash the images automatically. No external images, placeholders, generated substitutes, web fonts, or network libraries are loaded. Image width/height attributes reserve their dimensions, meaningful alt text is supplied, and all images below the first screen load lazily; the hero image remains eager and high priority.

The integrated page inherits `--color-*` directly from `src/scss/base/_root.scss`. That file and its tokens are unchanged. `style.css` defines no color literals. `theme.css` mirrors the existing tokens for the standalone demo. The existing site theme toggle and saved theme work on the integrated page; the standalone version follows system light/dark preference. Photographic colors are the original asset colors, not added brand tokens.

## Assumptions and adaptations

- The requested destination is the existing `gsap-animations.html` route, with `.gsap-container` as its isolated root.
- Seven selected techniques are sufficient; not every remaining example needs to be used.
- Field Notes is a fictional visual journal. No real travel service, location accuracy, or commercial claims are implied.
- Scroll-linked scenes have no fixed playback duration. Their progress follows scroll distance; the reference videos show manual scroll without scroll telemetry. Exact source scroll-to-time error cannot be calculated.
- Content, type, photographic subjects, and overall composition are intentionally adapted. Pixel matching is not a target.
- The mask uses two supplied still photographs in place of the reference's moving action scene. Its reveal behavior is reproduced; the motion inside the original movie is not.
- The bento starts compact and expands from its center. Its scale is capped by source dimensions to prevent upscaling the central photograph. The component width is capped at 1920px.
- Compact containers use shorter scroll distances. The mobile carousel shows part of the row and rotates its first card into view with controls; card widths remain equal.
- Pause and reduced motion remove pins, reveal the imagery, wrap the wave sentence into readable text, and make the gallery horizontally scrollable. Direct carousel state changes remain available without movement.
- Pause restores readable static states; Play rebuilds the scroll-linked sequences. There are no continuously running tickers or ambient animations.

## Run

From the repository root:

```bash
python3 animations/field-notes/tools/serve.py
```

Open `http://localhost:8080/gsap-animations.html` for the integrated page or `http://localhost:8080/animations/field-notes/index.html` for the standalone version.

The standalone folder is complete and can be copied to any static host. Native ES modules require HTTP; `file://` is not supported. The normal project workflow remains:

```bash
npm run dev
npm run build
```

After editing shared content:

```bash
python3 animations/field-notes/tools/sync-page.py
npm run build
```

## Customise

| CONFIG key            | Default           | Effect                                           |
| --------------------- | ----------------- | ------------------------------------------------ |
| `duration`            | `0.6`             | FLIP carousel duration in seconds                |
| `carouselWrapScale`   | `0.45`            | Edge-wrap shrink factor, matching the reference  |
| `ease`                | `power2.inOut`    | Carousel transition easing                       |
| `tiltDuration`        | `0.5`             | Perspective pointer lag                          |
| `tiltAngle`           | `8`               | Maximum perspective tilt in degrees              |
| `bentoScale`          | `2.55`            | Maximum collage zoom, capped by image resolution |
| `bentoScroll`         | `1.5`             | Bento pin length in viewport heights             |
| `maskScroll`          | `1.2`             | Wipe pin length in viewport heights              |
| `waveScroll`          | `1.8`             | Minimum wave pin length in viewport heights      |
| `waveAmplitude`       | `45`              | Glyph displacement in pixels                     |
| `waveRotation`        | `28`              | Glyph rotation in degrees                        |
| `waveBand`            | `0.22`            | Wave region width/container width                |
| `galleryScroll`       | `1.1`             | Gallery scroll distance/overflow ratio           |
| `galleryEnter`        | `100`             | Card entry distance in percent                   |
| `compactBreakpoint`   | `768`             | Motion breakpoint based on container width       |
| `compactScrollFactor` | `0.7`             | Compact pin duration multiplier                  |
| `pauseLabel`          | `Pause animation` | Running-state control label                      |
| `playLabel`           | `Play animation`  | Paused-state control label                       |

Edit copy and asset choices in `sections.html`; layout sizes are in `style.css`. The existing palette is inherited, with no new palette controls.

## Embed and cleanup

Copy the markup from `sections.html`, and load `style.css` and `animation.js` with the accompanying `vendor/` and `assets/` directories. Supply the existing site theme tokens or include `theme.css` for the standalone token definitions. The module automatically mounts the first `.gsap-container.field-notes`.

```js
import { mountAnimation } from "./animation.js";

const container = document.querySelector(".gsap-container.field-notes");
// Repeated mounting returns the existing instance instead of adding duplicate triggers.
const animation = mountAnimation(container, { tiltAngle: 6 });
animation.pause();
animation.play();
// When removing this component or changing routes:
animation.destroy();
```

Pass options on the first manual mount if overriding auto-mount defaults; subsequent calls return the existing instance. `destroy()` removes observers and listeners, reverts the contexts, media branches and SplitText, removes pin spacers, and restores the original markup and component attributes. It does not kill unrelated page animations.

## Accessibility, performance, and browser notes

Pause is visible and keyboard operable. Reduced motion removes the large movement. Images have useful alt text; the wave keeps a separate real-text heading for screen readers. FLIP next/previous controls, live status, arrow-key operation, card tilt arrow keys, and visible focus states are provided. No flashing, autoplay carousels, or hover-only required information is present.

Modern Chromium, Firefox, and Safari with ES modules, native CSS container queries, ResizeObserver, and Pointer Events are targeted. Chrome is the tested engine. Scroll animation uses transforms, clip paths, cached glyph geometry, one GSAP clock, scoped contexts, and container-based resize invalidation. No custom render loop runs when the page rests. Screen-reader behavior, physical mobile devices, and other browser engines are not manually tested.

## Verification and evidence

- `checks/results.json`: viewport, four pinned scroll sequences, equal-sized FLIP order, keyboard controls, pause, resize, image decoding, reduced motion, cleanup, and integrated route results.
- `checks/reference/`: original reference filmstrips at 2fps; `checks/curve-reference/` adds the complete Curve swipe recording sampled at 20fps.
- `checks/capture-results.json`: captured scene states and a sampled playback long-task result.
- `checks/performance-trace.json`: Chrome timeline recording during a reversible image wipe.
- `.reanimate/field-notes/`: private motion spec, recorded clone videos, and state-by-state comparison sheets. This evidence is ignored by Git.
- `report.html` and `report.pdf`: final implementation report with screenshots and limitations.

The verification runners use the session's Playwright module and local Chrome executable. Adjust their import and executable paths on a different machine; they are optional development helpers, not runtime dependencies. Bun is unavailable, so the reference extraction and capture use local ffmpeg, Pillow, and sandboxed Playwright/Chrome. Comparison is at adapted visual states and measured progress; no unsupported pixel-match or exact reference timing claim is made.

The horizontal sentence starts fully outside the right edge of its stage, then enters from the right as scrolling advances. Its scroll distance includes this entrance as well as its leftward travel, and the final glyph wave settles normally. Reduced motion continues to show a readable wrapped sentence.

## Carousel smoothness correction

The original next transition produced a 984px completion-time jump at 1440px viewport width. `absolute: true` removed the other cards from grid flow, so the wrapping card occupied the wrong slot until FLIP cleanup. The carousel now keeps every card in flow (`absolute: false`), uses a correctly positioned wrapping copy inside the relative carousel window, and combines FLIP, exit, and reentry in one timeline. Movement uses the full card-plus-gap stride. The edge card shrinks to `CONFIG.carouselWrapScale` (`0.45`) and grows back, following the reference video; final card dimensions remain equal. Duration is `0.6s`. The most recent input during a transition is queued. Pause, reduced motion, and resize complete the single timeline atomically.

`checks/carousel-before-results.json` and `checks/carousel-after-results.json` contain requestAnimationFrame geometry traces for both directions. Normalized frame displacement stays below 0.12 card widths per 16.67ms in the corrected desktop/tablet runs, compared with 3.21 before the fix. Row height remains stable. Three sizes, rapid input, mid-transition pause/resize, and reduced motion were checked. High-resolution reference frames are in `checks/carousel-reference/`; recordings and synchronized comparison states are in `.reanimate/field-notes/carousel-*`.

## Curve swipe footer

The curved footer panel follows scrolling. As the footer reaches the sticky navigation, it pins while the panel rises, holds its covered state, and recedes. Scrolling backward reverses the effect, and stopping scroll holds the current shape. The action button has been removed. This adapts the Curve swipe geometry to the user's requested scroll trigger while retaining the existing blue theme.

`curveScroll` (`1.4`) sets the pin distance in viewport heights; its end is clamped to the document's maximum scroll so the final state is reachable. `curveCoverDuration` (`0.65`), `curveHoldDuration` (`0.8`), and `curveExitDuration` (`0.5`) now act as relative scroll-timeline weights, not elapsed seconds. `curveBend` (`0.6`) controls the bow. Pause and reduced motion remove the pin and show a static footer. The scoped motion context owns the entire sequence and its cleanup.

`checks/curve-results.json` records scroll progress, idle hold, reverse behavior, pause, reduced motion, cleanup, and three viewport sizes. The earlier click-trigger checks are retained in `checks/curve-click-results.json`. Reference frames remain in `checks/curve-reference/`; the earlier click-based comparison images document the source geometry before this trigger adjustment.

## Custom hero text reveal

On initial load, the heading in `.fn-hero-copy` unfolds character by character through line masks, using a subtle 3D roll and upward movement. The eyebrow appears first, and the introductory paragraph follows word by word. This custom effect was explicitly requested by the user in addition to the seven reference-derived techniques. The link and hero photograph are not part of the entrance.

The sequence finishes in about 1.7 seconds and runs once per mount. Completed text is restored to its original markup, including the italic word and explicit line breaks; SplitText masks and temporary accessibility attributes are removed. Resizing, pausing, reduced motion, or hiding the tab settles active text to its readable final state. It does not restart when scroll animations are rebuilt. Without JavaScript, the text remains visible.

`heroTitleDuration` (`0.85`), `heroCharStagger` (`0.025`), `heroParagraphDuration` (`0.55`), and `heroWordStagger` (`0.04`) control its pacing. Heading line masks reserve descender room inside a flow-root, so cleanup does not change the heading’s height. `checks/hero-results.json` records three screen sizes, height stability, text restoration, once-only behavior, pause, reduced motion, no-script fallback, and destruction during playback.

## Image loading

The first-screen hero photograph uses `loading="eager"` and `fetchpriority="high"`. All 20 remaining image elements use native `loading="lazy"` and `decoding="async"`, retaining their intrinsic dimensions. The startup collage decode/preload request has been removed. Existing image-load listeners refresh ScrollTrigger after lazy images arrive; the browser chooses its near-viewport loading threshold.
