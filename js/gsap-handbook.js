const chapters = [
  {
    name: "1. Get oriented and set up",
    intro:
      "Essential · Start with basic HTML, CSS, and JavaScript. No animation-library experience is assumed. Build a mental model before choosing plugins.",
    checkpoint:
      "Create the first demo, change its distance and duration, and explain which part is the target and which part is animation configuration.",
    lessons: [
      {
        name: "What GSAP does",
        explanation:
          "GSAP (GreenSock Animation Platform) changes JavaScript property values over time. A tween animates targets; a timeline arranges tweens and controls them together. CSS animation support is included in core. Plugins add tasks such as scroll triggers or SVG morphing. Start with this complete HTML file: its button moves and rotates the tile.\n\nA target is the thing being changed; a property is an attribute such as position or opacity. A tween interpolates between values, meaning it calculates intermediate values over time. A playhead is the current position in an animation’s time. A timeline coordinates child playheads; a plugin adds a capability to core. Nothing here requires a framework.\n\nChoose GSAP when sequencing, interruption, or coordinated state changes make a CSS transition awkward. CSS is still a good choice for simple hover transitions. Start by editing this standalone file, then learn the smaller fragments below.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/",
        kind: "html",
        code: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>My first GSAP animation</title>\n  <style>\n    body { padding: 32px; font: 16px system-ui; }\n    .box { width: 72px; height: 72px; background: #2563eb;\n            border-radius: 12px; margin: 24px 0; }\n  </style>\n</head>\n<body>\n  <button type="button" id="play">Animate</button>\n  <div class="box" aria-hidden="true"></div>\n  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n  <script>\n    document.querySelector("#play").addEventListener("click", () => {\n      gsap.fromTo(".box", { x: 0, rotation: 0 }, {\n        x: 160, rotation: 180, duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.8,\n        ease: "power2.out", overwrite: "auto"\n      });\n    });\n  </script>\n</body>\n</html>',
        syntax: "gsap → Tween → Timeline → optional plugins",
      },
      {
        name: "Install with npm and register plugins",
        explanation:
          "For a bundled app, install gsap and import only the plugins you use. Register imported plugins before use. Keep core and plugins on the same version. GSAP 3.13+ distributes the formerly Club plugins through public npm; older private-registry instructions are obsolete. The rest of this guide uses browser fragments with core already loaded, except explicitly marked module and React examples.\n\nUse either script tags or module imports for a given setup, rather than loading core twice. A bundler resolves package imports such as gsap/ScrollTrigger; a plain browser script does not resolve them by itself. In a production project, pin a tested release, commit the lockfile, and include only the plugins you need. The CDN examples in this guide pin both core and plugins to 3.15.0.",
        level: "Essential",
        requires: "npm + a JavaScript bundler; ScrollTrigger",
        source: "https://gsap.com/docs/v3/Installation/",
        kind: "module",
        code: '// Terminal: npm install gsap@3.15.0\n// app.js — process with a bundler such as Vite.\n// HTML: <div class="box">Hello GSAP</div>\nimport { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\n\ngsap.registerPlugin(ScrollTrigger);\ngsap.from(".box", {\n  y: 40, opacity: 0, duration: 0.6,\n  scrollTrigger: { trigger: ".box", start: "top 85%" }\n});\nconsole.log(gsap.version);',
        practice:
          "Replace the CDN setup with module imports in a small bundled app. Check gsap.version before adding an effect.",
        syntax: "npm install gsap@3.15.0",
      },
      {
        name: "Version and license boundaries",
        explanation:
          "This handbook targets GSAP 3.15.0, verified against the official package metadata and current docs on October 20, 2026. Use gsap rather than legacy GSAP 2 names such as TweenMax and TimelineMax. context() and matchMedia() need 3.11+; the SplitText autoSplit/onSplit examples need 3.13+; easeReverse needs 3.15+.\n\nGSAP and its formerly members-only plugins are available at no charge, including for permitted commercial projects, under the standard GSAP license. This is a custom license with restrictions, including certain competing visual animation builders; no-charge availability does not mean unrestricted redistribution or MIT licensing. Consult the linked license for the actual terms. Importing a plugin remains necessary even when it is available in the package.",
        level: "Essential",
        requires: "GSAP 3.15.0 reference; standard GSAP license",
        source: "https://gsap.com/community/standard-license/",
        kind: "html",
      },
      {
        name: "Choose targets and understand the vars object",
        explanation:
          "Targets can be a CSS selector, element, array, NodeList, or plain object. A selector animates every match. The vars object mixes animated properties with settings such as duration and callbacks. Durations and delays use seconds. Run your code after its elements exist; a missing selector has nothing to animate.\n\nA vars object is just a JavaScript object holding animated values and special settings. When omitted, duration is 0.5 seconds and ease is power1.out. Use explicit values while learning. HTML fragments in this handbook assume the core script from the first lesson has loaded and that the shown elements exist before their script runs. Each fragment is a separate example, so repeated class names are intentional.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/gsap.to()/",
        kind: "html",
        code: '<p class="item">One</p>\n<p class="item">Two</p>\n\n<script>\nconst items = document.querySelectorAll(".item");\ngsap.to(items, {\n  x: 32, color: "#2563eb", duration: 0.7,\n  onComplete: () => console.log("Both items finished")\n});\n</script>',
        syntax: "gsap.to(targets, { properties, duration, ease, ... })",
      },
    ],
  },
  {
    name: "2. Build reliable tweens",
    intro:
      "Essential · Learn how an animation chooses its start, end, units, and current state. Keep the visual effect small while testing these mechanics.",
    checkpoint:
      "Create an entrance using from(), then rewrite it with fromTo(). Explain why set() is different from a visible transition.",
    lessons: [
      {
        name: "to, from, and fromTo",
        explanation:
          "to moves from current values to supplied values. from starts at supplied values and ends at the existing state, which is useful for entrances. fromTo specifies both ends; put duration and ease in the second vars object. These independent paragraphs demonstrate all three approaches.\n\nThink about the authoring state first: CSS often describes the final visible layout, so from() is convenient for entrances. Use to() for interaction that should continue from the current appearance. Use fromTo() when both ends are deliberately fixed, such as replaying a demonstration. All three create Tween instances; calling them starts playback unless paused or delayed. Avoid replaying independent from tweens on a target already in motion without managing their starting state.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/gsap.fromTo()/",
        kind: "html",
        code: '<p class="to">Move to the right</p>\n<p class="from">Enter from below</p>\n<p class="from-to">Explicit start and end</p>\n\n<script>\ngsap.to(".to", { x: 80, duration: 1 });\ngsap.from(".from", { y: 24, opacity: 0, duration: 1 });\ngsap.fromTo(".from-to",\n  { x: -40, opacity: 0 },\n  { x: 40, opacity: 1, duration: 1, ease: "power2.out" }\n);\n</script>',
        syntax:
          "gsap.to(target, vars) · gsap.from(target, vars) · gsap.fromTo(target, fromVars, toVars)",
      },
      {
        name: "Set a state without animating",
        explanation:
          "set applies values immediately, like a zero-duration tween. It is useful for initialization or a nonanimated state. autoAlpha combines opacity with visibility: at zero it hides the element with visibility: hidden. It does not manage focus or application state for you.\n\nOpacity alone leaves an element in the accessibility and focus model. visibility hides it visually, but neither option decides when your app should move focus or expose expanded content. Keep semantic state separate from animation settings. Prefer setting only properties your animation owns; broad transform or style resets can destroy layout styling supplied elsewhere.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/gsap.set()/",
        kind: "html",
        code: '<div class="box">Animate me</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script>\ngsap.set(".box", { x: 20, rotation: -8, autoAlpha: 1 });\n</script>',
        syntax: "gsap.set(target, vars)",
      },
      {
        name: "Transforms, CSS values, and units",
        explanation:
          'x and y are transform translations, with numbers interpreted as pixels; rotation uses degrees. xPercent and yPercent are relative to the target’s own size. Use camelCase for CSS properties. This tile shifts half its own width, turns, and changes color without changing its document-flow position.\n\nA transform changes the rendered appearance without making neighboring elements reflow. Layout properties such as width do affect layout. Use x/y for translation and scale/rotation for their specific components rather than continually replacing the entire transform string. xPercent refers to the target, not its parent or viewport. Supply strings like "20vw" when a different unit is intentional; use CSS for the unanimated layout.',
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/",
        kind: "html",
        code: '<div class="box">Animate me</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script>\ngsap.to(".box", {\n  xPercent: 50, rotation: 12, scale: 1.1,\n  transformOrigin: "left center", backgroundColor: "#7c3aed",\n  duration: 0.8, ease: "power2.out"\n});\n</script>',
        syntax: "x · y · xPercent · scale · rotation · transformOrigin",
      },
      {
        name: "Relative and function-based values",
        explanation:
          "Relative strings add to or subtract from the starting value. Functions compute a value for each target when the tween initializes, rather than on every frame. This example moves three items by different distances and rotates each an additional quarter turn.\n\nRelative values are resolved from a tween’s starting state, so repeated interactions can accumulate them. Function-based values are useful when targets need different distances or responsive measurements. They are not continuously responsive: a value computed at initialization stays cached until you invalidate or recreate that animation. Keep measurement functions free of avoidable DOM writes.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/gsap.to()/",
        kind: "html",
        code: '<p class="item">First</p>\n<p class="item">Second</p>\n<p class="item">Third</p>\n\n<script>\ngsap.to(".item", {\n  x: index => 20 + index * 30,\n  rotation: "+=90", transformOrigin: "left center",\n  duration: 0.8\n});\n</script>',
        syntax: 'x: "+=40" · x: (index, target, targets) => value',
      },
      {
        name: "Animate an object and render a counter",
        explanation:
          "GSAP can animate numeric object properties without a DOM target. Render the changing value in onUpdate. This counter rounds the animated number and formats it for display; the final value is 2,400. Avoid announcing every frame to assistive technology.\n\nInterpolating an object separates animation timing from rendering. The same technique can update canvas coordinates, a chart renderer, or a shader parameter. onUpdate runs frequently, so keep its work cheap and update only what changed. If a counter conveys important information, expose a stable final description rather than asking a live region to announce every intermediate number.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/gsap.from()/",
        kind: "html",
        code: '<p>Visitors: <output id="count-demo">0</output></p>\n\n<script>\nconst counter = { value: 0 };\nconst output = document.querySelector("#count-demo");\ngsap.to(counter, {\n  value: 2400, duration: 1.5, ease: "power1.out",\n  onUpdate() {\n    output.textContent = Math.round(counter.value).toLocaleString();\n  }\n});\n</script>',
        syntax: "gsap.to(object, { value, onUpdate })",
      },
      {
        name: "Initialization, immediateRender, and cached values",
        explanation:
          "from() and fromTo() normally apply their starting values immediately. That can be surprising when a later tween on the same element changes what an earlier tween should display. immediateRender: false delays that initial write until the later tween actually starts.\n\nGSAP also caches resolved starting values for efficiency. invalidate() clears cached initialization data; it does not magically remeasure every frame. When layout or application state changes, decide whether to invalidate an existing animation or revert and rebuild it. This example deliberately waits before placing the tile at the second tween’s starting position.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/gsap.from()/",
        kind: "html",
        code: '<div class="box">Animate me</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script>\nconst tl = gsap.timeline();\ntl.to(".box", { x: 80, duration: 0.6 })\n  .fromTo(".box", { x: -80 }, {\n    x: 0, duration: 0.6, immediateRender: false\n  }, "+=0.3");\n// The second start state is not written until 0.9 seconds.\n</script>',
      },
    ],
  },
  {
    name: "3. Shape time and coordinate groups",
    intro:
      "Essential · An ease controls pacing; a stagger offsets the starts of multiple targets. These tools often improve an animation more than adding extra movement.",
    checkpoint:
      "Make a three-item entrance with a small stagger. Change the ease without changing the duration, and compare the result.",
    lessons: [
      {
        name: "Choose an ease",
        explanation:
          "An ease changes how motion progresses within a duration. out slows near the end; in speeds up; inOut does both. none keeps progress linear. Use restrained power eases for interface motion, and back or elastic when an overshoot is intentional. The two tiles travel the same distance with different pacing.\n\nEasing is a mapping from time progress to value progress. An out ease begins quickly and slows down; an in ease accelerates; inOut does both. Overshooting eases such as back and elastic can temporarily pass the final value, so allow room for them. Use none when the visual value should follow a scrubbed playhead directly, or when constant-speed travel is important. Compare effects using the official ease visualizer instead of guessing.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/resources/getting-started/Easing/",
        kind: "html",
        code: '<div class="box linear">Linear</div>\n<div class="box eased">Ease out</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n.box { margin: 16px 0; }\n</style>\n\n<script>\ngsap.to(".linear", { x: 160, duration: 1.2, ease: "none" });\ngsap.to(".eased", { x: 160, duration: 1.2, ease: "power3.out" });\n</script>',
        syntax: 'ease: "power2.out" · "power1.inOut" · "none"',
      },
      {
        name: "Delay, repeat, yoyo, and reverse easing",
        explanation:
          "delay waits before starting. repeat counts extra cycles: repeat: 1 plays twice; -1 repeats indefinitely. yoyo alternates direction on repeats. The example runs forward then backward and stops. In GSAP 3.15+, easeReverse can preserve the chosen easing feel when reversing a tween; it is distinct from repeat-only yoyoEase.\n\nA repeat is an extra iteration, not a total play count. The initial delay is not normally replayed on each iteration; use repeatDelay for the gap between cycles. yoyo requires repeats to show alternating playback. For indefinite loops, provide a pause mechanism and reduced-motion behavior before shipping. Reverse easing is optional polish, not a prerequisite for creating a reversible animation.",
        level: "Essential",
        requires: "GSAP 3.15+ for easeReverse; otherwise omit that option",
        source: "https://gsap.com/docs/v3/GSAP/Tween/",
        kind: "html",
        code: '<div class="box">Animate me</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script>\ngsap.to(".box", {\n  x: 160, duration: 0.8, delay: 0.3,\n  repeat: 1, repeatDelay: 0.2, yoyo: true,\n  ease: "power2.out", easeReverse: true // GSAP 3.15+\n});\n</script>',
        syntax: "delay · repeat · repeatDelay · yoyo · easeReverse",
      },
      {
        name: "Stagger multiple targets",
        explanation:
          'A stagger offsets target start times. A number gives the gap in seconds. An object can start from the center or distribute across a grid. each is the gap per target; amount spreads starts across a total span. This list enters from the center outward.\n\nThe overall group duration includes the stagger span as well as the duration of a target’s tween. Changing stagger does not change how fast each item moves; it changes when each begins. Use grid: "auto" only when a measured grid matches your layout, and verify after responsive reflow. A small gap can clarify reading order; large delays can make an interface feel blocked.',
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/resources/getting-started/Staggers/",
        kind: "html",
        code: '<ul><li class="item">Plan</li><li class="item">Build</li><li class="item">Ship</li></ul>\n\n<script>\ngsap.from(".item", {\n  y: 20, opacity: 0, duration: 0.5,\n  stagger: { each: 0.12, from: "center" },\n  ease: "power2.out"\n});\n</script>',
        syntax: "stagger: 0.1 · stagger: { each, from, grid }",
      },
      {
        name: "Use keyframes for a multi-step tween",
        explanation:
          "Array keyframes describe successive states of the same targets. Each frame can have its own duration and ease. A timeline is often clearer when several elements need different schedules. This tile rises, moves sideways, then settles.\n\nKeyframes are states within one tween; they are especially convenient when one object follows a short movement phrase. A timeline is easier to maintain when separate targets have meaningful overlap or labeled moments. Array keyframes work as sequential steps. GSAP also supports object/percentage keyframes, but their duration/easing composition deserves testing rather than treating them as interchangeable with CSS @keyframes.",
        level: "Advanced",
        requires: "GSAP core",
        source: "https://gsap.com/resources/keyframes/",
        kind: "html",
        code: '<div class="box">Animate me</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n.box { margin-top: 40px; }\n</style>\n\n<script>\ngsap.to(".box", {\n  keyframes: [\n    { y: -24, duration: 0.25, ease: "power2.out" },\n    { x: 120, duration: 0.5, ease: "power1.inOut" },\n    { y: 0, duration: 0.3, ease: "bounce.out" }\n  ]\n});\n</script>',
        syntax: "keyframes: [{ properties, duration }, ...]",
      },
    ],
  },
  {
    name: "4. Compose timelines and control playback",
    intro:
      "Essential · Replace chains of timeouts with a coordinated playhead. Learn insertion positions, then build small sequences that can be nested and reused.",
    checkpoint:
      "Build a hero entrance with overlapping title and body motion. Add a label, pause halfway, then reverse the whole sequence.",
    lessons: [
      {
        name: "Build a sequence with defaults",
        explanation:
          "A timeline owns a sequence of child tweens. Without a position argument, new children start at the current end. Timeline defaults apply to children; a child can override them. This heading enters first, then its description, then its button. Store the timeline to control the whole sequence.\n\nChanging one child’s duration automatically changes the placement of children added at the end, which avoids manually recalculating delays. defaults provides child settings; options such as paused or repeat configure the parent’s own playback. Prefer timeline-local defaults over gsap.defaults() when a change should affect one component instead of unrelated animation code.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/Timeline/",
        kind: "html",
        code: '<section class="hero-demo">\n  <h2>Hello, motion</h2>\n  <p>A short introduction.</p>\n  <button type="button">Explore</button>\n</section>\n\n<script>\nconst intro = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });\nintro.from(".hero-demo h2", { y: 24, opacity: 0 })\n     .from(".hero-demo p", { y: 16, opacity: 0 })\n     .from(".hero-demo button", { scale: 0.9, opacity: 0, duration: 0.3 });\n</script>',
        syntax: "gsap.timeline({ defaults: { duration, ease } })",
      },
      {
        name: "Position parameters and labels",
        explanation:
          'The position argument places a child in its timeline. A number is an absolute second; < is the previous child’s start and > its end. -= overlaps the timeline’s current end. Labels name reusable moments. Here the first two paragraphs enter together, and the third begins 0.2 seconds after the end label.\n\nPositions are evaluated when a child is inserted. The end of the timeline and the end of the most recently inserted child may differ when animations overlap, so ">" and "+=0" are not always equivalent. Use labels such as "revealed" to communicate meaning rather than scattering fragile absolute times. You can inspect tl.labels while debugging an unexpected start.',
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/resources/position-parameter/",
        kind: "html",
        code: '<p class="a">First</p><p class="b">Alongside</p><p class="c">Then this</p>\n\n<script>\nconst tl = gsap.timeline({ defaults: { duration: 0.6 } });\ntl.from(".a", { x: -24, opacity: 0 }, 0)\n  .from(".b", { x: 24, opacity: 0 }, "<")\n  .addLabel("entered")\n  .from(".c", { y: 20, opacity: 0 }, "entered+=0.2");\n// Alternatives: "-=0.2" overlaps the current end by 0.2 s;\n// ">" starts when the most recently added child ends.\n</script>',
        syntax: '0 · "<" · ">" · "-=0.2" · "label+=0.1"',
      },
      {
        name: "Nest reusable animation sequences",
        explanation:
          "Return a timeline from a helper to build reusable sequences. The parent coordinates child playheads and can move or reverse the entire composition. Keep child timelines under their parent’s control instead of assigning separate scroll-driven playheads to the same children.\n\nA parent timeline provides one timing owner. Build reusable functions around DOM elements or a scoped root rather than hard-coded global selectors. Each function can return a timeline, and a parent can add it at a label or relative position. Avoid independently seeking a child while its parent is also driving it; the next parent render will take control again.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/Timeline/",
        kind: "html",
        code: '<p class="first">Welcome</p>\n<p class="second">Keep exploring</p>\n\n<script>\nfunction reveal(target) {\n  return gsap.timeline()\n    .from(target, { y: 20, opacity: 0, duration: 0.5 })\n    .to(target, { color: "#2563eb", duration: 0.25 });\n}\nconst master = gsap.timeline();\nmaster.add(reveal(".first"))\n      .add(reveal(".second"), "-=0.15");\n</script>',
        syntax: "timeline.add(childTimeline, position)",
      },
      {
        name: "Play, pause, restart, reverse, and seek",
        explanation:
          "Tweens and timelines share playback controls. progress ranges from 0 to 1 for one cycle; totalProgress includes repeats. seek uses seconds or a timeline label. timeScale changes playback rate: 2 is twice as fast. The buttons control one stored tween instead of creating duplicates.\n\nprogress is a normalized playhead value: 0 is the start, 1 the end of a cycle. time is measured in seconds; totalTime includes repeats. pause preserves the current position, restart returns to the beginning, and reverse changes direction from the current position. At the exact beginning there is nothing to reverse. Store the animation instead of querying and recreating it on every input.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/Tween/",
        kind: "html",
        code: '<div class="box">Move</div>\n<button type="button" id="play-demo">Play</button>\n<button type="button" id="pause-demo">Pause</button>\n<button type="button" id="reverse-demo">Reverse</button>\n<button type="button" id="restart-demo">Restart</button>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script>\nconst tween = gsap.to(".box", { x: 160, duration: 2, paused: true });\ndocument.querySelector("#play-demo").onclick = () => tween.play();\ndocument.querySelector("#pause-demo").onclick = () => tween.pause();\ndocument.querySelector("#reverse-demo").onclick = () => tween.reverse();\ndocument.querySelector("#restart-demo").onclick = () => tween.restart();\n// Other controls: tween.progress(0.5); tween.seek(1); tween.timeScale(2);\n</script>',
        syntax:
          "play() · pause() · restart() · reverse() · progress() · timeScale()",
      },
      {
        name: "Callbacks and timeline calls",
        explanation:
          "Callbacks connect animation timing to application behavior. Pass a function reference, rather than calling it while building the tween. A timeline call schedules a function at a position. This status updates at sequence milestones; visual animation should complement application state rather than delay an essential action.\n\nPass onComplete: finish rather than onComplete: finish(), which would call finish during setup. Use onReverseComplete when a reversed transition reaches its starting state. Timeline calls are part of the playhead and can be reached again when replaying or seeking; choose idempotent callbacks where repetition is possible. Keep irreversible business actions such as submitting a payment outside animation completion logic.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/Timeline/",
        kind: "html",
        code: '<p class="message">Hello!</p>\n<p id="status-demo" role="status">Ready</p>\n\n<script>\nconst status = document.querySelector("#status-demo");\nconst tl = gsap.timeline({\n  onStart: () => { status.textContent = "Starting"; },\n  onComplete: () => { status.textContent = "Finished"; }\n});\ntl.from(".message", { opacity: 0, duration: 0.5 })\n  .call(() => console.log("The message is visible"))\n  .to(".message", { x: 40, duration: 0.5 });\n</script>',
        syntax:
          "onStart · onUpdate · onComplete · onReverseComplete · tl.call()",
      },
    ],
  },
  {
    name: "5. Design interactions and handle interruption",
    intro:
      "Essential · Real users can click faster than an animation finishes. Use current state, semantic controls, and a clear policy for competing updates.",
    checkpoint:
      "Test an interaction with rapid alternating clicks, keyboard focus, pointer exit, and reduced motion. Its final semantic state should always agree with the visible state.",
    lessons: [
      {
        name: "Hover and keyboard-focus feedback",
        explanation:
          "Create feedback once and reuse it on pointer and focus events. This button grows while hovered or focused. The current state combines both inputs so pointer exit does not remove keyboard-focus feedback. Use semantic buttons and retain a visible focus outline.\n\nA paused animation can respond instantly to a changed input without allocating a new tween each time. Keyboard users need comparable feedback, and pointer hover must not be the only way to discover content. This compact example reads the initial motion preference; use matchMedia from the next chapter when the preference must update during the page lifetime. Remove listeners and revert the tween if this button is mounted as a component.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/Tween/",
        kind: "html",
        code: '<button type="button" class="cta">Save changes</button>\n\n<script>\nconst button = document.querySelector(".cta");\nconst reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;\nconst feedback = gsap.to(button, {\n  scale: reduced ? 1 : 1.06, duration: 0.18, paused: true, ease: "power2.out"\n});\nlet hovered = false;\nfunction update() {\n  if (hovered || document.activeElement === button) feedback.play();\n  else feedback.reverse();\n}\nbutton.addEventListener("pointerenter", () => { hovered = true; update(); });\nbutton.addEventListener("pointerleave", () => { hovered = false; update(); });\nbutton.addEventListener("focus", update);\nbutton.addEventListener("blur", update);\n</script>',
        syntax: "paused tween + play() / reverse()",
      },
      {
        name: "A reversible disclosure panel",
        explanation:
          "This disclosure keeps its semantic state in sync while fading and moving the panel. Closing moves focus back if needed, makes the panel inert immediately, and sets hidden after the reverse finishes. Opening unhides it first. Reduced motion makes the transition immediate. A modal dialog would additionally need dialog semantics, focus management, and Escape behavior.\n\nThis is a disclosure, not a modal: background content remains usable. For a modal, prefer the platform dialog behavior and deliberately manage focus and Escape. Rapid reopen/close actions reuse the same tween, so the playhead can change direction without fighting another tween. The panel’s hidden and inert states belong to the interaction, while GSAP only handles its visual interpolation.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/Tween/",
        kind: "html",
        code: '<button type="button" id="toggle-demo" aria-expanded="false" aria-controls="panel-demo">Details</button>\n<div id="panel-demo" hidden inert><p>More information.</p><a href="#">Read more</a></div>\n\n<script>\nconst toggle = document.querySelector("#toggle-demo");\nconst panel = document.querySelector("#panel-demo");\nconst reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;\ngsap.set(panel, { opacity: 0, y: -8 });\nconst motion = gsap.to(panel, {\n  opacity: 1, y: 0, duration: 0.25, paused: true,\n  onReverseComplete: () => { panel.hidden = true; }\n});\ntoggle.addEventListener("click", () => {\n  const open = toggle.getAttribute("aria-expanded") !== "true";\n  toggle.setAttribute("aria-expanded", String(open));\n  if (open) {\n    panel.hidden = false;\n    panel.inert = false;\n    if (reduced) motion.progress(1).pause();\n    else motion.play();\n  } else {\n    if (panel.contains(document.activeElement)) toggle.focus();\n    panel.inert = true;\n    if (reduced) { motion.progress(0).pause(); panel.hidden = true; }\n    else motion.reverse();\n  }\n});\n</script>',
        syntax: "aria-expanded + hidden/inert + a reversible tween",
      },
      {
        name: "Avoid conflicting tweens and excessive work",
        explanation:
          'Prefer transforms and opacity when they suit the effect; width, height, filters, and shadows may cost more to render. Avoid CSS transitions on the same properties GSAP controls. overwrite: "auto" removes conflicting active tween properties when a new tween initializes. This button retargets a tile safely during rapid clicks. Profile real devices and use will-change only when needed.\n\nChoose a single owner for a property. One hover animation and one scroll animation both changing the same x can fight even if both are individually correct. Use nested wrappers for independent transformations, or compose them under one timeline. overwrite: "auto" handles active property conflicts; it is not a universal fix for inconsistent application state. Killing a tween leaves its current values; reversion is a separate operation.',
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/resources/mistakes/",
        kind: "html",
        code: '<button type="button" id="retarget-demo">Retarget</button>\n<div class="box">Animate me</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script>\nlet right = false;\ndocument.querySelector("#retarget-demo").onclick = () => {\n  right = !right;\n  gsap.to(".box", {\n    x: right ? 160 : 0, duration: 0.6, ease: "power2.out", overwrite: "auto"\n  });\n};\n// To cancel all tweens of this target: gsap.killTweensOf(".box");\n// To restore original styles, retain a context and call context.revert().\n</script>',
        syntax: 'overwrite: "auto" · killTweensOf() · transform/opacity',
      },
    ],
  },
  {
    name: "6. Make motion responsive and accessible",
    intro:
      "Essential · Apply these decisions to every decorative demo before shipping. “Responsive” includes changes in layout, input device, and motion preference—not only screen width.",
    checkpoint:
      "Change the viewport across a breakpoint and toggle the OS motion preference while the page is open. Content must stay readable and controls must still work.",
    lessons: [
      {
        name: "Adapt to breakpoints and reduced motion",
        explanation:
          "matchMedia (GSAP 3.11+) creates animations for matching conditions and reverts them when conditions change. This entrance uses a shorter travel distance on small screens and no animation when reduced motion is requested. Keep the unanimated content usable. For scroll effects, create ScrollTriggers only inside the no-preference branch when motion is decorative.\n\nmatchMedia owns the animations created synchronously inside its handler, reverting them before a relevant condition is rebuilt. This prevents stale inline transforms from surviving a breakpoint change. The callback runs when any supplied condition matches, so inspect conditions to choose a branch. An essential state change should still happen when motion is off; remove a decorative transition rather than leaving its target hidden.",
        level: "Essential",
        requires: "GSAP core 3.11+; native media queries",
        source: "https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/",
        kind: "html",
        code: '<h2 class="welcome">Welcome aboard</h2>\n\n<script>\nconst mm = gsap.matchMedia();\nmm.add({\n  desktop: "(min-width: 800px)",\n  mobile: "(max-width: 799px)",\n  reduced: "(prefers-reduced-motion: reduce)"\n}, context => {\n  const { desktop, reduced } = context.conditions;\n  if (!reduced) {\n    gsap.from(".welcome", {\n      y: desktop ? 40 : 16, opacity: 0, duration: 0.6\n    });\n  }\n});\n// On component teardown: mm.revert();\n</script>',
        syntax: "gsap.matchMedia().add(conditions, callback)",
      },
      {
        name: "Provide a pause control for ongoing motion",
        explanation:
          "Looping decorative movement should be optional. This finite-area illustration runs only when reduced motion is off, and offers a pause button. Avoid flashes, large unsolicited movements, and hiding essential content for an animation. A motion preference is part of the experience, not a performance setting.\n\nA system preference is a baseline, not the only control a user might need. A visible pause option helps readers stop distracting movement. Keep controls reachable without depending on motion, and avoid flashing content or surprise full-screen travel. Test the reduced-motion path as a first-class experience, not just a zero-duration fallback. Do not set hidden content to an invisible start state outside the motion-enabled branch.",
        level: "Essential",
        requires: "GSAP core 3.11+ for matchMedia",
        source: "https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/",
        kind: "html",
        code: '<div class="box" aria-hidden="true">✦</div>\n<button type="button" id="pause-loop" aria-pressed="false">Pause animation</button>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script>\nconst button = document.querySelector("#pause-loop");\nconst mm = gsap.matchMedia();\nmm.add("(prefers-reduced-motion: no-preference)", () => {\n  button.setAttribute("aria-pressed", "false");\n  button.textContent = "Pause animation";\n  const loop = gsap.to(".box", {\n    x: 80, duration: 2, ease: "sine.inOut", repeat: -1, yoyo: true\n  });\n  const toggle = () => {\n    loop.paused(!loop.paused());\n    button.setAttribute("aria-pressed", String(loop.paused()));\n    button.textContent = loop.paused() ? "Resume animation" : "Pause animation";\n  };\n  button.hidden = false;\n  button.addEventListener("click", toggle);\n  return () => { button.removeEventListener("click", toggle); button.hidden = true; };\n});\nbutton.hidden = !matchMedia("(prefers-reduced-motion: no-preference)").matches;\n// Component teardown: mm.revert();\n</script>',
        syntax: "pause() + a real button + prefers-reduced-motion",
      },
      {
        name: "Progressive enhancement and entrance flashes",
        explanation:
          "Progressive enhancement means the unanimated page still provides its content and actions. A flash of unstyled content (FOUC) can occur if a visible element paints before a from() tween applies its start state. Hiding everything by default can solve the flash while creating a worse failure: permanently hidden content when a script fails.\n\nFor nonessential entrances, prefer a small transform-only enhancement or keep content visible until animation code successfully initializes. If a design truly requires pre-hiding, add a bounded recovery path and a no-JavaScript fallback. Test blocked scripts and slow connections. This heading stays visible even when GSAP is unavailable and only receives motion when the preference allows it.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/resources/fouc/",
        kind: "html",
        code: '<h2 class="safe-heading">Your content comes first</h2>\n\n<script>\nif (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {\n  gsap.from(".safe-heading", { y: 16, duration: 0.5, ease: "power2.out" });\n}\n</script>',
      },
    ],
  },
  {
    name: "7. Understand ScrollTrigger",
    intro:
      "Essential when building scroll effects · Separate scroll position, trigger boundaries, and animation progress. A ScrollTrigger listens to scrolling; it is not a smooth-scrolling engine.",
    checkpoint:
      "Explain the two parts of a start string. Build one reveal and one scrubbed effect, then confirm both work when the page reloads partway down.",
    lessons: [
      {
        name: "Reveal elements on entry",
        explanation:
          'ScrollTrigger watches scroll positions; it does not scroll the page for you. Load and register it separately. In start: "top 85%", the first value refers to the trigger and the second to the viewport. This card reveals once when its top reaches 85% of the viewport height. markers makes boundaries visible while developing.\n\nA trigger marks the element whose geometry determines the activation interval. A toggle action is a time-based animation command at a boundary; it is different from scrubbing. once: true is appropriate for a one-time entrance. Without it, toggleActions lists onEnter, onLeave, onEnterBack, and onLeaveBack in that order. Leave enough document length for the start position to be reachable, and remove markers in the finished UI.',
        level: "Essential",
        requires: "ScrollTrigger plugin; load after core",
        source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
        kind: "html",
        code: '<div style="height: 100vh">Scroll down</div>\n<article class="card">A revealed card</article>\n<div style="height: 100vh">Continue scrolling</div>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollTrigger);\ngsap.from(".card", {\n  y: 40, opacity: 0, duration: 0.7,\n  scrollTrigger: {\n    trigger: ".card", start: "top 85%", once: true, markers: true\n  }\n});\n// For replay behavior instead of once, choose toggleActions:\n// "play none none reverse" = enter, leave, enter-back, leave-back.\n</script>',
        syntax: "scrollTrigger: { trigger, start, toggleActions }",
      },
      {
        name: "Scrub a timeline with scrolling",
        explanation:
          'Scrubbing ties animation progress to the scroll distance between start and end. A numeric scrub adds catch-up smoothing. Use ease: "none" for a direct mapping of animated values. One ScrollTrigger should control the parent timeline, rather than competing with its children. Here the bar fills while the reader crosses the article.\n\nA scrubbed animation’s duration determines how it divides the scroll interval, not a fixed number of wall-clock seconds. The start-to-end distance supplies the time-like input. With scrub: 0.5, the animation can keep catching up after scrolling stops; attach visual-progress work to the animation’s onUpdate when that distinction matters. One parent ScrollTrigger should drive the sequence.',
        level: "Essential",
        requires: "ScrollTrigger plugin",
        source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
        kind: "html",
        code: '<article class="story"><div class="reading-bar" aria-hidden="true"></div>\n  <h2>A long story</h2><p>Scroll through this section.</p></article>\n\n<style>\n.story { min-height: 220vh; }\n.reading-bar { position: sticky; top: 0; height: 6px; background: #2563eb; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollTrigger);\nconst tl = gsap.timeline({\n  scrollTrigger: {\n    trigger: ".story", start: "top top", end: "bottom bottom", scrub: 0.5\n  }\n});\ntl.fromTo(".reading-bar", { scaleX: 0 }, {\n  scaleX: 1, transformOrigin: "left center", ease: "none", duration: 1\n});\n</script>',
        syntax: "scrub: true | seconds · start · end",
      },
      {
        name: "Pin a section",
        explanation:
          "Pinning holds a section while the document continues scrolling. ScrollTrigger normally reserves space to avoid a jump. Animate a child of the pinned element so its measurements remain stable. This section stays in place for 600 pixels of scrolling while its title moves. Test pinned content on small screens and with keyboard navigation.\n\nPin spacing normally creates room for the pinned duration. Disabling it can cause later content to overlap. Pin the container and animate a child; moving the measured trigger itself changes the geometry you are relying on. A transformed ancestor can change fixed-position behavior. Avoid nested pinning and test text zoom, mobile browser UI changes, and keyboard focus through the pinned area.",
        level: "Essential",
        requires: "ScrollTrigger plugin",
        source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
        kind: "html",
        code: '<section class="pinned"><h2>Stay a moment</h2></section>\n<section style="min-height:100vh">Continue reading</section>\n\n<style>\n.pinned { min-height: 100vh; display: grid; place-items: center; background: #dce9ff; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollTrigger);\ngsap.to(".pinned h2", {\n  x: 120, ease: "none",\n  scrollTrigger: {\n    trigger: ".pinned", start: "top top", end: "+=600", pin: true, scrub: true\n  }\n});\n</script>',
        syntax: 'pin: true · end: "+=600"',
      },
      {
        name: "Refresh after layout changes",
        explanation:
          "Refresh recalculates trigger positions after layout changes, such as loaded images or expanded content. update only checks current scroll state. Function-based values can read fresh dimensions when invalidateOnRefresh is enabled. This tile travels within its track; the button widens the track and refreshes the measurements.\n\nScrollTrigger does not recalculate every boundary on every scroll event. refresh remeasures layout; update responds to scroll position using the current measurements. Images, webfonts, accordions, or route changes can shift those measurements. Refresh after meaningful layout work settles, not inside every pointermove or animation frame. Use function values with invalidateOnRefresh when the tween itself also depends on the new dimensions.",
        level: "Essential",
        requires: "ScrollTrigger plugin",
        source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
        kind: "html",
        code: '<button type="button" id="resize-track">Widen track</button>\n<div class="track"><div class="box">Travel</div></div>\n<div style="height:120vh"></div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n.track { width: 60%; border: 1px solid #999; margin-top: 40vh; }\n.box { box-sizing: border-box; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollTrigger);\nconst track = document.querySelector(".track");\nconst box = track.querySelector(".box");\ngsap.to(box, {\n  x: () => Math.max(0, track.clientWidth - box.offsetWidth), ease: "none",\n  scrollTrigger: {\n    trigger: track, start: "top 80%", end: "+=500", scrub: true,\n    invalidateOnRefresh: true\n  }\n});\ndocument.querySelector("#resize-track").onclick = () => {\n  track.style.width = "90%";\n  ScrollTrigger.refresh();\n};\n</script>',
        syntax: "ScrollTrigger.refresh() · invalidateOnRefresh: true",
      },
    ],
  },
  {
    name: "8. Build advanced scroll experiences",
    intro:
      "Advanced · Use these patterns only when they improve the content. Begin with a functional document flow and add scroll choreography that can be disabled cleanly.",
    checkpoint:
      "Build a horizontal gallery with a normal stacked fallback. Resize it, navigate by keyboard, and verify that removing its animations restores ordinary flow.",
    lessons: [
      {
        name: "Horizontal galleries with a vertical scrollbar",
        explanation:
          "A horizontal visual sequence can still be driven by vertical document scrolling. Measure the track’s overflow distance, translate it left, and pin its viewport while that distance is traversed. Use a function for measurements that can change and rebuild at responsive breakpoints.\n\nThis is not the same as a native horizontally scrolling container. The example keeps a stacked baseline for small screens and reduced motion, using matchMedia to enhance larger screens. Interactive content inside a translated gallery needs extra focus/reveal testing; do not let focused links move outside the visible frame. containerAnimation is a more specialized option for triggers inside a translated track, and requires a linear parent animation with documented pin/snap restrictions.",
        level: "Advanced",
        requires: "ScrollTrigger + core matchMedia (3.11+)",
        source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
        kind: "html",
        code: '<div class="gallery"><div class="gallery-track">\n  <section class="gallery-panel">One</section><section class="gallery-panel">Two</section><section class="gallery-panel">Three</section>\n</div></div><div style="min-height:100vh">After the gallery</div>\n\n<style>\n.gallery-panel { box-sizing: border-box; min-height: 70vh; padding: 32px; background: #dce9ff; }\n.gallery-track { display: block; }\n@media (min-width: 800px) { .gallery-panel { flex: 0 0 100%; } }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollTrigger);\nconst gallery = document.querySelector(".gallery");\nconst track = gallery.querySelector(".gallery-track");\nconst mm = gsap.matchMedia();\nmm.add("(min-width: 800px) and (prefers-reduced-motion: no-preference)", () => {\n  gsap.set(gallery, { overflow: "hidden" });\n  gsap.set(track, { display: "flex" });\n  const distance = () => Math.max(0, track.scrollWidth - gallery.clientWidth);\n  gsap.to(track, {\n    x: () => -distance(), ease: "none",\n    scrollTrigger: {\n      trigger: gallery, start: "top top", end: () => "+=" + Math.max(1, distance()),\n      pin: true, scrub: true, invalidateOnRefresh: true\n    }\n  });\n});\n// Component teardown: mm.revert();\n</script>',
      },
      {
        name: "Batch reveals without one giant trigger",
        explanation:
          "batch collects callbacks from multiple ScrollTriggers over a short interval, so items that enter together can share a stagger. It still creates a trigger per target; it does not make a whole page one trigger or virtualize offscreen DOM. Use it for repeated cards with independent entry positions.\n\nCreate the setup inside a context or matchMedia handler so both triggers and callback-created tweens are owned and reverted. Set an initial state only in the enabled branch, and always verify the no-motion baseline. This small grid fades in cards as they enter, then remains readable.",
        level: "Advanced",
        requires: "ScrollTrigger + core context/matchMedia",
        source:
          "https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.batch()/",
        kind: "html",
        code: '<div style="height:100vh">Scroll to the cards</div>\n<div class="batch-grid"><article class="batch-card">One</article><article class="batch-card">Two</article><article class="batch-card">Three</article></div>\n<div style="height:100vh"></div>\n\n<style>\n.batch-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n.batch-card { padding: 30px; background: #dce9ff; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollTrigger);\nconst mm = gsap.matchMedia();\nmm.add("(prefers-reduced-motion: no-preference)", context => {\n  context.add("revealBatch", items => {\n    gsap.to(items, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, overwrite: "auto" });\n  });\n  gsap.set(".batch-card", { opacity: 0, y: 20 });\n  ScrollTrigger.batch(".batch-card", {\n    start: "top 85%", once: true, onEnter: context.revealBatch\n  });\n});\n// Component teardown: mm.revert();\n</script>',
      },
      {
        name: "Snapping, custom scrollers, and timing ownership",
        explanation:
          "Snapping moves the scroll position toward chosen progress points after the user pauses. Use it sparingly: it changes navigation, and aggressive snapping can make reading or keyboard use difficult. A custom overflow container needs scroller; a third-party virtual scroller may require scrollerProxy plus lifecycle coordination. Do not add that machinery to an ordinary document scroll.\n\nMost hard-to-debug scroll setups have two owners: a parent timeline and child ScrollTriggers driving the same tweens, or a CSS transition and GSAP updating one property. Choose one playhead owner. This example puts a single ScrollTrigger on the timeline and uses labels as optional snap points; reduced-motion users keep normal content flow.",
        level: "Advanced",
        requires: "ScrollTrigger plugin",
        source: "https://gsap.com/resources/st-mistakes/",
        kind: "html",
        code: '<section class="snap-story"><div class="box">Story beat</div></section>\n<div style="height:100vh">Continue</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n.snap-story { min-height: 180vh; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollTrigger);\nconst mm = gsap.matchMedia();\nmm.add("(prefers-reduced-motion: no-preference)", () => {\n  const tl = gsap.timeline({\n    scrollTrigger: {\n      trigger: ".snap-story", start: "top top", end: "+=800", scrub: true,\n      snap: { snapTo: "labels", delay: 0.3, duration: { min: 0.1, max: 0.3 } }\n    }\n  });\n  tl.addLabel("start")\n    .to(".box", { x: 100, duration: 1, ease: "none" })\n    .addLabel("middle")\n    .to(".box", { rotation: 90, duration: 1, ease: "none" })\n    .addLabel("end");\n});\n// Component teardown: mm.revert();\n</script>',
      },
    ],
  },
  {
    name: "9. Animate SVG intentionally",
    intro:
      "Specialized · SVG uses a viewBox coordinate system, and its shapes can expose attributes as well as CSS properties. Pick a plugin according to whether you need travel, a drawn stroke, or changed geometry.",
    checkpoint:
      "Explain the difference between moving along a path, drawing its stroke, and morphing its shape. Build one effect without loading the other plugins.",
    lessons: [
      {
        name: "Animate SVG attributes",
        explanation:
          "Core can animate numeric SVG attributes using attr, as well as CSS transforms. Use an inline SVG so its nodes are available as targets. Here the circle grows and moves across its viewBox. For rotation, set an appropriate transformOrigin or svgOrigin rather than relying on HTML defaults.\n\nThe viewBox defines SVG coordinates; the displayed width can scale those coordinates on screen. attr animates attributes such as cx and r. CSS transforms are a separate layer and can be combined deliberately. External SVG shown through an img tag is not a set of directly selectable nodes in the parent document. Inline the SVG when you need access to its shapes.",
        level: "Specialized",
        requires: "Core AttrPlugin and CSSPlugin (included)",
        source: "https://gsap.com/docs/v3/GSAP/CorePlugins/Attributes/",
        kind: "html",
        code: '<svg viewBox="0 0 300 100" width="300" role="img" aria-label="An expanding circle">\n  <circle id="orb" cx="30" cy="50" r="12" fill="#2563eb" />\n</svg>\n\n<script>\ngsap.to("#orb", { attr: { cx: 240, r: 30 }, duration: 1, ease: "power2.inOut" });\n</script>',
        syntax: "attr: { attribute: value }",
      },
      {
        name: "Follow a motion path",
        explanation:
          "MotionPathPlugin moves a target along an SVG path or an array of points. align maps the target into the path’s coordinate space; alignOrigin chooses its anchor. autoRotate follows the tangent. This arrow follows a curved route with a linear playhead.\n\nA path is the route, not the target being drawn. align is useful when the path and target live in different coordinate spaces; alignOrigin chooses the part of the target placed on that route. autoRotate changes orientation to match the path tangent. Because a rotating target may need an initial orientation adjustment, inspect a simple arrow before applying the effect to a detailed illustration.",
        level: "Specialized",
        requires: "MotionPathPlugin; separate import/script",
        source: "https://gsap.com/docs/v3/Plugins/MotionPathPlugin/",
        kind: "html",
        code: '<svg viewBox="0 0 320 160" width="320" role="img" aria-label="An arrow follows a curve">\n  <path id="route" d="M20,120 C90,10 220,10 300,120" fill="none" stroke="#999" />\n  <path id="arrow" d="M-8,-5 L8,0 L-8,5 Z" fill="#2563eb" />\n</svg>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/MotionPathPlugin.min.js"></script>\n\n<script>\ngsap.registerPlugin(MotionPathPlugin);\ngsap.to("#arrow", {\n  motionPath: { path: "#route", align: "#route", alignOrigin: [0.5, 0.5], autoRotate: true },\n  duration: 2, ease: "none"\n});\n</script>',
        syntax: "motionPath: { path, align, alignOrigin, autoRotate }",
      },
      {
        name: "Draw an SVG stroke",
        explanation:
          "DrawSVGPlugin reveals the stroke of an SVG shape; it does not fill a shape as if it were painted. Give the path a visible stroke and no fill. This curve draws from zero to its full length. Values with two percentages describe the start and end of the visible stroke segment.\n\nA filled silhouette does not gain a visible drawn outline merely by setting drawSVG; the stroke needs to exist. Give illustrations descriptive labels when they communicate content, or mark them decorative when appropriate. Keep stroke paths simple while debugging, and inspect stroke width and visibility before assuming the plugin failed.",
        level: "Specialized",
        requires: "DrawSVGPlugin; available in public package 3.13+",
        source: "https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/",
        kind: "html",
        code: '<svg viewBox="0 0 320 160" width="320" role="img" aria-label="A curve is drawn">\n  <path id="line" d="M20,120 C90,10 220,10 300,120"\n        fill="none" stroke="#2563eb" stroke-width="5" />\n</svg>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/DrawSVGPlugin.min.js"></script>\n\n<script>\ngsap.registerPlugin(DrawSVGPlugin);\ngsap.fromTo("#line", { drawSVG: "0% 0%" }, {\n  drawSVG: "0% 100%", duration: 1.5, ease: "power1.inOut"\n});\n</script>',
        syntax: 'drawSVG: "0% 100%"',
      },
      {
        name: "Morph one SVG shape into another",
        explanation:
          "MorphSVGPlugin interpolates path geometry, including shapes with different point counts. This triangle becomes a rounded shape. The destination path is hidden but remains in the SVG for geometry lookup. Convert non-path SVG shapes with MorphSVGPlugin.convertToPath when necessary.\n\nMorphing is geometry interpolation rather than crossfading two images. The source must be an editable SVG path or convertible shape; raster images cannot be morphed this way. Check path direction and the visual correspondence of points when a transition twists unexpectedly. Converting shapes or tuning shapeIndex is specialized work, so first prove the simple source/destination pair.",
        level: "Specialized",
        requires: "MorphSVGPlugin; available in public package 3.13+",
        source: "https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/",
        kind: "html",
        code: '<svg viewBox="0 0 160 160" width="240" role="img" aria-label="A triangle becomes a rounded shape">\n  <path id="shape" d="M80,15 L145,140 L15,140 Z" fill="#2563eb" />\n  <path id="destination" visibility="hidden"\n        d="M30,30 Q80,0 130,30 Q160,80 130,130 Q80,160 30,130 Q0,80 30,30 Z" />\n</svg>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/MorphSVGPlugin.min.js"></script>\n\n<script>\ngsap.registerPlugin(MorphSVGPlugin);\ngsap.to("#shape", { morphSVG: "#destination", duration: 1.2, ease: "power2.inOut" });\n</script>',
        syntax: 'morphSVG: "#destination"',
      },
    ],
  },
  {
    name: "10. Change layout and animate text",
    intro:
      "Advanced and specialized · Use Flip for layout changes and text plugins for their distinct jobs. Preserve the content’s reading order and restore temporary wrappers on teardown.",
    checkpoint:
      "Change a grid layout, then create a text entrance. Verify resize/font loading, accessible text, and the no-motion version.",
    lessons: [
      {
        name: "Animate layout changes with Flip",
        explanation:
          "Flip records geometry, lets you change the real layout, then animates from the recorded state to the new one. It is useful for reordering cards or changing grid arrangements. Capture before the change. Here a button switches the grid between three columns and one; reduced motion applies the layout change immediately.\n\nFLIP names the technique: First record the geometry, then apply the Last layout, Invert the apparent change with transforms, and Play those transforms away. The DOM already owns the new final layout while the animation interpolates the appearance. Capture before mutating; capturing afterward removes the difference you wanted to animate. For rapid repeated layout changes, decide how ongoing Flip animations are completed or interrupted before starting another capture.",
        level: "Advanced",
        requires: "Flip plugin (3.9+); separate import/script",
        source: "https://gsap.com/docs/v3/Plugins/Flip/",
        kind: "html",
        code: '<button type="button" id="layout-toggle" aria-pressed="false">Single column</button>\n<div class="cards"><div class="card">One</div><div class="card">Two</div><div class="card">Three</div></div>\n\n<style>\n.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n.cards.single { grid-template-columns: 1fr; }\n.card { padding: 24px; background: #dce9ff; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Flip.min.js"></script>\n\n<script>\ngsap.registerPlugin(Flip);\nconst grid = document.querySelector(".cards");\nconst toggle = document.querySelector("#layout-toggle");\ntoggle.addEventListener("click", () => {\n  const state = Flip.getState(".cards .card");\n  const single = grid.classList.toggle("single");\n  toggle.setAttribute("aria-pressed", String(single));\n  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {\n    Flip.from(state, { duration: 0.5, ease: "power2.inOut" });\n  }\n});\n</script>',
        syntax:
          "Flip.getState(targets) → change layout → Flip.from(state, vars)",
      },
      {
        name: "Split text into animated lines",
        explanation:
          "SplitText creates wrappers for lines, words, or characters. The 3.13+ API supports autoSplit and onSplit for font loading and line reflow. Return the tween from onSplit so re-splits can clean it up and preserve its time. This heading reveals by line; reduced motion leaves the original text intact. Check accessible reading order, especially with nested links.\n\nWrapping changes the DOM, so avoid splitting text containing interactive descendants without checking focus and accessibility. SplitText’s automatic accessible naming is helpful for simple text, but does not preserve the semantics of every nested link. autoSplit can rebuild line wrappers when fonts or width change; the returned onSplit animation is the owned resource that gets cleaned up and time-synchronized. The example’s cleanup restores the original text.",
        level: "Specialized",
        requires: "SplitText 3.13+ for this API; core matchMedia 3.11+",
        source: "https://gsap.com/docs/v3/Plugins/SplitText/",
        kind: "html",
        code: '<h2 class="headline">Make your next idea move.</h2>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js"></script>\n\n<script>\ngsap.registerPlugin(SplitText);\nconst mm = gsap.matchMedia();\nmm.add("(prefers-reduced-motion: no-preference)", () => {\n  const split = SplitText.create(".headline", {\n    type: "lines", mask: "lines", autoSplit: true,\n    onSplit(self) {\n      return gsap.from(self.lines, {\n        yPercent: 100, duration: 0.6, stagger: 0.1, ease: "power2.out"\n      });\n    }\n  });\n  return () => split.revert();\n});\n// Component teardown: mm.revert();\n</script>',
        syntax: "SplitText.create(target, { type, autoSplit, onSplit })",
      },
      {
        name: "Replace text with TextPlugin",
        explanation:
          "TextPlugin changes text content progressively; SplitText instead animates wrappers around existing text. Keep frequently changing decorative text out of live regions. This example types a new phrase, or replaces it immediately when reduced motion is requested.\n\nUse replacement when the wording itself changes. Use SplitText when the wording stays and its pieces move. ScrambleTextPlugin is a different, specialized decorative text effect; load it only if that is the intended design. Keep essential status messages stable and understandable without a typing or scrambling animation.",
        level: "Specialized",
        requires: "TextPlugin; separate import/script",
        source: "https://gsap.com/docs/v3/Plugins/TextPlugin/",
        kind: "html",
        code: '<p id="phrase">Ready.</p>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/TextPlugin.min.js"></script>\n\n<script>\ngsap.registerPlugin(TextPlugin);\nconst phrase = document.querySelector("#phrase");\nif (matchMedia("(prefers-reduced-motion: reduce)").matches) {\n  phrase.textContent = "Ready to create.";\n} else {\n  gsap.to(phrase, { text: { value: "Ready to create." }, duration: 1.2, ease: "none" });\n}\n</script>',
        syntax: 'text: { value: "New text" }',
      },
    ],
  },
  {
    name: "11. Input, dragging, and scrolling tools",
    intro:
      "Specialized · These plugins solve different problems. Draggable moves an element, Observer interprets input, ScrollTo moves a scroll position, and ScrollSmoother adds optional scroll smoothing.",
    checkpoint:
      "Provide a non-dragging way to complete a drag action, and explain why ScrollTrigger and ScrollTo are not interchangeable.",
    lessons: [
      {
        name: "Drag within bounds, with a keyboard alternative",
        explanation:
          "Draggable adds pointer/touch dragging. InertiaPlugin is an optional addition for momentum; it is not supplied by inertia: true alone. This tile stays within its container, while arrow buttons offer an alternative to dragging. In a component, retain the returned instances and kill them on teardown.\n\nPointer interaction does not replace keyboard access. The button alternative here updates the same position state and then synchronizes Draggable’s measurements. A production drag-and-drop interface also needs a meaningful state model and appropriate announcements for completed actions. Use kill on retained Draggable instances and remove your own input handlers when the component is destroyed.",
        level: "Specialized",
        requires: "Draggable plugin; InertiaPlugin only for momentum",
        source: "https://gsap.com/docs/v3/Plugins/Draggable/",
        kind: "html",
        code: '<div class="drag-area"><div class="drag-tile">Move me</div></div>\n<button type="button" id="left-demo" aria-label="Move tile left">←</button>\n<button type="button" id="right-demo" aria-label="Move tile right">→</button>\n\n<style>\n.drag-area { width: 300px; height: 180px; border: 1px solid #999; }\n.drag-tile { box-sizing: border-box; width: 96px; height: 64px; padding: 12px; background: #dce9ff; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Draggable.min.js"></script>\n\n<script>\ngsap.registerPlugin(Draggable);\nconst tile = document.querySelector(".drag-tile");\nconst area = document.querySelector(".drag-area");\nconst [drag] = Draggable.create(tile, { type: "x,y", bounds: area });\nfunction moveBy(delta) {\n  const max = area.clientWidth - tile.offsetWidth;\n  const x = gsap.utils.clamp(0, max, Number(gsap.getProperty(tile, "x")) + delta);\n  gsap.set(tile, { x });\n  drag.update();\n}\ndocument.querySelector("#left-demo").onclick = () => moveBy(-24);\ndocument.querySelector("#right-demo").onclick = () => moveBy(24);\n// On teardown: drag.kill(); also remove your own event handlers.\n</script>',
        syntax: "Draggable.create(target, { type, bounds })",
      },
      {
        name: "Add momentum with InertiaPlugin",
        explanation:
          "Momentum continues a drag according to its release velocity and resistance. Draggable’s inertia option integrates with InertiaPlugin, but the plugin must be loaded and registered; setting inertia: true alone does not install it. Bounds and end-state decisions still belong to your interface.\n\nUse momentum for an intentionally physical interaction, not for a form control that needs precise placement. Disable the extra travel for reduced motion, and keep a simple reset or keyboard alternative. This tile demonstrates optional momentum and a reset that cancels its throw before updating the drag state.",
        level: "Specialized",
        requires: "Draggable + InertiaPlugin; public package 3.13+",
        source: "https://gsap.com/docs/v3/Plugins/InertiaPlugin/",
        kind: "html",
        code: '<div class="throw-area"><div class="throw-tile">Drag</div></div>\n<button type="button" id="reset-throw">Reset position</button>\n\n<style>\n.throw-area { width: 300px; height: 180px; border: 1px solid #999; }\n.throw-tile { width: 64px; height: 64px; background: #dce9ff; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Draggable.min.js"></script>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/InertiaPlugin.min.js"></script>\n\n<script>\ngsap.registerPlugin(Draggable, InertiaPlugin);\nconst tile = document.querySelector(".throw-tile");\nconst [drag] = Draggable.create(tile, {\n  type: "x,y", bounds: ".throw-area",\n  inertia: !matchMedia("(prefers-reduced-motion: reduce)").matches\n});\ndocument.querySelector("#reset-throw").onclick = () => {\n  drag.tween?.kill();\n  gsap.set(tile, { x: 0, y: 0 });\n  drag.update();\n};\n// Component teardown: drag.kill(); remove your own handlers too.\n</script>',
      },
      {
        name: "Observe gestures without hijacking navigation",
        explanation:
          "Observer normalizes wheel, touch, pointer, and scroll input into callbacks such as onUp and onDown. It is useful for a deliberate gesture-driven widget, not a reason to replace normal document scrolling. It does not automatically provide semantics, keyboard controls, or an animation.\n\nTarget a small interaction area, avoid preventDefault unless you truly need to suppress native behavior, and include equivalent controls. This widget responds to a wheel gesture or buttons and updates one bounded state. It leaves page scrolling available and retains the Observer instance for cleanup.",
        level: "Specialized",
        requires: "Observer plugin (3.10+)",
        source: "https://gsap.com/docs/v3/Plugins/Observer/",
        kind: "html",
        code: '<div class="gesture-area"><output id="gesture-value">0</output><p>Wheel here, or use the buttons.</p></div>\n<button type="button" id="gesture-prev">Previous</button><button type="button" id="gesture-next">Next</button>\n\n<style>\n.gesture-area { padding: 32px; border: 1px solid #999; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Observer.min.js"></script>\n\n<script>\ngsap.registerPlugin(Observer);\nlet index = 0;\nconst output = document.querySelector("#gesture-value");\nfunction moveBy(delta) { index = gsap.utils.clamp(0, 4, index + delta); output.textContent = index; }\nconst observer = Observer.create({\n  target: ".gesture-area", type: "wheel", tolerance: 20,\n  onDown: () => moveBy(1), onUp: () => moveBy(-1)\n});\ndocument.querySelector("#gesture-prev").onclick = () => moveBy(-1);\ndocument.querySelector("#gesture-next").onclick = () => moveBy(1);\n// Component teardown: observer.kill(); remove your own handlers too.\n</script>',
      },
      {
        name: "Scroll to a destination",
        explanation:
          "ScrollToPlugin animates the scroll position; ScrollTrigger reacts to it. Prefer native anchor links for navigation when animation is unnecessary. This explicit scroll action focuses its heading after arrival; autoKill allows user scrolling to interrupt it. Avoid a competing CSS scroll-behavior: smooth on the scrolling element.\n\nUse a native anchor when it already supplies the desired navigation. If animating a scroll position, consider user interruption and avoid making focus jump to a destination after an aborted animation. offsetY accounts for a fixed header visually; focus({ preventScroll: true }) prevents a second unexpected browser scroll after successful completion. Test the behavior with keyboard input and a motion preference.",
        level: "Specialized",
        requires: "ScrollToPlugin; separate import/script",
        source: "https://gsap.com/docs/v3/Plugins/ScrollToPlugin/",
        kind: "html",
        code: '<button type="button" id="jump-demo">Go to details</button>\n<div style="height:120vh"></div>\n<h2 id="details-demo" tabindex="-1">Details</h2>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollToPlugin.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollToPlugin);\nconst target = document.querySelector("#details-demo");\ndocument.querySelector("#jump-demo").onclick = () => {\n  gsap.to(window, {\n    scrollTo: { y: target, offsetY: 24, autoKill: true },\n    duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.8,\n    ease: "power2.inOut",\n    onComplete: () => target.focus({ preventScroll: true })\n  });\n};\n</script>',
        syntax: "scrollTo: { y: target, offsetY, autoKill }",
      },
      {
        name: "When ScrollSmoother is appropriate",
        explanation:
          "ScrollSmoother adds smoothed scrolling on top of ScrollTrigger and requires it. Use a single instance with a wrapper around the content. Keep viewport-fixed UI outside the transformed content. This optional enhancement is disabled for reduced motion; ordinary document scrolling remains the baseline.\n\nSmoothing is optional visual behavior, not a fix for poorly performing rendering. Transformed scrolling content changes the containing block of fixed-position descendants, so keep fixed navigation outside it. Do not initialize a second smoother while one is active, and destroy it when leaving the owning view. Test native scrolling and touch behavior before deciding to add the effect.",
        level: "Specialized",
        requires: "ScrollSmoother + ScrollTrigger; public package 3.13+",
        source: "https://gsap.com/docs/v3/Plugins/ScrollSmoother/",
        kind: "html",
        code: '<div id="smooth-wrapper"><main id="smooth-content">\n  <section style="min-height:100vh"><h2>First section</h2></section>\n  <section style="min-height:100vh"><h2>Second section</h2></section>\n</main></div>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollSmoother.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollTrigger, ScrollSmoother);\nconst mm = gsap.matchMedia();\nmm.add("(prefers-reduced-motion: no-preference)", () => {\n  const smoother = ScrollSmoother.create({\n    wrapper: "#smooth-wrapper", content: "#smooth-content", smooth: 0.8\n  });\n  return () => smoother.kill();\n});\n// Component teardown: mm.revert();\n</script>',
        syntax: "ScrollSmoother.create({ wrapper, content, smooth })",
      },
    ],
  },
  {
    name: "12. Own the lifecycle and integrate frameworks",
    intro:
      "Essential for components · A lifecycle is the period between setting up a component and destroying it. Every animation, observer, listener, or async task needs an owner and a cleanup policy.",
    checkpoint:
      "Mount and destroy a component twice. Confirm that it has no duplicate listeners, surviving ScrollTriggers, or inline transforms left after teardown.",
    lessons: [
      {
        name: "Scope selectors and revert on teardown",
        explanation:
          "context (GSAP 3.11+) groups animations for cleanup and scopes selector strings to a container. revert kills recorded animations and restores their original inline styles. kill stops an animation but generally leaves its current appearance. This mount function returns a destroy function suitable for a component lifecycle.\n\nScoping prevents one component’s .item from selecting another’s. Context records GSAP objects created while its callback runs; it does not own arbitrary resources just because they were created nearby. Return cleanup functions for event listeners, observers, timeouts, and ticker callbacks. Prefer destroying a component’s own context over calling a global kill-all operation that can break unrelated views.",
        level: "Essential",
        requires: "GSAP core 3.11+",
        source: "https://gsap.com/docs/v3/GSAP/gsap.context()/",
        kind: "html",
        code: '<section class="widget"><p class="item">Local item</p></section>\n\n<script>\nfunction mountWidget(root) {\n  const ctx = gsap.context(() => {\n    gsap.from(".item", { y: 20, opacity: 0, duration: 0.5 });\n  }, root);\n  return () => ctx.revert();\n}\nconst destroy = mountWidget(document.querySelector(".widget"));\n// Call destroy() before removing or remounting this widget.\n</script>',
        syntax: "gsap.context(callback, scope) · context.revert()",
      },
      {
        name: "Capture later event animations and remove listeners",
        explanation:
          "Animations created after the initial context callback, such as inside a click handler, need to run through a context-recorded function. Native event listeners and other external resources also need explicit cleanup. This widget tracks its click tweens and removes the listener on revert.\n\nRecording is tied to execution, not lexical placement: a handler defined inside setup but invoked later does not automatically record its new tweens. context.add creates a recorded function for those later calls. The same rule applies to timers and promise callbacks. Prevent async results from mutating an already destroyed view, and cancel or ignore pending work when leaving the component.",
        level: "Essential",
        requires: "GSAP core 3.11+",
        source: "https://gsap.com/docs/v3/GSAP/gsap.context()/",
        kind: "html",
        code: '<section class="widget"><button type="button" class="spin">Turn</button></section>\n\n<script>\nconst root = document.querySelector(".widget");\nconst button = root.querySelector(".spin");\nconst ctx = gsap.context(self => {\n  self.add("turn", () => {\n    gsap.to(button, { rotation: "+=90", duration: 0.3, overwrite: "auto" });\n  });\n  button.addEventListener("click", self.turn);\n  return () => button.removeEventListener("click", self.turn);\n}, root);\n// On teardown: ctx.revert();\n</script>',
        syntax: "context.add(name, callback) · return cleanup",
      },
      {
        name: "React with useGSAP and contextSafe",
        explanation:
          "In React, animate after rendering with @gsap/react instead of during render. useGSAP handles context cleanup, including development remounts. contextSafe records animations created by later handlers. This complete component scopes its selector and rotates its button on click. For dependency-driven animations, specify dependencies and revertOnUpdate: true when rebuilding should revert the previous run.\n\nA re-render is not a reason to recreate every animation. Keep references to component roots, use dependencies only for data that actually changes the animation, and use revertOnUpdate when rebuilding should first undo the previous run. React development Strict Mode deliberately checks setup/cleanup behavior; duplicate motion usually exposes missing ownership. In server-rendered apps, avoid accessing window during module evaluation and create DOM-dependent work on the client.",
        level: "Essential",
        requires: "React + @gsap/react (separate package) + GSAP",
        source: "https://gsap.com/resources/React/",
        kind: "jsx",
        code: '// Terminal: npm install gsap@3.15.0 @gsap/react\n// App.jsx — a React project with JSX support.\nimport { useRef } from "react";\nimport { gsap } from "gsap";\nimport { useGSAP } from "@gsap/react";\n\ngsap.registerPlugin(useGSAP);\n\nexport default function App() {\n  const root = useRef(null);\n  const { contextSafe } = useGSAP(() => {\n    gsap.from(".tile", { opacity: 0, duration: 0.5 });\n  }, { scope: root });\n\n  const turn = contextSafe(() => {\n    gsap.to(".tile", { rotation: "+=90", duration: 0.3, overwrite: "auto" });\n  });\n\n  return (\n    <section ref={root}>\n      <button type="button" className="tile" onClick={turn}>Turn me</button>\n    </section>\n  );\n}',
        syntax: "useGSAP(callback, { scope, dependencies, revertOnUpdate })",
      },
    ],
  },
  {
    name: "13. Structure maintainable animation code",
    intro:
      "Advanced project skills · Treat a motion feature as a component with a small public contract. Keep state decisions, visual transitions, and cleanup responsibilities clear.",
    checkpoint:
      "Create a component that returns play/reverse/destroy operations. Let an outer caller decide when it appears, and destroy it before replacing its DOM.",
    lessons: [
      {
        name: "Build animation factories with local motion tokens",
        explanation:
          "A factory constructs and returns an animation for a specific root or target. Motion tokens are named values such as a standard duration or ease. Together they make changes local and keep timing consistent without changing global defaults.\n\nKeep factories focused on appearance. The caller can decide whether to attach a scroll trigger, respond to a click, or skip motion entirely. This example returns a paused entrance with no hidden shared state. Reverting it restores the fields the tween changed. For a larger component, put the factory invocation inside a context that also owns its triggers and event work.",
        level: "Advanced",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/gsap.timeline()/",
        kind: "html",
        code: '<section class="feature"><h2>Build once</h2><p>Compose deliberately.</p></section>\n<button type="button" id="factory-play">Play entrance</button>\n\n<script>\nconst motion = { enter: 0.6, ease: "power2.out" };\nfunction createEntrance(root) {\n  return gsap.timeline({ paused: true, defaults: { duration: motion.enter, ease: motion.ease } })\n    .from(root.querySelectorAll("h2, p"), { y: 20, opacity: 0, stagger: 0.1 });\n}\nconst entrance = createEntrance(document.querySelector(".feature"));\ndocument.querySelector("#factory-play").onclick = () => {\n  if (matchMedia("(prefers-reduced-motion: reduce)").matches) entrance.progress(1).pause();\n  else entrance.restart();\n};\n// Component teardown: entrance.revert(); remove the click handler.\n</script>',
      },
      {
        name: "Mount, unmount, and rebuild safely",
        explanation:
          "Keep a component’s destroy function next to its setup. Remove event listeners as well as reverting animations; otherwise the next mount can add a second handler to the same element. If external DOM mutations happen, restore the component’s logical baseline too.\n\nThis component explicitly owns its tween and input handler. Re-mounting first calls the old destroy function. The initial CSS is left as the rest state, so reduced motion can skip decorative scale while the button remains functional. Route transitions should follow the same order: destroy the old view’s resources, replace DOM, mount the new view, then refresh surviving scroll measurements if layout changed.",
        level: "Advanced",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/gsap.context()/",
        kind: "html",
        code: '<section id="mount-root"><button type="button">Interact</button></section>\n<button type="button" id="remount-demo">Remount component</button>\n\n<script>\nfunction mount(root) {\n  const button = root.querySelector("button");\n  const tween = gsap.to(button, { scale: 1.08, duration: 0.2, paused: true });\n  let active = false;\n  const click = () => {\n    active = !active;\n    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {\n      tween.progress(active ? 1 : 0).pause();\n    } else if (active) tween.play();\n    else tween.reverse();\n  };\n  button.addEventListener("click", click);\n  return () => { button.removeEventListener("click", click); tween.revert(); };\n}\nconst root = document.querySelector("#mount-root");\nlet destroy = mount(root);\ndocument.querySelector("#remount-demo").onclick = () => { destroy(); destroy = mount(root); };\n// Final teardown: destroy(); remove the outer remount listener.\n</script>',
      },
      {
        name: "Separate async data from component lifetime",
        explanation:
          "Images, fonts, and fetched data can arrive after an animation component has been destroyed. A promise callback does not become safe merely because the request started inside setup. Guard against stale completion, cancel work when possible, and only refresh measurements for a still-mounted view.\n\nThis font-dependent entrance checks that its root is still connected and records the eventual tween through a context method. The destroy button demonstrates the cleanup contract. Use AbortController for cancellable fetches; for noncancellable readiness promises, an alive flag prevents a late result from recreating animation state.",
        level: "Advanced",
        requires: "Core 3.11+; browser FontFaceSet.ready",
        source: "https://gsap.com/docs/v3/GSAP/gsap.context()/",
        kind: "html",
        code: '<section class="async-feature"><h2>Ready when the font is</h2></section>\n<button type="button" id="destroy-async">Destroy feature</button>\n\n<script>\nconst root = document.querySelector(".async-feature");\nlet alive = true;\nconst ctx = gsap.context(self => {\n  self.add("enter", () => {\n    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {\n      gsap.from("h2", { y: 16, opacity: 0, duration: 0.5 });\n    }\n  });\n}, root);\ndocument.fonts.ready.then(() => {\n  if (alive && root.isConnected) ctx.enter();\n});\ndocument.querySelector("#destroy-async").onclick = () => {\n  alive = false; ctx.revert();\n};\n</script>',
      },
    ],
  },
  {
    name: "14. Profile and optimize deliberately",
    intro:
      "Advanced · Separate JavaScript work from layout, painting, and compositing. Measure the actual bottleneck before adding optimization flags or changing architecture.",
    checkpoint:
      "Record a performance trace on a realistic device. Identify whether an expensive frame comes from your callback, layout, or painting, then change one cause and measure again.",
    lessons: [
      {
        name: "Smooth pointer input with quickTo",
        explanation:
          "quickTo reuses a tween to steer one numeric property toward new values, avoiding a new tween per pointer event. This decorative dot follows the pointer on fine-pointer devices. It stays hidden for reduced motion. Keep this separate from functional cursor or focus feedback.\n\nA reusable quickTo function retargets one numeric property. quickSetter is the related low-level option that writes a value immediately instead of smoothing toward it. Both avoid repeated setup for hot input paths. Keep a decorative follower separate from the real pointer and never use it as the only indication of focus. The media-query scope in this example removes both listeners and animations when the enhancement stops matching.",
        level: "Advanced",
        requires: "Core quickTo (3.10+) + matchMedia (3.11+)",
        source: "https://gsap.com/docs/v3/GSAP/gsap.quickTo()/",
        kind: "html",
        code: '<div class="cursor-dot" aria-hidden="true"></div>\n\n<style>\n.cursor-dot { position: fixed; top: 0; left: 0; width: 16px; height: 16px;\n  border-radius: 50%; background: #2563eb; pointer-events: none; visibility: hidden; }\n</style>\n\n<script>\nconst mm = gsap.matchMedia();\nmm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {\n  gsap.set(".cursor-dot", { visibility: "visible", xPercent: -50, yPercent: -50 });\n  const xTo = gsap.quickTo(".cursor-dot", "x", { duration: 0.25, ease: "power3.out" });\n  const yTo = gsap.quickTo(".cursor-dot", "y", { duration: 0.25, ease: "power3.out" });\n  const move = event => { xTo(event.clientX); yTo(event.clientY); };\n  window.addEventListener("pointermove", move);\n  return () => window.removeEventListener("pointermove", move);\n});\n// Component teardown: mm.revert();\n</script>',
        syntax: "gsap.quickTo(target, property, vars)",
      },
      {
        name: "Useful utilities and custom easing",
        explanation:
          "Utilities help turn input into animation values without writing your own math. Many return reusable functions when the value argument is omitted. CustomEase is a separate plugin for a designed easing curve. Here input is bounded and snapped, colors cycle, and a custom ease drives a simple tween.\n\nUtilities are building blocks, not automatically an animation: clamp bounds a number, mapRange converts an input interval to an output interval, snap rounds to a step, and wrap cycles through a range or list. This example uses those transforms before creating a tween. CustomEase must be registered separately; ordinary power/sine/back eases are already in core.",
        level: "Advanced",
        requires: "Core utilities + CustomEase plugin",
        source: "https://gsap.com/docs/v3/GSAP/gsap.utils/",
        kind: "html",
        code: '<div class="box">Animate me</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/CustomEase.min.js"></script>\n\n<script>\ngsap.registerPlugin(CustomEase);\nconst bounded = gsap.utils.clamp(0, 100);\nconst toPixels = gsap.utils.mapRange(0, 100, 0, 160);\nconst snap = gsap.utils.snap(10);\nconst nextColor = gsap.utils.wrap(["#2563eb", "#7c3aed"]);\nCustomEase.create("gentle", "0.25,0.1,0.25,1");\ngsap.to(".box", {\n  x: toPixels(snap(bounded(76))), // 80 maps to 128px\n  backgroundColor: nextColor(3), duration: 0.8, ease: "gentle"\n});\n</script>',
        syntax:
          "gsap.utils.clamp() · mapRange() · snap() · wrap() · CustomEase",
      },
      {
        name: "Render canvas with GSAP’s ticker",
        explanation:
          "Use the ticker when a canvas or renderer needs a frame callback synchronized with GSAP. Animate a small state object and draw from it. Remove custom ticker listeners when a view is destroyed; context cleanup does not automatically remove arbitrary ticker callbacks. The stop button demonstrates explicit cleanup.\n\nThe ticker follows the browser’s animation-frame scheduling. Its deltaTime parameter is in milliseconds, while time is in seconds; use elapsed time rather than a fixed increment if a custom simulation needs frame-rate-independent motion. For this tween-driven drawing, state interpolation is already timed by GSAP. Browser tabs can throttle callbacks, so background time is not a reliable simulation clock. Avoid a second requestAnimationFrame loop for the same rendering work.",
        level: "Specialized",
        requires: "GSAP core; canvas 2D context",
        source: "https://gsap.com/docs/v3/GSAP/gsap.ticker/",
        kind: "html",
        code: '<canvas id="canvas-demo" width="300" height="100" aria-label="A moving blue circle"></canvas>\n<button type="button" id="stop-demo">Stop drawing</button>\n\n<script>\nconst canvas = document.querySelector("#canvas-demo");\nconst ctx = canvas.getContext("2d");\nconst state = { x: 20 };\nfunction draw() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  ctx.fillStyle = "#2563eb";\n  ctx.beginPath(); ctx.arc(state.x, 50, 12, 0, Math.PI * 2); ctx.fill();\n}\nconst tween = gsap.to(state, { x: 280, duration: 2, ease: "none" });\ngsap.ticker.add(draw);\ndocument.querySelector("#stop-demo").onclick = () => {\n  tween.kill();\n  gsap.ticker.remove(draw);\n};\n</script>',
        syntax: "gsap.ticker.add(callback) · gsap.ticker.remove(callback)",
      },
      {
        name: "Read a performance trace and avoid layout thrashing",
        explanation:
          "The rendering pipeline includes style calculation, layout (positions and sizes), paint (pixels), and compositing (combining layers). Transform and opacity often avoid layout, but expensive rasterization or too many layers can still make them slow. GSAP cannot make an inherently expensive scene free to render.\n\nProfile with browser performance tools at realistic zoom, screen size, and CPU conditions. Avoid alternating geometry reads and style writes across many elements in one frame. Read dimensions together, compute values, then create or update animations. Do not add will-change to every element; reserve it for measured cases and remove it when no longer useful. This small pattern measures once before setting up the group.",
        level: "Advanced",
        requires: "GSAP core",
        source: "https://gsap.com/resources/mistakes/",
        kind: "html",
        code: '<div class="measure-group"><div class="measure-item">One</div><div class="measure-item">Two</div></div>\n\n<style>\n.measure-item { width: 100px; padding: 16px; margin: 12px; background: #dce9ff; }\n</style>\n\n<script>\nconst items = gsap.utils.toArray(".measure-item");\nconst distances = items.map(item => item.getBoundingClientRect().width / 2);\n// All geometry reads above happen before animated writes below.\ngsap.to(items, { x: index => distances[index], duration: 0.6, stagger: 0.1 });\n</script>',
      },
    ],
  },
  {
    name: "15. Debug, test, and practice the whole system",
    intro:
      "Essential maintenance skills · Diagnose one layer at a time, then test behavior under interruption and reinitialization. Expert work is predictable motion that survives real content and real users.",
    checkpoint:
      "Ship a small feature only after testing initial load, rapid input, reverse playback, resize, reduced motion, route teardown, and a slow/failed animation dependency.",
    lessons: [
      {
        name: "Diagnose missing targets and early from states",
        explanation:
          "Check script order, selector matches, plugin registration, and the browser console first. from and fromTo normally apply their starting values immediately, even when scheduled later. Set immediateRender: false when a future tween must wait to apply its start. For scroll alignment, enable markers and refresh after layout changes. Old TweenMax/TimelineMax tutorials use legacy GSAP 2 syntax; use gsap in GSAP 3.\n\nReduce the problem to one visible target and one tween. Confirm the target exists at setup, log gsap.version, and inspect the actual computed properties. For a plugin warning, confirm both loading and registration before adjusting the animation. For scroll errors, enable markers and inspect start/end values after refresh; for a jump, look for multiple property owners or an early from state. Keep a minimal reproduction before layering the rest of the scene back in.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/gsap.from()/",
        kind: "html",
        code: '<div class="box">Animate me</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script>\nconsole.log("GSAP", gsap.version);\nconsole.assert(document.querySelector(".box"), "Expected .box in the DOM");\nconst tl = gsap.timeline();\ntl.to(".box", { x: 80, duration: 0.6 })\n  .fromTo(".box", { x: -80 }, {\n    x: 0, duration: 0.6, immediateRender: false\n  }, "+=0.3");\n// The second tween waits until 0.9s to apply its -80px starting position.\n</script>',
        syntax: "gsap.version · immediateRender: false · markers: true",
      },
      {
        name: "Test animation states without waiting for real time",
        explanation:
          "A deterministic test sets the playhead directly instead of sleeping until an animation “should” finish. Create a paused animation, seek to a chosen time or progress, then inspect values and state. Use suppressEvents when seeking should not repeat callbacks.\n\nPlayhead tests do not replace browser tests: verify layout, focus, scroll boundaries, fonts, and user interruptions in a browser too. Test both motion modes and mount/destroy cycles. The example asserts the exact midpoint and end of a linear tween, then reverts its style changes. It uses a real DOM target but avoids wall-clock timing.",
        level: "Essential",
        requires: "GSAP core",
        source: "https://gsap.com/docs/v3/GSAP/Tween/progress()/",
        kind: "html",
        code: '<div class="box">Animate me</div>\n\n<style>\n.box { width: 100px; padding: 20px; background: #2563eb; color: white; border-radius: 12px; }\n</style>\n\n<script>\nconst element = document.querySelector(".box");\nconst tween = gsap.fromTo(element, { x: 0 }, {\n  x: 120, duration: 1, ease: "none", paused: true\n});\ntween.progress(0.5, true);\nconsole.assert(Math.abs(Number(gsap.getProperty(element, "x")) - 60) < 0.01, "Midpoint should be 60px");\ntween.progress(1, true);\nconsole.assert(Math.abs(Number(gsap.getProperty(element, "x")) - 120) < 0.01, "End should be 120px");\ntween.revert();\n</script>',
      },
      {
        name: "Practice project: a production-minded reveal component",
        explanation:
          "Build this after you can explain tweens, timelines, media conditions, contexts, and scroll refresh. The feature should reveal its title and body with one ScrollTrigger, stay readable without motion, scope its selectors, and return a teardown function.\n\nThe worked version combines those decisions. Its factory owns the media-query scope, and the returned destroy function reverts only this feature. The trigger measures a stable container while the child text moves. In a routed app, call destroy before removing the section. Extend it with a layout change, refresh once that layout settles, and verify repeated mounting does not add duplicate triggers.",
        level: "Advanced",
        requires: "ScrollTrigger + GSAP core 3.11+",
        source: "https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/",
        kind: "html",
        code: '<div style="height:100vh">Scroll down</div>\n<section class="reveal-feature"><h2>A complete feature</h2><p>Small pieces, clear ownership.</p></section>\n<div style="height:100vh"></div>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\ngsap.registerPlugin(ScrollTrigger);\nfunction mountReveal(root) {\n  const mm = gsap.matchMedia();\n  mm.add("(prefers-reduced-motion: no-preference)", () => {\n    const timeline = gsap.timeline({\n      defaults: { duration: 0.6, ease: "power2.out" },\n      scrollTrigger: { trigger: root, start: "top 85%", once: true }\n    });\n    timeline.from(root.querySelectorAll("h2, p"), { y: 24, opacity: 0, stagger: 0.1 });\n  }, root);\n  return () => mm.revert();\n}\nconst destroy = mountReveal(document.querySelector(".reveal-feature"));\n// Before removing the section: destroy();\n</script>',
        practice:
          "Acceptance checks: no-motion content is visible; scroll replay policy is intentional; a destroyed view has no surviving triggers; text zoom and changed fonts do not hide content.",
      },
    ],
  },
];
const nav = document.querySelector("#nav");
const content = document.querySelector("#content");
const search = document.querySelector("#search");
const track = document.querySelector("#track");
const count = document.querySelector("#count");
const totalLessons = chapters.reduce(
  (total, chapter) => total + chapter.lessons.length,
  0,
);
function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function paragraphs(parent, text, className) {
  for (const paragraph of text.split("\n\n")) {
    const p = document.createElement("p");
    if (className) p.className = className;
    p.textContent = paragraph;
    parent.append(p);
  }
}
function codeExample(lesson) {
  const container = document.createElement("div");
  const head = document.createElement("div");
  head.className = "example-head";
  const label = document.createElement("span");
  label.textContent = {
    html: "HTML / CSS / JavaScript",
    module: "Bundler JavaScript module",
    jsx: "React JSX",
  }[lesson.kind];
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Copy code";
  button.setAttribute("aria-label", "Copy example for " + lesson.name);
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(lesson.code);
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = "Copy code";
      }, 1400);
    } catch {
      button.textContent = "Copy unavailable";
    }
  });
  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.textContent = lesson.code;
  pre.append(code);
  head.append(label, button);
  container.append(head, pre);
  return container;
}
function render() {
  const query = search.value.trim().toLowerCase();
  nav.replaceChildren();
  content.replaceChildren();
  let total = 0;
  for (const chapter of chapters) {
    const matches = chapter.lessons.filter(
      (lesson) =>
        (track.value === "all" || lesson.level === track.value) &&
        [
          chapter.name,
          lesson.name,
          lesson.level,
          lesson.requires,
          lesson.explanation,
          lesson.code ?? "",
          lesson.practice ?? "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(query),
    );
    if (!matches.length) continue;
    const id = slug(chapter.name);
    const link = document.createElement("a");
    link.href = "#" + id;
    link.textContent = chapter.name + " (" + matches.length + ")";
    nav.append(link);
    const section = document.createElement("section");
    section.id = id;
    const h2 = document.createElement("h2");
    h2.textContent = chapter.name;
    section.append(h2);
    paragraphs(section, chapter.intro, "chapter-intro");
    for (const lesson of matches) {
      total++;
      const article = document.createElement("article");
      article.className = "entry";
      article.id = "lesson-" + slug(lesson.name);
      const h3 = document.createElement("h3");
      h3.textContent = lesson.name;
      const meta = document.createElement("p");
      meta.className = "lesson-meta";
      const level = document.createElement("span");
      level.className = "lesson-level";
      level.textContent = lesson.level;
      meta.append(level, document.createTextNode(" · " + lesson.requires));
      article.append(h3, meta);
      paragraphs(article, lesson.explanation);
      if (lesson.code) article.append(codeExample(lesson));
      if (lesson.practice) {
        const practice = document.createElement("p");
        practice.className = "practice";
        const strong = document.createElement("strong");
        strong.textContent = "Try it: ";
        practice.append(strong, document.createTextNode(lesson.practice));
        article.append(practice);
      }
      const reference = document.createElement("a");
      reference.className = "entry-reference";
      reference.href = lesson.source;
      reference.target = "_blank";
      reference.rel = "noopener noreferrer";
      reference.textContent = lesson.source.includes("standard-license")
        ? "GSAP standard license ↗"
        : "Official GSAP reference ↗";
      reference.setAttribute("aria-label", "Reference for " + lesson.name);
      article.append(reference);
      section.append(article);
    }
    if (!query && track.value === "all") {
      const checkpoint = document.createElement("div");
      checkpoint.className = "chapter-checkpoint";
      const strong = document.createElement("strong");
      strong.textContent = "Before moving on";
      checkpoint.append(strong);
      paragraphs(checkpoint, chapter.checkpoint);
      section.append(checkpoint);
    }
    content.append(section);
  }
  count.textContent = total + " of " + totalLessons + " lessons";
  if (!total) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent =
      "No matching lessons. Try another topic or choose all levels.";
    content.append(empty);
  }
}
search.addEventListener("input", render);
track.addEventListener("change", render);
render();
