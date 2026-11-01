const GSAP_CDN_URL = "https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/";
const GSAP_PLUGIN_NAMES = [
  "ScrollTrigger",
  "ScrollToPlugin",
  "SplitText",
  "TextPlugin",
  "ScrambleTextPlugin",
  "DrawSVGPlugin",
  "MorphSVGPlugin",
  "MotionPathPlugin",
  "Flip",
  "Draggable",
  "InertiaPlugin",
  "Physics2DPlugin",
];

function loadScript(root, libraryName) {
  return new Promise((resolve, reject) => {
    if (window[libraryName]) {
      return resolve(window[libraryName]);
    }
    const script = document.createElement("script");
    script.src = `${GSAP_CDN_URL}${libraryName}.min.js`;
    script.async = true;
    script.onload = () =>
      window[libraryName]
        ? resolve(window[libraryName])
        : reject(new Error(`${libraryName} unavailable`));
    script.onerror = () => reject(new Error(`${libraryName} could not load`));
    root.append(script);
  });
}

// Only this root starts the CDN loader. Home pages do not load animation libraries.
export async function initShowcase(root) {
  if (!root || root.dataset.initialized) {
    return;
  }
  root.dataset.initialized = "true";
  generateCubeArt(root);
  const loadStatus = root.querySelector("[data-load-status]");
  let libraries;

  try {
    libraries = await loadAnimationLibraries(root);
  } catch (error) {
    loadStatus.textContent =
      "The animation studio is offline. All artwork and chapter links are still here; reload to try again.";
    console.warn("Motion showcase:", error.message);
    return;
  }

  if (!root.isConnected) {
    return;
  }
  await document.fonts.ready;

  const { gsap, plugins } = libraries;
  loadStatus.hidden = true;
  root.querySelectorAll("button[disabled]").forEach((button) => {
    button.disabled = false;
  });
  const motionToggle = root.querySelector("[data-motion-toggle]");
  let isMotionPaused = false;
  let mediaContext;

  const mountAnimations = () => {
    mediaContext = gsap.matchMedia(root);
    mediaContext.add(
      {
        all: "(min-width: 0px)",
        isDesktop: "(min-width: 48rem)",
        hasRoomForPinning: "(min-width: 48rem) and (min-height: 44rem)",
        hasFinePointer: "(hover: hover) and (pointer: fine)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (mediaMatch) => {
        const eventController = new AbortController();
        const cleanupCallbacks = [];
        const animationContext = gsap.context(() => {}, root);
        const reduceMotion =
          mediaMatch.conditions.reduceMotion || isMotionPaused;
        updateMotionControls(root, motionToggle, {
          reduceMotion,
          systemReducedMotion: mediaMatch.conditions.reduceMotion,
          isMotionPaused,
        });
        const environment = {
          root,
          gsap,
          plugins,
          reduceMotion,
          isDesktop: mediaMatch.conditions.isDesktop,
          hasRoomForPinning: mediaMatch.conditions.hasRoomForPinning,
          hasFinePointer: mediaMatch.conditions.hasFinePointer,
          select: (selector) => root.querySelector(selector),
          selectAll: (selector) => [...root.querySelectorAll(selector)],
          duration: (value) => (reduceMotion ? 0 : value),
          cleanup: (callback) => cleanupCallbacks.push(callback),
          on: (target, type, callback, options = {}) => {
            target.addEventListener(
              type,
              (event) => {
                animationContext.add(() => {
                  callback(event);
                });
              },
              { ...options, signal: eventController.signal },
            );
          },
        };
        animationContext.add(() => {
          initNavigation(environment);
          initHero(environment);
          initDepth(environment);
          initText(environment);
          initPaths(environment);
          initLayout(environment);
          initPhysics(environment);
          initInterface(environment);
          initImages(environment);
          initParticles(environment);
          initCube(environment);
          initFinale(environment);
        });
        plugins.ScrollTrigger.refresh();
        return () => {
          eventController.abort();
          animationContext.revert();
          cleanupCallbacks.forEach((dispose) => dispose());
        };
      },
    );
  };
  const toggleMotion = () => {
    isMotionPaused = !isMotionPaused;
    mediaContext.revert();
    mountAnimations();
  };
  motionToggle.addEventListener("click", toggleMotion);
  mountAnimations();

  // Revert only this studio's contexts; never kill another page's ScrollTriggers.
  const teardown = () => {
    mediaContext.revert();
    motionToggle.removeEventListener("click", toggleMotion);
    root.dataset.initialized = "";
  };
  window.addEventListener(
    "pagehide",
    (event) => {
      if (!event.persisted) {
        teardown();
      }
    },
    { once: true },
  );
  return teardown;
}

