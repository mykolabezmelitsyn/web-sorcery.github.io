# Lottie handbook practice fixtures

Original teaching artwork created for this handbook; no third-party artwork,
images, fonts, or authoring-tool project is included.

- `dot.json`: a 256 × 256 composition, 30 FPS, `ip=0`, `op=60` (two seconds).
- `study.lottie`: a dotLottie v2 ZIP containing animations `dot` and `alternate`
  and the `button` state machine.
- `button-state-machine.json`: the same state-machine definition, exposed for
  inspection. Boolean input `isActive` switches between `idle` and `active`.
- `fallback.svg`: a static dot for testing failure/reduced-motion presentation.

Both animations expose the color slot `accent`. The bundle contains no named
light/dark themes. The dot demonstrates playback mechanics; author the spinner,
checkmark, error icon, and richer interaction states required by the projects.

The JSON, bundle, frame seeking, state-machine transition, and color override
were checked with lottie-web 5.13.0 and/or DotLottie Web 0.81.0 in Chrome.
State-machine methods are marked experimental in the pinned dotLottie package.

For the guide's Vite exercises, copy the fixtures into `public/animations/`.
Adjust root-relative URLs for a deployment under a path prefix. For the two
original roadmap snippets, copy the JSON/bundle as `success.json` and
`success.lottie`; those names do not turn the moving-dot fixture into a
production success illustration.
