# Full-page soldier animation

## Overview

The soldier renders in a transparent, full-page canvas outside `.portfolio__content`. The canvas stays fixed over the visible page while the 3D model moves and grows with scroll, ending with the complete opaque model and a leftward head turn. Camera fitting keeps the complete model inside the viewport. The former alpha-hash body dissolve has been removed. Pointer events pass through the stage, and only visible mesh hits trigger model interaction.

## Technology

Three.js 0.187.0 renders the original skinned GLB, with one renderer clock for Idle, hover jumping and cursor head tracking. theme-materials.js applies the live site palette and opaque body/visor materials while preserving the color atlas, normals and skinning. scroll-path.js retains linear, bidirectional arc-length mapping across the full active scroll range. The existing GSAP showcase and its scroll library are unchanged.

## Inputs used

| Input                                       | Extracted                                                                                       | Use                                                                     |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Soldier.glb, 2,160,468 bytes                | Body/visor meshes; embedded atlas and normals; Head/Neck skeleton; Idle, Walk, Run, TPose clips | Geometry, skinning, Idle playback, head tracking                        |
| Latest text brief, preserved in inputs.json | Full-page stage outside portfolio content; no movement cropping; model-only interaction         | Body-mounted overlay, geometry-based camera fitting and mesh raycasting |
| Existing #webgl-soldier                     | Canvas moved before .portfolio\_\_content in generated page                                     | Reused directly; source template now matches the user's placement       |
| src/scss/base/\_root.scss                   | Existing light/dark CSS colors                                                                  | Steel/slate armor, blue accents, navy visor                             |

Walk, Run and TPose are not played. The original GLB is loaded in place and remains unchanged.

## Assumptions

- “Full page” is a fixed viewport-sized overlay spanning the page throughout scrolling, rather than a document-height drawing buffer.
- Runtime placement is directly under body so portfolio overflow or transformed ancestors cannot crop the canvas. A pre-existing .soldier-stage is reused and restored on destroy.
- The initial model height is capped at 360 CSS pixels and 55% of viewport height. Actual rig scale still grows from 1 to 4.5; camera fitting can pull back to preserve visibility.
- The model stays fully opaque inside a 24-pixel viewport inset at every scroll position. Full-body fitting remains active through the end; the head still turns 60 degrees left.
- Scroll coordinates remain linear across the document's or supplied element's scroll range. Viewport fitting is a separate rendering operation.
- The stage and canvas never intercept pointer events. Visible mesh hits trigger hover/tap/click interaction and prevent activating underlying links. Empty page space keeps native clicks and scrolling.
- A transparent model-sized keyboard action provides Enter/Space jumping and a visible focus outline, without a control toolbar or full-page focus target.
- Cursor gaze remains decorative across the page. Reduced motion retains a centered, full-body still pose with no zoom, jumping or continuous rendering.
- Embedded materials keep their original maps and use the site palette at runtime. Both materials have opacity 1, transparent false and alphaHash false. No scroll shader changes alpha.

## Run

From the repository root:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080/gsap-animations.html or http://localhost:8080/animations/soldier-3D/index.html. Use HTTP for GLB loading.

Existing Vite workflow:

```sh
npm run dev
npm run build
```

The repository's normal build publishes generated output at the root. Verification builds use /tmp/soldier-build-check with the publishing plugin disabled to avoid unrelated generated changes.

## Customise

CONFIG is exported by soldier.js. soldier.css defines the full-page overlay and model focus outline.