async function loadAnimationLibraries(root) {
  const gsap = await loadScript(root, "gsap");
  const loadedPlugins = await Promise.all(
    GSAP_PLUGIN_NAMES.map((name) => loadScript(root, name)),
  );

  gsap.registerPlugin(...loadedPlugins);

  const plugins = Object.fromEntries(
    GSAP_PLUGIN_NAMES.map((name) => [name, window[name]]),
  );

  return { gsap, plugins };
}

function updateMotionControls(root, motionToggle, state) {
  const { reduceMotion, systemReducedMotion, isMotionPaused } = state;
  root.dataset.motion = reduceMotion ? "static" : "active";
  motionToggle.disabled = systemReducedMotion;
  motionToggle.setAttribute("aria-pressed", String(reduceMotion));

  if (systemReducedMotion) {
    motionToggle.textContent = "Reduced motion";
  } else if (isMotionPaused) {
    motionToggle.textContent = "Resume motion";
  } else {
    motionToggle.textContent = "Pause motion";
  }

  const replayControls = [
    "[data-replay-text]",
    "[data-replay-path]",
    "[data-image-replay]",
    "[data-particle-burst]",
  ];

  root.querySelectorAll(replayControls.join(", ")).forEach((button) => {
    button.disabled = reduceMotion;
    button.title = reduceMotion
      ? "Animation is paused or reduced motion is enabled."
      : "";
  });
}

// GSAP and Flip can leave temporary inline styles after a context reverts.
function saveInlineStyles(elements) {
  const snapshots = elements.map((element) => ({
    element,
    style: element.getAttribute("style"),
  }));

  return () => {
    snapshots.forEach(({ element, style }) => {
      if (style === null) {
        element.removeAttribute("style");
      } else {
        element.setAttribute("style", style);
      }
    });
  };
}

// Observe looping scenes so offscreen work is paused, including background tabs.
function observeLoop(environment, element, animation) {
  let visible = false;
  const sync = () => animation.paused(!visible || document.hidden);
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      sync();
    },
    { threshold: 0.05 },
  );
  observer.observe(element);
  environment.on(document, "visibilitychange", sync);
  environment.cleanup(() => observer.disconnect());
}

function initNavigation(environment) {
  const { root, gsap, on, reduceMotion } = environment;
  on(root, "click", (event) => {
    const link = event.target.closest('a[href^="#motion-"]');
    if (!link) {
      return;
    }
    const target = root.querySelector(link.getAttribute("href"));
    if (!target) {
      return;
    }
    event.preventDefault();
    const focusTarget = () => {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true },
      );
    };
    if (reduceMotion) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
      focusTarget();
    } else {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 90, autoKill: true },
        duration: 1.1,
        ease: "power3.inOut",
        onComplete: focusTarget,
      });
    }
  });
}

// 01 — Typed title, transforms, opacity, stagger, timeline, easing, magnetic hover.
function initHero(environment) {
  const { select, selectAll, gsap, plugins, on, reduceMotion, hasFinePointer } =
    environment;
  const hero = select(".motion-hero");
  if (reduceMotion) {
    return;
  }
  // Reveal characters without removing them, preserving line breaks and layout.
  const title = plugins.SplitText.create(select("#motion-hero-title"), {
    type: "words,chars",
    aria: "auto",
  });
  environment.cleanup(() => title.revert());
  gsap.set(title.chars, { opacity: 0 });
  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .from(select(".motion-display"), { y: 24, duration: 0.5 })
    .to(
      title.chars,
      { opacity: 1, duration: 0, stagger: 0.065, ease: "none" },
      0.2,
    )
    .from(
      hero.querySelectorAll(".motion-copy, .motion-button, .motion-footnote"),
      { y: 20, opacity: 0, stagger: 0.15, duration: 0.65 },
      "-=0.25",
    )
    .from(
      select("[data-hero-shape]"),
      { scale: 0.35, rotation: -100, skewX: 14, opacity: 0, duration: 1.1 },
      0.15,
    );
  const orbit = gsap.to(select(".motion-orbit--one"), {
    rotation: "+=360",
    duration: 36,
    repeat: -1,
    ease: "none",
    paused: true,
  });
  observeLoop(environment, hero, orbit);
  const float = gsap.to(select(".motion-orbit-dot"), {
    y: 28,
    x: 16,
    duration: 2.8,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    paused: true,
  });
  observeLoop(environment, hero, float);
  if (hasFinePointer) {
    const sun = select("[data-hero-shape]");
    const moveSunX = gsap.quickTo(sun, "x", {
      duration: 0.65,
      ease: "power3.out",
    });
    const moveSunY = gsap.quickTo(sun, "y", {
      duration: 0.65,
      ease: "power3.out",
    });
    on(hero, "pointermove", (event) => {
      if (event.pointerType === "touch") {
        return;
      }
      const bounds = hero.getBoundingClientRect();
      moveSunX(
        ((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 28,
      );
      moveSunY(
        ((event.clientY - bounds.top - bounds.height / 2) / bounds.height) * 20,
      );
    });
    const centerSun = () => {
      moveSunX(0);
      moveSunY(0);
    };
    on(hero, "pointerleave", centerSun);
    on(hero, "pointercancel", centerSun);

    selectAll("[data-magnetic]").forEach((button) => {
      on(button, "pointermove", (event) => {
        const bounds = button.getBoundingClientRect();
        gsap.to(button, {
          x: (event.clientX - bounds.left - bounds.width / 2) * 0.16,
          y: (event.clientY - bounds.top - bounds.height / 2) * 0.25,
          duration: 0.35,
          overwrite: "auto",
        });
      });
      on(button, "pointerleave", () =>
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
        }),
      );
    });
  }
}

