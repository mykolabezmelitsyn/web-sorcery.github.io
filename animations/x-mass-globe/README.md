# X-Mass Globe

The Christmas snow globe sits at the bottom of the page with falling snow inside it and
across the viewport. Drag horizontally, or focus the globe and use the arrow keys to rotate it.
Click, tap, or press Enter or Space to shake it. The rocking sends the presents
swaying, turning independently in three axes, and rising with the simulated water current. They drift down to randomized spots on the snow over about five seconds. Successive shakes send them higher until
the glass limits their rise. On the first shake that reaches the ceiling, one present
passes through the top, grows to three times its size and rotates slowly. After three seconds
at that size, the globe slides down and the rotating present fills 50% of the screen width.
Click or tap the centered present to open it. The wrapping shrinks away, one of five
models appears, and confetti replaces the page snow. The revealed model targets 50% of
the viewport width, with a 90% height limit for tall models. Drag in any direction or use any of the four arrow keys
to turn the revealed model. Select Retry at the top to reload the page
and start again.
A supported mobile device can also trigger the same effect through its motion sensor.

## Technology

Three.js 0.187.0 loads the existing glTF model, lights the scene and renders the moving snow in
a single draw call. A transparent 2D canvas draws the ambient flakes. Both canvases share the
same animation loop. The glass shader uses the dome normals to add grazing-angle reflections
and warm and cool studio highlights.

## Inputs used

| Input | Extracted | Use |
| --- | --- | --- |
| Text brief | Continuous snowfall, shared click and motion shake, responsive sizing | Playback, sensor detection and camera framing |
| Layout revision | Bottom placement, page-wide snow, no separate controls | Stage layout, ambient snowfall and globe activation |
| Product rotation revision | Rotate the opened model in any direction | Screen-space trackball for mouse and touch, four arrow keys for keyboard |
| Product reveal revision | Open the centered present and replace snow with confetti | A random model loads on demand and becomes horizontally rotatable |
| `x-mass-presents/*.glb` | Five self-contained glTF models | Box of chocolates, champagne, perfume, scented candle and wristwatch gift box |
| Showcase revision | Three-second rotation hold, then globe exits and present centers | A lens-space calculation fits the rotating present to 50% viewport width |
| Finale revision | A present escapes on the first ceiling-reaching shake | The box and bow are detached together, enlarged and rotated while shake input is disabled |
| Landing revision | Presents settle at new spots | Candidate positions are checked against the glass, platform and other gifts |
| Water revision | Synchronize glass and presents as if submerged | The rocking signal drives a damped current and the gifts rise during the shake |
| Present drift revision | Slow, weightless motion | A separate 4.8-second float with gradual takeoff and landing |
| Present height revision | Successive shakes gain height inside the glass | Each box and bow shares a lift limited by the dome |
| Mobile width revision | Globe spans 90% of the viewport on mobile | Projected glass and base silhouette drives camera fit |
| Presents revision | Random movement during shakes | Ten gift boxes and their matching ribbons move together |
| Lighting revision | Stronger glass depth | Grazing-angle reflection and two broad reflected lights |
| Rotation revision | Horizontal rotation on desktop and mobile | Mouse and touch drag with a keyboard alternative |
| `x-mass-globe.html` | Existing title and empty body | Preserved title and added the globe stage and page snowfall |
| `ChristmasSnowGlobe.glb` | Diorama, glass, base and authored shake pivot | Rendered asset and sphere bounds for particle placement. The static snow mesh is hidden in favor of live snow. |

## Assumptions

- A 1.25-second damped oscillation approximates the movement of a hand-held snow globe.
- A dark pine background complements the red and gold in the supplied model.
- Snow continuously respawns within the dome, with fewer active flakes on narrow screens.
- On short viewports, vertical fit keeps the globe and base visible before the finale. The product close-up prioritizes the requested width and may extend vertically beyond a short screen.
- Sensor detection uses a 12 m/s² threshold and requires a quiet period before rearming.

## Run

From the repository root:

```sh
python3 -m http.server 8080
```

Visit `http://localhost:8080/x-mass-globe.html`. The Nunjucks source under `src/pages` includes
the same page and bundles the existing model when running `npm run build`. Use HTTPS when
testing on a phone or tablet.

## Customise

