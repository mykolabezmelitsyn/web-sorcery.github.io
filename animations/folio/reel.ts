import { gsap } from "gsap";
import type { FolioConfig } from "./config";

export interface Reel {
  mountDetail(): void;
  play(): void;
  pause(): void;
  destroy(): void;
}

type Phase = "idle" | "opening" | "detail" | "closing";
type Timeline = gsap.core.Timeline;
const clamp = gsap.utils.clamp;
const wrap = (value: number, span: number) => ((value % span) + span) % span;

function createFlight(
  layer: HTMLElement,
  board: DOMRect,
  source: HTMLElement,
  destination: HTMLElement,
  photo: boolean,
  radius: number,
) {
  const start = source.getBoundingClientRect();
  const end = destination.getBoundingClientRect();
  const computed = getComputedStyle(source);
  const targetStyle = getComputedStyle(destination);
  const proxy = document.createElement("div");
  proxy.className = photo ? "folio-photo" : "folio-title";
  if (photo) {
    const media = source.querySelector("img, video");
    if (media instanceof HTMLVideoElement && media.readyState >= 2) {
      const frame = document.createElement("canvas");
      frame.width = media.videoWidth;
      frame.height = media.videoHeight;
      frame.style.cssText = media.style.cssText;
      frame.getContext("2d")?.drawImage(media, 0, 0);
      proxy.append(frame);
    } else if (media) {
      proxy.append(media.cloneNode(true));
    }
  } else {
    proxy.textContent = source.textContent;
    proxy.style.fontSize = computed.fontSize;
    proxy.style.fontWeight = computed.fontWeight;
    proxy.style.fontVariationSettings = computed.fontVariationSettings;
    proxy.style.color = computed.color;
    proxy.style.whiteSpace = computed.whiteSpace;
  }
  Object.assign(proxy.style, {
    left: `${start.left - board.left}px`,
    top: `${start.top - board.top}px`,
    width: `${start.width}px`,
    height: `${start.height}px`,
    maxWidth: "none",
  });

  if (photo) proxy.style.borderRadius = `${radius}px`;
  layer.append(proxy);
  const scale = photo
    ? end.width / start.width
    : parseFloat(targetStyle.fontSize) / parseFloat(computed.fontSize);
  const tween = {
    x: end.left - start.left,
    y: end.top - start.top,
    scale,
    ...(photo
      ? {
          onUpdate() {
            proxy.style.borderRadius = `${radius / Number(gsap.getProperty(proxy, "scaleX"))}px`;
          },
        }
      : {
          fontWeight: targetStyle.fontWeight,
          fontVariationSettings: targetStyle.fontVariationSettings,
          color: targetStyle.color,
        }),
  };
  return { tween, proxy };
}