// 02 — Scrubbed parallax and 3D perspective; desktop pins, mobile flows naturally.
function initDepth(environment) {
  const { select, gsap, reduceMotion, isDesktop, hasRoomForPinning } =
    environment;
  if (reduceMotion) {
    return;
  }
  const section = select(".motion-depth");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 90px",
        end: isDesktop && hasRoomForPinning ? "+=100%" : "bottom 20%",
        pin: isDesktop && hasRoomForPinning,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    })
    .fromTo(
      select(".motion-depth__layer--back"),
      { y: 60, rotationY: -20 },
      { y: -70, rotationY: 12, ease: "none" },
      0,
    )
    .fromTo(
      select(".motion-depth__layer--middle"),
      { y: 90, rotationX: 18 },
      { y: -35, rotationX: -8, rotation: 5, ease: "none" },
      0,
    )
    .fromTo(
      select(".motion-depth__layer--front"),
      { y: 100, rotationY: 35 },
      { y: -120, rotationY: -25, rotation: -12, ease: "none" },
      0,
    )
    .to(select(".motion-progress span"), { scaleX: 1, ease: "none" }, 0);
}

// 03 — Accessible SplitText plus two independent text treatments.
function initText(environment) {
  const { select, gsap, plugins, on, reduceMotion } = environment;
  if (reduceMotion) {
    return;
  }
  const split = plugins.SplitText.create(select("[data-split]"), {
    type: "words,chars",
    aria: "auto",
  });
  environment.cleanup(() => split.revert());
  const timeline = gsap
    .timeline({ paused: true })
    .from(split.chars, {
      yPercent: 100,
      rotationX: -70,
      opacity: 0,
      stagger: 0.018,
      duration: 0.7,
      ease: "back.out(1.3)",
    })
    .fromTo(
      select("[data-typing]"),
      { text: "" },
      { text: "Make room for possibility.", duration: 1.6, ease: "none" },
      "-=0.2",
    )
    .to(
      select("[data-scramble]"),
      {
        scrambleText: {
          text: "ORDER FROM CURIOSITY",
          chars: "upperCase",
          revealDelay: 0.2,
          speed: 0.5,
        },
        duration: 1.8,
      },
      "-=1.4",
    );
  plugins.ScrollTrigger.create({
    trigger: select(".motion-type"),
    start: "top 65%",
    once: true,
    onEnter: () => timeline.play(),
  });
  on(select("[data-replay-text]"), "click", () => timeline.restart());
}

// 04 — Path drawing and morphing are real SVG plugins, not CSS substitutes.
function initPaths(environment) {
  const { select, gsap, plugins, on, reduceMotion } = environment;
  const route = select("[data-route]");
  const traveler = select("[data-traveler]");
  if (reduceMotion) {
    gsap.set(traveler, { x: 455, y: 235 });
    return;
  }
  const timeline = gsap
    .timeline({ paused: true })
    .fromTo(
      route,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 3, ease: "none" },
      0,
    )
    .to(
      traveler,
      {
        motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5] },
        duration: 3,
        ease: "none",
      },
      0,
    )
    .to(
      select("[data-morph]"),
      {
        morphSVG: select("[data-morph-end]"),
        duration: 1.3,
        ease: "elastic.out(1, 0.6)",
      },
      1.4,
    );
  plugins.ScrollTrigger.create({
    trigger: select(".motion-paths"),
    start: "top 60%",
    once: true,
    onEnter: () => timeline.play(),
  });
  on(select("[data-replay-path]"), "click", () => timeline.restart());
}

