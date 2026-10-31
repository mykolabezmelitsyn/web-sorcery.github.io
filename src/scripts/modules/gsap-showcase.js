const CDN = "https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/";
const PLUGINS = [
  "ScrollTrigger", "ScrollToPlugin", "SplitText", "TextPlugin", "ScrambleTextPlugin",
  "DrawSVGPlugin", "MorphSVGPlugin", "MotionPathPlugin", "Flip", "Draggable",
  "InertiaPlugin", "Physics2DPlugin",
];

function loadScript(root, name) {
  return new Promise((resolve, reject) => {
    if (window[name]) return resolve(window[name]);
    const script = document.createElement("script");
    script.src = `${CDN}${name}.min.js`;
    script.async = true;
    script.onload = () => window[name] ? resolve(window[name]) : reject(new Error(`${name} unavailable`));
    script.onerror = () => reject(new Error(`${name} could not load`));
    root.append(script);
  });
}

// Only this root starts the CDN loader. Home pages do not load animation libraries.
export async function initShowcase(root) {
  if (!root || root.dataset.initialized) return;
  root.dataset.initialized = "true";
  const status = root.querySelector("[data-load-status]");
  let gsap;
  try {
    gsap = await loadScript(root, "gsap");
    const loaded = await Promise.all(PLUGINS.map((name) => loadScript(root, name)));
    gsap.registerPlugin(...loaded);
  } catch (error) {
    status.textContent = "The animation studio is offline. All artwork and chapter links are still here; reload to try again.";
    console.warn("Motion showcase:", error.message);
    return;
  }
  if (!root.isConnected) return;
  await document.fonts.ready;
  status.hidden = true;
  root.querySelectorAll("button[disabled]").forEach((button) => { button.disabled = false; });
  const motionToggle = root.querySelector("[data-motion-toggle]");
  const plugins = Object.fromEntries(PLUGINS.map((name) => [name, window[name]]));
  let paused = false;
  let media;

  const mount = () => {
    media = gsap.matchMedia(root);
    media.add({
      all: "(min-width: 0px)",
      desktop: "(min-width: 48rem)",
      fine: "(hover: hover) and (pointer: fine)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (match) => {
      const controller = new AbortController();
      const disposers = [];
      const context = gsap.context(() => {}, root);
      const reduced = match.conditions.reduced || paused;
      root.dataset.motion = reduced ? "static" : "active";
      motionToggle.disabled = match.conditions.reduced;
      motionToggle.textContent = match.conditions.reduced ? "Reduced motion" : paused ? "Resume motion" : "Pause motion";
      motionToggle.setAttribute("aria-pressed", String(reduced));
      root.querySelectorAll("[data-replay-text], [data-replay-path], [data-image-replay], [data-particle-burst]").forEach((button) => {
        button.disabled = reduced;
        button.title = reduced ? "Animation is paused or reduced motion is enabled." : "";
      });
      const env = {
        root, gsap, plugins, reduced,
        desktop: match.conditions.desktop,
        fine: match.conditions.fine,
        $: (selector) => root.querySelector(selector),
        $$: (selector) => [...root.querySelectorAll(selector)],
        duration: (value) => reduced ? 0 : value,
        cleanup: (fn) => disposers.push(fn),
        on: (target, type, fn, options = {}) => {
          target.addEventListener(type, (event) => {
            context.add(() => { fn(event); });
          }, { ...options, signal: controller.signal });
        },
      };
      context.add(() => {
        initNavigation(env);
        initHero(env);
        initDepth(env);
        initText(env);
        initPaths(env);
        initLayout(env);
        initPhysics(env);
        initInterface(env);
        initImages(env);
        initParticles(env);
        initFinale(env);
      });
      plugins.ScrollTrigger.refresh();
      return () => {
        controller.abort();
        context.revert();
        disposers.forEach((dispose) => dispose());
      };
    });
  };
  const toggleMotion = () => {
    paused = !paused;
    media.revert();
    mount();
  };
  motionToggle.addEventListener("click", toggleMotion);
  mount();

  // Revert only this studio's contexts; never kill another page's ScrollTriggers.
  const teardown = () => {
    media.revert();
    motionToggle.removeEventListener("click", toggleMotion);
    root.dataset.initialized = "";
  };
  window.addEventListener("pagehide", (event) => { if (!event.persisted) teardown(); }, { once: true });
  return teardown;
}

