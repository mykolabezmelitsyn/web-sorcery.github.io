import { gsap } from "./vendor/gsap/index.js";
import { ScrollTrigger } from "./vendor/gsap/ScrollTrigger.js";
import { Flip } from "./vendor/gsap/Flip.js";
import { SplitText } from "./vendor/gsap/SplitText.js";

gsap.registerPlugin(ScrollTrigger, Flip, SplitText);

export const CONFIG = {
  heroTitleDuration: 0.85, // Each title character unfolds into its line on initial load.
  heroCharStagger: 0.025, // Character spacing in the hero title reveal.
  heroParagraphDuration: 0.55, // Eyebrow and introductory copy reveal duration.
  heroWordStagger: 0.04, // Word spacing in the introductory paragraph reveal.
  duration: 0.6, // FLIP transition duration, matching the reference’s roughly half-second reorder.
  carouselWrapScale: 0.45, // Wrapping card shrinks at the edge as shown in the reference.
  curveScroll: 1.4, // Footer scroll distance in viewport heights.
  curveCoverDuration: 0.65, // Relative scroll-timeline weight for panel rise and straightening.
  curveHoldDuration: 0.8, // Relative scroll-timeline weight for the covered state.
  curveExitDuration: 0.5, // Relative scroll-timeline weight for the downward exit.
  curveBend: 0.6, // Maximum curve control-point offset relative to stage height.
  ease: "power2.inOut", // Shared smooth transition easing without overshoot.
  tiltDuration: 0.5, // Cursor-following lag from the perspective card reference.
  tiltAngle: 8, // Maximum pointer-driven rotation on each axis in degrees.
  bentoScale: 2.55, // Whole-collage scale at the end of the bento sequence.
  bentoScroll: 1.5, // Bento scroll distance in viewport heights.
  maskScroll: 1.2, // Image wipe scroll distance in viewport heights.
  waveScroll: 1.8, // Minimum horizontal text scroll distance in viewport heights.
  waveAmplitude: 45, // Maximum glyph displacement in CSS pixels.
  waveRotation: 28, // Maximum glyph rotation in degrees.
  waveBand: 0.22, // Width of the moving wave region relative to the container.
  galleryScroll: 1.1, // Gallery scroll distance relative to horizontal overflow.
  galleryEnter: 100, // Gallery card entry distance as a percentage of card height.
  compactBreakpoint: 768, // Compact motion threshold measured from the container.
  compactScrollFactor: 0.7, // Shorter pin distances for compact containers.
  pauseLabel: "Pause animation", // Accessible running-state label.
  playLabel: "Play animation", // Accessible paused-state label.
};

const mounts = new WeakMap();

