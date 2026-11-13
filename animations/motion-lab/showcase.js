import { gsap } from "./vendor/gsap/index.js";
import { ScrollTrigger } from "./vendor/gsap/ScrollTrigger.js";
import { SplitText } from "./vendor/gsap/SplitText.js";
import { Draggable } from "./vendor/gsap/Draggable.js";
import { InertiaPlugin } from "./vendor/gsap/InertiaPlugin.js";
import { Flip } from "./vendor/gsap/Flip.js";
import { DrawSVGPlugin } from "./vendor/gsap/DrawSVGPlugin.js";
import { MorphSVGPlugin } from "./vendor/gsap/MorphSVGPlugin.js";
import { MotionPathPlugin } from "./vendor/gsap/MotionPathPlugin.js";
import { Physics2DPlugin } from "./vendor/gsap/Physics2DPlugin.js";
import { TextPlugin } from "./vendor/gsap/TextPlugin.js";
import { ScrambleTextPlugin } from "./vendor/gsap/ScrambleTextPlugin.js";
import { ScrollToPlugin } from "./vendor/gsap/ScrollToPlugin.js";

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  Draggable,
  InertiaPlugin,
  Flip,
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  Physics2DPlugin,
  TextPlugin,
  ScrambleTextPlugin,
  ScrollToPlugin,
);

export const CONFIG = {
  duration: 0.8, // Default entrance and layout transition duration in seconds.
  ease: "power3.out", // Default decelerating entrance ease.
  stagger: 0.06, // Spacing between sequential letters and elements.
  accent: null, // Inherit the home page accent; optionally override with a CSS color.
  paper: null, // Inherit the home page background; optionally override.
  ink: null, // Inherit the home page foreground; optionally override.
  breakpoint: 768, // Width separating compact and desktop motion.
  particleCount: 100, // Desktop particle count; compact containers use half.
  particleSpeed: 0.7, // Ambient particle drift speed.
  loopDuration: 24, // Flower and marquee rotation/travel period.
  scrollDistance: 0.65, // Pinned section length as a fraction of container width.
  routeStartVisibility: 0.1, // Start the route when 10% of its parent section is visible.
  imageStartScale: 0.72, // Image starts smaller, centered inside its pinned stage.
  imageScrollDistance: 0.9, // Image scaling scroll length in viewport heights.
  snap: 24, // Draggable snapping grid in pixels.
  cubeStep: 30, // Degrees of cube rotation per arrow-key press.
  typingText: "Make a little room for wonder.", // Typed line; real fallback text stays in markup.
  scrambleText: "ORDER FROM CURIOSITY", // Scrambled line's final content.
  pauseLabel: "Pause animation", // Running-state control label.
  playLabel: "Play animation", // Paused-state control label.
};

