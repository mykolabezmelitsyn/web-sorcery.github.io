/* Content follows gsap-mastery-roadmap.md; examples are displayed, never executed. */
const handbook = {
  stages: [
    {
      number: 1,
      stage: "Beginner",
      name: "GSAP Fundamentals",
      projects: [
        {
          name: "Animated buttons with hover effects.",
          brief:
            "Pair pointer hover with keyboard focus and reverse the same tween on exit.",
          acceptance:
            "Rapid enter/leave does not stack tweens; reduced motion keeps a visible focus state.",
        },
        {
          name: "A loading spinner.",
          brief:
            "Animate a decorative spinner with a linear repeat, plus explicit start/stop ownership.",
          acceptance:
            "The loading message remains readable; stopping removes the repeating tween; reduced motion uses a static indicator.",
        },
        {
          name: "Cards appearing with stagger.",
          brief: "Reveal a group of cards with one modest stagger.",
          acceptance:
            "The last card does not wait unnecessarily; disabling motion leaves every card visible.",
        },
        {
          name: "A notification appearing and disappearing.",
          brief:
            "Show a notification immediately, animate its entrance, and provide a dismiss control.",
          acceptance:
            "The message is announced once; essential content is not removed before it can be read.",
        },
        {
          name: "An animated mobile menu.",
          brief:
            "Start with an accessible disclosure button and controlled mobile navigation, then animate its panel.",
          acceptance:
            "aria-expanded, hidden/inert behavior, Escape, and focus all match the current state during rapid toggling.",
        },
        {
          name: "A hero section with animated heading and buttons.",
          brief:
            "Choreograph a heading, description, and calls to action with a shared timing system.",
          acceptance:
            "Content and buttons remain usable without motion; the primary message receives attention first.",
        },
      ],
      goal: "Understand GSAP's core API and confidently build simple animations.",
      milestone:
        "You can create simple animations without copying examples from tutorials.",
      chapters: [1, 2, 3, 4, 5, 6],
    },
    {
      number: 2,
      stage: "Intermediate",
      name: "Timelines, Interaction, and Scroll",
      projects: [
        {
          name: "Animated navigation with dropdowns.",
          brief:
            "Create navigation disclosures with one controller per dropdown and a shared close policy.",
          acceptance:
            "Pointer, keyboard, touch, Escape, and switching between dropdowns all work without animation conflicts.",
        },
        {
          name: "Scroll-reveal landing page.",
          brief:
            "Combine independent one-time reveals with stable trigger containers.",
          acceptance:
            "Images/fonts do not leave stale boundaries; content remains visible under reduced motion.",
        },
        {
          name: "Sticky storytelling sections.",
          brief:
            "Give each narrative scene one pinned timeline and retain a natural-flow fallback.",
          acceptance:
            "No nested pin ownership conflicts; content remains readable at narrow widths and browser zoom.",
        },
        {
          name: "Horizontal-scrolling gallery.",
          brief:
            "Adapt Chapter 11’s measured track and use media conditions to choose pinning only when useful.",
          acceptance:
            "Travel matches the actual track width; resizing clears old pin spacers and transforms.",
        },
        {
          name: "Parallax product presentation.",
          brief:
            "Use restrained layer offsets to support the product story rather than move every element.",
          acceptance:
            "Reduced motion removes depth travel; layout dimensions are reserved before assets load.",
        },
        {
          name: "Interactive accordion and tabs.",
          brief:
            "Keep accordion and tab state semantic, then add cancelable transitions.",
          acceptance:
            "Only the selected tab panel is active; rapid switching and keyboard operation preserve focus and visible content.",
        },
        {
          name: "Complete responsive landing page with GSAP animations.",
          brief:
            "Assemble navigation, reveals, and a single scroll story through explicit mount/destroy functions.",
          acceptance:
            "No duplicate triggers after remount; mobile, reduced motion, and keyboard navigation pass a full review.",
        },
      ],
      goal: "Build coordinated animations and interactive components that work reliably on real websites.",
      milestone:
        "You can independently animate a full landing page with coordinated interactions and scroll effects.",
      chapters: [7, 8, 9, 10, 11, 12],
    },
    {
      number: 3,
      stage: "Advanced",
      name: "Plugins and Complex Animations",
      projects: [
        {
          name: "Animated portfolio with sophisticated page transitions.",
          brief:
            "Retain page content through an exit phase, coordinate router navigation, then animate entry.",
          acceptance:
            "Canceled navigation, focus restoration, history, and no-motion behavior are defined and tested.",
        },
        {
          name: "SVG logo animation.",
          brief:
            "Combine a stroke reveal, a deliberate path morph, and a final stable logo state.",
          acceptance:
            "The SVG scales through its viewBox, has a meaningful accessible name if needed, and restores cleanly.",
        },
        {
          name: "Product configurator with animated state changes.",
          brief:
            "Represent product choices as application state and use FLIP for layout changes.",
          acceptance:
            "Rapid changes preserve the latest selection; price and form state do not depend on animation completion.",
        },
        {
          name: "Draggable carousel with inertia.",
          brief:
            "Use Draggable with InertiaPlugin as one input mechanism for a selected-item controller.",
          acceptance:
            "Buttons and keyboard offer equivalent navigation; bounds and snap targets recompute on resize.",
        },
        {
          name: "Full-screen animated navigation.",
          brief:
            "Sequence panel, links, and backdrop while keeping disclosure and focus behavior explicit.",
          acceptance:
            "Escape closes immediately or through a guaranteed exit; background controls cannot receive focus while modal.",
        },
        {
          name: "Animated text-based landing page.",
          brief:
            "Use responsive SplitText line/word reveals and a consistent typography rhythm.",
          acceptance:
            "Font loading and width changes re-split safely; accessible text and nested semantics remain correct.",
        },
        {
          name: "Interactive product storytelling website.",
          brief:
            "Combine text, SVG, and a measured timeline into a product narrative.",
          acceptance:
            "The scene has a useful static version and one owner for each animated property.",
        },
        {
          name: "Multi-section scroll experience with pinned content.",
          brief:
            "Coordinate pinned sections in document order and use labels for narrative beats.",
          acceptance:
            "Refresh after assets settle; avoid overlapping pin ownership; provide mobile and reduced-motion alternatives.",
        },
      ],
      goal: "Build sophisticated animations such as those found on creative agency websites and interactive product experiences.",
      milestone:
        "You can reproduce complex animation references and combine multiple GSAP plugins confidently.",
      chapters: [13, 14, 15, 16, 17, 18, 19, 20],
    },
    {
      number: 4,
      stage: "Expert",
      name: "Animation Engineering and Architecture",
      projects: [
        {
          name: "A reusable GSAP-powered animation library.",
          brief:
            "Extract tokens, typed factories, controllers, and ownership contracts into a reusable package.",
          acceptance:
            "Public APIs have tests, documentation, supported-version notes, and initialization/refresh/destroy guarantees.",
        },
        {
          name: "A complete animated component collection.",
          brief:
            "Implement buttons, disclosures, dialogs, tabs, and carousels around semantic state first.",
          acceptance:
            "Two instances do not cross-target; focus, rapid input, cleanup, and no-motion behavior are tested.",
        },
        {
          name: "A high-performance interactive portfolio.",
          brief:
            "Budget the rendering cost of each scene and remove effects that do not support the content.",
          acceptance:
            "Profile representative mobile hardware, reserve asset dimensions, and verify no leaked frame loops or triggers.",
        },
        {
          name: "An animated e-commerce product experience.",
          brief:
            "Use product state to drive image changes, cart feedback, and a restrained configurator transition.",
          acceptance:
            "Price, selection, forms, focus, and error handling work with every animation disabled.",
        },
        {
          name: "A sophisticated React application with coordinated transitions.",
          brief:
            "Use scoped useGSAP hooks, contextSafe events, and route-aware controllers.",
          acceptance:
            "Strict Mode, state changes, conditional removal, route cancellation, and reduced motion do not leak or strand content.",
        },
        {
          name: "An interactive 3D product presentation.",
          brief:
            "Create an accessible HTML product story alongside a renderer-owned 3D scene.",
          acceptance:
            "One render loop, resource disposal, asset loading states, keyboard controls, and a lower-cost fallback are documented.",
        },
        {
          name: "A production-ready website with advanced scroll effects, accessibility, and performance optimization.",
          brief:
            "Integrate responsive scroll scenes through typed controllers and test the whole site lifecycle.",
          acceptance:
            "Automated behavior checks, asset refresh, reduced motion, keyboard use, performance profiling, and remount tests pass.",
        },
      ],
      goal: "Build maintainable, accessible, high-performance animation systems suitable for production applications.",
      milestone:
        "You can architect, implement, debug, and optimize complex animation systems independently.",
      chapters: [21, 22, 23, 24, 25, 26, 27, 28, 29],
    },
  ],
  chapters: [
    {
      number: 1,
      name: "Introduction to GSAP",
      stage: "Beginner",
      level: 1,
      topics: [
        "What GSAP is and how it works.",
        "GSAP vs CSS transitions and keyframe animations.",
        "GSAP vs the Web Animations API (WAAPI).",
        "When to use GSAP and when CSS is sufficient.",
        "Installing GSAP using npm.",
        "Using GSAP through a CDN.",
        "Importing GSAP with JavaScript ES modules.",
        "Integrating GSAP with Vite.",
        "Understanding the GSAP core and plugin architecture.",
        "Registering plugins with `gsap.registerPlugin()`.",
      ],
      lessons: [
        {
          name: "Choose the right animation tool",
          explanation:
            "GSAP updates properties over time. A tween calculates intermediate values between a start and an end; a timeline arranges several tweens around one playhead. The playhead is the current time inside an animation. Core handles CSS animation and plain numeric JavaScript properties; plugins add specialized behavior.\n\nUse a CSS transition for a simple hover state. CSS keyframes suit a self-contained repeating effect. The Web Animations API (WAAPI) offers native JavaScript playback control. GSAP is useful when sequencing, reversing, interruption, dynamic values, or scroll integration becomes central. None of these choices replaces semantic HTML or good layout. This complete first file animates a decorative box only when its button is activated, and respects reduced motion.",
          files: [
            {
              name: "index.html",
              code: '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>First GSAP animation</title>\n    <style>\n      body {\n        padding: 24px;\n        font: 16px system-ui;\n      }\n      .box {\n        width: 72px;\n        height: 72px;\n        background: #2563eb;\n        margin-top: 24px;\n      }\n    </style>\n  </head>\n  <body>\n    <button id="play" type="button">Animate</button>\n    <div class="box" aria-hidden="true"></div>\n    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n    <script>\n      document.querySelector("#play").addEventListener("click", () => {\n        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;\n        gsap.to(".box", {\n          x: 160,\n          rotation: 90,\n          duration: reduce ? 0 : 0.8,\n          ease: "power2.out",\n          overwrite: "auto"\n        });\n      });\n    </script>\n  </body>\n</html>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/get-started/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Install once, then register the plugins you use",
          explanation:
            "For a Vite project, install GSAP from public npm and import its ES modules. Vite serves and bundles modules; it does not change GSAP’s animation model. For a plain HTML experiment, the previous example uses the pinned CDN distribution. Choose one installation approach per example, and keep core and plugin versions aligned.\n\nRegister imported plugins explicitly so bundlers retain them and GSAP knows their capabilities. CSSPlugin is included with the normal gsap import. Public npm includes the formerly paid plugins in GSAP 3.13 and later; older private-registry tutorials are outdated. Availability is subject to GSAP’s standard license, not an MIT license. The live license page redirected to the forums outage during verification; consult its current terms for licensing decisions.",
          files: [
            {
              name: "commands.sh",
              code: "npm create vite@latest motion-study -- --template vanilla\ncd motion-study\nnpm install\nnpm install gsap@3.15.0\nnpm run dev",
              language: "shell",
            },
            {
              name: "src/main.js",
              code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);\n// In index.html: <div class="box">Hello</div>\ngsap.to(".box", { x: 80, duration: 0.6 });',
              language: "js",
            },
          ],
          source: "https://gsap.com/docs/v3/Installation/",
          requires:
            "Terminal + Node supported by your chosen Vite version; Vite vanilla project",
          note: "GSAP 3.13+ uses public npm for all plugins. Reference examples pin 3.15.0; Vite’s template is intentionally selected at setup time.",
        },
      ],
      checkpoint:
        "Build the first file from a blank document, then switch between a CDN and a Vite installation without loading core twice.",
      specialization: false,
    },
    {
      number: 2,
      name: "Tweens — The Foundation of GSAP",
      stage: "Beginner",
      level: 1,
      topics: [
        "What a tween is.",
        "`gsap.to()`",
        "`gsap.from()`",
        "`gsap.fromTo()`",
        "`gsap.set()`",
        "Understanding animation targets.",
        "Animating single and multiple elements.",
        "Animating numeric JavaScript object properties.",
        "Using CSS selectors and DOM references.",
        "Core tween properties:",
        "`duration`",
        "`delay`",
        "`ease`",
        "`repeat`",
        "`repeatDelay`",
        "`yoyo`",
        "`paused`",
        'Relative values such as `"+=100"` and `"-=50"`.',
        "Function-based animation values.",
        "Understanding `immediateRender`.",
      ],
      lessons: [
        {
          name: "Targets and the four core methods",
          explanation:
            "A target can be a selector, a DOM element, an array of targets, or a plain object. A selector may match several elements; it does not create missing elements. Query only after the DOM exists. to reads the current value and animates to the destination. from starts at the supplied value and ends at the original value. fromTo supplies both ends. set applies values immediately.\n\nThe example gives three independent boxes different paths. Using a DOM reference is useful when a component must own exactly one element; scoped selectors become important later. Avoid having CSS transitions and GSAP both animate the same transform at once.",
          files: [
            {
              name: "body.html",
              code: '<div class="box a">to</div>\n<div class="box b">from</div>\n<div class="box c">fromTo</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  gsap.set(".a", { x: 0 });\n  gsap.to(".a", { x: 140, duration: 1 });\n  gsap.from(".b", { x: -40, opacity: 0, duration: 1 });\n  const third = document.querySelector(".c");\n  gsap.fromTo(\n    third,\n    { x: 0, rotation: -15 },\n    { x: 140, rotation: 0, duration: 1 }\n  );\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.to()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Timing, repetition, and dynamic values",
          explanation:
            "duration, delay, and repeatDelay use seconds. ease changes how progress is distributed. repeat counts additional iterations; repeat: 1 plays twice, and -1 repeats indefinitely. yoyo alternates direction; paused creates an animation without starting it. Relative values such as +=100 are evaluated from the starting property value.\n\nA function-based value receives the target index, target, and targets array. It is evaluated when the tween initializes, not continuously on every frame. Here the paused group starts on click, travels different distances, repeats once, and returns because of yoyo. Repeated clicks restart the same tween instead of adding competing copies.",
          files: [
            {
              name: "body.html",
              code: '<button id="start">Start</button>\n<div class="tile">One</div>\n<div class="tile">Two</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const tween = gsap.to(".tile", {\n    x: index => 80 + index * 40,\n    rotation: "+=20",\n    duration: 0.7,\n    delay: 0.15,\n    ease: "power2.out",\n    repeat: 1,\n    repeatDelay: 0.2,\n    yoyo: true,\n    paused: true\n  });\n  document.querySelector("#start").onclick = () => tween.restart(true);\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Plain objects and immediate rendering",
          explanation:
            "GSAP can animate numeric object properties independently of the DOM. Use onUpdate when another renderer needs the changing value. The counter example writes text, but an object can also drive canvas or WebGL. Avoid expensive application rendering on every frame.\n\nfrom and fromTo normally apply their starting values immediately, even if scheduled for later. That can cause a flash or overwrite another animation’s starting state. For a delayed fromTo, immediateRender: false postpones that initial write. It does not make the tween’s future values reactive; use invalidate or a fresh tween when measurements change.",
          files: [
            {
              name: "body.html",
              code: '<output id="counter">0</output>\n<div class="box">Wait</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const state = { count: 0 };\n  const output = document.querySelector("#counter");\n  gsap.to(state, {\n    count: 100,\n    duration: 1,\n    ease: "none",\n    onUpdate: () => {\n      output.textContent = String(Math.round(state.count));\n    }\n  });\n  gsap.fromTo(\n    ".box",\n    { x: -80 },\n    {\n      x: 120,\n      delay: 1,\n      duration: 0.8,\n      immediateRender: false\n    }\n  );\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/immediateRender/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Explain to/from/fromTo/set; pause a repeating yoyo tween and predict its destination before running it.",
      specialization: false,
    },
    {
      number: 3,
      name: "CSS Properties and Transformations",
      stage: "Beginner",
      level: 1,
      topics: [
        "Animating `x` and `y`.",
        "Animating `xPercent` and `yPercent`.",
        "Animating `rotation`, `rotationX`, and `rotationY`.",
        "Animating `scale`, `scaleX`, and `scaleY`.",
        "Animating `skewX` and `skewY`.",
        "Understanding `transformOrigin`.",
        "Animating `opacity` and `autoAlpha`.",
        "Animating colors and backgrounds.",
        "Animating dimensions and CSS variables.",
        "Understanding 2D vs 3D transformations.",
        "Working with `perspective` and `transformPerspective`.",
        "Understanding transform composition and avoiding CSS conflicts.",
      ],
      lessons: [
        {
          name: "Transforms, percentages, and origins",
          explanation:
            "x and y are translation distances, normally pixels for numeric values. xPercent and yPercent use the animated element’s own dimensions, so -50 centers an element around its positioning point. rotation is around the Z axis; rotationX and rotationY tilt in 3D. scale, scaleX, and scaleY resize visually, without changing layout dimensions. skewX and skewY slant an element.\n\ntransformOrigin chooses the pivot. GSAP composes these transform components; do not also replace transform through another animation system. A parent’s perspective affects its children’s 3D scene; transformPerspective sets perspective on the transformed element itself. Use subtle 3D motion and test text legibility.",
          files: [
            {
              name: "body.html",
              code: '<div class="scene"><div class="box">Pivot</div></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .scene {\n    perspective: 800px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  gsap.set(".box", {\n    transformOrigin: "left center",\n    transformPerspective: 600\n  });\n  gsap.to(".box", {\n    x: 100,\n    y: 20,\n    xPercent: 10,\n    yPercent: 0,\n    rotation: 8,\n    rotationY: 25,\n    rotationX: 5,\n    scaleX: 1.1,\n    scaleY: 0.95,\n    skewX: 4,\n    skewY: 0,\n    duration: 1,\n    ease: "power2.out"\n  });\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Visibility, color, dimensions, and CSS custom properties",
          explanation:
            "opacity changes transparency but leaves an element able to receive focus and pointer input. autoAlpha combines opacity with visibility; neither property is a complete dialog or disclosure implementation. hidden, inert, focus, and aria-expanded belong to application state and need deliberate handling.\n\nGSAP can interpolate colors, widths, heights, and CSS custom properties. Width and height can cause layout on each frame; prefer transforms when only the visual appearance needs to change. The custom property below controls a decorative glow, while backgroundColor and opacity provide straightforward feedback. Reserve dimensions for cases where surrounding layout must actually move.",
          files: [
            {
              name: "body.html",
              code: '<div class="box">Color</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .box {\n    --glow: 0px;\n    box-shadow: 0 0 var(--glow) #7c3aed;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  gsap.fromTo(\n    ".box",\n    { autoAlpha: 0, "--glow": "0px" },\n    {\n      autoAlpha: 1,\n      backgroundColor: "#7c3aed",\n      "--glow": "18px",\n      duration: 0.8\n    }\n  );\n  // When a real layout change is required:\n  // gsap.to(".box", { width: 160, height: 100, duration: 0.4 });\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Use a different transform origin and percentage translation; verify the layout box has not changed.",
      specialization: false,
    },
    {
      number: 4,
      name: "Easing Functions",
      stage: "Beginner",
      level: 1,
      topics: [
        "What easing is and why it matters.",
        "`none`",
        "`power1` through `power4`",
        "`back`",
        "`bounce`",
        "`elastic`",
        "`circ`",
        "`expo`",
        "`sine`",
        "`steps()`",
        "Understanding `.in`, `.out`, and `.inOut`.",
        "Choosing easing based on interaction and visual intent.",
        "Using the GSAP Ease Visualizer.",
      ],
      lessons: [
        {
          name: "Understand the easing families",
          explanation:
            "Easing maps elapsed progress to animation progress. none is linear and useful for continuous rotation or scroll-scrubbed travel. power1 through power4 give increasingly pronounced acceleration or deceleration. .in accelerates, .out decelerates, and .inOut does both. A short power2.out is a useful first choice for direct UI feedback.\n\nback overshoots, bounce imitates rebounds, and elastic oscillates. circ, expo, and sine offer distinct smooth curves. steps(6) produces discrete jumps. These are visual curves, not physical collision simulations. Compare them in the official Ease Visualizer and choose an effect that supports the interface’s intent; strong overshoot is rarely appropriate for long text or large viewport movement.",
          files: [
            {
              name: "body.html",
              code: '<div class="tile">Power</div>\n<div class="tile">Back</div>\n<div class="tile">Steps</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  ["power2.out", "back.out(1.4)", "steps(6)"].forEach((ease, index) => {\n    gsap.to(document.querySelectorAll(".tile")[index], {\n      x: 160,\n      duration: 1.2,\n      ease\n    });\n  });\n  // Other choices: "sine.inOut", "circ.out", "expo.out",\n  // "bounce.out", "elastic.out(1, 0.4)", "power4.inOut", "none".\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Compare linear, power2.out, and back.out at the same distance and duration, then justify one for a button.",
      specialization: false,
    },
    {
      number: 5,
      name: "Stagger Animations",
      stage: "Beginner",
      level: 1,
      topics: [
        "What staggering means.",
        "Basic `stagger` configuration.",
        "Staggering with numeric values.",
        "Using `each` and `amount`.",
        '`from: "start"`, `"center"`, `"end"`, `"edges"`, `"random"`.',
        "Grid-based stagger animations.",
        "Custom stagger easing.",
        "Function-based stagger values.",
        "Creating cascading and wave-like effects.",
      ],
      lessons: [
        {
          name: "Stagger a group without creating a manual timer loop",
          explanation:
            "A stagger offsets the start times of targets in one tween. A numeric stagger is the gap between starts. each supplies that gap explicitly; amount distributes starts across a total span. from chooses the origin: start, center, end, edges, random, or a numeric index. A stagger ease changes how offsets are distributed, independently of the tween’s own ease.\n\nFor a grid, specify rows/columns or use grid: auto when GSAP can infer them from layout. A function-based stagger returns the start offset for each target. The example creates a wave from the center; modest distances and a small amount prevent the last item from feeling delayed.",
          files: [
            {
              name: "body.html",
              code: '<div class="grid">\n  <div class="tile">1</div>\n  <div class="tile">2</div>\n  <div class="tile">3</div>\n  <div class="tile">4</div>\n  <div class="tile">5</div>\n  <div class="tile">6</div>\n</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(3, 96px);\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  gsap.from(".tile", {\n    y: 24,\n    opacity: 0,\n    duration: 0.5,\n    ease: "power2.out",\n    stagger: { amount: 0.4, from: "center", grid: [2, 3], ease: "sine.inOut" }\n  });\n  // Alternatives: stagger: 0.08 or { each: 0.08, from: "edges" }.\n  // Function alternative: stagger: index => index * 0.08.\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/vars#stagger",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Change the grid dimensions and stagger origin; predict which target starts last.",
      specialization: false,
    },
    {
      number: 6,
      name: "Basic Animation Callbacks",
      stage: "Beginner",
      level: 1,
      topics: [
        "`onStart`",
        "`onUpdate`",
        "`onComplete`",
        "`onRepeat`",
        "`onReverseComplete`",
        "Passing callback parameters.",
        "Triggering JavaScript functions from animations.",
        "Synchronizing animation with UI state.",
      ],
      lessons: [
        {
          name: "Callbacks connect motion to application behavior",
          explanation:
            "onStart runs when an animation begins, onUpdate on updates, onRepeat at repeat boundaries, onComplete at its forward end, and onReverseComplete at its reverse end. Callback parameters can be supplied through the corresponding Params option. A timeline call schedules an arbitrary function, which is covered in Chapter 7.\n\nKeep high-frequency callbacks small. Do not announce a screen-reader message on every update or use animation completion as the only way an essential action can succeed. Here a button reverses the same tween and a polite status reports only completed transitions. If animation is disabled, the application still needs to commit the same logical state.",
          files: [
            {
              name: "body.html",
              code: '<button id="toggle">Move / return</button>\n<div class="box" aria-hidden="true"></div>\n<p id="status" role="status"></p>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const status = document.querySelector("#status");\n  const report = message => {\n    status.textContent = message;\n  };\n  const tween = gsap.to(".box", {\n    x: 140,\n    duration: 0.7,\n    paused: true,\n    onStart: () => console.log("Started"),\n    onUpdate: () => {}, // Keep per-frame work small.\n    onRepeat: () => console.log("Repeated"),\n    onComplete: report,\n    onCompleteParams: ["Moved"],\n    onReverseComplete: report,\n    onReverseCompleteParams: ["Returned"]\n  });\n  let moved = false;\n  document.querySelector("#toggle").onclick = () => {\n    moved = !moved;\n    moved ? tween.play() : tween.reverse();\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Reverse a tween halfway through and verify completion messages describe the actual settled state.",
      specialization: false,
    },
    {
      number: 7,
      name: "GSAP Timelines",
      stage: "Intermediate",
      level: 2,
      topics: [
        "`gsap.timeline()`",
        "Adding tweens to timelines.",
        "Chaining `.to()`, `.from()`, and `.fromTo()`.",
        "Timeline defaults.",
        "Understanding the position parameter:",
        "Absolute positions.",
        'Relative positions: `"+="`, `"-="`.',
        'Overlapping animations with `"<"` and `">"`.',
        'Offsets such as `"<0.2"` and `">-0.3"`.',
        "Timeline labels.",
        "`addLabel()`.",
        "`add()`.",
        "`call()`.",
        "Nested timelines.",
        "Reusable animation functions.",
        "Controlling complex animation sequences.",
        "Combining sequential and simultaneous animations.",
      ],
      lessons: [
        {
          name: "Sequence with positions and labels",
          explanation:
            "A timeline coordinates children under one playhead. Chained to, from, and fromTo calls append at the end unless you supply a position. A number is an absolute time in seconds. +=0.2 and -=0.2 are relative to the timeline’s end. < refers to the most recently added animation’s start; > refers to its end. <0.2 and >-0.3 add offsets to those anchors.\n\nLabels name meaningful points, so later edits do not require recalculating every timestamp. addLabel defines one, add inserts an animation or nested timeline, and call schedules a function. Timeline defaults supply shared child settings; explicit child values override them. Watch the overlapping starts in this example.",
          files: [
            {
              name: "body.html",
              code: '<div class="box a">A</div>\n<div class="box b">B</div>\n<div class="box c">C</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const tl = gsap.timeline({\n    defaults: { duration: 0.6, ease: "power2.out" }\n  });\n  tl.to(".a", { x: 140 }, 0)\n    .from(".b", { x: -40, opacity: 0 }, "<0.2")\n    .addLabel("finish", "+=0.2")\n    .fromTo(".c", { x: 0 }, { x: 140, immediateRender: false }, "finish")\n    .call(() => console.log("Sequence complete"), [], ">")\n    .to(".a", { rotation: 20 }, "finish+=0.1");\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/position-parameter/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Compose reusable sequences",
          explanation:
            "A timeline factory returns a timeline rather than starting unrelated tweens in several modules. This makes sequencing, reversal, and testing easier. Build child timelines paused only when they will be controlled independently; a paused child will remain paused when placed in a parent. Scope targets to the owning component.\n\nNested timelines provide separate internal timing while the parent controls the whole sequence. The factory below creates a two-part entrance. Both components can overlap, or the second can start after the first. Keep application state changes outside decorative factories unless that dependency is explicit.",
          files: [
            {
              name: "body.html",
              code: '<div class="feature">\n  <div class="tile">Title</div>\n  <p>Supporting text.</p>\n</div>\n<div class="feature">\n  <div class="tile">Next</div>\n  <p>Another feature.</p>\n</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  function entrance(root) {\n    const select = gsap.utils.selector(root);\n    return gsap\n      .timeline({ defaults: { duration: 0.5 } })\n      .from(select(".tile"), { y: 20, opacity: 0 })\n      .from(select("p"), { y: 10, opacity: 0 }, "<0.15");\n  }\n  const sections = document.querySelectorAll(".feature");\n  const master = gsap.timeline();\n  master.add(entrance(sections[0]), 0);\n  master.add(entrance(sections[1]), ">-0.2");\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Add a labeled nested timeline and move its label without rewriting its internal timings.",
      specialization: false,
    },
    {
      number: 8,
      name: "Playback and Animation Control",
      stage: "Intermediate",
      level: 2,
      topics: [
        "`play()`",
        "`pause()`",
        "`resume()`",
        "`reverse()`",
        "`restart()`",
        "`seek()`",
        "`progress()`",
        "`totalProgress()`",
        "`timeScale()`",
        "`reversed()`",
        "`isActive()`",
        "`kill()`",
        "`invalidate()`",
        "`revert()`",
        "Understanding animation progress vs total progress.",
        "Controlling animations with buttons, sliders, and events.",
        "Handling interrupted animations.",
      ],
      lessons: [
        {
          name: "Control a single playhead",
          explanation:
            "play moves forward, pause stops time, resume continues in the current direction, reverse moves backward, and restart returns to the beginning and plays. seek moves to a time or label. progress is the current iteration’s normalized position from 0 to 1; totalProgress includes repeats and repeat delays. timeScale changes playback speed without rewriting durations. reversed queries or sets direction, and isActive reports whether the animation is currently playing on an active parent.\n\nFor a repeating tween, progress(1) is not equivalent to reaching its final repeated end. The slider below seeks a non-repeating timeline with callbacks suppressed; its output is a learning tool rather than application state.",
          files: [
            {
              name: "body.html",
              code: '<button id="play">Play</button><button id="pause">Pause</button\n><button id="back">Reverse</button><button id="restart">Restart</button\n><label\n  >Progress\n  <input id="seek" type="range" min="0" max="1" step="0.01" value="0"\n/></label>\n<div class="box"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const slider = document.querySelector("#seek");\n  const tl = gsap.timeline({\n    paused: true,\n    onUpdate: () => {\n      slider.value = String(tl.progress());\n    }\n  });\n  tl.to(".box", { x: 180, duration: 1, ease: "none" }).to(".box", {\n    rotation: 90,\n    duration: 0.5\n  });\n  document.querySelector("#play").onclick = () => tl.play();\n  document.querySelector("#pause").onclick = () => tl.pause();\n  document.querySelector("#back").onclick = () => tl.reverse();\n  document.querySelector("#restart").onclick = () => tl.restart();\n  slider.oninput = () => tl.pause().progress(Number(slider.value), true);\n  // Also: tl.resume(); tl.seek(0.5); tl.timeScale(0.5);\n  // Read: tl.totalProgress(), tl.reversed(), tl.isActive().\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Stop, recalculate, or restore intentionally",
          explanation:
            "kill stops and removes an animation, leaving the current rendered values. revert restores the pre-animation inline styles and normally kills the animation. invalidate discards recorded initialization values so a later render can recalculate them; it is not a DOM cleanup operation. Choose the operation according to ownership and the desired visual result.\n\nWhen an interaction is interrupted, reuse or reverse a persistent timeline, or overwrite the conflicting properties with a fresh to tween. Do not queue a new from tween on every event: its starting values can cause jumps. This example changes the travel distance, invalidates the paused tween, restarts it, then allows a separate button to restore its original styles.",
          files: [
            {
              name: "body.html",
              code: '<button id="again">Recalculate + restart</button\n><button id="restore">Restore</button>\n<div class="box"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  let distance = 100;\n  const tween = gsap.to(".box", {\n    x: () => distance,\n    duration: 0.6,\n    paused: true\n  });\n  document.querySelector("#again").onclick = () => {\n    distance += 30;\n    tween.invalidate().restart();\n  };\n  document.querySelector("#restore").onclick = () => tween.revert();\n  // After revert(), create a fresh tween if this feature is mounted again.\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/revert()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Seek a repeating tween and compare progress with totalProgress; demonstrate kill versus revert.",
      specialization: false,
    },
    {
      number: 9,
      name: "Interactive Animations",
      stage: "Intermediate",
      level: 2,
      topics: [
        "Mouse hover animations.",
        "Click-triggered animations.",
        "Mouse-following elements.",
        "Pointer-based movement.",
        "Magnetic buttons.",
        "Animated dropdown menus.",
        "Accordion animations.",
        "Modal opening and closing animations.",
        "Animated tabs.",
        "Sliders and carousels.",
        "Page loading animations.",
        "Form validation feedback.",
        "Synchronizing animations with user interactions.",
        "Avoiding animation conflicts during rapid interactions.",
      ],
      lessons: [
        {
          name: "Hover, focus, click, and rapid input",
          explanation:
            "Treat pointer hover and keyboard focus as equivalent ways to discover an effect. A persistent paused timeline can play toward its open state and reverse from any intermediate point, which avoids stacking animations during rapid input. Pointer movement can drive quickTo for a cursor follower or magnetic button; Chapter 13 covers that optimization.\n\nClick-triggered dropdowns and mobile navigation need semantic state such as aria-expanded, not just an opacity tween. Loading effects should stop when content is ready and should not block access. Validation feedback should accompany a readable error message; a shake alone conveys no useful information to many readers.",
          files: [
            {
              name: "body.html",
              code: '<button id="action">Hover or focus</button>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const button = document.querySelector("#action");\n  const tween = gsap.to(button, {\n    scale: 1.06,\n    duration: 0.18,\n    paused: true\n  });\n  function sync() {\n    const active =\n      button.matches(":hover") || document.activeElement === button;\n    active ? tween.play() : tween.reverse();\n  }\n  ["pointerenter", "pointerleave", "focus", "blur"].forEach(event =>\n    button.addEventListener(event, sync)\n  );\n  // Component cleanup: remove those listeners, then tween.revert().\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/conflict/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Animate an accordion without hiding its state",
          explanation:
            "An accordion changes document flow; animating height is appropriate because surrounding content must move. Measure the full content height, expose the panel before opening, and hide it only after closing. Keep the latest logical state independent of animation completion. overwrite: auto replaces competing height tweens when input arrives quickly.\n\nDropdowns, tabs, modals, and carousels share the need for an explicit state model but have different keyboard and focus requirements. Use native dialog for modals; tabs need tab selection and panel relationships; carousels need buttons and meaningful reading order. Use the same state-to-animation boundary rather than copying accordion semantics into every component.",
          files: [
            {
              name: "body.html",
              code: '<button id="disclose" aria-expanded="false" aria-controls="panel">\n  Details\n</button>\n<div id="panel" hidden><p>Details stay available without animation.</p></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  #panel {\n    overflow: hidden;\n  }\n  #panel p {\n    padding: 16px;\n    margin: 0;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const button = document.querySelector("#disclose");\n  const panel = document.querySelector("#panel");\n  let open = false;\n  button.onclick = () => {\n    open = !open;\n    button.setAttribute("aria-expanded", String(open));\n    if (open && panel.hidden) {\n      panel.hidden = false;\n      gsap.set(panel, { height: 0 });\n    }\n    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;\n    gsap.to(panel, {\n      height: open ? panel.scrollHeight : 0,\n      duration: reduce ? 0 : 0.25,\n      overwrite: "auto",\n      onComplete: () => {\n        if (!open) panel.hidden = true;\n        gsap.set(panel, { clearProps: "height" });\n      }\n    });\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/accessibility/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Rapidly toggle the accordion and use keyboard focus on the hover demo; confirm the latest intent wins.",
      specialization: false,
    },
    {
      number: 10,
      name: "ScrollTrigger Fundamentals",
      stage: "Intermediate",
      level: 2,
      topics: [
        "Installing and registering ScrollTrigger.",
        "`scrollTrigger` configuration.",
        "`ScrollTrigger.create()`",
        "Understanding `trigger`.",
        "Understanding `start` and `end`.",
        "Using visual markers.",
        "`toggleActions`",
        "`scrub`",
        "`pin`",
        "`pinSpacing`",
        "`once`",
        "`toggleClass`",
        "Scroll-based callbacks.",
        "Scroll direction and progress.",
        "Animating multiple elements on scroll.",
        "Connecting timelines to ScrollTrigger.",
        "Understanding how viewport position affects animations.",
      ],
      lessons: [
        {
          name: "Translate viewport positions into animation boundaries",
          explanation:
            'ScrollTrigger connects an animation to a scroll range. trigger is the element being measured. start: "top 85%" means its top meets a point 85% down the viewport. end defines the other boundary. markers reveal those positions during development and should be removed before release. A timeline can own one ScrollTrigger so its children share a single scroll playhead.\n\nWithout scrub, crossings trigger actions: toggleActions lists onEnter, onLeave, onEnterBack, and onLeaveBack actions in that order. once runs a one-time reveal; toggleClass toggles a class without requiring a tween. Separate triggers per independent element are useful for a list of scroll reveals.',
          files: [
            {
              name: "body.html",
              code: '<div class="spacer">Scroll down</div>\n<div class="box">Reveal</div>\n<div class="spacer"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .spacer {\n    height: 100vh;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\n  gsap.registerPlugin(ScrollTrigger);\n  gsap.from(".box", {\n    y: 40,\n    opacity: 0,\n    duration: 0.7,\n    scrollTrigger: {\n      trigger: ".box",\n      start: "top 85%",\n      end: "bottom 20%",\n      toggleActions: "play none none reverse",\n      markers: true\n      // For a one-time reveal, use once: true instead of reverse behavior.\n    }\n  });\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Scrub, pin, and observe scroll state",
          explanation:
            "scrub: true links animation progress directly to scroll progress; a numeric scrub adds catch-up smoothing. pin holds an element while scrolling through a range. pinSpacing normally reserves space so the following content does not slide underneath; disable it only when that overlap is intentional. Animate a child inside a stable pinned container instead of moving the measurement target.\n\nScrollTrigger.create can observe crossings, toggle classes, or pin without creating a tween. onUpdate receives a trigger instance with progress and direction. Avoid announcing that progress on every frame. This example pins a scene and scrubs a horizontal child over 600 scroll pixels; the following standalone observer only updates a CSS class.",
          files: [
            {
              name: "body.html",
              code: '<div class="spacer">Scroll down</div>\n<section class="scene"><div class="box"></div></section>\n<div class="spacer"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .spacer {\n    height: 100vh;\n  }\n  .scene {\n    min-height: 250px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\n  gsap.registerPlugin(ScrollTrigger);\n  gsap\n    .timeline({\n      scrollTrigger: {\n        trigger: ".scene",\n        start: "top top",\n        end: "+=600",\n        scrub: true,\n        pin: true,\n        pinSpacing: true,\n        onUpdate: self => {\n          console.log(self.progress, self.direction);\n        }\n      }\n    })\n    .to(".box", { x: 180, rotation: 90, ease: "none" });\n  const observer = ScrollTrigger.create({\n    trigger: ".scene",\n    start: "top center",\n    end: "bottom center",\n    toggleClass: "in-view",\n    onEnter: () => console.log("Entered")\n  });\n  // Teardown: observer.kill(); revert the timeline/context too.\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Explain both sides of a start string, then compare toggleActions with scrub.",
      specialization: false,
    },
    {
      number: 11,
      name: "Advanced ScrollTrigger Techniques",
      stage: "Intermediate",
      level: 2,
      topics: [
        "Scroll-linked animations with `scrub`.",
        "Pinned sections.",
        "Horizontal scrolling sections.",
        "Parallax effects.",
        "Scroll snapping.",
        "Multi-section storytelling.",
        "Scroll-based timeline synchronization.",
        "Dynamic `start` and `end` calculations.",
        "Working with custom scroll containers.",
        "`ScrollTrigger.refresh()`",
        "`ScrollTrigger.update()`",
        "`ScrollTrigger.getAll()`",
        "Handling content that changes after page load.",
        "Working with images and fonts that affect layout.",
        "Understanding common pinning and nested ScrollTrigger issues.",
        "ScrollTrigger debugging.",
      ],
      lessons: [
        {
          name: "Build a horizontal scene with real measurements",
          explanation:
            "A horizontal-scrolling section usually converts vertical scroll progress into a translated track. Compute the travel from scrollWidth minus the viewport width. Use function-based values and invalidateOnRefresh so layout changes recalculate both tween travel and the scroll range. A zero-travel layout should stay in normal flow rather than pinning an empty animation.\n\nParallax uses different travel rates to suggest depth; keep distances restrained. Snapping can settle progress onto sections, but it should not fight ordinary navigation. Multi-section stories are easier to maintain when each scene has one authoritative timeline. Avoid attaching scrub triggers to children already controlled by a parent scrub timeline.",
          files: [
            {
              name: "body.html",
              code: '<div class="spacer">Scroll down</div>\n<section class="gallery">\n  <div class="track">\n    <article>One</article>\n    <article>Two</article>\n    <article>Three</article>\n  </div>\n</section>\n<div class="spacer"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .spacer {\n    height: 100vh;\n  }\n  .gallery {\n    overflow: hidden;\n  }\n  .track {\n    display: flex;\n    width: max-content;\n  }\n  .track article {\n    width: 80vw;\n    height: 240px;\n    padding: 24px;\n    background: #dce9ff;\n    color: #17212d;\n    border: 1px solid #2563eb;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\n  gsap.registerPlugin(ScrollTrigger);\n  const gallery = document.querySelector(".gallery");\n  const track = document.querySelector(".track");\n  const distance = () => Math.max(0, track.scrollWidth - gallery.clientWidth);\n  if (distance() > 0) {\n    gsap.to(track, {\n      x: () => -distance(),\n      ease: "none",\n      scrollTrigger: {\n        trigger: gallery,\n        pin: true,\n        scrub: 0.3,\n        start: "top top",\n        end: () => `+=${Math.max(1, distance())}`,\n        invalidateOnRefresh: true\n        // Optional, after usability testing: snap: 1 / 2\n      }\n    });\n  }\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Refresh layout, update progress, and debug ownership",
          explanation:
            "refresh remeasures start/end positions after layout changes; update reads the current scroll position and updates progress without performing that measurement pass. getAll lists active triggers, useful for detecting duplicates. Do not refresh in every scroll callback. Refresh after images, fonts, content insertion, or a route layout have settled, and batch repeated requests.\n\nA custom scroll container uses scroller. A third-party virtual scroller may need scrollerProxy and its own update/refresh integration; use its documented adapter rather than guessing. Pinning can fail when ancestors establish unexpected transform or overflow contexts. Check stable geometry, pin order, markers, and ownership before adding pin workarounds.",
          files: [
            {
              name: "body.html",
              code: '<div class="scroller">\n  <div class="spacer"></div>\n  <div class="box"></div>\n  <div class="spacer"></div>\n</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .scroller {\n    height: 320px;\n    overflow-y: auto;\n  }\n  .spacer {\n    height: 400px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\n  gsap.registerPlugin(ScrollTrigger);\n  const tween = gsap.to(".box", {\n    x: 140,\n    scrollTrigger: {\n      trigger: ".box",\n      scroller: ".scroller",\n      start: "top 80%",\n      scrub: true\n    }\n  });\n  Promise.all([\n    document.fonts.ready,\n    ...Array.from(document.images, image => image.decode().catch(() => {}))\n  ]).then(() => {\n    if (tween.scrollTrigger) ScrollTrigger.refresh();\n  });\n  console.log("Owned trigger", tween.scrollTrigger);\n  console.log("All triggers", ScrollTrigger.getAll().length);\n  // ScrollTrigger.update(); // Only when a custom integration needs a progress update.\n</script>',
              language: "html",
            },
          ],
          source:
            "https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Resize a horizontal track and refresh after inserting content; inspect resulting trigger boundaries.",
      specialization: false,
    },
    {
      number: 12,
      name: "Responsive Animations",
      stage: "Intermediate",
      level: 2,
      topics: [
        "`gsap.matchMedia()`",
        "Media query conditions.",
        "Desktop-specific animations.",
        "Mobile-specific animations.",
        "Responsive ScrollTrigger setups.",
        "Recalculating scroll positions.",
        "Cleaning up animations when breakpoints change.",
        "Respecting `prefers-reduced-motion`.",
        "Supporting touch devices.",
        "Handling orientation changes.",
        "Avoiding responsive layout shifts.",
      ],
      lessons: [
        {
          name: "Media conditions own their animations",
          explanation:
            "gsap.matchMedia, added in 3.11, records animations in a context and reverts them when matching conditions change. Conditions can distinguish desktop, mobile, and reduced motion in one setup. Only add desktop pinning when it benefits that layout; mobile can keep content in natural flow. Conditions are about layout and user preference, not a guarantee about input hardware.\n\nReturn cleanup for listeners or other resources created inside the callback. Revert the matchMedia instance when the component is destroyed. Resize and orientation changes can alter geometry; ScrollTrigger normally refreshes on resize, while application-driven layout changes still need an explicit refresh. Size media in CSS before loading to avoid layout shifts.",
          files: [
            {
              name: "body.html",
              code: '<div class="spacer">Scroll down</div>\n<section class="feature"><div class="box">Adapt</div></section>\n<div class="spacer"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .spacer {\n    height: 100vh;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n\n<script>\n  gsap.registerPlugin(ScrollTrigger);\n  const mm = gsap.matchMedia();\n  mm.add(\n    {\n      desktop: "(min-width: 800px)",\n      mobile: "(max-width: 799px)",\n      reduce: "(prefers-reduced-motion: reduce)"\n    },\n    context => {\n      const { desktop, reduce } = context.conditions;\n      if (reduce) return; // Default CSS keeps the content visible.\n      gsap.from(".box", {\n        y: desktop ? 48 : 16,\n        opacity: 0,\n        duration: 0.6,\n        scrollTrigger: { trigger: ".feature", start: "top 85%", once: true }\n      });\n    }\n  );\n  // Component teardown: mm.revert().\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Touch support and responsive ownership",
          explanation:
            "Do not make hover, mouse position, or wheel input the only route to content. Use pointer events for input that spans mice, pens, and touch, and test keyboard operation separately. A pointer:fine condition is useful for a decorative follower, while click and focus must continue to work everywhere.\n\nKeep mobile animation distances smaller, allow text to wrap naturally, and remove unnecessary pins. When a breakpoint rebuilds a sequence, let the old context revert before creating the next one. Test a live resize across each breakpoint and a reduced-motion preference change; duplicated triggers or leftover inline transforms indicate incomplete cleanup.",
          files: [
            {
              name: "body.html",
              code: '<button id="target">Pointer, touch, or keyboard</button>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const target = document.querySelector("#target");\n  const mm = gsap.matchMedia();\n  mm.add(\n    "(pointer: fine) and (prefers-reduced-motion: no-preference)",\n    () => {\n      const enter = () =>\n        gsap.to(target, { scale: 1.05, duration: 0.15, overwrite: "auto" });\n      const leave = () =>\n        gsap.to(target, { scale: 1, duration: 0.15, overwrite: "auto" });\n      target.addEventListener("pointerenter", enter);\n      target.addEventListener("pointerleave", leave);\n      return () => {\n        target.removeEventListener("pointerenter", enter);\n        target.removeEventListener("pointerleave", leave);\n        gsap.killTweensOf(target);\n        gsap.set(target, { clearProps: "transform" });\n      };\n    }\n  );\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/accessibility/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Cross a breakpoint and change reduced-motion preference while the page is mounted; check for leftover styles and triggers.",
      specialization: false,
    },
    {
      number: 13,
      name: "Advanced Tweening Techniques",
      stage: "Advanced",
      level: 3,
      topics: [
        "GSAP keyframes.",
        "Functional values and dynamic calculations.",
        "`repeatRefresh`.",
        "`modifiers`.",
        "`snap` configurations.",
        "`overwrite` behavior.",
        "Advanced animation callbacks.",
        "`gsap.getProperty()`.",
        "`gsap.quickTo()`.",
        "`gsap.quickSetter()`.",
        "`gsap.defaults()`.",
        "`gsap.config()`.",
        "`gsap.registerEffect()`.",
        "Reusable GSAP effects.",
        "Synchronizing multiple independent timelines.",
      ],
      lessons: [
        {
          name: "Keyframes, fresh values, and competing tweens",
          explanation:
            "Keyframes describe several destinations within one tween; use an array for explicit steps. Function-based values can use current measurements when initialized. repeatRefresh invalidates recorded start/end values on full repeats so random or computed destinations can change; it does not run on every frame or every yoyo return.\n\nmodifiers transforms a computed value before application, useful for wrapping an endless track. snap rounds selected property values. overwrite: auto removes conflicting properties from active tweens when the new tween initializes; it does not indiscriminately destroy every animation on the target. Use onInterrupt to release animation-specific work when a tween is killed before completion. Coordinate independent timelines through one owner rather than both writing the same properties.",
          files: [
            {
              name: "body.html",
              code: '<div class="box"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const move = gsap.to(".box", {\n    keyframes: [\n      { x: 80, duration: 0.3 },\n      { y: 30, rotation: 15, duration: 0.3 },\n      { x: 0, y: 0, rotation: 0, duration: 0.4 }\n    ],\n    repeat: 1,\n    repeatRefresh: true,\n    onInterrupt: () => console.log("Interrupted")\n  });\n  // Other independent recipes:\n  // gsap.to(".box", { x: () => Math.random() * 180, repeat: 3, repeatRefresh: true });\n  // gsap.to(".box", { x: 180, snap: { x: 10 }, overwrite: "auto" });\n  // gsap.to(".box", { x: 500, modifiers: { x: gsap.utils.unitize(gsap.utils.wrap(0, 200)) } });\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/keyframes/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Fast setters and shared effects",
          explanation:
            "getProperty reads a GSAP-managed property, often more usefully than parsing a transform matrix. quickTo reuses a tween for frequent changes to one property; quickSetter writes a property directly with low overhead and no easing. Use these after measuring a high-frequency interaction, not as a substitute for a state model.\n\nGlobal defaults affect later animations; config changes engine settings. Prefer timeline-local defaults for reusable components so importing one module does not change every other feature. registerEffect names a reusable factory, optionally extending timelines. The pointer follower below is decorative, bounded to a small pad, and disabled when motion is reduced or the pointer is coarse.",
          files: [
            {
              name: "body.html",
              code: '<div class="pad"><span class="dot" aria-hidden="true"></span></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .pad {\n    width: 280px;\n    height: 180px;\n    background: #dce9ff;\n    position: relative;\n  }\n  .dot {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    background: #2563eb;\n    pointer-events: none;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const pad = document.querySelector(".pad");\n  const dot = document.querySelector(".dot");\n  const mm = gsap.matchMedia();\n  mm.add(\n    "(pointer: fine) and (prefers-reduced-motion: no-preference)",\n    () => {\n      const xTo = gsap.quickTo(dot, "x", {\n        duration: 0.2,\n        ease: "power2.out"\n      });\n      const yTo = gsap.quickTo(dot, "y", {\n        duration: 0.2,\n        ease: "power2.out"\n      });\n      const move = event => {\n        const rect = pad.getBoundingClientRect();\n        xTo(event.clientX - rect.left);\n        yTo(event.clientY - rect.top);\n      };\n      pad.addEventListener("pointermove", move);\n      return () => pad.removeEventListener("pointermove", move);\n    }\n  );\n  console.log(gsap.getProperty(dot, "x"));\n  // Direct writes: const setX = gsap.quickSetter(dot, "x", "px"); setX(20);\n  // Global settings (application entry only): gsap.defaults({ duration: 0.5 });\n  // gsap.config({ autoSleep: 120 });\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.quickTo()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Register a composable effect",
          explanation:
            "An effect bundles a convention into a named factory. It receives normalized targets, merged configuration, and optionally a timeline. Return the tween or timeline so callers retain playback control. extendTimeline adds the effect as a timeline method. Register effects once at the application boundary, and give them names that are unlikely to collide with dependencies.\n\nSynchronize multiple sequences by adding them to one parent timeline, seeking a common progress value, or coordinating explicit controller commands. Avoid two independent clocks owning the same transform. Effects are useful for a shared reveal language; application state and focus management should stay with the component.",
          files: [
            {
              name: "body.html",
              code: '<div class="box">Effect</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  gsap.registerEffect({\n    name: "studyReveal",\n    extendTimeline: true,\n    defaults: { duration: 0.5, distance: 20 },\n    effect: (targets, config) =>\n      gsap.from(targets, {\n        y: config.distance,\n        opacity: 0,\n        duration: config.duration,\n        ease: "power2.out"\n      })\n  });\n  const tl = gsap.timeline();\n  tl.studyReveal(".box", { distance: 12 }, 0);\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.registerEffect()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Replace per-event tween creation with quickTo; compare the result under frequent pointer input.",
      specialization: false,
    },
    {
      number: 14,
      name: "GSAP Utility Methods",
      stage: "Advanced",
      level: 3,
      topics: [
        "`toArray()`",
        "`selector()`",
        "`clamp()`",
        "`mapRange()`",
        "`normalize()`",
        "`interpolate()`",
        "`snap()`",
        "`random()`",
        "`wrap()`",
        "`wrapYoyo()`",
        "`distribute()`",
        "`pipe()`",
        "`unitize()`",
        "`getUnit()`",
      ],
      lessons: [
        {
          name: "Select, constrain, map, and interpolate",
          explanation:
            "toArray normalizes selectors or collections to an array. selector(root) creates a scoped query function for component-local targets. clamp bounds a number. normalize maps a source range to 0–1; mapRange maps between arbitrary ranges. interpolate blends numbers, colors, strings, or compatible objects.\n\nMany utilities can return reusable functions when you omit the final value. This makes an input-processing pipeline explicit. Always guard a zero-width input range in application calculations. The example maps a range input to a bounded translation and interpolated color without creating a new eased tween for every event.",
          files: [
            {
              name: "body.html",
              code: '<label\n  >Position <input id="position" type="range" min="0" max="100" value="0"\n/></label>\n<div class="box"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const select = gsap.utils.selector(document.body);\n  const boxes = gsap.utils.toArray(select(".box"));\n  const clamp = gsap.utils.clamp(0, 100);\n  const toX = gsap.utils.mapRange(0, 100, 0, 180);\n  const toProgress = gsap.utils.normalize(0, 100);\n  const color = gsap.utils.interpolate("#2563eb", "#7c3aed");\n  document.querySelector("#position").oninput = event => {\n    const value = clamp(Number(event.target.value));\n    gsap.set(boxes, {\n      x: toX(value),\n      backgroundColor: color(toProgress(value))\n    });\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.utils/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Compose discrete and repeating value patterns",
          explanation:
            "snap rounds to an increment or a supplied set of values; unlike a tween’s snap option, the utility can process ordinary numbers outside animation. random can produce a value or a reusable generator. wrap cycles through a range or array; wrapYoyo moves back and forth across a numeric range. distribute returns a function that calculates target-dependent offsets, useful beyond stagger.\n\npipe combines functions left to right. unitize parses numeric input, applies a function, and appends a unit; getUnit extracts a string’s suffix. Keep units consistent rather than treating any numeric string as pixels. These helpers make mapping pointer or scroll input easier to explain and test.",
          files: [
            {
              name: "utilities.js",
              code: '// In a browser after GSAP core, or import { gsap } from "gsap" in Vite.\nconst { snap, random, wrap, wrapYoyo, distribute, pipe, unitize, getUnit } =\n  gsap.utils;\nconst boundedStep = pipe(gsap.utils.clamp(0, 100), snap(10));\nconsole.log(boundedStep(76)); // 80\nconst next = random(10, 20, 1, true);\nconsole.log(next()); // Integer in the configured range.\nconst palette = wrap(["blue", "purple", "teal"]);\nconsole.log(palette(4), wrapYoyo(0, 10, 14)); // purple, 6\nconsole.log(unitize(value => value * 2, "px")("12px"), getUnit("12px")); // 24px, px\nconst offset = distribute({ base: 0, amount: 100, from: "center" });\nconst targets = [{}, {}, {}];\nconsole.log(targets.map((target, index) => offset(index, target, targets)));',
              language: "js",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.utils/",
          requires:
            "GSAP core available as gsap; independent browser script or Vite module",
          note: "",
        },
      ],
      checkpoint:
        "Compose clamp, snap, and mapRange, then test boundary values without a browser event.",
      specialization: false,
    },
    {
      number: 15,
      name: "Text Animation Plugins",
      stage: "Advanced",
      level: 3,
      topics: [
        "SplitText.",
        "Splitting text into characters.",
        "Splitting text into words.",
        "Splitting text into lines.",
        "Text reveal animations.",
        "Masked text transitions.",
        "Staggered typography animations.",
        "Responsive text splitting.",
        "SplitText `autoSplit` and `onSplit`.",
        "ScrambleText.",
        "TextPlugin.",
        "Typewriter-style effects.",
        "Text animation accessibility.",
        "Restoring original text with `revert()`.",
      ],
      lessons: [
        {
          name: "Split text responsively and restore it safely",
          explanation:
            "SplitText creates character, word, and line wrappers so text can animate as a group of targets. Split only what you need. Lines depend on fonts and container width; in 3.13+, autoSplit can re-split when relevant layout changes occur, while onSplit rebuilds the animation. Return that animation so SplitText can manage its cleanup and playhead continuity. mask: lines creates clipping wrappers for a reveal.\n\nThe default aria handling labels the original element and hides generated pieces from assistive technology. Nested links or other semantic content need additional accessibility review: a flattened label can conceal their structure. Use simple decorative headings first. revert restores the original markup; destroy the owning media/context scope on unmount.",
          files: [
            {
              name: "body.html",
              code: '<h2 class="headline">Build motion with a clear purpose.</h2>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .headline {\n    max-width: 420px;\n    font: 700 36px/1.2 system-ui;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js"></script>\n\n<script>\n  gsap.registerPlugin(SplitText);\n  const mm = gsap.matchMedia();\n  mm.add("(prefers-reduced-motion: no-preference)", () => {\n    const split = SplitText.create(".headline", {\n      type: "lines,words",\n      mask: "lines",\n      autoSplit: true,\n      onSplit(self) {\n        return gsap.from(self.words, {\n          yPercent: 110,\n          opacity: 0,\n          duration: 0.6,\n          stagger: 0.04,\n          ease: "power2.out"\n        });\n      }\n    });\n    return () => split.revert();\n  });\n  // On component removal: mm.revert().\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/SplitText/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "autoSplit/onSplit and mask use the rewritten SplitText API from GSAP 3.13+. Older SplitText tutorials differ.",
        },
        {
          name: "Text replacement and scrambled reveals",
          explanation:
            "TextPlugin replaces text over a tween and is useful for typewriter-like labels; it is not a rich-text editor. ScrambleTextPlugin adds temporary randomized characters while revealing the final message. SplitText animates wrappers rather than changing the underlying message, so choose the plugin according to the intended result.\n\nDo not repeatedly rewrite an aria-live region during an animation. Keep essential text available in a stable accessible label or announce only the final result. The example labels a decorative display separately from its animated text. For reduced motion, immediately use the final phrase. Typewriter effects should not delay access to important instructions.",
          files: [
            {
              name: "body.html",
              code: '<p aria-label="Ready to build"><span id="typed" aria-hidden="true"></span></p>\n<p aria-label="Motion with purpose">\n  <span id="scramble" aria-hidden="true">Motion with purpose</span>\n</p>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/TextPlugin.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrambleTextPlugin.min.js"></script>\n\n<script>\n  gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);\n  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {\n    document.querySelector("#typed").textContent = "Ready to build";\n  } else {\n    gsap.to("#typed", {\n      text: "Ready to build",\n      duration: 1.2,\n      ease: "none"\n    });\n    gsap.to("#scramble", {\n      duration: 1,\n      scrambleText: { text: "Motion with purpose", chars: "01", speed: 0.5 }\n    });\n  }\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/TextPlugin/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Resize a split heading after fonts load and restore its original markup on teardown.",
      specialization: false,
    },
    {
      number: 16,
      name: "SVG Animations",
      stage: "Advanced",
      level: 3,
      topics: [
        "SVG structure and coordinates.",
        "SVG `viewBox` and coordinate systems.",
        "Animating SVG attributes.",
        "Animating SVG transforms.",
        "SVG path fundamentals.",
        "SVG stroke properties.",
        "DrawSVGPlugin.",
        "MorphSVGPlugin.",
        "MotionPathPlugin.",
        "MotionPathHelper.",
        "SVG path morphing.",
        "Animating icons and illustrations.",
        "Animated logos.",
        "SVG masks and clipping paths.",
        "Animating objects along paths.",
        "Coordinating SVG and HTML animations.",
      ],
      lessons: [
        {
          name: "SVG coordinates, attributes, strokes, and clipping",
          explanation:
            "An SVG viewBox defines an internal coordinate system independent of its CSS pixel size. A path’s d attribute describes commands and points. Core can animate numeric attributes through attr and transforms through CSSPlugin. Stroke width, dasharray, and dashoffset affect outlines; masks use luminance or alpha to reveal content, while clip paths define geometric visible regions.\n\nDrawSVGPlugin manages stroke reveal ranges and length calculations; it does not turn a filled shape into a line drawing. Animate suitable strokes for logo outlines or icons, then coordinate fills and HTML captions on one timeline. Check transform origins in SVG coordinates, and keep accessible titles for meaningful illustrations.",
          files: [
            {
              name: "body.html",
              code: '<svg viewBox="0 0 300 120" width="300" role="img" aria-labelledby="svg-title">\n  <title id="svg-title">A curved route being drawn</title>\n  <path\n    id="route"\n    d="M20 90 Q150 -20 280 90"\n    fill="none"\n    stroke="#2563eb"\n    stroke-width="6"\n  />\n  <circle id="point" cx="20" cy="90" r="8" fill="#7c3aed" />\n</svg>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/DrawSVGPlugin.min.js"></script>\n\n<script>\n  gsap.registerPlugin(DrawSVGPlugin);\n  const tl = gsap.timeline();\n  tl.fromTo(\n    "#route",\n    { drawSVG: "0%" },\n    { drawSVG: "100%", duration: 1, ease: "none" }\n  ).to("#point", { attr: { r: 12 }, duration: 0.25 }, "<");\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Morph outlines and follow a motion path",
          explanation:
            "MorphSVGPlugin converts and interpolates path shapes, handling differing point counts. Use deliberate endpoint artwork and tune shapeIndex when the correspondence twists. Morphs change geometry; they are different from scaling a whole SVG. MotionPathPlugin moves a target along a path or point array. align and alignOrigin help reconcile the target’s coordinates with the path, and autoRotate follows its tangent.\n\nMotionPathHelper is a development authoring tool for editing paths; remove its UI from production. SVG masks, clip paths, icons, and HTML captions can share a timeline, but DOM nesting and coordinate systems still matter. Start with one inline SVG before mixing independently transformed HTML and SVG layers.",
          files: [
            {
              name: "body.html",
              code: '<svg\n  viewBox="0 0 300 160"\n  width="300"\n  aria-label="A moving marker and morphing icon"\n  role="img"\n>\n  <path\n    id="travel"\n    d="M20 100 C80 0 220 0 280 100"\n    fill="none"\n    stroke="#94a3b8"\n  />\n  <circle id="marker" r="7" fill="#2563eb" />\n  <path id="shape" d="M120 110 L150 80 L180 110 Z" fill="#7c3aed" />\n  <path\n    id="destination"\n    d="M120 90 L180 90 L180 130 L120 130 Z"\n    fill="none"\n    visibility="hidden"\n  />\n</svg>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/MotionPathPlugin.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/MorphSVGPlugin.min.js"></script>\n\n<script>\n  gsap.registerPlugin(MotionPathPlugin, MorphSVGPlugin);\n  const tl = gsap.timeline();\n  tl.to("#marker", {\n    duration: 1.5,\n    ease: "none",\n    motionPath: {\n      path: "#travel",\n      align: "#travel",\n      alignOrigin: [0.5, 0.5],\n      autoRotate: true\n    }\n  }).to("#shape", { morphSVG: "#destination", duration: 0.7 }, "<0.3");\n  // Authoring only, after loading/registering MotionPathHelper:\n  // const helper = MotionPathHelper.create("#travel");\n  // helper.kill();\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/MotionPathPlugin/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Draw one path, morph a different path, and explain why those are distinct operations.",
      specialization: false,
    },
    {
      number: 17,
      name: "FLIP Animations",
      stage: "Advanced",
      level: 3,
      topics: [
        "Understanding the FLIP animation technique.",
        "First, Last, Invert, Play.",
        "Capturing element states.",
        "`Flip.getState()`.",
        "`Flip.from()`.",
        "`Flip.to()`.",
        "Animating layout changes.",
        "Animating element reordering.",
        "Grid-to-list transitions.",
        "Expanding cards.",
        "Shared-element transitions.",
        "Animating DOM restructuring.",
        "Interrupting and restarting transitions.",
      ],
      lessons: [
        {
          name: "Animate a layout change with First, Last, Invert, Play",
          explanation:
            "FLIP means First, Last, Invert, Play: capture the first geometry, make the real layout change, invert the visual difference, then animate those offsets away. Flip.getState captures geometry; Flip.from animates from that capture to the current layout. This is useful for grid/list changes, reordered cards, expanding panels, and DOM reparenting.\n\nThe final DOM should already express the desired logical state. Animate only the visual transition. Flip.to has the opposite direction: animate the current layout toward a recorded state, useful when the captured geometry is the destination. Avoid absolute: true on every item by default; taking elements out of flow can change the layout you meant to preserve.",
          files: [
            {
              name: "body.html",
              code: '<button id="layout">Toggle layout</button>\n<div class="grid">\n  <div class="tile">One</div>\n  <div class="tile">Two</div>\n  <div class="tile">Three</div>\n</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .grid {\n    display: flex;\n    gap: 8px;\n  }\n  .grid.list {\n    flex-direction: column;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Flip.min.js"></script>\n\n<script>\n  gsap.registerPlugin(Flip);\n  const grid = document.querySelector(".grid");\n  const tiles = grid.querySelectorAll(".tile");\n  document.querySelector("#layout").onclick = () => {\n    const state = Flip.getState(tiles);\n    grid.classList.toggle("list");\n    Flip.from(state, {\n      duration: matchMedia("(prefers-reduced-motion: reduce)").matches\n        ? 0\n        : 0.5,\n      ease: "power2.inOut",\n      stagger: 0.04\n    });\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/Flip/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Shared elements and interrupted transitions",
          explanation:
            "A shared-element transition preserves the visual identity of an item between layouts. Reparent the same element, or give matching elements a stable data-flip-id when using different instances. Capture before DOM changes, then make the complete update before animating. Reordering the actual DOM also changes reading and keyboard order, which should match the final interface.\n\nFlip.getState normally completes relevant in-progress flips before recording the next state, helping repeated interaction produce a stable destination. Use Flip.isFlipping and Flip.killFlipsOf when coordinating a more explicit interruption policy. Framework commits are asynchronous: capture before a state change and animate only after the new layout has been committed. CSS transitions on the same transform can fight FLIP.",
          files: [
            {
              name: "body.html",
              code: '<button id="move">Move card</button>\n<div class="slots">\n  <div id="left"><div class="tile" data-flip-id="product">Product</div></div>\n  <div id="right"></div>\n</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .slots {\n    display: flex;\n    gap: 40px;\n  }\n  .slots > div {\n    width: 120px;\n    min-height: 130px;\n    border: 1px dashed #94a3b8;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Flip.min.js"></script>\n\n<script>\n  gsap.registerPlugin(Flip);\n  const tile = document.querySelector(".tile");\n  const left = document.querySelector("#left");\n  const right = document.querySelector("#right");\n  document.querySelector("#move").onclick = () => {\n    const state = Flip.getState(tile);\n    (tile.parentElement === left ? right : left).append(tile);\n    Flip.from(state, { duration: 0.5, ease: "power2.inOut" });\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/Flip/static.getState()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Toggle layout midway through a FLIP transition and check final DOM reading order.",
      specialization: false,
    },
    {
      number: 18,
      name: "Draggable and Gesture Animations",
      stage: "Advanced",
      level: 3,
      topics: [
        "DraggablePlugin.",
        "`Draggable.create()`.",
        "Dragging along the X/Y axes.",
        "Rotation-based dragging.",
        "Dragging boundaries.",
        "Grid snapping.",
        "Dragging with inertia.",
        "InertiaPlugin.",
        "Velocity-based effects.",
        "Gesture-driven carousels.",
        "Observer plugin.",
        "Mouse wheel interactions.",
        "Touch gestures.",
        "Swipe interactions.",
        "Pointer-based interactions.",
        "Handling desktop and mobile input consistently.",
      ],
      lessons: [
        {
          name: "Draggable, bounds, snapping, and inertia",
          explanation:
            "The plugin’s exported name is Draggable, not DraggablePlugin. Draggable.create returns an array of instances. type: x, y, x,y, or rotation selects the drag behavior. Bounds constrain travel; snapping aligns the resting value to a grid. Keep ordinary buttons available for people who cannot drag.\n\nInertiaPlugin supplies velocity-based continuation after release when inertia: true is enabled. It is an extra dependency, not an automatic capability of core or Draggable alone. A carousel also needs selected-item state, keyboard navigation, readable labels, and resize handling; a draggable strip is only its movement layer. Destroy the Draggable instance when removing the component.",
          files: [
            {
              name: "body.html",
              code: '<div class="bounds"><div class="box">Drag</div></div>\n<button id="reset">Reset position</button>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .bounds {\n    width: 300px;\n    height: 220px;\n    border: 1px solid #94a3b8;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Draggable.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/InertiaPlugin.min.js"></script>\n\n<script>\n  gsap.registerPlugin(Draggable, InertiaPlugin);\n  const [drag] = Draggable.create(".box", {\n    type: "x,y",\n    bounds: ".bounds",\n    inertia: true,\n    snap: {\n      x: value => Math.round(value / 20) * 20,\n      y: value => Math.round(value / 20) * 20\n    }\n  });\n  document.querySelector("#reset").onclick = () => {\n    drag.tween?.kill();\n    gsap.set(".box", { x: 0, y: 0 });\n    drag.update();\n  };\n  // Rotation alternative: Draggable.create(knob, { type: "rotation" }).\n  // Component teardown: drag.kill().\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/Draggable/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Normalize gestures without hijacking navigation",
          explanation:
            "Observer combines wheel, touch, and pointer input into movement callbacks. It can recognize direction, accumulate deltas, and expose velocities. It does not design your interaction or provide accessible carousel semantics. Pointer and swipe support should complement visible controls rather than replace them.\n\nScope observation to the component. preventDefault can block native scrolling and other browser behavior, so enable it only for a deliberately isolated gesture surface. The example listens to a horizontal swipe or wheel direction and also supplies Previous/Next buttons. It intentionally leaves default scrolling available. Kill the observer during teardown and avoid global wheel handlers for ordinary page navigation.",
          files: [
            {
              name: "body.html",
              code: '<div id="gesture" tabindex="0" aria-label="Gesture demo">\n  <p id="slide">Item 1</p>\n</div>\n<button id="prev">Previous</button><button id="next">Next</button>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  #gesture {\n    width: 280px;\n    padding: 30px;\n    border: 1px solid #94a3b8;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Observer.min.js"></script>\n\n<script>\n  gsap.registerPlugin(Observer);\n  let index = 0;\n  const label = document.querySelector("#slide");\n  function step(delta) {\n    index = gsap.utils.wrap(0, 3, index + delta);\n    label.textContent = `Item ${index + 1}`;\n  }\n  const observer = Observer.create({\n    target: "#gesture",\n    type: "wheel,touch,pointer",\n    tolerance: 30,\n    onLeft: () => step(1),\n    onRight: () => step(-1)\n  });\n  document.querySelector("#prev").onclick = () => step(-1);\n  document.querySelector("#next").onclick = () => step(1);\n  // Component teardown: observer.kill().\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/Observer/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Provide equivalent button navigation for a drag/swipe interaction and verify teardown removes gesture listeners.",
      specialization: false,
    },
    {
      number: 19,
      name: "ScrollSmoother and Advanced Scrolling",
      stage: "Advanced",
      level: 3,
      topics: [
        "ScrollSmoother setup.",
        "How ScrollSmoother works with ScrollTrigger.",
        "Configuring smooth scrolling.",
        "`data-speed` parallax effects.",
        "`data-lag` effects.",
        "Smooth-scroll navigation.",
        "ScrollSmoother methods.",
        "ScrollToPlugin.",
        "Programmatic scrolling.",
        "Native scrolling considerations.",
        "Integrating third-party smooth-scroll libraries when necessary.",
        "Scroll accessibility.",
        "Understanding when smooth scrolling should be avoided.",
      ],
      lessons: [
        {
          name: "ScrollSmoother is a page-level enhancement",
          explanation:
            "ScrollSmoother uses ScrollTrigger and transforms a content wrapper to soften its relationship to native scrolling. Create it before other page ScrollTriggers. A wrapper and content element define its ownership; fixed-position UI usually belongs outside that transformed content. effects enables data-speed parallax and data-lag follow effects. Use these sparingly.\n\nThe browser still has a native scroll position, but transformed content affects fixed positioning, focus scrolling, anchors, and measurements. Test all of them. Do not create several page smoothers or combine competing scroll engines. Prefer normal scrolling for reduced motion and often for touch. smoothTouch is opt-in; smooth scrolling is not a prerequisite for a polished site.",
          files: [
            {
              name: "body.html",
              code: '<header>Fixed UI belongs outside the content wrapper.</header>\n<div id="smooth-wrapper">\n  <div id="smooth-content">\n    <section>Intro</section>\n    <section><div data-speed="0.8" data-lag="0.1">Subtle depth</div></section>\n    <section id="end">End</section>\n  </div>\n</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  section {\n    min-height: 100vh;\n    padding: 40px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollSmoother.min.js"></script>\n\n<script>\n  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);\n  const mm = gsap.matchMedia();\n  mm.add(\n    "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",\n    () => {\n      const smoother = ScrollSmoother.create({\n        wrapper: "#smooth-wrapper",\n        content: "#smooth-content",\n        smooth: 0.8,\n        effects: true\n      });\n      // Methods include smoother.scrollTo("#end", true, "top top") and smoother.paused().\n      return () => smoother.kill();\n    }\n  );\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrollSmoother/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Programmatic scroll should preserve focus and user control",
          explanation:
            "ScrollToPlugin animates native window or container scroll positions. It is separate from ScrollTrigger, which observes scroll, and from ScrollSmoother, which manages a smoothed page. Avoid a simultaneous CSS scroll-behavior:smooth rule when GSAP owns scrolling. autoKill lets manual input interrupt the tween.\n\nScrolling a heading into view does not move keyboard focus to it. For deliberate navigation, preserve a real link, update the fragment, and focus the destination without causing another scroll jump. Reduced motion can use an immediate native jump. Third-party smooth scrolling is an integration choice requiring its own adapter and accessibility tests, not a default dependency.",
          files: [
            {
              name: "body.html",
              code: '<a id="jump" href="#destination">Go to destination</a>\n<div class="spacer"></div>\n<h2 id="destination" tabindex="-1">Destination</h2>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .spacer {\n    height: 120vh;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollToPlugin.min.js"></script>\n\n<script>\n  gsap.registerPlugin(ScrollToPlugin);\n  const link = document.querySelector("#jump");\n  const destination = document.querySelector("#destination");\n  link.onclick = event => {\n    event.preventDefault();\n    const finish = () => {\n      history.replaceState(null, "", "#destination");\n      destination.focus({ preventScroll: true });\n    };\n    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {\n      destination.scrollIntoView();\n      finish();\n      return;\n    }\n    gsap.to(window, {\n      duration: 0.7,\n      scrollTo: { y: destination, offsetY: 20, autoKill: true },\n      overwrite: "auto",\n      onComplete: finish\n    });\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrollToPlugin/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Test anchors and focus with and without smoothing; choose native scrolling when the enhancement adds no value.",
      specialization: false,
    },
    {
      number: 20,
      name: "Advanced Easing and Physics",
      stage: "Advanced",
      level: 3,
      topics: [
        "CustomEase.",
        "Creating custom easing curves.",
        "CustomBounce.",
        "CustomWiggle.",
        "RoughEase.",
        "SlowMo.",
        "ExpoScaleEase.",
        "Physics2DPlugin.",
        "PhysicsPropsPlugin.",
        "Velocity and momentum.",
        "Natural-looking elastic motion.",
        "Overshooting and settling.",
        "Simulating bouncing and gravity.",
      ],
      lessons: [
        {
          name: "Custom curves and specialized ease packs",
          explanation:
            "CustomEase creates a reusable easing curve from control points or SVG path data. CustomBounce and CustomWiggle generate bounce and oscillation curves and depend on CustomEase. RoughEase, SlowMo, and ExpoScaleEase come from EasePack: rough variation, slowed middle motion, and scale-aware progress serve different purposes. Load only the tools your scene uses.\n\nAn ease changes time mapping, not the endpoint contract. Natural-looking motion comes from appropriate distance, duration, overshoot, and settling together. A custom curve should solve a visual problem that built-in power or sine easing does not; otherwise it adds maintenance without a visible benefit.",
          files: [
            {
              name: "body.html",
              code: '<div class="box">Custom curve</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/CustomEase.min.js"></script>\n\n<script>\n  gsap.registerPlugin(CustomEase);\n  CustomEase.create("studyCurve", "0.22,1,0.36,1");\n  gsap.to(".box", { x: 160, duration: 0.9, ease: "studyCurve" });\n  // Separate authoring recipes after loading the named plugins:\n  // CustomBounce.create("studyBounce", { strength: 0.6 });\n  // CustomWiggle.create("studyWiggle", { wiggles: 5 });\n  // RoughEase: ease: "rough({ strength: 1, points: 20, template: none.inOut })"\n  // SlowMo: ease: "slow(0.7, 0.7, false)"\n  // ExpoScaleEase: ease: "expoScale(1, 2, power2.inOut)"\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/CustomEase/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Physics plugins describe trajectories, not a full simulation",
          explanation:
            "Physics2DPlugin derives x/y travel from velocity, angle, gravity, acceleration, and friction. PhysicsPropsPlugin applies velocity and acceleration to individual numeric properties. InertiaPlugin is useful when motion should continue from tracked velocity, such as dragging. These tools do not provide collision detection, constraints, or a rigid-body world.\n\nVelocity is change in position per unit time; momentum is the physical idea of continued motion, but a UI often only needs a convincing approximation. Use a bounce ease for a simple rebound and physics when the path should follow initial conditions. A ballistic arc may leave the viewport; choose a bounded decorative area and stop or revert on teardown.",
          files: [
            {
              name: "body.html",
              code: '<div class="stage"><div class="box" aria-hidden="true"></div></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  .stage {\n    height: 300px;\n    overflow: hidden;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Physics2DPlugin.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/PhysicsPropsPlugin.min.js"></script>\n\n<script>\n  gsap.registerPlugin(Physics2DPlugin, PhysicsPropsPlugin);\n  gsap.to(".box", {\n    duration: 1.2,\n    physics2D: { velocity: 160, angle: -60, gravity: 240 }\n  });\n  const state = { value: 0 };\n  gsap.to(state, {\n    duration: 1,\n    physicsProps: { value: { velocity: 20, acceleration: -5 } },\n    onComplete: () => console.log(state.value)\n  });\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/Physics2DPlugin/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Compare an easing curve with a physics trajectory; identify which one has an actual velocity/gravity model.",
      specialization: false,
    },
    {
      number: 21,
      name: "Animation Performance Optimization",
      stage: "Expert",
      level: 4,
      topics: [
        "Understanding the browser rendering pipeline.",
        "Layout, paint, and compositing.",
        "GPU-accelerated transformations.",
        "Why `transform` and `opacity` are generally preferable for frequent animations.",
        "Avoiding unnecessary layout recalculations.",
        "Avoiding forced synchronous layouts.",
        "Understanding layout thrashing.",
        "Minimizing DOM reads and writes during animation.",
        "Optimizing animations with many elements.",
        "`will-change` and its appropriate usage.",
        "`force3D` considerations.",
        "Understanding animation frame rates.",
        "`requestAnimationFrame`.",
        "`gsap.ticker`.",
        "Ticker lag smoothing.",
        "Optimizing scroll-based animations.",
        "Handling low-powered mobile devices.",
        "Preventing animation-related layout shifts.",
        "Profiling animations with Chrome DevTools.",
        "Measuring FPS and rendering performance.",
      ],
      lessons: [
        {
          name: "Measure rendering work before optimizing it",
          explanation:
            "The browser resolves styles, calculates layout, paints pixels, and composites layers. Transforms and opacity often avoid layout, making them good choices for frequent animation; they do not guarantee free GPU rendering. Large blurred layers, heavy rasterization, and too many composited elements can still be expensive. force3D and will-change are tools to measure, not blanket performance switches.\n\nLayout thrashing happens when code repeatedly writes styles and then forces geometry reads in the same frame. Batch reads before writes. For many elements, reduce animated targets, stagger work, and avoid offscreen effects. Reserve media dimensions to prevent layout shifts. Profile a realistic scene in Chrome DevTools Performance and Rendering panels, including low-powered mobile conditions; FPS alone does not explain the bottleneck.",
          files: [
            {
              name: "body.html",
              code: '<div class="tile">One</div>\n<div class="tile">Two</div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const items = gsap.utils.toArray(".tile");\n  // Read all geometry before creating animated writes.\n  const distances = items.map(item => item.getBoundingClientRect().width / 2);\n  gsap.to(items, {\n    x: index => distances[index],\n    opacity: 0.8,\n    duration: 0.5,\n    stagger: 0.05\n  });\n  // Avoid reading getBoundingClientRect() after every individual style write.\n  // Add/remove will-change only around measured hot paths; do not set it on everything.\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/mistakes/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "One rendering clock, with deliberate cleanup",
          explanation:
            "requestAnimationFrame schedules work before a browser repaint; GSAP’s ticker is tied to that rendering cycle and drives its engine. Add a ticker callback when your canvas or renderer needs to redraw from animated state. Do not run a second animation-frame loop that draws the same scene. deltaTime is milliseconds, while ticker time is seconds.\n\nLag smoothing adjusts the clock after long stalls to preserve coordinated animation; disabling it globally can change behavior throughout the app. Keep defaults unless an integration explicitly requires otherwise. Background tabs may throttle frames. Use elapsed time for custom movement, remove callbacks on teardown, and reduce expensive scroll work instead of merely lowering the reported frame rate.",
          files: [
            {
              name: "body.html",
              code: '<canvas\n  id="canvas"\n  width="300"\n  height="100"\n  aria-label="A decorative moving dot"\n></canvas\n><button id="stop">Stop and clean up</button>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const canvas = document.querySelector("#canvas");\n  const ctx = canvas.getContext("2d");\n  const state = { x: 20 };\n  const tween = gsap.to(state, { x: 280, duration: 2, ease: "none" });\n  function draw(time, deltaTime) {\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.beginPath();\n    ctx.arc(state.x, 50, 10, 0, Math.PI * 2);\n    ctx.fillStyle = "#2563eb";\n    ctx.fill();\n  }\n  gsap.ticker.add(draw);\n  document.querySelector("#stop").onclick = () => {\n    tween.kill();\n    gsap.ticker.remove(draw);\n  };\n  // Advanced integration only: gsap.ticker.lagSmoothing(threshold, adjustedLag).\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.ticker/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Capture a performance trace and name the dominant layout, paint, or scripting cost before changing code.",
      specialization: false,
    },
    {
      number: 22,
      name: "Animation Lifecycle and Cleanup",
      stage: "Expert",
      level: 4,
      topics: [
        "`gsap.context()`.",
        "Scoping selectors to components.",
        "`context.revert()`.",
        "Cleaning up timelines.",
        "Cleaning up ScrollTrigger instances.",
        "Removing event listeners.",
        "Avoiding duplicated animations.",
        "Handling dynamically inserted and removed DOM elements.",
        "Preventing memory leaks.",
        "Managing animation state.",
        "Handling interrupted or conflicting tweens.",
        "Creating and destroying animations safely.",
      ],
      lessons: [
        {
          name: "A context defines animation ownership",
          explanation:
            "gsap.context records animations and ScrollTriggers created while its callback executes. A scope element makes selector strings component-local. context.revert restores recorded state and disposes those owned animations. It does not automatically remove arbitrary DOM event listeners, timers, observers, or ticker callbacks. Return cleanup for those resources.\n\nEvents happen after initial setup, so animations created inside them must explicitly re-enter the context through context.add. This prevents delayed work from escaping ownership. Destroy before removing or replacing the DOM. A mount/destroy contract also makes repeated initialization, route changes, and memory-leak investigation much more predictable.",
          files: [
            {
              name: "body.html",
              code: '<div id="component">\n  <button>Animate child</button>\n  <div class="box"></div>\n</div>\n<button id="destroy">Destroy component animation</button>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  function mount(root) {\n    const button = root.querySelector("button");\n    const ctx = gsap.context(self => {\n      self.add("activate", () =>\n        gsap.to(".box", { x: 140, duration: 0.4, overwrite: "auto" })\n      );\n    }, root);\n    const activate = () => ctx.activate();\n    button.addEventListener("click", activate);\n    let destroyed = false;\n    return () => {\n      if (destroyed) return;\n      destroyed = true;\n      button.removeEventListener("click", activate);\n      ctx.revert();\n    };\n  }\n  const destroy = mount(document.querySelector("#component"));\n  document.querySelector("#destroy").onclick = destroy;\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.context()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "context and matchMedia require GSAP 3.11+. They handle recorded GSAP work, not arbitrary external resources.",
        },
        {
          name: "Guard asynchronous work and interrupted state",
          explanation:
            "A font promise, fetch, timer, or observer can finish after a component has unmounted. Cancel what can be canceled and guard the rest with an alive flag or an abort signal. Enter the owning context when asynchronous code creates an animation. Clear the external resource as well as reverting the GSAP work.\n\nAn interrupted transition should leave a well-defined application state. Decide whether interruption commits the destination, reverses toward the previous state, or starts from the currently rendered value. Avoid killing every global tween to fix one component. Use local references, one property owner, and repeatable setup/teardown instead.",
          files: [
            {
              name: "body.html",
              code: '<section id="async"><h2>Ready when the font loads</h2></section>\n<button id="destroy">Destroy</button>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const root = document.querySelector("#async");\n  let alive = true;\n  const ctx = gsap.context(self => {\n    self.add("enter", () => {\n      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {\n        gsap.from("h2", { y: 16, opacity: 0, duration: 0.4 });\n      }\n    });\n  }, root);\n  document.fonts.ready.then(() => {\n    if (alive && root.isConnected) ctx.enter();\n  });\n  document.querySelector("#destroy").onclick = () => {\n    alive = false;\n    ctx.revert();\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.context()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Mount, activate, destroy, and remount a component; verify event and trigger counts return to their baseline.",
      specialization: false,
    },
    {
      number: 23,
      name: "GSAP with TypeScript",
      stage: "Expert",
      level: 4,
      topics: [
        "Installing GSAP in TypeScript projects.",
        "Understanding GSAP's bundled type declarations.",
        "Typing tweens and timelines.",
        "`gsap.core.Tween`.",
        "`gsap.core.Timeline`.",
        "Typing DOM element references.",
        "Handling potentially `null` elements.",
        "Typing animation configuration objects.",
        "Typing callback functions.",
        "Typing reusable animation helpers.",
        "Creating typed animation factories.",
        "Creating GSAP-powered TypeScript classes.",
        "Building reusable GSAP components.",
        "Organizing animation modules in Vite projects.",
      ],
      lessons: [
        {
          name: "Use bundled types and guard DOM references",
          explanation:
            "GSAP includes its declarations; do not install an unrelated @types/gsap package to hide errors. Import core in your Vite TypeScript project and let inference work where possible. gsap.core.Tween and gsap.core.Timeline describe returned animation instances. gsap.TweenVars describes a configuration object. Types do not prove that a selector matches an element.\n\nNarrow DOM references before using them. Keep callbacks small and give reusable helpers explicit inputs and outputs. This example exports a typed factory, with a separate guarded call at the component boundary. Browser APIs require DOM declarations in tsconfig; the compiler does not make them available during server rendering.",
          files: [
            {
              name: "reveal.ts",
              code: 'import { gsap } from "gsap";\nexport function reveal(\n  element: HTMLElement,\n  duration = 0.5\n): gsap.core.Tween {\n  const vars = {\n    y: 20,\n    opacity: 0,\n    duration,\n    ease: "power2.out"\n  } satisfies gsap.TweenVars;\n  return gsap.from(element, vars);\n}\nconst element = document.querySelector(".card");\nif (element instanceof HTMLElement) {\n  const tween: gsap.core.Tween = reveal(element);\n  const timeline: gsap.core.Timeline = gsap.timeline({ paused: true });\n  timeline.add(tween);\n}',
              language: "ts",
            },
          ],
          source: "https://gsap.com/docs/v3/Installation/",
          requires:
            "Vite TypeScript; gsap@3.15.0; TypeScript 5.9.3 reference; strict + DOM lib",
          note: "",
        },
        {
          name: "Typed controllers and classes keep lifecycle explicit",
          explanation:
            "A component API can expose initialization, playback, refresh, and destruction while hiding selectors and timing. A factory is often enough; a class is useful when an instance has clear state and several public methods. Keep the returned controller smaller than the underlying GSAP timeline so application code does not casually rewrite its children.\n\nSeparate src/motion tokens and factories from src/components application logic. Inject DOM references and shared settings instead of querying global selectors inside every helper. The class below guards its destroyed state and restores styles on teardown. A real component also owns its listeners and accessibility state; the class is the animation layer.",
          files: [
            {
              name: "MotionCard.ts",
              code: 'import { gsap } from "gsap";\nexport class MotionCard {\n  private timeline: gsap.core.Timeline;\n  private destroyed = false;\n  constructor(element: HTMLElement) {\n    this.timeline = gsap\n      .timeline({ paused: true })\n      .to(element, { x: 100, duration: 0.4, ease: "power2.out" });\n  }\n  setActive(active: boolean): void {\n    if (this.destroyed) return;\n    if (active) this.timeline.play();\n    else this.timeline.reverse();\n  }\n  refresh(): void {\n    if (!this.destroyed) this.timeline.invalidate();\n  }\n  destroy(): void {\n    if (this.destroyed) return;\n    this.destroyed = true;\n    this.timeline.revert();\n  }\n}',
              language: "ts",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/",
          requires: "Vite TypeScript; gsap@3.15.0; strict + DOM lib",
          note: "",
        },
      ],
      checkpoint:
        "Build a typed controller without assertions for missing DOM nodes; make destroy idempotent.",
      specialization: false,
    },
    {
      number: 24,
      name: "GSAP with React and Next.js",
      stage: "Expert",
      level: 4,
      topics: [
        "Integrating GSAP into React.",
        "Using refs for animation targets.",
        "Understanding `useGSAP()`.",
        "Understanding the `@gsap/react` package.",
        "Scoped selectors.",
        "`contextSafe()`.",
        "React component lifecycle.",
        "Handling animation cleanup.",
        "Animating state transitions.",
        "Working with conditional rendering.",
        "GSAP and React Strict Mode.",
        "Timeline control through React state.",
        "Building reusable animation hooks.",
        "Implementing GSAP in Next.js Client Components.",
        "Avoiding SSR and hydration issues.",
        "Route and page transitions.",
        "Responsive animations in component-based applications.",
      ],
      lessons: [
        {
          name: "React refs, useGSAP, and scoped cleanup",
          explanation:
            "React owns rendered structure; GSAP owns selected animated properties after the component commits. useGSAP from @gsap/react wraps GSAP setup in a context and handles cleanup. Scope selectors to a ref so two instances cannot animate each other. Strict Mode’s development setup/cleanup cycle is a useful lifecycle test, not a reason to disable cleanup.\n\nInstall @gsap/react separately. This component creates one paused timeline, stores it in a ref, and commands the same playhead from React state. Rapid changes reverse from the current position. Reduced motion seeks directly to the requested endpoint. When dependencies rebuild an animation instead, use revertOnUpdate when the old setup must be restored before rebuilding. Conditional removal needs an exit-state strategy rather than animating an already unmounted node.",
          files: [
            {
              name: "MotionCard.tsx",
              code: 'import { useRef, useState } from "react";\nimport { gsap } from "gsap";\nimport { useGSAP } from "@gsap/react";\ngsap.registerPlugin(useGSAP);\nexport default function MotionCard() {\n  const root = useRef<HTMLDivElement>(null);\n  const timeline = useRef<gsap.core.Timeline | null>(null);\n  const [active, setActive] = useState(false);\n  useGSAP(\n    () => {\n      timeline.current = gsap\n        .timeline({ paused: true })\n        .to(".card", { x: 100, duration: 0.4, ease: "power2.out" });\n      return () => {\n        timeline.current = null;\n      };\n    },\n    { scope: root }\n  );\n  useGSAP(\n    () => {\n      const animation = timeline.current;\n      if (!animation) return;\n      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {\n        animation.pause().progress(active ? 1 : 0);\n      } else if (active) animation.play();\n      else animation.reverse();\n    },\n    { dependencies: [active] }\n  );\n  return (\n    <div ref={root}>\n      <button\n        onClick={() => setActive(value => !value)}\n        aria-pressed={active}\n      >\n        Move card\n      </button>\n      <div className="card">Card</div>\n    </div>\n  );\n}',
              language: "tsx",
            },
          ],
          source: "https://gsap.com/resources/React/",
          requires:
            "React 19 + matching @types; gsap@3.15.0; @gsap/react 2.x; Vite React TypeScript",
          note: "useGSAP is supplied by @gsap/react, not by the core gsap package.",
        },
        {
          name: "Event animations need contextSafe",
          explanation:
            "An event handler runs after useGSAP’s setup callback. Wrap handlers that create new animations in contextSafe so their work is recorded for cleanup and selector scoping. This does not automatically remove listeners you attached manually; React event props handle that part in this example.\n\nFor timeline control from React state, keep a ref to a timeline and command it from the state transition rather than recreating many concurrent copies. Reusable animation hooks should expose a small controller and dispose their context. For conditional content, retain the exiting view until its exit completes, with an immediate reduced-motion path and a cancellation policy for rapid state changes.",
          files: [
            {
              name: "InteractiveCard.tsx",
              code: 'import { useRef } from "react";\nimport { gsap } from "gsap";\nimport { useGSAP } from "@gsap/react";\ngsap.registerPlugin(useGSAP);\nexport function InteractiveCard() {\n  const root = useRef<HTMLDivElement>(null);\n  const { contextSafe } = useGSAP({ scope: root });\n  const animate = contextSafe(() => {\n    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;\n    gsap.to(".card", {\n      rotation: "+=15",\n      duration: reduce ? 0 : 0.25,\n      overwrite: "auto"\n    });\n  });\n  return (\n    <div ref={root}>\n      <button onClick={animate}>Rotate</button>\n      <div className="card">Card</div>\n    </div>\n  );\n}',
              language: "tsx",
            },
          ],
          source: "https://gsap.com/resources/React/",
          requires:
            "React 19 + types; gsap@3.15.0; @gsap/react 2.x; JSX enabled",
          note: "",
        },
        {
          name: "Next.js and routes introduce another lifecycle",
          explanation:
            "In the Next.js App Router, a component using hooks or browser animation setup must be a Client Component. Put use client at its module boundary. Server-rendered HTML and the initial client render should agree; read window, matchMedia, dimensions, and DOM references inside the client effect rather than while rendering. Keep baseline content visible so hydration or script failure does not hide essential information.\n\nRoute transitions need coordination with your router and persistent layout boundaries. GSAP does not automatically delay navigation or retain an old route for an exit. Plan cancellation, focus restoration, scroll reset, and refreshed ScrollTriggers after a new route commits. Start with page-enter motion; shared exits across routes are an advanced architectural feature.",
          files: [
            {
              name: "app/components/Intro.tsx",
              code: '"use client";\nimport { useRef } from "react";\nimport { gsap } from "gsap";\nimport { useGSAP } from "@gsap/react";\ngsap.registerPlugin(useGSAP);\nexport default function Intro() {\n  const root = useRef<HTMLElement>(null);\n  useGSAP(\n    () => {\n      const mm = gsap.matchMedia();\n      mm.add("(prefers-reduced-motion: no-preference)", () => {\n        gsap.from("h1", { y: 16, opacity: 0, duration: 0.4 });\n      });\n      return () => mm.revert();\n    },\n    { scope: root }\n  );\n  return (\n    <section ref={root}>\n      <h1>Useful motion, visible content</h1>\n    </section>\n  );\n}',
              language: "tsx",
            },
          ],
          source: "https://gsap.com/resources/React/",
          requires:
            "Next.js App Router Client Component; React + types; gsap + @gsap/react; example checks component types, not a whole Next build",
          note: "",
        },
      ],
      checkpoint:
        "Mount two React instances in Strict Mode, update state rapidly, and unmount both without leaving animation work.",
      specialization: false,
    },
    {
      number: 25,
      name: "Reusable Animation Architecture",
      stage: "Expert",
      level: 4,
      topics: [
        "Separating animation logic from application logic.",
        "Organizing animations across multiple modules.",
        "Creating animation helper functions.",
        "Creating reusable timeline factories.",
        "Creating animation presets.",
        "Defining shared timing and easing constants.",
        "Building a centralized animation configuration.",
        "Using `gsap.registerEffect()`.",
        "Designing class-based animation components.",
        "Managing multiple timelines.",
        "Designing animation state machines.",
        "Creating reusable animation controllers.",
        "Handling animation dependencies.",
        "Supporting initialization, refresh, and destruction.",
        "Integrating animations into existing UI component libraries.",
      ],
      lessons: [
        {
          name: "Tokens, factories, presets, and explicit dependencies",
          explanation:
            "Keep application state separate from animation construction. A central module can define timing and easing tokens; factories can create timelines using those presets. Prefer local defaults to broad gsap.defaults changes. Register shared effects at an explicit setup boundary, and import only the plugins a feature needs.\n\nAn animation controller should expose commands such as open, close, refresh, and destroy. It should not own unrelated networking or routing. Track multiple timelines by responsibility: a hover effect, panel transition, and page reveal should not silently compete for the same transform. Initialization should be safe to repeat only after the prior owner has been destroyed.",
          files: [
            {
              name: "motion.ts",
              code: 'import { gsap } from "gsap";\nexport const motion = {\n  short: 0.18,\n  standard: 0.4,\n  ease: "power2.out"\n} as const;\nexport function createPanelMotion(panel: HTMLElement) {\n  const timeline = gsap\n    .timeline({\n      paused: true,\n      defaults: { duration: motion.standard, ease: motion.ease }\n    })\n    .fromTo(\n      panel,\n      { opacity: 0, y: 12 },\n      { opacity: 1, y: 0, immediateRender: false }\n    );\n  let destroyed = false;\n  return {\n    open() {\n      if (!destroyed) timeline.play();\n    },\n    close() {\n      if (!destroyed) timeline.reverse();\n    },\n    refresh() {\n      if (!destroyed) timeline.invalidate();\n    },\n    destroy() {\n      if (!destroyed) {\n        destroyed = true;\n        timeline.revert();\n      }\n    }\n  };\n}',
              language: "ts",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/",
          requires:
            "TypeScript + GSAP; application owns hidden/inert/focus state separately",
          note: "",
        },
        {
          name: "Use a state machine when transitions can race",
          explanation:
            "A state machine names allowed states and transitions. A panel might be closed, opening, open, or closing. Rapid input can change direction while motion is in progress, so current animation progress and logical open/closed intent are distinct values. Keep one authoritative intent and let completion handlers report the settled state only if that intent still applies.\n\nA class or controller can encapsulate that contract for an existing UI component library. Reversing one timeline is often simpler than coordinating many from tweens. Dependency injection makes controllers testable: accept an animation adapter with play/reverse methods rather than mocking GSAP’s entire engine. refresh should explain whether it invalidates values, remeasures scroll positions, or rebuilds the component.",
          files: [
            {
              name: "panel-controller.ts",
              code: 'type State = "closed" | "opening" | "open" | "closing";\ntype Playback = { play(): unknown; reverse(): unknown };\nexport function createController(animation: Playback) {\n  let state: State = "closed";\n  let wantsOpen = false;\n  return {\n    get state(): State {\n      return state;\n    },\n    setOpen(open: boolean): void {\n      wantsOpen = open;\n      state = open ? "opening" : "closing";\n      if (open) animation.play();\n      else animation.reverse();\n    },\n    settled(open: boolean): void {\n      if (open === wantsOpen) state = open ? "open" : "closed";\n    }\n  };\n}\n// Wire timeline onComplete to settled(true), onReverseComplete to settled(false).',
              language: "ts",
            },
          ],
          source: "https://gsap.com/resources/conflict/",
          requires:
            "Independent TypeScript controller; connect to a timeline at the component boundary",
          note: "",
        },
      ],
      checkpoint:
        "Unit-test the controller’s interruption policy through a tiny playback adapter.",
      specialization: false,
    },
    {
      number: 26,
      name: "Accessibility and UX",
      stage: "Expert",
      level: 4,
      topics: [
        "Understanding `prefers-reduced-motion`.",
        "Reducing or disabling nonessential motion.",
        "Avoiding excessive parallax.",
        "Preventing motion-induced discomfort.",
        "Maintaining keyboard accessibility.",
        "Keeping focus behavior correct during animated transitions.",
        "Avoiding animation interference with screen readers.",
        "Providing usable interfaces while animations are disabled.",
        "Avoiding unnecessary delays in UI interactions.",
        "Understanding animation as functional feedback.",
        "Balancing visual polish with usability.",
      ],
      lessons: [
        {
          name: "Reduced motion is a usable alternative, not just a shorter duration",
          explanation:
            "prefers-reduced-motion expresses a preference to reduce potentially uncomfortable motion. Replace large movement, parallax, zoom, and oscillation with a direct state change or a restrained fade when appropriate. Do not leave elements at opacity zero or offscreen when animation is disabled. Every essential control must remain available.\n\nProvide immediate functional feedback before decorative motion completes. Focus should follow the interface action, not a visual effect’s arbitrary delay. Moving content must not disturb reading order or repeatedly announce changes. Keep keyboard operation, touch controls, and meaningful screen-reader text intact. A user-triggered pause or stop is valuable for persistent movement; avoid building a page that requires constant animation to understand.",
          files: [
            {
              name: "body.html",
              code: '<button id="feedback">Save example</button>\n<p id="message" role="status">Ready</p>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const message = document.querySelector("#message");\n  document.querySelector("#feedback").onclick = () => {\n    message.textContent = "Saved"; // Functional feedback happens immediately.\n    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;\n    if (reduce) {\n      gsap.set(message, { opacity: 1, y: 0 });\n      return;\n    }\n    gsap.fromTo(\n      message,\n      { opacity: 0.5, y: 6 },\n      {\n        opacity: 1,\n        y: 0,\n        duration: 0.2,\n        overwrite: "auto"\n      }\n    );\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/accessibility/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Animate a native dialog while retaining its behavior",
          explanation:
            "A native dialog provides a modal foundation, including focus containment and Escape behavior. Animate its presentation without replacing that behavior. Move focus into the dialog when it opens and restore focus to the opener when it closes. Essential closing must still work when motion is disabled or interrupted.\n\nThe example animates only entry and uses immediate native closing, deliberately avoiding an exit phase that might delay Escape. A production exit animation needs a retained closing state, disabled duplicate actions, and a guaranteed final close even after interruption. Test tab order, focus restoration, screen-reader labels, and no-animation operation before judging the visual polish.",
          files: [
            {
              name: "body.html",
              code: '<button id="open">Open details</button>\n<dialog aria-labelledby="title">\n  <h2 id="title">Details</h2>\n  <p>A working modal first, animation second.</p>\n  <form method="dialog"><button autofocus>Close</button></form>\n</dialog>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n  dialog {\n    max-width: 320px;\n    border: 0;\n    border-radius: 12px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const opener = document.querySelector("#open");\n  const dialog = document.querySelector("dialog");\n  opener.onclick = () => {\n    dialog.showModal();\n    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {\n      gsap.fromTo(\n        dialog,\n        { opacity: 0, y: 12 },\n        { opacity: 1, y: 0, duration: 0.2, overwrite: "auto" }\n      );\n    }\n  };\n  dialog.addEventListener("close", () => {\n    gsap.killTweensOf(dialog);\n    gsap.set(dialog, { clearProps: "opacity,transform" });\n    opener.focus();\n  });\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/accessibility/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Complete every essential action with motion disabled, using only the keyboard, and check focus restoration.",
      specialization: false,
    },
    {
      number: 27,
      name: "Debugging and Testing",
      stage: "Expert",
      level: 4,
      topics: [
        "Debugging GSAP animations.",
        "GSDevTools.",
        "ScrollTrigger markers.",
        "Debugging timeline positions.",
        "Inspecting tween properties.",
        "Debugging transform conflicts.",
        "Identifying unexpected starting values.",
        "Testing across responsive breakpoints.",
        "Testing animations under rapid user input.",
        "Testing cleanup and reinitialization.",
        "Unit testing animation controllers.",
        "Mocking GSAP in unit tests when appropriate.",
        "Integration testing animated UI components.",
        "End-to-end testing with Playwright.",
        "Handling reduced-motion settings in automated tests.",
        "Visual regression testing.",
        "Testing behavior without relying on arbitrary animation delays.",
      ],
      lessons: [
        {
          name: "Debug from the smallest observable scene",
          explanation:
            "Check gsap.version, script loading, registration, selector matches, and the console before rewriting the timing. Mark timeline labels, inspect duration and startTime, and use getProperty for actual animated values. Unexpected starting values often come from immediateRender, competing transforms, or a from tween created too early.\n\nScrollTrigger markers reveal trigger ranges; refresh after confirmed geometry changes. GSDevTools is an optional development control panel for scrubbing and inspecting a timeline. Remove its UI and markers from production. A minimal reproduction with one target and one tween is easier to reason about than a full page with several independent owners.",
          files: [
            {
              name: "body.html",
              code: '<div class="box"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/GSDevTools.min.js"></script>\n\n<script>\n  gsap.registerPlugin(GSDevTools);\n  const tl = gsap.timeline({ id: "debug-sequence" });\n  tl.addLabel("enter", 0).to(".box", { x: 160, duration: 1 }, "enter");\n  console.log(\n    "GSAP",\n    gsap.version,\n    "labels",\n    tl.labels,\n    "duration",\n    tl.duration()\n  );\n  console.log("x", gsap.getProperty(".box", "x"));\n  const tools = GSDevTools.create({ animation: tl });\n  // Development teardown: tools.kill(); tl.revert().\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/GSDevTools/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Test positions deterministically, then test the interface",
          explanation:
            "For a tween’s numeric contract, pause it and seek to a known progress instead of sleeping for an estimated duration. A linear tween from 0 to 120 should be 60 at progress 0.5. Unit-test application controllers through a small playback adapter; mock only that boundary when the engine is not the subject of the test.\n\nIntegration and end-to-end tests should cover rapid input, reduced motion, live breakpoint changes, repeated mount/destroy, and actual focus/hidden state. Visual regression snapshots should seek a stable position and wait for fonts/assets. A mock cannot prove rendering, ScrollTrigger geometry, or real cleanup; exercise those in a browser too.",
          files: [
            {
              name: "body.html",
              code: '<div class="box"></div>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const element = document.querySelector(".box");\n  const tween = gsap.fromTo(\n    element,\n    { x: 0 },\n    { x: 120, duration: 1, ease: "none", paused: true }\n  );\n  tween.progress(0.5, true);\n  console.assert(\n    Math.abs(Number(gsap.getProperty(element, "x")) - 60) < 0.01,\n    "Midpoint is 60px"\n  );\n  tween.progress(1, true);\n  console.assert(\n    Math.abs(Number(gsap.getProperty(element, "x")) - 120) < 0.01,\n    "Endpoint is 120px"\n  );\n  tween.revert();\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/progress()/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
        {
          name: "Browser tests assert behavior rather than arbitrary delays",
          explanation:
            "Playwright can emulate reduced motion before navigation, exercise controls, and poll for state. The fixture-specific example below targets the accordion in Chapter 9 served as /accordion.html. Its reduced-motion path should complete immediately while preserving the same accessible state. Use locators and assertions rather than fixed waitForTimeout delays.\n\nAdd separate tests with normal motion and rapid toggles, two instances mounted together, and a destroy/remount cycle. Record ScrollTrigger counts before and after a feature to detect leaks, without killing unrelated instances. Cross-browser and real-device testing still matter for SVG geometry, touch behavior, fonts, and rendering costs.",
          files: [
            {
              name: "accordion.spec.ts",
              code: 'import { test, expect } from "@playwright/test";\ntest("accordion remains usable with reduced motion", async ({ page }) => {\n  await page.emulateMedia({ reducedMotion: "reduce" });\n  await page.goto("http://localhost:4173/accordion.html");\n  const button = page.getByRole("button", { name: "Details", exact: true });\n  await button.click();\n  await expect(button).toHaveAttribute("aria-expanded", "true");\n  await expect(page.locator("#panel")).toBeVisible();\n  await button.click();\n  await expect(button).toHaveAttribute("aria-expanded", "false");\n  await expect(page.locator("#panel")).toBeHidden();\n});',
              language: "ts",
            },
          ],
          source: "https://playwright.dev/docs/emulation",
          requires:
            "Playwright Test; serve the Chapter 9 accordion fixture at localhost:4173/accordion.html",
          note: "",
        },
      ],
      checkpoint:
        "Seek a paused tween for numeric checks; test reduced-motion behavior without arbitrary delays.",
      specialization: false,
    },
    {
      number: 28,
      name: "Advanced Browser and Rendering Integrations",
      stage: "Expert",
      level: 4,
      topics: [
        "GSAP with Canvas 2D.",
        "GSAP with WebGL.",
        "GSAP with Three.js.",
        "Animating 3D object properties.",
        "Camera animations.",
        "GSAP with shaders and uniforms.",
        "PixiPlugin.",
        "Coordinating 2D DOM and 3D animations.",
        "Synchronizing video and animations.",
        "Building immersive, interactive experiences.",
      ],
      lessons: [
        {
          name: "Optional specialization: Canvas, WebGL, and Three.js",
          explanation:
            "GSAP animates numeric state; a renderer turns that state into pixels. Canvas 2D can read a plain animated object, as in Chapter 21. WebGL and Three.js can animate object.position, rotation, camera positions, or shader uniform.value fields. Avoid replacing a uniform wrapper when the renderer expects a stable object.\n\nKeep one rendering loop. If Three.js already owns a requestAnimationFrame or setAnimationLoop loop, let it render the updated GSAP state. A camera’s lookAt orientation may need updating while its position moves. DOM and 3D sequences can share a parent timeline, but graphics resources need separate disposal. This adapter is intentionally a contract sketch, not a complete Three.js scene or shader program.",
          files: [
            {
              name: "scene-motion.ts",
              code: 'import { gsap } from "gsap";\ntype Vector3Like = { x: number; y: number; z: number };\ntype SceneInputs = {\n  position: Vector3Like;\n  cameraPosition: Vector3Like;\n  revealUniform: { value: number };\n};\nexport function createSceneMotion(scene: SceneInputs): gsap.core.Timeline {\n  return gsap\n    .timeline({ paused: true })\n    .to(scene.position, { x: 2, duration: 1 })\n    .to(scene.cameraPosition, { z: 4, duration: 1 }, "<")\n    .to(scene.revealUniform, { value: 1, duration: 0.7 }, "<0.2");\n}\n// Supply mesh.position, camera.position, and material.uniforms.reveal.\n// Your existing renderer loop still calls renderer.render(scene, camera).',
              language: "ts",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.to()/",
          requires:
            "TypeScript + GSAP; renderer adapter sketch; supply the actual Three.js/WebGL scene and dispose its resources",
          note: "",
        },
        {
          name: "Pixi and video need their own integration contracts",
          explanation:
            "PixiPlugin maps GSAP properties to PixiJS display objects, including convenience handling for scale, rotation, tint, and filters. Register the Pixi namespace with PixiPlugin.registerPIXI and verify the Pixi major version and filter APIs supported by your integration. The plugin does not create a renderer or load textures.\n\nVideo can act as a clock through currentTime/duration, or GSAP can seek its time for a scrubbed scene. Seeking is asynchronous and codec-dependent; wait for metadata, throttle requests, and test real media. Do not play sound without user intent. Immersive experiences still need useful HTML content, accessible controls, cleanup, and a lower-cost fallback.",
          files: [
            {
              name: "pixi-adapter.js",
              code: 'import { gsap } from "gsap";\nimport { PixiPlugin } from "gsap/PixiPlugin";\ngsap.registerPlugin(PixiPlugin);\nexport function animateSprite(PIXI, sprite) {\n  PixiPlugin.registerPIXI(PIXI);\n  return gsap.to(sprite, {\n    pixi: { x: 100, scale: 1.1, rotation: 20 },\n    duration: 0.7\n  });\n}\n// Call with your initialized, compatible Pixi namespace and sprite.\n// Keep the Pixi application\'s existing rendering loop.',
              language: "js",
            },
            {
              name: "video-clock.js",
              code: '// Integration function: call only after video metadata is available.\nexport function syncFromVideo(video, timeline) {\n  const update = () => {\n    if (Number.isFinite(video.duration) && video.duration > 0) {\n      timeline.pause().progress(video.currentTime / video.duration, true);\n    }\n  };\n  video.addEventListener("timeupdate", update);\n  update();\n  return () => video.removeEventListener("timeupdate", update);\n}\n// timeupdate is coarse; a production frame-accurate integration may use\n// requestVideoFrameCallback where supported, with explicit cancellation.',
              language: "js",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/PixiPlugin/",
          requires:
            "Vite modules; gsap + compatible Pixi instance, or a loaded HTMLVideoElement and an existing timeline; adapters are not complete renderer apps",
          note: "",
        },
      ],
      checkpoint:
        "Describe which system owns rendering, assets, animation state, and disposal in your optional graphics integration.",
      specialization: true,
    },
    {
      number: 29,
      name: "Motion Design Principles",
      stage: "Expert",
      level: 4,
      topics: [
        "Timing and spacing.",
        "Anticipation.",
        "Follow-through and overlap.",
        "Squash and stretch.",
        "Acceleration and deceleration.",
        "Motion hierarchy.",
        "Visual rhythm.",
        "Staging and choreography.",
        "Continuity between interface states.",
        "Meaningful transitions.",
        "Attention guidance.",
        "Microinteractions.",
        "Motion consistency.",
        "Storytelling through animation.",
        "Balancing subtle and expressive motion.",
      ],
      lessons: [
        {
          name: "Design motion before choosing an effect",
          explanation:
            "Timing is duration; spacing is the distance covered between frames. Acceleration and deceleration shape that spacing. Anticipation prepares an action, follow-through lets secondary parts settle, and overlap gives related parts slightly different timing. Squash and stretch suggest weight, but should not distort important text or controls.\n\nMotion hierarchy directs attention to the primary action first. Rhythm, staging, and choreography organize the sequence; continuity helps a user recognize the same item across states. Use meaningful transitions and short microinteractions to explain cause and effect. Consistent timing tokens make a product feel coherent. Storytelling can justify expressive motion in a product scene, while routine forms usually benefit from subtle feedback. Evaluate the no-motion version as carefully as the animated one.",
          files: [
            {
              name: "body.html",
              code: '<section class="hero-demo">\n  <h2>A clear message</h2>\n  <p>Supporting detail comes next.</p>\n  <button>Primary action</button>\n</section>\n\n<style>\n  .box,\n  .tile {\n    width: 72px;\n    min-height: 72px;\n    padding: 12px;\n    background: #2563eb;\n    color: white;\n    border-radius: 10px;\n    margin: 12px;\n  }\n  button {\n    margin: 6px;\n    padding: 8px 14px;\n  }\n</style>\n\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n\n<script>\n  const mm = gsap.matchMedia();\n  mm.add("(prefers-reduced-motion: no-preference)", () => {\n    gsap\n      .timeline({ defaults: { ease: "power2.out", duration: 0.45 } })\n      .from(".hero-demo h2", { y: 20, opacity: 0 })\n      .from(".hero-demo p", { y: 12, opacity: 0 }, "<0.12")\n      .from(".hero-demo button", { y: 8, opacity: 0 }, "<0.1");\n  });\n  // Review: what should the viewer notice first? Can the action be used immediately?\n</script>',
              language: "html",
            },
          ],
          source: "https://gsap.com/resources/get-started/",
          requires: "Browser; GSAP 3.15.0; run this example independently",
          note: "",
        },
      ],
      checkpoint:
        "Reduce a sequence to its primary message, then explain how each remaining movement supports it.",
      specialization: false,
    },
  ],
  priorities: [
    ["1", "GSAP Core and Tweens", "Essential"],
    ["2", "Timelines", "Essential"],
    ["3", "Easing and Staggers", "Essential"],
    ["4", "ScrollTrigger", "Essential"],
    ["5", "Responsive Animations", "Essential"],
    ["6", "Text and SVG Animations", "Very high"],
    ["7", "FLIP Animations", "Very high"],
    ["8", "Performance and Accessibility", "Very high"],
    ["9", "Lifecycle and Cleanup", "Very high"],
    ["10", "GSAP with TypeScript", "High"],
    ["11", "GSAP with React", "High"],
    ["12", "Draggable and Observer", "Medium"],
    ["13", "Canvas, WebGL, Three.js", "Optional specialization"],
  ],
  schedule: [
    [
      "Weeks 1–3",
      "Core foundations",
      "Tweens, CSS properties, easing, staggers, and callbacks",
    ],
    [
      "Weeks 4–6",
      "Animation coordination",
      "Timelines, playback controls, reusable functions, and UI interactions",
    ],
    [
      "Weeks 7–10",
      "Scroll animation",
      "ScrollTrigger, pinning, scrubbing, responsive behavior, and parallax",
    ],
    [
      "Weeks 11–15",
      "Creative techniques",
      "Text, SVG, FLIP, Draggable, and advanced plugins",
    ],
    [
      "Weeks 16–20",
      "Production engineering",
      "Performance, cleanup, accessibility, TypeScript, and React",
    ],
    [
      "Beyond week 20",
      "Specialization and mastery",
      "Complex portfolio projects, motion design, and advanced architecture",
    ],
  ],
  recommendations: [
    "Master GSAP Core and Timelines using vanilla JavaScript.",
    "Learn ScrollTrigger deeply and build two complete animated landing pages.",
    "Add text, SVG, and FLIP animations to your projects.",
    "Refactor your animations into reusable TypeScript modules.",
    "Integrate GSAP into React once you're comfortable with React's component lifecycle.",
    "Focus on production performance, accessibility, and animation architecture.",
  ],
  areas: [
    "**GSAP Core** — Tweens, timelines, easing, staggers, and animation control.",
    "**Scroll Animations** — ScrollTrigger, ScrollSmoother, and complex scrolling experiences.",
    "**Advanced Animation** — SVG, text, FLIP, interactive effects, and plugins.",
    "**Animation Engineering** — Performance, accessibility, responsive behavior, and architecture.",
    "**Framework Integration** — Vanilla JavaScript, TypeScript, React, and Next.js.",
    "**Motion Design** — Timing, choreography, storytelling, and creating polished experiences.",
  ],
};
(() => {
  const content = document.querySelector("#content");
  const nav = document.querySelector("#nav");
  const search = document.querySelector("#search");
  const track = document.querySelector("#track");
  const count = document.querySelector("#count");
  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function paragraphs(parent, text) {
    for (const paragraph of text.split(/\n\n/))
      parent.append(node("p", paragraph));
  }
  function example(parent, file) {
    const head = node("div", undefined, "example-head");
    head.append(node("span", file.name));
    const button = node("button", "Copy");
    button.type = "button";
    button.setAttribute("aria-label", "Copy " + file.name);
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(file.code);
        button.textContent = "Copied!";
      } catch {
        button.textContent = "Select code to copy";
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1800);
    });
    head.append(button);
    const pre = node("pre");
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", file.name + " example");
    const code = node("code", file.code);
    code.className = "language-" + file.language;
    pre.append(code);
    parent.append(head, pre);
    window.HandbookHighlight?.highlight(code);
  }
  const totalLessons = handbook.chapters.reduce(
    (sum, chapter) => sum + chapter.lessons.length,
    0,
  );
  function plain(text) {
    return text.replace(/`/g, "");
  }
  function projectPanel(stage) {
    const details = node("details", undefined, "project");
    details.id = "projects-" + stage.number;
    details.append(
      node(
        "summary",
        stage.stage + " practice — " + stage.projects.length + " projects",
      ),
    );
    details.append(node("p", stage.goal));
    for (const project of stage.projects) {
      details.append(
        node("h3", project.name),
        node("p", project.brief),
        node("p", "Acceptance: " + project.acceptance, "acceptance"),
      );
    }
    details.append(node("h3", "Stage milestone"), node("p", stage.milestone));
    return details;
  }
  function render() {
    const query = search.value.trim().toLowerCase();
    const fragment = document.createDocumentFragment();
    const menu = document.createDocumentFragment();
    let shown = 0;
    let menuStage;
    for (const chapter of handbook.chapters) {
      if (track.value !== "all" && chapter.stage !== track.value) continue;
      const stage = handbook.stages[chapter.level - 1];
      const lastInStage = chapter.number === stage.chapters.at(-1);
      const chapterMatch =
        query &&
        [chapter.name, ...chapter.topics]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const lessons = chapter.lessons.filter(
        (lesson) =>
          !query ||
          chapterMatch ||
          [
            lesson.name,
            lesson.explanation,
            lesson.requires,
            ...lesson.files.map((file) => file.code),
          ]
            .join(" ")
            .toLowerCase()
            .includes(query),
      );
      const projectMatch =
        lastInStage &&
        (!query ||
          JSON.stringify(stage.projects).toLowerCase().includes(query));
      if (!lessons.length && !projectMatch) continue;
      const section = node("section");
      section.id = "chapter-" + chapter.number;
      if (menuStage !== chapter.stage) {
        menuStage = chapter.stage;
        menu.append(
          node(
            "div",
            "Level " + chapter.level + " · " + chapter.stage,
            "nav-stage",
          ),
        );
      }
      const link = node("a", chapter.number + ". " + chapter.name);
      link.href = "#" + section.id;
      menu.append(link);
      section.append(
        node(
          "span",
          chapter.stage +
            (chapter.specialization ? " · Optional specialization" : ""),
          "stage",
        ),
      );
      section.append(node("h2", chapter.number + ". " + chapter.name));
      if (lessons.length) {
        const topics = node("details", undefined, "roadmap-topics");
        topics.append(
          node(
            "summary",
            "Roadmap coverage — " + chapter.topics.length + " topics",
          ),
        );
        const list = node("ul");
        for (const topic of chapter.topics)
          list.append(node("li", plain(topic)));
        topics.append(list);
        section.append(topics);
      }
      for (const lesson of lessons) {
        const article = node("article", undefined, "entry");
        article.append(node("h3", lesson.name));
        paragraphs(article, lesson.explanation);
        article.append(node("p", "Setup: " + lesson.requires, "requirements"));
        if (lesson.note) article.append(node("p", lesson.note, "tip"));
        for (const file of lesson.files) example(article, file);
        const source = node("a", "Documentation ↗", "source");
        source.href = lesson.source;
        source.target = "_blank";
        source.rel = "noopener noreferrer";
        article.append(source);
        section.append(article);
      }
      shown += lessons.length;
      if (lessons.length) {
        const checkpoint = node("div", undefined, "checkpoint");
        checkpoint.append(
          node("strong", "Try it before moving on"),
          node("p", chapter.checkpoint),
        );
        section.append(checkpoint);
      }
      if (projectMatch) section.append(projectPanel(stage));
      fragment.append(section);
    }
    if (!fragment.childNodes.length)
      fragment.append(
        node(
          "p",
          "No matches. Try a different term or reset the filters.",
          "empty",
        ),
      );
    content.replaceChildren(fragment);
    nav.replaceChildren(menu);
    count.textContent = shown + " of " + totalLessons + " lessons";
  }
  search.addEventListener("input", render);
  track.addEventListener("change", render);
  document.querySelector("#reset").addEventListener("click", () => {
    search.value = "";
    track.value = "all";
    render();
    search.focus();
  });
  render();
  const target = document.getElementById(location.hash.slice(1));
  if (target) {
    if (target instanceof HTMLDetailsElement) target.open = true;
    requestAnimationFrame(() => target.scrollIntoView());
  }
})();