export function mountAnimation(container, options = {}) {
  if (!container?.matches(".gsap-container")) {
    throw new Error("mountAnimation requires a .gsap-container element.");
  }
  if (mounts.has(container)) return mounts.get(container);
  const config = { ...CONFIG, ...options };
  const originalHTML = container.innerHTML;
  const originalCalm = container.getAttribute("data-calm");
  const $ = (selector) => container.querySelector(selector);
  const $$ = (selector) => [...container.querySelectorAll(selector)];
  const abort = new AbortController();
  const context = gsap.context(() => {}, container);
  const media = gsap.matchMedia();
  const cleanups = [];
  const pauseButton = $("[data-pause]");
  const navigation = $(".fn-nav");
  const tiltStage = $(".fn-tilt-stage");
  const tiltCard = $(".fn-tilt-card");
  const carousel = $(".fn-carousel");
  const carouselWindow = $(".fn-carousel-window");
  const noteCards = $$(".fn-note");
  const bentoStage = $(".fn-bento-stage");
  const bentoGrid = $(".fn-bento-grid");
  const maskStage = $(".fn-mask-stage");
  const maskImage = $(".fn-mask-reveal");
  const maskLine = $(".fn-mask-line");
  const waveStage = $(".fn-wave-stage");
  const waveText = $(".fn-wave-text");
  const galleryStage = $(".fn-gallery-stage");
  const galleryTrack = $(".fn-gallery-track");
  const galleryCards = $$(".fn-gallery-card");
  const footer = $(".fn-footer");
  const curvePath = $("[data-curve-path]");
  const curveState = { value: 0, exiting: 0 };
  let curveTimeline;
  let userPaused = false;
  let reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let destroyed = false;
  let motionContext;
  let heroContext;
  let heroTimeline;
  let heroSplits = [];
  let heroComplete = false;
  let split;
  let busy = false;
  let queuedDirection = 0;
  let carouselTimeline;
  let tiltBounds;
  let resizeFrame;
  let lastWidth = container.clientWidth;
  let lastHeight = innerHeight;
  let compact = lastWidth < config.compactBreakpoint;
  const calm = () => userPaused || reduced;
  const pinStart = () => `top ${navigation.offsetHeight}px`;
  const scrollFactor = () => (compact ? config.compactScrollFactor : 1);
  const on = (target, event, callback, options = {}) => {
    target.addEventListener(
      event,
      (...args) => {
        if (!destroyed) context.add(() => callback(...args));
      },
      { ...options, signal: abort.signal },
    );
  };

  let rotateX;
  let rotateY;
  context.add(() => {
    // Source: Cursor-driven perspective tilt — shallow rotation with eased pointer lag.
    rotateX = gsap.quickTo(tiltCard, "rotationX", {
      duration: config.tiltDuration,
      ease: "power2.out",
    });
    rotateY = gsap.quickTo(tiltCard, "rotationY", {
      duration: config.tiltDuration,
      ease: "power2.out",
    });
  });
  on(tiltStage, "pointerenter", () => {
    tiltBounds = tiltStage.getBoundingClientRect();
  });
  on(tiltStage, "pointermove", (event) => {
    if (calm() || event.pointerType !== "mouse" || !tiltBounds) return;
    const x = gsap.utils.clamp(
      -1,
      1,
      ((event.clientX - tiltBounds.left) / tiltBounds.width) * 2 - 1,
    );
    const y = gsap.utils.clamp(
      -1,
      1,
      ((event.clientY - tiltBounds.top) / tiltBounds.height) * 2 - 1,
    );
    rotateX(-y * config.tiltAngle);
    rotateY(x * config.tiltAngle);
  });
  const resetTilt = () => {
    rotateX(0);
    rotateY(0);
  };
  on(tiltStage, "pointerleave", resetTilt);
  on(tiltCard, "blur", resetTilt);
  on(tiltCard, "keydown", (event) => {
    if (calm()) return;
    const angles = {
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
      ArrowUp: [1, 0],
      ArrowDown: [-1, 0],
      Home: [0, 0],
    };
    if (!angles[event.key]) return;
    event.preventDefault();
    rotateX(angles[event.key][0] * config.tiltAngle);
    rotateY(angles[event.key][1] * config.tiltAngle);
  });
  on(document, "visibilitychange", () => {
    if (document.hidden) {
      settleHeroReveal();
      rotateX.tween.pause();
      rotateY.tween.pause();
      gsap.set(tiltCard, { rotationX: 0, rotationY: 0 });
    }
  });

  // User-requested custom load effect: masked character unfolding and a word-by-word follow-through.
  // This finite entrance is independent of the reference-based scroll sequences and runs once.
  function clearHeroReveal() {
    heroComplete = true;
    heroContext?.revert();
    heroSplits.forEach((part) => part.revert());
    heroSplits = [];
    heroContext = null;
    heroTimeline = null;
    ScrollTrigger.refresh();
  }
  function settleHeroReveal() {
    if (heroComplete) return;
    heroTimeline?.progress(1, true);
    clearHeroReveal();
  }
  function startHeroReveal() {
    if (heroComplete || calm()) return;
    heroContext = gsap.context(() => {
      const eyebrow = SplitText.create($(".fn-hero-copy .fn-eyebrow"), {
        type: "lines,chars",
        mask: "lines",
        linesClass: "fn-hero-p-line",
        aria: "auto",
      });
      const title = SplitText.create($(".fn-hero-copy h1"), {
        type: "lines,words,chars",
        mask: "lines",
        linesClass: "fn-hero-line",
        aria: "auto",
      });
      const intro = SplitText.create($(".fn-hero-copy .fn-intro"), {
        type: "lines,words",
        mask: "lines",
        linesClass: "fn-hero-p-line",
        aria: "auto",
      });
      heroSplits = [eyebrow, title, intro];
      heroTimeline = gsap
        .timeline({ onComplete: clearHeroReveal })
        .addLabel("first-light")
        .fromTo(
          eyebrow.chars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: config.heroParagraphDuration,
            stagger: 0.012,
            ease: "power2.out",
          },
          "first-light",
        )
        .fromTo(
          title.chars,
          {
            yPercent: 120,
            rotationX: -65,
            rotationZ: 5,
            scaleY: 1.12,
            opacity: 0,
            transformPerspective: 600,
            transformOrigin: "50% 100%",
          },
          {
            yPercent: 0,
            rotationX: 0,
            rotationZ: 0,
            scaleY: 1,
            opacity: 1,
            duration: config.heroTitleDuration,
            stagger: config.heroCharStagger,
            ease: "power3.out",
          },
          "first-light+=0.1",
        )
        .fromTo(
          intro.words,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: config.heroParagraphDuration,
            stagger: config.heroWordStagger,
            ease: "power2.out",
          },
          "first-light+=0.75",
        );
    }, container);
  }

  function renderMotion() {
    if (heroTimeline || calm()) settleHeroReveal();
    motionContext?.revert();
    resetCurve();
    split?.revert();
    split = null;
    container.dataset.calm = String(calm());
    pauseButton.textContent = userPaused ? config.playLabel : config.pauseLabel;
    pauseButton.setAttribute("aria-pressed", String(userPaused));
    if (calm()) {
      resetCurve();
      queuedDirection = 0;
      if (busy) carouselTimeline?.progress(1).pause();
      rotateX.tween.pause();
      rotateY.tween.pause();
      context.add(() => gsap.set(tiltCard, { rotationX: 0, rotationY: 0 }));
      ScrollTrigger.refresh();
      return;
    }
    motionContext = gsap.context(() => {
      // Source: Scrubbed bento gallery — scale the whole collage around its central tile.
      gsap
        .timeline({
          scrollTrigger: {
            id: "fn-bento",
            trigger: bentoStage,
            start: pinStart,
            end: () => `+=${innerHeight * config.bentoScroll * scrollFactor()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .addLabel("closer")
        .fromTo(
          bentoGrid,
          { scale: 1 },
          {
            scale: () =>
              Math.min(
                config.bentoScale,
                $(".fn-bento-center img").width
                  ? Number($(".fn-bento-center img").getAttribute("width")) /
                      $(".fn-bento-center").clientWidth
                  : config.bentoScale,
                Number($(".fn-bento-center img").getAttribute("height")) /
                  $(".fn-bento-center").clientHeight,
              ),
            duration: 1,
            ease: "none",
          },
          "closer",
        );

      // Source: Image Mask On Scroll — a full-frame wipe, reversible with scrolling.
      gsap
        .timeline({
          scrollTrigger: {
            id: "fn-mask",
            trigger: maskStage,
            start: pinStart,
            end: () => `+=${innerHeight * config.maskScroll * scrollFactor()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .addLabel("another-view")
        .fromTo(
          maskImage,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "none" },
          "another-view",
        )
        .fromTo(
          maskLine,
          { x: () => maskStage.clientWidth },
          { x: 0, duration: 1, ease: "none" },
          "another-view",
        );

      // Source: Horizontal Text — a sentence travels left while glyphs roll across a wave band.
      split = SplitText.create(waveText, { type: "chars", aria: "none" });
      const chars = split.chars;
      const centers = chars.map(
        (char) => char.offsetLeft + char.offsetWidth / 2,
      );
      const ySetters = chars.map((char) => gsap.quickSetter(char, "y", "px"));
      const rotationSetters = chars.map((char) =>
        gsap.quickSetter(char, "rotation", "deg"),
      );
      const waveWidth = container.clientWidth * config.waveBand;
      const waveCenter = container.clientWidth * 0.62;
      const waveEndX = -Math.max(
        0,
        waveText.scrollWidth - waveStage.clientWidth,
      );
      const waveTravel = Math.max(1, waveStage.clientWidth - waveEndX);
      const updateWave = () => {
        const x = Number(gsap.getProperty(waveText, "x"));
        const settle = gsap.utils.clamp(
          0,
          1,
          (x - waveEndX) / (waveTravel * 0.12),
        );
        centers.forEach((center, index) => {
          const relative = (center + x - waveCenter) / waveWidth;
          const inside = Math.abs(relative) < 1;
          const envelope = inside ? Math.cos((relative * Math.PI) / 2) ** 2 : 0;
          const wave = inside ? Math.sin(relative * Math.PI * 2) * envelope : 0;
          ySetters[index](wave * config.waveAmplitude * settle);
          rotationSetters[index](wave * config.waveRotation * settle);
        });
      };
      gsap.fromTo(
        waveText,
        { x: () => waveStage.clientWidth },
        {
          x: () => -Math.max(0, waveText.scrollWidth - waveStage.clientWidth),
          duration: 1,
          ease: "none",
          onUpdate: updateWave,
          scrollTrigger: {
            id: "fn-wave",
            trigger: waveStage,
            start: () =>
              `center ${innerHeight / 2 + navigation.offsetHeight / 2}px`,
            end: () =>
              `+=${Math.max(innerHeight * config.waveScroll, waveText.scrollWidth) * scrollFactor()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
      updateWave();

      // Source: Horizontal scrolling gallery — staggered arrival, sideways journey, upward departure.
      const travel = () =>
        Math.max(0, galleryTrack.scrollWidth - galleryStage.clientWidth);
      gsap
        .timeline({
          scrollTrigger: {
            id: "fn-gallery",
            trigger: galleryStage,
            start: pinStart,
            end: () =>
              `+=${Math.max(innerHeight, travel()) * config.galleryScroll * scrollFactor()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .addLabel("arrive")
        .fromTo(
          galleryCards,
          { yPercent: config.galleryEnter },
          { yPercent: 0, duration: 0.5, stagger: 0.04, ease: "none" },
          "arrive",
        )
        .addLabel("wander", 0.35)
        .fromTo(
          galleryTrack,
          { x: 0 },
          { x: () => -travel(), duration: 2.2, ease: "none" },
          "wander",
        )
        .addLabel("depart", 2.55)
        .to(
          galleryCards,
          {
            yPercent: -config.galleryEnter,
            duration: 0.5,
            stagger: 0.04,
            ease: "none",
          },
          "depart",
        );
      buildCurveTimeline();
    }, container);
    ScrollTrigger.refresh();
  }

  // Source: FLIP Carousel — preserve grid slots, and animate the edge wrap on the same clock.
  function moveCarousel(direction) {
    if (busy) {
      queuedDirection = direction;
      return;
    }
    const cards = [...carousel.children];
    const wrapping = direction > 0 ? cards[0] : cards.at(-1);
    const state = Flip.getState(cards);
    const cardRect = wrapping.getBoundingClientRect();
    const windowRect = carouselWindow.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
    const step = cardRect.width + gap;
    let ghost;
    if (!calm()) {
      ghost = wrapping.cloneNode(true);
      ghost.classList.add("fn-wrap-ghost");
      ghost.setAttribute("aria-hidden", "true");
      ghost.inert = true;
      Object.assign(ghost.style, {
        position: "absolute",
        left: `${cardRect.left - windowRect.left}px`,
        top: `${cardRect.top - windowRect.top}px`,
        width: `${cardRect.width}px`,
        height: `${cardRect.height}px`,
        pointerEvents: "none",
        zIndex: "2",
      });
      carouselWindow.append(ghost);
    }
    if (direction > 0) carousel.append(wrapping);
    else carousel.prepend(wrapping);
    const finish = () => {
      ghost?.remove();
      $(".fn-carousel-status").textContent =
        `First in view: field note ${carousel.firstElementChild.dataset.note}`;
      carouselWindow.removeAttribute("aria-busy");
      busy = false;
      if (queuedDirection && !destroyed) {
        const nextDirection = queuedDirection;
        queuedDirection = 0;
        context.add(() => moveCarousel(nextDirection));
      }
    };
    if (calm()) {
      finish();
      return;
    }
    busy = true;
    carouselWindow.setAttribute("aria-busy", "true");
    carouselTimeline = gsap.timeline({ paused: true, onComplete: finish });
    carouselTimeline.addLabel("reorder");
    // Transform-only FLIP leaves every card in the grid, preventing a completion-time snap.
    carouselTimeline.add(
      Flip.from(state, {
        targets: cards.filter((card) => card !== wrapping),
        duration: config.duration,
        ease: config.ease,
        absolute: false,
      }),
      "reorder",
    );
    carouselTimeline
      .to(
        ghost,
        {
          x: -direction * step,
          scale: config.carouselWrapScale,
          opacity: 0,
          transformOrigin: "50% 100%",
          duration: config.duration,
          ease: config.ease,
        },
        "reorder",
      )
      .fromTo(
        wrapping,
        {
          x: direction * step,
          scale: config.carouselWrapScale,
          opacity: 0,
          transformOrigin: "50% 100%",
        },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: config.duration,
          ease: config.ease,
        },
        "reorder",
      )
      .play(0);
  }
  on($("[data-next]"), "click", () => moveCarousel(1));
  on($("[data-prev]"), "click", () => moveCarousel(-1));
  on(carouselWindow, "keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    moveCarousel(event.key === "ArrowRight" ? 1 : -1);
  });
  // Source: Curve swipe — a bowed panel rises, flattens, holds, then recedes downward.
  // The panel is an editable SVG path, not a scaled rectangle or a video texture.
  function drawCurve() {
    const progress = curveState.value;
    const exiting = curveState.exiting === 1;
    const edge = (1 - progress) * (exiting ? 1500 : 1100) - progress * 2;
    const bend =
      (exiting
        ? Math.sin(((1 - progress) * Math.PI) / 2)
        : Math.sin(progress * Math.PI)) *
      config.curveBend *
      1000;
    curvePath.setAttribute(
      "d",
      `M0 ${edge}Q500 ${edge - bend} 1000 ${edge}L1000 1100L0 1100Z`,
    );
    footer.dataset.curveProgress = progress.toFixed(4);
  }
  function resetCurve() {
    curveState.value = 0;
    curveState.exiting = 0;
    drawCurve();
  }
  function buildCurveTimeline() {
    curveTimeline = gsap
      .timeline({
        scrollTrigger: {
          id: "fn-curve",
          trigger: footer,
          start: pinStart,
          end: () =>
            `clamp(+=${innerHeight * config.curveScroll * scrollFactor()})`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .addLabel("rise")
      .set(curveState, { value: 0, exiting: 0 }, "rise")
      .to(
        curveState,
        {
          value: 1,
          duration: config.curveCoverDuration,
          ease: "none",
          onUpdate: drawCurve,
        },
        "rise",
      )
      .addLabel("covered")
      .set(curveState, { exiting: 1 }, `covered+=${config.curveHoldDuration}`)
      .to(
        curveState,
        {
          value: 0,
          duration: config.curveExitDuration,
          ease: "none",
          onUpdate: drawCurve,
        },
        `covered+=${config.curveHoldDuration}`,
      );
  }
  const setPaused = (paused) => {
    userPaused = paused;
    // Complete the one carousel timeline atomically; do not advance individual FLIP children.
    queuedDirection = 0;
    if (busy) carouselTimeline?.progress(1).pause();
    renderMotion();
  };
  on(pauseButton, "click", () => setPaused(!userPaused));
  media.add(
    {
      mobile: `(max-width: ${config.compactBreakpoint - 1}px)`,
      desktop: `(min-width: ${config.compactBreakpoint}px)`,
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (match) => {
      reduced = match.conditions.reduce;
      compact = container.clientWidth < config.compactBreakpoint;
      renderMotion();
      return () => {
        motionContext?.revert();
        split?.revert();
      };
    },
  );

  startHeroReveal();

  const refreshSize = () => {
    if (destroyed) return;
    const width = container.clientWidth;
    const height = innerHeight;
    if (width === lastWidth && height === lastHeight) return;
    queuedDirection = 0;
    if (busy) carouselTimeline?.progress(1).pause();
    lastWidth = width;
    lastHeight = height;
    compact = width < config.compactBreakpoint;
    renderMotion();
  };
  const scheduleResize = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(refreshSize);
  };
  const resize = new ResizeObserver(scheduleResize);
  resize.observe(container);
  on(window, "resize", scheduleResize);
  const visible = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
      rotateX.tween.pause();
      rotateY.tween.pause();
    }
  });
  visible.observe(tiltStage);
  const refresh = () => {
    if (!destroyed) ScrollTrigger.refresh();
  };
  $$("img").forEach((image) => on(image, "load", refresh, { once: true }));
  document.fonts.ready.then(refresh);
  cleanups.push(() => {
    resize.disconnect();
    visible.disconnect();
    cancelAnimationFrame(resizeFrame);
  });
  const api = {
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
      cleanups.forEach((cleanup) => cleanup());
      heroContext?.revert();
      heroSplits.forEach((part) => part.revert());
      media.revert();
      motionContext?.revert();
      split?.revert();
      context.revert();
      container.innerHTML = originalHTML;
      if (originalCalm === null) container.removeAttribute("data-calm");
      else container.setAttribute("data-calm", originalCalm);
      mounts.delete(container);
    },
  };
  mounts.set(container, api);
  return api;
}

const root = document.querySelector(".gsap-container.field-notes");
if (root) mountAnimation(root);
