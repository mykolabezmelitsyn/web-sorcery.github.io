# Showcase performance improvements

The existing GSAP showcase keeps its eleven scenes, timings, controls, reduced-motion behavior, and responsive layouts. Pointer effects now reuse animation objects, the particle renderer avoids transient point allocations, and initialization has stronger retry and cleanup handling.

## Technology and inputs

The existing GSAP 3.15.0 and twelve plugins remain in use. All plugins are used by existing scenes; loading order and eager availability are preserved to avoid changing behavior. No new rendering framework or animation clock was added.

| Input                                  | Extracted                                              | Use                  |
| -------------------------------------- | ------------------------------------------------------ | -------------------- |
| User request in `inputs.json`          | Improve performance and preserve current functionality | Scope of all changes |
| `src/scripts/modules/gsap-showcase.js` | Pointer, canvas, loader and lifecycle implementations  | Optimized in place   |
| Existing showcase markup and styles    | Scene structure and interaction targets                | Preserved            |

## Changes

- Reuse magnetic-button movement and elastic-return tweens.
- Reuse image pointer and opacity tweens; read geometry before transform writes.
- Use direct cube rotation setters and explicitly restore its inline styles.
- Reuse particle points and compare squared connection distances.
- Share pending library downloads across mounts and evict failed requests for retry.
- Clear initialization state after load failure or root disconnection.
- Clean up partially initialized scenes and make teardown idempotent.
- Remove the duplicate initial ScrollTrigger refresh.

## Assumptions

- Preserve automatic animation timings, particle counts, artwork and controls.
- Preserve the existing pause/reset and responsive-remount behavior.
- Preserve eager plugin loading; lazy scene loading would change availability and timing.
- Keep layout-driven accordion and Flip effects to preserve their presentation.

## Run

From the repository root:

```sh
npm run dev
npm run build
```

For the generated static page:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080/gsap-animations.html`.

## Customise and integration

`CUBE_CONFIG.dragDegreesPerPixel` remains `0.5`; `keyboardStep` remains `15`. Particle counts remain 60 desktop / 34 mobile, and connection distance remains 85 CSS pixels. Existing durations and breakpoints are unchanged.

The existing `initShowcase(root)` API returns a teardown function asynchronously. Call it when removing the showcase. This incremental update does not add a second mount API. Pointer setters restore their source styles through the existing cleanup registry.

## Verification

```sh
node --check src/scripts/modules/gsap-showcase.js
node animations/showcase-performance/tools/verify.mjs
```

The browser check requires a repository HTTP server on port 8080 and Chromium remote debugging on port 9223. It checks cube dragging and keyboard rotation at three viewport sizes, reduced motion, pointer-context retention, carousel, accordion, modal, Flip, pause/resume, and repeated teardown. Results and screenshots are in `checks/`.

The fixture removes the separate Soldier overlay so pointer checks target the showcase. Physical touch hardware, older browsers, field Core Web Vitals, and low-end-device FPS are not measured. No numeric FPS or Web Vitals improvement is claimed.
