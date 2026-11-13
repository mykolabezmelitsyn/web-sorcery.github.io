const CONFIG = {
  version: "3.15.1", // Identical pinned CDN version for core and all plugins.
  desktop: "(min-width: 768px)", // Desktop composition breakpoint.
  mobile: "(max-width: 767px)", // Touch-first composition breakpoint.
  pinHeight: "(min-height: 800px)", // Pin only when the viewport has enough room.
  reduced: "(prefers-reduced-motion: reduce)", // Calm accessible composition.
  ease: "power2.out", // Default response curve.
  duration: 0.7, // Default sequence duration in seconds.
  stagger: 0.06, // Element reveal interval in seconds.
  pinOffset: 80, // Reserve the existing site's sticky header.
  routeStart: "center center", // Begin when the parent section is centered in the viewport.
  routeEnd: "bottom center", // Complete when the section's bottom reaches viewport center.
  imageScrollFactor: 1.2, // Scroll distance relative to frame height for its centered zoom.
  imageScrollMinimum: 320, // Minimum centered image scroll interval in CSS pixels.
  loopDuration: 28, // Orbit and marquee loop duration in seconds.
  cubePitch: -22, // Initial vertical cube angle.
  cubeYaw: 32, // Initial horizontal cube angle.
  cubeRange: 160, // Mouse rotation range from center, in degrees.
  cubeDragSensitivity: 0.6, // Touch rotation per CSS pixel.
  cubeKeyboardStep: 15, // Degrees per arrow-key press.
  cubeResponse: 0.35, // Pointer-follow smoothing duration.
  dragGrid: 24, // Playground snapping grid in CSS pixels.
  particlesDesktop: 48, // Desktop canvas particle count.
  particlesMobile: 24, // Mobile canvas particle count.
  particleDistance: 100, // Maximum canvas connection distance.
  pixelRatio: 2, // Maximum canvas drawing-buffer pixel ratio.
  colors: { light: "#285bd4", dark: "#91b4ff" }, // Canvas fallback theme colors.
};
const PLUGINS = [
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
const scripts = new Map();
const instances = new WeakMap();
let libraries;
let loading;

function loadScript(name) {
  if (window[name]) return Promise.resolve(window[name]);
  if (scripts.has(name)) return scripts.get(name);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://cdn.jsdelivr.net/npm/gsap@${CONFIG.version}/dist/${name}.min.js`;
    script.async = true;
    script.onload = () => {
      script.onload = script.onerror = null;
      window[name]
        ? resolve(window[name])
        : reject(new Error(`${name} unavailable`));
    };
    script.onerror = () => {
      script.remove();
      reject(new Error(`${name} could not load`));
    };
    document.head.append(script);
  });
  scripts.set(name, promise);
  promise.catch(() => scripts.delete(name));
  return promise;
}

export function loadLibraries() {
  if (!loading) {
    loading = (async () => {
      const gsap = await loadScript("gsap");
      const plugins = await Promise.all(PLUGINS.map(loadScript));
      gsap.registerPlugin(...plugins);
      libraries = {
        gsap,
        ...Object.fromEntries(PLUGINS.map((name, i) => [name, plugins[i]])),
      };
      return libraries;
    })().catch((error) => {
      loading = null;
      throw error;
    });
  }
  return loading;
}

export function getAnimation(container) {
  return instances.get(container);
}