// 05 — Capture the previous layout, change CSS, then FLIP between the two states.
function initLayout(environment) {
  const { select, selectAll, gsap, plugins, on, reduceMotion } = environment;
  const grid = select("[data-flip-grid]");
  const button = select("[data-flip-toggle]");
  const label = button.querySelector("[data-flip-label]");
  const tiles = selectAll(".motion-tile");
  const content = tiles.flatMap((tile) => [...tile.children]);
  const restoreTileStyles = saveInlineStyles(tiles);
  const restoreContentStyles = saveInlineStyles(content);
  let tween;
  const revealContent = () => {
    restoreContentStyles();
    grid.removeAttribute("aria-busy");
    button.disabled = false;
  };
  const changeLayout = () => {
    const list = grid.classList.toggle("motion-tiles--list");
    button.setAttribute("aria-pressed", String(list));
    label.textContent = list ? "Switch to grid" : "Switch to list";
  };
  const fadeInContent = () => {
    plugins.ScrollTrigger.refresh();
    tween = gsap.to(content, {
      autoAlpha: 1,
      duration: 0.25,
      stagger: 0.015,
      ease: "power2.out",
      onComplete: revealContent,
      onInterrupt: revealContent,
    });
  };

  const animateLayout = () => {
    const state = plugins.Flip.getState(tiles);
    changeLayout();
    tween = plugins.Flip.from(state, {
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.05,
      onInterrupt: revealContent,
      onComplete: fadeInContent,
    });
  };

  on(button, "click", () => {
    if (button.disabled) {
      return;
    }
    if (reduceMotion) {
      changeLayout();
      plugins.ScrollTrigger.refresh();
      return;
    }

    grid.setAttribute("aria-busy", "true");
    button.disabled = true;

    // Fade out first, move the empty cards, then fade their contents back in.
    tween = gsap.to(content, {
      autoAlpha: 0,
      duration: 0.16,
      ease: "power1.out",
      onInterrupt: revealContent,
      onComplete: animateLayout,
    });
  });
  environment.cleanup(() => {
    tween?.kill();
    revealContent();
    // Restore Flip's temporary sizes/transforms after the GSAP context reverts.
    restoreTileStyles();
    grid.classList.remove("motion-tiles--list");
    label.textContent = "Switch to list";
    button.setAttribute("aria-pressed", "false");
  });
}

// 06 — Throw and grid-snap use InertiaPlugin; the star uses gravity and velocity.
function initPhysics(environment) {
  const { select, gsap, plugins, on, reduceMotion, duration } = environment;
  const field = select("[data-playground]");
  const disc = select("[data-disc]");
  const clampX = (x) =>
    gsap.utils.clamp(
      0,
      field.clientWidth - disc.offsetWidth,
      Math.round(x / 24) * 24,
    );
  const clampY = (y) =>
    gsap.utils.clamp(
      0,
      field.clientHeight - disc.offsetHeight,
      Math.round(y / 24) * 24,
    );
  const [draggable] = plugins.Draggable.create(disc, {
    type: "x,y",
    bounds: field,
    inertia: !reduceMotion,
    edgeResistance: 0.8,
    allowNativeTouchScrolling: true,
    minimumMovement: 6,
    snap: { x: clampX, y: clampY },
    onDragEnd() {
      if (reduceMotion) {
        gsap.set(disc, { x: clampX(this.x), y: clampY(this.y) });
      }
    },
  });
  environment.cleanup(() => draggable.kill());
  const resize = new ResizeObserver(() => {
    draggable.applyBounds(field);
  });
  resize.observe(field);
  environment.cleanup(() => resize.disconnect());
  on(disc, "keydown", (event) => {
    const steps = {
      ArrowLeft: [-24, 0],
      ArrowRight: [24, 0],
      ArrowUp: [0, -24],
      ArrowDown: [0, 24],
      Enter: [0, 0],
    };
    if (!steps[event.key]) {
      return;
    }
    event.preventDefault();
    draggable.tween?.kill();
    const [dx, dy] = steps[event.key];
    const x =
      event.key === "Enter"
        ? 0
        : clampX(Number(gsap.getProperty(disc, "x")) + dx);
    const y =
      event.key === "Enter"
        ? 0
        : clampY(Number(gsap.getProperty(disc, "y")) + dy);
    gsap.to(disc, {
      x,
      y,
      duration: duration(0.25),
      overwrite: true,
      onUpdate: () => draggable.update(),
    });
    select("[data-drag-status]").textContent = `Disc position: ${x}, ${y}.`;
  });
  on(select("[data-launch]"), "click", () => {
    const star = select(".motion-projectile");
    gsap.killTweensOf(star);
    if (reduceMotion) {
      gsap.set(star, { x: field.clientWidth * 0.65, y: -50 });
      return;
    }
    // A one-second flight returns to its launch height under constant gravity.
    const velocityX = Math.min(field.clientWidth * 0.65, 450);
    const velocityY = -Math.min(field.clientHeight, 260);
    gsap.fromTo(
      star,
      { x: 0, y: 0, rotation: 0 },
      {
        physics2D: {
          velocity: Math.hypot(velocityX, velocityY),
          angle: (Math.atan2(velocityY, velocityX) * 180) / Math.PI,
          gravity: -velocityY * 2,
        },
        rotation: 300,
        duration: 1,
        ease: "none",
      },
    );
  });
}