export function mountAnimation(container, options = {}) {
  if (!container?.matches(".gsap-container")) {
    throw new Error("mountAnimation requires a .gsap-container element.");
  }
  const config = { ...CONFIG, ...options };
  const original = container.innerHTML;
  const originalStyle = container.getAttribute("style");
  const $ = (selector) => container.querySelector(selector);
  const $$ = (selector) => [...container.querySelectorAll(selector)];
  const abort = new AbortController();
  const cleanups = [];
  const ctx = gsap.context(() => {}, container);
  const mm = gsap.matchMedia();
  let motionContext;
  let split;
  let destroyed = false;
  let userPaused = false;
  let reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let compact = container.clientWidth < config.breakpoint;
  let visible = true;
  let canvasVisible = false;
  let activeSlide = 0;
  let slideBusy = false;
  let typeTimeline;
  let routeTimeline;
  let launchTimeline;
  let imageTimeline;
  let loopItems = [];
  let drag;
  let navTimeline;
  let miniTimeline;
  let accordionTimeline;
  let cubeX = -20;
  let cubeY = 30;
  let cubeTouched = false;
  let canvasSize = { width: 1, height: 1 };
  let ripple = 0;
  let pointer = { x: -1000, y: -1000 };
  let particles = [];
  let resizeFrame;
  const calm = () => reduced || userPaused;
  const duration = () => (calm() ? 0 : config.duration);
  const on = (target, event, callback) => {
    target.addEventListener(
      event,
      (...args) => {
        if (!destroyed) ctx.add(() => callback(...args));
      },
      { signal: abort.signal },
    );
  };
  if (config.accent) container.style.setProperty("--orange", config.accent);
  if (config.paper) container.style.setProperty("--paper", config.paper);
  if (config.ink) container.style.setProperty("--ink", config.ink);
  let particleInk = getComputedStyle(container)
    .getPropertyValue("--orange")
    .trim();

  // Generated navigation stays within the single component root.
  const sections = $$(".ml-screen");
  $(".ml-index-links").innerHTML = sections
    .map(
      (section, index) =>
        `<a href="#${section.id}">${String(index + 1).padStart(2, "0")} / ${section.dataset.name}</a>`,
    )
    .join("");
  const pauseButton = $("[data-pause]");
  const navigation = $(".ml-navigation");
  const miniLinks = $(".ml-mini-links");
  const answer = $(".ml-answer");
  const cube = $(".ml-cube");
  const cubeStage = $(".ml-cube-stage");
  const slides = $$(".ml-slide");
  const dialog = $(".ml-dialog");
  const canvas = $("canvas");
  const drawing = canvas.getContext("2d");
  const canvasStage = $(".ml-canvas-stage");
  const puck = $(".ml-puck");
  const playground = $(".ml-playground");
  const image = $(".ml-image");
  let imageBounds;
  let canvasBounds;
  let cubeBounds;

  ctx.add(() => {
    navTimeline = gsap
      .timeline({ paused: true })
      .fromTo(
        navigation,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.25 },
      );
    miniTimeline = gsap
      .timeline({ paused: true })
      .fromTo(
        miniLinks,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.25 },
      );
    accordionTimeline = gsap
      .timeline({ paused: true })
      .fromTo(
        answer,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25 },
      );
    [navTimeline, miniTimeline, accordionTimeline].forEach((timeline) =>
      timeline.reversed(true),
    );
  });

  function togglePanel(button, panel, timeline) {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    if (open) {
      panel.hidden = false;
      timeline.eventCallback("onReverseComplete", null);
      calm() ? timeline.progress(1) : timeline.play();
    } else if (calm()) {
      timeline.progress(0);
      panel.hidden = true;
    } else {
      timeline.eventCallback("onReverseComplete", () => {
        panel.hidden = true;
      });
      timeline.reverse();
    }
    ScrollTrigger.refresh();
  }
  on($("[data-nav-toggle]"), "click", (event) =>
    togglePanel(event.currentTarget, navigation, navTimeline),
  );
  on($("[data-mini-menu]"), "click", (event) =>
    togglePanel(event.currentTarget, miniLinks, miniTimeline),
  );
  on($("[data-accordion]"), "click", (event) =>
    togglePanel(event.currentTarget, answer, accordionTimeline),
  );
  on(container, "keydown", (event) => {
    if (event.key === "Escape" && !navigation.hidden) {
      togglePanel($("[data-nav-toggle]"), navigation, navTimeline);
      $("[data-nav-toggle]").focus();
    }
  });
  $$("a[href^='#']").forEach((anchor) =>
    on(anchor, "click", (event) => {
      const target = $(anchor.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      navigation.hidden = true;
      $("[data-nav-toggle]").setAttribute("aria-expanded", "false");
      navTimeline.pause(0);
      ScrollTrigger.refresh();
      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: $(".ml-nav").offsetHeight,
          autoKill: true,
        },
        duration: calm() ? 0 : 1,
        ease: "power2.inOut",
        onComplete: () => {
          const heading = target.querySelector("h1,h2");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
          }
        },
      });
    }),
  );

  // Page transitions include exit, crossfade, and entry; all pages retain real text.
  function goToSlide(next) {
    if (slideBusy) return;
    next = (next + slides.length) % slides.length;
    if (next === activeSlide) return;
    slideBusy = true;
    const oldSlide = slides[activeSlide];
    const nextSlide = slides[next];
    const wasFocused = oldSlide.contains(document.activeElement);
    nextSlide.hidden = false;
    oldSlide.inert = true;
    if (wasFocused) $(".ml-slides").focus({ preventScroll: true });
    const timeline = gsap.timeline({
      onComplete: () => {
        oldSlide.hidden = true;
        oldSlide.inert = false;
        slideBusy = false;
      },
    });
    timeline
      .addLabel("crossfade")
      .to(
        oldSlide,
        { opacity: 0, x: calm() ? 0 : -24, duration: duration() * 0.6 },
        "crossfade",
      )
      .fromTo(
        nextSlide,
        { opacity: 0, x: calm() ? 0 : 24 },
        { opacity: 1, x: 0, duration: duration() * 0.6 },
        "crossfade",
      );
    $("[data-slide-status]").textContent =
      `${String(next + 1).padStart(2, "0")} / 03`;
    activeSlide = next;
  }
  on($("[data-next]"), "click", () => goToSlide(activeSlide + 1));
  on($("[data-prev]"), "click", () => goToSlide(activeSlide - 1));
  $$("[data-slide]").forEach((button) =>
    on(button, "click", () => goToSlide(Number(button.dataset.slide))),
  );
  on($(".ml-slides"), "keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(activeSlide + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  let swipeStart = null;
  on($(".ml-slides"), "pointerdown", (event) => {
    swipeStart = { x: event.clientX, y: event.clientY };
  });
  on($(".ml-slides"), "pointerup", (event) => {
    if (
      swipeStart &&
      Math.abs(event.clientX - swipeStart.x) > 45 &&
      Math.abs(event.clientX - swipeStart.x) >
        Math.abs(event.clientY - swipeStart.y)
    ) {
      goToSlide(activeSlide + (event.clientX < swipeStart.x ? 1 : -1));
    }
    swipeStart = null;
  });
  on($(".ml-slides"), "pointercancel", () => {
    swipeStart = null;
  });
  let modalOpener;
  $$("[data-modal-open]").forEach((button) =>
    on(button, "click", () => {
      modalOpener = button;
      dialog.showModal();
      gsap.fromTo(
        dialog,
        { opacity: 0, y: calm() ? 0 : 20 },
        { opacity: 1, y: 0, duration: duration() * 0.4 },
      );
    }),
  );
  on($("[data-modal-close]"), "click", () => dialog.close());
  on(dialog, "close", () => modalOpener?.focus({ preventScroll: true }));
  on($("[data-layout]"), "click", (event) => {
    const tiles = $(".ml-tiles");
    const state = Flip.getState($$(".ml-tile"));
    const list = tiles.classList.toggle("ml-list");
    event.currentTarget.setAttribute("aria-pressed", String(list));
    event.currentTarget.textContent = list
      ? "Switch to grid ↗"
      : "Switch to list ↗";
    Flip.from(state, {
      duration: duration(),
      ease: "power2.inOut",
      stagger: calm() ? 0 : config.stagger,
      onComplete: () => ScrollTrigger.refresh(),
    });
  });

  // A bounded throw uses InertiaPlugin; keyboard movement uses the same grid.
  ctx.add(() => {
    [drag] = Draggable.create(puck, {
      type: "x,y",
      bounds: playground,
      inertia: !calm(),
      edgeResistance: 0.8,
      throwResistance: 1800,
      snap: (value) => Math.round(value / config.snap) * config.snap,
      onPress() {
        gsap.killTweensOf(puck);
      },
    });
  });
  on(puck, "keydown", (event) => {
    const moves = {
      ArrowLeft: [-config.snap, 0],
      ArrowRight: [config.snap, 0],
      ArrowUp: [0, -config.snap],
      ArrowDown: [0, config.snap],
    };
    if (!moves[event.key] && event.key !== "Home") return;
    event.preventDefault();
    const [dx, dy] = moves[event.key] || [0, 0];
    gsap.to(puck, {
      x:
        event.key === "Home"
          ? 0
          : gsap.utils.clamp(
              0,
              playground.clientWidth - puck.offsetWidth - 36,
              Number(gsap.getProperty(puck, "x")) + dx,
            ),
      y:
        event.key === "Home"
          ? 0
          : gsap.utils.clamp(
              0,
              playground.clientHeight - puck.offsetHeight - 36,
              Number(gsap.getProperty(puck, "y")) + dy,
            ),
      duration: duration() * 0.4,
      onUpdate: () => drag.update(),
    });
  });
  on($("[data-launch]"), "click", () => {
    if (!calm()) launchTimeline?.restart();
    else
      $("[data-status]").textContent =
        "Joy launched. Motion is disabled by your preference.";
  });
  on($("[data-type-replay]"), "click", () => {
    if (!calm()) typeTimeline?.restart();
  });
  on($("[data-route-replay]"), "click", () => {
    if (!calm() && routeTimeline?.scrollTrigger) {
      gsap.to(window, {
        scrollTo: { y: routeTimeline.scrollTrigger.start, autoKill: true },
        duration: config.duration,
        ease: config.ease,
      });
    }
  });
  on($("[data-image-replay]"), "click", () => {
    if (!calm() && imageTimeline?.scrollTrigger) {
      gsap.to(window, {
        scrollTo: { y: imageTimeline.scrollTrigger.start, autoKill: true },
        duration: config.duration,
        ease: config.ease,
      });
    }
  });

  // Cube dragging has explicit capture, so empty stage space still scrolls normally.
  let cubeDrag = null;
  on(cubeStage, "pointerdown", (event) => {
    if (!event.target.closest(".ml-cube")) return;
    cubeTouched = true;
    cubeDrag = { x: event.clientX, y: event.clientY, rx: cubeX, ry: cubeY };
    cubeStage.setPointerCapture(event.pointerId);
  });
  on(cubeStage, "pointermove", (event) => {
    if (!cubeDrag || calm()) return;
    cubeX = cubeDrag.rx - (event.clientY - cubeDrag.y) * 0.5;
    cubeY = cubeDrag.ry + (event.clientX - cubeDrag.x) * 0.5;
    gsap.set(cube, { rotationX: cubeX, rotationY: cubeY });
  });
  on(cubeStage, "pointerup", () => {
    cubeDrag = null;
  });
  on(cubeStage, "pointercancel", () => {
    cubeDrag = null;
  });
  on(cubeStage, "lostpointercapture", () => {
    cubeDrag = null;
  });
  on(cubeStage, "keydown", (event) => {
    if (!event.key.startsWith("Arrow")) return;
    event.preventDefault();
    cubeTouched = true;
    if (event.key === "ArrowLeft") cubeY -= config.cubeStep;
    if (event.key === "ArrowRight") cubeY += config.cubeStep;
    if (event.key === "ArrowUp") cubeX -= config.cubeStep;
    if (event.key === "ArrowDown") cubeX += config.cubeStep;
    gsap.to(cube, {
      rotationX: cubeX,
      rotationY: cubeY,
      duration: duration() * 0.5,
    });
  });

  function updateLoops() {
    const running = !calm() && visible && !document.hidden;
    loopItems.forEach(({ tween, element }) => {
      const rect = element.getBoundingClientRect();
      tween.paused(!running || rect.bottom < 0 || rect.top > innerHeight);
    });
    drag.vars.inertia = !calm();
  }
  function buildMotion() {
    motionContext?.revert();
    split?.revert();
    split = null;
    loopItems = [];
    typeTimeline = routeTimeline = launchTimeline = imageTimeline = null;
    pauseButton.textContent = userPaused ? config.playLabel : config.pauseLabel;
    pauseButton.setAttribute("aria-pressed", String(userPaused));
    if (calm()) {
      motionContext = gsap.context(() => {
        gsap.set($(".ml-horizontal-track"), { flexDirection: "column" });
      }, container);
      updateLoops();
      drawCanvas(0);
      return;
    }
    motionContext = gsap.context(() => {
      const loop = (tween, element) => {
        loopItems.push({ tween, element });
        return tween;
      };
      // Chapter 1: a labeled 2.5 second entrance, then a restrained ambient loop.
      gsap
        .timeline({
          defaults: { duration: config.duration, ease: config.ease },
        })
        .addLabel("arrival")
        .fromTo(
          $(".ml-hero h1"),
          { y: compact ? 24 : 48, opacity: 0, skewY: 3 },
          { y: 0, opacity: 1, skewY: 0 },
        )
        .fromTo(
          $(".ml-hero-bottom"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1 },
          "arrival+=0.35",
        )
        .fromTo(
          $(".ml-hero-art"),
          { rotation: -40, scale: 0.6, opacity: 0 },
          { rotation: 0, scale: 1, opacity: 1, duration: 1.2 },
          "arrival+=0.45",
        );
      loop(
        gsap.to($(".ml-flower"), {
          rotation: 360,
          duration: config.loopDuration,
          repeat: -1,
          ease: "none",
        }),
        $(".ml-hero"),
      );
      // Chapter 2: desktop pinning, compact parallax without pinning.
      const depth = gsap.timeline({
        scrollTrigger: {
          trigger: $("#ml-depth"),
          start: "top 76px",
          end: () => `+=${container.clientWidth * config.scrollDistance}`,
          pin: !compact && innerHeight > 720,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      depth
        .to($(".ml-back"), { y: -24, rotation: -20, ease: "none" }, 0)
        .to($(".ml-middle"), { y: -48, rotation: 0, ease: "none" }, 0)
        .to(
          $(".ml-front"),
          {
            y: compact ? -40 : -90,
            rotation: 22,
            rotationY: -12,
            ease: "none",
          },
          0,
        );
      // Chapter 3: real SplitText, TextPlugin, and ScrambleText timelines.
      split = SplitText.create($(".ml-split"), {
        type: "chars,words",
        aria: "auto",
      });
      typeTimeline = gsap
        .timeline({
          defaults: { ease: config.ease },
          scrollTrigger: {
            trigger: $("#ml-words"),
            start: "top 70%",
            once: true,
          },
        })
        .addLabel("letters")
        .fromTo(
          split.chars,
          { yPercent: 70, opacity: 0, rotation: 4 },
          {
            yPercent: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: config.stagger,
          },
        )
        .fromTo(
          $("[data-typing]"),
          { text: "" },
          { text: config.typingText, duration: 1.7, ease: "none" },
          "letters+=0.6",
        )
        .to(
          $("[data-scramble]"),
          {
            scrambleText: {
              text: config.scrambleText,
              chars: "upperCase",
              speed: 0.3,
            },
            duration: 2,
          },
          "letters+=0.6",
        );
      // Chapter 4: scroll draws the route and moves the traveler once 10% of the parent is visible.
      routeTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: $("#ml-path"),
            start: () => `${config.routeStartVisibility * 100}% bottom`,
            end: "bottom center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .addLabel("journey")
        .fromTo(
          $("[data-path]"),
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 3, ease: "none" },
        )
        .to(
          $("[data-traveler]"),
          {
            motionPath: {
              path: $("[data-path]"),
              align: $("[data-path]"),
              alignOrigin: [0.5, 0.5],
            },
            duration: 3,
            ease: "none",
          },
          "journey",
        )
        .to(
          $("[data-morph]"),
          {
            morphSVG: $("[data-morph-target]"),
            duration: 1.2,
            ease: "elastic.out(1,0.7)",
          },
          "journey+=1.6",
        );
      // Chapter 5: staggered entrances; FLIP is initiated by the layout control.
      gsap.fromTo(
        $$(".ml-tile"),
        { y: 30, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: config.duration,
          stagger: config.stagger,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: $(".ml-tiles"),
            start: "top 85%",
            once: true,
          },
        },
      );
      // Chapter 6: a projectile's velocity and gravity, followed by a bounce landing.
      launchTimeline = gsap
        .timeline({ paused: true })
        .addLabel("launch")
        .fromTo(
          $(".ml-projectile"),
          { x: 0, y: 0, rotation: 0, scale: 1 },
          {
            physics2D: {
              velocity: compact ? 210 : 280,
              angle: -65,
              gravity: 450,
            },
            rotation: 250,
            duration: 1,
            ease: "none",
          },
        )
        .to($(".ml-projectile"), {
          x: 0,
          y: 0,
          rotation: 360,
          duration: 0.8,
          ease: "bounce.out",
        })
        .to($(".ml-projectile"), {
          scale: 1.1,
          duration: 0.25,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        });
      // Chapter 8: pin a stable wrapper at viewport center while the image scales up.
      // The pinned element itself is not transformed, preserving ScrollTrigger measurements.
      imageTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: $(".ml-image-stage"),
            start: "center center",
            end: () => `+=${innerHeight * config.imageScrollDistance}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .addLabel("uncover")
        .fromTo(
          image,
          { clipPath: "inset(50% 50% 50% 50%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.25, ease: "none" },
          "uncover",
        )
        .fromTo(
          image,
          { scale: config.imageStartScale, transformOrigin: "50% 50%" },
          { scale: 1, duration: 1, ease: "none" },
          "uncover",
        );
      // Chapter 9: seamless duplicate marquee and a gently breathing graphic.
      loop(
        gsap.to($(".ml-marquee > div"), {
          xPercent: -50,
          duration: config.loopDuration,
          repeat: -1,
          ease: "none",
        }),
        $("#ml-particles"),
      );
      loop(
        gsap.to($(".ml-orbit-label"), {
          opacity: 0.5,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        }),
        $(".ml-hero"),
      );
      // Chapter 10: horizontal progression on roomy screens, stacked on compact ones.
      if (!compact && innerHeight > 720) {
        gsap.to($(".ml-horizontal-track"), {
          x: () => -$(".ml-horizontal-window").clientWidth,
          ease: "none",
          scrollTrigger: {
            trigger: $("#ml-finish"),
            start: "top 76px",
            end: () => `+=${container.clientWidth}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
      } else {
        gsap.set($(".ml-horizontal-track"), { flexDirection: "column" });
      }
    }, container);
    updateLoops();
    ScrollTrigger.refresh();
  }

  // Hover effects use cached measurements and quick setters, never new tweens per move.
  let imageX;
  let imageY;
  ctx.add(() => {
    imageX = gsap.quickTo(image.querySelector("svg"), "x", { duration: 0.6 });
    imageY = gsap.quickTo(image.querySelector("svg"), "y", { duration: 0.6 });
  });
  on(image, "pointerenter", () => {
    imageBounds = image.getBoundingClientRect();
  });
  on(image, "pointermove", (event) => {
    if (calm() || compact || !imageBounds) return;
    imageX((event.clientX - imageBounds.left - imageBounds.width / 2) * 0.015);
    imageY((event.clientY - imageBounds.top - imageBounds.height / 2) * 0.015);
  });
  on(image, "pointerleave", () => {
    imageX(0);
    imageY(0);
  });
  $$("[data-magnetic]").forEach((button) => {
    let rect;
    let xTo;
    let yTo;
    ctx.add(() => {
      xTo = gsap.quickTo(button, "x", { duration: 0.4, ease: "power2.out" });
      yTo = gsap.quickTo(button, "y", { duration: 0.4, ease: "power2.out" });
    });
    on(button, "pointerenter", () => {
      rect = button.getBoundingClientRect();
    });
    on(button, "pointermove", (event) => {
      if (calm() || compact || !rect) return;
      xTo((event.clientX - rect.left - rect.width / 2) * 0.2);
      yTo((event.clientY - rect.top - rect.height / 2) * 0.2);
    });
    on(button, "pointerleave", () => {
      xTo(0);
      yTo(0);
    });
    on(button, "focus", () => {
      if (!calm()) gsap.to(button, { scale: 1.06, duration: 0.2 });
    });
    on(button, "blur", () =>
      gsap.to(button, { scale: 1, x: 0, y: 0, duration: duration() * 0.3 }),
    );
  });

  function seedParticles() {
    const count = compact
      ? Math.ceil(config.particleCount / 2)
      : config.particleCount;
    particles = Array.from({ length: count }, (_, index) => ({
      x: ((index * 73.37) % 100) / 100,
      y: ((index * 37.71) % 100) / 100,
      vx: Math.sin(index * 1.31) * 0.000035,
      vy: Math.cos(index * 2.7) * 0.000035,
      size: 1.5 + (index % 4),
    }));
  }
  function drawCanvas(delta) {
    if (!drawing) return;
    const { width, height } = canvasSize;
    drawing.clearRect(0, 0, width, height);
    drawing.fillStyle = particleInk;
    const speed = delta * config.particleSpeed;
    particles.forEach((particle) => {
      particle.x = (particle.x + particle.vx * speed + 1) % 1;
      particle.y = (particle.y + particle.vy * speed + 1) % 1;
      const x = particle.x * width;
      const y = particle.y * height;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      const force = !calm() && distance < 130 ? (130 - distance) * 0.14 : 0;
      drawing.beginPath();
      drawing.arc(
        x + (distance ? (dx / distance) * force : 0),
        y + (distance ? (dy / distance) * force : 0),
        particle.size,
        0,
        Math.PI * 2,
      );
      drawing.fill();
    });
    if (ripple > 0 && !calm()) {
      drawing.strokeStyle = particleInk;
      drawing.lineWidth = 2;
      drawing.beginPath();
      drawing.arc(
        width / 2,
        height / 2,
        (1 - ripple) * width * 0.5,
        0,
        Math.PI * 2,
      );
      drawing.stroke();
      ripple = Math.max(0, ripple - delta / 1200);
    }
  }
  const ticker = (_time, delta) => {
    if (destroyed || calm() || document.hidden || !visible) return;
    if (canvasVisible) drawCanvas(Math.min(delta, 40));
    if (
      !cubeTouched &&
      cubeBounds &&
      cubeBounds.bottom > 0 &&
      cubeBounds.top < innerHeight
    ) {
      cubeY += Math.min(delta, 40) * 0.008;
      gsap.set(cube, { rotationX: cubeX, rotationY: cubeY });
    }
  };
  gsap.ticker.add(ticker);
  const measure = () => {
    if (destroyed) return;
    const nextCompact = container.clientWidth < config.breakpoint;
    const rect = canvasStage.getBoundingClientRect();
    canvasSize = { width: rect.width, height: rect.height };
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    drawing?.setTransform(ratio, 0, 0, ratio, 0, 0);
    canvasBounds = canvas.getBoundingClientRect();
    cubeBounds = cubeStage.getBoundingClientRect();
    drag.applyBounds();
    if (nextCompact !== compact) {
      compact = nextCompact;
      seedParticles();
      buildMotion();
    }
    drawCanvas(0);
    ScrollTrigger.refresh();
  };
  const resize = new ResizeObserver(() => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(measure);
  });
  resize.observe(container);
  resize.observe(canvasStage);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === container) visible = entry.isIntersecting;
      if (entry.target === canvasStage) canvasVisible = entry.isIntersecting;
    });
    updateLoops();
  });
  observer.observe(container);
  observer.observe(canvasStage);
  loopItems.forEach(({ element }) => observer.observe(element));
  on(document, "visibilitychange", updateLoops);
  on(window, "scroll", () => {
    cubeBounds = cubeStage.getBoundingClientRect();
    canvasBounds = canvas.getBoundingClientRect();
    updateLoops();
  });
  on(canvas, "pointermove", (event) => {
    if (canvasBounds)
      pointer = {
        x: event.clientX - canvasBounds.left,
        y: event.clientY - canvasBounds.top,
      };
  });
  on(canvas, "pointerleave", () => {
    pointer = { x: -1000, y: -1000 };
  });
  on(canvas, "pointerdown", () => {
    if (!calm()) ripple = 1;
  });
  on($("[data-burst]"), "click", () => {
    if (!calm()) ripple = 1;
  });
  function setPaused(paused) {
    userPaused = paused;
    drag.tween?.kill();
    buildMotion();
  }
  on(pauseButton, "click", () => setPaused(!userPaused));
  mm.add(
    {
      mobile: `(max-width: ${config.breakpoint - 1}px)`,
      desktop: `(min-width: ${config.breakpoint}px)`,
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      reduced = context.conditions.reduce;
      buildMotion();
      return () => {
        motionContext?.revert();
        split?.revert();
      };
    },
  );
  const refreshTheme = () => {
    particleInk = getComputedStyle(container)
      .getPropertyValue("--orange")
      .trim();
    drawCanvas(0);
  };
  const themeObserver = new MutationObserver(refreshTheme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  on(matchMedia("(prefers-color-scheme: dark)"), "change", refreshTheme);
  cleanups.push(() => themeObserver.disconnect());
  seedParticles();
  measure();
  document.fonts.ready.then(() => {
    if (!destroyed) ScrollTrigger.refresh();
  });
  cleanups.push(() => {
    resize.disconnect();
    observer.disconnect();
    cancelAnimationFrame(resizeFrame);
    gsap.ticker.remove(ticker);
  });
  return {
    play() {
      if (!destroyed) setPaused(false);
    },
    pause() {
      if (!destroyed) setPaused(true);
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      abort.abort();
      if (dialog.open) dialog.close();
      cleanups.forEach((cleanup) => cleanup());
      mm.revert();
      motionContext?.revert();
      split?.revert();
      drag.kill();
      ctx.revert();
      container.innerHTML = original;
      if (originalStyle === null) container.removeAttribute("style");
      else container.setAttribute("style", originalStyle);
    },
  };
}

// Module-local bootstrap: no component API or timelines leak into the global page.
const root = document.querySelector(".gsap-container");
if (root) mountAnimation(root);