// Every scene belongs to this root. destroy() restores its initial markup and attributes.
export function mountAnimation(container, options = {}) {
  if (instances.has(container)) return instances.get(container);
  if (!libraries)
    throw new Error("Call await loadLibraries() before mountAnimation().");
  const config = { ...CONFIG, ...options };
  const { gsap, ScrollTrigger } = libraries;
  const originalMarkup = container.innerHTML;
  const originalAttributes = [...container.attributes].map(
    ({ name, value }) => [name, value],
  );
  let userPaused = false;
  let destroyed = false;
  let media;
  let resizeFrame = 0;
  let previousWidth = 0;
  const lifecycle = new AbortController();
  const pauseButton = container.querySelector("[data-pause]");
  const status = container.querySelector("[data-status]");

  const build = () => {
    media = gsap.matchMedia(container);
    media.add(
      {
        desktop: config.desktop,
        mobile: config.mobile,
        reduce: config.reduced,
        room: config.pinHeight,
      },
      (match) => {
        const events = new AbortController();
        const disposers = [];
        const ctx = gsap.context(() => {}, container);
        const calm = match.conditions.reduce || userPaused;
        const env = {
          ...libraries,
          config,
          root: container,
          ctx,
          calm,
          desktop: match.conditions.desktop,
          pin: match.conditions.desktop && match.conditions.room,
          q: (selector) => container.querySelector(selector),
          qa: (selector) => [...container.querySelectorAll(selector)],
          clean: (fn) => disposers.push(fn),
          on: (target, type, handler, settings = {}) => {
            target.addEventListener(type, handler, {
              ...settings,
              signal: events.signal,
            });
          },
          duration: (seconds) => (calm ? 0 : seconds),
        };
        pauseButton.disabled = match.conditions.reduce;
        pauseButton.textContent = userPaused
          ? "Play animation"
          : "Pause animation";
        pauseButton.setAttribute("aria-pressed", String(userPaused));
        container.dataset.motion = calm ? "static" : "active";
        container
          .querySelectorAll(
            "[data-type-replay], [data-path-replay], [data-launch], [data-burst]",
          )
          .forEach((button) => {
            button.disabled = calm;
          });
        container.dataset.horizontal = String(env.pin && !calm);
        let disposed = false;
        const dispose = () => {
          if (disposed) return;
          disposed = true;
          events.abort();
          // Stop custom observers/tickers before restoring animated properties.
          disposers
            .slice()
            .reverse()
            .forEach((fn) => fn());
          ctx.revert();
        };
        try {
          ctx.add(() => {
            initNavigation(env);
            initArrival(env);
            initDepth(env);
            initCube(env);
            initTypography(env);
            initRoutes(env);
            initLayout(env);
            initPlayground(env);
            initInterface(env);
            initImagery(env);
            initConstellation(env);
            initHorizons(env);
          });
        } catch (error) {
          dispose();
          throw error;
        }
        return dispose;
      },
    );
    ScrollTrigger.refresh();
  };
  const setPaused = (paused) => {
    if (destroyed || paused === userPaused) return;
    userPaused = paused;
    media.revert();
    build();
  };
  pauseButton.addEventListener("click", () => setPaused(!userPaused), {
    signal: lifecycle.signal,
  });
  const resize = new ResizeObserver(([entry]) => {
    if (Math.abs(entry.contentRect.width - previousWidth) < 1) return;
    previousWidth = entry.contentRect.width;
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      if (!destroyed) ScrollTrigger.refresh();
    });
  });
  const api = {
    play: () => setPaused(false),
    pause: () => setPaused(true),
    destroy() {
      if (destroyed) return;
      destroyed = true;
      lifecycle.abort();
      resize.disconnect();
      cancelAnimationFrame(resizeFrame);
      media?.revert();
      container.innerHTML = originalMarkup;
      [...container.attributes].forEach(({ name }) =>
        container.removeAttribute(name),
      );
      originalAttributes.forEach(([name, value]) =>
        container.setAttribute(name, value),
      );
      instances.delete(container);
    },
  };
  try {
    container.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
    });
    build();
    resize.observe(container);
    status.hidden = true;
    container.dataset.ready = "true";
    instances.set(container, api);
  } catch (error) {
    api.destroy();
    throw error;
  }
  window.addEventListener(
    "pagehide",
    (event) => {
      if (!event.persisted) api.destroy();
    },
    { signal: lifecycle.signal },
  );
  return api;
}

// A single visibility gate owns every ambient loop and preserves user pause.
function observeLoop(env, section, animation, render) {
  let visible = false;
  const sync = () => {
    const active = visible && !document.hidden && !env.calm;
    animation?.paused(!active);
    if (render) {
      env.gsap.ticker.remove(render);
      if (active) env.gsap.ticker.add(render);
      else if (visible) render();
    }
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      sync();
    },
    { threshold: 0.05 },
  );
  observer.observe(section);
  env.on(document, "visibilitychange", sync);
  env.clean(() => {
    observer.disconnect();
    if (render) env.gsap.ticker.remove(render);
  });
}