export function createReel(
  section: HTMLElement,
  count: number,
  config: FolioConfig,
  setDetail: (index: number | null) => void,
): Reel {
  const signal = new AbortController();
  const qs = <T extends HTMLElement = HTMLElement>(selector: string) =>
    section.querySelector<T>(selector)!;
  const qa = <T extends HTMLElement = HTMLElement>(selector: string) =>
    Array.from(section.querySelectorAll<T>(selector));
  const reel = qs(".folio-reel");
  const titles = qs(".folio-titles");
  const images = qs(".folio-images");
  const rows = qa(".folio-row");
  const headings = qa<HTMLHeadingElement>(".folio-row h3");
  const titleButtons = qa<HTMLButtonElement>(".folio-row button");
  const credits = qa(".folio-credit");
  const slots = qa(".folio-slot");
  const photos = qa<HTMLButtonElement>("[data-folio-photo]");
  const cursor = qs(".folio-cursor");
  const counter = qs(".folio-current");
  const layer = qs(".folio-motion");
  const mobile = matchMedia(config.mobileQuery);
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const videos = new Set(qa<HTMLVideoElement>(".folio-images video"));
  const hoverWeights = new Float32Array(count);
  let layout = mobile.matches ? config.mobile : config.desktop;
  let height = 0;
  let width = 0;
  let board = section.getBoundingClientRect();
  let pos = count;
  let target = pos;
  let active = -1;
  let phase: Phase = "idle";
  let intro: Timeline | null = null;
  let travel: gsap.core.Tween | null = null;
  let transition: Timeline | null = null;
  let frame = 0;
  let lastFrame = 0;
  let snapTimer: ReturnType<typeof setTimeout> | undefined;
  let hovered = -1;
  let pointer: { x: number; y: number } | null = null;
  let cursorX = 0;
  let cursorY = 0;
  let cursorVisible = false;
  let touch: { y: number; moved: boolean } | null = null;
  let blockClickUntil = 0;
  let paused = false;
  let intersecting = true;
  let unlock: (() => void) | null = null;
  let sourceIndex = -1;
  let focusAfterClose = false;
  const context = gsap.context(() => {}, section);

  function lockBody() {
    if (unlock) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    unlock = () => {
      document.body.style.overflow = previous;
      unlock = null;
    };
  }

  function currentVideo(video: HTMLVideoElement | null) {
    for (const clip of videos) {
      if (clip !== video) clip.pause();
    }
    if (
      video &&
      !motion.matches &&
      !paused &&
      !document.hidden &&
      intersecting &&
      video.paused
    ) {
      void video.play().catch(() => {});
    }
  }

  function setPosition(value: number) {
    pos = target = count + wrap(value - count, count);
    requestDraw();
  }

  function draw(factor = 1) {
    if (!height) return false;

    // Move both coordinates by the same whole-copy offset at the seam.
    const anchored = count + wrap(pos - count, count);
    target += anchored - pos;
    pos = anchored;
    const current = Math.round(pos);
    const vh = height / 100;
    const titleY = (layout.titleMidVh - (pos + 0.5) * layout.titleSlotVh) * vh;
    const imageY =
      (layout.imageWrapperMidViewportVh -
        layout.imageWrapperTopVh -
        layout.imagePitchVh / 2 -
        (slots.length - 1 - pos) * layout.imagePitchVh) *
        vh +
      layout.imageOffsetPx;
    titles.style.transform = `translate3d(0, ${titleY}px, 0)`;
    images.style.transform = `translate3d(0, ${imageY}px, 0)`;

    const carryFocus =
      current !== active && titleButtons[active] === document.activeElement;
    if (current !== active) {
      active = current;
      counter.textContent = String((active % count) + 1).padStart(2, "0");
      section.dataset.active = String(active % count);
      if (videos.size && phase === "idle")
        currentVideo(photos[active].querySelector("video"));
    }

    let hoverMoving = false;
    for (let index = 0; index < count; index++) {
      const targetHover = Number(
        index === hovered && phase === "idle" && !motion.matches && !paused,
      );
      const currentHover = hoverWeights[index];
      const delta = targetHover - currentHover;
      hoverWeights[index] =
        Math.abs(delta) < 0.001
          ? targetHover
          : currentHover + delta * (1 - Math.pow(1 - config.hoverLerp, factor));
      hoverMoving ||= Math.abs(delta) >= 0.001;
    }

    for (let index = 0; index < slots.length; index++) {
      const distance = Math.abs(index - pos);
      const { farOpacity, nearOpacity, farScale, nearScale } = config;
      const fraction = clamp(0, 1, distance < 1 ? 1 - distance : 2 - distance);
      const opacity =
        distance < 1
          ? nearOpacity + (1 - nearOpacity) * fraction
          : farOpacity + (nearOpacity - farOpacity) * fraction;
      const scale =
        distance < 1
          ? nearScale + (1 - nearScale) * fraction
          : farScale + (nearScale - farScale) * fraction;
      const colour = Math.max(0, 1 - distance * config.colourFalloff);
      const type = Math.max(0, 1 - distance * config.typeFalloff);
      const weight = Math.round(
        config.baseWeight +
          config.weightRange * type +
          config.hoverWeight * hoverWeights[index % count],
      );
      const size =
        layout.titleFontVhMin +
        (layout.titleFontVhMax - layout.titleFontVhMin) * type;
      const credit = Math.max(0, 1 - distance * config.creditFalloff);

      photos[index].style.opacity = opacity.toFixed(3);
      photos[index].style.transform = `scale(${scale.toFixed(4)})`;
      rows[index].style.color =
        `color-mix(in srgb, var(--foreground) ${(colour * 100).toFixed(1)}%, var(--muted))`;
      rows[index].style.opacity = (
        config.rowOpacity +
        (1 - config.rowOpacity) * colour
      ).toFixed(3);
      rows[index].style.fontWeight = String(weight);
      rows[index].style.fontVariationSettings = `"wght" ${weight}`;
      rows[index].style.setProperty("--row-size", `${size.toFixed(2)}dvh`);
      credits[index].style.opacity = credit.toFixed(3);
      credits[index].style.transform = `translateX(${-10 * (1 - credit)}px)`;
      titleButtons[index].tabIndex = index === active ? 0 : -1;
      rows[index].setAttribute("aria-hidden", String(index !== active));
      slots[index].setAttribute("aria-hidden", "true");
    }

    if (carryFocus && !reel.inert)
      titleButtons[active].focus({ preventScroll: true });

    const hit =
      pointer &&
      document.elementFromPoint(pointer.x + board.left, pointer.y + board.top);
    const show = Boolean(
      hit?.closest("[data-folio-photo]") &&
        !motion.matches &&
        phase === "idle" &&
        !paused,
    );
    cursor.classList.toggle("is-visible", show);
    let cursorMoving = false;
    if (pointer) {
      const interpolation =
        show && cursorVisible ? 1 - Math.pow(1 - config.cursorLerp, factor) : 1;
      cursorX += (pointer.x - cursorX) * interpolation;
      cursorY += (pointer.y - cursorY) * interpolation;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      cursorMoving =
        show && Math.hypot(pointer.x - cursorX, pointer.y - cursorY) > 0.25;
    }
    cursorVisible = show;
    return hoverMoving || cursorMoving;
  }

  function requestDraw() {
    if (!frame && !document.hidden && intersecting && !signal.signal.aborted)
      frame = requestAnimationFrame(tick);
  }

  function tick(now: number) {
    frame = 0;
    const factor = lastFrame
      ? clamp(0.25, 3, (now - lastFrame) / (1000 / 60))
      : 1;
    lastFrame = now;
    const difference = target - pos;
    if (motion.matches || paused || Math.abs(difference) < 0.0005) pos = target;
    else pos += difference * (1 - Math.pow(1 - config.smoothing, factor));
    const activeHover = draw(factor);
    if (activeHover || Math.abs(target - pos) > 0.0005) requestDraw();
    else lastFrame = 0;
  }

  function updateSize() {
    const next = mobile.matches ? config.mobile : config.desktop;
    const bounds = section.getBoundingClientRect();
    const changed =
      layout !== next || height !== bounds.height || width !== bounds.width;
    board = bounds;
    if (!changed) return;
    layout = next;
    height = bounds.height;
    width = bounds.width;
    if (!height || !width) return;
    const styles = {
      "--title-top": layout.titleTopVh,
      "--title-area": layout.titleAreaVh,
      "--title-slot": layout.titleSlotVh,
      "--image-top": layout.imageWrapperTopVh,
      "--image-area": layout.imageWrapperHeightVh,
      "--image-height": layout.imageHeightVh,
      "--image-pitch": layout.imagePitchVh,
    };
    for (const [key, value] of Object.entries(styles))
      section.style.setProperty(key, `${(value * height) / 100}px`);
    section.style.setProperty(
      "--detail-title-size",
      `${config.mobile.titleFontVhMax * 1.1}dvh`,
    );
    section.style.setProperty("--folio-mask", `${config.mask}px`);
    section.style.setProperty("--folio-radius", `${config.photoRadius}px`);
    slots.forEach((slot, index) => {
      slot.style.top = `${((slots.length - 1 - index) * layout.imagePitchVh * height) / 100}px`;
    });
    transition?.progress(transition.reversed() ? 0 : 1);
    draw();
  }

  function finishIntro() {
    intro?.kill();
    intro = null;
    context.add(() => {
      gsap.set(qa(".folio-title-entrance, .folio-image-entrance"), {
        opacity: 1,
        clearProps: "transform,filter",
      });
      gsap.set(qs("[data-chrome]"), { opacity: 1, clearProps: "transform" });
    });
    unlock?.();
    requestDraw();
  }

  function startIntro() {
    if (motion.matches || paused) {
      finishIntro();
      return;
    }
    lockBody();
    const strips = qa(".folio-title-entrance, .folio-image-entrance");
    const proxy = { position: pos };
    const distance =
      Math.floor(config.entranceDistance * count) +
      Math.floor(Math.random() * count);
    context.add(() => {
      intro = gsap.timeline({ onComplete: finishIntro });
      intro.addLabel("reveal", 0).fromTo(
        strips,
        { opacity: 0, y: 28, scale: 1.04, filter: "blur(14px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: config.stripSeconds,
          ease: config.openEase,
          stagger: config.stripStagger,
        },
        "reveal",
      );
      intro.fromTo(
        qs("[data-chrome]"),
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: config.chromeSeconds,
          ease: "power3.out",
        },
        `reveal+=${config.chromeDelay}`,
      );
      intro.to(
        proxy,
        {
          position: pos + distance,
          duration: config.entranceSeconds,
          ease: config.openEase,
          onUpdate: () => setPosition(proxy.position),
        },
        "reveal",
      );
    });
  }

  function stopManualTravel() {
    if (intro) finishIntro();
    if (travel) {
      travel.kill();
      travel = null;
      target = pos;
    }
    clearTimeout(snapTimer);
  }

  function snapSoon() {
    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => {
      if (touch) return;
      target = Math.round(target);
      requestDraw();
    }, config.snapMs);
  }

  function applyDelta(pixels: number) {
    stopManualTravel();
    const delta = clamp(-config.wheelCap, config.wheelCap, pixels);
    target += delta / layout.pixelsPerItem;
    if (!touch) snapSoon();
    requestDraw();
  }

  function navigate(index: number, open: boolean) {
    if (phase !== "idle") return;
    stopManualTravel();
    const rounded = Math.round(pos);
    const delta = wrap(index - rounded + count / 2, count) - count / 2;
    const destination = rounded + delta;
    const finish = () => {
      travel = null;
      setPosition(destination);
      draw();
      if (open) {
        phase = "opening";
        section.dataset.phase = phase;
        sourceIndex = active;
        focusAfterClose = section.contains(document.activeElement);
        lockBody();
        reel.inert = true;
        pointer = null;
        cursor.classList.remove("is-visible");
        currentVideo(null);
        setDetail(active % count);
      }
    };

    if (motion.matches || paused || Math.abs(destination - pos) < 0.005) {
      finish();
      return;
    }
    const proxy = { position: pos };
    travel = gsap.to(proxy, {
      position: destination,
      duration:
        config.navigateSeconds + Math.abs(delta) * config.navigatePerStep,
      ease: config.travelEase,
      onUpdate: () => setPosition(proxy.position),
      onComplete: finish,
    });
  }

  function sourceNodes() {
    return [photos[sourceIndex], headings[sourceIndex]];
  }

  function destinationNodes() {
    return [qs("[data-detail-image]"), qs(".folio-detail-title")];
  }

  function animateFlights(
    from: HTMLElement[],
    to: HTMLElement[],
    time: Timeline,
    duration: number,
    ease: string,
    at: number,
  ) {
    const rect = section.getBoundingClientRect();
    const flights = from.map((item, index) =>
      createFlight(
        layer,
        rect,
        item,
        to[index],
        index === 0,
        config.photoRadius,
      ),
    );
    from.concat(to).forEach((item) => {
      item.style.visibility = "hidden";
    });
    flights.forEach(({ proxy, tween }) =>
      time.to(proxy, { ...tween, duration, ease }, at),
    );
  }

  function mountDetail() {
    const detail = qs(".folio-detail");
    const scrim = qs("[data-detail-scrim]");
    const destination = destinationNodes();
    const back = qs<HTMLButtonElement>(".folio-back");
    const video = destination[0].querySelector("video");
    if (video) videos.add(video);
    const finish = () => {
      transition = null;
      layer.replaceChildren();
      destination.forEach((item) => {
        item.style.visibility = "";
      });
      detail.classList.remove("is-transitioning");
      phase = "detail";
      section.dataset.phase = phase;
      currentVideo(video);
    };
    if (motion.matches || paused) {
      sourceNodes().forEach((item) => {
        item.style.visibility = "hidden";
      });
      finish();
    } else {
      detail.classList.add("is-transitioning");
      const time = gsap.timeline({ onComplete: finish });
      transition = time;
      animateFlights(
        sourceNodes(),
        destination,
        time,
        config.openSeconds,
        config.openEase,
        0,
      );
      const lift =
        headings[sourceIndex].getBoundingClientRect().top -
        destination[1].getBoundingClientRect().top;
      time.to(
        rows.slice(0, sourceIndex),
        { y: -lift, duration: config.openSeconds, ease: config.openEase },
        0,
      );
      time.fromTo(
        scrim,
        { opacity: 0 },
        { opacity: 1, ...config.scrimOpen },
        0,
      );
      time.fromTo(
        qa("[data-detail-reveal]"),
        { opacity: 0, y: 24, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: config.detailReveal.duration,
          stagger: config.detailReveal.stagger,
          ease: config.openEase,
        },
        config.detailReveal.delay,
      );
    }
    back.focus({ preventScroll: true });
  }

  function finalizeClose() {
    transition = null;
    const video = qs("[data-detail-image]").querySelector("video");
    if (video) {
      video.pause();
      videos.delete(video);
    }
    layer.replaceChildren();
    sourceNodes().forEach((item) => {
      item.style.visibility = "";
    });
    gsap.set(rows.slice(0, sourceIndex), { clearProps: "transform" });
    sourceIndex = -1;
    phase = "idle";
    section.dataset.phase = phase;
    reel.inert = false;
    unlock?.();
    setDetail(null);
    currentVideo(photos[active].querySelector("video"));
    if (focusAfterClose) titleButtons[active].focus({ preventScroll: true });
    requestDraw();
  }

  function close() {
    if (phase === "idle" || phase === "closing" || !qs(".folio-detail")) return;
    const opening = phase === "opening" ? transition : null;
    phase = "closing";
    section.dataset.phase = phase;
    if (motion.matches || paused) {
      transition?.kill();
      finalizeClose();
      return;
    }
    if (opening) {
      opening.eventCallback("onComplete", null);
      opening.eventCallback("onReverseComplete", finalizeClose);
      opening.reverse();
      return;
    }
    const detail = qs(".folio-detail");
    detail.classList.add("is-transitioning");
    const time = gsap.timeline({ onComplete: finalizeClose });
    transition = time;
    animateFlights(
      destinationNodes(),
      sourceNodes(),
      time,
      config.closeSeconds,
      config.travelEase,
      config.closeDelay,
    );
    time.to(
      rows.slice(0, sourceIndex),
      {
        y: 0,
        duration: config.closeSeconds,
        ease: config.travelEase,
      },
      config.closeDelay,
    );
    time.to(
      qs("[data-detail-scrim]"),
      {
        opacity: 0,
        duration: config.scrimClose.duration,
        ease: config.scrimClose.ease,
      },
      config.scrimClose.delay,
    );
    time.to(
      qa("[data-detail-reveal]"),
      {
        opacity: 0,
        y: 14,
        filter: "blur(6px)",
        ...config.detailRecede,
      },
      0,
    );
  }

  const options = { signal: signal.signal };
  section.addEventListener(
    "wheel",
    (event) => {
      if (phase !== "idle") return;
      event.preventDefault();
      const unit =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1;
      applyDelta(event.deltaY * unit);
    },
    { ...options, passive: false },
  );
  reel.addEventListener(
    "touchstart",
    (event) => {
      if (phase !== "idle" || event.touches.length !== 1) return;
      if (intro) finishIntro();
      touch = { y: event.touches[0].clientY, moved: false };
    },
    { ...options, passive: true },
  );
  reel.addEventListener(
    "touchmove",
    (event) => {
      if (!touch || event.touches.length !== 1 || phase !== "idle") return;
      event.preventDefault();
      const y = event.touches[0].clientY;
      const delta = touch.y - y;
      if (Math.abs(delta) >= 3) touch.moved = true;
      touch.y = y;
      applyDelta(delta);
    },
    { ...options, passive: false },
  );
  function finishTouch() {
    if (!touch) return;
    if (touch.moved) blockClickUntil = performance.now() + 350;
    touch = null;
    snapSoon();
  }
  reel.addEventListener("touchend", finishTouch, options);
  reel.addEventListener("touchcancel", finishTouch, options);

  reel.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") return;
      const bounds = section.getBoundingClientRect();
      board = bounds;
      pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
      const row = (event.target as Element).closest<HTMLElement>(
        "[data-folio-title]",
      );
      hovered = row ? Number(row.dataset.folioTitle) % count : -1;
      requestDraw();
    },
    options,
  );
  reel.addEventListener(
    "pointerleave",
    () => {
      pointer = null;
      hovered = -1;
      requestDraw();
    },
    options,
  );

  section.addEventListener(
    "click",
    (event) => {
      const clicked = event.target as HTMLElement;
      if (phase !== "idle") {
        if (
          clicked.closest("[data-folio-close]") ||
          clicked.matches(".folio-detail-scroll, .folio-detail")
        )
          close();
        return;
      }
      if (performance.now() < blockClickUntil && event.detail > 0) return;
      const choice = clicked.closest<HTMLElement>(
        "[data-folio-title], [data-folio-photo]",
      );
      if (choice)
        navigate(
          Number(choice.dataset.folioTitle ?? choice.dataset.folioPhoto),
          true,
        );
    },
    options,
  );

  document.addEventListener(
    "keydown",
    (event) => {
      const within = section.contains(event.target as Node);
      if (phase !== "idle") {
        if (
          event.key === "Escape" &&
          (within || event.target === document.body)
        ) {
          event.preventDefault();
          close();
        }
        if (event.key === "Tab" && within) {
          const controls = qa<HTMLElement>(
            ".folio-detail button, .folio-detail a",
          ).filter((node) => node.getClientRects().length);
          const next = wrap(
            controls.indexOf(document.activeElement as HTMLElement) +
              (event.shiftKey ? -1 : 1),
            controls.length,
          );
          if (controls[next]) {
            event.preventDefault();
            controls[next].focus({ preventScroll: true });
          }
        }
        return;
      }
      const forwards = ["ArrowDown", "ArrowRight", "PageDown"];
      const backwards = ["ArrowUp", "ArrowLeft", "PageUp"];
      if (
        (within || document.activeElement === document.body) &&
        [...forwards, ...backwards].includes(event.key)
      ) {
        event.preventDefault();
        const direction = forwards.includes(event.key) ? 1 : -1;
        navigate(Math.round(travel ? target : pos) + direction, false);
      }
      if (
        within &&
        (event.target === section || titleButtons[active] === event.target) &&
        (event.key === "Enter" || event.key === " ") &&
        !event.isComposing
      ) {
        event.preventDefault();
        navigate(active, true);
      }
    },
    options,
  );

  const resize = new ResizeObserver(updateSize);
  resize.observe(section);
  const intersection = new IntersectionObserver(([entry]) => {
    intersecting = entry.isIntersecting;
    syncPlayback();
  });
  intersection.observe(section);
  mobile.addEventListener("change", updateSize, options);
  function syncPlayback() {
    const suspended = paused || document.hidden || !intersecting;
    intro?.paused(suspended);
    travel?.paused(suspended);
    transition?.paused(suspended);
    if (suspended) {
      currentVideo(null);
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
    } else {
      requestDraw();
      if (phase === "detail")
        currentVideo(qs("[data-detail-image]").querySelector("video"));
      else if (phase === "idle")
        currentVideo(photos[active]?.querySelector("video") ?? null);
    }
  }
  document.addEventListener("visibilitychange", syncPlayback, options);
  motion.addEventListener(
    "change",
    () => {
      if (motion.matches) {
        if (intro) finishIntro();
        travel?.progress(1);
        transition?.progress(transition.reversed() ? 0 : 1);
        currentVideo(null);
      }
      requestDraw();
    },
    options,
  );

  section.dataset.phase = phase;
  updateSize();
  startIntro();

  return {
    mountDetail,
    play() {
      paused = false;
      syncPlayback();
    },
    pause() {
      if (intro) finishIntro();
      paused = true;
      syncPlayback();
    },
    destroy() {
      signal.abort();
      resize.disconnect();
      intersection.disconnect();
      clearTimeout(snapTimer);
      cancelAnimationFrame(frame);
      intro?.kill();
      travel?.kill();
      transition?.kill();
      context.revert();
      currentVideo(null);
      unlock?.();
      layer.replaceChildren();
    },
  };
}
