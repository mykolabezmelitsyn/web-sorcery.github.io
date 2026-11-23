# Falling Leaves

A full-viewport autumn landscape with five varieties of 3D leaves drifting across it. Move the mouse near a leaf to push it away. The leaf eases back to its falling path as the pointer moves away.

## Technology

Three.js draws up to five instanced batches in a transparent canvas. The GLTF loader reads the GLB once and decodes its dedicated web leaf scene. An orthographic camera keeps the falling paths and pointer radius aligned, while a separate perspective camera supports inspection.

## Inputs used

| Input                     | Extracted                                                                                              | Used in                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Falling-leaf brief        | Full-screen section, continuous descent, individual variation, pointer repulsion and responsive canvas | `src/pages/gsap-animations.njk`, `leaves.css`, `leaves.js`           |
| `leaves.glb`              | Five leaf meshes in the `Web Leaf Assets` scene, with geometry, vertex colours and a shared normal map | GLTF loader, instanced batches and inspection                        |
| `oboinastol.com_2301.jpg` | 1920×1080 lake and amber woodland                                                                      | CSS background, cropped proportionally with `background-size: cover` |

## Assumptions

- The section appears directly before the final content section on the GSAP Animations page. Its width follows the page container and its height follows the viewport.
- The supplied woodland scene and baked clips are skipped. Procedural paths are needed to recycle the individual leaves and react to the pointer.
- The desktop shows 44 leaves and widths below 768px show 24. Touch scrolling stays available during the falling scene. Inspection supports drag, pinch and keyboard controls.
- Rendering targets a 60 Hz display. Actual frame rate depends on the browser, device and available WebGL acceleration.

## Run

From the project root:

```sh
npm ci
npm run build
python3 -m http.server 8080
```

Open `http://localhost:8080/gsap-animations.html#falling-leaves`.

## Customise

| CONFIG key                     | Default              | Effect                                          |
| ------------------------------ | -------------------- | ----------------------------------------------- |
| `desktopLeaves`                | `44`                 | Number of leaves across the desktop section     |
| `mobileLeaves`                 | `24`                 | Number of leaves below 768px                    |
| `size`                         | `[0.38, 0.9]`        | Leaf diameter range in world units              |
| `viewHeight`                   | `10`                 | Height of the orthographic scene in world units |
| `fallSpeed`                    | `[0.65, 1.45]`       | Per-leaf descent speed range                    |
| `sway`                         | `[0.12, 0.52]`       | Horizontal flutter amplitude range              |
| `flutter`                      | `[0.8, 2.25]`        | Flutter phase speed range                       |
| `spin`                         | `[0.25, 0.85]`       | Tumble speed range                              |
| `repulsionRadius`              | `1.8`                | Maximum pointer influence radius                |
| `repulsionStrength`            | `23`                 | Maximum outward acceleration                    |
| `returnSpring`                 | `8`                  | Pull back toward the unperturbed path           |
| `drag`                         | `4.5`                | Resistance applied to displacement velocity     |
| `maxDpr` / `maxPixels`         | `1.6` / `2560000`    | Drawing-buffer caps                             |
| `mobileQuery`                  | `(max-width: 767px)` | Breakpoint for the smaller batch count          |
| `inspectAngle` / `inspectZoom` | `π / 7` / `1.18`     | Inspector button rotation and zoom increments   |

## Embed

Copy the section markup from `src/pages/gsap-animations.njk`, load `leaves.css`, and mount it from a Vite-resolved module.

```js
import { mountAnimation } from "./animations/falling-leaves/leaves.js";

const leaves = mountAnimation(document.querySelector(".falling-leaves"), {
  desktopLeaves: 36,
});
leaves.pause();
leaves.play();
leaves.destroy();
```

## Accessibility and browser support

Use **Pause animation** to stop the loop. The system reduced-motion setting shows a still frame. **Inspect leaf** runs on demand, with mouse, touch and keyboard controls. The background remains visible if WebGL or model loading is unavailable. Rendering suspends when the section is off-screen or the tab is hidden.