// 07 — A local page router with crossfades, touch swipes, a menu, accordion, and native modal.
function initInterface(environment) {
  const showSlide = initCarousel(environment);
  initMiniMenu(environment, showSlide);
  initAccordion(environment);
  initModal(environment);
}

function initCarousel(environment) {
  const { select, selectAll, gsap, on, duration, reduceMotion, plugins } =
    environment;
  const slides = selectAll(".motion-slide");
  const viewport = select(".motion-slides");
  const currentSlideLabel = select("[data-slide-current]");
  let currentIndex = 0;
  let isTransitioning = false;
  let pointerStart;

  slides.forEach((slide, index) => {
    slide.hidden = index !== 0;
  });
  currentSlideLabel.textContent = "1";

  const showSlide = (requestedIndex) => {
    if (isTransitioning) {
      return;
    }

    const nextIndex = gsap.utils.wrap(0, slides.length, requestedIndex);
    if (nextIndex === currentIndex) {
      return;
    }

    const outgoingSlide = slides[currentIndex];
    const incomingSlide = slides[nextIndex];
    isTransitioning = true;
    incomingSlide.hidden = false;
    incomingSlide.inert = false;
    outgoingSlide.inert = true;

    gsap
      .timeline({
        onComplete: () => {
          outgoingSlide.hidden = true;
          currentIndex = nextIndex;
          isTransitioning = false;
          currentSlideLabel.textContent = String(currentIndex + 1);
          plugins.ScrollTrigger.refresh();
        },
      })
      .to(
        outgoingSlide,
        { xPercent: -8, opacity: 0, duration: duration(0.4) },
        0,
      )
      .fromTo(
        incomingSlide,
        { xPercent: 8, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: duration(0.5) },
        reduceMotion ? 0 : 0.05,
      );
  };

  on(select("[data-slide-next]"), "click", () => showSlide(currentIndex + 1));
  on(select("[data-slide-prev]"), "click", () => showSlide(currentIndex - 1));
  on(viewport, "keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) {
      return;
    }
    event.preventDefault();
    showSlide(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
  });

  on(viewport, "pointerdown", (event) => {
    if (event.isPrimary) {
      pointerStart = { x: event.clientX, y: event.clientY };
    }
  });
  on(viewport, "pointerup", (event) => {
    if (!pointerStart) {
      return;
    }

    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    pointerStart = null;

    const isHorizontalSwipe =
      Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY);
    if (isHorizontalSwipe) {
      showSlide(currentIndex + (deltaX < 0 ? 1 : -1));
    }
  });
  on(viewport, "pointercancel", () => {
    pointerStart = null;
  });

  environment.cleanup(() => {
    slides.forEach((slide) => {
      slide.inert = false;
    });
  });

  return showSlide;
}

function initMiniMenu(environment, showSlide) {
  const { select, selectAll, gsap, on, duration, plugins } = environment;
  const menu = select(".motion-mini-menu");
  const toggleButton = select("[data-menu-toggle]");
  menu.hidden = true;
  toggleButton.setAttribute("aria-expanded", "false");

  const closeMenu = () => {
    menu.hidden = true;
    toggleButton.setAttribute("aria-expanded", "false");
    plugins.ScrollTrigger.refresh();
  };

  on(toggleButton, "click", () => {
    const shouldOpen = menu.hidden;
    menu.hidden = !shouldOpen;
    toggleButton.setAttribute("aria-expanded", String(shouldOpen));

    if (shouldOpen) {
      gsap.fromTo(
        menu,
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: duration(0.25),
          onComplete: () => plugins.ScrollTrigger.refresh(),
        },
      );
    } else {
      plugins.ScrollTrigger.refresh();
    }
  });

  selectAll("[data-scene]").forEach((button) => {
    on(button, "click", () => {
      showSlide(Number(button.dataset.scene));
      closeMenu();
      toggleButton.focus();
    });
  });
  on(menu, "keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggleButton.focus();
    }
  });
}