// Observe looping scenes so offscreen work is paused, including background tabs.
function observeLoop(env, element, animation) {
  let visible = false;
  const sync = () => animation.paused(!visible || document.hidden);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }, { threshold: 0.05 });
  observer.observe(element);
  env.on(document, "visibilitychange", sync);
  env.cleanup(() => observer.disconnect());
}

function initNavigation(env) {
  const { root, gsap, on, reduced } = env;
  on(root, "click", (event) => {
    const link = event.target.closest('a[href^="#motion-"]');
    if (!link) return;
    const target = root.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    const focusTarget = () => {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    };
    if (reduced) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
      focusTarget();
    } else {
      gsap.to(window, { scrollTo: { y: target, offsetY: 90, autoKill: true }, duration: 1.1, ease: "power3.inOut", onComplete: focusTarget });
    }
  });
}

// 01 — Typed title, transforms, opacity, stagger, timeline, easing, magnetic hover.
function initHero(env) {
  const { $, $$, gsap, plugins, on, reduced, fine } = env;
  const hero = $(".motion-hero");
  if (reduced) return;
  // Reveal characters without removing them, preserving line breaks and layout.
  const title = plugins.SplitText.create($("#motion-hero-title"), { type: "words,chars", aria: "auto" });
  env.cleanup(() => title.revert());
  gsap.set(title.chars, { opacity: 0 });
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from($(".motion-display"), { y: 24, duration: 0.5 })
    .to(title.chars, { opacity: 1, duration: 0, stagger: 0.065, ease: "none" }, 0.2)
    .from(hero.querySelectorAll(".motion-copy, .motion-button, .motion-footnote"), { y: 20, opacity: 0, stagger: 0.15, duration: 0.65 }, "-=0.25")
    .from($("[data-hero-shape]"), { scale: 0.35, rotation: -100, skewX: 14, opacity: 0, duration: 1.1 }, 0.15);
  const orbit = gsap.to($(".motion-orbit--one"), { rotation: "+=360", duration: 36, repeat: -1, ease: "none", paused: true });
  observeLoop(env, hero, orbit);
  const float = gsap.to($(".motion-orbit-dot"), { y: 28, x: 16, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut", paused: true });
  observeLoop(env, hero, float);
  if (fine) {
    const sun = $("[data-hero-shape]");
    const moveSunX = gsap.quickTo(sun, "x", { duration: 0.65, ease: "power3.out" });
    const moveSunY = gsap.quickTo(sun, "y", { duration: 0.65, ease: "power3.out" });
    on(hero, "pointermove", (event) => {
      if (event.pointerType === "touch") return;
      const bounds = hero.getBoundingClientRect();
      moveSunX((event.clientX - bounds.left - bounds.width / 2) / bounds.width * 28);
      moveSunY((event.clientY - bounds.top - bounds.height / 2) / bounds.height * 20);
    });
    const centerSun = () => {
      moveSunX(0);
      moveSunY(0);
    };
    on(hero, "pointerleave", centerSun);
    on(hero, "pointercancel", centerSun);

    $$("[data-magnetic]").forEach((button) => {
      on(button, "pointermove", (event) => {
        const bounds = button.getBoundingClientRect();
        gsap.to(button, { x: (event.clientX - bounds.left - bounds.width / 2) * 0.16, y: (event.clientY - bounds.top - bounds.height / 2) * 0.25, duration: 0.35, overwrite: "auto" });
      });
      on(button, "pointerleave", () => gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" }));
    });
  }
}

// 02 — Scrubbed parallax and 3D perspective; desktop pins, mobile flows naturally.
function initDepth(env) {
  const { $, gsap, reduced, desktop } = env;
  if (reduced) return;
  const section = $(".motion-depth");
  gsap.timeline({ scrollTrigger: {
    trigger: section, start: "top 90px", end: desktop ? "+=100%" : "bottom 20%",
    pin: desktop, scrub: 0.8, invalidateOnRefresh: true,
  } })
    .fromTo($(".motion-depth__layer--back"), { y: 60, rotationY: -20 }, { y: -70, rotationY: 12, ease: "none" }, 0)
    .fromTo($(".motion-depth__layer--middle"), { y: 90, rotationX: 18 }, { y: -35, rotationX: -8, rotation: 5, ease: "none" }, 0)
    .fromTo($(".motion-depth__layer--front"), { y: 100, rotationY: 35 }, { y: -120, rotationY: -25, rotation: -12, ease: "none" }, 0)
    .to($(".motion-progress span"), { scaleX: 1, ease: "none" }, 0);
}

// 03 — Accessible SplitText plus two independent text treatments.
function initText(env) {
  const { $, gsap, plugins, on, reduced } = env;
  if (reduced) return;
  const split = plugins.SplitText.create($("[data-split]"), { type: "words,chars", aria: "auto" });
  env.cleanup(() => split.revert());
  const timeline = gsap.timeline({ paused: true })
    .from(split.chars, { yPercent: 100, rotationX: -70, opacity: 0, stagger: 0.018, duration: 0.7, ease: "back.out(1.3)" })
    .fromTo($("[data-typing]"), { text: "" }, { text: "Make room for possibility.", duration: 1.6, ease: "none" }, "-=0.2")
    .to($("[data-scramble]"), { scrambleText: { text: "ORDER FROM CURIOSITY", chars: "upperCase", revealDelay: 0.2, speed: 0.5 }, duration: 1.8 }, "-=1.4");
  plugins.ScrollTrigger.create({ trigger: $(".motion-type"), start: "top 65%", once: true, onEnter: () => timeline.play() });
  on($("[data-replay-text]"), "click", () => timeline.restart());
}

// 04 — Path drawing and morphing are real SVG plugins, not CSS substitutes.
function initPaths(env) {
  const { $, gsap, plugins, on, reduced } = env;
  const route = $("[data-route]");
  const traveler = $("[data-traveler]");
  if (reduced) {
    gsap.set(traveler, { x: 455, y: 235 });
    return;
  }
  const timeline = gsap.timeline({ paused: true })
    .fromTo(route, { drawSVG: "0%" }, { drawSVG: "100%", duration: 3, ease: "none" }, 0)
    .to(traveler, { motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5] }, duration: 3, ease: "none" }, 0)
    .to($("[data-morph]"), { morphSVG: $("[data-morph-end]"), duration: 1.3, ease: "elastic.out(1, 0.6)" }, 1.4);
  plugins.ScrollTrigger.create({ trigger: $(".motion-paths"), start: "top 60%", once: true, onEnter: () => timeline.play() });
  on($("[data-replay-path]"), "click", () => timeline.restart());
}

// 05 — Capture the previous layout, change CSS, then FLIP between the two states.
function initLayout(env) {
  const { $, $$, plugins, on, duration } = env;
  const grid = $("[data-flip-grid]");
  const button = $("[data-flip-toggle]");
  const label = button.querySelector("[data-flip-label]");
  const tiles = $$(".motion-tile");
  const originalStyles = tiles.map((tile) => tile.getAttribute("style"));
  let tween;
  on(button, "click", () => {
    if (tween?.isActive()) return;
    const state = plugins.Flip.getState(tiles);
    const list = grid.classList.toggle("motion-tiles--list");
    button.setAttribute("aria-pressed", String(list));
    label.textContent = list ? "Switch to grid" : "Switch to list";
    tween = plugins.Flip.from(state, { duration: duration(0.8), ease: "power3.inOut", stagger: duration(0.05), onComplete: () => plugins.ScrollTrigger.refresh() });
  });
  env.cleanup(() => {
    tween?.kill();
    // Flip temporarily writes sizes/transforms outside regular CSS tweens.
    // Restore those after context.revert(), before the new breakpoint initializes.
    tiles.forEach((tile, index) => {
      if (originalStyles[index] === null) tile.removeAttribute("style");
      else tile.setAttribute("style", originalStyles[index]);
    });
    grid.classList.remove("motion-tiles--list");
    label.textContent = "Switch to list";
    button.setAttribute("aria-pressed", "false");
  });
}

// 06 — Throw and grid-snap use InertiaPlugin; the star uses gravity and velocity.
function initPhysics(env) {
  const { $, gsap, plugins, on, reduced, duration } = env;
  const field = $("[data-playground]");
  const disc = $("[data-disc]");
  const clampX = (x) => gsap.utils.clamp(0, field.clientWidth - disc.offsetWidth, Math.round(x / 24) * 24);
  const clampY = (y) => gsap.utils.clamp(0, field.clientHeight - disc.offsetHeight, Math.round(y / 24) * 24);
  const [draggable] = plugins.Draggable.create(disc, {
    type: "x,y", bounds: field, inertia: !reduced, edgeResistance: 0.8,
    allowNativeTouchScrolling: true, minimumMovement: 6,
    snap: { x: clampX, y: clampY },
    onDragEnd() { if (reduced) gsap.set(disc, { x: clampX(this.x), y: clampY(this.y) }); },
  });
  env.cleanup(() => draggable.kill());
  const resize = new ResizeObserver(() => { draggable.applyBounds(field); });
  resize.observe(field);
  env.cleanup(() => resize.disconnect());
  on(disc, "keydown", (event) => {
    const steps = { ArrowLeft: [-24, 0], ArrowRight: [24, 0], ArrowUp: [0, -24], ArrowDown: [0, 24], Enter: [0, 0] };
    if (!steps[event.key]) return;
    event.preventDefault();
    draggable.tween?.kill();
    const [dx, dy] = steps[event.key];
    const x = event.key === "Enter" ? 0 : clampX(Number(gsap.getProperty(disc, "x")) + dx);
    const y = event.key === "Enter" ? 0 : clampY(Number(gsap.getProperty(disc, "y")) + dy);
    gsap.to(disc, { x, y, duration: duration(0.25), overwrite: true, onUpdate: () => draggable.update() });
    $("[data-drag-status]").textContent = `Disc position: ${x}, ${y}.`;
  });
  on($("[data-launch]"), "click", () => {
    const star = $(".motion-projectile");
    gsap.killTweensOf(star);
    if (reduced) {
      gsap.set(star, { x: field.clientWidth * 0.65, y: -50 });
      return;
    }
    // A one-second flight returns to its launch height under constant gravity.
    const velocityX = Math.min(field.clientWidth * 0.65, 450);
    const velocityY = -Math.min(field.clientHeight, 260);
    gsap.fromTo(star, { x: 0, y: 0, rotation: 0 }, {
      physics2D: { velocity: Math.hypot(velocityX, velocityY), angle: Math.atan2(velocityY, velocityX) * 180 / Math.PI, gravity: -velocityY * 2 },
      rotation: 300, duration: 1, ease: "none",
    });
  });
}

// 07 — A local page router with crossfades, touch swipes, a menu, accordion, and native modal.
function initInterface(env) {
  const { $, $$, gsap, on, duration, reduced, plugins } = env;
  const slides = $$(".motion-slide");
  const menu = $(".motion-mini-menu");
  const menuButton = $("[data-menu-toggle]");
  const dialog = $(".motion-dialog");
  const accordion = $("[data-accordion]");
  const panel = $("#motion-accordion-panel");
  let index = 0;
  let busy = false;
  slides.forEach((slide, i) => { slide.hidden = i !== 0; });
  $("[data-slide-current]").textContent = "1";
  menu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  accordion.setAttribute("aria-expanded", "false");
  panel.hidden = true;
  const closeMenu = () => {
    menu.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    plugins.ScrollTrigger.refresh();
  };
  const changePage = (next) => {
    if (busy) return;
    next = gsap.utils.wrap(0, slides.length, next);
    if (next === index) return;
    busy = true;
    const old = slides[index];
    const incoming = slides[next];
    incoming.hidden = false;
    incoming.inert = false;
    old.inert = true;
    gsap.timeline({ onComplete: () => {
      old.hidden = true;
      index = next;
      busy = false;
      $("[data-slide-current]").textContent = String(index + 1);
      plugins.ScrollTrigger.refresh();
    } })
      .to(old, { xPercent: -8, opacity: 0, duration: duration(0.4) }, 0)
      .fromTo(incoming, { xPercent: 8, opacity: 0 }, { xPercent: 0, opacity: 1, duration: duration(0.5) }, 0.05 * !reduced);
  };
  on($("[data-slide-next]"), "click", () => changePage(index + 1));
  on($("[data-slide-prev]"), "click", () => changePage(index - 1));
  const viewport = $(".motion-slides");
  on(viewport, "keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    changePage(index + (event.key === "ArrowRight" ? 1 : -1));
  });
  let origin;
  on(viewport, "pointerdown", (event) => { if (event.isPrimary) origin = { x: event.clientX, y: event.clientY }; });
  on(viewport, "pointerup", (event) => {
    if (!origin) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    origin = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) changePage(index + (dx < 0 ? 1 : -1));
  });
  on(viewport, "pointercancel", () => { origin = null; });
  on(menuButton, "click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    if (open) gsap.fromTo(menu, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: duration(0.25), onComplete: () => plugins.ScrollTrigger.refresh() });
    else plugins.ScrollTrigger.refresh();
  });
  $$("[data-scene]").forEach((button) => on(button, "click", () => {
    changePage(Number(button.dataset.scene));
    closeMenu();
    menuButton.focus();
  }));
  on(menu, "keydown", (event) => {
    if (event.key === "Escape") { closeMenu(); menuButton.focus(); }
  });
  on(accordion, "click", () => {
    const open = accordion.getAttribute("aria-expanded") !== "true";
    accordion.setAttribute("aria-expanded", String(open));
    gsap.killTweensOf(panel);
    if (open) {
      panel.hidden = false;
      gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: duration(0.35), onComplete: () => plugins.ScrollTrigger.refresh() });
    } else gsap.to(panel, { height: 0, opacity: 0, duration: duration(0.25), onComplete: () => { panel.hidden = true; plugins.ScrollTrigger.refresh(); } });
  });
  const openButton = $("[data-open-modal]");
  on(openButton, "click", () => {
    dialog.showModal();
    gsap.fromTo(dialog, { y: 24, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: duration(0.35), ease: "power3.out" });
  });
  const closeDialog = () => gsap.to(dialog, { y: 16, opacity: 0, duration: duration(0.2), onComplete: () => { dialog.close(); openButton.focus(); } });
  on($("[data-close-modal]"), "click", closeDialog);
  on(dialog, "cancel", (event) => { event.preventDefault(); closeDialog(); });
  env.cleanup(() => { if (dialog.open) dialog.close(); slides.forEach((slide) => { slide.inert = false; }); });
}

