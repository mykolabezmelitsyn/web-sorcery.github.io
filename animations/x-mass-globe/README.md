# X-Mass Globe

The Christmas snow globe sits at the bottom of the page with falling snow inside it and
across the viewport. Drag horizontally, or focus the globe and use the arrow keys to rotate it.
Click, tap, or press Enter or Space to shake it. The presents hop and tip in different
directions on each shake before settling back onto the snowy base.
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
| Presents revision | Random movement during shakes | Ten gift boxes and their matching ribbons move together |
| Lighting revision | Stronger glass depth | Grazing-angle reflection and two broad reflected lights |
| Rotation revision | Horizontal rotation on desktop and mobile | Mouse and touch drag with a keyboard alternative |
| `x-mass-globe.html` | Existing title and empty body | Preserved title and added the globe stage and page snowfall |
| `ChristmasSnowGlobe.glb` | Diorama, glass, base and authored shake pivot | Rendered asset and sphere bounds for particle placement. The static snow mesh is hidden in favor of live snow. |

## Assumptions

- A 1.25-second damped oscillation approximates the movement of a hand-held snow globe.
- A dark pine background complements the red and gold in the supplied model.
- Snow continuously respawns within the dome, with fewer active flakes on narrow screens.
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
| `desktopBreakpoint` | 768 px | Switches layout density and rock amplitude |
| `fallSpeed` | 0.34 units/s | Sets the nominal speed of falling snow |
| `shakeAngle` | 0.17 rad | Sets the peak rocking angle before damping |
| `dragRotationSpeed` | 0.012 rad/px | Sets horizontal drag sensitivity |
| `dragThreshold` | 7 px | Separates a drag from a click or tap |
| `keyboardRotationStep` | 15° | Sets the turn per arrow-key press |
| `shakeDuration` | 1.25 s | Sets the duration of a shake |
| `shakeFrequency` | 3.6 Hz | Sets the rocking frequency |
| `presentHop` | 0.22 model units | Caps the vertical travel of each present |
| `presentSlide` | 0.075 model units | Caps the sideways travel of each present |
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