function initAccordion(environment) {
  const { select, gsap, on, duration, plugins } = environment;
  const toggleButton = select("[data-accordion]");
  const panel = select("#motion-accordion-panel");
  toggleButton.setAttribute("aria-expanded", "false");
  panel.hidden = true;

  on(toggleButton, "click", () => {
    const shouldOpen = toggleButton.getAttribute("aria-expanded") !== "true";
    toggleButton.setAttribute("aria-expanded", String(shouldOpen));
    gsap.killTweensOf(panel);

    if (shouldOpen) {
      panel.hidden = false;
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: duration(0.35),
          onComplete: () => plugins.ScrollTrigger.refresh(),
        },
      );
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: duration(0.25),
        onComplete: () => {
          panel.hidden = true;
          plugins.ScrollTrigger.refresh();
        },
      });
    }
  });
}

function initModal(environment) {
  const { select, gsap, on, duration } = environment;
  const dialog = select(".motion-dialog");
  const openButton = select("[data-open-modal]");

  const closeDialog = () => {
    gsap.to(dialog, {
      y: 16,
      opacity: 0,
      duration: duration(0.2),
      onComplete: () => {
        dialog.close();
        openButton.focus();
      },
    });
  };

  on(openButton, "click", () => {
    dialog.showModal();
    gsap.fromTo(
      dialog,
      { y: 24, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: duration(0.35),
        ease: "power3.out",
      },
    );
  });
  on(select("[data-close-modal]"), "click", closeDialog);
  on(dialog, "cancel", (event) => {
    event.preventDefault();
    closeDialog();
  });

  environment.cleanup(() => {
    if (dialog.open) {
      dialog.close();
    }
  });
}

