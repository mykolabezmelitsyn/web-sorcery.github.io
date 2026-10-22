/* Follows lottie-animation-mastery-roadmap.md; examples are text, never auto-executed. */
(() => {
  const book = {
    phases: [
      {
        number: 1,
        name: "Lottie Fundamentals (Review)",
        prompts: [
          [
            "Checkpoint",
            "Explain how an exported animation reaches the browser and identify the right animation technique for a given UI requirement.",
          ],
        ],
        chapters: [1, 2],
      },
      {
        number: 2,
        name: "File Formats and Internals",
        prompts: [
          [
            "Checkpoint",
            "Inspect two animation files, identify their dimensions and playback ranges, and explain any external asset requirements.",
          ],
        ],
        chapters: [3, 4],
      },
      {
        number: 3,
        name: "Animation Authoring and Export",
        prompts: [
          [
            "Practice",
            "Create and export a loading spinner, an animated checkmark, and a two-state icon. Compare previews with the exported browser result.",
          ],
        ],
        chapters: [5, 6, 7],
      },
      {
        number: 4,
        name: "Lottie in HTML, CSS, and Vanilla JavaScript",
        prompts: [
          [
            "Checkpoint",
            "Reproduce the same simple animation with both libraries and explain the differences in markup, renderer behavior, APIs, and supported files.",
          ],
        ],
        chapters: [8, 9],
      },
      {
        number: 5,
        name: "JavaScript Playback and Lifecycle Control",
        prompts: [
          [
            "Practice",
            "Build an accessible animated toggle and an AJAX-style submit button with idle, loading, success, and error states.",
          ],
        ],
        chapters: [10, 11],
      },
      {
        number: 6,
        name: "Scroll, Viewport, and GSAP Integration",
        prompts: [
          [
            "Practice",
            "Build a scroll-controlled product explanation using Lottie plus GSAP ScrollTrigger, including responsive layouts and a reduced-motion fallback.",
          ],
        ],
        chapters: [12, 13],
      },
      {
        number: 7,
        name: "Advanced dotLottie Interactivity",
        prompts: [
          [
            "Practice",
            "Build a theme-aware animated UI button with idle, hover, pressed, success, and disabled behavior, including keyboard operation.",
          ],
        ],
        chapters: [14, 15],
      },
      {
        number: 8,
        name: "TypeScript and Framework Integration",
        prompts: [
          [
            "Practice",
            "Create both a TypeScript `LottieController` for vanilla JS projects and a reusable React Lottie component.",
          ],
        ],
        chapters: [16, 17, 18],
      },
      {
        number: 9,
        name: "Performance and Production Optimization",
        prompts: [
          [
            "Practice",
            "Make an animation-heavy page with several instances, then improve load behavior, frame smoothness, and responsiveness with before/after measurements.",
          ],
        ],
        chapters: [19, 20, 21],
      },
      {
        number: 10,
        name: "Accessibility and Responsive Design",
        prompts: [
          [
            "Practice",
            "Implement a responsive hero animation with accessible fallback content and a functional reduced-motion version.",
          ],
        ],
        chapters: [22, 23],
      },
      {
        number: 11,
        name: "Debugging, Testing, and Reliability",
        prompts: [],
        chapters: [24, 25],
      },
      {
        number: 12,
        name: "Architecture, Collaboration, and Delivery",
        prompts: [],
        chapters: [26, 27],
      },
      {
        number: 13,
        name: "Advanced and Specialist Topics (Optional)",
        prompts: [],
        chapters: [28, 29],
      },
      {
        number: 14,
        name: "Practical Mastery Projects",
        prompts: [],
        chapters: [],
      },
    ],
    chapters: [
      {
        number: 1,
        name: "Understand the Lottie ecosystem",
        phase: 1,
        topics: [
          {
            depth: 0,
            text: "What Lottie is: a JSON-based animated graphics format and an ecosystem of exporters and players.",
          },
          {
            depth: 0,
            text: "Typical applications: animated icons, loading indicators, onboarding, illustrations, micro-interactions, success/error feedback, hero sections, and scroll-driven storytelling.",
          },
          {
            depth: 0,
            text: "How motion graphics are converted into animation data and rendered by a player.",
          },
          {
            depth: 0,
            text: "The distinction between:",
          },
          {
            depth: 1,
            text: "**Lottie JSON (`.json`)**: the original animation data format.",
          },
          {
            depth: 1,
            text: "**dotLottie (`.lottie`)**: a packaged animation format that can contain assets, multiple animations, and, with supported specifications and players, themes and state machines.",
          },
          {
            depth: 1,
            text: "**LottieFiles**: a platform and tooling ecosystem; not the file format itself.",
          },
          {
            depth: 1,
            text: "**Bodymovin**: the After Effects exporter historically associated with Lottie.",
          },
          {
            depth: 1,
            text: "**`lottie-web`** and **`@lottiefiles/dotlottie-web`**: distinct browser playback libraries with different APIs and rendering architectures.",
          },
          {
            depth: 0,
            text: "When Lottie is appropriate—and when CSS animations, SVG/SMIL, GSAP, Rive, Canvas, WebGL, GIF, or video is a better choice.",
          },
          {
            depth: 0,
            text: "Trade-offs: scalability, interactivity, download size, rendering cost, authoring workflow, and platform support.",
          },
        ],
        lessons: [
          {
            name: "A format, an exporter, and a player have different jobs",
            explanation:
              "Lottie stores designed motion as structured data that a runtime interprets into pixels or DOM/SVG. A designer authors keyframes, an exporter translates supported features, and a player renders that result. LottieFiles supplies services and tools; Bodymovin is an exporter, not a requirement that your website use one particular player.\n\nUse raw JSON when one animation and its dependencies are easy to deliver. A dotLottie archive can package several animations and related assets, plus compatible themes/state machines. lottie-web and DotLottie are separate implementations: installing one does not give you the other’s methods. Choose the authoring/export/runtime combination before approving visual effects.",
            files: [],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://dotlottie.io/spec/2.0/",
            checkpoint:
              "Draw the author → export → delivery → player chain, naming the owner of each step.",
          },
          {
            name: "Choose the smallest technology that meets the interaction",
            explanation:
              "A CSS transition is usually enough for a button’s opacity or position. GSAP is useful when the browser DOM/SVG needs coordinated sequencing. Lottie fits authored vector illustrations, status feedback, and portable motion you need to seek or control. Rive can fit an authoring workflow centered on interactive state; Canvas/WebGL/video may fit complex raster or 3D effects better.\n\nCompare total costs: authoring/editing, player and WASM download, asset payload, parsing, rendering, accessibility, and long-term ownership. A small JSON file can still be expensive to draw. GIF/video can encode visual effects that an exporter cannot translate, but have different scaling and interaction trade-offs.",
            files: [
              {
                name: "technology-choice.txt",
                code: "UI color/opacity change → CSS transition\nDOM sequence tied to scrolling → GSAP + ScrollTrigger\nDesigned vector feedback that can be paused/seeked → Lottie candidate\nRaster-heavy cinematic scene → evaluate video/Canvas/WebGL\nAuthor-controlled interactive graph → evaluate Rive and compatible dotLottie states",
                language: "plaintext",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 2,
        name: "Review fundamental animation concepts",
        phase: 1,
        topics: [
          {
            depth: 0,
            text: "Frames, frame rate (FPS), duration, in/out points, timelines, and playback direction.",
          },
          {
            depth: 0,
            text: "Keyframes, interpolation, easing curves, and temporal versus spatial interpolation.",
          },
          {
            depth: 0,
            text: "Position, scale, rotation, opacity, anchor points, and transform hierarchies.",
          },
          {
            depth: 0,
            text: "Vector paths, Bézier curves, fills, strokes, groups, and shape layers.",
          },
          {
            depth: 0,
            text: "Trim paths, repeaters, morphing, masks, mattes, and pre-compositions.",
          },
          {
            depth: 0,
            text: "Looping, ping-pong/bounce motion, seamless transitions, anticipation, follow-through, and timing.",
          },
          {
            depth: 0,
            text: "Visual continuity: how animation communicates state and affordance rather than adding decoration.",
          },
        ],
        lessons: [
          {
            name: "Frames are positions; FPS defines time",
            explanation:
              "A frame is a position in the exported timeline. FPS is the rate used to interpret timeline units; a 60-frame range at 30 FPS lasts two seconds at normal speed. The composition’s ip/op define its in/out range, and op is the exclusive end. Player-local frame indices commonly start at zero even when the composition ip does not. Never confuse progress 0–1, seconds, milliseconds, and frame numbers.\n\nKeyframes define known property values. Temporal easing controls how quickly values change between them; spatial interpolation controls the path through space. Easing cannot repair a wrong path or anchor point. Position, scale, rotation, and opacity are evaluated through parent transforms, so the same local position can land somewhere different after parenting.",
            files: [
              {
                name: "timing.mjs",
                code: 'export function durationSeconds({ fr, ip, op }) {\n  if (![fr, ip, op].every(Number.isFinite) || !(fr > 0) || !(op > ip))\n    throw new RangeError("Invalid timeline");\n  return (op - ip) / fr;\n}\nconsole.log(durationSeconds({ fr: 30, ip: 0, op: 60 })); // 2',
                language: "javascript",
                test: "node",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://lottie.github.io/lottie-spec/latest/",
            checkpoint: "",
          },
          {
            name: "Shape operations and motion principles explain the result",
            explanation:
              "Bézier paths use control points to describe curves; fills color interiors and strokes draw outlines. Groups organize geometry and transforms. Trim paths animate a visible portion of a stroke; repeaters create repeated shapes; morphing interpolates compatible path topology. Masks restrict visibility, mattes use another layer as a visibility source, and pre-compositions nest timelines. These features have renderer-specific costs and support.\n\nA seamless loop needs continuity of both position and velocity at the seam. Ping-pong/bounce reverses motion but is not automatically a seamless designed loop. Anticipation prepares an action; follow-through lets motion settle. Use timing to communicate affordance and state, while a static label still tells the user what happened.",
            files: [],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://github.com/airbnb/lottie-web/wiki/Features",
            checkpoint:
              "Explain why matching the first and last image is insufficient when the velocity jumps at the loop seam.",
          },
        ],
        originalExamples: [],
      },
      {
        number: 3,
        name: "Understand Lottie JSON",
        phase: 2,
        topics: [
          {
            depth: 0,
            text: "Read a simple Lottie JSON file rather than treating it as a black box.",
          },
          {
            depth: 0,
            text: "Understand common top-level fields such as `v`, `fr`, `ip`, `op`, `w`, `h`, `layers`, `assets`, and `markers` (when present).",
          },
          {
            depth: 0,
            text: "Understand layer types, transform data, parent relationships, paths, fills, strokes, and animated property values.",
          },
          {
            depth: 0,
            text: "Interpret keyframe objects, static versus animated values, and easing controls.",
          },
          {
            depth: 0,
            text: "Understand embedded versus external images and font dependencies.",
          },
          {
            depth: 0,
            text: "Learn how composition size and aspect ratio relate to displayed size.",
          },
          {
            depth: 0,
            text: "Inspect and validate JSON; distinguish a malformed file from an unsupported feature.",
          },
          {
            depth: 0,
            text: "Understand the Lottie format specification's evolving status and renderer-specific compatibility.",
          },
        ],
        lessons: [
          {
            name: "Read the root object before investigating individual layers",
            explanation:
              "v identifies the exporter/format lineage, not a guarantee of runtime compatibility. fr, ip, and op describe timing; w/h define composition coordinates, not a fixed CSS size. layers contains scene elements; assets contains images/pre-compositions; markers optionally name useful timeline regions. The accompanying fixture is a 256×256, two-second moving dot with no images/fonts.\n\nAn a:0 property is static and k stores its value. With a:1, k holds keyframe data; t is timeline time, s is a start value, and i/o often encode temporal easing. Layer ty, ind, parent, ks, and shape groups establish type, relationships, and transforms. Inspect the exporter’s actual schema rather than editing opaque arrays by guesswork.",
            files: [
              {
                name: "inspect-animation.mjs",
                code: 'export function inspectAnimation(data) {\n  if (!data || !Array.isArray(data.layers))\n    throw new TypeError("Missing layers");\n  for (const key of ["fr", "ip", "op", "w", "h"]) {\n    if (!Number.isFinite(data[key])) throw new TypeError(`Invalid ${key}`);\n  }\n  if (data.fr <= 0 || data.op <= data.ip || data.w <= 0 || data.h <= 0)\n    throw new RangeError("Invalid composition");\n  return {\n    size: [data.w, data.h],\n    frames: data.op - data.ip,\n    seconds: (data.op - data.ip) / data.fr,\n    assets: data.assets ?? [],\n    markers: data.markers ?? [],\n  };\n}',
                language: "javascript",
                test: "node",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "This is a useful preliminary check, not a full Lottie schema validator.",
            source: "https://lottie.github.io/lottie-spec/latest/",
            checkpoint: "",
          },
          {
            name: "Loading valid JSON is only the first compatibility check",
            explanation:
              "JSON.parse can prove the text is syntactically JSON; it cannot prove the animation has supported layers or resolves external assets. Image records may reference folders/filenames or embedded data. Fonts may need remote files, local font availability, or exported glyph shapes. Network, origin policy, missing fonts, unsupported effects, and malformed properties produce different failures.\n\nReserve the composition’s aspect ratio before loading. Treat the evolving community specification as a baseline and test exact assets with the chosen player/exporter/browser. When reusing animationData across lottie-web instances, clone it if the runtime mutates exported structures; repeaters are a documented reason to avoid sharing a single mutable object.",
            files: [
              {
                name: "asset-audit.mjs",
                code: 'export function externalImages(data) {\n  return (data.assets ?? [])\n    .filter(\n      (asset) => typeof asset.p === "string" && !asset.p.startsWith("data:"),\n    )\n    .map((asset) => ({ id: asset.id, url: `${asset.u ?? ""}${asset.p}` }));\n}',
                language: "javascript",
                test: "node",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://github.com/airbnb/lottie-web/wiki/Usage",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 4,
        name: "Learn the dotLottie format",
        phase: 2,
        topics: [
          {
            depth: 0,
            text: "What a `.lottie` bundle contains and why it can be preferable to distributing raw JSON plus separate assets.",
          },
          {
            depth: 0,
            text: "ZIP-based packaging, manifests, animation IDs, and asset organization.",
          },
          {
            depth: 0,
            text: "Differences between dotLottie v1 and v2, including compatibility considerations.",
          },
          {
            depth: 0,
            text: "Multiple animations in one bundle.",
          },
          {
            depth: 0,
            text: "Themes, theme switching, and property overrides where supported.",
          },
          {
            depth: 0,
            text: "State machines and their relationship to animation assets.",
          },
          {
            depth: 0,
            text: "Packaging, inspecting, and extracting dotLottie archives for troubleshooting.",
          },
          {
            depth: 0,
            text: "Verifying which format features a particular player version actually supports.",
          },
        ],
        lessons: [
          {
            name: "Inspect the archive and manifest",
            explanation:
              "A .lottie file is ZIP-based packaging, not merely a renamed JSON file. Its manifest identifies included animations and optionally themes/state machines. Version 1 commonly uses animations/ and images/ directories; version 2 uses shorter a/ and i/ paths and adds structures for themes, state machines, and fonts. Do not mix the directory layouts or assume every player implements every extension.\n\nThe study archive includes dot and alternate animation IDs plus a button state machine. It contains no exported theme definition. Inspecting the archive is useful for debugging missing IDs and embedded resources, but validate file sizes and paths before extracting an untrusted ZIP. Browser players should receive the archive bytes or URL, not an arbitrary JavaScript ZIP object.",
            files: [
              {
                name: "inspect-bundle.sh",
                code: "# Download study.lottie from this guide first.\nunzip -l study.lottie\n# Print just the manifest; do not extract the archive:\nunzip -p study.lottie manifest.json",
                language: "shell",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://dotlottie.io/spec/2.0/",
            checkpoint: "",
          },
          {
            name: "Compatibility is a contract, not a filename extension",
            explanation:
              "Pin a tested player and record the dotLottie manifest version plus required features. Themes require targets/slots and theme definitions; state machines require an authored graph and matching runtime support. A multi-animation bundle may reduce repeated asset overhead but also makes an initial download larger than fetching only one needed asset.\n\nTest the full delivery: content type, cache headers, CORS, support binaries, asset IDs, and failure fallback. Keep raw exports and source files so a packaging problem can be separated from a rendering problem. Changing a ZIP extension or choosing a “newest” exporter does not make an older runtime support its features.",
            files: [
              {
                name: "motion-contract.json",
                code: '{\n  "asset": "study.lottie",\n  "manifestVersion": "2",\n  "runtime": "@lottiefiles/dotlottie-web@0.81.0",\n  "animationIds": ["dot", "alternate"],\n  "stateMachineId": "button",\n  "inputs": {\n    "isActive": "boolean"\n  },\n  "fallback": "fallback.svg"\n}',
                language: "json",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://dotlottie.io/spec/2.0/",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 5,
        name: "Build foundational After Effects skills",
        phase: 3,
        topics: [
          {
            depth: 0,
            text: "Composition setup: dimensions, duration, frame rate, and background handling.",
          },
          {
            depth: 0,
            text: "Layer organization, naming conventions, nesting, parenting, and null objects.",
          },
          {
            depth: 0,
            text: "Shape layers, paths, strokes, trim paths, and keyframe animation.",
          },
          {
            depth: 0,
            text: "Graph Editor, speed graphs, value graphs, and custom easing.",
          },
          {
            depth: 0,
            text: "Path morphing, transformations, looping, and reusable pre-compositions.",
          },
          {
            depth: 0,
            text: "Preparing vector artwork and converting suitable assets into shape layers.",
          },
          {
            depth: 0,
            text: "Creating motion that loops cleanly or contains purposeful entry/exit segments.",
          },
          {
            depth: 0,
            text: "Using meaningful layer names and markers for developer handoff.",
          },
        ],
        lessons: [
          {
            name: "Author the composition for the real UI envelope",
            explanation:
              "Set composition dimensions, duration, FPS, and transparent background deliberately. Name layers by meaning (status-ring, success-mark), group related shapes, and use parenting/null objects to avoid repeated transforms. Keep the anchor point where rotation/scale should actually pivot. Illustrator/Figma/SVG artwork often needs cleanup or shape conversion rather than a blind import.\n\nBuild the spinner from a stroke and trim/rotation, the checkmark from a path reveal, and the toggle from two deliberate states. Avoid unnecessary nested pre-compositions. Keep introductory, looping, and exit segments identifiable, then preview the smallest expected on-screen size and background contrast.",
            files: [
              {
                name: "authoring-checklist.txt",
                code: "Composition: 256 × 256, transparent, 30 FPS\nLayer names: status-ring / success-mark / control-outline\nTimeline regions: entry / loading-loop / success / error\nPreview: narrow mobile, light background, dark background\nHandoff: source project + export + fallback + runtime/version notes",
                language: "plaintext",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source:
              "https://helpx.adobe.com/after-effects/using/composition-basics.html",
            checkpoint: "",
          },
          {
            name: "Use the Graph Editor to preserve continuity",
            explanation:
              "Value graphs show a property’s value over time; speed graphs show how quickly it changes. Separate a desirable easing curve from the geometry of a motion path. For path morphing, keep vertex order and topology compatible; for loops, compare the first/last positions, tangents, and speeds. A preview that looks smooth at full size may flicker or stutter after export.\n\nUse meaningful composition markers for stable developer handoff instead of asking the implementer to hardcode frame 47. Export and re-test after any timing change, because segment ranges, loop seams, and interaction completion can all shift. Markers are data; players differ in their naming/parsing APIs.",
            files: [],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://github.com/airbnb/lottie-web/wiki/Markers",
            checkpoint:
              "Deliver one clean spinner loop, a single checkmark reveal, and a reversible two-state icon with documented ranges.",
          },
        ],
        originalExamples: [],
      },
      {
        number: 6,
        name: "Understand creation and handoff tools",
        phase: 3,
        topics: [
          {
            depth: 0,
            text: "Adobe After Effects with Bodymovin or the LottieFiles plugin.",
          },
          {
            depth: 0,
            text: "Lottie Creator and other tools capable of authoring or editing supported Lottie assets.",
          },
          {
            depth: 0,
            text: "Preparing artwork in Figma, Illustrator, or SVG-capable design tools.",
          },
          {
            depth: 0,
            text: "Exporting JSON versus dotLottie and selecting the target runtime.",
          },
          {
            depth: 0,
            text: "Previewing exported results in the actual browser player, not only the design tool.",
          },
          {
            depth: 0,
            text: "Handoff requirements: asset filename, intended dimensions, looping behavior, markers, colors, interaction states, and fallback artwork.",
          },
          {
            depth: 0,
            text: "Version control and a repeatable animation export workflow.",
          },
        ],
        lessons: [
          {
            name: "Make the export workflow repeatable",
            explanation:
              "After Effects plus Bodymovin/LottieFiles plugins and browser authoring tools such as Lottie Creator are different production paths. Tool availability, collaboration features, export options, and licenses can change. Agree on the exact tool/export settings and target runtime, then commit the source/export metadata with the implementation. A platform preview is useful but is not the production player.\n\nHandoff should include intrinsic dimensions, background assumptions, loops, marker names, image/font dependencies, customization targets, static artwork, expected interaction states, and a reference video. Record who approves visual fidelity and who owns re-exporting. This turns a “please make it work” file into a testable asset contract.",
            files: [],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://lottiefiles.com/tools/lottie-creator",
            checkpoint: "",
          },
          {
            name: "Review exports as versioned application dependencies",
            explanation:
              "Store editable source separately from deployable exports and give immutable releases versioned paths. Review visual and structural changes together: a renamed marker is an API change even when the animation looks identical. Keep a tiny catalog so several teams do not quietly maintain diverging copies of one loading indicator.\n\nA useful review pairs before/after key-frame screenshots with runtime checks and size measurements. Preserve license/provenance for imported artwork and animation templates. Avoid claiming a designer’s plugin subscription or an asset-library download grants every downstream use; record the actual license supplied with that asset.",
            files: [
              {
                name: "handoff.md",
                code: "# Status illustration v1\n- Source owner: motion design\n- Runtime owner: frontend\n- Export: Lottie JSON + dotLottie v2\n- Tested players: lottie-web 5.13.0 / DotLottie 0.81.0\n- Range: ip=0, op=60, fr=30; intrinsic size 256×256\n- IDs: dot, alternate; machine: button; boolean input: isActive\n- Fallback: fallback.svg; never the only indication of app status\n- Review: key frames, load failure, reduced motion, keyboard, mobile",
                language: "markdown",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://dotlottie.io/spec/2.0/",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 7,
        name: "Learn compatibility limitations",
        phase: 3,
        topics: [
          {
            depth: 0,
            text: "Which shape, transform, trim-path, text, mask, matte, and gradient features work with a given exporter/player combination.",
          },
          {
            depth: 0,
            text: "Why some After Effects effects, layer styles, expressions, 3D features, fonts, and blend modes may not export or render consistently.",
          },
          {
            depth: 0,
            text: "Why support can differ between browsers, player implementations, and platform versions.",
          },
          {
            depth: 0,
            text: "How text-to-shape conversion affects file size, accessibility, and maintainability.",
          },
          {
            depth: 0,
            text: "How raster assets and unnecessary layers increase payload and rendering cost.",
          },
          {
            depth: 0,
            text: "How to simplify or redesign unsupported effects while preserving the intended motion.",
          },
        ],
        lessons: [
          {
            name: "Test the actual exporter × renderer × feature combination",
            explanation:
              "Support is not a universal “Lottie supports masks” checkbox. Shapes, gradients, mattes, text, repeaters, blend modes, expressions, and 3D effects can behave differently across exporters and players. lottie-web exposes SVG, canvas, and HTML renderers, each with different coverage and cost; dotLottie has a different rendering engine. A feature working in After Effects does not prove it exported correctly.\n\nMake a minimal test asset for a risky effect before using it throughout a project. When it fails, remove layers progressively and compare players to distinguish an exporter omission from a runtime limitation. Simplify the effect, bake a suitable visual alternative, or choose video/WebGL if the design fundamentally depends on unsupported rendering.",
            files: [],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://github.com/airbnb/lottie-web/wiki/Features",
            checkpoint: "",
          },
          {
            name: "Text and raster choices affect more than file size",
            explanation:
              "Converting text to outlines removes a font dependency but increases path data and loses semantic/searchable text. Keep meaningful UI copy in HTML even if lettering is drawn inside an illustration. Raster images can dominate download and memory cost; embedding them avoids extra requests but can inflate JSON and defeat independent caching.\n\nMeasure geometry, masks/mattes, repeated layers, and nested pre-compositions on a real target device. Keep screenshots at intended sizes and compare transparent edges, gradients, and clipping. Compatibility fixes should preserve the intended message and hierarchy, not just silence an error.",
            files: [],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://github.com/airbnb/lottie-web/wiki/TextLayer",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 8,
        name: "Integrate `lottie-web`",
        phase: 4,
        topics: [
          {
            depth: 0,
            text: "Install and import `lottie-web` with npm and a bundler such as Vite.",
          },
          {
            depth: 0,
            text: "Initialize `lottie.loadAnimation()` with `container`, `renderer`, `loop`, `autoplay`, and `path` or `animationData`.",
          },
          {
            depth: 0,
            text: "Compare the `svg`, `canvas`, and `html` renderer choices available in `lottie-web`.",
          },
          {
            depth: 0,
            text: "Understand responsive containers, `viewBox`-style scaling, aspect ratios, and renderer settings.",
          },
          {
            depth: 0,
            text: "Load local assets versus remote URLs and handle unavailable or invalid files.",
          },
          {
            depth: 0,
            text: "Know when the animation is ready before triggering dependent behavior.",
          },
          {
            depth: 0,
            text: "Properly destroy instances when removing or replacing elements.",
          },
        ],
        lessons: [
          {
            name: "Install lottie-web and create one explicit instance",
            explanation:
              "Use a bundler such as Vite and serve over HTTP; do not open an ES-module project through file://. In a Vite project, public/animations/success.json is served as /animations/success.json. That root-relative path must be adjusted for a GitHub Pages subpath deployment. Use path or animationData, not both. SVG is a practical default for vector UI; canvas trades DOM nodes for raster drawing, while HTML is a separate renderer with different coverage.\n\nThe original roadmap example below creates a paused, non-looping SVG instance and plays when DOMLoaded fires. That event concerns initialized DOM, not successful loading of every external image/font. The supplied dot.json can be copied as success.json for this exercise; it is a moving-dot fixture, not a finished success illustration.",
            files: [
              {
                name: "install.sh",
                code: "npm install --save-exact lottie-web@5.13.0",
                language: "shell",
                test: "reference",
              },
              {
                name: "index.html",
                code: '<div data-lottie aria-hidden="true" style="width: 256px; aspect-ratio: 1"></div>',
                language: "html",
                test: "reference",
              },
              {
                name: "roadmap-minimal.js",
                code: "import lottie from 'lottie-web';\n\nconst container = document.querySelector('[data-lottie]');\n\nif (container) {\n  const animation = lottie.loadAnimation({\n    container,\n    renderer: 'svg',\n    loop: false,\n    autoplay: false,\n    path: '/animations/success.json',\n  });\n\n  animation.addEventListener('DOMLoaded', () => {\n    animation.play();\n  });\n\n  // Call animation.destroy() when this UI component is removed.\n}",
                language: "javascript",
                test: "reference",
              },
            ],
            requires:
              "Vite ES-module project; place an exported asset at public/animations/success.json",
            note: "This is the roadmap’s minimal example. Production lifecycle and failure handling follow in the next lesson.",
            source: "https://github.com/airbnb/lottie-web/wiki/Usage",
            checkpoint: "",
          },
          {
            name: "Return a controller and own every subscription",
            explanation:
              "A component should own one player instance, its readiness, and its teardown. The helper below preserves the newest requested progress until loading finishes, keeps playback commands gated, and exposes the actual instance for player-specific capabilities. It uses local instance methods so one icon cannot accidentally pause every animation on the page.\n\nDOMLoaded applies the queued frame. data_failed/error invoke the caller’s fallback handler. destroy is idempotent: route changes, abort paths, and repeated cleanup can call it safely. If images fail separately, DOMLoaded alone is insufficient; also inspect loaded_images and the browser Network panel for assets with raster/font dependencies.",
            files: [
              {
                name: "mount-json.js",
                code: 'import lottie from "lottie-web";\n\nexport function mountJSON(\n  container,\n  src,\n  { onReady = () => {}, onError = () => {} } = {},\n) {\n  const animation = lottie.loadAnimation({\n    container,\n    renderer: "svg",\n    path: src,\n    loop: false,\n    autoplay: false,\n    rendererSettings: { preserveAspectRatio: "xMidYMid meet" },\n  });\n  let ready = false;\n  let destroyed = false;\n  let progress = 0;\n  const draw = () =>\n    animation.goToAndStop(\n      progress * Math.max(0, animation.totalFrames - 1),\n      true,\n    );\n  const loaded = () => {\n    if (destroyed) return;\n    ready = true;\n    draw();\n    onReady(animation);\n  };\n  const failed = () => {\n    if (!destroyed) onError(new Error("Animation unavailable"));\n  };\n  animation.addEventListener("DOMLoaded", loaded);\n  animation.addEventListener("data_failed", failed);\n  animation.addEventListener("error", failed);\n  return {\n    animation,\n    get ready() {\n      return ready;\n    },\n    play() {\n      if (ready && !destroyed) animation.play();\n    },\n    pause() {\n      if (ready && !destroyed) animation.pause();\n    },\n    progress(value) {\n      if (destroyed) return;\n      progress = Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;\n      if (ready) draw();\n    },\n    destroy() {\n      if (destroyed) return;\n      destroyed = true;\n      animation.removeEventListener("DOMLoaded", loaded);\n      animation.removeEventListener("data_failed", failed);\n      animation.removeEventListener("error", failed);\n      animation.destroy();\n    },\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "lottie-web 5.13.0; call mountJSON with a real container and a same-origin JSON URL; caller keeps fallback HTML visible on error",
            note: "",
            source:
              "https://github.com/airbnb/lottie-web/blob/master/index.d.ts",
            checkpoint:
              "Mount two instances, seek each independently, then destroy both twice without leftover SVG nodes.",
          },
        ],
        originalExamples: [
          "import lottie from 'lottie-web';\n\nconst container = document.querySelector('[data-lottie]');\n\nif (container) {\n  const animation = lottie.loadAnimation({\n    container,\n    renderer: 'svg',\n    loop: false,\n    autoplay: false,\n    path: '/animations/success.json',\n  });\n\n  animation.addEventListener('DOMLoaded', () => {\n    animation.play();\n  });\n\n  // Call animation.destroy() when this UI component is removed.\n}\n",
        ],
      },
      {
        number: 9,
        name: "Integrate the dotLottie web player",
        phase: 4,
        topics: [
          {
            depth: 0,
            text: "Install and initialize `@lottiefiles/dotlottie-web` with an HTML `<canvas>`.",
          },
          {
            depth: 0,
            text: "Understand that this player can load Lottie JSON and dotLottie assets, but its API is **not** interchangeable with `lottie-web`.",
          },
          {
            depth: 0,
            text: "Control playback, speed, looping, frame positions, segments, and layout.",
          },
          {
            depth: 0,
            text: "Listen for load, error, play, pause, complete, and frame events supported by your player version.",
          },
          {
            depth: 0,
            text: "Distinguish canvas and WebAssembly rendering from `lottie-web`'s SVG renderer.",
          },
          {
            depth: 0,
            text: "Evaluate Web Component and framework wrapper alternatives for the same runtime.",
          },
          {
            depth: 0,
            text: "Manage lifecycle and avoid creating duplicate instances.",
          },
        ],
        lessons: [
          {
            name: "Use a canvas and the dotLottie API",
            explanation:
              "DotLottie takes a canvas and can load raw JSON or a .lottie archive. It initializes a WASM-backed rendering engine; ready means engine initialization, while load means the animation is available. Neither DOMLoaded nor goToAndStop belongs to this API. Use loadError to expose fallback UI, and listen to complete/frame/loop only when the UI actually needs those notifications.\n\nInstall the pinned runtime, use a canvas with reserved CSS dimensions, and confirm the WASM request succeeds. The roadmap example below plays only after load. A framework wrapper or Web Component can simplify lifecycle wiring, but inspect which underlying runtime it wraps and how it exposes refs/events.",
            files: [
              {
                name: "install.sh",
                code: "npm install --save-exact @lottiefiles/dotlottie-web@0.81.0",
                language: "shell",
                test: "reference",
              },
              {
                name: "index.html",
                code: '<canvas\n  data-dotlottie\n  aria-hidden="true"\n  style="width: 256px; aspect-ratio: 1"\n></canvas>',
                language: "html",
                test: "reference",
              },
              {
                name: "roadmap-minimal.js",
                code: "import { DotLottie } from '@lottiefiles/dotlottie-web';\n\nconst canvas = document.querySelector('[data-dotlottie]');\n\nif (canvas instanceof HTMLCanvasElement) {\n  const animation = new DotLottie({\n    canvas,\n    src: '/animations/success.lottie',\n    autoplay: false,\n    loop: false,\n  });\n\n  animation.addEventListener('load', () => {\n    animation.play();\n  });\n\n  // Call animation.destroy() when this UI component is removed.\n}",
                language: "javascript",
                test: "reference",
              },
            ],
            requires:
              "Vite ES-module project; public/animations/success.lottie contains a compatible bundle",
            note: "Use the supplied study.lottie as the exercise bundle; it is an original learning fixture.",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/getting-started/installation",
            checkpoint: "",
          },
          {
            name: "Handle engine assets, layout, and destruction explicitly",
            explanation:
              "For self-hosted deployments, emit the matching WASM binary from the exact installed package and set its URL before constructing players. In Vite the ?url import emits a deployable asset that respects the configured base. Apply contain layout for complete artwork; cover may crop important content. Device-pixel ratio controls sharpness versus backing-buffer work.\n\nThe helper pauses at frame zero after load and forwards loadError to the caller. Its cleanup removes the exact listener references before destroying the player. A server-rendered route should call this only on the client; hiding a canvas does not release the runtime. Worker/GPU variants have their own imports, binaries, and lifecycle differences, covered later.",
            files: [
              {
                name: "mount-dot.js",
                code: 'import { DotLottie } from "@lottiefiles/dotlottie-web";\nimport wasmURL from "@lottiefiles/dotlottie-web/dotlottie-player.wasm?url";\nDotLottie.setWasmUrl(wasmURL);\n\nexport function mountDot(canvas, src, onError = () => {}) {\n  const player = new DotLottie({\n    canvas,\n    src,\n    autoplay: false,\n    loop: false,\n    layout: { fit: "contain", align: [0.5, 0.5] },\n    renderConfig: { devicePixelRatio: Math.min(devicePixelRatio || 1, 2) },\n  });\n  const loaded = () => player.setFrame(0);\n  const failed = (event) => onError(event.error);\n  player.addEventListener("load", loaded);\n  player.addEventListener("loadError", failed);\n  return {\n    player,\n    destroy() {\n      player.removeEventListener("load", loaded);\n      player.removeEventListener("loadError", failed);\n      player.destroy();\n    },\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "Vite understands ?url imports; use an actual canvas and an exported JSON/.lottie URL",
            note: "",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference",
            checkpoint: "",
          },
        ],
        originalExamples: [
          "import { DotLottie } from '@lottiefiles/dotlottie-web';\n\nconst canvas = document.querySelector('[data-dotlottie]');\n\nif (canvas instanceof HTMLCanvasElement) {\n  const animation = new DotLottie({\n    canvas,\n    src: '/animations/success.lottie',\n    autoplay: false,\n    loop: false,\n  });\n\n  animation.addEventListener('load', () => {\n    animation.play();\n  });\n\n  // Call animation.destroy() when this UI component is removed.\n}\n",
        ],
      },
      {
        number: 10,
        name: "Master the playback API",
        phase: 5,
        topics: [
          {
            depth: 0,
            text: "Play, pause, stop, restart, reverse, and set playback speed.",
          },
          {
            depth: 0,
            text: "Control playback with frames, normalized progress, or segments.",
          },
          {
            depth: 0,
            text: "Play a segment once, loop part of a timeline, or queue subsequent actions.",
          },
          {
            depth: 0,
            text: "Use timeline markers or named segments where supported.",
          },
          {
            depth: 0,
            text: "React to load, completion, loop, error, and frame events.",
          },
          {
            depth: 0,
            text: "Handle rapid repeated interactions and interruption of in-progress animations.",
          },
          {
            depth: 0,
            text: "Avoid race conditions when controls are used before an asset finishes loading.",
          },
          {
            depth: 0,
            text: "Synchronize UI state with animation state without relying on arbitrary `setTimeout()` delays.",
          },
          {
            depth: 0,
            text: "Learn API differences between `lottie-web`, dotLottie, and framework wrappers.",
          },
        ],
        lessons: [
          {
            name: "Choose one playhead owner and one unit convention",
            explanation:
              'play resumes, pause preserves position, and stop returns to the start. Restart explicitly seeks/stops at the intended start then plays. lottie-web reverses using setDirection(-1), seeks with goToAndStop(frame, true), and changes rate with setSpeed. DotLottie uses setMode("reverse"), setFrame, setSpeed, and play/pause/stop; bounce is a supported mode rather than a lottie-web direction value.\n\nNormalize UI progress to 0–1 and clamp it before converting into player-local frame indices. For N whole frames, the final visible index is N−1. The helper below protects NaN and unloaded ranges. Do not run autoplay, scroll scrubbing, and a state machine against the same playhead at once.',
            files: [
              {
                name: "frames.js",
                code: "export function progressToFrame(progress, totalFrames) {\n  if (!Number.isFinite(totalFrames) || totalFrames <= 0) return 0;\n  const safe = Number.isFinite(progress)\n    ? Math.min(1, Math.max(0, progress))\n    : 0;\n  return safe * Math.max(0, totalFrames - 1);\n}",
                language: "javascript",
                test: "node",
              },
              {
                name: "playback-reference.js",
                code: '// Independent alternatives: web is a loaded lottie-web AnimationItem.\nweb.pause();\nweb.goToAndStop(0, true);\nweb.setDirection(1);\nweb.setSpeed(1);\nweb.play();\n// dot is a loaded DotLottie instance; this is its different API.\ndot.pause();\ndot.setFrame(0);\ndot.setMode("reverse");\ndot.setSpeed(1);\n// Seek to the intended end before reverse playback when starting from rest.\ndot.setFrame(Math.max(0, dot.totalFrames - 1));\ndot.play();',
                language: "javascript",
                test: "reference",
              },
            ],
            requires:
              "The reference block requires separate loaded web and dot players; the mapping helper runs independently",
            note: "",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/playback-control",
            checkpoint: "",
          },
          {
            name: "Segments and completion events are a sequencing contract",
            explanation:
              "A segment restricts a timeline range. lottie-web playSegments([start,end], true) interrupts immediately; false queues behind the active segment. Reversed ranges can express reverse segment playback. DotLottie setSegment(start,end) chooses a range, and setMode controls direction. Markers can provide names, but the export and player must agree on marker format and duration.\n\nListen for completion rather than guessing when a request or animation will finish. Register listeners before issuing playback, remove one-shot handlers when finished, and cancel them during teardown. Resolve rapid interactions with an explicit policy: interrupt to the newest state, queue meaningful actions, or disable only the command that cannot safely repeat. A looping animation does not produce the same completion boundary as a one-shot.",
            files: [
              {
                name: "play-once.js",
                code: 'export function playOnce(animation, onComplete) {\n  const complete = () => {\n    animation.removeEventListener("complete", complete);\n    onComplete();\n  };\n  animation.addEventListener("complete", complete);\n  animation.setDirection(1);\n  animation.goToAndPlay(0, true);\n  return () => animation.removeEventListener("complete", complete);\n}\n// Require loop:false and a loaded lottie-web instance.\n// Keep and call the returned cleanup when interrupting or removing the UI.',
                language: "javascript",
                test: "reference",
              },
            ],
            requires:
              "Loaded non-looping lottie-web player; callbacks are application code",
            note: "",
            source: "https://github.com/airbnb/lottie-web/wiki/Markers",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 11,
        name: "Build interactive controls",
        phase: 5,
        topics: [
          {
            depth: 0,
            text: "Hover and pointer entry/exit animations.",
          },
          {
            depth: 0,
            text: "Click-triggered play/reverse and toggle controls.",
          },
          {
            depth: 0,
            text: "Keyboard activation and focus-driven interactions.",
          },
          {
            depth: 0,
            text: "Form validation, success, warning, and error states.",
          },
          {
            depth: 0,
            text: "Loading-to-success and loading-to-error transitions.",
          },
          {
            depth: 0,
            text: "Animated navigation/menu icons, accordions, tabs, and tooltips.",
          },
          {
            depth: 0,
            text: "Drag/pointer position mapped to animation progress where appropriate.",
          },
          {
            depth: 0,
            text: "Debouncing, throttling, and guarding transitions to avoid conflicting commands.",
          },
        ],
        lessons: [
          {
            name: "Make the button semantic before animating its state",
            explanation:
              "Use a real button for keyboard activation and an aria-pressed or aria-expanded state that represents the actual UI, not the current animation frame. Pointer hover and focus can preview affordance, but they must not secretly toggle application state. Keep a visible label and focus indicator; the animation inside a control can be decorative.\n\nThis toggle writes its semantic state immediately, then seeks the illustration to the matching endpoint. That is also a robust reduced-motion behavior. After this contract works, a loaded controller may animate between states with an interruption policy. For pointer-position scrubbing, clamp the local x coordinate and use requestAnimationFrame; keep an equivalent keyboard operation.",
            files: [
              {
                name: "toggle.html",
                code: '<button id="toggle" type="button" aria-pressed="false">\n  <span>Enable reminders</span><span data-art aria-hidden="true"></span>\n</button>',
                language: "html",
                test: "reference",
              },
              {
                name: "toggle.js",
                code: 'import { mountJSON } from "./mount-json.js";\nexport function mountToggle(button, src) {\n  const owner = new AbortController();\n  const controller = mountJSON(button.querySelector("[data-art]"), src);\n  button.addEventListener(\n    "click",\n    () => {\n      const enabled = button.getAttribute("aria-pressed") !== "true";\n      button.setAttribute("aria-pressed", String(enabled));\n      controller.progress(enabled ? 1 : 0);\n    },\n    { signal: owner.signal },\n  );\n  return () => {\n    owner.abort();\n    controller.destroy();\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "Chapter 8 mount-json.js; call mountToggle with #toggle and a two-state exported asset; the dot fixture can test seeking",
            note: "",
            source: "https://www.w3.org/WAI/ARIA/apg/patterns/button/",
            checkpoint: "",
          },
          {
            name: "Application status drives the visual state",
            explanation:
              "Loading, success, and error describe the application request. An animation completion does not prove the request succeeded. Keep the newest request identity, abort outdated work, and ignore late results after removal. Disable duplicate submissions only while the current action is pending, and provide a text status even when art fails.\n\nThis example receives a real request function and a showState callback that can select assets/segments. It does not invent a successful result using a timer. Cleanup aborts the owned request and listener. The showState implementation should gate unloaded players and use static states under reduced motion.",
            files: [
              {
                name: "submit.js",
                code: 'export function mountSubmit(form, request, showState) {\n  const owner = new AbortController();\n  let pending;\n  let generation = 0;\n  const button = form.querySelector("button[type=submit]");\n  const status = form.querySelector("[role=status]");\n  form.addEventListener(\n    "submit",\n    async (event) => {\n      event.preventDefault();\n      if (!form.reportValidity()) return;\n      pending?.abort();\n      pending = new AbortController();\n      const mine = ++generation;\n      button.disabled = true;\n      status.textContent = "Submitting…";\n      showState("loading");\n      try {\n        await request(new FormData(form), pending.signal);\n        if (owner.signal.aborted || mine !== generation) return;\n        status.textContent = "Saved";\n        showState("success");\n      } catch (error) {\n        if (owner.signal.aborted || mine !== generation) return;\n        status.textContent = "Could not save. Please try again.";\n        showState("error");\n      } finally {\n        if (mine === generation && !owner.signal.aborted)\n          button.disabled = false;\n      }\n    },\n    { signal: owner.signal },\n  );\n  return () => {\n    generation++;\n    owner.abort();\n    pending?.abort();\n    button.disabled = false;\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "Form with submit button and role=status element; request(data, signal) rejects on failure; showState must own its animation cleanup",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 12,
        name: "Viewport-driven animation",
        phase: 6,
        topics: [
          {
            depth: 0,
            text: "Use `IntersectionObserver` to start animations when they become visible.",
          },
          {
            depth: 0,
            text: "Pause or stop off-screen animations where appropriate.",
          },
          {
            depth: 0,
            text: "Choose whether to replay, play once, or preserve progress when an element re-enters the viewport.",
          },
          {
            depth: 0,
            text: "Understand lazy loading and the difference between *loading* an animation and *playing* it.",
          },
          {
            depth: 0,
            text: "Handle elements initially hidden in tabs, modals, or accordions.",
          },
        ],
        lessons: [
          {
            name: "Visibility should gate playback, not replace readiness",
            explanation:
              "IntersectionObserver tells you whether the target meets an intersection threshold. It does not tell you the asset loaded or that a user actually read it. Track visibility and readiness independently, then play only when both are true. Decide whether re-entry resumes, restarts, or does nothing after one completed play.\n\nThe controller below pauses off-screen and in a background tab, honors reduced motion dynamically, and retains a user’s pause choice. It removes every owned observer/listener on cleanup. Revealing an initially hidden tab/modal may also require the player’s resize method once real geometry exists. Preserve semantic content throughout.",
            files: [
              {
                name: "visibility.js",
                code: 'export function ownVisibility(target, player, { isReady, seekStatic }) {\n  const reduced = matchMedia("(prefers-reduced-motion: reduce)");\n  const owner = new AbortController();\n  let visible = false;\n  let userPaused = false;\n  const sync = () => {\n    if (!isReady()) return;\n    if (reduced.matches) {\n      player.pause();\n      seekStatic();\n    } else if (visible && !document.hidden && !userPaused) player.play();\n    else player.pause();\n  };\n  const observer = new IntersectionObserver(\n    ([entry]) => {\n      visible = entry.isIntersecting;\n      sync();\n    },\n    { threshold: 0.1 },\n  );\n  observer.observe(target);\n  reduced.addEventListener("change", sync, { signal: owner.signal });\n  document.addEventListener("visibilitychange", sync, { signal: owner.signal });\n  return {\n    sync, // Also call from the player\'s load/DOMLoaded handler.\n    setPaused(value) {\n      userPaused = value;\n      sync();\n    },\n    destroy() {\n      observer.disconnect();\n      owner.abort();\n      player.pause();\n    },\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "A player with play/pause; pass an isReady callback and a player-specific static-frame callback; no autoplay owner elsewhere",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",
            checkpoint: "",
          },
          {
            name: "Lazy-load the runtime and asset as separate decisions",
            explanation:
              "Pausing after an eager load saves drawing work but not initial download/initialization cost. Use a generous observer rootMargin to import a runtime and fetch an asset before it is needed. Handle an element being removed while the import is pending: a disposed flag must prevent creating a player afterward.\n\nA modal/tab can be inside a connected document while measuring zero size. Initialize after reveal or explicitly resize after layout. Decide whether to keep a paused instance for quick return or destroy it to release memory. Never attach a new instance every time the tab opens without cleaning up the previous one.",
            files: [
              {
                name: "lazy.js",
                code: 'export function lazyMount(host, mount) {\n  let disposed = false;\n  let cleanup;\n  const observer = new IntersectionObserver(\n    async ([entry]) => {\n      if (!entry.isIntersecting) return;\n      observer.disconnect();\n      try {\n        const { mountJSON } = await import("./mount-json.js");\n        if (disposed) return;\n        const controller = mountJSON(host, "/animations/dot.json");\n        cleanup = () => controller.destroy();\n        mount(controller); // Caller chooses playback and readiness policy.\n      } catch {\n        if (!disposed) host.dataset.animationError = "true"; // Keep separate fallback content visible.\n      }\n    },\n    { rootMargin: "200px" },\n  );\n  observer.observe(host);\n  return () => {\n    disposed = true;\n    observer.disconnect();\n    cleanup?.();\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "Chapter 8 helper and a host with a stable aspect ratio; call the returned cleanup on removal",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 13,
        name: "Scroll-driven animation",
        phase: 6,
        topics: [
          {
            depth: 0,
            text: "Map scroll progress to animation frames.",
          },
          {
            depth: 0,
            text: "Use `requestAnimationFrame` and normalized scroll progress for lightweight manual control.",
          },
          {
            depth: 0,
            text: "Connect playback to GSAP ScrollTrigger when complex scroll sequencing is needed.",
          },
          {
            depth: 0,
            text: "Learn ScrollTrigger concepts: `trigger`, `start`, `end`, `scrub`, `pin`, and refresh.",
          },
          {
            depth: 0,
            text: "Synchronize Lottie frames with GSAP timelines, text, and surrounding DOM effects.",
          },
          {
            depth: 0,
            text: "Handle scroll direction reversal and rapid scroll changes.",
          },
          {
            depth: 0,
            text: "Recalculate geometry on resize or responsive layout changes.",
          },
          {
            depth: 0,
            text: "Ensure only one controller owns the Lottie playhead at a time.",
          },
          {
            depth: 0,
            text: "Support reduced motion with a useful non-scrubbed or static experience.",
          },
        ],
        lessons: [
          {
            name: "Map scroll geometry into a bounded frame",
            explanation:
              "For a simple scene, normalized progress can come from how far a section has moved through the viewport. Coalesce scroll/resize notifications into one requestAnimationFrame callback, measure geometry once, and then seek a paused player. The formula below uses the section’s travel from its top entering the viewport to its bottom leaving. Different storytelling requirements need different start/end geometry.\n\nDo not attach a second autoplay controller. Recompute after responsive layout changes, and call update after the asset becomes ready. Under reduced motion, show a meaningful static state and keep the product explanation in normal document flow.",
            files: [
              {
                name: "scroll-manual.js",
                code: 'import { progressToFrame } from "./frames.js";\nexport function mountScroll(section, player) {\n  const owner = new AbortController();\n  const reduced = matchMedia("(prefers-reduced-motion: reduce)");\n  let frame;\n  const update = () => {\n    frame = undefined;\n    if (!player.isLoaded) return;\n    const rect = section.getBoundingClientRect();\n    const progress = reduced.matches\n      ? 0\n      : (innerHeight - rect.top) / (innerHeight + rect.height);\n    player.setFrame(progressToFrame(progress, player.totalFrames));\n  };\n  const schedule = () => {\n    if (frame === undefined) frame = requestAnimationFrame(update);\n  };\n  player.pause();\n  window.addEventListener("scroll", schedule, {\n    passive: true,\n    signal: owner.signal,\n  });\n  window.addEventListener("resize", schedule, { signal: owner.signal });\n  reduced.addEventListener("change", schedule, { signal: owner.signal });\n  player.addEventListener("load", schedule);\n  schedule();\n  return () => {\n    owner.abort();\n    cancelAnimationFrame(frame);\n    player.removeEventListener("load", schedule);\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "Loaded or loading DotLottie instance, no state machine/autoplay owner; section contains readable HTML content",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame",
            checkpoint: "",
          },
          {
            name: "Use ScrollTrigger when the scene needs choreography",
            explanation:
              "ScrollTrigger defines start/end boundaries, optional pinning, and how a GSAP playhead follows scroll. scrub:true follows directly; numeric scrub smooths catch-up. Animate a plain frame/progress object and use onUpdate to seek Lottie rather than trying to tween internal renderer structures. The surrounding DOM can share the same GSAP timeline.\n\nWait for asset readiness before reading totalFrames. Use matchMedia/context cleanup so switching to reduced motion removes the trigger and pin. Refresh after known image/font/layout changes; do not refresh on every scroll. Pinning is optional and should not remove the reduced-motion reading path. The helper below can be called from a DotLottie load handler.",
            files: [
              {
                name: "scroll-gsap.js",
                code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\nimport { progressToFrame } from "./frames.js";\ngsap.registerPlugin(ScrollTrigger);\n\nexport function mountStory(section, player) {\n  player.pause();\n  const media = gsap.matchMedia();\n  media.add("(prefers-reduced-motion: no-preference)", () => {\n    const playhead = { progress: 0 };\n    gsap.to(playhead, {\n      progress: 1,\n      ease: "none",\n      onUpdate: () =>\n        player.setFrame(progressToFrame(playhead.progress, player.totalFrames)),\n      scrollTrigger: {\n        trigger: section,\n        start: "top bottom",\n        end: "bottom top",\n        scrub: true,\n        invalidateOnRefresh: true,\n      },\n    });\n  });\n  media.add("(prefers-reduced-motion: reduce)", () => player.setFrame(0));\n  return () => {\n    media.revert();\n    player.pause();\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "GSAP 3.15.0, ScrollTrigger, frames.js, and a loaded DotLottie instance; call cleanup before destroying that player",
            note: "",
            source: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 14,
        name: "State machines",
        phase: 7,
        topics: [
          {
            depth: 0,
            text: "Understand finite state machines: states, transitions, events, inputs, and conditions/guards.",
          },
          {
            depth: 0,
            text: "Separate animation state from application/business state.",
          },
          {
            depth: 0,
            text: "Design idle, hover, active, loading, success, and error states.",
          },
          {
            depth: 0,
            text: "Create transitions triggered by clicks, pointer events, completion, or application events.",
          },
          {
            depth: 0,
            text: "Learn how to author state machines and package them in compatible `.lottie` files.",
          },
          {
            depth: 0,
            text: "Load/start/stop state machines and provide inputs through the selected player API.",
          },
          {
            depth: 0,
            text: "Debug unreachable states, unexpected transitions, and conflicting input events.",
          },
          {
            depth: 0,
            text: "Understand feature and API version compatibility before relying on state machines.",
          },
        ],
        lessons: [
          {
            name: "Model animation state separately from business state",
            explanation:
              "A finite state machine has named states, inputs/events, transitions, and guards that decide when a transition is legal. The application decides whether a request succeeded; the motion graph decides how to depict that result. Keep disabled, pending, and error semantics in HTML/application state even when the animation graph also has visually similar states.\n\nThe supplied study bundle contains a deliberately small graph: idle and active, controlled by a boolean isActive. Its JSON is included as a downloadable file. It demonstrates the integration mechanics, not a finished five-state button design. Expand it in the chosen authoring tool with explicit hover/pressed/success/disabled states, then document event precedence and interruption behavior.",
            files: [
              {
                name: "button-state-machine.json",
                code: '{\n  "initial": "idle",\n  "states": [\n    {\n      "name": "idle",\n      "type": "PlaybackState",\n      "animation": "dot",\n      "autoplay": false,\n      "loop": false,\n      "transitions": [\n        {\n          "type": "Transition",\n          "toState": "active",\n          "guards": [\n            {\n              "type": "Boolean",\n              "inputName": "isActive",\n              "conditionType": "Equal",\n              "compareTo": true\n            }\n          ]\n        }\n      ]\n    },\n    {\n      "name": "active",\n      "type": "PlaybackState",\n      "animation": "dot",\n      "autoplay": true,\n      "loop": true,\n      "transitions": [\n        {\n          "type": "Transition",\n          "toState": "idle",\n          "guards": [\n            {\n              "type": "Boolean",\n              "inputName": "isActive",\n              "conditionType": "Equal",\n              "compareTo": false\n            }\n          ]\n        }\n      ]\n    }\n  ],\n  "inputs": [\n    {\n      "type": "Boolean",\n      "name": "isActive",\n      "value": false\n    }\n  ],\n  "interactions": []\n}',
                language: "json",
                test: "reference",
              },
              {
                name: "state-contract.json",
                code: '{\n  "machine": "button",\n  "initial": "idle",\n  "input": {\n    "isActive": "Boolean"\n  },\n  "transitions": [\n    "idle \\u2192 active when isActive=true",\n    "active \\u2192 idle when isActive=false"\n  ],\n  "applicationOwns": ["disabled", "request result", "accessible labels"]\n}',
                language: "json",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://dotlottie.io/spec/2.0/",
            checkpoint: "",
          },
          {
            name: "Load the graph before sending inputs",
            explanation:
              "Wait for the animation load event, load the machine by its manifest ID, then start it. Check the boolean return values: a missing machine/input must expose a failure rather than leave a silently frozen button. Set persistent boolean/numeric/string inputs or fire the graph’s named event inputs; these operations are not interchangeable with scrubbing frames.\n\nThe helper uses the bundle’s real button/isActive contract. It keeps HTML aria-pressed in sync, supports ordinary keyboard activation through a native button, and stops the machine for reduced motion. Preference changes are handled at runtime. A graph may contain URL-opening/custom actions, so review its provenance and runtime security configuration. The 0.81.0 package marks state-machine methods experimental, so pin and regression-test them. This is a feature-sensitive 0.81.0 example; do not paste it into a different player or older wrapper.",
            files: [
              {
                name: "state-machine.js",
                code: 'export function mountStateButton(button, player, onError = () => {}) {\n  const owner = new AbortController();\n  const reduced = matchMedia("(prefers-reduced-motion: reduce)");\n  let loaded = false;\n  let active = button.getAttribute("aria-pressed") === "true";\n  const fail = (message) => onError(new Error(message));\n  const sync = () => {\n    if (!loaded) return;\n    if (reduced.matches) {\n      player.stateMachineStop();\n      player.pause();\n      player.setFrame(active ? Math.max(0, player.totalFrames - 1) : 0);\n    } else {\n      if (!player.isStateMachineRunning && !player.stateMachineStart())\n        return fail("Cannot start state machine");\n      if (!player.stateMachineSetBooleanInput("isActive", active))\n        fail("Missing isActive input");\n    }\n  };\n  const onLoad = () => {\n    loaded = player.stateMachineLoad("button");\n    if (!loaded) return fail("Missing button state machine");\n    sync();\n  };\n  player.addEventListener("load", onLoad);\n  button.addEventListener(\n    "click",\n    () => {\n      active = !active;\n      button.setAttribute("aria-pressed", String(active));\n      sync();\n    },\n    { signal: owner.signal },\n  );\n  reduced.addEventListener("change", sync, { signal: owner.signal });\n  if (player.isLoaded) onLoad();\n  return () => {\n    owner.abort();\n    player.removeEventListener("load", onLoad);\n    player.stateMachineStop();\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "DotLottie 0.81.0 loaded with study.lottie; native button aria-pressed=false; caller owns loadError and player destruction",
            note: "",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/state-machines",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 15,
        name: "Dynamic visual customization",
        phase: 7,
        topics: [
          {
            depth: 0,
            text: "Runtime theming for light/dark mode or brand variants where supported.",
          },
          {
            depth: 0,
            text: "Themes and property slots/overrides in supporting dotLottie runtimes.",
          },
          {
            depth: 0,
            text: "Reusable animations with customizable colors and values.",
          },
          {
            depth: 0,
            text: "Multi-animation bundles and selecting animations by identifier.",
          },
          {
            depth: 0,
            text: "Coordinating multiple related animations through shared application state.",
          },
          {
            depth: 0,
            text: "Deciding when independent animation instances are simpler than one complex state machine.",
          },
        ],
        lessons: [
          {
            name: "Themes need authored targets, not arbitrary CSS recoloring",
            explanation:
              "SVG rendered by lottie-web can be inspected, but patching generated DOM colors ties application code to internal markup and can be overwritten on the next frame. DotLottie themes and slots provide explicit customization where the asset/runtime supports them. A .lottie extension alone does not imply there are any theme IDs to select.\n\nThe original dot fixture exposes an accent color slot, so setColorSlot can recolor it without changing the animation’s timing. Values are normalized RGBA components, not 0–255 CSS channels. Check the result and retain the original artwork/fallback if the slot is unavailable. Use your site theme state to choose a value rather than maintaining a second unrelated light/dark preference.",
            files: [
              {
                name: "theme-slot.js",
                code: 'export function applyBrand(player, dark) {\n  if (!player.isLoaded) return false;\n  const color = dark ? [0.55, 0.75, 1, 1] : [0.15, 0.39, 0.92, 1];\n  return player.setColorSlot("accent", color);\n}\n// With an asset that actually exports named themes, instead:\n// const applied = player.setTheme("dark");\n// if (!applied) keep the fallback/default theme.',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "DotLottie 0.81.0 and dot.json or study.lottie; call after load and again when your application theme changes",
            note: 'study.lottie supplies a color slot, not named light/dark theme files. setTheme("dark") would not succeed on this fixture.',
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/slots",
            checkpoint: "",
          },
          {
            name: "Select asset IDs and coordinate through application state",
            explanation:
              "A multi-animation archive can contain several independent illustrations with stable IDs. loadAnimation(id) selects one; treat that as a load boundary and reapply any controller policy after load. Avoid installing another handler inside every load callback. Theme IDs, machine IDs, and animation IDs are different namespaces.\n\nFor a group of status icons, a shared application state can drive separate instances more simply than one enormous graph. If several players must depict one operation, update them from the same state reducer rather than from each other’s frame events. Separate instances cost memory and CPU, so measure realistic concurrent counts and stop hidden work.",
            files: [
              {
                name: "choose-animation.js",
                code: 'export function chooseAnimation(player, id) {\n  const available = player.manifest?.animations?.some(\n    (animation) => animation.id === id,\n  );\n  if (!available) throw new Error(`Animation ID not found: ${id}`);\n  player.pause();\n  player.loadAnimation(id);\n}\n// study.lottie exports "dot" and "alternate".\n// Reapply slots/playback from one persistent load listener.',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "Loaded multi-animation DotLottie bundle; the selected animation changes, not the entire canvas owner",
            note: "",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/multi-animation",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 16,
        name: "TypeScript patterns",
        phase: 8,
        topics: [
          {
            depth: 0,
            text: "Use available runtime TypeScript types and typed player references.",
          },
          {
            depth: 0,
            text: "Model animation options, events, status, and exposed controller methods.",
          },
          {
            depth: 0,
            text: "Use discriminated unions for interactive component states.",
          },
          {
            depth: 0,
            text: "Safely handle missing DOM nodes, unloaded animations, and nullable references.",
          },
          {
            depth: 0,
            text: "Design a typed abstraction without hiding necessary player-specific features.",
          },
          {
            depth: 0,
            text: "Avoid loosely typed event payloads and unnecessary `any` usage.",
          },
        ],
        lessons: [
          {
            name: "Types should expose readiness and player differences",
            explanation:
              "Use the runtime’s shipped types rather than an any-shaped player. A discriminated union lets callers distinguish loading, ready, failed, and destroyed states. Narrow DOM queries before constructing a player and use typed listeners from the actual package. Do not pretend a lottie-web AnimationItem and a DotLottie canvas renderer are interchangeable just because both have play().\n\nThe controller below deliberately supports lottie-web JSON/SVG only. It queues a requested progress or playback intent until readiness, clamps progress, exposes the underlying typed instance for specialized features, and removes listeners on idempotent destroy. A source change creates a new owner; it does not leave an older pending player alive.",
            files: [
              {
                name: "LottieController.ts",
                code: 'import lottie, { type AnimationItem } from "lottie-web";\n\nexport type AnimationStatus =\n  | { kind: "loading" }\n  | { kind: "ready" }\n  | { kind: "error"; error: Error }\n  | { kind: "destroyed" };\n\nexport class LottieController {\n  readonly instance: AnimationItem;\n  #status: AnimationStatus = { kind: "loading" };\n  #progress = 0;\n  #wantsPlay = false;\n  constructor(container: HTMLElement, src: string) {\n    this.instance = lottie.loadAnimation({\n      container,\n      path: src,\n      renderer: "svg",\n      loop: false,\n      autoplay: false,\n    });\n    this.instance.addEventListener("DOMLoaded", this.#loaded);\n    this.instance.addEventListener("data_failed", this.#failed);\n    this.instance.addEventListener("error", this.#failed);\n  }\n  get status(): AnimationStatus {\n    return this.#status;\n  }\n  #loaded = () => {\n    if (this.#status.kind === "destroyed") return;\n    this.#status = { kind: "ready" };\n    this.#draw();\n    if (this.#wantsPlay) this.instance.play();\n  };\n  #failed = () => {\n    if (this.#status.kind !== "destroyed")\n      this.#status = { kind: "error", error: new Error("Animation failed") };\n  };\n  #draw() {\n    this.instance.goToAndStop(\n      this.#progress * Math.max(0, this.instance.totalFrames - 1),\n      true,\n    );\n  }\n  play() {\n    if (this.#status.kind === "destroyed" || this.#status.kind === "error")\n      return;\n    this.#wantsPlay = true;\n    if (this.#status.kind === "ready") this.instance.play();\n  }\n  pause() {\n    this.#wantsPlay = false;\n    if (this.#status.kind === "ready") this.instance.pause();\n  }\n  progress(value: number) {\n    this.#wantsPlay = false;\n    this.#progress = Number.isFinite(value)\n      ? Math.min(1, Math.max(0, value))\n      : 0;\n    if (this.#status.kind === "ready") this.#draw();\n  }\n  destroy() {\n    if (this.#status.kind === "destroyed") return;\n    this.#status = { kind: "destroyed" };\n    this.instance.removeEventListener("DOMLoaded", this.#loaded);\n    this.instance.removeEventListener("data_failed", this.#failed);\n    this.instance.removeEventListener("error", this.#failed);\n    this.instance.destroy();\n  }\n}',
                language: "typescript",
                test: "typescript",
              },
            ],
            requires:
              "Browser/Vite TypeScript project, lottie-web 5.13.0; import on the client; expose fallback UI when status.kind is error",
            note: "",
            source:
              "https://github.com/airbnb/lottie-web/blob/master/index.d.ts",
            checkpoint: "",
          },
          {
            name: "Narrow events and compose capabilities deliberately",
            explanation:
              "Prefer a small shared contract for basic operations and explicit player-specific access for segments, slots, or state machines. A normalized seek operation can hide unit conversion; it should not hide that only a particular player supports a graph input. Use discriminated unions to make illegal combinations visible in TypeScript.\n\nTyped event payloads make error handling clearer. The DotLottie listener below reads loadError.error using the event type inferred by addEventListener, and cleanup passes the same callback reference. Keeping custom state in a typed reducer also makes race-condition and interruption tests independent of a graphics engine.",
            files: [
              {
                name: "typed-events.ts",
                code: 'import type { DotLottie } from "@lottiefiles/dotlottie-web";\n\nexport type MotionSource =\n  | { kind: "json-svg"; src: string }\n  | { kind: "dotlottie"; src: string; machineId?: string };\n\nexport function reportFailures(\n  player: DotLottie,\n  report: (error: Error) => void,\n) {\n  const listener: Parameters<DotLottie["addEventListener"]>[1] = (event) => {\n    if (event.type === "loadError") report(event.error);\n  };\n  player.addEventListener("loadError", listener);\n  return () => player.removeEventListener("loadError", listener);\n}',
                language: "typescript",
                test: "typescript",
              },
            ],
            requires:
              "DotLottie 0.81.0 types; compile with strict:true and DOM libraries",
            note: "",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 17,
        name: "React and modern front-end frameworks",
        phase: 8,
        topics: [
          {
            depth: 0,
            text: "Use an appropriate official/community wrapper when it meets your requirements.",
          },
          {
            depth: 0,
            text: "Understand React refs, component state, effects, and cleanup.",
          },
          {
            depth: 0,
            text: "Avoid recreating the animation instance on every render.",
          },
          {
            depth: 0,
            text: "Deal with asynchronous load and changes to source, theme, or playback state.",
          },
          {
            depth: 0,
            text: "Handle React Strict Mode development lifecycle behavior correctly.",
          },
          {
            depth: 0,
            text: "Understand client-only initialization and SSR/hydration concerns in Next.js.",
          },
          {
            depth: 0,
            text: "Use lazy/dynamic imports for animations that are not needed immediately.",
          },
          {
            depth: 0,
            text: "Expose reusable props such as `src`, `autoplay`, `loop`, `playOnView`, `reducedMotion`, and `onComplete`.",
          },
          {
            depth: 0,
            text: "Evaluate integration differences for Vue, Svelte, and Web Components as optional extensions.",
          },
        ],
        lessons: [
          {
            name: "A React effect owns the player, not the render function",
            explanation:
              "Keep the host in a ref and create the player in an effect. The render path must stay safe on the server. The component below lazy-imports lottie-web on the client, avoids creation after unmount, and destroys its player/observer/listeners on cleanup. React Strict Mode’s extra development setup/cleanup cycle is a useful ownership test, not a reason to disable cleanup.\n\nPrimitive playback/source props deliberately define when this example rebuilds. Ordinary parent renders do not create another instance. onComplete is kept in a ref so a new callback identity does not recreate the renderer. The HTML fallback and label render before effects, and readiness/error update the visual fallback rather than making important UI depend on animation.",
            files: [
              {
                name: "LottieFigure.tsx",
                code: '"use client";\nimport { useEffect, useRef, useState } from "react";\nimport type { AnimationItem } from "lottie-web";\n\ntype Props = {\n  src: string;\n  label: string;\n  fallback: string;\n  loop?: boolean;\n  autoplay?: boolean;\n  playOnView?: boolean;\n  reducedMotion?: "system" | "reduce" | "allow";\n  onComplete?: () => void;\n};\n\nexport function LottieFigure({\n  src,\n  label,\n  fallback,\n  loop = false,\n  autoplay = false,\n  playOnView = true,\n  reducedMotion = "system",\n  onComplete,\n}: Props) {\n  const host = useRef<HTMLDivElement>(null);\n  const complete = useRef(onComplete);\n  const [status, setStatus] = useState("loading");\n  useEffect(() => {\n    complete.current = onComplete;\n  }, [onComplete]);\n  useEffect(() => {\n    const container = host.current;\n    if (!container) return;\n    const owner = new AbortController();\n    const preference = matchMedia("(prefers-reduced-motion: reduce)");\n    let animation: AnimationItem | undefined;\n    let observer: IntersectionObserver | undefined;\n    let disposed = false;\n    let ready = false;\n    let visible = !playOnView;\n    const sync = () => {\n      if (!ready || !animation || disposed) return;\n      const reduce =\n        reducedMotion === "reduce" ||\n        (reducedMotion === "system" && preference.matches);\n      if (reduce) animation.goToAndStop(0, true);\n      else if (autoplay && visible && !document.hidden) animation.play();\n      else animation.pause();\n    };\n    setStatus("loading");\n    preference.addEventListener("change", sync, { signal: owner.signal });\n    document.addEventListener("visibilitychange", sync, {\n      signal: owner.signal,\n    });\n    if (playOnView) {\n      observer = new IntersectionObserver(([entry]) => {\n        visible = entry.isIntersecting;\n        sync();\n      });\n      observer.observe(container);\n    }\n    void import("lottie-web")\n      .then(({ default: lottie }) => {\n        if (disposed) return;\n        animation = lottie.loadAnimation({\n          container,\n          path: src,\n          renderer: "svg",\n          loop,\n          autoplay: false,\n        });\n        animation.addEventListener("DOMLoaded", () => {\n          if (disposed) return;\n          ready = true;\n          setStatus("ready");\n          sync();\n        });\n        const fail = () => {\n          if (!disposed) setStatus("error");\n        };\n        animation.addEventListener("data_failed", fail);\n        animation.addEventListener("error", fail);\n        animation.addEventListener("complete", () => {\n          if (!disposed) complete.current?.();\n        });\n      })\n      .catch(() => {\n        if (!disposed) setStatus("error");\n      });\n    return () => {\n      disposed = true;\n      owner.abort();\n      observer?.disconnect();\n      animation?.destroy();\n    };\n  }, [src, loop, autoplay, playOnView, reducedMotion]);\n  return (\n    <figure aria-label={label}>\n      <div\n        aria-hidden="true"\n        style={{ position: "relative", width: "100%", aspectRatio: "1" }}\n      >\n        <div ref={host} style={{ position: "absolute", inset: 0 }} />\n        <img\n          src={fallback}\n          width="256"\n          height="256"\n          alt=""\n          hidden={status === "ready"}\n          style={{\n            position: "absolute",\n            inset: 0,\n            width: "100%",\n            height: "100%",\n            objectFit: "contain",\n          }}\n        />\n      </div>\n      <figcaption>\n        {label}\n        <span role="status">\n          {status === "error" ? " — Static illustration shown" : ""}\n        </span>\n      </figcaption>\n    </figure>\n  );\n}',
                language: "tsx",
                test: "typescript",
              },
            ],
            requires:
              "React 19.2 reference, strict TypeScript, lottie-web 5.13.0; caller must offer pause/stop controls if enabling persistent autoplay",
            note: "",
            source: "https://react.dev/reference/react/useEffect",
            checkpoint: "",
          },
          {
            name: "Wrappers and SSR still require lifecycle decisions",
            explanation:
              "An official/community wrapper can own the canvas and player lifecycle, but it cannot choose your fallback, business state, or accessibility policy. Evaluate which runtime/version it wraps, how it delivers a ref, how source changes behave, and whether callbacks must be unsubscribed. Vue onMounted/onUnmounted and Svelte onMount cleanup play analogous ownership roles; Web Components need connected/disconnected handling.\n\nIn Next.js, keep browser initialization in a client component/effect, and dynamically import browser-dependent libraries there. A client component can still participate in server rendering, so do not read window in module scope or the render path. Lazy-load noncritical sections and preserve the same initial HTML structure to avoid hydration mismatches.",
            files: [
              {
                name: "next-usage.tsx",
                code: 'import { LottieFigure } from "./LottieFigure";\nexport default function Page() {\n  return (\n    <LottieFigure\n      src="/animations/dot.json"\n      fallback="/animations/fallback.svg"\n      label="How the process moves"\n      autoplay={false}\n    />\n  );\n}',
                language: "tsx",
                test: "typescript",
              },
            ],
            requires:
              "Next.js app route; LottieFigure is the client boundary; use the deployment base in real asset URLs",
            note: "",
            source:
              "https://nextjs.org/docs/app/api-reference/directives/use-client",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 18,
        name: "Build a reusable animation component/library",
        phase: 8,
        topics: [
          {
            depth: 0,
            text: "Encapsulate initialization, configuration, event subscriptions, and destruction.",
          },
          {
            depth: 0,
            text: "Provide a clean API for play, pause, restart, progress, and state changes.",
          },
          {
            depth: 0,
            text: "Document which library and file formats your abstraction supports.",
          },
          {
            depth: 0,
            text: "Support multiple independent instances on one page.",
          },
          {
            depth: 0,
            text: "Integrate accessible labels, fallbacks, loading states, and error handling.",
          },
          {
            depth: 0,
            text: "Test for listener leaks, duplicate instances, race conditions, and unmounted components.",
          },
        ],
        lessons: [
          {
            name: "Make the supported contract small and explicit",
            explanation:
              "A reusable component should document the runtime/file formats it accepts, who owns the playhead, when calls become valid, and how fallback/error states appear. Support independent instances and idempotent disposal. A restart method should not quietly change loop policy, and progress should not compete with autoplay or state-machine ownership.\n\nExpose play, pause, restart, seek, and destroy only when you can define their behavior. Keep specialized methods behind explicit capabilities or the typed underlying instance. For library code, validate inputs and use a fresh data object when a renderer mutates animationData. Avoid global player methods that affect unrelated instances.",
            files: [
              {
                name: "restart.ts",
                code: 'import type { LottieController } from "./LottieController";\nexport function restart(controller: LottieController) {\n  if (\n    controller.status.kind === "destroyed" ||\n    controller.status.kind === "error"\n  )\n    return;\n  controller.progress(0);\n  controller.instance.setDirection(1);\n  controller.play();\n}',
                language: "typescript",
                test: "typescript",
              },
            ],
            requires:
              "Chapter 16 controller; it supports lottie-web JSON/SVG, not dotLottie bundles",
            note: "",
            source: "https://github.com/airbnb/lottie-web/wiki/Usage",
            checkpoint: "",
          },
          {
            name: "Test the owner’s behavior before testing pixels",
            explanation:
              "Listener leaks and duplicate renderers often come from ownership mistakes rather than incorrect frame math. Test mount → interact → unmount → remount, source changes during loading, duplicate cleanup, multiple independent instances, and failures after navigation. Confirm an old promise or load event cannot mutate the new component.\n\nUse unit tests for state/mapping and command-level integration tests for controller behavior. Add real-player browser tests to catch renderer differences and screenshots at selected states to check visual output. A mocked player cannot prove that a font loads or a matte renders correctly; a screenshot alone cannot prove cleanup or keyboard semantics.",
            files: [
              {
                name: "lifecycle-checklist.txt",
                code: "Mount two instances → each owns one host/canvas\nChange source before load → old instance is destroyed\nUnmount twice → no extra listeners/timers or renderer nodes\nRemount in Strict Mode → one surviving instance\nFail the asset request → text/static fallback remains usable\nToggle reduced motion → existing playback policy updates",
                language: "plaintext",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://react.dev/reference/react/StrictMode",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 19,
        name: "Optimize animation source files",
        phase: 9,
        topics: [
          {
            depth: 0,
            text: "Prefer simple vector geometry when it produces the required visual result.",
          },
          {
            depth: 0,
            text: "Reduce unnecessarily detailed paths, masks, mattes, nested compositions, and repeating elements.",
          },
          {
            depth: 0,
            text: "Remove hidden/unused layers and assets that are not required at runtime.",
          },
          {
            depth: 0,
            text: "Review frame rates and duration with the designer instead of assuming more frames are better.",
          },
          {
            depth: 0,
            text: "Compare raw JSON, optimized JSON, and `.lottie` when supported.",
          },
          {
            depth: 0,
            text: "Evaluate size reduction versus visual fidelity after each optimization.",
          },
          {
            depth: 0,
            text: "Be careful with embedded raster imagery and embedded font/glyph data.",
          },
        ],
        lessons: [
          {
            name: "Optimize the source before adding runtime workarounds",
            explanation:
              "Reduce detail that does not survive at the intended display size: excessive Bézier vertices, hidden layers, deep pre-compositions, overlapping masks/mattes, repeaters, and embedded rasters. Ask the designer which geometry and timing can be simplified while preserving the message. Lowering FPS can change motion quality and may not reduce interpolated rendering work unless the player’s frame policy also changes.\n\nCompare original versus optimized exports visually at important frames and under real playback. Raw JSON minification removes whitespace; compression reduces transfer bytes; neither proves lower drawing cost. A smaller dotLottie ZIP may take extra initialization work and still contain exactly the same expensive geometry. Measure the end-to-end result.",
            files: [
              {
                name: "optimization-review.txt",
                code: "Record before/after:\n- Asset bytes over the network (with production compression)\n- Runtime/WASM bytes and cache behavior\n- Path/layer/mask/matte/raster changes\n- Initialization time and first useful frame\n- Frame smoothness during real interaction\n- Key-frame screenshots and designer approval",
                language: "plaintext",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://github.com/airbnb/lottie-web/wiki/Features",
            checkpoint: "",
          },
          {
            name: "Inspect payload structure without silently changing its meaning",
            explanation:
              "A safe inspection tool reports facts and flags possible costs; it does not delete layers merely because they look hidden in one frame. Layers can participate in mattes, expressions, or later timeline states. Removing them can change rendering. Keep source exports, apply one optimization at a time, and test with the locked runtime.\n\nThe Node script below reports JSON bytes, top-level layer/assets counts, and embedded image counts. These are useful audit signals rather than a complete cost model: pre-compositions can contain more layers and path complexity is not reflected in a layer count. Do not interpret a single number as an optimization score.",
            files: [
              {
                name: "audit-file.mjs",
                code: 'import { readFile } from "node:fs/promises";\nconst path = process.argv[2];\nif (!path) throw new Error("Usage: node audit-file.mjs animation.json");\nconst bytes = await readFile(path);\nconst data = JSON.parse(bytes.toString("utf8"));\nconsole.table({\n  bytes: bytes.length,\n  topLevelLayers: data.layers?.length ?? 0,\n  assets: data.assets?.length ?? 0,\n  embeddedImages: (data.assets ?? []).filter((asset) =>\n    asset.p?.startsWith("data:"),\n  ).length,\n});',
                language: "javascript",
                test: "node-cli",
              },
            ],
            requires: "Node.js 22+; node audit-file.mjs path/to/dot.json",
            note: "",
            source: "https://nodejs.org/api/fs.html",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 20,
        name: "Optimize browser rendering and network delivery",
        phase: 9,
        topics: [
          {
            depth: 0,
            text: "Compare SVG/canvas rendering in `lottie-web` and supported dotLottie renderer backends on realistic devices.",
          },
          {
            depth: 0,
            text: "Measure transfer size, parsing/initialization cost, memory usage, and frame smoothness.",
          },
          {
            depth: 0,
            text: "Lazy-load animations outside the initial viewport.",
          },
          {
            depth: 0,
            text: "Avoid rendering many complex looping instances simultaneously.",
          },
          {
            depth: 0,
            text: "Pause or freeze nonessential off-screen or background animations.",
          },
          {
            depth: 0,
            text: "Use caching, compression, and sensible asset delivery paths.",
          },
          {
            depth: 0,
            text: "Prevent layout shifts by reserving animation dimensions or aspect ratio.",
          },
          {
            depth: 0,
            text: "Investigate worker-based rendering and available GPU backends when the selected runtime supports them.",
          },
          {
            depth: 0,
            text: "Understand canvas resolution, device pixel ratio, and scaling/performance trade-offs.",
          },
          {
            depth: 0,
            text: "Self-host runtime support files (such as WASM) when needed for deployment or CSP requirements.",
          },
          {
            depth: 0,
            text: "Verify whether an animation hurts interaction responsiveness or competes with critical page rendering.",
          },
        ],
        lessons: [
          {
            name: "Budget transfer, initialization, memory, and drawing separately",
            explanation:
              "Network compression/cache headers affect transfer, not necessarily parsing or rendering. SVG may create many DOM nodes; canvas must redraw pixels. DotLottie’s WASM/canvas pipeline has different startup and memory costs. Reserve CSS dimensions to avoid CLS, lazy-load noncritical scenes, and reduce the number of concurrently active loops before trying exotic renderers.\n\nDevice pixel ratio multiplies canvas backing dimensions: doubling both dimensions roughly quadruples pixel count. Cap it only after comparing sharpness and performance on the target devices. Pause/freeze nonessential off-screen/background work; freeze is a renderer control and is not the same semantic action as resetting the animation.",
            files: [
              {
                name: "render-policy.js",
                code: '// A loaded DotLottie instance; use alongside one playback owner.\nexport function configureRendering(player) {\n  player.setRenderConfig({\n    devicePixelRatio: Math.min(devicePixelRatio || 1, 2),\n  });\n  player.setLayout({ fit: "contain", align: [0.5, 0.5] });\n  player.resize();\n}\n// When an application explicitly suspends rendering:\n// player.freeze();\n// On return, player.unfreeze(); then reapply the chosen playback policy.',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "DotLottie 0.81.0; visible canvas with nonzero CSS dimensions",
            note: "",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/performance",
            checkpoint: "",
          },
          {
            name: "Workers and GPU backends are specialized options",
            explanation:
              "DotLottieWorker can move supported rendering work away from the main thread through OffscreenCanvas. Its commands are asynchronous promises, so a worker instance is not a synchronous drop-in replacement for DotLottie. Check browser support, asset dependencies, worker CSP, and message overhead; not every callback-based asset feature is supported.\n\nThe pinned package also exports WebGL/WebGPU player subpaths. Each backend has its own support requirements and WASM binary; use the matching setWasmUrl/preload and preserve a usable fallback if GPU initialization fails. Probe support before obtaining a canvas context, because a canvas generally cannot be switched freely between incompatible context types. Do not make performance claims without measurements on the intended device.",
            files: [
              {
                name: "worker-reference.js",
                code: 'import { DotLottieWorker } from "@lottiefiles/dotlottie-web";\n\nexport async function mountWorker(canvas, src) {\n  if (!("transferControlToOffscreen" in canvas))\n    throw new Error("OffscreenCanvas unavailable");\n  const player = new DotLottieWorker({\n    canvas,\n    src,\n    autoplay: false,\n    loop: false,\n  });\n  // Listen for load/loadError before dependent playback, as with the core player.\n  return { player, destroy: () => player.destroy() };\n}\n// GPU alternatives are separate imports, not renderer:"svg" options:\n// import { DotLottie } from "@lottiefiles/dotlottie-web/webgl";\n// import { DotLottie } from "@lottiefiles/dotlottie-web/webgpu";',
                language: "javascript",
                test: "reference",
              },
            ],
            requires:
              "Specialized reference: DotLottie 0.81.0 worker/GPU support; deployment must serve the matching worker/WASM files",
            note: "Experimental/specialized features and backend availability must be rechecked when upgrading; start with the default renderer.",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/web-worker",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 21,
        name: "Profile and benchmark",
        phase: 9,
        topics: [
          {
            depth: 0,
            text: "Use browser DevTools Performance and Network panels.",
          },
          {
            depth: 0,
            text: "Observe CPU usage, FPS, dropped frames, memory, and main-thread activity.",
          },
          {
            depth: 0,
            text: "Test low-powered devices, mobile browsers, and multiple animation instances.",
          },
          {
            depth: 0,
            text: "Measure effects on Core Web Vitals, including LCP, CLS, and INP where relevant.",
          },
          {
            depth: 0,
            text: "Compare optimized versus unoptimized assets under identical conditions.",
          },
          {
            depth: 0,
            text: "Establish practical performance budgets for animation assets and runtime behavior.",
          },
        ],
        lessons: [
          {
            name: "Benchmark a real journey under repeatable conditions",
            explanation:
              "Use Network to separate cold and warm requests, and Performance to inspect initialization, scripting, rendering, long tasks, and dropped frames. Heap snapshots can reveal retained players after navigation. Measure a real user journey such as opening a panel while several scenes are visible, not only an idle desktop loop.\n\nControl device, browser, viewport, DPR, cache state, network conditions, and animation count for before/after comparisons. Test physical mobile/low-power hardware as well as emulation. Animation may affect LCP by competing with critical work, CLS through unreserved size, and INP by blocking interaction. A reported FPS improvement does not automatically mean a better user experience.",
            files: [
              {
                name: "benchmark-template.json",
                code: '{\n  "scenario": "Open product details while three scenes are visible",\n  "device": "record exact device/browser",\n  "viewport": "record dimensions and DPR",\n  "cache": "cold or warm",\n  "assetBytes": null,\n  "runtimeBytes": null,\n  "readyMilliseconds": null,\n  "interactionLatencyMilliseconds": null,\n  "droppedFrames": null,\n  "memoryAfterRepeatedNavigation": null,\n  "visualApproval": false\n}',
                language: "json",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://developer.chrome.com/docs/devtools/performance",
            checkpoint: "",
          },
          {
            name: "Instrument readiness without claiming a universal budget",
            explanation:
              "Mark the beginning of one load and measure when that player reports ready-to-use animation data. Include an instance-specific label so simultaneous loads do not overwrite each other’s marks. Remove instrumentation when it is no longer useful, and separate the first loaded frame from a visually complete scene with fonts/images.\n\nDefine budgets with the team from representative measurements: initial transfer, maximum active instances, startup cost, and acceptable interaction impact. The example returns a cancel function for a failed/unmounted load and records elapsed wall time; it is not a full Core Web Vitals collector.",
            files: [
              {
                name: "measure-load.js",
                code: 'export function measureLoad(player, label) {\n  const start = `${label}:start`;\n  const finish = `${label}:loaded`;\n  performance.mark(start);\n  const clear = () => {\n    performance.clearMarks(start);\n    performance.clearMarks(finish);\n  };\n  const loaded = () => {\n    performance.mark(finish);\n    const measure = performance.measure(label, start, finish);\n    console.log(`${label}: ${measure.duration.toFixed(1)} ms`);\n    player.removeEventListener("load", loaded);\n    clear();\n    performance.clearMeasures(label);\n  };\n  player.addEventListener("load", loaded);\n  return () => {\n    player.removeEventListener("load", loaded);\n    clear();\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "DotLottie load event; attach immediately after construction; use a unique label and retain cleanup",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 22,
        name: "Accessible motion",
        phase: 10,
        topics: [
          {
            depth: 0,
            text: "Honor `prefers-reduced-motion` and distinguish essential motion from decorative motion.",
          },
          {
            depth: 0,
            text: "Offer meaningful static images, final frames, or simplified transitions when motion is reduced.",
          },
          {
            depth: 0,
            text: "Avoid continuous distracting movement and flashing content.",
          },
          {
            depth: 0,
            text: "Provide play/pause controls where movement persists and affects users.",
          },
          {
            depth: 0,
            text: "Ensure animated controls are operable with keyboard and assistive technologies.",
          },
          {
            depth: 0,
            text: "Give meaningful animations accessible names/descriptions when they convey information.",
          },
          {
            depth: 0,
            text: "Hide purely decorative animations from assistive technology as appropriate.",
          },
          {
            depth: 0,
            text: "Never rely on animation alone to communicate success, error, or other important status.",
          },
          {
            depth: 0,
            text: "Keep focus indicators, visible states, color contrast, and status announcements functional.",
          },
          {
            depth: 0,
            text: "Test dynamically changing reduced-motion preferences when the UI needs to react at runtime.",
          },
        ],
        lessons: [
          {
            name: "Reduced motion changes policy, not just speed",
            explanation:
              "Read prefers-reduced-motion before starting nonessential motion, and subscribe to changes when the interface remains mounted. A useful alternative can be a static illustration, meaningful endpoint, or simpler transition. Slowing down a large moving scene is not necessarily a reduced-motion accommodation. Keep essential process/status information in HTML regardless of the player’s state.\n\nDecorative art should be hidden from assistive technology. Meaningful art needs an accessible label/description, usually provided by its surrounding figure or text rather than canvas pixels. Avoid flashing/distraction, keep focus/contrast intact, and provide pause/stop controls where persistent movement requires them. Never communicate success or error solely through a color change or a motion.",
            files: [
              {
                name: "accessible-status.html",
                code: '<figure aria-labelledby="process-caption">\n  <div data-art aria-hidden="true"></div>\n  <img src="/animations/fallback.svg" width="256" height="256" alt="" />\n  <figcaption id="process-caption">Your files are being checked.</figcaption>\n</figure>\n<p role="status" aria-live="polite">Checking files…</p>\n<button type="button" data-pause>Pause decorative animation</button>',
                language: "html",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source:
              "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
            checkpoint: "",
          },
          {
            name: "A pause control must preserve the user’s choice",
            explanation:
              "Automatic visibility logic should not immediately undo an explicit pause. Keep userPaused separate from off-screen/background/reduced-motion conditions and combine them in one policy. Chapter 12’s visibility owner already does this; connect its setPaused method to a native button, and keep controls usable when an asset fails.\n\nThe code below updates a visible action label. Its state is the user’s preference, not a guess based on a transient play event. Pressing Resume cannot override a reduced-motion policy; the visibility owner still chooses whether playback is allowed. Clean up the event listener and visibility owner with the player.",
            files: [
              {
                name: "pause-control.js",
                code: 'export function bindPause(button, visibilityOwner) {\n  const owner = new AbortController();\n  let paused = false;\n  button.addEventListener(\n    "click",\n    () => {\n      paused = !paused;\n      visibilityOwner.setPaused(paused);\n      button.textContent = paused\n        ? "Resume decorative animation"\n        : "Pause decorative animation";\n    },\n    { signal: owner.signal },\n  );\n  return () => owner.abort();\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "Native button and the Chapter 12 ownVisibility result; caller tears down both owners",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 23,
        name: "Responsive presentation",
        phase: 10,
        topics: [
          {
            depth: 0,
            text: "Control sizing with CSS, `aspect-ratio`, min/max dimensions, and responsive containers.",
          },
          {
            depth: 0,
            text: "Understand contain/cover behavior and clipping across renderers.",
          },
          {
            depth: 0,
            text: "Avoid unintentionally cropping essential animation content on mobile.",
          },
          {
            depth: 0,
            text: "Test high-density screens and different viewport aspect ratios.",
          },
          {
            depth: 0,
            text: "Change animation assets or layouts when mobile needs a different composition.",
          },
          {
            depth: 0,
            text: "Reserve space for asynchronously loaded content to prevent layout shifts.",
          },
        ],
        lessons: [
          {
            name: "Reserve the composition envelope and preserve essential content",
            explanation:
              "CSS display size and internal composition coordinates are separate. Set a stable width/aspect-ratio before async loading, and let the selected renderer fit within that envelope. Contain keeps the full composition visible; cover fills by cropping. Test portrait/narrow layouts and high-density screens instead of assuming a desktop hero composition scales gracefully.\n\nUse an alternate mobile export if the arrangement itself needs redesign. Keep meaningful text outside cropped art. Align fallback artwork to the same box so a load failure or reduced-motion switch does not jump the page. Canvas CSS dimensions and backing resolution must both be considered; call resize after revealing a previously zero-size host.",
            files: [
              {
                name: "responsive.css",
                code: ".motion-stage {\n  position: relative;\n  width: min(100%, 32rem);\n  aspect-ratio: 1;\n}\n.motion-stage > .player,\n.motion-stage > .fallback {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.motion-stage canvas,\n.motion-stage svg {\n  display: block;\n  width: 100%;\n  height: 100%;\n}",
                language: "css",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/layout-styling",
            checkpoint: "",
          },
          {
            name: "Responsive behavior includes loading and error states",
            explanation:
              "Test the initial empty player, fallback image, ready art, paused art, and error message at each target width. A responsive player is not useful if the form label wraps under it or an off-screen pin prevents reading. Match the static alternative’s visual meaning to the current application state.\n\nThe markup below layers fallback and player within one reserved box. Only hide the fallback after a verified load; reveal it on failure. An empty canvas is not a loading indicator or useful accessible description. Without JavaScript, the image and surrounding text still explain the scene.",
            files: [
              {
                name: "responsive.html",
                code: '<section>\n  <h2>A clear step-by-step process</h2>\n  <p>The explanation remains readable without the animation.</p>\n  <div class="motion-stage" aria-hidden="true">\n    <img\n      class="fallback"\n      src="/animations/fallback.svg"\n      alt=""\n      width="256"\n      height="256"\n    />\n    <div class="player" data-lottie></div>\n  </div>\n</section>',
                language: "html",
                test: "reference",
              },
            ],
            requires:
              "Pair with responsive.css; application owns fallback hidden state based on player readiness/errors",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 24,
        name: "Troubleshoot broken animations",
        phase: 11,
        topics: [
          {
            depth: 0,
            text: "Diagnose 404s, invalid paths, missing assets, malformed JSON, and cross-origin issues.",
          },
          {
            depth: 0,
            text: "Distinguish load errors from renderer incompatibilities.",
          },
          {
            depth: 0,
            text: "Inspect unsupported After Effects features and problem layers.",
          },
          {
            depth: 0,
            text: "Diagnose wrong frame ranges, looping behavior, aspect ratio, and transparent backgrounds.",
          },
          {
            depth: 0,
            text: "Check text/font differences and color variations between authoring and playback.",
          },
          {
            depth: 0,
            text: "Isolate problematic layers and compare rendering across players.",
          },
          {
            depth: 0,
            text: "Reproduce timing bugs caused by rapid clicks, route transitions, or failed network requests.",
          },
          {
            depth: 0,
            text: "Review lifecycle cleanup when animations disappear or multiply unexpectedly.",
          },
        ],
        lessons: [
          {
            name: "Triage failures by layer of the system",
            explanation:
              "Start with the failing request: URL/base path, 404, content type, CORS, credentials, compressed delivery, and external image/font URLs. Then check JSON syntax/manifest IDs, composition dimensions/range, renderer errors, and unsupported features. A successful 200 response containing an HTML error page is still not valid animation data.\n\nIf a file loads but looks wrong, isolate layers and compare the exact export in both target runtimes. Check font metrics, gradients, color interpretation, transparency, clipping, and transform parenting. If timing is wrong, inspect frame-versus-time units, segment boundaries, loop policy, and competing owners before adding arbitrary delays.",
            files: [
              {
                name: "diagnosis.txt",
                code: "No request → initialization/client lifecycle\n404 or HTML response → asset URL / deployment base\nJSON parses but is blank → dimensions, ip/op, layers, unsupported features\nImages/text missing → asset path, CORS, fonts/glyphs\nWrong timing/direction → player API, units, active segment, playhead owner\nDuplicate/vanishing art → mount/unmount, stale loads, missing destroy\nWASM failure → exact binary URL, content type, CSP, runtime version",
                language: "plaintext",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference",
            checkpoint: "",
          },
          {
            name: "Use a reproducible minimal case for timing bugs",
            explanation:
              "Reproduce rapid clicks, source swaps, failed requests, hidden-tab transitions, and route removal during loading. Log application state transitions and player events with an instance ID; avoid logging every frame in production because that can create its own performance problem. Preserve the failing export and pinned runtime in a small test page.\n\nWhen generated docs and a shipped version disagree, check the installed declaration/source and a measured fixture. For example, unit labels in generated API references can differ from shipped implementations; this guide computes timing from fr/ip/op and uses frames for seeking. Do not mix APIs based on a familiar method name or a wrapper’s documentation from another version.",
            files: [
              {
                name: "event-trace.js",
                code: 'export function tracePlayer(player, id) {\n  const events = ["load", "loadError", "play", "pause", "complete"];\n  const listeners = events.map((type) => {\n    const listener = (event) =>\n      console.debug(id, type, performance.now(), event);\n    player.addEventListener(type, listener);\n    return [type, listener];\n  });\n  return () => {\n    for (const [type, listener] of listeners)\n      player.removeEventListener(type, listener);\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "DotLottie event names; use only during debugging and remove the tracing owner",
            note: "",
            source: "https://github.com/LottieFiles/dotlottie-web",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 25,
        name: "Test animation behavior",
        phase: 11,
        topics: [
          {
            depth: 0,
            text: "Unit-test state management and progress/frame mapping utilities.",
          },
          {
            depth: 0,
            text: "Integration-test user events, playback commands, and UI state transitions.",
          },
          {
            depth: 0,
            text: "Test reduced-motion behavior and keyboard interactions.",
          },
          {
            depth: 0,
            text: "Use browser-based testing tools for important end-to-end workflows.",
          },
          {
            depth: 0,
            text: "Include screenshots or visual regression checks for key frames/states when helpful.",
          },
          {
            depth: 0,
            text: "Test multiple viewport sizes, major browsers, and representative mobile hardware.",
          },
          {
            depth: 0,
            text: "Verify behavior after navigation, component remounts, and repeated interactions.",
          },
          {
            depth: 0,
            text: "Verify fallback behavior when animation assets fail to load.",
          },
        ],
        lessons: [
          {
            name: "Test pure logic independently of the renderer",
            explanation:
              "Unit-test progress mapping at both endpoints, out-of-range values, invalid input, empty/unloaded frame counts, and representative fractional progress. Test state transitions and request-generation guards without a graphics engine. Those tests are quick and tell you why an interaction broke.\n\nThe built-in Node test below imports the same helper used by the scroll examples. This is meaningful behavior coverage rather than asserting a mock received its own setup calls. Add application-state tests for interrupted requests and ensure a failed asset never changes a business result from failure to success.",
            files: [
              {
                name: "frames.test.mjs",
                code: 'import test from "node:test";\nimport assert from "node:assert/strict";\nimport { progressToFrame } from "./frames.js";\n\ntest("normalized progress stays inside the visible frame range", () => {\n  assert.equal(progressToFrame(0, 60), 0);\n  assert.equal(progressToFrame(1, 60), 59);\n  assert.equal(progressToFrame(-2, 60), 0);\n  assert.equal(progressToFrame(2, 60), 59);\n  assert.equal(progressToFrame(0.5, 60), 29.5);\n  assert.equal(progressToFrame(NaN, 60), 0);\n  assert.equal(progressToFrame(1, 0), 0);\n});',
                language: "javascript",
                test: "node-test",
              },
            ],
            requires:
              "Node.js 22+, frames.js in an ES-module project; run node --test frames.test.mjs",
            note: "",
            source: "https://nodejs.org/api/test.html",
            checkpoint: "",
          },
          {
            name: "Browser tests should assert user-visible contracts",
            explanation:
              "Run integration tests with the real player for load/error events, multiple instances, cleanup, keyboard operations, and dynamic reduced motion. Compare screenshots at selected deterministic frames with the player paused, using consistent browser/fonts/DPR. Sampling a random running frame produces noisy screenshots rather than useful visual regression evidence.\n\nThe Playwright example targets the toggle exercise’s actual semantics, not an internal SVG path. Add a failing asset route, repeat mount/unmount, and assert fallback text remains. Test supported major browsers and representative physical devices; a headless Chrome run cannot certify every rendering backend or exported feature.",
            files: [
              {
                name: "toggle.spec.js",
                code: 'import { test, expect } from "@playwright/test";\n\ntest("toggle remains semantic with reduced motion", async ({ page }) => {\n  await page.emulateMedia({ reducedMotion: "reduce" });\n  await page.goto("/toggle"); // Serve the Chapter 11 exercise at this route.\n  const toggle = page.getByRole("button", { name: "Enable reminders" });\n  await toggle.focus();\n  await page.keyboard.press("Space");\n  await expect(toggle).toHaveAttribute("aria-pressed", "true");\n  await page.keyboard.press("Enter");\n  await expect(toggle).toHaveAttribute("aria-pressed", "false");\n});',
                language: "javascript",
                test: "reference",
              },
            ],
            requires:
              "Playwright project with baseURL and a /toggle route implementing Chapter 11; exercise test, not a pre-existing site route",
            note: "",
            source: "https://playwright.dev/docs/emulation",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 26,
        name: "Organize production animation systems",
        phase: 12,
        topics: [
          {
            depth: 0,
            text: "Establish naming conventions for animation files, markers, state IDs, and versions.",
          },
          {
            depth: 0,
            text: "Document source files, export settings, formats, and runtime requirements.",
          },
          {
            depth: 0,
            text: "Maintain a small catalog of reusable animations instead of duplicating assets.",
          },
          {
            depth: 0,
            text: "Define who owns motion design, exports, implementation, accessibility, and QA.",
          },
          {
            depth: 0,
            text: "Coordinate animation triggers with actual application status, not fake timers.",
          },
          {
            depth: 0,
            text: "Establish fallback and failure behavior as part of the UI specification.",
          },
          {
            depth: 0,
            text: "Consider asset licensing and provenance before using third-party animations.",
          },
          {
            depth: 0,
            text: "Treat untrusted animation assets as external content: validate input and manage dependencies.",
          },
          {
            depth: 0,
            text: "Pin/test library versions when advanced runtime features may change.",
          },
        ],
        lessons: [
          {
            name: "Treat motion assets as a versioned catalog",
            explanation:
              "Name animation IDs, marker names, machine inputs, slots, and export versions consistently. Keep a source/export/runtime compatibility record and one owner for updates. Track provenance/license, dependencies, fallback art, representative screenshots, and the tests that must pass before replacing an asset. A renamed state input is an integration change even when the animation looks the same.\n\nTreat untrusted animation files as external input: validate structure/size, review state-machine actions/URLs and expression support, pin dependencies, and apply appropriate content delivery/CSP. Self-host matched support files where necessary. This is part of the roadmap’s production contract, not a guarantee that every JSON-based asset is safe to execute blindly.",
            files: [
              {
                name: "catalog.ts",
                code: 'export const animations = {\n  status: {\n    src: "/animations/status-v1.lottie",\n    fallback: "/animations/status-v1.svg",\n    runtime: "@lottiefiles/dotlottie-web@0.81.0",\n    machine: "button",\n    input: "isActive",\n    slot: "accent",\n    aspectRatio: 1,\n  },\n} as const;',
                language: "typescript",
                test: "typescript",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://dotlottie.io/spec/2.0/",
            checkpoint: "",
          },
          {
            name: "Define release responsibility and a useful failure mode",
            explanation:
              "Motion design approves timing/fidelity; frontend owns events/lifecycle and semantics; QA checks the device/browser matrix; product/accessibility owners approve the reduced-motion story and pause behavior. Coordinate triggers with real request/router/application status, not a timer that pretends work finished.\n\nRelease a changed asset with its runtime lockfile, handoff notes, tests, and measurement results. Keep the previous version available for rollback and account for stale caches. Decide in advance whether a failed illustration is hidden, replaced by static art, or shown with a retry action. A decorative failure should not block a form or navigation.",
            files: [
              {
                name: "release-checklist.md",
                code: "# Motion release gate\n- Source/export owner and license recorded\n- Runtime and WASM/worker versions locked together\n- IDs, markers, inputs, slots documented\n- Keyboard, reduced motion, failure, remount, and multiple instances tested\n- Screenshots and representative-device performance attached\n- Immutable asset path, caching strategy, and rollback version documented",
                language: "markdown",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 27,
        name: "Make sound technology choices",
        phase: 12,
        topics: [
          {
            depth: 0,
            text: "Choose CSS transitions for simple element state changes when Lottie would be excessive.",
          },
          {
            depth: 0,
            text: "Choose GSAP for rich DOM/SVG sequencing and orchestration.",
          },
          {
            depth: 0,
            text: "Choose Lottie for portable designed vector motion that can be driven programmatically.",
          },
          {
            depth: 0,
            text: "Consider Rive or other interactive animation systems when their authoring/interactivity model better fits the problem.",
          },
          {
            depth: 0,
            text: "Use video/canvas/WebGL for effects that do not translate well into Lottie.",
          },
          {
            depth: 0,
            text: "Estimate design, implementation, runtime, and maintenance costs before choosing a format.",
          },
        ],
        lessons: [
          {
            name: "Make technology choices from the interaction contract",
            explanation:
              "Start with what must change, who authors it, and how it must respond. A CSS transition has tiny integration cost for a simple DOM state. GSAP coordinates DOM/SVG and scroll timelines. Lottie transports authored vector motion and gives the application a seekable playhead. Rive or compatible dotLottie state machines may fit designer-authored nonlinear state graphs. Video/Canvas/WebGL can better express raster-heavy or complex effects.\n\nEstimate ongoing costs too: how a designer changes the asset, how developers inspect it, how tests detect regressions, how many instances run, and how fallback behaves. Use a proof-of-concept on the slowest representative device before committing to a visually complex hero.",
            files: [],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API",
            checkpoint: "",
          },
          {
            name: "Document the trade-off so the next developer can maintain it",
            explanation:
              "A short decision record prevents a team from maintaining two runtimes for one animation without realizing it. Record required formats/features, rejected alternatives, measured constraints, accessibility policy, and the upgrade trigger. Avoid universal claims such as “canvas is always faster” or “JSON is always smaller than video.”\n\nWhen one use case changes, re-evaluate that decision rather than forcing every UI element into the same animation technology. A product page may reasonably combine CSS controls, a GSAP layout sequence, and one Lottie illustration if each has clear ownership and cleanup.",
            files: [
              {
                name: "motion-decision.md",
                code: "# Decision: product-process illustration\nNeed: authored vector motion, frame scrubbing, static reading path\nChosen: DotLottie 0.81.0 + GSAP-owned scroll playhead\nNot chosen for this scene: video (no direct vector seeking contract)\nSeparate CSS: button hover/focus; no Lottie runtime for those changes\nEvidence: attach mobile timing/visual comparison before approval\nRevisit when: exported features, target devices, or interaction model change",
                language: "markdown",
                test: "reference",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://gsap.com/docs/v3/",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
      {
        number: 28,
        name: "Deep runtime and format knowledge",
        phase: 13,
        topics: [
          {
            depth: 0,
            text: "Understand the Lottie schema and JSON representation of animated properties in more detail.",
          },
          {
            depth: 0,
            text: "Compare how different runtimes interpret unsupported or ambiguous features.",
          },
          {
            depth: 0,
            text: "Investigate render pipelines, frame interpolation, caching, and rasterization trade-offs.",
          },
          {
            depth: 0,
            text: "Experiment with custom validation or optimization scripts for animation assets.",
          },
          {
            depth: 0,
            text: "Build small developer tools for inspecting frame ranges, dimensions, markers, and embedded assets.",
          },
          {
            depth: 0,
            text: "Explore runtime architecture and cross-platform parity (web, iOS, Android, React Native).",
          },
          {
            depth: 0,
            text: "Evaluate the stability and compatibility of emerging format extensions before adopting them.",
          },
        ],
        lessons: [
          {
            name: "Read animated properties and validate without overpromising",
            explanation:
              "Advanced format work starts with the community schema and actual renderer behavior. A keyframe can include hold behavior, easing, or spatial tangents; shape paths and transforms have different value structures. Custom scripts should report unsupported fields, suspicious ranges, and dependency needs without rewriting ambiguous data automatically.\n\nRuntime parity is empirical: a web player’s supported effect or slot may differ on iOS, Android, or React Native. Frame interpolation, path tessellation, caching, and rasterization choices can affect both fidelity and cost. Version emerging extensions and test the exact artifacts on each intended platform before declaring one shared asset portable.",
            files: [
              {
                name: "animated-properties.mjs",
                code: 'export function countAnimatedProperties(value) {\n  if (!value || typeof value !== "object") return 0;\n  const own = value.a === 1 && Array.isArray(value.k) ? 1 : 0;\n  return (\n    own +\n    Object.values(value).reduce(\n      (sum, child) => sum + countAnimatedProperties(child),\n      0,\n    )\n  );\n}',
                language: "javascript",
                test: "node",
              },
            ],
            requires:
              "Specialized JSON-inspection helper; counts animation-shaped properties, not a complete schema or cost estimate",
            note: "",
            source: "https://lottie.github.io/lottie-spec/latest/",
            checkpoint: "",
          },
          {
            name: "Treat backend experiments as measured forks of a baseline",
            explanation:
              "Keep the same asset, viewport, DPR, time/frame positions, and visual assertions while comparing renderers. A GPU backend may need different binaries and browser features; a worker adds asynchronous lifecycle/message behavior. Test context/device loss, fallback, fonts/images, and source changes rather than benchmarking a blank canvas.\n\nA custom inspector can show dimensions, frame range, markers, image/font references, animated-property counts, and active IDs. That is often more valuable than prematurely building a new runtime. Retain a default-renderer baseline so emerging features can be evaluated without making the entire application depend on them.",
            files: [],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source:
              "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/gpu-rendering",
            checkpoint:
              "Explain one measured backend trade-off and one cross-platform incompatibility using your own test export.",
          },
        ],
        originalExamples: [],
      },
      {
        number: 29,
        name: "Advanced interaction choreography",
        phase: 13,
        topics: [
          {
            depth: 0,
            text: "Synchronize Lottie with Web Audio, video, page transitions, and application events when appropriate.",
          },
          {
            depth: 0,
            text: "Design non-linear user journeys with robust animation state transitions.",
          },
          {
            depth: 0,
            text: "Coordinate several animations without excessive CPU usage or confusing visual states.",
          },
          {
            depth: 0,
            text: "Build timeline-driven product stories that remain usable with JavaScript disabled or reduced motion enabled where feasible.",
          },
          {
            depth: 0,
            text: "Develop reusable motion tokens and consistent motion patterns across a design system.",
          },
        ],
        lessons: [
          {
            name: "Use one clock when synchronizing media",
            explanation:
              "Audio/video may have a meaningful clock independent of scroll or frame-rate scheduling. Map the current media time to normalized scene progress and seek a paused animation, rather than trying to start both and hoping they stay synchronized. Browser autoplay policies, buffering, seeking, and tab visibility all matter.\n\nThe example follows the media timeupdate/seeked events, which are suitable for a coarse demonstration; frame-accurate video choreography should use requestVideoFrameCallback where supported and an explicit fallback. Stop the synchronization owner before switching to scroll or state-machine control. Essential narration/captions must remain available without the animation.",
            files: [
              {
                name: "media-sync.js",
                code: 'import { progressToFrame } from "./frames.js";\nexport function followMedia(media, player) {\n  const owner = new AbortController();\n  player.pause();\n  const sync = () => {\n    if (\n      !player.isLoaded ||\n      !Number.isFinite(media.duration) ||\n      media.duration <= 0\n    )\n      return;\n    player.setFrame(\n      progressToFrame(media.currentTime / media.duration, player.totalFrames),\n    );\n  };\n  media.addEventListener("timeupdate", sync, { signal: owner.signal });\n  media.addEventListener("seeked", sync, { signal: owner.signal });\n  player.addEventListener("load", sync);\n  sync();\n  return () => {\n    owner.abort();\n    player.removeEventListener("load", sync);\n  };\n}',
                language: "javascript",
                test: "browser-module",
              },
            ],
            requires:
              "Optional specialization: an HTMLMediaElement and a DotLottie player; caller supplies captions, reduced-motion policy, and media controls",
            note: "",
            source:
              "https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestVideoFrameCallback",
            checkpoint: "",
          },
          {
            name: "Choreograph a system with consistent motion tokens",
            explanation:
              "Shared motion tokens can describe short feedback, deliberate scene transitions, and easing choices. They are design agreements, not magic values that force every exported asset to match. Coordinate multi-instance changes from application state, prioritize essential feedback over decoration, and cap simultaneous active work.\n\nA nonlinear story needs a defined starting state for every entry point, an interruption policy, and a clear owner during page transitions. Build the page’s semantic content and no-JavaScript/static reading path first. Motion should clarify product structure while the same information remains available through text, controls, captions, and reduced-motion alternatives.",
            files: [
              {
                name: "motion-tokens.ts",
                code: 'export const motion = {\n  feedbackSeconds: 0.15,\n  transitionSeconds: 0.35,\n  easing: "power2.out",\n  reduced: { decorativePlayback: false, scrollScrub: false },\n} as const;\n// These are a starting design contract, not measured universal defaults.',
                language: "typescript",
                test: "typescript",
              },
            ],
            requires: "Conceptual reference; apply to your own exported asset",
            note: "",
            source: "https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/",
            checkpoint: "",
          },
        ],
        originalExamples: [],
      },
    ],
    projects: [
      {
        number: 1,
        name: "Animated status-icon set",
        skills: "JSON export, playback basics, consistent visual timing",
        steps: [
          "Author/export spinner, checkmark, and warning using one canvas size and naming scheme.",
          "Verify each JSON in lottie-web and DotLottie; document any compatibility difference.",
          "Use real state text, plus a static icon for reduced motion and asset failure.",
        ],
        checks: [
          "Three visually distinct states and matching static artwork.",
          "Each instance has one owner and is destroyed on removal.",
          "Key-frame screenshots, file-size audit, and export settings are recorded.",
        ],
        files: [
          {
            name: "status-icons.js",
            code: 'import { mountJSON } from "./mount-json.js";\nexport function mountStatusIcon(host, state, onError) {\n  const assets = {\n    loading: "loading.json",\n    success: "success.json",\n    error: "error.json",\n  };\n  if (!(state in assets)) throw new Error("Unknown status");\n  return mountJSON(host, `/animations/${assets[state]}`, { onError });\n}\n// Supply your three authored exports; the study dot is only a playback fixture.',
            language: "javascript",
            test: "reference",
          },
        ],
      },
      {
        number: 2,
        name: "Accessible toggle or menu icon",
        skills:
          "Hover/click/keyboard interaction, reverse or segments, state synchronization",
        steps: [
          "Start from the Chapter 11 native toggle markup/controller.",
          "Use focus and pointer hover only for optional affordance; click/keyboard own the state.",
          "Add reversible motion only after rapid input and reduced motion work.",
        ],
        checks: [
          "Space and Enter toggle aria-pressed exactly once.",
          "Five rapid activations end in the correct semantic state.",
          "No animation is the only indication of the setting.",
        ],
        files: [
          {
            name: "toggle-entry.js",
            code: 'import { mountToggle } from "./toggle.js";\nconst button = document.querySelector("#toggle");\nif (!(button instanceof HTMLButtonElement)) throw new Error("Missing toggle");\nconst destroy = mountToggle(button, "/animations/dot.json");\n// Call destroy() when the component/route is removed.',
            language: "javascript",
            test: "reference",
          },
        ],
      },
      {
        number: 3,
        name: "Form-submission animation",
        skills:
          "Async application state, loading/success/error sequences, race-condition handling",
        steps: [
          "Copy mountSubmit and create a real or controlled test request endpoint.",
          "Map idle/loading/success/error to explicit one-owner animation policies.",
          "Test a late success arriving after a newer failure and removal while pending.",
        ],
        checks: [
          "Form semantics and text status work with animation requests blocked.",
          "No timer pretends the server succeeded.",
          "Canceled/stale results cannot overwrite the current UI.",
        ],
        files: [
          {
            name: "form-entry.js",
            code: 'import { mountSubmit } from "./submit.js";\nexport function mountForm(form, showState) {\n  const request = async (data, signal) => {\n    const response = await fetch("/api/save", {\n      method: "POST",\n      body: data,\n      signal,\n    });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  };\n  return mountSubmit(form, request, showState);\n}',
            language: "javascript",
            test: "reference",
          },
        ],
      },
      {
        number: 4,
        name: "Scroll-driven landing-page section",
        skills:
          "GSAP ScrollTrigger, frame scrubbing, responsive timing, fallbacks",
        steps: [
          "Create a long-form product section with readable headings and reserved art dimensions.",
          "Use the Chapter 13 GSAP owner after player load; refresh after known layout changes.",
          "Preserve normal reading flow under reduced motion; pin only if justified.",
        ],
        checks: [
          "Reverse and fast scroll never start a competing autoplay owner.",
          "Resize and late content do not leave stale boundaries.",
          "Reduced motion/no JavaScript still communicates every product step.",
        ],
        files: [
          {
            name: "story-entry.js",
            code: 'import { mountDot } from "./mount-dot.js";\nimport { mountStory } from "./scroll-gsap.js";\nexport function mountProductStory(section, canvas, onError) {\n  const { player, destroy } = mountDot(\n    canvas,\n    "/animations/study.lottie",\n    onError,\n  );\n  let stopStory;\n  const loaded = () => {\n    stopStory?.();\n    stopStory = mountStory(section, player);\n  };\n  player.addEventListener("load", loaded);\n  return () => {\n    player.removeEventListener("load", loaded);\n    stopStory?.();\n    destroy();\n  };\n}',
            language: "javascript",
            test: "reference",
          },
        ],
      },
      {
        number: 5,
        name: "Theme-aware interactive component",
        skills:
          "dotLottie themes/slots or equivalent supported customization, state machines",
        steps: [
          "Begin with the supplied button/isActive state-machine and accent slot contract.",
          "Add authored hover, pressed, success, and disabled states and document their inputs.",
          "Use the site’s theme signal to reapply color/available themes after load.",
        ],
        checks: [
          "Keyboard updates the same semantic state as pointer activation.",
          "Missing machine/input/theme produces a meaningful fallback.",
          "Disabled and reduced-motion behavior do not rely on pointer events.",
        ],
        files: [
          {
            name: "themed-button.js",
            code: 'import { mountStateButton } from "./state-machine.js";\nimport { applyBrand } from "./theme-slot.js";\nexport function ownThemedButton(button, player, dark, report) {\n  const loaded = () => applyBrand(player, dark());\n  player.addEventListener("load", loaded);\n  const stop = mountStateButton(button, player, report);\n  if (player.isLoaded) loaded();\n  return {\n    themeChanged: loaded,\n    destroy() {\n      stop();\n      player.removeEventListener("load", loaded);\n    },\n  };\n}',
            language: "javascript",
            test: "reference",
          },
        ],
      },
      {
        number: 6,
        name: "Reusable TypeScript animation utility",
        skills: "Typed API, instance lifecycle, event handling, tests",
        steps: [
          "Compile Chapter 16’s controller with strict TypeScript and no any-shaped player.",
          "Add restart and a documented typed surface for the exact formats it accepts.",
          "Test readiness, queued progress, independent instances, errors, and duplicate destroy.",
        ],
        checks: [
          "Progress endpoints match frame mapping tests.",
          "A destroyed controller cannot restart or receive stale loaded state.",
          "The underlying runtime/version and unsupported features are explicit.",
        ],
        files: [
          {
            name: "controller-entry.ts",
            code: 'import { LottieController } from "./LottieController";\nexport function mountPreview(host: HTMLElement, src: string) {\n  const controller = new LottieController(host, src);\n  controller.progress(0.5); // Latest requested position is applied after loading.\n  return controller;\n}',
            language: "typescript",
            test: "reference",
          },
        ],
      },
      {
        number: 7,
        name: "React animation component",
        skills: "Hooks, refs, cleanup, SSR awareness, accessibility",
        steps: [
          "Use LottieFigure in a React app and verify its SSR/static output.",
          "Exercise source changes, callback changes, remounts, and Strict Mode.",
          "Offer external pause controls if enabling persistent motion.",
        ],
        checks: [
          "A parent rerender does not duplicate the player.",
          "Unmount during import/load produces no surviving renderer.",
          "The fallback is visible on failed loads and before client initialization.",
        ],
        files: [
          {
            name: "example.tsx",
            code: 'import { LottieFigure } from "./LottieFigure";\nexport function Example() {\n  return (\n    <LottieFigure\n      src="/animations/dot.json"\n      fallback="/animations/fallback.svg"\n      label="A process moving between steps"\n      autoplay={false}\n      playOnView\n      reducedMotion="system"\n    />\n  );\n}',
            language: "tsx",
            test: "reference",
          },
        ],
      },
      {
        number: 8,
        name: "Performance case study",
        skills:
          "Asset optimization, lazy loading, instrumentation, before/after comparison",
        steps: [
          "Build a page with a realistic number of complex instances and record a baseline.",
          "Change one factor: source simplification, lazy loading, active-instance count, or DPR.",
          "Repeat on the same device/browser/cache conditions and retain visual evidence.",
        ],
        checks: [
          "Report actual before/after bytes, startup, frame behavior, and responsiveness.",
          "Repeated route navigation does not grow retained players indefinitely.",
          "No claim of improvement is based only on a desktop preview.",
        ],
        files: [
          {
            name: "case-study.md",
            code: "# Performance case study\nScenario and device:\nAsset/runtime versions:\nCold and warm cache procedure:\nBaseline measurements and trace links:\nSingle optimization applied:\nRepeated measurements and visual comparison:\nTrade-offs and remaining limits:",
            language: "markdown",
            test: "reference",
          },
        ],
      },
      {
        number: 9,
        name: "Complete interactive product page",
        skills:
          "Combining Lottie, CSS, GSAP, UI semantics, testing, and production delivery",
        steps: [
          "Combine the tested status, interaction, scroll, theme, and framework modules under route ownership.",
          "Use one compatible dotLottie state-machine interaction, one responsive scroll sequence, and one reusable component.",
          "Attach semantic/no-motion/no-JS paths, failure tests, exports/provenance, and measured performance notes.",
        ],
        checks: [
          "Every route/component has a complete cleanup path.",
          "Business state remains correct when all animation assets fail.",
          "An independent developer can reproduce the setup, tests, export workflow, and benchmark.",
        ],
        files: [
          {
            name: "route-owner.js",
            code: "export function ownRoute(mounts) {\n  const cleanups = [];\n  try {\n    for (const mount of mounts) cleanups.push(mount());\n  } catch (error) {\n    for (const cleanup of cleanups.reverse()) cleanup();\n    throw error;\n  }\n  let disposed = false;\n  return () => {\n    if (disposed) return;\n    disposed = true;\n    for (const cleanup of cleanups.reverse()) cleanup();\n  };\n}\n// Each mount must return a cleanup function; initialization failures clean up\n// their own partial work before throwing. Route removal calls the returned owner.",
            language: "javascript",
            test: "node",
          },
        ],
      },
    ],
    priorities: [
      {
        group: "Priority 1 — Essential",
        text: "Revisit Lottie fundamentals and understand JSON versus `.lottie`.",
      },
      {
        group: "Priority 1 — Essential",
        text: "Master `lottie-web` initialization, lifecycle, and playback control.",
      },
      {
        group: "Priority 1 — Essential",
        text: "Learn the `@lottiefiles/dotlottie-web` player and its API differences.",
      },
      {
        group: "Priority 1 — Essential",
        text: "Build vanilla JavaScript click/hover/form interactions.",
      },
      {
        group: "Priority 1 — Essential",
        text: "Connect animations to viewport visibility and GSAP ScrollTrigger.",
      },
      {
        group: "Priority 1 — Essential",
        text: "Implement reduced motion, fallbacks, responsive sizing, and proper cleanup.",
      },
      {
        group: "Priority 2 — Professional",
        text: "Learn enough After Effects and export compatibility to collaborate with designers.",
      },
      {
        group: "Priority 2 — Professional",
        text: "Build reusable TypeScript and React integrations.",
      },
      {
        group: "Priority 2 — Professional",
        text: "Master load/error handling, debugging, tests, and cross-browser validation.",
      },
      {
        group: "Priority 2 — Professional",
        text: "Profile and optimize real-world animations and delivery.",
      },
      {
        group: "Priority 3 — Advanced / Mastery",
        text: "Build state-machine-driven dotLottie interactions.",
      },
      {
        group: "Priority 3 — Advanced / Mastery",
        text: "Learn multi-animation packaging, themes, and supported runtime overrides.",
      },
      {
        group: "Priority 3 — Advanced / Mastery",
        text: "Design reusable motion systems and production handoff standards.",
      },
      {
        group: "Priority 3 — Advanced / Mastery",
        text: "Explore runtime internals, specialized rendering backends, and cross-platform differences.",
      },
    ],
    assessment: [
      "I can explain JSON, `.lottie`, exporters, players, and renderer differences.",
      "I can inspect an animation file and determine why it is not rendering correctly.",
      "I can create or modify a simple animation and export it reliably.",
      "I can use both `lottie-web` and dotLottie web without confusing their APIs.",
      "I can control animation frames, segments, direction, loops, and completion reliably.",
      "I can build interactive UI components driven by real application state.",
      "I can synchronize a Lottie animation with scroll using GSAP.",
      "I can implement a typed, reusable animation integration with correct cleanup.",
      "I can integrate animations into React without lifecycle or SSR mistakes.",
      "I understand dotLottie state machines, themes, and multi-animation bundles.",
      "I can find and fix rendering, export, loading, and timing problems.",
      "I can measure and improve file size, rendering cost, and page responsiveness.",
      "I can implement reduced-motion behavior, keyboard support, and accessible fallbacks.",
      "I can choose Lottie versus CSS, GSAP, Rive, Canvas, or video with sound reasoning.",
      "I can deliver, test, document, and maintain a complete production animation experience.",
    ],
    goal: "Build a production-ready interactive animation system using HTML/CSS, JavaScript or TypeScript, Lottie, and GSAP. Include at least one dotLottie state-machine interaction, a responsive scroll-driven sequence, an accessible fallback, reusable components, automated tests for interaction logic, and documented performance measurements.",
    references: [
      [
        "Lottie community specification",
        "https://lottie.github.io/lottie-spec/latest/",
      ],
      ["dotLottie v2 specification", "https://dotlottie.io/spec/2.0/"],
      ["lottie-web usage", "https://github.com/airbnb/lottie-web/wiki/Usage"],
      [
        "lottie-web renderer support",
        "https://github.com/airbnb/lottie-web/wiki/Features",
      ],
      [
        "DotLottie Web 0.x API",
        "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/api/reference",
      ],
      [
        "DotLottie state machines",
        "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/state-machines",
      ],
      [
        "DotLottie slots",
        "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/core-concepts/slots",
      ],
      [
        "DotLottie worker support",
        "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/web-worker",
      ],
      [
        "DotLottie GPU backends",
        "https://docs.lottiefiles.com/en/runtimes/distributions/js/v0.x/advanced/gpu-rendering",
      ],
      ["GSAP ScrollTrigger", "https://gsap.com/docs/v3/Plugins/ScrollTrigger/"],
      ["React effect ownership", "https://react.dev/reference/react/useEffect"],
      [
        "WCAG pause, stop, hide",
        "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
      ],
    ],
  };
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );
  const inline = (text) =>
    escape(text)
      .replace(/`([^`]+)`/g, '<code class="language-none">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const list = (items) =>
    `<ul>${items.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`;
  const example = (file) =>
    `<div class="example-head"><span>${escape(file.name)}</span><button type="button" data-copy aria-label="Copy ${escape(file.name)}">Copy</button></div><pre tabindex="0" aria-label="${escape(file.name)} example"><code class="language-${escape(file.language)}">${escape(file.code)}</code></pre>`;
  function topics(items) {
    // The roadmap has one nested ecosystem list; retain its hierarchy.
    let html = "<ul>",
      depth = 0;
    items.forEach((item, index) => {
      if (item.depth > depth) html += "<ul>".repeat(item.depth - depth);
      else if (item.depth < depth)
        html += "</li></ul>".repeat(depth - item.depth) + "</li>";
      else if (index) html += "</li>";
      html += `<li>${inline(item.text)}`;
      depth = item.depth;
    });
    return html + "</li>" + "</ul></li>".repeat(depth) + "</ul>";
  }
  const lesson = (item) =>
    `<article class="entry"><h3>${escape(item.name)}</h3>${item.explanation
      .split("\n\n")
      .map((paragraph) => `<p>${inline(paragraph)}</p>`)
      .join(
        "",
      )}<p class="requirements"><strong>Setup:</strong> ${inline(item.requires)}</p>${item.note ? `<p class="tip">${inline(item.note)}</p>` : ""}${item.files.map(example).join("")}${item.checkpoint ? `<p class="lesson-check"><strong>Try it:</strong> ${inline(item.checkpoint)}</p>` : ""}<a class="source" href="${escape(item.source)}" target="_blank" rel="noopener noreferrer">Documentation ↗</a></article>`;
  const focus = (number) =>
    number <= 3
      ? "foundations"
      : number <= 8
        ? "implementation"
        : number <= 12
          ? "production"
          : number === 13
            ? "specialist"
            : "projects";
  const search = $("#search"),
    track = $("#track");
  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    const matches = (value) =>
      !query || JSON.stringify(value).toLocaleLowerCase().includes(query);
    const chapters = book.chapters.filter(
      (chapter) =>
        (track.value === "all" || focus(chapter.phase) === track.value) &&
        matches(chapter),
    );
    const projects = ["all", "projects"].includes(track.value)
      ? book.projects.filter(matches)
      : [];
    let previous;
    $("#nav").innerHTML =
      chapters
        .map((chapter) => {
          const phase = book.phases.find(
            (phase) => phase.number === chapter.phase,
          );
          const heading =
            previous !== phase.number
              ? `<div class="nav-stage">${escape(phase.name)}</div>`
              : "";
          previous = phase.number;
          return (
            heading +
            `<a href="#chapter-${chapter.number}">${escape(chapter.name.replace(/`/g, ""))}</a>`
          );
        })
        .join("") +
      (projects.length
        ? '<div class="nav-stage">Practical mastery</div><a href="#projects">Hands-on projects</a>'
        : "");
    $("#content").innerHTML =
      chapters
        .map((chapter) => {
          const phase = book.phases.find(
            (phase) => phase.number === chapter.phase,
          );
          const prompts =
            phase.chapters.at(-1) === chapter.number
              ? phase.prompts
                  .map(
                    ([label, text]) =>
                      `<div class="checkpoint phase-checkpoint"><strong>Phase ${phase.number} ${escape(label).toLowerCase()}</strong><p>${inline(text)}</p></div>`,
                  )
                  .join("")
              : "";
          return `<section id="chapter-${chapter.number}"><span class="stage">Phase ${phase.number} · ${escape(phase.name)}</span><h2>${chapter.number}. ${inline(chapter.name)}</h2><details class="roadmap-topics"><summary>Roadmap coverage · ${chapter.topics.length} topics</summary>${topics(chapter.topics)}</details>${chapter.lessons.map(lesson).join("")}${prompts}</section>`;
        })
        .join("") ||
      (!projects.length
        ? '<p class="empty tip">No matching lessons or projects. Try another term or reset filters.</p>'
        : "");
    $("#projects").innerHTML = projects.length
      ? `<h2>Phase 14 · Practical mastery projects</h2><p>Build these in order. The code supplies focused starters using the named lessons’ modules, not nine finished applications. Every project needs responsive behavior, reduced motion, cleanup, and error handling. Author the required status/theme assets where the study fixtures do not supply them.</p>${projects.map((project) => `<details class="project" id="project-${project.number}"><summary>${project.number}. ${escape(project.name)}</summary><p><strong>Main skills:</strong> ${inline(project.skills)}</p><h3>Build plan</h3><ol>${project.steps.map((step) => `<li>${inline(step)}</li>`).join("")}</ol>${project.files.map(example).join("")}<h3>Acceptance criteria</h3>${list(project.checks)}</details>`).join("")}`
      : "";
    $("#count").textContent =
      `${chapters.length} of 29 chapters · ${projects.length} of 9 projects`;
    window.HandbookHighlight?.highlight($("#content"));
    window.HandbookHighlight?.highlight($("#projects"));
  }
  $("#learning-plan").innerHTML =
    [...new Set(book.priorities.map((item) => item.group))]
      .map(
        (group) =>
          `<h3>${escape(group)}</h3><ol start="${book.priorities.findIndex((item) => item.group === group) + 1}">${book.priorities
            .filter((item) => item.group === group)
            .map((item) => `<li>${inline(item.text)}</li>`)
            .join("")}</ol>`,
      )
      .join("") +
    `<h3>Mastery self-assessment</h3><p>Use these review prompts for this visit; selections are not saved or a certification.</p><ul class="self-assessment">${book.assessment.map((text, index) => `<li><label><input type="checkbox" id="assess-${index}"> ${inline(text)}</label></li>`).join("")}</ul><h3>Final goal</h3><p>${inline(book.goal)}</p>`;
  $("#references").innerHTML =
    `<h2>References and version boundaries</h2><p>Reference review: October 22, 2026. Examples target lottie-web 5.13.0, DotLottie Web 0.81.0, GSAP 3.15.0, React 19.2, and TypeScript 5.9.3. State-machine APIs are marked experimental in the pinned dotLottie package; worker commands are asynchronous. Asset/exporter compatibility still requires testing.</p><p>Core player code is open source; authoring tools, hosted platform features, and third-party artwork have separate availability and license terms. These examples do not grant rights to externally sourced artwork or configure a hosting account.</p><ul>${book.references.map(([title, url]) => `<li><a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(title)} ↗</a></li>`).join("")}</ul>`;
  search.addEventListener("input", render);
  track.addEventListener("change", render);
  $("#reset").addEventListener("click", () => {
    search.value = "";
    track.value = "all";
    render();
  });
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    const code = button.parentElement.nextElementSibling.querySelector("code");
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = "Copied!";
    } catch {
      button.textContent = "Select code to copy";
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    setTimeout(() => {
      if (button.isConnected) button.textContent = "Copy";
    }, 1800);
  });
  const progress = $("#demo-progress"),
    frames = $("#demo-frames"),
    fps = $("#demo-fps");
  function calculate() {
    const count = Math.max(1, Number(frames.value) || 1),
      rate = Math.max(1, Number(fps.value) || 1),
      p = Number(progress.value) / 100;
    const frame = p * Math.max(0, count - 1);
    $("#frame-result").textContent =
      `Progress ${p.toFixed(2)} → local frame ${frame.toFixed(2)} · position ${(frame / rate).toFixed(2)} s · timeline ${(count / rate).toFixed(2)} s`;
  }
  for (const control of [progress, frames, fps])
    control.addEventListener("input", calculate);
  calculate();
  render();
})();
