/* Categories follow the supplied images; Installation is placed first. */
const handbook = {
  categories: [
    {
      name: "Installation",
      id: "installation",
      intro:
        "This image uses ES-module imports: import GSAP core, import DrawSVGPlugin, then register the plugin before using it. Run the snippets in an npm project with an ES-module-aware bundler such as Vite; bare package imports do not work by themselves in a plain browser script. The existing shared HTML fixture uses a CDN script instead, so do not mix that core copy with these module imports.",
      setup: [
        {
          label: "Install in an existing npm project — terminal",
          language: "shell",
          code: "npm install gsap@3.15.0",
        },
      ],
      options: [],
      methods: [
        {
          name: "gsap.registerPlugin()",
          explanation:
            "Registers an imported plugin with GSAP so its extra animation properties can be used. Call it once during application setup, before creating animations that depend on that plugin.",
          note: "The import statements load module exports; they are JavaScript syntax, not GSAP methods. DrawSVGPlugin animates SVG strokes rather than fills. The examples pin GSAP 3.15.0 and use the public npm package; use its standard license and the documentation matching your installed version.",
          examples: [
            {
              label: "Import and register DrawSVGPlugin — src/main.js",
              code: 'import { gsap } from "gsap";\nimport { DrawSVGPlugin } from "gsap/DrawSVGPlugin";\n\ngsap.registerPlugin(DrawSVGPlugin);',
            },
            {
              label: "Register before drawing an SVG stroke — src/main.js",
              code: 'import { gsap } from "gsap";\nimport { DrawSVGPlugin } from "gsap/DrawSVGPlugin";\n\ngsap.registerPlugin(DrawSVGPlugin);\n\n// This example creates its own SVG target.\nconst host = document.createElement("div");\nhost.innerHTML = `\n  <svg viewBox="0 0 160 60" width="240" aria-hidden="true">\n    <path d="M10 45 L55 15 L100 45 L150 15"\n      fill="none" stroke="royalblue" stroke-width="4" />\n  </svg>\n`;\ndocument.body.append(host);\n\ngsap.from(host.querySelector("path"), {\n  drawSVG: 0,\n  duration: 1.2,\n  ease: "none"\n});',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.registerPlugin()/",
        },
      ],
    },
    {
      name: "Basics",
      id: "basics",
      methods: [
        {
          name: "gsap.to()",
          explanation:
            "Animates from the targets’ current values to the values you supply. Use it when the destination is known and the starting state should come from the element or object.",
          note: "Targets can be selector text, DOM elements, arrays, or ordinary objects. Use camelCase for CSS properties, such as backgroundColor.",
          examples: [
            {
              label: "Move and recolor one box",
              code: 'gsap.to(".box", {\n  x: 100,\n  backgroundColor: "red",\n  duration: 1,\n  ease: "power2.inOut"\n});',
            },
            {
              label: "Stagger cards, repeat, and choose fresh destinations",
              code: 'gsap.to(".card", {\n  x: () => 40 + Math.random() * 100,\n  duration: 1,\n  delay: 0.5,\n  ease: "power2.inOut",\n  stagger: 0.1,\n  overwrite: "auto",\n  repeat: 2,\n  repeatDelay: 1,\n  repeatRefresh: true,\n  yoyo: true,\n  yoyoEase: true,\n  onStart: () => console.log("started"),\n  onRepeat: () => console.log("repeated"),\n  onComplete: () => console.log("finished")\n});',
            },
            {
              label: "Animate a number on an ordinary object",
              code: 'const counter = { value: 0 };\nconst output = document.querySelector("#value");\ngsap.to(counter, {\n  value: 100,\n  duration: 1,\n  ease: "none",\n  onUpdate: () => {\n    output.textContent = Math.round(counter.value);\n  }\n});',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.to()/",
        },
        {
          name: "gsap.from()",
          explanation:
            "Animates from the values you supply back to the targets’ existing values. Use it for entrances when your CSS already describes the desired final appearance.",
          note: "from() normally writes its starting values immediately, including when delayed; immediateRender: false defers that write until the tween starts.",
          examples: [
            {
              label: "Reveal a box in its existing position",
              code: 'gsap.from(".box", {\n  x: -60,\n  opacity: 0,\n  duration: 0.8,\n  ease: "power2.out"\n});',
            },
            {
              label: "Bring cards in one after another",
              code: 'gsap.from(".card", {\n  y: 24,\n  opacity: 0,\n  duration: 0.6,\n  stagger: 0.1,\n  ease: "power2.out"\n});',
            },
            {
              label: "Delay the starting-state write",
              code: 'gsap.from(".box", {\n  scale: 0.5,\n  opacity: 0,\n  duration: 0.8,\n  delay: 1,\n  immediateRender: false\n});',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.from()/",
        },
        {
          name: "gsap.fromTo()",
          explanation:
            "Defines both the starting and ending values of an animation. Use it when you need explicit endpoints rather than depending on the target’s current state.",
          note: "Put timing, easing, callbacks, and other control options in the third argument, toVars. Starting values normally render immediately; use immediateRender: false in toVars to defer them.",
          examples: [
            {
              label: "Move between two explicit positions",
              code: 'gsap.fromTo(".box",\n  { x: -40 },\n  { x: 100, duration: 1, ease: "power2.inOut" }\n);',
            },
            {
              label: "Reveal a group with fixed endpoints",
              code: 'gsap.fromTo(".card",\n  { y: 24, opacity: 0 },\n  { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }\n);',
            },
            {
              label: "Leave the current appearance intact until the delay ends",
              code: 'gsap.fromTo(".box",\n  { x: -60, opacity: 0 },\n  {\n    x: 100,\n    opacity: 1,\n    duration: 0.8,\n    delay: 1,\n    immediateRender: false\n  }\n);',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.fromTo()/",
        },
        {
          name: "gsap.set()",
          explanation:
            "Applies property values immediately without an animated transition. Use it to establish a starting state, reset visual properties, or update several targets at once.",
          note: "It is effectively a zero-duration tween; unlike to(), it does not interpolate over a duration.",
          examples: [
            {
              label: "Position and recolor a box immediately",
              code: 'gsap.set(".box", {\n  x: 100,\n  backgroundColor: "red"\n});',
            },
            {
              label: "Reset all cards at once",
              code: 'gsap.set(".card", {\n  x: 0,\n  y: 0,\n  scale: 1,\n  opacity: 1\n});',
            },
            {
              label: "Set ordinary object properties",
              code: 'const counter = { value: 0 };\ngsap.set(counter, { value: 100 });\ndocument.querySelector("#value").textContent = counter.value;',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.set()/",
        },
      ],
      options: [
        [
          "x / backgroundColor",
          "Animate a target property: x is horizontal translation (numeric CSS values use pixels); backgroundColor changes its color.",
        ],
        [
          "duration / delay",
          "Animation length and wait before starting, in seconds. The image’s duration is 1 and delay is 0.5.",
        ],
        [
          "ease",
          'Controls the rate of change. "power2.inOut" accelerates then decelerates.',
        ],
        [
          "stagger",
          "Offsets starts across multiple targets; 0.1 means a 0.1-second gap.",
        ],
        [
          "paused",
          "true creates a paused tween; false is the default. A paused tween needs playback control before it runs; the runnable examples start automatically.",
        ],
        [
          "overwrite",
          'Defaults to false. "auto" removes conflicting properties from active tweens when this tween first renders, leaving other properties intact.',
        ],
        [
          "repeat / repeatDelay",
          "repeat counts extra iterations: 2 means three plays, and -1 repeats indefinitely. repeatDelay is the wait between iterations, in seconds.",
        ],
        [
          "repeatRefresh",
          "Recalculates recorded values on full repeats, not on yoyo returns. Useful with computed values; duration, delay, and stagger are not refreshed.",
        ],
        [
          "yoyo / yoyoEase",
          "yoyo reverses alternate repeat iterations. yoyoEase: true inverts the normal ease for that return phase; an ease string supplies a different curve.",
        ],
        [
          "immediateRender",
          "Controls the initial write. Normally false for to() and true for from()/fromTo(); false delays the starting write in the delayed entrance examples.",
        ],
        ["onComplete", "Runs at the forward end of the tween."],
        [
          "Other callbacks",
          "onStart runs when motion begins; onUpdate runs on updates; onRepeat runs at repeat boundaries; onReverseComplete runs when reverse playback reaches the beginning. Reversing is a playback operation, not the same as yoyo.",
        ],
      ],
    },
    {
      name: "Control Methods",
      id: "control-methods",
      intro:
        "Keep the Tween returned by gsap.to(), or a Timeline returned by gsap.timeline(), in a variable. The first 14 methods below work on both; the final six are timeline-only. Getter calls return values instead of supporting animation chaining, and then(), getChildren(), and playhead-tween factories have their own return types.",
      options: [],
      methods: [
        {
          name: ".play()",
          explanation:
            "Starts or continues playback in the forward direction. Use it to open an animated element or play from a chosen time.",
          note: "Returns the animation for chaining. An optional first argument selects a time in seconds, or a label on a timeline; skipped callbacks are suppressed by default.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Play a paused tween",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, paused: true });\nanim.play();',
            },
            {
              label: "Play forward from one second",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, paused: true });\nanim.play(1); // Jump to 1 second, then continue forward.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/play()/",
        },
        {
          name: ".pause()",
          explanation:
            "Stops playback at its current position without discarding the animation. Use it for a pause control or to hold a precise state.",
          note: "Returns the animation. An optional time or timeline label moves the playhead before pausing; pause() does not reset direction.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Pause when a button is clicked",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 4 });\ndocument.querySelector("#control").onclick = () => anim.pause();',
            },
            {
              label: "Hold a specific time",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2 });\nanim.pause(0.75); // Render the 0.75-second position and stay there.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/pause()/",
        },
        {
          name: ".resume()",
          explanation:
            "Continues a paused animation in its existing direction. Use it when resuming should preserve reverse playback rather than always move forward.",
          note: "Returns the animation. Unlike play(), resume() does not force the direction to forward.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Continue from a held position",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, paused: true });\nanim.pause(0.5);\nanim.resume();',
            },
            {
              label: "Resume in reverse",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, paused: true });\nanim.progress(0.75).reverse().pause();\nanim.resume(); // Continues backward from 75%.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/resume()/",
        },
        {
          name: ".reverse()",
          explanation:
            "Runs an animation backward toward its beginning. Use it to close an entrance animation from its current position.",
          note: "Returns the animation. reverse() at time zero has nowhere to travel; reverse(0) is the special form that starts at the end. A numeric argument otherwise selects a time, and timelines also accept labels.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Reverse from the end",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, paused: true });\nanim.reverse(0); // Special case: start at the end and move backward.',
            },
            {
              label: "Reverse halfway through",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, paused: true });\nanim.progress(0.5).reverse();',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/reverse()/",
        },
        {
          name: ".restart()",
          explanation:
            "Moves to the beginning and starts playing forward again. Use it to replay an effect without creating another tween.",
          note: "Returns the animation. restart() skips the original delay; restart(true) includes it. Recorded values are reused unless you invalidate them.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Replay after positioning at the end",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 1, paused: true });\nanim.progress(1);\nanim.restart();',
            },
            {
              label: "Honor the original delay",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 1, delay: 0.5, paused: true });\nanim.restart(true); // Wait 0.5 seconds, then play from the beginning.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/restart()/",
        },
        {
          name: ".timeScale()",
          explanation:
            "Reads or changes playback speed without rewriting the animation’s duration. Use 2 for double speed, 0.5 for half speed, and 1 for normal speed.",
          note: "With no argument it returns a number; with a value it returns the animation. A parent timeline’s speed also affects its children, and changing speed does not unpause a paused animation.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Play at double speed",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2 });\nanim.timeScale(2);',
            },
            {
              label: "Read and change the speed",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, paused: true });\nconsole.log(anim.timeScale()); // 1\nanim.timeScale(0.5).play(); // Half speed.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/timeScale()/",
        },
        {
          name: ".seek()",
          explanation:
            "Jumps to a time in seconds, or to a label on a timeline. Use it to inspect or navigate to a known point without animating the jump.",
          note: "Returns the animation and preserves its paused state. Callback events skipped by the jump are suppressed by default; pass false as the second argument when they should run.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Inspect a time while paused",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, ease: "none", paused: true });\nanim.seek(1.5); // x is 75; the tween remains paused.',
            },
            {
              label: "Seek a timeline label",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 2, ease: "none" }), 0);\ntl.add("half", 1);\ntl.seek("half"); // Jump to the label at 1 second.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/seek()/",
        },
        {
          name: ".progress()",
          explanation:
            "Reads or sets progress within the current iteration as a number from 0 to 1. Use it for scrubbing or inspecting a single pass.",
          note: "The getter returns a number; the setter returns the animation and preserves its paused state. Repeats are excluded; use totalProgress() for the whole repeated run. Pass true as the second setter argument to suppress callbacks during the jump.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Hold halfway through one pass",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, ease: "none", paused: true });\nanim.progress(0.5, true); // x is 50; callbacks are suppressed.',
            },
            {
              label: "Read the current normalized progress",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, paused: true });\nanim.progress(0.25);\nconsole.log(anim.progress()); // 0.25',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/progress()/",
        },
        {
          name: ".totalProgress()",
          explanation:
            "Reads or sets progress across the complete animation, including repeats and repeat delays. Use it when a progress control should represent the entire repeated run.",
          note: "The getter returns a number; the setter returns the animation and preserves its paused state. Use finite repeats when a meaningful final 100% point is needed; pass true as the second setter argument to suppress callbacks.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Seek through a repeated animation",
              code: 'const anim = gsap.to(".box", {\n  x: 100, duration: 1, repeat: 2, repeatDelay: 0.5,\n  ease: "none", paused: true\n});\nanim.totalProgress(0.8, true); // 80% of all three passes and their gaps.\nconsole.log(anim.totalProgress()); // 0.8',
            },
            {
              label: "Hold the end of every repeat",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 1, repeat: 2, paused: true });\nanim.totalProgress(1, true); // Final repeated end, rather than just one pass.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/totalProgress()/",
        },
        {
          name: ".kill()",
          explanation:
            "Stops and removes an animation from its parent so it no longer plays there. Use it when that animation is no longer needed.",
          note: "It leaves the currently rendered values in place rather than restoring original styles. Tween instances can also kill selected target properties; this selective form is not a Timeline API.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Stop and remove a whole tween",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, ease: "none", paused: true });\nanim.progress(0.5);\nanim.kill(); // The box stays at x: 50.',
            },
            {
              label: "Stop only horizontal movement on a tween",
              code: 'const box = document.querySelector(".box");\nconst anim = gsap.to(box, { x: 100, y: 40, duration: 2, paused: true });\nanim.progress(0.5);\nanim.kill(box, "x"); // Keep the y property animating.\nanim.play();',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/kill()/",
        },
        {
          name: ".isActive()",
          explanation:
            "Reports whether an animation is active within its playback time span. Use it for diagnostics or to guard an interaction that should not interrupt active movement.",
          note: "Returns a Boolean, not a chainable animation. Paused animations, animations whose ancestors are paused, and animations still waiting in their initial delay are not active.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Check a paused animation",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2, paused: true });\nconsole.log(anim.isActive()); // false',
            },
            {
              label: "Inspect during playback",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 2 });\nrequestAnimationFrame(() => {\n  console.log(anim.isActive()); // true while it is actively playing.\n});',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/isActive()/",
        },
        {
          name: ".then()",
          explanation:
            "Returns a Promise for animation completion and optionally runs a completion handler. Use it when an asynchronous flow should continue after a finite animation finishes.",
          note: "Returns a Promise rather than the animation, so subsequent chaining uses Promise methods. An unfinished paused or endlessly repeating animation does not reach a completion point; killing it is not a substitute for completion.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Run code after completion",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 0.5 });\nanim.then(() => {\n  document.querySelector("#value").textContent = "Finished";\n});',
            },
            {
              label: "Continue a Promise chain with a result",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 0.5 });\nanim.then(() => "Movement finished").then(message => {\n  console.log(message);\n});',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/then()/",
        },
        {
          name: ".invalidate()",
          explanation:
            "Clears recorded start/end values so they are recalculated on the next render. Use it before replaying when a computed destination or relative starting point has changed.",
          note: "Returns the animation without resetting timing or restoring styles. Invalidating a timeline also invalidates its children; restart() alone normally reuses recorded values.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Recalculate a function-based destination",
              code: 'let distance = 100;\nconst anim = gsap.to(".box", { x: () => distance, duration: 1, paused: true });\nanim.progress(1); // Initialize and finish at x: 100.\ndistance = 180;\nanim.invalidate().restart(); // Recalculate the destination as 180.',
            },
            {
              label: "Move another relative step",
              code: 'const anim = gsap.to(".box", { x: "+=40", duration: 1, paused: true });\nanim.progress(1); // x is 40.\nanim.invalidate().restart(); // Now travel from 40 to 80.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/invalidate()/",
        },
        {
          name: ".eventCallback()",
          explanation:
            "Reads, replaces, or removes a named animation callback after the animation is created. Use it when the completion or update behavior must change without rebuilding the tween.",
          note: "Pass an event name alone to read its function, or a function and optional parameters to set it; setters return the animation. Pass null to remove it. Each event type has one callback, so setting a new one replaces the old one.",
          scope: "Tween and timeline",
          examples: [
            {
              label: "Attach a completion callback with parameters",
              code: 'const anim = gsap.to(".box", { x: 100, duration: 1, paused: true });\nanim.eventCallback("onComplete", message => {\n  document.querySelector("#value").textContent = message;\n}, ["Done"]);\nanim.play();',
            },
            {
              label: "Read and remove a callback",
              code: 'const done = () => console.log("finished");\nconst anim = gsap.to(".box", { x: 100, duration: 1, paused: true, onComplete: done });\nconsole.log(anim.eventCallback("onComplete") === done); // true\nanim.eventCallback("onComplete", null).play(); // No completion log.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Tween/eventCallback()/",
        },
        {
          name: ".add()",
          explanation:
            "Inserts a tween, nested timeline, label, callback, or array into a timeline. Use its position argument to choose when that item belongs in the sequence.",
          note: "Timeline only; returns the timeline. A numeric position is seconds from its start, while a label is a named position. Added child animations must not remain independently paused if the parent is expected to play them.",
          scope: "Timeline only",
          examples: [
            {
              label: "Insert two tweens with an overlap",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 1 }), 0);\ntl.add(gsap.to(".card", { y: 30, duration: 1 }), 0.5);\ntl.play();',
            },
            {
              label: "Add a label and a callback at that label",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 1 }), 0);\ntl.add("ready", 1);\ntl.add(() => console.log("Reached ready"), "ready");\ntl.play();',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/add()/",
        },
        {
          name: ".call()",
          explanation:
            "Schedules a function at a timeline position, optionally passing an array of arguments. Use it to coordinate a discrete action with a sequence.",
          note: "Timeline only; returns the timeline. This creates a callback inside the sequence, unlike eventCallback(), which configures events on the timeline itself. Playback or unsuppressed seeking across the position can invoke it again.",
          scope: "Timeline only",
          examples: [
            {
              label: "Run a function after a tween",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 1 }), 0);\ntl.call(() => console.log("Box arrived")); // Append at the end.\ntl.play();',
            },
            {
              label: "Pass parameters at an exact time",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 2 }), 0);\ntl.call(message => {\n  document.querySelector("#value").textContent = message;\n}, ["Halfway"], 1);\ntl.play();',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/call()/",
        },
        {
          name: ".getChildren()",
          explanation:
            "Returns an array of a timeline’s child tweens and/or nested timelines. Use it to inspect a sequence or apply controls to a selected group of children.",
          note: "Timeline only; returns an array, not the timeline. Arguments are nested, tweens, timelines, and ignoreBeforeTime; the first three default to true. Labels are not animations, while scheduled callbacks count as zero-duration tweens.",
          scope: "Timeline only",
          examples: [
            {
              label: "Inspect direct children only",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 1 }), 0);\ntl.add(gsap.to(".card", { y: 30, duration: 1 }), 0.5);\nconst children = tl.getChildren(false, true, true);\nconsole.log(children.length); // 2',
            },
            {
              label: "Collect tweens inside a nested timeline",
              code: 'const child = gsap.timeline();\nchild.add(gsap.to(".box", { x: 100, duration: 1 }));\nconst tl = gsap.timeline({ paused: true });\ntl.add(child);\nconst tweens = tl.getChildren(true, true, false);\nconsole.log(tweens.length); // 1; omit the nested timeline itself.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/getChildren()/",
        },
        {
          name: ".clear()",
          explanation:
            "Removes the animations and scheduled callbacks inside a timeline so you can reuse that timeline. Use it to rebuild a sequence without retaining its old children.",
          note: "Timeline only; returns the timeline. Labels are removed by default, while clear(false) keeps them. It does not restore rendered styles or remove timeline event callbacks such as onComplete.",
          scope: "Timeline only",
          examples: [
            {
              label: "Replace all children with a new sequence",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 1 }));\ntl.clear();\ntl.add(gsap.to(".box", { y: 40, duration: 1 }));\ntl.play();',
            },
            {
              label: "Keep labels while replacing animations",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add("start", 0);\ntl.add(gsap.to(".box", { x: 100, duration: 1 }), "start");\ntl.clear(false); // Keep the start label.\ntl.add(gsap.to(".box", { x: 60, duration: 1 }), "start");\ntl.play();',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/clear()/",
        },
        {
          name: ".tweenTo()",
          explanation:
            "Creates a tween that moves a timeline’s playhead from its current position to a time or label. Use it to navigate smoothly to a scene instead of jumping there.",
          note: "Timeline only; returns a new Tween, not the timeline. It pauses the timeline, scrubs its local time, and leaves it paused at the destination. The default scrub is linear, but options can override ease or duration; child tween easing still applies.",
          scope: "Timeline only",
          examples: [
            {
              label: "Scrub to a time",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 2, ease: "none" }));\nconst scrub = tl.tweenTo(1.5); // Stop at x: 75.\n',
            },
            {
              label: "Scrub to a label with an explicit duration",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 2, ease: "none" }));\ntl.add("middle", 1);\ntl.tweenTo("middle", {\n  duration: 0.5,\n  ease: "none",\n  onComplete: () => console.log("Reached middle")\n});',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/tweenTo()/",
        },
        {
          name: ".tweenFromTo()",
          explanation:
            "Creates a tween that scrubs a timeline’s playhead between two explicit times or labels. Use it to replay only one segment or travel backward through that segment.",
          note: "Timeline only; returns a new Tween and leaves the controlled timeline paused when finished. The first two arguments choose the segment, and the optional third object configures its scrub tween; the destination may be earlier in timeline time, which scrubs backward.",
          scope: "Timeline only",
          examples: [
            {
              label: "Play only the middle second",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 2, ease: "none" }));\ntl.tweenFromTo(0.5, 1.5, { duration: 1, ease: "none" });\n// The box travels from x: 25 to x: 75.',
            },
            {
              label: "Scrub backward between labels",
              code: 'const tl = gsap.timeline({ paused: true });\ntl.add(gsap.to(".box", { x: 100, duration: 2, ease: "none" }));\ntl.add("start", 0);\ntl.add("end", 2);\ntl.tweenFromTo("end", "start", { duration: 1, ease: "none" });',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/tweenFromTo()/",
        },
      ],
    },
    {
      name: "Utility Methods",
      id: "utility-methods",
      intro:
        "All helpers in this category are accessed through gsap.utils. They are included with core GSAP and generally transform values or return reusable functions rather than starting animations. The examples use the existing shared browser setup; DOM-based utilities need their target elements to exist.",
      options: [],
      methods: [
        {
          name: "gsap.utils.checkPrefix()",
          explanation:
            "Finds the browser-supported JavaScript style-property name, adding a vendor prefix when needed. Use it when writing styles directly instead of letting GSAP’s CSS handling resolve them.",
          note: "The result depends on browser support. Check for a falsy result before assigning a property that might not be supported.",
          examples: [
            {
              label: "Look up a supported property name",
              code: 'const property = gsap.utils.checkPrefix("transform");\nconsole.log(property); // "transform" in browsers supporting it unprefixed.',
            },
            {
              label: "Apply a style only when supported",
              code: 'const property = gsap.utils.checkPrefix("userSelect");\nconst box = document.querySelector(".box");\nif (property) {\n  box.style[property] = "none";\n}',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/checkPrefix()/",
        },
        {
          name: "gsap.utils.clamp()",
          explanation:
            "Keeps a number between a minimum and maximum. Use it to limit positions, percentages, or other numeric input.",
          note: "Pass min, max, and value for a result immediately; omit value to get a reusable function. The result is a number, not a CSS value with units.",
          examples: [
            {
              label: "Limit a value directly",
              code: "console.log(gsap.utils.clamp(0, 100, 135)); // 100\nconsole.log(gsap.utils.clamp(0, 100, -20)); // 0",
            },
            {
              label: "Reuse the same bounds",
              code: 'const limit = gsap.utils.clamp(0, 100);\nconsole.log(limit(65)); // 65\ngsap.set(".box", { x: limit(180) }); // x: 100',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/clamp()/",
        },
        {
          name: "gsap.utils.distribute()",
          explanation:
            "Creates a function that spreads values across a set of targets. Use it for stagger offsets or target-dependent properties without calculating each value manually.",
          note: "The returned function receives index, target, and the targets array. amount sets the total spread, each sets the step, and base, from, ease, and grid can shape the distribution.",
          examples: [
            {
              label: "Give cards progressively larger offsets",
              code: 'gsap.to(".card", {\n  x: gsap.utils.distribute({ base: 0, amount: 100 }),\n  duration: 1\n}); // Three cards finish at x: 0, 50, and 100.',
            },
            {
              label: "Calculate a distribution without animating",
              code: "const targets = [{}, {}, {}];\nconst spread = gsap.utils.distribute({ base: 10, amount: 100 });\nconst values = targets.map((target, index) => spread(index, target, targets));\nconsole.log(values); // [10, 60, 110]",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/distribute()/",
        },
        {
          name: "gsap.utils.getUnit()",
          explanation:
            'Extracts the unit suffix from a value such as "24px" or "50%". Use it when processing numeric strings while keeping track of their units.',
          note: "Returns a string, or an empty string for a unitless value. It does not convert the number or establish that a unit is valid for a particular CSS property.",
          examples: [
            {
              label: "Read a CSS unit suffix",
              code: 'console.log(gsap.utils.getUnit("24px")); // "px"\nconsole.log(gsap.utils.getUnit("50%")); // "%"',
            },
            {
              label: "Distinguish units from the numeric portion",
              code: 'const value = "1.5rem";\nconsole.log(parseFloat(value)); // 1.5\nconsole.log(gsap.utils.getUnit(value)); // "rem"\nconsole.log(gsap.utils.getUnit(20)); // ""',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/getUnit()/",
        },
        {
          name: "gsap.utils.interpolate()",
          explanation:
            "Calculates an intermediate value between endpoints at a supplied progress. Use it to blend numbers, colors, or compatible structured values without starting a tween.",
          note: "Progress commonly runs from 0 to 1. Omit it to get a reusable function; interpolation calculates values immediately and does not schedule animation frames.",
          examples: [
            {
              label: "Find a numeric value between two endpoints",
              code: "console.log(gsap.utils.interpolate(0, 100, 0.25)); // 25",
            },
            {
              label: "Build a reusable color blend",
              code: 'const blend = gsap.utils.interpolate("red", "blue");\ndocument.querySelector(".box").style.backgroundColor = blend(0.5);',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/interpolate()/",
        },
        {
          name: "gsap.utils.mapRange()",
          explanation:
            "Converts a number from one range into the corresponding position in another range. Use it to turn input such as a slider value into a movement distance.",
          note: "Arguments are input min, input max, output min, output max, and optional value. Omit value for a reusable function. It does not clamp out-of-range input; avoid a zero-width input range.",
          examples: [
            {
              label: "Map an input value into a different scale",
              code: "console.log(gsap.utils.mapRange(0, 200, 0, 1, 50)); // 0.25",
            },
            {
              label: "Map percentages to horizontal positions",
              code: 'const toX = gsap.utils.mapRange(0, 100, -100, 100);\nconsole.log(toX(75)); // 50\ngsap.set(".box", { x: toX(75) });',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/mapRange()/",
        },
        {
          name: "gsap.utils.normalize()",
          explanation:
            "Converts a value’s position within a range to a 0–1 scale. Use it when another function expects progress rather than the original measurement.",
          note: "Pass min, max, and value, or omit value for a reusable function. Values outside the input range produce results outside 0–1; use clamp separately if required and avoid a zero-width range.",
          examples: [
            {
              label: "Normalize a measurement",
              code: "console.log(gsap.utils.normalize(100, 500, 300)); // 0.5",
            },
            {
              label: "Reuse a normalizer and handle overflow",
              code: "const toProgress = gsap.utils.normalize(0, 200);\nconsole.log(toProgress(100)); // 0.5\nconsole.log(toProgress(500)); // 2.5\nconsole.log(gsap.utils.clamp(0, 1, toProgress(500))); // 1",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/normalize()/",
        },
        {
          name: "gsap.utils.pipe()",
          explanation:
            "Combines functions into a new function that processes input from left to right. Use it to express a sequence of numeric transformations clearly.",
          note: "Each result becomes the next function’s input. pipe returns a function; it does not run the pipeline until that function is called.",
          examples: [
            {
              label: "Clamp, map, and append a unit",
              code: 'const toPixels = gsap.utils.pipe(\n  gsap.utils.clamp(0, 100),\n  gsap.utils.mapRange(0, 100, 0, 200),\n  gsap.utils.unitize(Math.round, "px")\n);\nconsole.log(toPixels(62.4)); // "125px"',
            },
            {
              label: "Normalize and snap progress",
              code: "const toStep = gsap.utils.pipe(\n  gsap.utils.normalize(0, 100),\n  gsap.utils.clamp(0, 1),\n  gsap.utils.snap(0.25)\n);\nconsole.log(toStep(37)); // 0.25\nconsole.log(toStep(180)); // 1",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/pipe()/",
        },
        {
          name: "gsap.utils.random()",
          explanation:
            "Picks a random number from a range or an item from an array. Use it for varied decorative values or to create a reusable random generator.",
          note: "Numeric calls can specify a rounding increment. A true return-function argument creates a generator rather than returning a single value; repeated picks may return the same result.",
          examples: [
            {
              label: "Pick a number in fixed increments",
              code: "const distance = gsap.utils.random(10, 50, 5);\nconsole.log(distance); // A multiple of 5 between 10 and 50.",
            },
            {
              label: "Create a reusable random color picker",
              code: 'const pickColor = gsap.utils.random(["royalblue", "tomato", "gold"], true);\nconsole.log(pickColor()); // One color from the array.\ngsap.set(".box", { backgroundColor: pickColor() });',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/random()/",
        },
        {
          name: "gsap.utils.selector()",
          explanation:
            "Creates a function that finds elements inside a chosen root. Use it to keep a component’s selectors from matching another component’s elements.",
          note: "Pass a valid root element. Calling the returned function queries its descendants and returns an array; later calls see the current DOM rather than a permanently cached list.",
          examples: [
            {
              label: "Animate targets inside one component",
              code: 'const root = document.createElement("section");\nroot.innerHTML = \'<div class="card">One</div><div class="card">Two</div>\';\ndocument.body.append(root);\nconst select = gsap.utils.selector(root);\ngsap.to(select(".card"), { x: 40, duration: 1 });',
            },
            {
              label: "Query again after the root’s content changes",
              code: 'const root = document.createElement("section");\nconst select = gsap.utils.selector(root);\nconsole.log(select(".card").length); // 0\nroot.innerHTML = \'<div class="card">New card</div>\';\nconsole.log(select(".card").length); // 1',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/selector()/",
        },
        {
          name: "gsap.utils.shuffle()",
          explanation:
            "Randomizes an array’s order in place and returns that array. Use it to vary a sequence when changing the original array is intended.",
          note: "The result is the same array reference, and a shuffle can coincidentally keep the original order. Copy first when callers still need the original order.",
          examples: [
            {
              label: "Shuffle the original array",
              code: 'const items = ["A", "B", "C"];\nconst result = gsap.utils.shuffle(items);\nconsole.log(result === items); // true\nconsole.log(items); // Same items, in a randomized order.',
            },
            {
              label: "Shuffle a copy while preserving the original",
              code: 'const original = ["A", "B", "C"];\nconst mixed = gsap.utils.shuffle([...original]);\nconsole.log(original); // ["A", "B", "C"]\nconsole.log(mixed); // A randomized copy.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle()/",
        },
        {
          name: "gsap.utils.snap()",
          explanation:
            "Rounds a value to an increment or the nearest item in a supplied numeric array. Use it to align movement or input values to meaningful steps.",
          note: "Supply the value for an immediate result, or omit it for a reusable snapping function. This utility calculates values; it does not animate an element or create scroll snapping.",
          examples: [
            {
              label: "Snap to a numeric increment",
              code: "console.log(gsap.utils.snap(10, 23)); // 20\nconsole.log(gsap.utils.snap(10, 26)); // 30",
            },
            {
              label: "Snap to a chosen set of stops",
              code: 'const nearestStop = gsap.utils.snap([0, 40, 100]);\nconsole.log(nearestStop(55)); // 40\ngsap.set(".box", { x: nearestStop(55) });',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/snap()/",
        },
        {
          name: "gsap.utils.splitColor()",
          explanation:
            "Converts a CSS color into an array of color-channel values. Use it when calculations need separate red, green, blue, and possibly alpha components.",
          note: "By default the result uses RGB, with alpha when present in the input. The optional second argument true requests HSL instead; this helper parses color values, not gradients.",
          examples: [
            {
              label: "Split a hexadecimal color into RGB channels",
              code: 'const rgb = gsap.utils.splitColor("#336699");\nconsole.log(rgb); // [51, 102, 153]',
            },
            {
              label: "Retain an explicitly supplied alpha channel",
              code: 'const rgba = gsap.utils.splitColor("rgba(255, 128, 0, 0.5)");\nconsole.log(rgba); // [255, 128, 0, 0.5]',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/splitColor()/",
        },
        {
          name: "gsap.utils.toArray()",
          explanation:
            "Converts selector matches or array-like collections into an ordinary array. Use it when you need array methods or a normalized list of animation targets.",
          note: "Selector strings are resolved against the DOM, so call it after the targets exist. The returned array contains references to existing elements; it does not clone those elements.",
          examples: [
            {
              label: "Turn selector matches into an array",
              code: 'const cards = gsap.utils.toArray(".card");\nconsole.log(Array.isArray(cards)); // true\ngsap.to(cards, { x: 40, duration: 1, stagger: 0.1 });',
            },
            {
              label: "Convert a NodeList and use array methods",
              code: 'const nodes = document.querySelectorAll(".card");\nconst cards = gsap.utils.toArray(nodes);\nconst widths = cards.map(card => card.getBoundingClientRect().width);\nconsole.log(widths); // One measured width per card.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/toArray()/",
        },
        {
          name: "gsap.utils.unitize()",
          explanation:
            'Wraps a numeric function so its result receives a CSS unit. Use it when a utility expects plain numbers but the next step needs a string such as "100px".',
          note: "The wrapper parses the numeric input before calling your function. Supply a unit to force that suffix, or omit it to retain the input’s unit; this changes labels, not physical unit conversion.",
          examples: [
            {
              label: "Clamp a numeric string and force pixels",
              code: 'const limitPixels = gsap.utils.unitize(gsap.utils.clamp(0, 100), "px");\nconsole.log(limitPixels("150%")); // "100px"; no percent-to-pixel conversion.',
            },
            {
              label: "Preserve the incoming unit",
              code: 'const double = gsap.utils.unitize(value => value * 2);\nconsole.log(double("12%")); // "24%"\nconsole.log(double("8px")); // "16px"',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/unitize()/",
        },
        {
          name: "gsap.utils.wrap()",
          explanation:
            "Cycles a number through a range, or an index through an array, returning to the start after the end. Use it for repeating positions or alternating values.",
          note: "Numeric ranges include the minimum and exclude the maximum, unlike clamp. Omit the input value/index to get a reusable function; wrapping does not start an animation.",
          examples: [
            {
              label: "Wrap overflowing and negative values",
              code: "console.log(gsap.utils.wrap(0, 100, 125)); // 25\nconsole.log(gsap.utils.wrap(0, 100, -10)); // 90\nconsole.log(gsap.utils.wrap(0, 100, 100)); // 0",
            },
            {
              label: "Cycle colors across targets",
              code: 'const colorAt = gsap.utils.wrap(["royalblue", "tomato"]);\nconsole.log(colorAt(3)); // "tomato"\ngsap.set(".card", { backgroundColor: colorAt });',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/wrap()/",
        },
        {
          name: "gsap.utils.wrapYoyo()",
          explanation:
            "Cycles through a numeric range or array, reversing direction at each end. Use it for back-and-forth patterns instead of jumping directly from the end to the start.",
          note: "Supply a value/index for an immediate result, or omit it to return a function. This is a value transformation; it does not enable a tween’s yoyo playback option.",
          examples: [
            {
              label: "Reflect values at the range boundaries",
              code: "console.log(gsap.utils.wrapYoyo(0, 100, 125)); // 75\nconsole.log(gsap.utils.wrapYoyo(0, 100, 225)); // 25",
            },
            {
              label: "Read array entries forward and backward",
              code: 'const pick = gsap.utils.wrapYoyo(["A", "B", "C"]);\nconst values = [0, 1, 2, 3, 4, 5].map(index => pick(index));\nconsole.log(values); // ["A", "B", "C", "B", "A", "B"]',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/UtilityMethods/wrapYoyo()/",
        },
      ],
    },
    {
      name: "Timelines",
      id: "timelines",
      intro:
        "A timeline sequences multiple tweens around a shared playhead. This category follows the image’s order: creation options, chained to() calls, then placement through the position parameter. The parameter is documented with tl.to(), not as an extra method.",
      options: [
        [
          "delay / paused",
          "delay waits before starting, in seconds. paused: true creates a paused sequence; false is the normal default.",
        ],
        [
          "repeat / repeatDelay",
          "repeat counts additional iterations: 2 gives three plays, and -1 repeats indefinitely. repeatDelay is the wait between repeats, in seconds.",
        ],
        [
          "repeatRefresh",
          "Recalculates child start/end values on full repeat iterations, excluding yoyo returns. Useful for computed values; duration, delay, and stagger do not refresh.",
        ],
        [
          "yoyo",
          "Reverses alternate repeat iterations. With repeat: 2, playback goes forward, backward, then forward.",
        ],
        [
          "defaults",
          'Settings inherited by child animations when created, such as duration: 1 and ease: "none". Explicit child settings override them.',
        ],
        [
          "smoothChildTiming",
          "When true, GSAP adjusts child start times to preserve smooth alignment after timing changes such as reversing or changing a child’s speed. It is false by default on ordinary timelines.",
        ],
        [
          "autoRemoveChildren",
          "When true, completed children are removed. This interferes with backward scrubbing, reversal, and replay; leave it false for a reusable sequence.",
        ],
        [
          "onComplete / other callbacks",
          "onComplete runs at the forward end; onStart at the start; onUpdate during updates; onRepeat at repeat boundaries; onReverseComplete when reverse playback reaches the beginning.",
        ],
        [
          "Position: 0.7",
          "A number places the tween at an absolute time: 0.7 seconds from the timeline’s start.",
        ],
        [
          'Position: "-=0.7"',
          "Start 0.7 seconds before the current end of the timeline, which is not necessarily the end of the most recently added child.",
        ],
        [
          'Position: "myLabel"',
          "Insert at that named position. If it does not yet exist, GSAP creates it at the current timeline end; the examples define it explicitly with add().",
        ],
        [
          'Position: "myLabel+=0.2"',
          "Start 0.2 seconds after the named position.",
        ],
        [
          'Position: "<"',
          "Align with the start of the most recently added animation, regardless of the timeline’s overall end.",
        ],
        [
          'Position: "<0.2"',
          "Start 0.2 seconds after the most recently added animation’s start.",
        ],
        [
          'Position: "-=50%"',
          "Overlap the current timeline end by half of the total duration of the animation being inserted.",
        ],
        [
          'Position: "<25%"',
          "Start one-quarter of the most recently added animation’s total duration after that animation’s start. Total duration includes repeats and repeat delays.",
        ],
      ],
      referenceTitle:
        "Timeline options and position parameter — image reference",
      referenceCaption: "Timeline configuration and all eight position forms",
      methods: [
        {
          name: "gsap.timeline()",
          explanation:
            "Creates a Timeline that coordinates child animations under one playhead. Use it to control a sequence as a single animation and share default settings between its children.",
          note: "The options object configures the timeline; defaults configures child tweens, whose explicit values override those defaults. A paused timeline needs play() before it runs. Keep autoRemoveChildren false for sequences you intend to reverse or scrub backward.",
          examples: [
            {
              label: "Create a sequence with shared child defaults",
              code: 'const tl = gsap.timeline({\n  paused: true,\n  defaults: { duration: 1, ease: "none" }\n});\ntl.to(".box", { x: 100 })\n  .to(".card", { y: 30, duration: 0.5 }); // Override the default duration.\ntl.play();',
            },
            {
              label: "Repeat a coordinated sequence with fresh values",
              code: 'const tl = gsap.timeline({\n  delay: 0.5,\n  paused: true,\n  repeat: 2,\n  repeatDelay: 1,\n  repeatRefresh: true,\n  yoyo: true,\n  defaults: { duration: 1, ease: "none" },\n  smoothChildTiming: true,\n  autoRemoveChildren: false, // Retain children for yoyo and replay.\n  onComplete: () => console.log("finished")\n});\ntl.to(".box", { x: () => 60 + Math.random() * 80 });\ntl.play(); // Forward, backward, forward; three iterations in total.',
            },
            {
              label: "Remove completed children only for a one-way sequence",
              code: 'const tl = gsap.timeline({\n  autoRemoveChildren: true,\n  onComplete: () => console.log("One-way sequence finished")\n});\ntl.to(".box", { x: 100, duration: 0.5 });\n// Completed children are removed: do not use this setup for reversal or replay.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.timeline()/",
        },
        {
          name: "tl.to()",
          explanation:
            "Adds a tween to an existing timeline and returns that timeline, allowing calls to be chained. Use its optional third argument, position, to append, overlap, align, or place the new tween at a named point.",
          note: "Unlike gsap.to(), which returns the created Tween, tl.to() returns the owning Timeline. Omitted position appends at the timeline’s current end. Position percentages require GSAP 3.7+; the reference and examples below use the 3.15.0 practice baseline.",
          examples: [
            {
              label:
                "Sequence selectors, an ID, an element, and an element array",
              code: 'const elem = document.querySelector(".box");\nconst [elem1, elem2] = document.querySelectorAll(".card");\nconst tl = gsap.timeline({ paused: true });\ntl.to(".card", { duration: 1, x: 50, y: 0 })\n  .to("#value", { autoAlpha: 0 })\n  .to(elem, { duration: 1, backgroundColor: "red" })\n  .to([elem1, elem2], { duration: 3, x: 100 });\ntl.play(); // No position arguments: run these steps one after another.',
            },
            {
              label:
                "Use absolute time, an overlap, a label, and a label offset",
              code: 'const tl = gsap.timeline({\n  paused: true,\n  defaults: { duration: 1, ease: "none" }\n});\ntl.to(".box", { x: 100 }, 0.7); // Start at 0.7 seconds; end at 1.7.\ntl.to(".card", { y: 40 }, "-=0.7"); // Start at 1.0 seconds.\ntl.add("myLabel", 2); // Define this label explicitly at 2 seconds.\ntl.to(".box", { rotation: 45 }, "myLabel"); // Start at 2.0.\ntl.to(".card", { rotation: -45 }, "myLabel+=0.2"); // Start at 2.2.\ntl.play();',
            },
            {
              label:
                "Compare recent-child anchors and percentage-based offsets",
              code: 'const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });\ntl.to(".box", { x: 100, duration: 2 }, 0); // 0 → 2 seconds.\ntl.to(".card", { y: 40, duration: 1 }, "<"); // 0 → 1.\ntl.to(".box", { rotation: 90, duration: 1 }, "<0.2"); // 0.2 → 1.2.\ntl.to(".card", { rotation: 45, duration: 2 }, "-=50%");\n// Timeline end was 2; subtract 50% of THIS new 2-second tween: start at 1.\ntl.to(".box", { scale: 1.2, duration: 1 }, "<25%");\n// Previous child starts at 1 and lasts 2 seconds: start at 1 + 0.5 = 1.5.\ntl.play();',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/Timeline/to()/",
        },
      ],
    },
    {
      name: "Eases",
      id: "eases",
      intro:
        "An ease maps elapsed time to animation progress: .in accelerates, .out decelerates, and .inOut combines both. Entries follow the image’s order: none, basic core families, expressive core families, EasePack, then custom plugins. Core examples use the shared browser fixture. Every plugin example is an independent src/main.js module for the npm setup in Installation and creates its own box; do not paste those imports into the CDN fixture.",
      options: [],
      referenceLinks: [
        {
          label: "Ease Visualizer — compare curves",
          url: "https://gsap.com/docs/v3/Eases/",
        },
      ],
      methods: [
        {
          name: "none",
          kind: "ease",
          scope: "Core · Linear",
          explanation:
            "Moves at a constant rate without acceleration or deceleration. Use it for steady travel or rotation that should not speed up or slow down.",
          note: '"linear" is an alias for "none". This controls progress over time; it does not change the tween’s duration or destination.',
          examples: [
            {
              label: "Move at constant speed",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "none" });',
            },
            {
              label: "Use the linear alias for one full turn",
              code: 'gsap.to(".box", { rotation: 360, duration: 1, ease: "linear" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "power1",
          kind: "ease",
          scope: "Core · Basic ease",
          explanation:
            "Gives a gentle acceleration or deceleration. Use it for restrained interface movement when a stronger curve would feel abrupt.",
          note: "Append .in for acceleration, .out for deceleration, or .inOut for both. A bare family name selects its .out variant; explicit suffixes make the intended motion easier to read.",
          examples: [
            {
              label: "Decelerate into the destination",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "power1.out" });',
            },
            {
              label: "Compare acceleration with acceleration-and-deceleration",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "power1.in" });\ngsap.to(".card", { y: 40, duration: 1, ease: "power1.inOut" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "power2",
          kind: "ease",
          scope: "Core · Basic ease",
          explanation:
            "Provides a more pronounced acceleration or deceleration than power1. Use it for clear, responsive entrances and other short interface transitions.",
          note: "Append .in for acceleration, .out for deceleration, or .inOut for both. A bare family name selects its .out variant; explicit suffixes make the intended motion easier to read.",
          examples: [
            {
              label: "Decelerate into the destination",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "power2.out" });',
            },
            {
              label: "Compare acceleration with acceleration-and-deceleration",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "power2.in" });\ngsap.to(".card", { y: 40, duration: 1, ease: "power2.inOut" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "power3",
          kind: "ease",
          scope: "Core · Basic ease",
          explanation:
            "Makes acceleration or deceleration stronger than power2. Use it when movement should spend more time near one end and change speed more decisively.",
          note: "Append .in for acceleration, .out for deceleration, or .inOut for both. A bare family name selects its .out variant; explicit suffixes make the intended motion easier to read.",
          examples: [
            {
              label: "Decelerate into the destination",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "power3.out" });',
            },
            {
              label: "Compare acceleration with acceleration-and-deceleration",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "power3.in" });\ngsap.to(".card", { y: 40, duration: 1, ease: "power3.inOut" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "power4",
          kind: "ease",
          scope: "Core · Basic ease",
          explanation:
            "Provides the strongest curve among the listed power families. Use it for deliberately dramatic starts or stops rather than subtle movement.",
          note: "Append .in for acceleration, .out for deceleration, or .inOut for both. A bare family name selects its .out variant; explicit suffixes make the intended motion easier to read.",
          examples: [
            {
              label: "Decelerate into the destination",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "power4.out" });',
            },
            {
              label: "Compare acceleration with acceleration-and-deceleration",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "power4.in" });\ngsap.to(".card", { y: 40, duration: 1, ease: "power4.inOut" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "circ",
          kind: "ease",
          scope: "Core · Basic ease",
          explanation:
            "Uses a circular curve for a pronounced speed change near an endpoint. Use it when a rounded but sharp acceleration or deceleration suits the motion.",
          note: "Append .in for acceleration, .out for deceleration, or .inOut for both. A bare family name selects its .out variant; explicit suffixes make the intended motion easier to read.",
          examples: [
            {
              label: "Decelerate into the destination",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "circ.out" });',
            },
            {
              label: "Compare acceleration with acceleration-and-deceleration",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "circ.in" });\ngsap.to(".card", { y: 40, duration: 1, ease: "circ.inOut" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "expo",
          kind: "ease",
          scope: "Core · Basic ease",
          explanation:
            "Uses an exponential curve for a very strong speed change. Use it for fast arrivals with a long settling phase, or the reverse effect with .in.",
          note: "Append .in for acceleration, .out for deceleration, or .inOut for both. A bare family name selects its .out variant; explicit suffixes make the intended motion easier to read.",
          examples: [
            {
              label: "Decelerate into the destination",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "expo.out" });',
            },
            {
              label: "Compare acceleration with acceleration-and-deceleration",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "expo.in" });\ngsap.to(".card", { y: 40, duration: 1, ease: "expo.inOut" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "sine",
          kind: "ease",
          scope: "Core · Basic ease",
          explanation:
            "Uses a smooth sine-based curve for gentle acceleration and deceleration. Use it for restrained movement or a soft transition between states.",
          note: "Append .in for acceleration, .out for deceleration, or .inOut for both. A bare family name selects its .out variant; explicit suffixes make the intended motion easier to read.",
          examples: [
            {
              label: "Decelerate into the destination",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "sine.out" });',
            },
            {
              label: "Compare acceleration with acceleration-and-deceleration",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "sine.in" });\ngsap.to(".card", { y: 40, duration: 1, ease: "sine.inOut" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "elastic",
          kind: "ease",
          scope: "Core · Expressive ease",
          explanation:
            "Oscillates around the destination like a spring before settling. Use it for a small playful accent when repeated overshoot will not distract from the interface.",
          note: "Core ease with .in, .out, and .inOut variants. The optional parameters control amplitude and period; it is an easing curve, not a physical simulation.",
          examples: [
            {
              label: "Use the default outward elastic curve",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "elastic.out" });',
            },
            {
              label: "Specify amplitude and period",
              code: 'gsap.to(".box", { rotation: 45, duration: 1, ease: "elastic.out(1, 0.3)" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "back",
          kind: "ease",
          scope: "Core · Expressive ease",
          explanation:
            "Briefly overshoots beyond an endpoint. Use it for a small anticipatory pull or a controlled overshoot without repeated spring oscillation.",
          note: "Core ease with .in, .out, and .inOut variants. The optional number controls overshoot; keep it restrained for text and large interface panels.",
          examples: [
            {
              label: "Overshoot once on arrival",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "back.out(1.7)" });',
            },
            {
              label: "Add anticipation and overshoot",
              code: 'gsap.to(".box", { rotation: 45, duration: 1, ease: "back.inOut(1.2)" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "bounce",
          kind: "ease",
          scope: "Core · Expressive ease",
          explanation:
            "Imitates diminishing rebounds at an endpoint. Use it for a decorative landing effect when a bounce helps explain the visual action.",
          note: "Core ease with .in, .out, and .inOut variants. It does not detect a floor, collide with other elements, or simulate a physical world.",
          examples: [
            {
              label: "Bounce into a lower position",
              code: 'gsap.to(".box", { y: 60, duration: 1, ease: "bounce.out" });',
            },
            {
              label: "Bounce at both ends of a horizontal move",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "bounce.inOut" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "steps(n)",
          kind: "ease",
          scope: "Core · Expressive ease",
          explanation:
            "Changes progress in discrete steps instead of moving continuously. Use it for a deliberately stepped visual or frame-like change.",
          note: 'Replace n with the desired positive integer step count, such as "steps(5)". The step curve changes values inside one tween; it does not create separate callbacks for every step.',
          examples: [
            {
              label: "Move in five visible steps",
              code: 'gsap.to(".box", { x: 100, duration: 1, ease: "steps(5)" });',
            },
            {
              label: "Rotate in eight steps",
              code: 'gsap.to(".box", { rotation: 360, duration: 1, ease: "steps(8)" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/",
        },
        {
          name: "rough",
          kind: "ease",
          scope: "EasePack · module setup",
          explanation:
            "Adds jagged variation to progress. Use it for a rough or flickering decorative effect that should not follow a smooth curve.",
          note: "Requires RoughEase from gsap/EasePack and registration. Points and strength control the variation; randomize: false makes its pattern regular, and clamp: true limits its output to 0–1.",
          examples: [
            {
              label: "Import EasePack’s RoughEase and use its default",
              code: 'import { gsap } from "gsap";\nimport { RoughEase } from "gsap/EasePack";\n\ngsap.registerPlugin(RoughEase);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\ngsap.to(box, { x: 100, duration: 1, ease: "rough" });',
            },
            {
              label: "Configure a repeatable rough pattern",
              code: 'import { gsap } from "gsap";\nimport { RoughEase } from "gsap/EasePack";\n\ngsap.registerPlugin(RoughEase);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\ngsap.to(box, {\n  x: 100,\n  duration: 1,\n  ease: "rough({strength: 1, points: 12, randomize: false, clamp: true})"\n});',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/RoughEase/",
        },
        {
          name: "slow",
          kind: "ease",
          scope: "EasePack · module setup",
          explanation:
            "Makes the middle portion of a tween move more slowly, with faster transitions at its ends. Use it when an object should spend more time near the middle of its travel.",
          note: "Requires SlowMo from gsap/EasePack and registration. slow(linearRatio, power) controls the middle section’s proportion and the strength of the surrounding speed change.",
          examples: [
            {
              label: "Use the default slow-middle curve",
              code: 'import { gsap } from "gsap";\nimport { SlowMo } from "gsap/EasePack";\n\ngsap.registerPlugin(SlowMo);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\ngsap.to(box, { x: 100, duration: 2, ease: "slow" });',
            },
            {
              label: "Adjust the middle section and strength",
              code: 'import { gsap } from "gsap";\nimport { SlowMo } from "gsap/EasePack";\n\ngsap.registerPlugin(SlowMo);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\ngsap.to(box, { x: 100, duration: 2, ease: "slow(0.5, 0.8)" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/SlowMo/",
        },
        {
          name: "expoScale(1, 2)",
          kind: "ease",
          scope: "EasePack · module setup",
          explanation:
            "Adjusts easing to account for the visual effect of changing scale. Use it for zooms whose perceived speed should remain consistent across a large scale change.",
          note: "Requires ExpoScaleEase from gsap/EasePack and registration. Supply the tween’s actual positive starting and ending scale values; the optional third argument applies an additional ease curve.",
          examples: [
            {
              label: "Match a scale change from 1 to 2",
              code: 'import { gsap } from "gsap";\nimport { ExpoScaleEase } from "gsap/EasePack";\n\ngsap.registerPlugin(ExpoScaleEase);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\ngsap.fromTo(box,\n  { scale: 1 },\n  { scale: 2, duration: 1, ease: "expoScale(1, 2)" }\n);',
            },
            {
              label: "Use different endpoints and a base curve",
              code: 'import { gsap } from "gsap";\nimport { ExpoScaleEase } from "gsap/EasePack";\n\ngsap.registerPlugin(ExpoScaleEase);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\ngsap.fromTo(box,\n  { scale: 0.5 },\n  { scale: 3, duration: 1, ease: "expoScale(0.5, 3, power2.inOut)" }\n);',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/ExpoScaleEase/",
        },
        {
          name: "CustomEase",
          kind: "ease",
          scope: "Custom plugin · module setup",
          explanation:
            "Creates an easing function from a custom curve. Use it when the built-in families do not provide the timing profile your design needs.",
          note: "Import and register CustomEase, then create a named curve before using that name. It accepts four cubic-bezier control values or SVG path data; define reusable curves during setup instead of recreating them on every update.",
          examples: [
            {
              label: "Create a curve from cubic-bezier control values",
              code: 'import { gsap } from "gsap";\nimport { CustomEase } from "gsap/CustomEase";\n\ngsap.registerPlugin(CustomEase);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\nCustomEase.create("cheatGentle", "0.25,0.1,0.25,1");\ngsap.to(box, { x: 100, duration: 1, ease: "cheatGentle" });',
            },
            {
              label: "Create a curve from SVG path data",
              code: 'import { gsap } from "gsap";\nimport { CustomEase } from "gsap/CustomEase";\n\ngsap.registerPlugin(CustomEase);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\nCustomEase.create("cheatCurve", "M0,0 C0.3,0 0.5,1 1,1");\ngsap.to(box, { x: 100, duration: 1, ease: "cheatCurve" });',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/CustomEase/",
        },
        {
          name: "CustomWiggle",
          kind: "ease",
          scope: "Custom plugin · module setup",
          explanation:
            "Creates repeated back-and-forth oscillation in a single tween. Use it for a short shake or wiggle instead of manually sequencing each direction change.",
          note: "Import and register CustomEase and CustomWiggle. A wiggle returns to the starting value: the tween’s supplied change describes the excursion, not a permanent final state. wiggles controls oscillation count, and type selects the pattern.",
          examples: [
            {
              label: "Create a six-oscillation rotation wiggle",
              code: 'import { gsap } from "gsap";\nimport { CustomEase } from "gsap/CustomEase";\nimport { CustomWiggle } from "gsap/CustomWiggle";\n\ngsap.registerPlugin(CustomEase, CustomWiggle);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\nCustomWiggle.create("cheatWiggle", { wiggles: 6 });\ngsap.to(box, { rotation: 20, duration: 1, ease: "cheatWiggle" });\n// Ends back at the initial rotation, not at 20 degrees.',
            },
            {
              label: "Create an anticipation-style horizontal wiggle",
              code: 'import { gsap } from "gsap";\nimport { CustomEase } from "gsap/CustomEase";\nimport { CustomWiggle } from "gsap/CustomWiggle";\n\ngsap.registerPlugin(CustomEase, CustomWiggle);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\nCustomWiggle.create("cheatAnticipation", { wiggles: 8, type: "anticipate" });\ngsap.to(box, { x: 30, duration: 1.2, ease: "cheatAnticipation" });\n// Ends back at the initial x position.',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/CustomWiggle/",
        },
        {
          name: "CustomBounce",
          kind: "ease",
          scope: "Custom plugin · module setup",
          explanation:
            "Creates a configurable bounce curve, with an optional companion curve for squash and stretch. Use it when the built-in bounce does not give enough control over the landing.",
          note: "Import and register CustomEase and CustomBounce. strength shapes the bounce; squash creates a separate named deformation ease. These curves coordinate an effect but do not calculate collisions.",
          examples: [
            {
              label: "Create a custom landing bounce",
              code: 'import { gsap } from "gsap";\nimport { CustomEase } from "gsap/CustomEase";\nimport { CustomBounce } from "gsap/CustomBounce";\n\ngsap.registerPlugin(CustomEase, CustomBounce);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\nCustomBounce.create("cheatBounce", { strength: 0.6 });\ngsap.from(box, { y: -60, duration: 1.5, ease: "cheatBounce" });',
            },
            {
              label: "Coordinate a bounce with squash and stretch",
              code: 'import { gsap } from "gsap";\nimport { CustomEase } from "gsap/CustomEase";\nimport { CustomBounce } from "gsap/CustomBounce";\n\ngsap.registerPlugin(CustomEase, CustomBounce);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\n\nCustomBounce.create("cheatBounceSquash", {\n  strength: 0.7,\n  squash: 2,\n  squashID: "cheatSquash"\n});\ngsap.from(box, { y: -80, duration: 1.5, ease: "cheatBounceSquash" });\ngsap.to(box, {\n  scaleX: 1.25,\n  scaleY: 0.75,\n  transformOrigin: "center bottom",\n  duration: 1.5,\n  ease: "cheatSquash"\n});',
            },
          ],
          source: "https://gsap.com/docs/v3/Eases/CustomBounce/",
        },
      ],
    },
    {
      name: "Nesting Timelines",
      id: "nesting-timelines",
      intro:
        "The image shows a composition pattern built from the timeline() and add() methods already covered. scene1 and scene2 are your own function names, not special GSAP APIs. Each function builds and returns a child timeline, and the master places those returned timelines in its sequence.",
      options: [],
      methods: [
        {
          name: "Return scene timelines and compose a master",
          kind: "pattern",
          scope: "Composition pattern",
          explanation:
            "Return a timeline from each scene function, then insert those timelines into a master with add(). Use this pattern to keep a long animation in small scenes while controlling the complete sequence from one parent.",
          note: 'Keep child timelines unpaused so the master can advance them; pause only the master when you want to wait for input. "-=0.5" overlaps the current master end by half a second. Call a factory again to create a fresh child timeline: adding the same instance to a different parent moves it rather than copying it.',
          examples: [
            {
              label: "Return scene timelines and play them in sequence",
              code: 'function scene1() {\n  const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "none" } });\n  tl.to(".box", { x: 80 })\n    .to(".box", { rotation: 90 });\n  return tl;\n}\n\nfunction scene2() {\n  const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "none" } });\n  tl.to(".card", { y: 30 })\n    .to(".card", { x: 60 });\n  return tl;\n}\n\nconst master = gsap.timeline()\n  .add(scene1()) // Scene 1 occupies 0–1 seconds.\n  .add(scene2()); // Scene 2 occupies 1–2 seconds.',
            },
            {
              label: "Overlap the second scene by half a second",
              code: 'function scene1() {\n  const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "none" } });\n  tl.to(".box", { x: 80 })\n    .to(".box", { rotation: 90 });\n  return tl;\n}\n\nfunction scene2() {\n  const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "none" } });\n  tl.to(".card", { y: 30 })\n    .to(".card", { x: 60 });\n  return tl;\n}\n\nconst master = gsap.timeline()\n  .add(scene1()) // Scene 1 occupies 0–1 seconds.\n  .add(scene2(), "-=0.5"); // Scene 2 occupies 0.5–1.5 seconds.\n// Separate targets keep the overlapping scenes from fighting over properties.',
            },
            {
              label: "Pass targets into scene factories and replay the master",
              code: 'function scene1(target) {\n  const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "none" } });\n  tl.to(target, { x: 80 }).to(target, { rotation: 90 });\n  return tl;\n}\n\nfunction scene2(targets) {\n  const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "none" } });\n  tl.to(targets, { y: 30 }).to(targets, { x: 60 });\n  return tl;\n}\n\nconst box = document.querySelector(".box");\nconst cards = document.querySelectorAll(".card");\nconst master = gsap.timeline({ paused: true })\n  .add(scene1(box))\n  .add(scene2(cards), "-=0.5");\n\n// Use the Apply control button in the shared HTML fixture.\ndocument.querySelector("#control").onclick = () => master.restart();',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.timeline()/#nesting",
        },
      ],
    },
    {
      name: "ScrollTrigger",
      id: "scrolltrigger",
      intro:
        "The image contains scrollTrigger configuration properties and callbacks, not a list of additional methods. Attach the object to a tween or timeline after importing and registering ScrollTrigger. Every example below replaces src/main.js in the npm/module setup from Installation, builds its own tall scroll scene, and runs independently; it does not use the shared CDN fixture. This reference targets GSAP 3.15.0. The image’s settings are alternatives, not one configuration to enable all at once.",
      referenceTitle: "Every option and callback from the image",
      referenceCaption:
        "ScrollTrigger configuration — common settings and advanced caveats",
      options: [
        [
          "trigger",
          "Selector or element used to measure the start boundary. Keep measurement targets stable.",
        ],
        [
          'start: "top center"',
          "Match the trigger’s top to the scroller’s center. The first coordinate belongs to the trigger; the second belongs to the scroller, usually the viewport.",
        ],
        [
          'end: "20px 80%" / "+=500"',
          'The first form matches a point 20px from the endTrigger’s top to 80% down the scroller. endTrigger defaults to trigger. "+=500" instead ends 500 scroll pixels after start; ensure the chosen end follows start.',
        ],
        [
          "scrub",
          "true ties animation progress directly to scroll progress. A number is the catch-up time in seconds, not an animation duration. With scrub, scroll progress controls playback rather than toggleActions.",
        ],
        [
          "pin",
          "true holds the trigger in place; a selector or element pins that target instead. Animate a child inside the stable pinned element.",
        ],
        [
          "markers",
          "Shows boundary markers for development. Remove them before production.",
        ],
        [
          "toggleActions",
          'Four actions, in order: onEnter, onLeave, onEnterBack, onLeaveBack. The image’s "play pause resume reset" uses those four crossings; other shown choices are complete, reverse, and none.',
        ],
        [
          "toggleClass",
          '"active" adds that class to the trigger while its range is active and removes it outside the range. It is separate from animation playback.',
        ],
        [
          "fastScrollEnd",
          "true finishes the associated animation toward its appropriate end when leaving the range faster than the default 2500px/s threshold. A number supplies a custom velocity threshold.",
        ],
        [
          "containerAnimation",
          'Supply the tween or timeline moving a horizontal container. It must use ease: "none". Its child triggers cannot pin or snap; avoid separately moving their trigger elements horizontally.',
        ],
        [
          "id",
          "A unique name for identifying the trigger during debugging; it also appears in development markers.",
        ],
        [
          "anticipatePin",
          "A small value such as 1 applies pinning slightly early based on scroll velocity. It can reduce a fast-scroll pin flash, but is not a general layout repair.",
        ],
        [
          "snap",
          "An optional object describing scroll snapping after scrolling stops. It is distinct from scrub smoothing and the gsap.utils.snap value helper.",
        ],
        [
          "snap.snapTo",
          '1 / 10 snaps in 0.1 progress increments. It can also be an array, function, or "labels" for an associated timeline with labels. Progress destinations lie between 0 and 1.',
        ],
        [
          "snap.duration",
          "Snap animation time in seconds: 0.5 sets a fixed half-second movement.",
        ],
        [
          "snap.directional",
          "true favors a snap destination in the most recent scroll direction. Directional snapping is the default in GSAP 3.8+.",
        ],
        [
          "snap.ease",
          'Controls the snapping movement’s curve; "power3" is the image’s example. This does not change the associated animation’s ease.',
        ],
        [
          "snap.onComplete",
          "Runs after a snap finishes. An interrupted snap does not call its completion callback.",
        ],
        [
          "snap.onStart / snap.onInterrupt",
          "Run when snapping begins or when it is interrupted, for example by renewed user scrolling.",
        ],
        [
          "pinReparent",
          "true temporarily moves the pinned element to <body>, rather than documentElement as the image comment suggests. Reserve it for unavoidable containing-block problems; ancestor-dependent CSS can break.",
        ],
        [
          "pinSpacing",
          "false omits the usual pin spacer padding, so later content may move underneath. Reserve that for deliberate overlap or provide your own layout spacing; the pinned example keeps spacing enabled.",
        ],
        [
          "pinType",
          '"transform" or "fixed" overrides the pinning strategy. Normally let ScrollTrigger choose based on the scroller and layout; forcing a type is an advanced integration choice.',
        ],
        [
          "pinnedContainer",
          "Identifies an ancestor pinned by another trigger so a non-pinning child trigger can account for that offset. It does not enable nested pinning, which is unsupported.",
        ],
        [
          "preventOverlaps",
          "true completes preceding ScrollTrigger animations as a new animation is about to activate. A matching string limits this behavior to a group; it does not detect physical overlap between DOM elements.",
        ],
        [
          "once",
          'true uses one-way "play none none none" behavior and removes the ScrollTrigger after its end is reached, without killing the associated animation. It is an alternative to the replay/reset behavior in the first example.',
        ],
        [
          "endTrigger",
          "A selector or element supplying the geometry for end when that differs from trigger.",
        ],
        [
          "horizontal",
          "true measures native horizontal scrolling instead of vertical scrolling, using left/right coordinates. A track translated by vertical scrolling uses containerAnimation instead.",
        ],
        [
          "invalidateOnRefresh",
          "true clears recorded values on the associated animation during refresh so function-based measurements can be recalculated. It is not a request to remeasure on every scroll event.",
        ],
        [
          "refreshPriority",
          "Higher values, such as 1, refresh before default-priority 0. Prefer creating triggers in page order; use this when pin-dependent measurements need a deliberate order.",
        ],
        [
          "onEnter",
          "Runs when forward scrolling crosses start into the range. The callback receives the ScrollTrigger instance.",
        ],
        [
          "onLeave",
          "Runs when forward scrolling crosses end out of the range; receives the instance.",
        ],
        [
          "onEnterBack",
          "Runs when backward scrolling crosses end back into the range; receives the instance.",
        ],
        [
          "onLeaveBack",
          "Runs when backward scrolling crosses start out of the range; receives the instance.",
        ],
        [
          "onUpdate",
          "Runs when trigger progress changes; receives the instance. Numeric scrub can continue animating afterward, so use the animation’s own onUpdate when tracking its rendered values.",
        ],
        [
          "onToggle",
          "Reports active/inactive changes. A jump across the entire range in one update can leave that state unchanged, so this is not a guaranteed substitute for every crossing callback.",
        ],
        [
          "onRefresh",
          "Runs after the trigger’s geometry is recalculated, typically on refresh or resize; receives the instance.",
        ],
        [
          "onRefreshInit",
          "Runs before refresh measurements begin. This image option is supported by the tested GSAP 3.15.0 implementation.",
        ],
        [
          "onScrubComplete",
          "Runs when a numeric scrub finishes catching up. It is separate from snap completion and does not describe reaching the end of the scroll range.",
        ],
      ],
      methods: [
        {
          name: "scrollTrigger configuration",
          kind: "pattern",
          scope: "Plugin configuration · module setup",
          explanation:
            "Connects an animation to measured scroll boundaries, either triggering playback at crossings or mapping progress to scrolling. Use the configuration to coordinate a reveal, a scrubbed pinned scene, or a child animation inside a moving container.",
          note: "Import and register ScrollTrigger before creating these animations. Keep essential content and controls usable without motion, remove development markers before shipping, and dispose of owned triggers and animations when their component is removed; these standalone practice pages reset on reload. Pinning, snapping, and containerAnimation have different constraints, documented in the reference above.",
          examples: [
            {
              label:
                "Toggle a reveal at boundaries and report crossings — src/main.js",
              code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\n\ngsap.registerPlugin(ScrollTrigger);\n\nconst root = document.createElement("div");\nroot.innerHTML = `\n  <style>.scroll-reveal.active { outline: 2px solid royalblue; }</style>\n  <div style="height:100vh"></div>\n  <section class="scroll-reveal" style="min-height:320px;padding:16px">\n    <div data-box aria-hidden="true"\n      style="width:64px;height:64px;background:royalblue"></div>\n    <p data-status>Scroll to enter the scene.</p>\n  </section>\n  <div style="height:150vh"></div>\n`;\ndocument.body.append(root);\nconst section = root.querySelector("section");\nconst status = root.querySelector("[data-status]");\n\nconst anim = gsap.fromTo(root.querySelector("[data-box]"),\n  { x: 0, opacity: 0.3 },\n  {\n    x: 100, opacity: 1, duration: 1,\n    scrollTrigger: {\n      trigger: section,\n      start: "top center",\n      end: "+=300",\n      markers: true, // Development only; remove before release.\n      toggleActions: "play pause resume reset",\n      toggleClass: "active",\n      fastScrollEnd: true,\n      preventOverlaps: "reveal-group",\n      id: "reveal-demo",\n      onEnter: () => { status.textContent = "Entered forward"; },\n      onLeave: () => { status.textContent = "Left forward"; },\n      onEnterBack: () => { status.textContent = "Entered backward"; },\n      onLeaveBack: () => { status.textContent = "Left backward"; },\n      onToggle: self => { section.dataset.active = String(self.isActive); }\n    }\n  }\n);',
            },
            {
              label:
                "Pin a scrubbed scene and snap to progress steps — src/main.js",
              code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\n\ngsap.registerPlugin(ScrollTrigger);\n\nconst root = document.createElement("div");\nroot.innerHTML = `\n  <div style="height:100vh"></div>\n  <section style="height:360px;padding:16px;box-sizing:border-box;background:#eee">\n    <div data-box aria-hidden="true"\n      style="width:64px;height:64px;background:royalblue"></div>\n    <p data-status>Scroll through the pinned scene.</p>\n  </section>\n  <div style="height:150vh"></div>\n`;\ndocument.body.append(root);\nconst panel = root.querySelector("section");\nconst box = root.querySelector("[data-box]");\nconst status = root.querySelector("[data-status]");\n\nconst anim = gsap.to(box, {\n  x: () => Math.max(0, panel.clientWidth - box.offsetWidth - 32),\n  ease: "none",\n  scrollTrigger: {\n    trigger: panel,\n    start: "top top",\n    end: "+=500",\n    scrub: 0.5,\n    pin: true, // Pin the panel; animate its child, not the panel itself.\n    pinSpacing: true,\n    anticipatePin: 1,\n    invalidateOnRefresh: true,\n    refreshPriority: 1,\n    id: "pinned-demo",\n    snap: {\n      snapTo: 1 / 10,\n      duration: 0.5,\n      directional: true,\n      ease: "power3",\n      onStart: () => { status.textContent = "Snapping"; },\n      onInterrupt: () => { status.textContent = "Snap interrupted"; },\n      onComplete: () => { status.textContent = "Snap complete"; }\n    },\n    onUpdate: self => { panel.dataset.progress = self.progress.toFixed(2); },\n    onRefreshInit: () => { panel.dataset.measuring = "true"; },\n    onRefresh: () => { panel.dataset.measuring = "false"; },\n    onScrubComplete: () => { panel.dataset.caughtUp = "true"; }\n  }\n});',
            },
            {
              label:
                "Reveal a child inside a horizontal containerAnimation — src/main.js",
              code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\n\ngsap.registerPlugin(ScrollTrigger);\n\nconst root = document.createElement("div");\nroot.innerHTML = `\n  <div style="height:100vh"></div>\n  <section data-viewport style="height:320px;overflow:hidden">\n    <div data-track style="display:flex;width:200%;height:100%">\n      <div style="flex:0 0 50%;box-sizing:border-box;background:#eee">First panel</div>\n      <div data-panel style="flex:0 0 50%;box-sizing:border-box;background:#ddd">\n        Second panel\n        <div data-box aria-hidden="true"\n          style="width:64px;height:64px;background:royalblue"></div>\n      </div>\n    </div>\n  </section>\n  <div style="height:150vh"></div>\n`;\ndocument.body.append(root);\nconst viewport = root.querySelector("[data-viewport]");\nconst track = root.querySelector("[data-track]");\nconst panel = root.querySelector("[data-panel]");\n\nconst travel = gsap.to(track, {\n  x: () => -viewport.clientWidth,\n  ease: "none", // Required for containerAnimation measurements.\n  scrollTrigger: {\n    trigger: viewport, start: "top top", end: "+=800",\n    pin: true, scrub: true, invalidateOnRefresh: true, id: "horizontal-parent"\n  }\n});\n\nconst reveal = gsap.fromTo(root.querySelector("[data-box]"),\n  { opacity: 0.25, scale: 0.7 },\n  {\n    opacity: 1, scale: 1, ease: "none",\n    scrollTrigger: {\n      trigger: panel,\n      containerAnimation: travel,\n      start: "left 80%",\n      end: "left 20%",\n      scrub: true,\n      id: "horizontal-child"\n      // No pin or snap on this containerAnimation-based child trigger.\n    }\n  }\n);',
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
        },
      ],
    },
    {
      name: "Misc…",
      id: "misc",
      intro:
        "These entries follow the image’s order: read properties, set defaults, configure the engine, register an effect, add/remove ticker listeners, then use quickSetter and quickTo. They use core GSAP and the shared browser fixture. Global defaults/configuration and registered effects persist for the lifetime of the page; reload between examples. The control button stops listener-driven demonstrations.",
      referenceTitle: "Configuration and reusable-effect fields from the image",
      referenceCaption:
        "Miscellaneous options, units, and lifecycle distinctions",
      options: [
        [
          "autoSleep: 60",
          "Checks for an idle ticker every 60 frames; this does not set FPS or a 60-second timeout.",
        ],
        [
          "force3D: false",
          "Disables GSAP’s automatic use of 3D transform components. Measure the actual scene before choosing a global rendering policy.",
        ],
        [
          "nullTargetWarn: false",
          "Suppresses missing-target warnings. It does not make a missing target usable.",
        ],
        [
          "trialWarn: false",
          "Retained here as the image’s legacy trial-build setting. The tested GSAP 3.15.0 core does not read it, so the working example leaves it commented out.",
        ],
        [
          "units",
          'Sets default CSS units for properties such as left and top when values omit a suffix. The image also sets rotation: "rad", but numeric transform rotation still uses degrees in the tested 3.15.0 core; use an explicit "rad" string for conversion.',
        ],
        [
          "name / effect",
          "Registers a named factory. The effect receives normalized targets and merged config and returns the animation it constructs.",
        ],
        [
          "defaults / extendTimeline",
          "Effect defaults fill missing config values. extendTimeline: true adds the effect name to Timeline so tl.fade(...) inserts its returned animation.",
        ],
        [
          "Ticker callback arguments",
          "time is seconds, deltaTime is milliseconds, and frame is the ticker’s frame counter. They are not interchangeable units.",
        ],
        [
          "Immediate vs animated writes",
          "quickSetter writes immediately. quickTo uses one tween to animate toward new values. For a fixed-position follower, clientX matches its viewport-based coordinates.",
        ],
      ],
      methods: [
        {
          name: "gsap.getProperty()",
          explanation:
            "Reads a current property value from a target, returning a number when the value can be represented numerically. Use it to inspect GSAP-managed transforms without parsing a transform matrix.",
          note: 'Supplying a unit such as "px" returns a unit-bearing string. A selector resolves to its first matching target; omit the property to create a reusable getter for that target.',
          examples: [
            {
              label: "Read a number or a value with units",
              code: 'gsap.set(".box", { x: 20 });\nconsole.log(gsap.getProperty(".box", "x")); // 20\nconsole.log(gsap.getProperty(".box", "x", "px")); // "20px"',
            },
            {
              label: "Reuse a getter for one element",
              code: 'const box = document.querySelector(".box");\ngsap.set(box, { x: 30, rotation: 45 });\nconst read = gsap.getProperty(box);\nconsole.log(read("x")); // 30\nconsole.log(read("rotation")); // 45',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.getProperty()/",
        },
        {
          name: "gsap.defaults()",
          explanation:
            "Sets global default tween properties such as duration and ease for subsequently created animations. Use it at application setup when those choices should apply broadly.",
          note: "Explicit tween values override inherited defaults. These settings affect other features too; prefer timeline-local defaults for reusable components. Calling without arguments reads the defaults object, so copy it before saving a snapshot.",
          examples: [
            {
              label: "Set shared duration and easing",
              code: 'gsap.defaults({ ease: "power2.in", duration: 1 });\nconst anim = gsap.to(".box", { x: 100 });\n// This tween inherits duration: 1 and ease: "power2.in".',
            },
            {
              label: "Override a tween and restore prior global defaults",
              code: 'const previous = { ...gsap.defaults() };\ngsap.defaults({ ease: "power2.in", duration: 1 });\nconst anim = gsap.to(".box", {\n  x: 100,\n  duration: 0.25,\n  ease: "none"\n});\ngsap.defaults(previous); // Restore defaults for future tweens.\n// The already-created anim retains its explicit settings.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.defaults()/",
        },
        {
          name: "gsap.config()",
          explanation:
            "Changes engine-wide settings rather than the destination values of an individual tween. Use it for deliberate configuration such as default units or warning behavior.",
          note: "Changes persist globally and omitted settings remain unchanged. autoSleep counts frames between idle checks, not seconds; force3D is not a universal performance fix. The image’s trialWarn flag is legacy and is not consumed by the tested GSAP 3.15.0 core.",
          examples: [
            {
              label:
                "Configure idle checks, transform strategy, and target warnings",
              code: "gsap.config({\n  autoSleep: 60,\n  force3D: false,\n  nullTargetWarn: false\n  // trialWarn: false was used by older trial builds, not the 3.15.0 core.\n});\n// Suppressing warnings does not create or fix missing targets.",
            },
            {
              label: "Set CSS unit defaults and explicit rotation radians",
              code: 'const box = document.querySelector(".box");\nbox.style.position = "relative";\ngsap.config({ units: { left: "%", top: "%", rotation: "rad" } });\ngsap.set(box, { left: 10, top: 0, rotation: `${Math.PI}rad` });\n// left: 10%; the explicit radian string rotates by 180 degrees.\n// In the tested core, numeric rotation still uses degrees; supply "rad" explicitly.\n// Reload the practice page before running an unrelated example.',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.config()/",
        },
        {
          name: "gsap.registerEffect()",
          explanation:
            "Registers a named animation factory for reuse through gsap.effects. Use it to share a small animation convention without repeating its implementation.",
          note: "GSAP normalizes targets to an array and merges the effect’s defaults with each supplied config. Return a Tween or Timeline when extendTimeline is true; it adds a timeline method that inserts the returned animation. Register once under a name that will not collide with another effect.",
          examples: [
            {
              label: "Register and call an effect through gsap.effects",
              code: 'gsap.registerEffect({\n  name: "fade",\n  effect: (targets, config) => {\n    return gsap.to(targets, { duration: config.duration, opacity: 0 });\n  },\n  defaults: { duration: 2 },\n  extendTimeline: true\n});\n\nconst anim = gsap.effects.fade(".box"); // Uses the 2-second default.',
            },
            {
              label: "Use the generated timeline method with a config override",
              code: 'gsap.registerEffect({\n  name: "fade",\n  effect: (targets, config) => {\n    return gsap.to(targets, { duration: config.duration, opacity: 0 });\n  },\n  defaults: { duration: 2 },\n  extendTimeline: true\n});\n\nconst tl = gsap.timeline({ paused: true });\ntl.fade(".box", { duration: 3 })\n  .fade(".card", { duration: 0.5 }); // Append a second effect.\ntl.play();',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.registerEffect()/",
        },
        {
          name: "gsap.ticker.add()",
          explanation:
            "Adds a callback to GSAP’s rendering tick so custom work can stay in step with animations. Use it to redraw a renderer or update a small display from animated state.",
          note: "By default listeners run after GSAP’s core update. Arguments are time in seconds, deltaTime in milliseconds, and the tick frame number. Keep work small and remove a persistent listener when it is no longer needed; this is not a wall-clock timer.",
          examples: [
            {
              label:
                "Inspect ticker arguments until the control button is clicked",
              code: 'const output = document.querySelector("#value");\nfunction myFunction(time, deltaTime, frame) {\n  output.textContent = `${time.toFixed(2)}s / ${deltaTime.toFixed(1)}ms / frame ${frame}`;\n}\ngsap.ticker.add(myFunction);\ndocument.querySelector("#control").onclick = () => gsap.ticker.remove(myFunction);',
            },
            {
              label:
                "Render animated object state and remove the listener on completion",
              code: 'const state = { x: 0 };\nconst box = document.querySelector(".box");\nfunction draw() {\n  box.style.transform = `translateX(${state.x}px)`;\n}\ngsap.ticker.add(draw);\nconst anim = gsap.to(state, {\n  x: 100,\n  duration: 1,\n  ease: "none",\n  onComplete: () => {\n    draw(); // Commit the final value before removing the listener.\n    gsap.ticker.remove(draw);\n  }\n});',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.ticker/",
        },
        {
          name: "gsap.ticker.remove()",
          explanation:
            "Removes a previously added ticker listener. Use it when stopping a feature or disposing a component so its callback does not keep running.",
          note: "Pass the same function reference used with add(); creating a new arrow function does not identify the original listener. This removes only that callback and does not stop GSAP’s animation engine or other listeners.",
          examples: [
            {
              label: "Stop a named listener",
              code: 'const output = document.querySelector("#value");\nlet frames = 0;\nfunction render() {\n  output.textContent = String(++frames);\n}\ngsap.ticker.add(render);\ndocument.querySelector("#control").onclick = () => {\n  gsap.ticker.remove(render);\n};',
            },
            {
              label: "Return cleanup from a mounted feature",
              code: 'function mountCounter(output) {\n  let frames = 0;\n  function update() {\n    output.textContent = String(++frames);\n  }\n  gsap.ticker.add(update);\n  return () => gsap.ticker.remove(update);\n}\n\nconst destroy = mountCounter(document.querySelector("#value"));\ndocument.querySelector("#control").onclick = destroy;',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.ticker/",
        },
        {
          name: "gsap.quickSetter()",
          explanation:
            "Creates a reusable function that writes a property immediately with low overhead. Use it for measured high-frequency updates to the same property and targets.",
          note: 'The returned function does not animate or add easing; supply its fixed unit, such as "px", when creating it. It skips conveniences such as relative-value parsing and unit conversion. The mouse example uses clientX for a fixed-position element and removes its listener with the control button.',
          examples: [
            {
              label: "Reuse one immediate setter",
              code: 'const setX = gsap.quickSetter(".box", "x", "px");\nsetX(20);\nsetX(80); // Immediately replace the previous value: x is now 80px.',
            },
            {
              label: "Follow mouse movement with immediate, bounded writes",
              code: 'const box = document.querySelector(".box");\nbox.style.cssText += ";position:fixed;left:0;top:120px;pointer-events:none";\nconst setX = gsap.quickSetter(box, "x", "px");\nfunction follow(event) {\n  const maxX = Math.max(0, innerWidth - box.offsetWidth);\n  setX(gsap.utils.clamp(0, maxX, event.clientX));\n}\ndocument.addEventListener("mousemove", follow);\ndocument.querySelector("#control").onclick = () => {\n  document.removeEventListener("mousemove", follow);\n};',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.quickSetter()/",
        },
        {
          name: "gsap.quickTo()",
          explanation:
            "Creates a function that repeatedly redirects one numeric property using a reused tween. Use it when frequent input should smoothly animate toward the latest value instead of jumping there.",
          note: "Requires GSAP 3.10+. Calls return the reused Tween, also exposed as the function’s .tween property. It uses its tween’s current value rather than rereading outside edits; avoid competing writers. Remove owned input listeners and stop the tween during teardown.",
          examples: [
            {
              label: "Redirect the same tween to a new destination",
              code: 'const xTo = gsap.quickTo(".box", "x", { duration: 0.4, ease: "power3" });\nconst first = xTo(40);\nconst second = xTo(120);\nconsole.log(first === second); // true: both calls reuse one Tween.',
            },
            {
              label: "Smooth mouse-following motion and clean it up",
              code: 'const box = document.querySelector(".box");\nbox.style.cssText += ";position:fixed;left:0;top:120px;pointer-events:none";\nconst xTo = gsap.quickTo(box, "x", { duration: 0.4, ease: "power3" });\nfunction follow(event) {\n  const maxX = Math.max(0, innerWidth - box.offsetWidth);\n  xTo(gsap.utils.clamp(0, maxX, event.clientX));\n}\ndocument.addEventListener("mousemove", follow);\ndocument.querySelector("#control").onclick = () => {\n  document.removeEventListener("mousemove", follow);\n  xTo.tween.kill();\n};',
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.quickTo()/",
        },
      ],
    },
    {
      name: "Plugins",
      id: "plugins",
      intro:
        "Plugins extend the core; import and register only what you need, once before use. The list follows your image, including development tools. JavaScript examples are standalone ES modules: replace src/main.js in the Installation npm/Vite project and run one example on a fresh page. EaselJS and PixiJS examples are complete HTML files with their own dependencies. All GSAP examples target 3.15.0; check the linked references and current license before adopting another release.",
      setup: [
        {
          label: "Import and register plugins before creating animations",
          code: 'import { gsap } from "gsap";\nimport { Draggable } from "gsap/Draggable";\nimport { TextPlugin } from "gsap/TextPlugin";\ngsap.registerPlugin(Draggable, TextPlugin);',
          language: "javascript",
        },
      ],
      options: [],
      methods: [
        {
          name: "Draggable",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Makes an element respond to mouse, touch, and pointer dragging. Use it for bounded sliders, draggable cards, or rotational controls.",
          note: "create() returns an array of Draggable instances. Retain the instance and call kill() when the component is removed; inertia requires InertiaPlugin. Provide buttons or keyboard controls for essential actions.",
          examples: [
            {
              label: "Module: drag within explicit bounds",
              code: 'import { gsap } from "gsap";\nimport { Draggable } from "gsap/Draggable";\ngsap.registerPlugin(Draggable);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nconst [drag] = Draggable.create(box, {\n  type: "x,y",\n  bounds: { minX: 0, maxX: 200, minY: 0, maxY: 120 }\n});\n// On component teardown: drag.kill();',
              language: "javascript",
            },
            {
              label: "Module: snap a horizontal drag on release",
              code: 'import { gsap } from "gsap";\nimport { Draggable } from "gsap/Draggable";\ngsap.registerPlugin(Draggable);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nconst [drag] = Draggable.create(box, {\n  type: "x",\n  bounds: { minX: 0, maxX: 200 },\n  onDragEnd() {\n    gsap.to(this.target, {\n      x: gsap.utils.snap(50, this.x),\n      duration: 0.2,\n      onUpdate: () => this.update()\n    });\n  }\n});\n// On teardown: gsap.killTweensOf(box); drag.kill();',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/Draggable/",
        },
        {
          name: "DrawSVGPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Animates how much of an SVG stroke is visible, creating line-drawing and traveling-stroke effects. It controls the stroke dash values, rather than changing the shape.",
          note: 'Use inline SVG with a visible stroke; fills are unaffected. A pair such as "25% 75%" defines the visible segment, while "0% 100%" shows the whole stroke.',
          examples: [
            {
              label: "Module: draw a complete stroke",
              code: 'import { gsap } from "gsap";\nimport { DrawSVGPlugin } from "gsap/DrawSVGPlugin";\ngsap.registerPlugin(DrawSVGPlugin);\n\nconst svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");\nsvg.setAttribute("viewBox", "0 0 300 180");\nsvg.style.cssText = "width:300px;max-width:100%;display:block";\nsvg.innerHTML = \'<path d="M20,90 Q150,10 280,90" fill="none" stroke="royalblue" stroke-width="6" />\';\ndocument.body.append(svg);\nconst path = svg.querySelector("path");\ngsap.fromTo(path, { drawSVG: "0%" }, {\n  drawSVG: "100%",\n  duration: 1.5,\n  ease: "none"\n});',
              language: "javascript",
            },
            {
              label: "Module: move a short segment along the path",
              code: 'import { gsap } from "gsap";\nimport { DrawSVGPlugin } from "gsap/DrawSVGPlugin";\ngsap.registerPlugin(DrawSVGPlugin);\n\nconst svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");\nsvg.setAttribute("viewBox", "0 0 300 180");\nsvg.style.cssText = "width:300px;max-width:100%;display:block";\nsvg.innerHTML = \'<path d="M20,90 Q150,10 280,90" fill="none" stroke="royalblue" stroke-width="6" />\';\ndocument.body.append(svg);\nconst path = svg.querySelector("path");\ngsap.fromTo(path, { drawSVG: "0% 20%" }, {\n  drawSVG: "80% 100%",\n  duration: 1.5,\n  ease: "none",\n  repeat: 1,\n  yoyo: true\n});',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/",
        },
        {
          name: "EaselPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Adds animation of EaselJS color filters and MovieClip frames. Use it when working with CreateJS canvas content; ordinary numeric properties such as x do not require the plugin.",
          note: "These complete HTML examples load EaselJS 1.0.0 before GSAP 3.15.0. Cached shapes are needed for filters; the stage must redraw on every tick. Remove the ticker callback and kill active tweens on teardown.",
          examples: [
            {
              label: "HTML: tint a cached EaselJS shape",
              code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>EaselJS animation</title>\n<canvas id="stage" width="300" height="180" aria-label="Animated colored circle"></canvas>\n<script src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/EaselPlugin.min.js"></script>\n<script>\n  gsap.registerPlugin(EaselPlugin);\n  EaselPlugin.registerCreateJS(createjs);\n  const stage = new createjs.Stage("stage");\n  const circle = new createjs.Shape();\n  circle.graphics.beginFill("royalblue").drawCircle(0, 0, 45);\n  circle.x = 150;\n  circle.y = 90;\n  circle.cache(-46, -46, 92, 92); // Filters need a cached object.\n  stage.addChild(circle);\n  const render = () => stage.update();\n  gsap.ticker.add(render);\n  gsap.to(circle, {\n    duration: 2,\n    easel: { tint: "#ff6600" },\n    onComplete: () => {\n      stage.update();\n      gsap.ticker.remove(render);\n    }\n  });\n</script>\n</html>',
              language: "html",
            },
            {
              label: "HTML: desaturate a cached EaselJS shape",
              code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>EaselJS animation</title>\n<canvas id="stage" width="300" height="180" aria-label="Animated colored circle"></canvas>\n<script src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/EaselPlugin.min.js"></script>\n<script>\n  gsap.registerPlugin(EaselPlugin);\n  EaselPlugin.registerCreateJS(createjs);\n  const stage = new createjs.Stage("stage");\n  const circle = new createjs.Shape();\n  circle.graphics.beginFill("royalblue").drawCircle(0, 0, 45);\n  circle.x = 150;\n  circle.y = 90;\n  circle.cache(-46, -46, 92, 92); // Filters need a cached object.\n  stage.addChild(circle);\n  const render = () => stage.update();\n  gsap.ticker.add(render);\n  gsap.to(circle, {\n    duration: 2,\n    easel: { saturation: 0 },\n    onComplete: () => {\n      stage.update();\n      gsap.ticker.remove(render);\n    }\n  });\n</script>\n</html>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/EaselPlugin/",
        },
        {
          name: "Flip",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Animates between layouts by recording an element’s old position and size, applying a DOM change, and transforming it back toward its new layout. Use it for grid changes, reordering, and moving elements between containers.",
          note: "FLIP means First, Last, Invert, Play. Capture state before the change, then call Flip.from() afterward; use transform-based scaling when appropriate. Keep DOM changes in the correct order.",
          examples: [
            {
              label: "Module: animate a size change",
              code: 'import { gsap } from "gsap";\nimport { Flip } from "gsap/Flip";\ngsap.registerPlugin(Flip);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nconst state = Flip.getState(box);\nbox.style.width = "200px";\nbox.style.height = "100px";\nFlip.from(state, { duration: 0.7, scale: true, ease: "power2.inOut" });',
              language: "javascript",
            },
            {
              label: "Module: animate a DOM reorder",
              code: 'import { gsap } from "gsap";\nimport { Flip } from "gsap/Flip";\ngsap.registerPlugin(Flip);\n\nconst row = document.createElement("div");\nrow.style.cssText = "display:flex;gap:12px";\nfor (const color of ["royalblue", "coral", "seagreen"]) {\n  const card = document.createElement("div");\n  card.style.cssText = `width:64px;height:64px;background:${color}`;\n  row.append(card);\n}\ndocument.body.append(row);\nconst cards = [...row.children];\nconst state = Flip.getState(cards);\nrow.prepend(row.lastElementChild);\nFlip.from(state, { duration: 0.7, ease: "power2.inOut" });',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/Flip/",
        },
        {
          name: "GSDevTools",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Adds a playback interface for inspecting and debugging animations. Use its scrubber and speed controls to review a tween or timeline while developing.",
          note: "Bind the tools to a specific animation and disable globalSync for an isolated demo. Keep this UI in development builds; retain the returned instance and kill() it during teardown.",
          examples: [
            {
              label: "Module: inspect a single tween",
              code: 'import { gsap } from "gsap";\nimport { GSDevTools } from "gsap/GSDevTools";\ngsap.registerPlugin(GSDevTools);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nconst anim = gsap.to(box, { x: 200, duration: 2, ease: "power2.inOut" });\nconst tools = GSDevTools.create({ animation: anim, globalSync: false });\n// On teardown: tools.kill(); anim.kill();',
              language: "javascript",
            },
            {
              label:
                "Module: inspect a labeled sequence in a compact interface",
              code: 'import { gsap } from "gsap";\nimport { GSDevTools } from "gsap/GSDevTools";\ngsap.registerPlugin(GSDevTools);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nconst tl = gsap.timeline({ id: "card-sequence" });\ntl.addLabel("move")\n  .to(box, { x: 180, duration: 1 })\n  .addLabel("turn")\n  .to(box, { rotation: 90, duration: 0.7 });\nconst tools = GSDevTools.create({\n  animation: tl,\n  globalSync: false,\n  minimal: true\n});\n// On teardown: tools.kill(); tl.kill();',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/GSDevTools/",
        },
        {
          name: "InertiaPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Continues motion from an initial velocity and decelerates to a resting value. Use it for momentum after dragging or for a smooth throw with constrained end positions.",
          note: "Velocity is in property units per second. min/max constrain the resting position; this is not a collision solver. Draggable’s inertia option needs both plugins registered.",
          examples: [
            {
              label: "Module: throw a box toward a bounded resting position",
              code: 'import { gsap } from "gsap";\nimport { InertiaPlugin } from "gsap/InertiaPlugin";\ngsap.registerPlugin(InertiaPlugin);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\ngsap.to(box, {\n  inertia: { x: { velocity: 450, min: 0, max: 200 } }\n});',
              language: "javascript",
            },
            {
              label: "Module: continue a drag with momentum",
              code: 'import { gsap } from "gsap";\nimport { Draggable } from "gsap/Draggable";\nimport { InertiaPlugin } from "gsap/InertiaPlugin";\ngsap.registerPlugin(Draggable, InertiaPlugin);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nconst [drag] = Draggable.create(box, {\n  type: "x",\n  bounds: { minX: 0, maxX: 200 },\n  inertia: true\n});\n// Drag and release; on teardown: drag.kill();',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/InertiaPlugin/",
        },
        {
          name: "MorphSVGPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Changes one SVG path shape into another, including paths with different numbers of points. Use it for icon transitions and shape transformations.",
          note: "Use inline SVG paths. Other basic shapes can be converted with convertToPath(); this plugin changes geometry, while DrawSVGPlugin changes stroke visibility. Choose shapeIndex when automatic point matching needs adjustment.",
          examples: [
            {
              label: "Module: morph a path using SVG path data",
              code: 'import { gsap } from "gsap";\nimport { MorphSVGPlugin } from "gsap/MorphSVGPlugin";\ngsap.registerPlugin(MorphSVGPlugin);\n\nconst svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");\nsvg.setAttribute("viewBox", "0 0 300 180");\nsvg.style.cssText = "width:300px;max-width:100%;display:block";\nsvg.innerHTML = \'<path d="M20,90 Q150,10 280,90" fill="none" stroke="royalblue" stroke-width="6" />\';\ndocument.body.append(svg);\nconst path = svg.querySelector("path");\npath.setAttribute("d", "M40,30 L250,30 L250,150 L40,150 Z");\npath.setAttribute("fill", "royalblue");\ngsap.to(path, {\n  morphSVG: "M150,20 L280,150 L20,150 Z",\n  duration: 1.2\n});',
              language: "javascript",
            },
            {
              label: "Module: convert a circle, then morph the returned path",
              code: 'import { gsap } from "gsap";\nimport { MorphSVGPlugin } from "gsap/MorphSVGPlugin";\ngsap.registerPlugin(MorphSVGPlugin);\n\nconst svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");\nsvg.setAttribute("viewBox", "0 0 300 180");\nsvg.style.width = "300px";\nsvg.innerHTML = \'<circle cx="150" cy="90" r="60" fill="coral" />\';\ndocument.body.append(svg);\nconst [path] = MorphSVGPlugin.convertToPath(svg.querySelector("circle"));\ngsap.to(path, {\n  morphSVG: "M40,30 L260,30 L260,150 L40,150 Z",\n  duration: 1.2\n});',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/",
        },
        {
          name: "MotionPathPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Moves a target along an SVG path or an array of coordinates. Use it for curved travel, route illustrations, and objects that rotate to follow a path.",
          note: 'align places a target relative to a path even across coordinate systems; alignOrigin controls its anchor. autoRotate turns the target along the tangent, and ease: "none" keeps progress along the path linear.',
          examples: [
            {
              label: "Module: move through coordinate points",
              code: 'import { gsap } from "gsap";\nimport { MotionPathPlugin } from "gsap/MotionPathPlugin";\ngsap.registerPlugin(MotionPathPlugin);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\ngsap.to(box, {\n  duration: 2,\n  ease: "none",\n  motionPath: {\n    path: [{ x: 0, y: 0 }, { x: 100, y: 80 }, { x: 220, y: 0 }],\n    curviness: 1.5\n  }\n});',
              language: "javascript",
            },
            {
              label: "Module: align an SVG marker to a drawn route",
              code: 'import { gsap } from "gsap";\nimport { MotionPathPlugin } from "gsap/MotionPathPlugin";\ngsap.registerPlugin(MotionPathPlugin);\n\nconst svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");\nsvg.setAttribute("viewBox", "0 0 300 180");\nsvg.style.cssText = "width:300px;max-width:100%;display:block";\nsvg.innerHTML = \'<path d="M20,90 Q150,10 280,90" fill="none" stroke="royalblue" stroke-width="6" />\';\ndocument.body.append(svg);\nconst path = svg.querySelector("path");\nconst marker = document.createElementNS(svg.namespaceURI, "rect");\nmarker.setAttribute("width", "18");\nmarker.setAttribute("height", "10");\nmarker.setAttribute("fill", "coral");\nsvg.append(marker);\ngsap.to(marker, {\n  duration: 2,\n  ease: "none",\n  motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true }\n});',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/MotionPathPlugin/",
        },
        {
          name: "MotionPathHelper",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Adds an interactive editor for authoring motion paths in the browser. Use it during development to adjust control points and copy the resulting SVG path data.",
          note: "Register MotionPathPlugin as well. Pass a motion-path tween to edit its route, or pass an element to create a route; remove the helper from production and kill() it on teardown.",
          examples: [
            {
              label: "Module: create an editable route for an element",
              code: 'import { gsap } from "gsap";\nimport { MotionPathPlugin } from "gsap/MotionPathPlugin";\nimport { MotionPathHelper } from "gsap/MotionPathHelper";\ngsap.registerPlugin(MotionPathPlugin, MotionPathHelper);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nconst helper = MotionPathHelper.create(box, {\n  duration: 3,\n  pathColor: "coral"\n});\n// Edit the curve, then use COPY MOTION PATH.\n// On teardown: helper.kill(); gsap.killTweensOf(box);',
              language: "javascript",
            },
            {
              label: "Module: edit an existing motion-path tween",
              code: 'import { gsap } from "gsap";\nimport { MotionPathPlugin } from "gsap/MotionPathPlugin";\nimport { MotionPathHelper } from "gsap/MotionPathHelper";\ngsap.registerPlugin(MotionPathPlugin, MotionPathHelper);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nconst anim = gsap.to(box, {\n  duration: 3,\n  ease: "none",\n  motionPath: [{ x: 0, y: 0 }, { x: 120, y: 90 }, { x: 220, y: 0 }]\n});\nconst helper = MotionPathHelper.create(anim);\n// On teardown: helper.kill(); anim.kill();',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/MotionPathHelper/",
        },
        {
          name: "Observer",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Normalizes wheel, touch, and pointer input into callbacks such as onChange and onDrag. Use it when different input devices should drive the same custom interaction.",
          note: "Observer reports input; it does not create a scroll animation by itself. Scope interception to a dedicated control, provide a keyboard alternative, and kill() the observer on teardown.",
          examples: [
            {
              label: "Module: respond to wheel input in a focusable control",
              code: 'import { gsap } from "gsap";\nimport { Observer } from "gsap/Observer";\ngsap.registerPlugin(Observer);\n\nconst pad = document.createElement("button");\npad.type = "button";\npad.textContent = "Wheel here, or click, to rotate";\npad.style.cssText = "display:block;width:240px;height:120px";\ndocument.body.append(pad);\nlet angle = 0;\nconst turn = (delta) => gsap.to(pad, {\n  rotation: angle += delta, duration: 0.3, overwrite: true\n});\nconst observer = Observer.create({\n  target: pad,\n  type: "wheel",\n  preventDefault: true,\n  onChangeY: (self) => turn(Math.sign(self.deltaY) * 15)\n});\npad.addEventListener("click", () => turn(15));\n// On teardown: observer.kill(); gsap.killTweensOf(pad);',
              language: "javascript",
            },
            {
              label: "Module: read drag deltas with an accessible reset",
              code: 'import { gsap } from "gsap";\nimport { Observer } from "gsap/Observer";\ngsap.registerPlugin(Observer);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nbox.style.touchAction = "none";\nconst reset = document.createElement("button");\nreset.textContent = "Reset position";\nreset.type = "button";\ndocument.body.append(reset);\nconst observer = Observer.create({\n  target: box,\n  type: "touch,pointer",\n  onDrag: (self) => gsap.set(box, { x: `+=${self.deltaX}` })\n});\nreset.addEventListener("click", () => gsap.set(box, { x: 0 }));\n// This is a decorative drag demo; do not make dragging an essential action.\n// On teardown: observer.kill();',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/Observer/",
        },
        {
          name: "Physics2DPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Calculates x/y motion from velocity, angle, gravity, and optional friction. Use it for thrown particles or ballistic effects without manually calculating every frame.",
          note: "Velocity is pixels per second and gravity is acceleration; positive y points down. This is trajectory math, not a physics engine: it does not detect collisions or apply bouncing automatically, and easing does not govern these properties.",
          examples: [
            {
              label: "Module: throw a box on an arc",
              code: 'import { gsap } from "gsap";\nimport { Physics2DPlugin } from "gsap/Physics2DPlugin";\ngsap.registerPlugin(Physics2DPlugin);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\ngsap.to(box, {\n  duration: 1,\n  physics2D: { velocity: 220, angle: -60, gravity: 400 }\n});',
              language: "javascript",
            },
            {
              label: "Module: slow a horizontal particle with friction",
              code: 'import { gsap } from "gsap";\nimport { Physics2DPlugin } from "gsap/Physics2DPlugin";\ngsap.registerPlugin(Physics2DPlugin);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\ngsap.to(box, {\n  duration: 2,\n  physics2D: { velocity: 250, angle: 0, friction: 0.04 }\n});',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/Physics2DPlugin/",
        },
        {
          name: "PhysicsPropsPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Applies velocity, acceleration, or friction to individual numeric properties. Use it for physics-like changes beyond a 2D trajectory, such as rotation or a displayed counter.",
          note: "Velocity is units per second; acceleration changes that velocity over time. Friction is an approximate damping factor from 0 to 1, and easing is ignored for physics-driven properties.",
          examples: [
            {
              label: "Module: accelerate rotation",
              code: 'import { gsap } from "gsap";\nimport { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";\ngsap.registerPlugin(PhysicsPropsPlugin);\n\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\ngsap.to(box, {\n  duration: 1,\n  physicsProps: { rotation: { velocity: 90, acceleration: 180 } }\n});',
              language: "javascript",
            },
            {
              label: "Module: update a counter from a decaying velocity",
              code: 'import { gsap } from "gsap";\nimport { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";\ngsap.registerPlugin(PhysicsPropsPlugin);\n\nconst output = document.createElement("output");\ndocument.body.append(output);\nconst state = { value: 0 };\ngsap.to(state, {\n  duration: 2,\n  physicsProps: { value: { velocity: 100, friction: 0.03 } },\n  onUpdate: () => { output.textContent = state.value.toFixed(1); }\n});',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/PhysicsPropsPlugin/",
        },
        {
          name: "PixiPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Animates PixiJS properties through a convenient pixi object, including nested transforms and colors. Use it with canvas/WebGL scenes; rotations inside pixi are expressed in degrees.",
          note: "Register the PIXI namespace before animating. These complete HTML demos intentionally pin PixiJS 7.4.3 with GSAP 3.15.0; PixiJS 8 has a different asynchronous application setup, so do not mix the initialization code across majors. A renderer-capable browser is required.",
          examples: [
            {
              label: "HTML: animate a PixiJS sprite position and rotation",
              code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>PixiJS animation</title>\n<script src="https://cdn.jsdelivr.net/npm/pixi.js@7.4.3/dist/pixi.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/PixiPlugin.min.js"></script>\n<body>\n<script>\n  gsap.registerPlugin(PixiPlugin);\n  PixiPlugin.registerPIXI(PIXI);\n  const app = new PIXI.Application({ width: 300, height: 180, background: 0xeeeeee });\n  document.body.append(app.view);\n  app.view.setAttribute("aria-label", "Animated square");\n  const square = new PIXI.Sprite(PIXI.Texture.WHITE);\n  square.width = square.height = 50;\n  square.anchor.set(0.5);\n  square.position.set(80, 90);\n  app.stage.addChild(square);\n  gsap.to(square, { duration: 1.5, pixi: { x: 220, rotation: 180 } });\n  // On teardown: gsap.killTweensOf(square); app.destroy(true, { children: true });\n</script>\n</body>\n</html>',
              language: "html",
            },
            {
              label: "HTML: tween a sprite tint and opacity",
              code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>PixiJS animation</title>\n<script src="https://cdn.jsdelivr.net/npm/pixi.js@7.4.3/dist/pixi.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/PixiPlugin.min.js"></script>\n<body>\n<script>\n  gsap.registerPlugin(PixiPlugin);\n  PixiPlugin.registerPIXI(PIXI);\n  const app = new PIXI.Application({ width: 300, height: 180, background: 0xeeeeee });\n  document.body.append(app.view);\n  app.view.setAttribute("aria-label", "Animated square");\n  const square = new PIXI.Sprite(PIXI.Texture.WHITE);\n  square.width = square.height = 50;\n  square.anchor.set(0.5);\n  square.position.set(80, 90);\n  app.stage.addChild(square);\n  gsap.to(square, { duration: 1.5, pixi: { tint: "#ff7f50", alpha: 0.4 } });\n  // On teardown: gsap.killTweensOf(square); app.destroy(true, { children: true });\n</script>\n</body>\n</html>',
              language: "html",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/PixiPlugin/",
        },
        {
          name: "ScrambleTextPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Replaces text through a temporary scramble of characters before revealing the final text. Use it for short decorative transitions rather than essential live status messages.",
          note: "chars controls the random character set and revealDelay delays the reveal. Keep a stable accessible label so screen readers do not announce random intermediate strings; avoid aria-live on the animated text and honor reduced-motion preferences.",
          examples: [
            {
              label: "Module: reveal text through a binary scramble",
              code: 'import { gsap } from "gsap";\nimport { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";\ngsap.registerPlugin(ScrambleTextPlugin);\n\nconst heading = document.createElement("h2");\nheading.textContent = "Make something move";\ndocument.body.append(heading);\nheading.setAttribute("aria-label", "Ready to launch");\ngsap.to(heading, {\n  duration: 1.5,\n  scrambleText: { text: "Ready to launch", chars: "01", revealDelay: 0.3 }\n});',
              language: "javascript",
            },
            {
              label:
                "Module: bypass the scramble when reduced motion is requested",
              code: 'import { gsap } from "gsap";\nimport { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";\ngsap.registerPlugin(ScrambleTextPlugin);\n\nconst heading = document.createElement("h2");\nheading.textContent = "Make something move";\ndocument.body.append(heading);\nconst finalText = "Welcome aboard";\nheading.setAttribute("aria-label", finalText);\nif (matchMedia("(prefers-reduced-motion: reduce)").matches) {\n  heading.textContent = finalText;\n} else {\n  gsap.to(heading, {\n    duration: 1,\n    scrambleText: { text: finalText, chars: "upperCase", speed: 0.4 }\n  });\n}',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/",
        },
        {
          name: "ScrollToPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Animates the native scroll position of the window or a scrollable element. Use it for buttons that travel to a section; ScrollTrigger instead responds to scroll position to control animations.",
          note: "Avoid CSS scroll-behavior: smooth on the same scroller. autoKill stops conflicting scroll tweens when the user scrolls; scrolling does not move keyboard focus automatically, so handle focus deliberately for navigation.",
          examples: [
            {
              label: "Module: navigate to a section with a header offset",
              code: 'import { gsap } from "gsap";\nimport { ScrollToPlugin } from "gsap/ScrollToPlugin";\ngsap.registerPlugin(ScrollToPlugin);\n\nconst section = document.createElement("section");\nsection.style.cssText = "margin-top:110vh;height:100vh;background:#eee;padding:24px";\nsection.textContent = "Destination section";\ndocument.body.append(section);\nconst button = document.createElement("button");\nbutton.textContent = "Go to section";\nbutton.type = "button";\ndocument.body.prepend(button);\nsection.tabIndex = -1;\nbutton.addEventListener("click", () => gsap.to(window, {\n  duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.8,\n  scrollTo: { y: section, offsetY: 24, autoKill: true },\n  onComplete: () => section.focus({ preventScroll: true })\n}));',
              language: "javascript",
            },
            {
              label: "Module: scroll a dedicated panel to its end",
              code: 'import { gsap } from "gsap";\nimport { ScrollToPlugin } from "gsap/ScrollToPlugin";\ngsap.registerPlugin(ScrollToPlugin);\n\nconst panel = document.createElement("div");\npanel.style.cssText = "height:160px;overflow:auto;scroll-behavior:auto";\npanel.tabIndex = 0;\npanel.setAttribute("role", "region");\npanel.setAttribute("aria-label", "Scrollable demo panel");\nconst content = document.createElement("p");\ncontent.style.height = "700px";\ncontent.textContent = "Long panel content";\npanel.append(content);\ndocument.body.append(panel);\ngsap.to(panel, { duration: 1, scrollTo: { y: "max", autoKill: true } });',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrollToPlugin/",
        },
        {
          name: "ScrollTrigger",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Connects an animation or callback to scroll positions. Use it for reveals, pinned sections, or animations whose progress follows scrolling; the separate ScrollTrigger category covers its detailed configuration.",
          note: "Register it explicitly and refresh after relevant layout changes. For production, use matchMedia() to provide reduced-motion and responsive alternatives; revert the context when removing a component.",
          examples: [
            {
              label: "Module: reveal a section once as it enters view",
              code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);\n\nconst section = document.createElement("section");\nsection.style.cssText = "margin-top:110vh;height:100vh;background:#eee;padding:24px";\nsection.textContent = "Destination section";\ndocument.body.append(section);\nconst ctx = gsap.context(() => {\n  gsap.from(section, {\n    y: 40,\n    autoAlpha: 0,\n    duration: 0.7,\n    scrollTrigger: { trigger: section, start: "top 85%", once: true }\n  });\n});\n// Scroll down; on teardown: ctx.revert();',
              language: "javascript",
            },
            {
              label: "Module: scrub a box across a scrolling section",
              code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);\n\nconst section = document.createElement("section");\nsection.style.cssText = "margin-top:110vh;height:100vh;background:#eee;padding:24px";\nsection.textContent = "Destination section";\ndocument.body.append(section);\nconst box = document.createElement("div");\nbox.style.cssText = "width:64px;height:64px;background:royalblue;margin:80px;";\ndocument.body.append(box);\nsection.append(box);\nconst ctx = gsap.context(() => {\n  gsap.to(box, {\n    x: 180,\n    ease: "none",\n    scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: true }\n  });\n});\n// Scroll down; on teardown: ctx.revert();',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
        },
        {
          name: "ScrollSmoother",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Adds smooth vertical scrolling and optional parallax effects on top of ScrollTrigger while using native scroll positions. Use it when a page-wide smoothing layer fits the experience.",
          note: "Requires ScrollTrigger and a wrapper containing the content. Keep fixed UI outside the wrapper; use one smoother per page and call kill() on teardown. These examples skip enhancement for reduced motion; touch smoothing stays at its default disabled setting.",
          examples: [
            {
              label:
                "Module: enable page smoothing with a reduced-motion fallback",
              code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\nimport { ScrollSmoother } from "gsap/ScrollSmoother";\ngsap.registerPlugin(ScrollTrigger, ScrollSmoother);\n\n// Run on a fresh page; only one smoother should control the page.\nconst wrapper = document.createElement("div");\nconst content = document.createElement("main");\nwrapper.append(content);\ndocument.body.append(wrapper);\ncontent.style.cssText = "min-height:240vh;padding:24px;background:#eee";\nconst heading = document.createElement("h2");\nheading.textContent = "Scroll this page";\ncontent.append(heading);\nlet smoother;\nif (!matchMedia("(prefers-reduced-motion: reduce)").matches) {\n  smoother = ScrollSmoother.create({ wrapper, content, smooth: 1 });\n}\n// On teardown: smoother?.kill();',
              language: "javascript",
            },
            {
              label: "Module: add a decorative parallax layer",
              code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\nimport { ScrollSmoother } from "gsap/ScrollSmoother";\ngsap.registerPlugin(ScrollTrigger, ScrollSmoother);\n\n// Run on a fresh page; only one smoother should control the page.\nconst wrapper = document.createElement("div");\nconst content = document.createElement("main");\nwrapper.append(content);\ndocument.body.append(wrapper);\ncontent.style.cssText = "min-height:240vh;padding:24px;background:#eee";\nconst heading = document.createElement("h2");\nheading.textContent = "Scroll this page";\ncontent.append(heading);\nconst decoration = document.createElement("div");\ndecoration.style.cssText = "width:100px;height:100px;margin-top:70vh;background:coral";\ndecoration.setAttribute("data-speed", "0.8");\ndecoration.setAttribute("aria-hidden", "true");\ncontent.append(decoration);\nlet smoother;\nif (!matchMedia("(prefers-reduced-motion: reduce)").matches) {\n  smoother = ScrollSmoother.create({ wrapper, content, smooth: 0.8, effects: true });\n}\n// On teardown: smoother?.kill();',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/ScrollSmoother/",
        },
        {
          name: "SplitText",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Wraps text in elements for animating individual characters, words, or lines. Use it for staggered headings and line reveals, then revert the split when the component is removed.",
          note: "The create(), autoSplit, and onSplit patterns here target GSAP 3.13+ (examples use 3.15.0). Return the animation from onSplit so responsive re-splitting can manage it. Default ARIA labeling helps plain headings, but nested links and interactive text need a separate accessibility strategy.",
          examples: [
            {
              label: "Module: reveal words and restore the original markup",
              code: 'import { gsap } from "gsap";\nimport { SplitText } from "gsap/SplitText";\ngsap.registerPlugin(SplitText);\n\nconst heading = document.createElement("h2");\nheading.textContent = "Make something move";\ndocument.body.append(heading);\nconst split = SplitText.create(heading, { type: "words" });\nconst anim = gsap.from(split.words, {\n  y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.08\n});\n// On teardown, in this order: anim.revert(); split.revert();',
              language: "javascript",
            },
            {
              label: "Module: rebuild a masked line reveal when layout changes",
              code: 'import { gsap } from "gsap";\nimport { SplitText } from "gsap/SplitText";\ngsap.registerPlugin(SplitText);\n\nconst heading = document.createElement("h2");\nheading.textContent = "Make something move";\ndocument.body.append(heading);\nheading.style.cssText = "max-width:250px;font:32px/1.3 system-ui";\nconst split = SplitText.create(heading, {\n  type: "lines",\n  mask: "lines",\n  autoSplit: true,\n  onSplit(self) {\n    return gsap.from(self.lines, {\n      yPercent: 100, duration: 0.7, stagger: 0.1, ease: "power2.out"\n    });\n  }\n});\n// On teardown: split.revert();',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/SplitText/",
        },
        {
          name: "TextPlugin",
          kind: "plugin",
          scope: "Plugin / tool",
          explanation:
            "Replaces an element’s text progressively, either character by character or using a delimiter. Use it for typewriter-style messages without creating separate character elements.",
          note: "TextPlugin changes content; SplitText wraps existing content for transform animations, and ScrambleTextPlugin uses random intermediate characters. Supply trusted text, avoid announcing every frame with aria-live, and keep accessible labels stable.",
          examples: [
            {
              label: "Module: replace a heading character by character",
              code: 'import { gsap } from "gsap";\nimport { TextPlugin } from "gsap/TextPlugin";\ngsap.registerPlugin(TextPlugin);\n\nconst heading = document.createElement("h2");\nheading.textContent = "Make something move";\ndocument.body.append(heading);\nheading.textContent = "";\nheading.setAttribute("aria-label", "Hello, GSAP!");\ngsap.to(heading, { duration: 1.5, text: "Hello, GSAP!", ease: "none" });',
              language: "javascript",
            },
            {
              label: "Module: replace a sentence word by word",
              code: 'import { gsap } from "gsap";\nimport { TextPlugin } from "gsap/TextPlugin";\ngsap.registerPlugin(TextPlugin);\n\nconst heading = document.createElement("h2");\nheading.textContent = "Make something move";\ndocument.body.append(heading);\nconst finalText = "Build clear and useful animations";\nheading.setAttribute("aria-label", finalText);\ngsap.to(heading, {\n  duration: 2,\n  text: { value: finalText, delimiter: " " },\n  ease: "none"\n});',
              language: "javascript",
            },
          ],
          source: "https://gsap.com/docs/v3/Plugins/TextPlugin/",
        },
      ],
    },
  ],
};

(() => {
  const content = document.querySelector("#content");
  const nav = document.querySelector("#nav");
  const search = document.querySelector("#search");
  const count = document.querySelector("#count");
  const total = handbook.categories.reduce(
    (sum, category) => sum + category.methods.length,
    0,
  );
  const easeCount = handbook.categories.reduce(
    (sum, category) =>
      sum + category.methods.filter((method) => method.kind === "ease").length,
    0,
  );
  const patternCount = handbook.categories.reduce(
    (sum, category) =>
      sum +
      category.methods.filter((method) => method.kind === "pattern").length,
    0,
  );
  const pluginCount = handbook.categories.reduce(
    (sum, category) =>
      sum +
      category.methods.filter((method) => method.kind === "plugin").length,
    0,
  );
  const exampleCount = handbook.categories.reduce(
    (sum, category) =>
      sum +
      category.methods.reduce(
        (count, method) => count + method.examples.length,
        0,
      ),
    0,
  );
  document.querySelector("#sheet-summary").textContent =
    handbook.categories.length +
    " categories · " +
    (total - easeCount - patternCount - pluginCount) +
    " methods · " +
    (easeCount ? easeCount + " eases · " : "") +
    (patternCount
      ? patternCount + (patternCount === 1 ? " pattern · " : " patterns · ")
      : "") +
    (pluginCount ? pluginCount + " plugins · " : "") +
    exampleCount +
    " examples";
  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function codeBlock(parent, code, language, label) {
    const head = node("div", undefined, "example-head");
    const copy = node("button", "Copy");
    copy.type = "button";
    copy.setAttribute("aria-label", "Copy " + label);
    head.append(node("span", label), copy);
    const pre = node("pre");
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", label);
    const element = node("code", code, "language-" + language);
    pre.append(element);
    parent.append(head, pre);
    window.HandbookHighlight?.highlight(element);
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code);
        copy.textContent = "Copied!";
      } catch {
        copy.textContent = "Select code to copy";
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      window.setTimeout(() => {
        copy.textContent = "Copy";
      }, 1800);
    });
  }
  codeBlock(
    document.querySelector("#example-setup"),
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>GSAP cheat sheet practice</title>
  <style>
    body { padding: 24px; font: 16px system-ui; }
    .box, .card { width: 64px; height: 64px; background: royalblue; margin: 12px 0; }
  </style>
</head>
<body>
  <button id="control" type="button">Apply control</button>
  <div class="box" aria-hidden="true"></div>
  <div class="card" aria-hidden="true"></div>
  <div class="card" aria-hidden="true"></div>
  <div class="card" aria-hidden="true"></div>
  <p>Value: <span id="value">0</span></p>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
  <script>
    // Paste one JavaScript example here, then reload to reset the scene.
  </script>
</body>
</html>`,
    "html",
    "Shared setup — index.html",
  );
  function render() {
    const query = search.value.trim().toLowerCase();
    const fragment = document.createDocumentFragment();
    const menu = document.createDocumentFragment();
    let shown = 0;
    for (const category of handbook.categories) {
      const categoryMatch = category.name.toLowerCase().includes(query);
      const optionMatch = JSON.stringify(category.options || [])
        .toLowerCase()
        .includes(query);
      const methods = category.methods.filter(
        (method) =>
          !query ||
          categoryMatch ||
          optionMatch ||
          JSON.stringify(method).toLowerCase().includes(query),
      );
      if (!methods.length) continue;
      const section = node("section");
      section.id = category.id;
      section.append(node("h2", category.name));
      const link = node("a", category.name);
      link.href = "#" + category.id;
      menu.append(link);
      if (category.intro) section.append(node("p", category.intro));
      for (const reference of category.referenceLinks || []) {
        const link = node("a", reference.label + " ↗", "source");
        link.href = reference.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        section.append(link);
      }
      for (const setup of category.setup || []) {
        codeBlock(
          section,
          setup.code,
          setup.language || "javascript",
          setup.label,
        );
      }
      if (category.options?.length) {
        const details = node("details", undefined, "roadmap-topics");
        details.append(
          node(
            "summary",
            category.referenceTitle ||
              "Options and callbacks shown in your image",
          ),
        );
        const wrapper = node("div", undefined, "table-wrap");
        const table = node("table");
        const caption = node(
          "caption",
          category.referenceCaption || "Basics options reference",
        );
        const thead = node("thead");
        const heading = node("tr");
        for (const text of ["Option", "Meaning"]) {
          const th = node("th", text);
          th.scope = "col";
          heading.append(th);
        }
        thead.append(heading);
        const tbody = node("tbody");
        for (const [key, description] of category.options) {
          const row = node("tr");
          const th = node("th", key);
          th.scope = "row";
          row.append(th, node("td", description));
          tbody.append(row);
        }
        table.append(caption, thead, tbody);
        wrapper.append(table);
        details.append(wrapper);
        section.append(details);
      }
      for (const method of methods) {
        const entry = node("article", undefined, "entry");
        entry.dataset.progressId =
          "gsap-cheatsheet:" + category.id + ":" + method.name;
        if (method.scope) entry.append(node("span", method.scope, "stage"));
        const heading = node("h3");
        heading.append(node("code", method.name));
        entry.append(
          heading,
          node("p", method.explanation),
          node("p", method.note, "method-note"),
        );
        for (const example of method.examples) {
          entry.append(node("h4", example.label));
          codeBlock(
            entry,
            example.code,
            example.language || "javascript",
            example.label,
          );
        }
        const source = node(
          "a",
          "Official " + method.name + " reference ↗",
          "source",
        );
        source.href = method.source;
        source.target = "_blank";
        source.rel = "noopener noreferrer";
        entry.append(source);
        window.HandbookHighlight?.highlight(heading);
        section.append(entry);
      }
      fragment.append(section);
      shown += methods.length;
    }
    if (!shown)
      fragment.append(
        node("p", "No matches. Try another term or reset search.", "empty"),
      );
    content.replaceChildren(fragment);
    nav.replaceChildren(menu);
    count.textContent =
      shown + " of " + total + (easeCount ? " entries" : " methods");
  }
  search.addEventListener("input", render);
  document.querySelector("#reset").addEventListener("click", () => {
    search.value = "";
    render();
    search.focus();
  });
  render();
})();