// 08 — Pin the section when the small image reaches center, then scrub it to full size.
function initImages(env) {
  const { $, gsap, on, reduced, fine } = env;
  const section = $(".motion-images");
  const frame = $(".motion-image-frame");
  const artwork = $(".motion-landscape");
  if (reduced) return;
  const originalStyles = [frame, artwork].map((element) => element.getAttribute("style"));
  env.cleanup(() => {
    [frame, artwork].forEach((element, index) => {
      if (originalStyles[index] === null) element.removeAttribute("style");
      else element.setAttribute("style", originalStyles[index]);
    });
  });
  const timeline = gsap.timeline({ scrollTrigger: {
    trigger: frame,
    start: "center center",
    end: () => `+=${Math.max(window.innerHeight * 0.9, 600)}`,
    pin: section,
    pinSpacing: true,
    anticipatePin: 1,
    scrub: true,
    invalidateOnRefresh: true,
  } })
    .fromTo(frame, { scale: 0.35, clipPath: "inset(0% round 1.5rem)" }, { scale: 1, clipPath: "inset(0% round 0.5rem)", duration: 1, ease: "none" }, 0)
    .fromTo(artwork, { scale: 1.25 }, { scale: 1, duration: 1, ease: "none" }, 0);
  on($("[data-image-replay]"), "click", () => {
    gsap.to(window, { scrollTo: { y: Math.max(0, timeline.scrollTrigger.start), autoKill: true }, duration: 0.7, ease: "power2.inOut" });
  });
  if (!fine) return;
  const cursor = $(".motion-image-cursor");
  on(frame, "pointermove", (event) => {
    const bounds = frame.getBoundingClientRect();
    // Convert pointer coordinates into the frame's unscaled coordinate space.
    const x = (event.clientX - bounds.left) * frame.clientWidth / bounds.width;
    const y = (event.clientY - bounds.top) * frame.clientHeight / bounds.height;
    gsap.to(cursor, { x: x - 40, y: y - 40, opacity: 1, duration: 0.2, overwrite: "auto" });
    gsap.to(artwork, { x: (x / frame.clientWidth - 0.5) * 14, y: (y / frame.clientHeight - 0.5) * 10, duration: 0.5, overwrite: "auto" });
  });
  on(frame, "pointerleave", () => {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
    gsap.to(artwork, { x: 0, y: 0, duration: 0.5 });
  });
}