// 08 — Pin the section when the small image reaches center, then scrub it to full size.
function initImages(environment) {
  const {
    select,
    gsap,
    on,
    reduceMotion,
    hasFinePointer,
    isDesktop,
    hasRoomForPinning,
  } = environment;
  const section = select(".motion-images");
  const frame = select(".motion-image-frame");
  const artwork = select(".motion-landscape");
  if (reduceMotion) {
    return;
  }
  const restoreImageStyles = saveInlineStyles([frame, artwork]);
  environment.cleanup(restoreImageStyles);
  const getPinStart = () => {
    // Center in the visible space below the portfolio's sticky 5rem header.
    const headerHeight =
      parseFloat(getComputedStyle(environment.root).fontSize) * 5;
    const visibleCenter = (window.innerHeight + headerHeight) / 2;
    return `center ${visibleCenter}px`;
  };
  const getRevealDistance = () => {
    const distance =
      isDesktop && hasRoomForPinning
        ? Math.max(window.innerHeight * 0.9, 600)
        : Math.max(window.innerHeight * 0.65, 300);
    return `+=${distance}`;
  };
  const timeline = gsap
    .timeline({
      scrollTrigger: {
        trigger: frame,
        start: getPinStart,
        end: getRevealDistance,
        pin: section,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
    .fromTo(
      frame,
      { scale: 0.35, clipPath: "inset(0% round 1.5rem)" },
      {
        scale: 1,
        clipPath: "inset(0% round 0.5rem)",
        duration: 1,
        ease: "none",
      },
      0,
    )
    .fromTo(
      artwork,
      { scale: 1.25 },
      { scale: 1, duration: 1, ease: "none" },
      0,
    );
  on(select("[data-image-replay]"), "click", () => {
    gsap.to(window, {
      scrollTo: {
        y: Math.max(0, timeline.scrollTrigger.start),
        autoKill: true,
      },
      duration: 0.7,
      ease: "power2.inOut",
    });
  });
  if (!hasFinePointer) {
    return;
  }
  const cursor = select(".motion-image-cursor");
  on(frame, "pointermove", (event) => {
    const bounds = frame.getBoundingClientRect();
    // Convert pointer coordinates into the frame's unscaled coordinate space.
    const x =
      ((event.clientX - bounds.left) * frame.clientWidth) / bounds.width;
    const y =
      ((event.clientY - bounds.top) * frame.clientHeight) / bounds.height;
    gsap.to(cursor, {
      x: x - 40,
      y: y - 40,
      opacity: 1,
      duration: 0.2,
      overwrite: "auto",
    });
    gsap.to(artwork, {
      x: (x / frame.clientWidth - 0.5) * 14,
      y: (y / frame.clientHeight - 0.5) * 10,
      duration: 0.5,
      overwrite: "auto",
    });
  });
  on(frame, "pointerleave", () => {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
    gsap.to(artwork, { x: 0, y: 0, duration: 0.5 });
  });
}

// 09 — GSAP tweens plain objects; a single ticker paints their properties to Canvas.
function initParticles(environment) {
  const { select, gsap, on, reduceMotion } = environment;
  const canvas = select("[data-particles]");
  const drawingContext = canvas.getContext("2d");
  if (!drawingContext) {
    return;
  }
  let width = 1;
  let height = 1;
  let isVisible = false;
  let color;
  const pointer = { x: -1000, y: -1000 };
  const particles = Array.from(
    { length: environment.isDesktop ? 60 : 34 },
    (_, i) => ({
      normalizedX: (i * 0.618033) % 1,
      normalizedY: (i * 0.414214 + 0.17) % 1,
      phase: i * 0.4,
      radius: 1.5 + (i % 3) * 0.7,
      spread: 1,
    }),
  );
  const renderParticles = () => {
    if (!isVisible && !reduceMotion) {
      return;
    }
    drawingContext.clearRect(0, 0, width, height);
    drawingContext.fillStyle = color;
    drawingContext.strokeStyle = color;
    const points = particles.map((particle) => {
      let x =
        width / 2 +
        ((particle.normalizedX - 0.5) * width * 0.9 +
          Math.sin(particle.phase) * 12) *
          particle.spread;
      let y =
        height / 2 +
        ((particle.normalizedY - 0.5) * height * 0.8 +
          Math.cos(particle.phase) * 12) *
          particle.spread;
      const distance = Math.hypot(x - pointer.x, y - pointer.y);
      if (!reduceMotion && distance < 160) {
        x += (pointer.x - x) * (1 - distance / 160) * 0.25;
        y += (pointer.y - y) * (1 - distance / 160) * 0.25;
      }
      drawingContext.beginPath();
      drawingContext.arc(x, y, particle.radius, 0, Math.PI * 2);
      drawingContext.fill();
      return { x, y };
    });
    drawingContext.globalAlpha = 0.18;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (
          Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y) > 85
        ) {
          continue;
        }
        drawingContext.beginPath();
        drawingContext.moveTo(points[i].x, points[i].y);
        drawingContext.lineTo(points[j].x, points[j].y);
        drawingContext.stroke();
      }
    }
    drawingContext.globalAlpha = 1;
  };
  const resizeObserver = new ResizeObserver(() => {
    const bounds = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    color = getComputedStyle(environment.root)
      .getPropertyValue("--color-accent")
      .trim();
    renderParticles();
  });
  resizeObserver.observe(canvas);
  const themeObserver = new MutationObserver(() => {
    color = getComputedStyle(environment.root)
      .getPropertyValue("--color-accent")
      .trim();
    renderParticles();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const drift = reduceMotion
    ? null
    : gsap.to(particles, {
        phase: "+=6.283185",
        duration: 12,
        repeat: -1,
        ease: "none",
        paused: true,
      });
  const updateRenderingState = () => {
    const active = isVisible && !document.hidden && !reduceMotion;
    drift?.paused(!active);
    gsap.ticker.remove(renderParticles);
    if (active) {
      gsap.ticker.add(renderParticles);
    } else if (isVisible) {
      renderParticles();
    }
  };
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      updateRenderingState();
    },
    { threshold: 0.05 },
  );
  visibilityObserver.observe(canvas);
  on(document, "visibilitychange", updateRenderingState);
  on(
    canvas,
    "pointermove",
    (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    },
    { passive: true },
  );
  const clearPointer = () => {
    pointer.x = -1000;
    pointer.y = -1000;
  };
  on(canvas, "pointerleave", clearPointer);
  on(canvas, "pointerup", clearPointer);
  on(canvas, "pointercancel", clearPointer);
  on(select("[data-particle-burst]"), "click", () => {
    if (reduceMotion) {
      return;
    }
    gsap.fromTo(
      particles,
      { spread: 0.1 },
      {
        spread: 1,
        duration: 1.8,
        stagger: 0.008,
        ease: "elastic.out(1, 0.6)",
        overwrite: "auto",
      },
    );
  });
  environment.cleanup(() => {
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    themeObserver.disconnect();
    gsap.ticker.remove(renderParticles);
  });
}