| CONFIG key                                   | Default                                                                   | Effect                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| modelUrl                                     | ./Soldier.glb, relative to module                                         | Model source                                                            |
| clipName                                     | Idle                                                                      | Embedded clip to play                                                   |
| speed                                        | 1                                                                         | Playback multiplier                                                     |
| fieldOfView                                  | 45                                                                        | Camera vertical field of view                                           |
| rotation                                     | Math.PI                                                                   | Initial model heading                                                   |
| pixelRatio                                   | 2                                                                         | Rendering density cap                                                   |
| lightIntensity                               | 3                                                                         | Key/fill brightness                                                     |
| armorShadow                                  | #101722                                                                   | Deep navy shadow/visor color                                            |
| themeTokens                                  | armor: --color-muted; highlight: --color-art-glow; accent: --color-accent | Host CSS palette bindings                                               |
| themeFallbacks                               | See CONFIG                                                                | Matching light/dark colors for embeds without site tokens               |
| textureExposure / textureContrast            | 2 / 0.8                                                                   | Atlas value remapping; retain wear and plate detail                     |
| armorRoughness / armorMetalness              | 0.7 / 0.2                                                                 | Restrained armor sheen                                                  |
| visorRoughness / visorMetalness              | 0.3 / 0.3                                                                 | Visor surface response                                                  |
| visorMaterial                                | Vanguard_VisorMat                                                         | Original visor material selector                                        |
| scrollContainer                              | null                                                                      | Document scrolling element; pass an HTMLElement for a specific scroller |
| scrollPathSamples                            | 2048                                                                      | Arc-length lookup resolution for the path                               |
| scrollInset                                  | 24                                                                        | Visible geometry inset inside the viewport edges                        |
| endScale                                     | 4.5                                                                       | Uniform model scale at the bottom                                       |
| endTurnStart                                 | 0.7                                                                       | Progress where the final leftward head turn begins                      |
| endHeadYaw                                   | -Math.PI / 3                                                              | Final leftward head turn, radians                                       |
| jumpHeight                                   | 0.2                                                                       | Peak jump displacement relative to model height                         |
| jumpDuration                                 | 0.8                                                                       | Jump duration in seconds                                                |
| headBone / neckBone                          | mixamorig:Head / mixamorig:Neck                                           | Original joints used for tracking                                       |
| headYawLimit                                 | Math.PI / 5                                                               | Maximum horizontal turn, 36 degrees                                     |
| headPitchUp / headPitchDown                  | 0.25 / 0.32                                                               | Vertical tilt limits, in radians                                        |
| headResponse                                 | 8                                                                         | Tracking and neutral-return smoothing rate                              |
| headPointerRange                             | 0.8                                                                       | Cursor travel relative to canvas dimensions before the angle limit      |
| neckShare                                    | 0.25                                                                      | Fraction of the turn shared by the neck                                 |
| label                                        | See CONFIG                                                                | Accessible canvas name and interaction help                             |
| loadingText / errorText / webglText          | See CONFIG                                                                | Loading and fallback messages                                           |
| initialModelHeight / initialViewportFraction | 360 / 0.55                                                                | Initial full-body CSS height and viewport cap                           |
| endFrameHeight / endFrameViewportFraction    | 600 / 0.8                                                                 | Reserved final full-body frame and viewport cap                         |
| endFrameAspect                               | 0.5                                                                       | Reserved full-body frame width/height ratio                             |
| boundsPadding                                | 0.035                                                                     | Conservative fitting padding relative to model height                   |
| jumpLabel                                    | Jump soldier                                                              | Model-sized keyboard action label                                       |

## Embed

Include soldier.css and the import map from index.html. soldier.js automatically mounts the existing #webgl-soldier canvas. For manual mounting, use another ID:

```js
import { mountAnimation } from './animations/soldier-3D/soldier.js';
const animation = mountAnimation(document.querySelector('#my-soldier'), {
  scrollContainer: null,
});
animation.pause();
animation.play();
animation.destroy();
```

Do not mount twice on the same canvas. A supplied .soldier-stage wrapper is reused; otherwise a controller-owned wrapper is created. The stage is placed under body while mounted; legacy inline width/height/transform values are overridden. Original stage/canvas attributes and position are restored on destroy. Generated overlays are removed. The canvas is cleared before disposal.

Pass an HTMLElement as scrollContainer for a specific scroller. It uses that element's scrollTop and scrollHeight − clientHeight. The overlay still covers the viewport.

## Layout and interaction

The stage/canvas are fixed at inset:0 with width/height:100% and pointer-events:none. The source template keeps the canvas outside .portfolio\_\_content; runtime mounting also escapes clipping ancestors. There is no moving small canvas rectangle.

The 3D presentation group carries uniform scale and framing translation. The camera view offset places the scroll anchor without moving or clipping the canvas. A conservative full-body box reserves space for jumping. Camera distance accounts for full-model width, height, depth and the scroll anchor's available space. Full-body bounds stay active throughout scrolling, so all opaque geometry remains in frame.