function initNavigation(env) {
  let scroll;
  env.on(env.root, "click", (event) => {
    const anchor = event.target.closest('a[href^="#atlas-"]');
    if (!anchor || !env.root.contains(anchor)) return;
    const destination = env.q(anchor.getAttribute("href"));
    if (!destination) return;
    event.preventDefault();
    scroll?.kill();
    const focus = () => {
      const old = destination.getAttribute("tabindex");
      destination.setAttribute("tabindex", "-1");
      destination.focus({ preventScroll: true });
      destination.addEventListener(
        "blur",
        () => {
          old === null
            ? destination.removeAttribute("tabindex")
            : destination.setAttribute("tabindex", old);
        },
        { once: true },
      );
    };
    if (env.calm) {
      destination.scrollIntoView({ behavior: "instant", block: "start" });
      focus();
    } else {
      env.ctx.add(() => {
        scroll = env.gsap.to(window, {
          scrollTo: {
            y: destination,
            offsetY: env.config.pinOffset,
            autoKill: true,
          },
          duration: 1,
          ease: "power3.inOut",
          onComplete: focus,
        });
      });
    }
  });
}

// 01 — Move, rotate, scale and skew in one labeled entrance; reusable pointer tweens.
function initArrival(env) {
  if (env.calm) return;
  const { gsap, q, qa } = env;
  const hero = q(".atlas-hero");
  gsap
    .timeline({
      defaults: { ease: env.config.ease, duration: env.config.duration },
    })
    .addLabel("hello")
    .from(q("h1"), { y: 28, opacity: 0 }, "hello")
    .from(
      hero.querySelectorAll(".atlas-copy, .atlas-primary, .atlas-eyebrow"),
      { y: 18, opacity: 0, stagger: env.config.stagger },
      "hello+=0.15",
    )
    .from(
      q(".atlas-core"),
      { scale: 0.3, rotation: -80, skewX: 12, opacity: 0, duration: 1.3 },
      "hello",
    );
  const orbit = gsap.to(q(".atlas-orbit-a"), {
    rotation: 360,
    duration: env.config.loopDuration,
    repeat: -1,
    ease: "none",
    paused: true,
  });
  const float = gsap.to(q(".atlas-orbit-dot"), {
    x: 12,
    y: -24,
    duration: 2.5,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    paused: true,
  });
  observeLoop(env, hero, orbit);
  observeLoop(env, hero, float);
  qa("[data-magnetic]").forEach((button) => {
    const x = gsap.quickTo(button, "x", { duration: 0.4, ease: "power3.out" });
    const y = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3.out" });
    env.on(button, "pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = button.getBoundingClientRect();
      x((event.clientX - rect.left - rect.width / 2) * 0.16);
      y((event.clientY - rect.top - rect.height / 2) * 0.2);
    });
    const reset = () => {
      x(0);
      y(0);
    };
    env.on(button, "pointerleave", reset);
    const focus = gsap
      .timeline({ paused: true })
      .to(button, { scale: 1.03, duration: 0.2 });
    env.on(button, "focus", () => focus.play());
    env.on(button, "blur", () => {
      reset();
      focus.reverse();
    });
  });
}

// 02 — Scroll drives parallel depth planes; pin only when there is vertical room.
function initDepth(env) {
  if (env.calm) return;
  const { gsap, q } = env;
  const section = q(".atlas-depth");
  const distance = env.desktop ? 110 : 40;
  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: `top ${env.config.pinOffset}px`,
        end: () => `+=${Math.max(section.clientHeight * 0.8, 400)}`,
        scrub: true,
        pin: env.pin,
        invalidateOnRefresh: true,
      },
    })
    .addLabel("perspective")
    .fromTo(
      q(".atlas-plane-back"),
      { y: 40, rotationY: -12 },
      { y: -distance * 0.3, rotationY: 6, ease: "none" },
      "perspective",
    )
    .fromTo(
      q(".atlas-plane-mid"),
      { y: 70, rotationY: 10 },
      { y: -distance * 0.65, rotationY: -8, ease: "none" },
      "perspective",
    )
    .fromTo(
      q(".atlas-plane-front"),
      { y: 100, rotationX: 12 },
      { y: -distance, rotationX: -10, rotation: -5, ease: "none" },
      "perspective",
    );
}