// Each visit gets six different, randomized SVG compositions, even without the CDN.
function generateCubeArt(root) {
  const kinds = ["rings", "star", "dots", "waves", "arches", "orbits"];
  for (let i = kinds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kinds[i], kinds[j]] = [kinds[j], kinds[i]];
  }
  const random = (min, max) => min + Math.random() * (max - min);
  root.querySelectorAll("[data-cube-face] svg").forEach((svg, index) => {
    svg.replaceChildren();
    const add = (tag, attributes, parent = svg) => {
      const shape = document.createElementNS("http://www.w3.org/2000/svg", tag);
      Object.entries(attributes).forEach(([key, value]) =>
        shape.setAttribute(key, String(value)),
      );
      parent.append(shape);
      return shape;
    };
    const accent = "motion-cube__art-accent";
    switch (kinds[index]) {
      case "rings": {
        const cx = random(85, 115);
        const cy = random(85, 115);
        [25, 45, 65].forEach((r) => add("circle", { cx, cy, r }));
        add("circle", {
          cx: cx + 45,
          cy,
          r: 7,
          fill: "currentColor",
          class: accent,
        });
        break;
      }
      case "star": {
        const tips = Math.floor(random(5, 9));
        const offset = random(0, Math.PI);
        const points = Array.from({ length: tips * 2 }, (_, i) => {
          const angle = offset + (i * Math.PI) / tips;
          const r = i % 2 ? 30 : 75;
          return `${100 + Math.cos(angle) * r},${100 + Math.sin(angle) * r}`;
        });
        add("polygon", { points: points.join(" "), class: accent });
        add("circle", { cx: 100, cy: 100, r: random(8, 18) });
        break;
      }
      case "dots":
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            add("circle", {
              cx: 45 + col * 55,
              cy: 45 + row * 55,
              r: random(6, 20),
              fill: Math.random() > 0.55 ? "currentColor" : "none",
              class: (row + col) % 2 ? accent : "",
            });
          }
        }
        break;
      case "waves": {
        const phase = random(0, Math.PI * 2);
        [55, 100, 145].forEach((baseline, row) => {
          const points = Array.from(
            { length: 41 },
            (_, i) =>
              `${i ? "L" : "M"}${20 + i * 4} ${baseline + Math.sin(i * 0.2 + phase) * 18}`,
          );
          add("path", { d: points.join(" "), class: row === 1 ? accent : "" });
        });
        break;
      }
      case "arches": {
        const shift = random(-8, 8);
        [22, 38, 54, 70].forEach((r, i) =>
          add("path", {
            d: `M${100 - r + shift} 165V100a${r} ${r} 0 0 1 ${r * 2} 0v65`,
            class: i % 2 ? accent : "",
          }),
        );
        break;
      }
      case "orbits": {
        const offset = random(0, 60);
        [0, 60, 120].forEach((angle) =>
          add("ellipse", {
            cx: 100,
            cy: 100,
            rx: 75,
            ry: random(20, 30),
            transform: `rotate(${angle + offset} 100 100)`,
          }),
        );
        add("circle", {
          cx: 100,
          cy: 100,
          r: 8,
          fill: "currentColor",
          class: accent,
        });
        break;
      }
    }
  });
}

// 10 — A continuous 3D timeline changes axes and direction, pausing offscreen.
function initCube(environment) {
  const { select, root, gsap, on, reduceMotion } = environment;
  const section = select(".motion-cube-section");
  const cube = select("[data-cube]");
  on(select("[data-cube-refresh]"), "click", () => {
    generateCubeArt(root);
    select("[data-cube-status]").textContent =
      "Six new SVG artworks generated.";
  });
  if (reduceMotion) {
    return;
  }
  gsap.set(cube, { rotationX: -22, rotationY: 32, rotationZ: 0 });
  const rotation = gsap
    .timeline({
      repeat: -1,
      paused: true,
      defaults: { duration: 5, ease: "sine.inOut" },
    })
    .to(cube, { rotationX: 115, rotationY: 195, rotationZ: 15 })
    .to(cube, { rotationX: -70, rotationY: 320, rotationZ: -30 })
    .to(cube, { rotationX: -200, rotationY: 140, rotationZ: 25 })
    .to(cube, { rotationX: -22, rotationY: 32, rotationZ: 0 });
  observeLoop(environment, section, rotation);
}

// 11 — Pinned horizontal travel on wide screens, stacked cards on mobile/reduced motion.
function initFinale(environment) {
  const {
    select,
    selectAll,
    gsap,
    plugins,
    reduceMotion,
    isDesktop,
    hasRoomForPinning,
  } = environment;
  if (reduceMotion) {
    return;
  }
  const section = select(".motion-finale");
  const track = select(".motion-horizontal__track");
  if (isDesktop && hasRoomForPinning) {
    gsap.to(track, {
      x: () =>
        -Math.max(
          0,
          track.scrollWidth - select(".motion-horizontal").clientWidth,
        ),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 90px",
        end: () => `+=${Math.max(600, track.scrollWidth - track.clientWidth)}`,
        scrub: 0.8,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  } else {
    selectAll(".motion-end-card").forEach((card) =>
      gsap.from(card, {
        y: 35,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      }),
    );
  }
  const marquee = gsap.to(select(".motion-marquee > div"), {
    xPercent: -50,
    duration: 22,
    repeat: -1,
    ease: "none",
    paused: true,
  });
  observeLoop(environment, section, marquee);
  const icons = gsap.to(selectAll(".motion-end-card > span"), {
    rotation: 12,
    scale: 1.08,
    duration: 2,
    stagger: 0.2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    paused: true,
  });
  observeLoop(environment, section, icons);
  // Refresh after responsive layout changes is owned by matchMedia, not a global killAll().
  plugins.ScrollTrigger.refresh();
}
