# Draggable motion cube

The existing cube in `gsap-animations.html#motion-cube` can be rotated by dragging its faces. Its automatic spin stops on the first drag or arrow-key input, and it keeps the chosen orientation on release.

## Technology

The existing GSAP 3.15.0 setup updates CSS 3D rotations. Pointer capture keeps a drag active when the pointer leaves the cube; the existing GSAP media context owns animation and event cleanup. Three.js is unnecessary for this CSS cube.

## Inputs used

| Input                                      | Extracted                              | Used in                                  |
| ------------------------------------------ | -------------------------------------- | ---------------------------------------- |
| Text brief in `inputs.json`                | Mouse-driven rotation of `motion-cube` | Pointer handlers in `initCube`           |
| `src/scripts/modules/gsap-showcase.js`     | Current timeline and lifecycle         | Manual control and loop gating           |
| `src/templates/partials/gsap/showcase.njk` | Existing cube container                | Keyboard focus and accessible label      |
| `src/scss/components/_gsap-showcase.scss`  | Current perspective and theme          | Grab cursor, touch-action, focus outline |

## Assumptions

- First interaction stops automatic spinning until the showcase remounts.
- Release holds orientation without inertia.
- Touch and arrow keys supplement mouse interaction.
- Reduced motion disables automatic motion and permits explicit user rotation.

## Run

From the repository root:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080/gsap-animations.html#motion-cube`.

For development and production builds:

```sh
npm run dev
npm run build
```

## Customise

| `CUBE_CONFIG` key     | Default | Effect                         |
| --------------------- | ------- | ------------------------------ |
| `dragDegreesPerPixel` | `0.5`   | Rotation per CSS pixel of drag |
| `keyboardStep`        | `15`    | Rotation per arrow-key press   |

The existing timeline retains its five-second segments and original axis keyframes. Layout and perspective remain in the existing cube SCSS rules.

## Integration and cleanup

This is an incremental change to the existing `initShowcase(root)` and `initCube(environment)` integration, rather than a second animation mount. Event listeners use the existing AbortController; media-context cleanup releases active pointer capture and removes the drag state. The loop observer checks whether the user has taken control before resuming an offscreen animation.

## Accessibility and browser notes

Tab to the cube stage and press arrow keys to rotate it. Focus has a visible outline. Mouse, touch, and pen use Pointer Events; only the cube disables native touch gestures, leaving the rest of the page scrollable. Reduced motion prevents autonomous rotation.

## Verification

Run the included browser check against a local HTTP server and Chromium debugging service at port 9223:

```sh
node animations/motion-cube/tools/verify.mjs
```

Screenshots and results are stored in `checks/`. The browser check verifies drag sensitivity, holding orientation after release, and keyboard rotation at 375×667, 768×1024, and 1440×900, plus reduced-motion stability. Syntax, formatting, and a production build are checked separately. The cube fixture removes the unrelated Soldier overlay to isolate pointer input; a visible Soldier overlapping the cube retains priority over pointer events. Touch hardware was not tested.