// 02b — CSS perspective keeps six faces in 3D; reusable tweens follow the pointer.
function initCube(env) {
  const { gsap, q, config } = env;
  const stage = q(".atlas-cube-stage");
  const cube = q(".atlas-cube");
  gsap.set(cube, { rotationX: config.cubePitch, rotationY: config.cubeYaw });
  if (env.calm) return;
  const rotateX = gsap.quickTo(cube, "rotationX", {
    duration: config.cubeResponse,
    ease: "power3.out",
  });
  const rotateY = gsap.quickTo(cube, "rotationY", {
    duration: config.cubeResponse,
    ease: "power3.out",
  });
  let drag;
  env.on(stage, "pointermove", (event) => {
    if (event.pointerType === "mouse") {
      const rect = stage.getBoundingClientRect();
      rotateX(
        config.cubePitch -
          ((event.clientY - rect.top) / rect.height - 0.5) * config.cubeRange,
      );
      rotateY(
        config.cubeYaw +
          ((event.clientX - rect.left) / rect.width - 0.5) *
            config.cubeRange *
            2,
      );
    } else if (drag?.id === event.pointerId) {
      rotateX(
        drag.pitch - (event.clientY - drag.y) * config.cubeDragSensitivity,
      );
      rotateY(drag.yaw + (event.clientX - drag.x) * config.cubeDragSensitivity);
    }
  });
  env.on(stage, "pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    stage.focus({ preventScroll: true });
    if (event.pointerType === "mouse") return;
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      pitch: Number(gsap.getProperty(cube, "rotationX")),
      yaw: Number(gsap.getProperty(cube, "rotationY")),
    };
    stage.setPointerCapture(event.pointerId);
  });
  const release = (event) => {
    if (drag?.id !== event.pointerId) return;
    drag = null;
    if (stage.hasPointerCapture(event.pointerId))
      stage.releasePointerCapture(event.pointerId);
  };
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((type) =>
    env.on(stage, type, release),
  );
  env.on(stage, "keydown", (event) => {
    const directions = {
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
    };
    if (!directions[event.key]) return;
    event.preventDefault();
    const [pitch, yaw] = directions[event.key];
    rotateX(
      Number(gsap.getProperty(cube, "rotationX")) +
        pitch * config.cubeKeyboardStep,
    );
    rotateY(
      Number(gsap.getProperty(cube, "rotationY")) +
        yaw * config.cubeKeyboardStep,
    );
  });
  env.clean(() => {
    if (drag && stage.hasPointerCapture(drag.id))
      stage.releasePointerCapture(drag.id);
    drag = null;
  });
}

// 03 — Readable source text, accessible SplitText, typing and scramble in one sequence.
function initTypography(env) {
  if (env.calm) return;
  const { gsap, q } = env;
  const split = env.SplitText.create(q("[data-split]"), {
    type: "words,chars",
    aria: "auto",
  });
  env.clean(() => split.revert());
  const timeline = gsap
    .timeline({ paused: true })
    .addLabel("reveal")
    .from(
      split.chars,
      {
        opacity: 0,
        yPercent: 50,
        rotationX: -40,
        duration: 0.6,
        stagger: 0.025,
        ease: "back.out(1.2)",
      },
      "reveal",
    )
    .addLabel("find-the-words")
    .fromTo(
      q("[data-typing]"),
      { text: "" },
      { text: "Good things take a little time.", duration: 1.7, ease: "none" },
      "find-the-words",
    )
    .to(
      q("[data-scramble]"),
      {
        scrambleText: {
          text: "ORDER FROM CURIOSITY",
          chars: "upperCase",
          speed: 0.5,
        },
        duration: 1.7,
      },
      "find-the-words",
    );
  env.ScrollTrigger.create({
    trigger: q(".atlas-type"),
    start: "top 75%",
    once: true,
    onEnter: () => timeline.play(),
  });
  env.on(q("[data-type-replay]"), "click", () => timeline.restart());
}

