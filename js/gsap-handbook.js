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
            "GSAP animates properties by changing their values over time. A tween calculates the values between a start and an end. A timeline arranges tweens around one playhead: the current time within the animation. GSAP core handles CSS animation and numeric JavaScript object properties. Plugins add specialized features.\n\nChoose a CSS transition for a simple hover state or CSS keyframes for a self-contained repeating effect. The Web Animations API (WAAPI) provides native JavaScript playback control. GSAP is useful when you need coordinated sequences, reversal, interruption, dynamic values, or scroll integration. You still need semantic HTML and sound layout. This complete example animates a decorative box when its button is activated and respects reduced motion.",
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
            "In a Vite project, install GSAP from public npm and import its ES modules. Vite serves and bundles those modules without changing how GSAP animates. For plain HTML, the previous example loads a fixed version from a CDN. Use one installation approach per example, with matching core and plugin versions.\n\nRegister imported plugins explicitly so GSAP recognizes them and bundlers retain them. The normal gsap import already includes CSSPlugin. Since GSAP 3.13, public npm has included the formerly paid plugins, so older private-registry instructions are outdated. GSAP uses its standard license, not MIT. During the original verification, the live license page redirected to a forums outage page. Consult the current license terms before making licensing decisions.",
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
            "The four core methods set an animation's start and end values. to starts at the current value and moves to the supplied destination. from starts at the supplied value and ends at the original value. fromTo specifies both ends. set applies values immediately.\n\nTargets can be selectors, DOM elements, arrays of targets, or plain objects. A selector can match several elements but cannot create missing ones. Query after the DOM exists. This example animates three independent boxes along different paths. Use a DOM reference when a component must target exactly one element; scoped selectors are covered later. Avoid letting CSS transitions and GSAP animate the same transform simultaneously.",
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
            "Timing options control when a tween plays and repeats. duration, delay, and repeatDelay are measured in seconds. ease controls how progress changes over that time. repeat counts extra plays: 1 plays twice, while -1 repeats indefinitely. yoyo alternates direction. paused creates the animation without starting it. A relative value such as +=100 is calculated from the property's starting value.\n\nA function-based value receives the target's index, the target, and the targets array. It runs when the tween initializes, not on every frame. Here a click starts the paused group. Targets travel different distances, repeat once, and return with yoyo. Further clicks restart the same tween instead of creating competing copies.",
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
            "GSAP can animate numeric properties on ordinary JavaScript objects without using the DOM. onUpdate lets another renderer read the changing value. This counter writes text, but the same approach can drive canvas or WebGL. Keep application rendering on each frame inexpensive.\n\nfrom and fromTo normally apply their starting values immediately, even when scheduled for later. This can cause a flash or overwrite another animation's starting state. For a delayed fromTo, immediateRender: false postpones that first write. It does not keep future values reactive. When measurements change, use invalidate or create a new tween.",
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
            "Transform properties move or reshape an element visually. Numeric x and y values normally translate it in pixels. xPercent and yPercent use the element's own dimensions; -50 centers it around its positioning point. rotation turns around the Z axis, while rotationX and rotationY tilt in 3D. scale, scaleX, and scaleY change visual size without changing layout dimensions. skewX and skewY slant the element.\n\ntransformOrigin sets the pivot. GSAP combines these components into a transform, so avoid replacing transform through another animation system at the same time. A parent's perspective affects its children's 3D scene. transformPerspective puts perspective on the transformed element itself. Keep 3D motion restrained and check that text remains legible.",
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
            "opacity changes transparency without preventing focus or pointer input. autoAlpha combines opacity and visibility. Neither provides all the behavior needed for a dialog or disclosure. Application state must also manage hidden, inert, focus, and aria-expanded deliberately.\n\nGSAP can animate between colors, dimensions, and CSS custom property values. Width and height may trigger layout calculations on every frame. Prefer transforms for purely visual changes, and animate dimensions when surrounding layout really needs to move. Here a custom property controls a decorative glow, while backgroundColor and opacity provide feedback.",
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
            "Easing determines how animation progress changes as time passes. none is linear, making it useful for continuous rotation or scroll-scrubbed travel. power1 through power4 create increasingly strong acceleration or deceleration. .in accelerates, .out decelerates, and .inOut combines both. A short power2.out is a useful starting point for direct interface feedback.\n\nback overshoots, bounce suggests rebounds, and elastic oscillates. circ, expo, and sine provide other smooth curves. steps(6) advances in discrete jumps. These curves imitate motion rather than simulate collisions. Compare them in the official Ease Visualizer and choose one that supports the interface. Strong overshoot rarely suits long text or large movements across the viewport.",
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
            "A stagger starts targets at different times within one tween. A numeric stagger sets the gap between starts. each specifies that gap explicitly, while amount spreads the starts across a total span. from selects the starting point: start, center, end, edges, random, or a numeric index. A stagger ease controls the distribution of these offsets separately from the tween's own ease.\n\nFor grids, supply rows and columns, or use grid: auto when GSAP can infer them from layout. A function-based stagger returns each target's start offset. This example creates a wave from the center. Small distances and a short amount keep the last item from feeling delayed.",
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
            "Callbacks run application code at points in an animation. onStart runs at the start, onUpdate during updates, onRepeat at repeat boundaries, onComplete at the forward end, and onReverseComplete at the reverse end. Supply arguments through the corresponding Params option. Chapter 7 shows how a timeline call schedules another function.\n\nKeep frequent callbacks small. Avoid screen-reader announcements on every update, and do not make animation completion the only way an essential action succeeds. Here a button reverses one tween, and a polite status reports only completed transitions. If motion is disabled, the application must still apply the same logical state.",
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
            "A timeline coordinates animations under one playhead. Chained to, from, and fromTo calls normally append at its end. A position changes where a child starts. Numbers specify absolute seconds; +=0.2 and -=0.2 refer to the timeline's end. < anchors to the most recently added animation's start, and > to its end. <0.2 and >-0.3 add offsets to those anchors.\n\nLabels name meaningful positions so edits do not require recalculating every time. addLabel defines a label, add inserts an animation or nested timeline, and call schedules a function. Timeline defaults provide shared child settings, which explicit child values override. Notice how the positions make starts overlap in this example.",
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
            "A timeline factory returns a sequence that callers can control. This makes sequencing, reversal, and testing easier than starting unrelated tweens in several modules. Scope its targets to the component that owns them. Only pause child timelines when they need independent control: a paused child remains paused inside a parent.\n\nNested timelines keep their own internal timing while the parent controls the overall sequence. This factory creates a two-part entrance. The two components can overlap or play one after the other. Keep application state changes outside decorative factories unless the dependency is explicit.",
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
            "Playback methods control one animation's playhead. play moves forward, pause stops it, resume continues in its current direction, reverse moves backward, and restart returns to the beginning and plays. seek moves to a time or label. progress describes the current iteration from 0 to 1; totalProgress also accounts for repeats and repeat delays.\n\ntimeScale changes playback speed without rewriting durations. reversed reads or sets direction. isActive reports whether the animation is playing on an active parent. For a repeating tween, progress(1) does not mean its final repeated end. This slider seeks a non-repeating timeline with callbacks suppressed. Its output demonstrates playback control rather than managing application state.",
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
            "Choose cleanup and recalculation methods according to the result you need. kill stops and removes an animation but leaves its current rendered values. revert restores pre-animation inline styles and normally kills the animation. invalidate discards saved initialization values so a later render can recalculate them. It does not clean up the DOM.\n\nWhen input interrupts a transition, reuse or reverse a persistent timeline, or use a new to tween to overwrite conflicting properties. Creating a new from tween on every event can cause jumps as it applies its starting values. Here the example changes travel distance, invalidates the paused tween, and restarts it. A separate button restores the original styles.",
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
            "Make an effect available through keyboard focus as well as pointer hover. One persistent paused timeline can play toward its open state or reverse from its current position. This avoids stacking animations during rapid input. Pointer movement can drive quickTo for a cursor follower or magnetic button; Chapter 13 explains that optimization.\n\nClick-driven dropdowns and mobile navigation also need semantic state, such as aria-expanded. Loading effects should stop when content is ready and must not block access. Pair animated validation feedback with a readable error message: shaking a field alone does not communicate the problem to many readers.",
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
            "An accordion moves surrounding content, so animating its height is appropriate. Measure the full content height and expose the panel before opening. Hide it only after closing. Keep the latest logical state independent of animation completion. overwrite: auto replaces competing height tweens during rapid input.\n\nOther components also need explicit state, but their keyboard and focus rules differ. Use native dialog for modals. Tabs need selection state and relationships between tabs and panels. Carousels need buttons and a meaningful reading order. Reuse the separation between state and animation without copying accordion semantics into every component.",
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
            "ScrollTrigger maps a scroll range to animation behavior. trigger identifies the measured element. start: \"top 85%\" means its top reaches a point 85% down the viewport. end sets the other boundary. Development markers show these positions; remove them before release. A timeline can own one ScrollTrigger so all its children follow one scroll playhead.\n\nWithout scrub, crossing boundaries triggers actions. toggleActions lists actions for onEnter, onLeave, onEnterBack, and onLeaveBack, in that order. once supports a one-time reveal. toggleClass changes a class without requiring a tween. For independent reveals in a list, give each element its own trigger.",
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
            "scrub: true connects animation progress directly to scroll progress. A numeric scrub adds smoothing as the animation catches up. pin holds an element in place during a scroll range. pinSpacing normally reserves space for it so following content does not move underneath. Disable that spacing only for intentional overlap.\n\nKeep the pinned measurement container stable and animate a child inside it. ScrollTrigger.create can observe crossings, toggle classes, or pin without a tween. Its onUpdate receives an instance with progress and direction; avoid announcing progress on every frame. This example pins a scene and moves a horizontal child across 600 scroll pixels. The separate observer only updates a CSS class.",
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
            "A horizontal section usually translates a track as the page scrolls vertically. Calculate its travel as scrollWidth minus the viewport width. Function-based values with invalidateOnRefresh let layout changes recalculate the tween's travel and scroll range. If travel is zero, keep the section in normal flow instead of pinning it.\n\nParallax suggests depth by moving layers at different rates; use restrained distances. Snapping can settle progress onto sections, but should not resist ordinary navigation. Give each scene one controlling timeline to simplify multi-section stories. Avoid adding separate scrub triggers to children already controlled by a parent scrub timeline.",
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
            "refresh remeasures scroll boundaries after layout changes. update reads the current scroll position and updates progress without remeasuring. getAll lists active triggers and helps identify duplicates. Do not refresh on every scroll callback. Wait for images, fonts, inserted content, or route layout to settle, and combine repeated refresh requests.\n\nUse scroller for a custom scroll container. A third-party virtual scroller may need scrollerProxy plus update/refresh integration; follow its documented adapter. Ancestor transforms or overflow can affect pinning. Check geometry, pin order, markers, and ownership before adding workarounds.",
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
            "gsap.matchMedia creates animations for matching media conditions and reverts them when those conditions change. Added in 3.11, it records animations in a context. One setup can handle desktop, mobile, and reduced motion. Add desktop pinning only when it helps that layout; mobile can retain natural document flow. Media conditions describe layout or preferences, not guaranteed input hardware.\n\nReturn cleanup for listeners and other resources created in the callback. Revert the matchMedia instance when the component is destroyed. Resizing and orientation changes can affect geometry. ScrollTrigger normally refreshes on resize; application-driven layout changes still need an explicit refresh. Reserve media sizes in CSS before loading to prevent layout shifts.",
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
            "Keep content accessible without hover, mouse movement, or wheel input. Pointer events cover mice, pens, and touch, but keyboard operation still needs separate testing. A pointer:fine condition can enable a decorative follower while click and focus continue working everywhere.\n\nUse smaller travel distances on mobile, let text wrap, and remove unnecessary pins. When a breakpoint rebuilds a sequence, revert the old context before creating its replacement. Test live resizing across every breakpoint and changes to reduced-motion preferences. Duplicate triggers or leftover inline transforms indicate incomplete cleanup.",
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
            "Keyframes specify several destinations within one tween. An array gives explicit steps. Function-based values can read current measurements during initialization. repeatRefresh clears saved start/end values on full repeats, allowing computed or random destinations to change. It does not run every frame or on each yoyo return.\n\nmodifiers transforms a calculated value before it is applied, which is useful for wrapping an endless track. snap rounds chosen property values. When a new tween initializes, overwrite: auto removes conflicting properties from active tweens rather than destroying every animation on the target. onInterrupt can release animation-specific work when a tween is killed before completion. Give shared properties one owner instead of letting independent timelines write them simultaneously.",
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
            "getProperty reads a GSAP-managed value, often more conveniently than parsing a transform matrix. quickTo reuses a tween for frequent changes to one property. quickSetter writes directly with low overhead and no easing. Use these for measured high-frequency interactions while keeping an explicit state model.\n\nGlobal defaults affect later animations, and config changes engine settings. Prefer timeline-local defaults in reusable components so importing a module does not affect other features. registerEffect names a reusable factory and can add it to timelines. This decorative pointer follower stays inside a small pad and is disabled for reduced motion or a coarse pointer.",
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
            "An effect packages a shared animation convention into a named factory. It receives normalized targets, merged configuration, and optionally a timeline. Return its tween or timeline so the caller keeps playback control. extendTimeline adds it as a timeline method. Register effects once at application setup and choose names unlikely to collide with dependencies.\n\nCoordinate sequences with a parent timeline, a shared progress value, or explicit controller commands. Avoid independent clocks controlling the same transform. Effects can establish consistent reveals, while state and focus management remain with the component.",
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
            "GSAP utilities help select targets and convert input values. toArray turns selectors or collections into an array. selector(root) creates queries scoped to a component. clamp keeps a number within bounds. normalize converts a source range to 0–1, and mapRange converts between arbitrary ranges. interpolate blends numbers, colors, strings, or compatible objects.\n\nMany utilities return reusable functions if you omit the final value. This makes the steps in input processing clear. Guard against a source range with zero width in application calculations. Here a range input drives a bounded translation and blended color without creating an eased tween on every event.",
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
            "Value utilities can create discrete or repeating patterns outside a tween. snap rounds to an increment or a supplied set of values. random returns a value or reusable generator. wrap cycles through a range or array, while wrapYoyo travels back and forth across a numeric range. distribute returns a function calculating target-specific offsets, with uses beyond stagger.\n\npipe runs functions in order from left to right. unitize parses a numeric input, applies a function, and appends a unit. getUnit extracts a string's unit suffix. Keep units consistent instead of assuming every numeric string means pixels. These helpers make pointer and scroll input mapping easier to explain and test.",
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
            "SplitText wraps characters, words, or lines so you can animate them as separate targets. Split only the parts you need. Line breaks depend on fonts and container width. In 3.13 and later, autoSplit can split again after relevant layout changes, and onSplit rebuilds the animation. Return that animation so SplitText can manage cleanup and playhead continuity. mask: lines adds clipping wrappers for a reveal.\n\nDefault aria handling labels the original element and hides the generated pieces from assistive technology. Review nested links or other semantic content carefully: a flattened label can hide their structure. Begin with simple decorative headings. revert restores the original markup. Destroy the owning media/context scope when the component unmounts.",
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
            "TextPlugin replaces text during a tween, making it useful for typewriter-like labels. It is not a rich-text editor. ScrambleTextPlugin reveals a final message through temporary randomized characters. SplitText instead animates wrappers around text without changing the message. Choose the plugin that matches the result you need.\n\nAvoid rewriting an aria-live region on every animation update. Keep essential text in a stable accessible label or announce only the final result. Here a decorative display has a separate label from its animated text. Reduced motion immediately shows the final phrase. Important instructions must remain available without waiting for a typewriter effect.",
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
            "SVG has its own coordinate system, defined by viewBox, independent of its CSS pixel size. A path's d attribute contains drawing commands and points. GSAP core animates numeric attributes through attr and transforms through CSSPlugin. Stroke width, dasharray, and dashoffset affect outlines. Masks reveal content using luminance or alpha, while clip paths define visible geometric regions.\n\nDrawSVGPlugin calculates lengths and manages stroke reveal ranges. It does not convert a filled shape into a line drawing. Use suitable strokes for icon or logo outlines, then coordinate fills and HTML captions on one timeline. Check transform origins in SVG coordinates and provide accessible titles for meaningful illustrations.",
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
            "MorphSVGPlugin animates between path shapes, including paths with different point counts. Choose endpoint artwork deliberately and adjust shapeIndex if the point correspondence causes twisting. A morph changes geometry rather than scaling the whole SVG. MotionPathPlugin moves a target along a path or array of points. align and alignOrigin help match coordinate systems, while autoRotate follows the path's direction.\n\nMotionPathHelper is a development tool for editing paths. Remove its interface from production. Masks, clip paths, icons, and HTML captions can share a timeline, but their DOM nesting and coordinate systems still matter. Start with one inline SVG before combining independently transformed HTML and SVG layers.",
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
            "FLIP stands for First, Last, Invert, Play. Capture the first geometry, make the real layout change, offset the new layout to look like the old one, then animate those offsets away. Flip.getState captures geometry, and Flip.from animates from that capture to the current layout. Use it for grid/list changes, reordered cards, expanding panels, and moving elements between DOM parents.\n\nThe DOM should already represent the desired final state; animation handles its visual transition. Flip.to works in the other direction, moving the current layout toward a recorded destination. Avoid applying absolute: true to every item by default. Removing elements from normal flow can alter the layout you wanted to preserve.",
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
            "A shared-element transition keeps an item's visual identity as its layout changes. Move the same element between parents, or use stable data-flip-id values to match different instances. Capture the starting state before DOM changes, complete the update, then animate. Actual DOM reordering also changes reading and keyboard order; that order should match the final interface.\n\nFlip.getState normally completes relevant active flips before taking the next capture, helping repeated interactions reach a stable destination. Use Flip.isFlipping and Flip.killFlipsOf for a more explicit interruption policy. Framework updates commit asynchronously: capture before changing state and animate only after the new layout is committed. CSS transitions on the same transform can conflict with FLIP.",
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
            "Draggable adds dragging behavior. Its exported name is Draggable, not DraggablePlugin, and Draggable.create returns an array of instances. type selects x, y, x,y, or rotation. Bounds limit travel, and snapping aligns resting values to a grid. Provide ordinary buttons for people who cannot drag.\n\nInertiaPlugin adds velocity-based movement after release when inertia: true is enabled. It is a separate dependency; core and Draggable alone do not provide it. A carousel also needs selected-item state, keyboard navigation, readable labels, and resize handling. Dragging supplies only its movement layer. Destroy the Draggable instance when removing the component.",
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
            "Observer turns wheel, touch, and pointer input into movement callbacks. It can report direction, accumulated deltas, and velocity. It does not supply an interaction design or accessible carousel behavior. Keep visible controls alongside pointer and swipe support.\n\nObserve only the relevant component. preventDefault can block native scrolling and other browser behavior, so reserve it for deliberately isolated gesture surfaces. This example responds to horizontal swipes or wheel direction and provides Previous/Next buttons. It leaves default scrolling available. Kill the observer during teardown, and avoid global wheel handlers for ordinary page navigation.",
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
            "ScrollSmoother softens scrolling by using ScrollTrigger to transform a content wrapper relative to native scroll movement. Create it before the page's other ScrollTriggers. Its wrapper and content elements define its scope. Fixed-position interface elements usually belong outside the transformed content. effects enables data-speed parallax and data-lag following effects; use them sparingly.\n\nThe native scroll position remains, but transformed content affects fixed positioning, focus scrolling, anchors, and measurements. Test each of these. Use one page smoother and avoid competing scroll engines. Prefer normal scrolling for reduced motion and often for touch. smoothTouch is opt-in. A polished site does not require smoothed scrolling.",
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
            "ScrollToPlugin animates native scrolling on the window or a container. ScrollTrigger observes scrolling, while ScrollSmoother manages a smoothed page. Keep these roles distinct. Avoid CSS scroll-behavior:smooth while GSAP controls scrolling. autoKill allows manual input to interrupt the tween.\n\nScrolling to a heading does not give it keyboard focus. For deliberate navigation, keep a real link, update the fragment, and focus the destination without a second scroll jump. Reduced motion can use an immediate native jump. A third-party scroll engine needs its own adapter and accessibility testing; it is an optional integration, not a default dependency.",
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
            "CustomEase creates a reusable easing curve from control points or SVG path data. CustomBounce and CustomWiggle generate bounce and oscillation curves and depend on CustomEase. EasePack supplies RoughEase, SlowMo, and ExpoScaleEase for rough variation, a slowed middle section, and scale-aware progress. Load only the tools the scene needs.\n\nAn ease changes how progress maps to time, not the agreed endpoint. Convincing motion depends on distance, duration, overshoot, and settling together. Use a custom curve for a visible problem that built-in power or sine easing cannot solve. Otherwise, it adds maintenance without improving the result.",
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
            "Physics plugins calculate motion from initial conditions. Physics2DPlugin derives x/y movement from velocity, angle, gravity, acceleration, and friction. PhysicsPropsPlugin applies velocity and acceleration to individual numeric properties. InertiaPlugin continues movement from tracked velocity, such as after dragging. These tools do not supply collisions, constraints, or a rigid-body simulation.\n\nVelocity means the change in position per unit of time. Momentum describes continued motion in physics, but an interface often needs only a convincing approximation. Use a bounce ease for a simple rebound and physics when the path should follow initial conditions. A ballistic arc can leave the viewport. Keep it in a bounded decorative area and stop or revert it during teardown.",
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
            "The browser resolves styles, calculates layout, paints pixels, and combines layers for display. Transforms and opacity often avoid layout work, so they suit frequent animation. They do not guarantee free GPU rendering. Large blurred layers, costly pixel rendering, and too many composited elements can still be expensive. Measure force3D and will-change rather than enabling them everywhere.\n\nLayout thrashing occurs when repeated style writes force subsequent geometry reads in the same frame. Batch reads before writes. With many elements, reduce animated targets, stagger work, and avoid offscreen effects. Reserve media dimensions to prevent layout shifts. Profile a realistic scene in Chrome DevTools Performance and Rendering panels, including low-powered mobile conditions. FPS alone does not identify the bottleneck.",
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
            "requestAnimationFrame schedules work before a browser repaint. GSAP's ticker follows that rendering cycle and drives the animation engine. Add a ticker callback when canvas or another renderer must redraw animated state. Avoid a second animation-frame loop drawing the same scene. Ticker time is in seconds, but deltaTime is in milliseconds.\n\nLag smoothing adjusts the clock after long stalls to keep animations coordinated. Disabling it globally can affect the whole app, so retain defaults unless an integration explicitly requires otherwise. Background tabs can throttle frames. Base custom movement on elapsed time, remove callbacks during teardown, and reduce costly scroll work instead of merely lowering the reported frame rate.",
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
            "gsap.context groups animation work under an owner. It records animations and ScrollTriggers created while its callback runs. A scope element limits selector strings to the component. context.revert restores recorded state and disposes those animations. It does not automatically remove arbitrary listeners, timers, observers, or ticker callbacks; return cleanup for those resources.\n\nEvent handlers run after setup, so animations they create must re-enter the context explicitly through context.add. This keeps later work under the same owner. Destroy the owner before replacing or removing its DOM. A clear mount/destroy contract also simplifies repeated setup, route changes, and memory-leak investigation.",
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
            "Async work may finish after its component has unmounted. A font promise, fetch, timer, or observer needs cancellation where possible and an alive flag or abort signal for the rest. If it creates an animation, re-enter the owning context. Clean up external resources as well as reverting GSAP work.\n\nDecide what interruption means for application state: commit the destination, reverse to the previous state, or continue from the rendered value. Keep that outcome well defined. Use local references, one owner per property, and repeatable setup/teardown instead of killing global tweens to repair one component.",
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
            "GSAP includes TypeScript declarations. Do not add an unrelated @types/gsap package to hide errors. Import core in the Vite TypeScript project and use inference where possible. gsap.core.Tween and gsap.core.Timeline describe returned animations; gsap.TweenVars describes configuration. These types do not prove that a selector finds an element.\n\nCheck DOM references before using them. Keep callbacks small and reusable helpers explicit about inputs and outputs. This example exports a typed factory and calls it separately after a component-boundary guard. Browser API types require DOM declarations in tsconfig. The compiler does not make those APIs available during server rendering.",
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
            "A small controller can expose initialization, playback, refresh, and destruction while hiding selectors and timing. A factory is often sufficient. A class helps when an instance has clear state and several public methods. Expose less than the full GSAP timeline so application code cannot casually rewrite its children.\n\nKeep motion tokens and factories in src/motion, separate from application logic in src/components. Pass DOM references and shared settings into helpers instead of querying global selectors everywhere. This class guards its destroyed state and restores styles during teardown. It provides the animation layer; the real component must also own listeners and accessibility state.",
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
            "React controls rendered structure. GSAP controls selected animated properties after React commits the component. useGSAP from the separately installed @gsap/react package creates a context for setup and cleanup. Scope selectors to a ref so separate instances cannot animate each other. Strict Mode's development setup/cleanup cycle tests lifecycle handling; keep cleanup enabled.\n\nThis component stores one paused timeline in a ref and controls its playhead from React state. Rapid changes reverse from the current position. Reduced motion seeks straight to the requested endpoint. If dependencies rebuild the animation instead, use revertOnUpdate when the previous setup must be restored first. Conditional removal needs an exit-state strategy because an unmounted node cannot be animated.",
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
            "contextSafe records animations created by handlers that run after useGSAP setup. Wrap those handlers so their animations receive context cleanup and selector scoping. This does not remove manually attached listeners. React event props handle listener management in this example.\n\nWhen React state controls a timeline, store it in a ref and command that instance instead of creating concurrent copies. Reusable animation hooks should expose a small controller and dispose their context. For conditional content, retain the exiting view until its exit finishes. Include an immediate reduced-motion path and a cancellation policy for rapid state changes.",
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
            "In the Next.js App Router, hooks and browser animation setup belong in a Client Component. Put use client at the module boundary. Server-rendered HTML must agree with the initial client render. Read window, matchMedia, dimensions, and DOM references inside the client effect rather than during rendering. Keep baseline content visible in case hydration or scripts fail.\n\nCoordinate route transitions with the router and persistent layouts. GSAP does not automatically delay navigation or retain the old route for an exit animation. Plan cancellation, focus restoration, scroll reset, and ScrollTrigger refreshes after the new route commits. Begin with page-enter motion. Shared exit animations across routes require more advanced architecture.",
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
            "Separate application state from animation construction. A central module can hold shared timing and easing values, called tokens. Factories use them to create timelines. Prefer local defaults over broad gsap.defaults changes. Register shared effects at explicit setup and import only the plugins a feature needs.\n\nExpose focused controller commands such as open, close, refresh, and destroy. Keep unrelated networking and routing elsewhere. Give timelines distinct responsibilities so a hover effect, panel transition, and page reveal do not compete for the same transform. Destroy the prior owner before initializing a replacement.",
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
            "A state machine names the states a component can occupy and the transitions between them. A panel might be closed, opening, open, or closing. During rapid input, animation progress differs from the intended open/closed state. Keep one authoritative intent. Completion handlers should report a settled state only if it still matches that intent.\n\nA controller or class can keep this contract inside an existing UI component library. Reversing one timeline is often simpler than coordinating many from tweens. For testing, inject a small animation adapter with play/reverse methods instead of mocking the whole GSAP engine. Define whether refresh invalidates values, remeasures scroll positions, or rebuilds the component.",
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
            "prefers-reduced-motion expresses a preference for less potentially uncomfortable movement. Replace large travel, parallax, zoom, and oscillation with direct state changes or restrained fades where appropriate. When motion is disabled, do not leave content transparent or offscreen. Keep every essential control available.\n\nProvide functional feedback immediately, before decorative motion finishes. Move focus according to the interface action rather than an arbitrary animation delay. Preserve reading order and avoid repeated announcements from moving content. Keep keyboard operation, touch controls, and meaningful screen-reader text intact. Provide a user-controlled pause or stop for persistent movement where useful. Understanding the page should not require constant animation.",
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
            "A native dialog supplies modal behavior, including focus containment and Escape handling. Animate its appearance while retaining that behavior. Move focus into it when opening and restore focus to the opener when closing. Closing must remain possible when motion is disabled or interrupted.\n\nThis example animates entry only and closes immediately through the native API, avoiding an exit phase that could delay Escape. A production exit animation needs a retained closing state, prevention of duplicate actions, and a guaranteed final close after interruption. Test tab order, focus restoration, screen-reader labels, and no-animation behavior before evaluating visual polish.",
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
            "Begin debugging by checking gsap.version, script loading, plugin registration, selector matches, and console messages. Mark timeline labels, inspect duration and startTime, and read animated values with getProperty. Unexpected starting values often come from immediateRender, competing transforms, or creating a from tween too early.\n\nFor scroll problems, use ScrollTrigger markers to inspect ranges and refresh after confirmed geometry changes. GSDevTools is an optional development panel for seeking through and inspecting a timeline. Remove its interface and markers from production. Reduce the problem to one target and one tween before reasoning about a page with several owners.",
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
            "Test numeric animation results by pausing and seeking to a known progress value instead of waiting an estimated time. A linear tween from 0 to 120 should reach 60 at progress 0.5. Test application controllers through a small playback adapter. Mock that boundary only when the engine itself is not being tested.\n\nIntegration and end-to-end tests should cover rapid input, reduced motion, live breakpoint changes, repeated mount/destroy, and actual focus and hidden state. For visual snapshots, seek to a stable position and wait for fonts and assets. Mocks cannot prove rendering, ScrollTrigger geometry, or real cleanup. Test those in a browser too.",
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
            "Playwright can set reduced motion before navigation, operate controls, and repeatedly check until the expected state appears. This fixture-specific test uses Chapter 9's accordion served at /accordion.html. Reduced motion should complete immediately while preserving the same accessible state. Use locators and assertions instead of fixed waitForTimeout delays.\n\nAdd normal-motion tests for rapid toggles, two simultaneous instances, and destroy/remount. Compare ScrollTrigger counts before and after a feature to find leaks without killing unrelated instances. Cross-browser and real-device tests still matter for SVG geometry, touch, fonts, and rendering costs.",
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
            "GSAP changes numeric state, and a renderer draws it. Canvas 2D can read an animated plain object, as Chapter 21 shows. WebGL and Three.js can animate object.position, rotation, camera positions, or shader uniform.value fields. Keep a uniform wrapper intact when the renderer expects a stable object.\n\nUse one rendering loop. If Three.js already runs requestAnimationFrame or setAnimationLoop, let that loop render the changing GSAP state. A moving camera may need its lookAt orientation updated too. DOM and 3D animations can share a parent timeline, but graphics resources require separate disposal. This adapter sketches the contract; it is not a complete Three.js scene or shader program.",
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
            "PixiPlugin connects GSAP properties to PixiJS display objects, including convenient scale, rotation, tint, and filter handling. Register the Pixi namespace with PixiPlugin.registerPIXI. Verify which Pixi major version and filter APIs the integration supports. The plugin does not create the renderer or load textures.\n\nVideo can drive animation through currentTime/duration, or GSAP can seek video time for a scroll-scrubbed scene. Seeking is asynchronous and depends on the codec. Wait for metadata, throttle requests, and test real media. Play sound only with user intent. Immersive experiences still need useful HTML, accessible controls, cleanup, and a lower-cost fallback.",
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
            "Motion design starts with timing and spacing. Timing means duration; spacing means distance covered between frames. Acceleration and deceleration shape that spacing. Anticipation prepares an action, follow-through lets secondary parts settle, and overlap gives related parts slightly different timing. Squash and stretch suggest weight, but should not distort important text or controls.\n\nUse a motion hierarchy to direct attention to the primary action first. Rhythm, staging, and choreography organize the sequence. Continuity helps users recognize an item across states. Meaningful transitions and short microinteractions explain cause and effect. Shared timing tokens create consistency. Expressive motion can support storytelling in a product scene, while routine forms usually need subtle feedback. Evaluate the version without motion just as carefully.",
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
      const link = node("a", chapter.name);
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