// 09 — GSAP tweens plain objects; a single ticker paints their properties to Canvas.
function initParticles(env) {
  const { $, gsap, on, reduced } = env;
  const canvas = $("[data-particles]");
  const context = canvas.getContext("2d");
  if (!context) return;
  let width = 1;
  let height = 1;
  let visible = false;
  let color;
  const pointer = { x: -1000, y: -1000 };
  const particles = Array.from({ length: env.desktop ? 60 : 34 }, (_, i) => ({
    u: ((i * 0.618033) % 1), v: ((i * 0.414214 + 0.17) % 1),
    phase: i * 0.4, radius: 1.5 + (i % 3) * 0.7, spread: 1,
  }));
  const paint = () => {
    if (!visible && !reduced) return;
    context.clearRect(0, 0, width, height);
    context.fillStyle = color;
    context.strokeStyle = color;
    const points = particles.map((p) => {
      let x = width / 2 + ((p.u - 0.5) * width * 0.9 + Math.sin(p.phase) * 12) * p.spread;
      let y = height / 2 + ((p.v - 0.5) * height * 0.8 + Math.cos(p.phase) * 12) * p.spread;
      const distance = Math.hypot(x - pointer.x, y - pointer.y);
      if (!reduced && distance < 160) {
        x += (pointer.x - x) * (1 - distance / 160) * 0.25;
        y += (pointer.y - y) * (1 - distance / 160) * 0.25;
      }
      context.beginPath();
      context.arc(x, y, p.radius, 0, Math.PI * 2);
      context.fill();
      return { x, y };
    });
    context.globalAlpha = 0.18;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y) > 85) continue;
        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        context.lineTo(points[j].x, points[j].y);
        context.stroke();
      }
    }
    context.globalAlpha = 1;
  };
  const resize = new ResizeObserver(() => {
    const bounds = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = bounds.width;
    height = bounds.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    color = getComputedStyle(env.root).getPropertyValue("--color-accent").trim();
    paint();
  });
  resize.observe(canvas);
  const theme = new MutationObserver(() => {
    color = getComputedStyle(env.root).getPropertyValue("--color-accent").trim();
    paint();
  });
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const drift = reduced ? null : gsap.to(particles, { phase: "+=6.283185", duration: 12, repeat: -1, ease: "none", paused: true });
  const sync = () => {
    const active = visible && !document.hidden && !reduced;
    drift?.paused(!active);
    gsap.ticker.remove(paint);
    if (active) gsap.ticker.add(paint);
    else if (visible) paint();
  };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.05 });
  observer.observe(canvas);
  on(document, "visibilitychange", sync);
  on(canvas, "pointermove", (event) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
  }, { passive: true });
  const clearPointer = () => { pointer.x = -1000; pointer.y = -1000; };
  on(canvas, "pointerleave", clearPointer);
  on(canvas, "pointerup", clearPointer);
  on(canvas, "pointercancel", clearPointer);
  on($("[data-particle-burst]"), "click", () => {
    if (reduced) return;
    gsap.fromTo(particles, { spread: 0.1 }, { spread: 1, duration: 1.8, stagger: 0.008, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
  });
  env.cleanup(() => { resize.disconnect(); observer.disconnect(); theme.disconnect(); gsap.ticker.remove(paint); });
}

// 10 — Pinned horizontal travel on wide screens, stacked cards on mobile/reduced motion.
function initFinale(env) {
  const { $, $$, gsap, plugins, reduced, desktop } = env;
  if (reduced) return;
  const section = $(".motion-finale");
  const track = $(".motion-horizontal__track");
  if (desktop) gsap.to(track, {
    x: () => -Math.max(0, track.scrollWidth - $(".motion-horizontal").clientWidth),
    ease: "none", scrollTrigger: { trigger: section, start: "top 90px", end: () => `+=${Math.max(600, track.scrollWidth - track.clientWidth)}`, scrub: 0.8, pin: true, invalidateOnRefresh: true },
  });
  else $$(".motion-end-card").forEach((card) => gsap.from(card, { y: 35, opacity: 0, duration: 0.7, scrollTrigger: { trigger: card, start: "top 90%", once: true } }));
  const marquee = gsap.to($(".motion-marquee > div"), { xPercent: -50, duration: 22, repeat: -1, ease: "none", paused: true });
  observeLoop(env, section, marquee);
  const icons = gsap.to($$(".motion-end-card > span"), { rotation: 12, scale: 1.08, duration: 2, stagger: 0.2, yoyo: true, repeat: -1, ease: "sine.inOut", paused: true });
  observeLoop(env, section, icons);
  // Refresh after responsive layout changes is owned by matchMedia, not a global killAll().
  plugins.ScrollTrigger.refresh();
}