// 04 — Scroll linearly synchronizes route drawing, travel and the shape morph.
function initRoutes(env) {
  const { gsap, q } = env;
  const route = q("[data-route]");
  const traveler = q("[data-traveler]");
  if (env.calm) {
    gsap.set(traveler, { x: 850, y: 90 });
    return;
  }
  // Park the circle at the first path point before the scroll interval starts.
  gsap.set(traveler, {
    motionPath: {
      path: route,
      align: route,
      alignOrigin: [0.5, 0.5],
      start: 0,
      end: 0,
    },
  });
  const timeline = gsap
    .timeline({
      scrollTrigger: {
        trigger: q(".atlas-paths"),
        start: env.config.routeStart,
        end: env.config.routeEnd,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
    .addLabel("depart")
    .fromTo(
      route,
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 3, ease: "none" },
      "depart",
    )
    .to(
      traveler,
      {
        motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5] },
        duration: 3,
        ease: "none",
      },
      "depart",
    )
    .to(
      q("[data-morph]"),
      {
        morphSVG: q("[data-morph-end]"),
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      },
      "depart+=1.5",
    );
  let replay;
  env.on(q("[data-path-replay]"), "click", () => {
    replay?.kill();
    // Replay by returning to the scroll start; the scrollbar remains the only clock.
    env.ctx.add(() => {
      replay = gsap.to(window, {
        scrollTo: { y: timeline.scrollTrigger.start, autoKill: true },
        duration: 0.7,
        ease: "power2.inOut",
      });
    });
  });
}

// 05 — Capture geometry once, change layout once, and animate its transform difference.
function initLayout(env) {
  const { gsap, q, qa } = env;
  const grid = q("[data-tiles]");
  const button = q("[data-layout-toggle]");
  const tiles = qa(".atlas-tile");
  let transition;
  const finish = () => {
    button.disabled = false;
    grid.removeAttribute("aria-busy");
    env.ScrollTrigger.refresh();
  };
  env.on(button, "click", () => {
    if (button.disabled) return;
    const state = env.calm ? null : env.Flip.getState(tiles);
    const list = grid.classList.toggle("is-list");
    button.setAttribute("aria-pressed", String(list));
    button.textContent = list ? "Switch to grid ↗" : "Switch to list ↗";
    if (env.calm) {
      finish();
      return;
    }
    button.disabled = true;
    grid.setAttribute("aria-busy", "true");
    env.ctx.add(() => {
      transition = env.Flip.from(state, {
        scale: true,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.inOut",
        onComplete: finish,
        onInterrupt: finish,
      });
    });
  });
  env.clean(() => {
    transition?.kill();
    grid.classList.remove("is-list");
    grid.removeAttribute("aria-busy");
    button.disabled = false;
    button.textContent = "Switch to list ↗";
    button.setAttribute("aria-pressed", "false");
  });
}

// 06 — Drag/throw/snap with bounded inertia; a separate velocity/gravity launch.
function initPlayground(env) {
  const { gsap, q } = env;
  const field = q("[data-playground]");
  const puck = q("[data-puck]");
  let maxX = 0;
  let maxY = 0;
  const snapX = (x) =>
    gsap.utils.clamp(
      0,
      maxX,
      Math.round(x / env.config.dragGrid) * env.config.dragGrid,
    );
  const snapY = (y) =>
    gsap.utils.clamp(
      0,
      maxY,
      Math.round(y / env.config.dragGrid) * env.config.dragGrid,
    );
  const [drag] = env.Draggable.create(puck, {
    type: "x,y",
    bounds: field,
    inertia: !env.calm,
    edgeResistance: 0.75,
    minimumMovement: 5,
    snap: { x: snapX, y: snapY },
  });
  const resize = new ResizeObserver(() => {
    maxX = Math.max(0, field.clientWidth - puck.offsetWidth);
    maxY = Math.max(0, field.clientHeight - puck.offsetHeight);
    drag.applyBounds(field);
  });
  resize.observe(field);
  env.on(puck, "keydown", (event) => {
    const keys = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      Home: [0, 0],
    };
    if (!keys[event.key]) return;
    event.preventDefault();
    drag.tween?.kill();
    const [dx, dy] = keys[event.key];
    const x =
      event.key === "Home"
        ? 0
        : snapX(Number(gsap.getProperty(puck, "x")) + dx * env.config.dragGrid);
    const y =
      event.key === "Home"
        ? 0
        : snapY(Number(gsap.getProperty(puck, "y")) + dy * env.config.dragGrid);
    env.ctx.add(() =>
      gsap.to(puck, {
        x,
        y,
        duration: env.duration(0.25),
        ease: "bounce.out",
        overwrite: true,
        onUpdate: () => drag.update(),
      }),
    );
    q("[data-play-status]").textContent =
      `Circle position ${Math.round(x)}, ${Math.round(y)}.`;
  });
  const star = q(".atlas-projectile");
  let flight;
  env.on(q("[data-launch]"), "click", () => {
    flight?.kill();
    if (env.calm) return;
    const vx = Math.min(field.clientWidth * 0.7, 600);
    const vy = -Math.min(field.clientHeight * 0.85, 300);
    env.ctx.add(() => {
      flight = gsap.fromTo(
        star,
        { x: 0, y: 0, rotation: 0 },
        {
          physics2D: {
            velocity: Math.hypot(vx, vy),
            angle: (Math.atan2(vy, vx) * 180) / Math.PI,
            gravity: -2 * vy,
          },
          rotation: 270,
          duration: 1,
          ease: "none",
        },
      );
    });
  });
  env.clean(() => {
    resize.disconnect();
    drag.kill();
  });
}