| CONFIG key | Default | Effect |
| --- | --- | --- |
| `modelUrl` | URL from the globe model preload | Sets the glTF model |
| `fieldOfView` | 34° | Sets the vertical perspective |
| `glassReflectionStrength` | 0.76 | Scales the reflected studio lights |
| `glassEdgeStrength` | 0.64 | Scales reflection at the glass silhouette |
| `maxDpr` | 2 | Caps drawing-buffer density |
| `mobileSnowCount` | 150 | Sets the narrow-layout snow density |
| `desktopSnowCount` | 260 | Sets the wide-layout snow density |
| `pageSnowDensity` | 1.2 flakes per 10,000 CSS pixels | Sets ambient snowfall density |
| `pageSnowLimit` | 180 | Caps the page-wide flake count |
| `mobileGlobeWidth` | 90% | Targets the visible globe width below the desktop breakpoint |
| `mobileFramePadding` | 10% in normalized coordinates | Reserves vertical framing room on mobile |
| `desktopBreakpoint` | 768 px | Switches layout density and rock amplitude |
| `fallSpeed` | 0.34 units/s | Sets the nominal speed of falling snow |
| `shakeAngle` | 0.17 rad | Sets the peak rocking angle before damping |
| `dragRotationSpeed` | 0.012 rad/px | Sets horizontal drag sensitivity |
| `dragThreshold` | 7 px | Separates a drag from a click or tap |
| `keyboardRotationStep` | 15° | Sets the turn per arrow-key press |
| `shakeDuration` | 1.25 s | Sets the duration of a shake |
| `shakeFrequency` | 3.6 Hz | Sets the rocking frequency |
| `presentHop` | 0.22 model units | Sets the first shake’s nominal hop height |
| `presentHopStep` | 0.18 model units | Sets the lift gained per shake |
| `presentDriftDuration` | 4.8 s | Sets the duration of the presents’ rise and descent |
| `presentRiseFraction` | 28% | Sets the fraction of the drift spent rising |
| `waterResponse` | 12 s⁻¹ | Sets the speed of the current’s response to the rocking |
| `waterTravel` | 0.19 model units | Scales sideways travel driven by the current |
| `presentGlassClearance` | 0.025 model units | Reserves distance between the presents and the glass |
| `presentSlide` | 0.075 model units | Caps the sideways travel of each present |
| `presentLandingRange` | 0.14 model units | Sets the search radius for a new landing spot |
| `presentCeilingHits` | 1 | Sets how many ceiling-reaching shakes trigger the finale |
| `presentFinalScale` | 3 | Sets the scale of the floating present |
| `presentEscapeDuration` | 2.8 s | Sets the duration of the escape and scale-up |
| `presentSpinSpeed` | 0.52 rad/s | Sets the finale rotation speed |
| `presentShowcaseHold` | 3 s | Sets the rotation hold at the first enlarged size |
| `presentShowcaseDuration` | 1.6 s | Sets the globe’s exit and the present’s move to center |
| `presentShowcaseWidth` | 50% | Targets the centered present’s projected width |
| `presentUnwrapDuration` | 0.55 s | Sets how quickly the wrapping shrinks away |
| `presentRevealDuration` | 0.72 s | Sets how quickly the revealed model grows |
| `revealedModelWidth`, `revealedModelHeight` | 50%, 90% | Set the revealed model framing limits |
| `productTrackballRadius` | 34% of the shorter viewport dimension | Sets drag rotation sensitivity |
| `confettiColors` | Red, gold, green, blue and pink | Sets the confetti palette |
| `presentPlatformRadius` | 0.69 model units | Keeps box footprints on the snow-covered platform |
| `presentTwist` | 1.2 rad | Caps each gift’s randomized yaw while floating |
| `presentTilt` | 0.48 rad | Caps tipping during a hop |
| `motionThreshold` | 12 m/s² | Sets the sensor trigger threshold |
| `motionQuietThreshold` | 4 m/s² | Defines quiet sensor readings |
| `motionQuietTime` | 280 ms | Sets the quiet period before the sensor rearms |

## Embed

Reuse the page markup, import map and inline script. Within the script scope, mount on the
globe stage and await the control handle. Call `destroy()` before removing the stage if it is
mounted in a longer-lived page.

```js
const animation = await mountAnimation(container, { mobileSnowCount: 120 });
animation.pause();
animation.play();
animation.destroy();
```

## Accessibility and browser notes

The globe is keyboard-focusable. Enter or Space shakes it, and Left or Right rotates it.
Vertical touch gestures can scroll the page. Reduced motion stops the animated effects
and keeps direct rotation available. The first globe activation requests sensor
permission where the browser requires it. Click, tap and keyboard interaction remain
available if sensor access is denied.