Raycasts first reject positions outside the model's focus bounds, then test the actual skinned meshes. Only real mesh hits consume pointer/click events; the full-page overlay and empty model bounding box do not. A separate model-sized, pointer-transparent button supplies keyboard activation and focus indication.

## Accessibility and browser notes

- Focus the model action and press Enter or Space to jump. No camera/control toolbar is shown.
- Reduced motion disables jumping, cursor tracking and scroll scale/reframing, rendering a still full-body model.
- Visibility and intersection observers suspend rendering. Scroll/layout events redraw paused scenes only when the mapping changes.
- Theme changes update a still or paused frame without restarting playback.
- Destroy removes pointer/click/keyboard, theme, scroll, resize, font and load listeners; disconnects observers; and disposes model/renderer resources.
- Modern WebGL2/import-map browsers and jsDelivr access are required. Renderer/model failures display text status.

## Scroll/path units

The active range is R = max(0, scrollHeight − clientHeight). Arc-length mapping scales the source path by R / sourceLength, so one scroll pixel equals one scroll-path unit. Visible offsets are projected into the viewport and converted to 3D anchor coordinates. Camera fitting preserves visibility; it does not add a temporal scroll tween. Reverse scrolling retraces the same target path. Resize/content changes rebuild the range and endpoints.

The path remains straight; scroll-path.js uses getLength/getPointAt with 2048 numerical divisions for curved replacements. The scale/projection distinction preserves bounded viewport travel without artificially changing page height.

## Verification

The browser script checks full-page canvas dimensions and body placement at 375×667, 768×1024 and 1440×900. It asserts that every body/visor material stays opaque with alpha hashing disabled, then projects every skinned vertex at nine forward/reverse scroll positions to verify the complete model remains in frame. Tests also cover jump visibility, a custom scroller, content-height changes, live resize, background click-through, model-only hover/click/keyboard activation, preventing link clicks behind the model, gaze directions/neutral return/final turn, palette uniforms, normal/atlas preservation, reduced motion and restoring a host-owned stage on destroy.

Production build, JavaScript syntax and whitespace checks passed. A short playback sample checks draw calls and long tasks. See checks/results.json and the viewport screenshots. Physical devices, other browser engines and exhaustive GPU leak profiling were not checked. Geometry samples use a frozen Idle baseline plus an active jump sample; conservative padding accommodates normal Idle motion.

With the HTTP server running and Chrome listening on DevTools port 9223:

```sh
node animations/soldier-3D/tools/verify.mjs
```

The script uses Node 22's native WebSocket.

## Rendering bug fix

The supplied screenshot showed the earlier alpha-hash dissolve: body fragments were discarded using a scroll-driven Head-bone mask, while the visor stayed visible. That was the cause of the speckled appearance and disappearing body.

The mask attribute, shader alpha multiplication, alpha hashing and scroll opacity controller are removed. Both original opaque materials explicitly retain opacity 1, transparent false and depthWrite true. The site's color remapping and original normal map still provide surface detail. Full-body fitting is retained at the bottom instead of transitioning to a hidden-body portrait. The reference screenshot is preserved at assets/pasted-image-.png.

## Source formatting

All Soldier-specific source is formatted: JavaScript modules, embedded browser programs and GLSL, CSS, HTML, JSON, Markdown and the Python input-inspection helper. Soldier integration tags in the GSAP page and its source template are formatted as well. Binary model/image assets are unchanged.

The scoped .prettierrc.json uses two-space indentation, 100-character lines and single-quoted JavaScript strings. Use pinned Prettier without changing project dependencies:

```sh
npm exec --yes --package prettier@3.6.2 -- prettier --write \
  'animations/soldier-3D/*.{js,css,html,json,md}' \
  animations/soldier-3D/tools/verify.mjs \
  animations/soldier-3D/checks/results.json
```

The Python helper uses Black 24.10.0, four-space indentation and 100-character lines; .editorconfig and pyproject.toml record that style. With Black available:

```sh
black --config animations/soldier-3D/pyproject.toml \
  animations/soldier-3D/tools/inspect_inputs.py
```

Embedded browser programs and shader blocks are expanded for readability. Formatting checks, JavaScript/embedded-program AST comparisons, GLSL token comparison and Python AST comparison verified no logic changes. Syntax, production build and the formatted browser verification script passed.