// 07 — A miniature router with keyboard/touch crossfades and reusable UI sequences.
function initInterface(env) {
  const { gsap, q, qa } = env;
  const slides = qa(".atlas-slide");
  const viewport = q("[data-slides]");
  const status = q("[data-slide-status]");
  slides.forEach((slide, i) => {
    slide.hidden = i !== 0;
    slide.inert = false;
  });
  status.textContent = "1 / 3";
  let index = 0;
  let changing = false;
  let start;
  const show = (next) => {
    next = gsap.utils.wrap(0, slides.length, next);
    if (changing || next === index) return;
    const outgoing = slides[index];
    const incoming = slides[next];
    changing = true;
    incoming.hidden = false;
    outgoing.inert = true;
    incoming.inert = false;
    env.ctx.add(() => {
      gsap
        .timeline({
          onComplete: () => {
            outgoing.hidden = true;
            outgoing.inert = false;
            index = next;
            changing = false;
            status.textContent = `${index + 1} / ${slides.length}`;
          },
        })
        .addLabel("crossfade")
        .to(
          outgoing,
          { xPercent: -6, opacity: 0, duration: env.duration(0.4) },
          "crossfade",
        )
        .fromTo(
          incoming,
          { xPercent: 6, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: env.duration(0.5) },
          "crossfade",
        );
    });
  };
  env.on(q("[data-next]"), "click", () => show(index + 1));
  env.on(q("[data-prev]"), "click", () => show(index - 1));
  env.on(viewport, "keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    show(index + (event.key === "ArrowRight" ? 1 : -1));
  });
  env.on(viewport, "pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    start = { id: event.pointerId, x: event.clientX, y: event.clientY };
    viewport.setPointerCapture(event.pointerId);
  });
  env.on(viewport, "pointerup", (event) => {
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy))
      show(index + (dx < 0 ? 1 : -1));
  });
  env.on(viewport, "pointercancel", () => {
    start = null;
  });
  env.on(viewport, "lostpointercapture", () => {
    start = null;
  });
  const menu = q("[data-mini-menu]");
  const toggle = q("[data-menu-toggle]");
  menu.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  const menuReveal = gsap.fromTo(
    menu,
    { y: -10, opacity: 0 },
    { y: 0, opacity: 1, duration: env.duration(0.25), paused: true },
  );
  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };
  env.on(toggle, "click", () => {
    menu.hidden = !menu.hidden;
    toggle.setAttribute("aria-expanded", String(!menu.hidden));
    if (!menu.hidden) menuReveal.restart();
  });
  qa("[data-scene]").forEach((button) =>
    env.on(button, "click", () => {
      show(Number(button.dataset.scene));
      closeMenu();
      toggle.focus();
    }),
  );
  env.on(menu, "keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });
  const details = q(".atlas-accordion");
  const accordion = gsap.fromTo(
    q("[data-accordion-content]"),
    { y: -8, opacity: 0 },
    { y: 0, opacity: 1, duration: env.duration(0.3), paused: true },
  );
  env.on(details, "toggle", () => {
    if (details.open) accordion.restart();
    env.ScrollTrigger.refresh();
  });
  const dialog = q(".atlas-dialog");
  const opener = q("[data-open-dialog]");
  const dialogReveal = gsap.fromTo(
    dialog,
    { y: 20, scale: 0.97, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: env.duration(0.3), paused: true },
  );
  const closeDialog = () => {
    dialog.close();
    opener.focus({ preventScroll: true });
  };
  env.on(opener, "click", () => {
    dialog.showModal();
    dialogReveal.restart();
  });
  env.on(q("[data-close-dialog]"), "click", closeDialog);
  env.on(dialog, "cancel", (event) => {
    event.preventDefault();
    closeDialog();
  });
  env.clean(() => {
    if (dialog.open) dialog.close();
    details.open = false;
    closeMenu();
    slides.forEach((slide, i) => {
      slide.hidden = i !== 0;
      slide.inert = false;
    });
  });
}

// 08 — Pin the frame at viewport center while its artwork scales and reveals.
function initImagery(env) {
  const { gsap, q } = env;
  const frame = q(".atlas-image-frame");
  const shutter = q(".atlas-image-shutter");
  if (env.calm) {
    gsap.set(shutter, { scaleX: 0 });
    return;
  }
  gsap
    .timeline({
      scrollTrigger: {
        trigger: frame,
        start: "center center",
        end: () =>
          `+=${Math.max(env.config.imageScrollMinimum, frame.clientHeight * env.config.imageScrollFactor)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
    .addLabel("look-closer")
    .fromTo(shutter, { scaleX: 1 }, { scaleX: 0, ease: "none" }, "look-closer")
    .fromTo(
      q(".atlas-image-art"),
      { scale: 1.2 },
      { scale: 1, ease: "none" },
      "look-closer",
    )
    .fromTo(
      frame,
      { clipPath: "inset(8% round 2rem)" },
      { clipPath: "inset(0% round 1rem)", ease: "none" },
      "look-closer",
    );
  const cursor = q(".atlas-image-cursor");
  const x = gsap.quickTo(cursor, "x", { duration: 0.2 });
  const y = gsap.quickTo(cursor, "y", { duration: 0.2 });
  const opacity = gsap.quickTo(cursor, "opacity", { duration: 0.2 });
  env.on(frame, "pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = frame.getBoundingClientRect();
    x(event.clientX - rect.left - 40);
    y(event.clientY - rect.top - 40);
    opacity(1);
  });
  env.on(frame, "pointerleave", () => opacity(0));
  env.on(frame, "focus", () => {
    x(12);
    y(12);
    opacity(1);
  });
  env.on(frame, "blur", () => opacity(0));
}

// 09 — GSAP owns phase/spread; one visibility-gated ticker draws reusable points.
function initConstellation(env) {
  const { gsap, q } = env;
  const canvas = q("[data-particles]");
  const context = canvas.getContext("2d");
  if (!context) return;
  const count = env.desktop
    ? env.config.particlesDesktop
    : env.config.particlesMobile;
  const particles = Array.from({ length: count }, (_, i) => ({
    nx: (i * 0.618034) % 1,
    ny: (i * 0.414214 + 0.13) % 1,
    phase: i * 0.4,
    spread: 1,
    x: 0,
    y: 0,
    r: 1.5 + (i % 3),
  }));
  const pointer = { x: -9999, y: -9999 };
  let width = 1;
  let height = 1;
  let color = env.config.colors.light;
  const readColor = () => {
    color =
      getComputedStyle(env.root).getPropertyValue("--accent").trim() || color;
  };
  const render = () => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = context.strokeStyle = color;
    for (const p of particles) {
      p.x =
        width / 2 +
        ((p.nx - 0.5) * width * 0.92 + Math.sin(p.phase) * 12) * p.spread;
      p.y =
        height / 2 +
        ((p.ny - 0.5) * height * 0.8 + Math.cos(p.phase) * 12) * p.spread;
      const dx = pointer.x - p.x;
      const dy = pointer.y - p.y;
      const distance = Math.hypot(dx, dy);
      if (!env.calm && distance < 130) {
        p.x += dx * (1 - distance / 130) * 0.25;
        p.y += dy * (1 - distance / 130) * 0.25;
      }
      context.beginPath();
      context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 0.15;
    const max = env.config.particleDistance ** 2;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        if (dx * dx + dy * dy > max) continue;
        context.beginPath();
        context.moveTo(particles[i].x, particles[i].y);
        context.lineTo(particles[j].x, particles[j].y);
        context.stroke();
      }
    }
    context.globalAlpha = 1;
  };
  const resize = new ResizeObserver(([entry]) => {
    width = entry.contentRect.width;
    height = entry.contentRect.height;
    const ratio = Math.min(devicePixelRatio || 1, env.config.pixelRatio);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    readColor();
    render();
  });
  resize.observe(canvas);
  const theme = new MutationObserver(() => {
    readColor();
    render();
  });
  theme.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const colorMedia = matchMedia("(prefers-color-scheme: dark)");
  env.on(colorMedia, "change", () => {
    readColor();
    render();
  });
  const drift = env.calm
    ? null
    : gsap.to(particles, {
        phase: "+=6.283185",
        duration: 12,
        repeat: -1,
        ease: "none",
        paused: true,
      });
  observeLoop(env, canvas, drift, render);
  env.on(
    canvas,
    "pointermove",
    (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    },
    { passive: true },
  );
  const reset = () => {
    pointer.x = pointer.y = -9999;
  };
  env.on(canvas, "pointerleave", reset);
  env.on(canvas, "pointercancel", reset);
  env.on(canvas, "pointerup", reset);
  const burst = gsap.fromTo(
    particles,
    { spread: 0.2 },
    {
      spread: 1,
      duration: env.duration(1.5),
      ease: "elastic.out(1,0.6)",
      stagger: 0.005,
      paused: true,
      immediateRender: false,
    },
  );
  env.on(q("[data-burst]"), "click", () => {
    if (!env.calm) burst.restart();
  });
  env.clean(() => {
    resize.disconnect();
    theme.disconnect();
  });
}

// 10 — Horizontal travel on desktop; stacked cards on mobile; a gated ambient finale.
function initHorizons(env) {
  const { gsap, q, qa } = env;
  if (env.calm) return;
  const section = q(".atlas-horizons");
  const track = q(".atlas-track");
  const viewport = q(".atlas-horizontal");
  if (env.pin) {
    gsap.to(track, {
      x: () => -Math.max(0, track.scrollWidth - viewport.clientWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: `top ${env.config.pinOffset}px`,
        end: () =>
          `+=${Math.max(500, track.scrollWidth - viewport.clientWidth)}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  } else {
    gsap.from(qa(".atlas-end-card"), {
      opacity: 0,
      y: 24,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: { trigger: section, start: "top 75%", once: true },
    });
  }
  const marquee = gsap.to(q(".atlas-marquee > div"), {
    xPercent: -50,
    duration: env.config.loopDuration,
    repeat: -1,
    ease: "none",
    paused: true,
  });
  const icons = gsap.to(qa(".atlas-end-icon"), {
    rotation: 10,
    scale: 1.05,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    paused: true,
  });
  observeLoop(env, section, marquee);
  observeLoop(env, section, icons);
}

async function boot() {
  const roots = [...document.querySelectorAll(".gsap-container[data-atlas]")];
  if (!roots.length) return;
  try {
    await loadLibraries();
    await document.fonts?.ready;
    for (const root of roots) if (root.isConnected) mountAnimation(root);
  } catch {
    for (const root of roots) {
      const status = root.querySelector("[data-status]");
      if (status) {
        status.hidden = false;
        status.textContent =
          "The motion studio is offline. Every story and illustration is still here; reload to try again.";
      }
      // Keep the original static artwork visible when a CDN or Web API is unavailable.
      const shutter = root.querySelector(".atlas-image-shutter");
      if (shutter) shutter.hidden = true;
    }
  }
}
export const ready = boot();
