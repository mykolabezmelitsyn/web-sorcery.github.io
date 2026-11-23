# Folio — AI Build Prompt

> Hand this file to an AI in any project with the instruction **"build me this section."** Everything required to recreate the loop, the FLIP detail view, the entrance, and the mobile/desktop responsive treatment is below. Numbers are exact and intentional — copy them.

---

## 1 · What this is

A **two-column infinite portfolio reel** for a creative agency. A vertical title list (left) and a portrait image strip (right) ride a single fractional position that loops forever in both directions. Wheel forward → titles slide up while images slide down past the centre, meeting on the active row. Click any image or title → **shared-element FLIP** to a detail panel; close → reverse FLIP back to the same item in the loop. On mobile the columns stack: titles top, images bottom, both meeting at the section midline.

Quality bar: every transition must be pixel-perfect. No flicker, no abrupt swaps, no scroll bleed to the page during the entrance.

---

## 2 · Tech assumptions

- **React 18+** with TypeScript, hooks, refs
- **GSAP** core (`gsap`) — used for the entrance timeline, FLIP tweens, click-navigation tween, and items-above lift
- **Tailwind CSS 4** (or any utility CSS) for static layout classes
- **Variable Geist Sans** for the title `wght` axis (or any variable font with a `wght` axis 400–700+)
- Mobile: `dvh` units (modern browsers; iOS 15.4+, Chrome 108+, Firefox 101+)

No ScrollTrigger needed. No external CSS frameworks beyond utility classes.

---

## 3 · Item data shape

```ts
interface FolioItem {
  id: string;
  title: string;          // single short line: "Mochi · The Companion"
  client: string;
  year: string;           // "2024"
  discipline: string;     // "Brand · Audio"
  industry: string;       // "Media · Podcasting"
  imageId: string;        // Unsplash photo ID, e.g. "1710553455483-c29d596d1235"
  imagePosition?: string; // CSS object-position, e.g. "center 50%"
  videoSrc?: string;      // optional MP4 URL — overrides imageId when set
  summary: string;        // 1–2 sentences describing the work
  rating: number;         // 0–5, supports half-stars
  reviewCount: number;
  reviewQuote: string;
  reviewer: string;       // "Jay Ortega · Brand Director, Strider Athletic"
  awards?: string[];      // ["Cannes · Bronze", "ADC Cube"]
}
```

**Title and image content MUST match.** Don't pair a sneaker photo with a "brand identity for a magazine" caption — every item's title/client/summary/reviewer must read coherently against its image.

Provide **9 items minimum** so the loop has room to feel substantial without showing duplicates inside one visible window.

---

## 4 · Layout — desktop and mobile

Detect at runtime:

```ts
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const mq = window.matchMedia("(max-width: 767px)");
  const update = () => setIsMobile(mq.matches);
  update();
  mq.addEventListener("change", update);
  return () => mq.removeEventListener("change", update);
}, []);
```

Pack every dimension into one `Layout` object so a viewport flip moves both strips in step. The rAF loop reads from `layoutRef.current` (synced from state on change) so the formulas update every frame. **Use `dvh` units everywhere viewport-relative**, including JS-injected `style.fontSize`. Use `h-[100dvh]` instead of `h-screen` on the section root.

```ts
type Layout = {
  // Title list
  titleAreaVh: number;
  titleTopVh: number;            // wrapper top in dvh
  titleMidVh: number;            // centre of active row in wrapper-local dvh
  titleSlotVh: number;           // per-row height
  titleVisible: number;          // visible row count
  titleFontVhMax: number;        // active row size
  titleFontVhMin: number;        // edge row size
  // Image list
  imageWrapperTopVh: number;
  imageWrapperHeightVh: number;
  imageWrapperMidViewportVh: number; // viewport y of active slot's centre
  imageHeightVh: number;
  imageGapVh: number;
  imagePitchVh: number;          // = imageHeightVh + imageGapVh
  imageOffsetPx: number;         // px push on the image strip's translateY
  pixelsPerItem: number;         // wheel/touch sensitivity
};

const DESKTOP_LAYOUT: Layout = {
  titleAreaVh: 80, titleTopVh: 10, titleMidVh: 40, titleSlotVh: 80/9, titleVisible: 9,
  titleFontVhMax: 4.5, titleFontVhMin: 4.2,
  imageWrapperTopVh: 0, imageWrapperHeightVh: 100, imageWrapperMidViewportVh: 50,
  imageHeightVh: 60, imageGapVh: 5, imagePitchVh: 65,
  imageOffsetPx: 0, pixelsPerItem: 600,
};

const MOBILE_LAYOUT: Layout = {
  titleAreaVh: 50, titleTopVh: 0,
  titleMidVh: 45,                    // active row's bottom edge meets 50dvh
  titleSlotVh: 50/5, titleVisible: 5,
  titleFontVhMax: 2.6, titleFontVhMin: 2.5,  // 4% breath, fits at narrow widths
  imageWrapperTopVh: 50, imageWrapperHeightVh: 50,
  imageWrapperMidViewportVh: 69,     // active image's top edge meets 50dvh
  imageHeightVh: 38, imageGapVh: 4, imagePitchVh: 42,
  imageOffsetPx: 20,                 // push past the top mask zone on first view
  pixelsPerItem: 120,                // 2–3 items per swipe
};
```

**Breakpoint:** `(max-width: 767px)` flips MOBILE_LAYOUT.

Why `imageWrapperMidViewportVh = 69` on mobile: image_top = mid − imageHeight/2 = 69 − 19 = `50dvh`. Image's top edge meets the section midline. Active title's bottom edge also meets `50dvh` because `titleTopVh + titleMidVh + titleSlotVh/2 = 0 + 45 + 5 = 50`. Title and image are *adjacent*.

Why `imageOffsetPx = 20` on mobile: shifts the strip 20px down so the active image isn't faded by the top mask gradient (which fades the first 20px of the wrapper). Adjacent images entering from above still fade through it.

---

## 5 · DOM structure

```
<section relative h-[100dvh] w-full overflow-hidden bg-background>
  ├─ [data-chrome] top-right counter "01 / 09" (uppercase tracked, foreground/30 hairline)
  │
  ├─ <div absolute left-0 z-[1] overflow-hidden>           ← title wrapper
  │   • desktop: w-1/2, top:10dvh, height:80dvh
  │   • mobile:  w-full, top:0, height:50dvh
  │   • mask-image: linear-gradient(transparent 0, #000 20px, #000 calc(100%−20px), transparent 100%)
  │   └─ <div ref={titleStripRef} absolute inset-x-0 top-0 will-change-transform>
  │         └─ N×LOOP_COPIES rows {
  │              <div ref={titleRefs[i]} flex items-center cursor-pointer
  │                                       (mobile: justify-center) (desktop: gap-4)>
  │                <h3 leading-none tracking-[-0.015em] whitespace-nowrap />
  │                <span hidden sm:inline>{client · discipline · year}</span> ← desktop credit, fades in only on active
  │              </div>
  │            }
  │
  ├─ <div absolute>                                          ← image wrapper
  │   • desktop: right-0 top-0 h-[100dvh] w-1/2  (no mask)
  │   • mobile:  left-0 w-full top:50dvh height:50dvh, masked top + bottom (same gradient)
  │   └─ <div ref={imageStripRef} absolute inset-x-0 top-0 will-change-transform
  │             style={{height: RENDERED * imagePitchVh + "dvh"}}>
  │         └─ N×LOOP_COPIES slots {
  │              <div absolute inset-x-0 flex items-center justify-center
  │                   style={{
  │                     top: `${(RENDERED-1-i) * imagePitchVh}dvh`,   ← REVERSED stacking
  │                     height: `${imagePitchVh}dvh`,
  │                   }}>
  │                <div ref={slotRefs[i]} relative cursor-pointer overflow-hidden
  │                      rounded-2xl bg-subtle
  │                      style={{height: imageHeightVh + "dvh", aspectRatio: "4 / 5"}}>
  │                  <img object-cover w-full h-full /> {/* or <video /> */}
  │                  <div pointer-events-none bg-gradient-to-t from-black/12 via-transparent to-transparent />
  │                </div>
  │              </div>
  │            }
  │
  ├─ <div ref={clickMeRef} pointer-events-none absolute z-20            ← cursor ring
  │       grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 place-items-center
  │       rounded-full border border-white/55 mix-blend-difference>
  │     <span text-[9px] uppercase tracking-[0.32em] text-white>View</span>
  │
  └─ {detailItem && <DetailView />}                          ← FLIP target panel
```

`RENDERED = LOOP_COPIES × N` where `LOOP_COPIES = 3`.

The image strip's slots are **absolute-positioned in REVERSED order** (`top: (RENDERED-1-i) * pitch`). Combined with an inverted strip-translate sign, this is what makes images scroll DOWN while titles scroll UP, both meeting on the active item.

---

## 6 · Position state machine

```ts
const POS_MIN = N;      // start of middle copy
const POS_MAX = 2 * N;  // start of last copy

const targetPosRef = useRef(POS_MIN);     // updated by wheel/touch/click-tween
const posRef = useRef(POS_MIN);           // smoothly chases target via lerp
const activeIdxRef = useRef(POS_MIN);     // round(pos), DOM rendered index
const [activeIdx, setActiveIdx] = useState(POS_MIN);

// Phases for the detail panel
const [phase, setPhase] = useState<"idle" | "opening" | "detail" | "closing">("idle");
const detailOpenRef = useRef(false);     // mirrors phase !== "idle"
const navigatingRef = useRef(false);     // a click-navigation GSAP tween is running
const entranceDoneRef = useRef(false);   // entrance auto-scroll is complete
```

Position is "unbounded" but always re-anchored into `[POS_MIN, POS_MAX)` by a teleport in the rAF tick. Content at `pos` and `pos ± N` is identical (LOOP_COPIES = 3 copies in the DOM), so the teleport is invisible.

---

## 7 · Per-frame rAF loop

A single `requestAnimationFrame` ticker drives all motion. Every frame:

```ts
const tick = () => {
  // 1. Wheel-idle snap. If user has stopped wheeling for 90ms and isn't
  //    in a click-navigation tween, round target to the nearest item so
  //    the strip never settles half-way.
  if (!navigatingRef.current && !detailOpenRef.current
      && performance.now() - lastWheelTimeRef.current > 90) {
    const t = targetPosRef.current;
    const snapped = Math.round(t);
    if (snapped !== t) targetPosRef.current = snapped;
  }

  // 2. Lerp pos toward target. Snap when within 0.0005 to kill jitter.
  const target = targetPosRef.current;
  const cur = posRef.current;
  let next =
    Math.abs(target - cur) < 0.0005
      ? target
      : cur + (target - cur) * SMOOTHING; // SMOOTHING = 0.14

  // 3. Teleport — keep next inside [POS_MIN, POS_MAX). Shift BOTH pos and
  //    target together so the lerp continues smoothly across the boundary.
  while (next < POS_MIN) { next += N; targetPosRef.current += N; }
  while (next >= POS_MAX) { next -= N; targetPosRef.current -= N; }
  posRef.current = next;

  const L = layoutRef.current;
  const vh = window.innerHeight / 100;

  // 4. Title strip — active row's CENTRE at wrapper-local titleMidVh.
  const titleStripY = (L.titleMidVh - (next + 0.5) * L.titleSlotVh) * vh;
  titleStrip.style.transform = `translate3d(0, ${titleStripY.toFixed(2)}px, 0)`;

  // 5. Image strip — active slot's CENTRE at imageWrapperMidViewportVh.
  //    NOTE: slots are reversed-positioned (top = (RENDERED-1-i)*pitch),
  //    so the strip translates DOWN as pos increases (opposite of titles).
  //    imageOffsetPx is added in raw pixels for the mobile mask buffer.
  const imageStripY =
    (L.imageWrapperMidViewportVh - L.imageWrapperTopVh - L.imagePitchVh / 2
      - (RENDERED - 1) * L.imagePitchVh + next * L.imagePitchVh) * vh
    + L.imageOffsetPx;
  imageStrip.style.transform = `translate3d(0, ${imageStripY.toFixed(2)}px, 0)`;

  // 6. Per-slot opacity + scale (image side). Piecewise:
  //    dist < 1 → opacity 0.78 → 1.00, scale 0.93 → 1.00
  //    dist < 2 → opacity 0.18 → 0.78, scale 0.84 → 0.93
  //    dist ≥ 2 → opacity 0.18,        scale 0.84
  for (let i = 0; i < RENDERED; i++) {
    const el = slotRefs.current[i]; if (!el) continue;
    const dist = Math.abs(i - next);
    let opacity, scale;
    if (dist < 1)      { const t = 1 - dist;       opacity = 0.78 + 0.22*t; scale = 0.93 + 0.07*t; }
    else if (dist < 2) { const t = 1 - (dist - 1); opacity = 0.18 + 0.60*t; scale = 0.84 + 0.09*t; }
    else               { opacity = 0.18; scale = 0.84; }
    el.style.opacity = opacity.toFixed(3);
    el.style.transform = `scale(${scale.toFixed(4)})`;
  }

  // 7. Per-row colour + opacity + wght + size (title side).
  //    tColor falls off FAST (only the centre row takes any foreground tint),
  //    tType keeps a softer curve so wght and size still breathe.
  //    Plus a per-row hover bonus on wght (lerped at 0.18/frame).
  const HOVER_LERP = 0.18, HOVER_WGHT_BONUS = 80;
  const NONACTIVE_OPACITY = 0.7;
  const hoveredIdx = hoveredTitleIdxRef.current;
  for (let i = 0; i < RENDERED; i++) {
    const el = titleRefs.current[i]; if (!el) continue;
    const dist = Math.abs(i - next);
    const tColor = Math.max(0, 1 - dist * 2);          // sharp
    const tType  = Math.max(0, 1 - dist * 0.55);       // soft
    const targetHover = hoveredIdx !== null && i % N === hoveredIdx % N ? 1 : 0;
    const cur = titleHoverProgressRef.current[i] ?? 0;
    const nextHover = cur + (targetHover - cur) * HOVER_LERP;
    titleHoverProgressRef.current[i] = nextHover;
    el.style.color = `color-mix(in srgb, var(--foreground) ${(tColor*100).toFixed(1)}%, var(--muted))`;
    el.style.opacity = (NONACTIVE_OPACITY + (1 - NONACTIVE_OPACITY) * tColor).toFixed(3);
    const wght = 420 + 200 * tType + nextHover * HOVER_WGHT_BONUS;
    el.style.fontVariationSettings = `"wght" ${wght.toFixed(0)}`;
    el.style.fontWeight = String(Math.round(wght));
    const h3 = el.querySelector("h3");
    if (h3) {
      const fontVh = L.titleFontVhMin + (L.titleFontVhMax - L.titleFontVhMin) * tType;
      (h3 as HTMLElement).style.fontSize = `${fontVh.toFixed(2)}dvh`;
    }
  }

  // 8. Subtitle (credit) — fades IN only on the active row, with a tight
  //    falloff (t' = clamp(0, 1 − dist × 2.8, 1)) and a small −10px slide-in.
  for (let i = 0; i < RENDERED; i++) {
    const el = subtitleRefs.current[i]; if (!el) continue;
    const dist = Math.abs(i - next);
    const t = Math.max(0, 1 - dist * 2.8);
    el.style.opacity = t.toFixed(3);
    el.style.transform = `translateX(${((1 - t) * -10).toFixed(2)}px)`;
  }

  // 9. Active rendered index for play-state (Ken-Burns / video play).
  const rounded = Math.max(0, Math.min(RENDERED - 1, Math.round(next)));
  if (rounded !== activeIdxRef.current) {
    activeIdxRef.current = rounded;
    setActiveIdx(rounded);
  }

  // 10. Cursor ring — lerps toward pointer at 0.22/frame, snaps when hidden.
  if (clickMeRef.current) {
    const visible = isHoveringActiveRef.current && onSectionRef.current && !detailOpenRef.current;
    const lerp = visible ? 0.22 : 1;
    cursorRenderRef.current.x += (hoverRef.current.x - cursorRenderRef.current.x) * lerp;
    cursorRenderRef.current.y += (hoverRef.current.y - cursorRenderRef.current.y) * lerp;
    clickMeRef.current.style.transform =
      `translate3d(${cursorRenderRef.current.x.toFixed(2)}px, ${cursorRenderRef.current.y.toFixed(2)}px, 0)`;
    clickMeRef.current.style.opacity = visible ? "1" : "0";
  }

  raf = requestAnimationFrame(tick);
};
```

**Counter** (`activeIdx % N + 1`) and **active row reads** (e.g., the discipline label) use `activeIdx % N` as the logical index — DOM-order index modulo the unique-item count.

---

## 8 · Wheel + touch input

Both handlers gate on `onSectionRef`, `detailOpenRef`, and `entranceDoneRef`, but **wheel/touch INSIDE the section during entrance kills the entrance and takes over** instead of bailing.

```ts
let touchY = 0;

const onWheel = (e: WheelEvent) => {
  if (!onSectionRef.current) return;
  if (detailOpenRef.current) return;
  const target = e.target as HTMLElement | null;
  if (target?.closest("[data-no-wheel]")) return;
  e.preventDefault();
  if (!entranceDoneRef.current) skipEntranceIfRunning();
  if (navigatingRef.current) {
    gsap.killTweensOf(navProxyRef.current);
    navigatingRef.current = false;
  }
  lastWheelTimeRef.current = performance.now();
  const delta = Math.max(-200, Math.min(200, e.deltaY));   // WHEEL_PER_EVENT_CAP = 200
  targetPosRef.current += delta / layoutRef.current.pixelsPerItem;
};

const onTouchStart = (e: TouchEvent) => {
  if (detailOpenRef.current) return;
  if ((e.target as HTMLElement)?.closest("[data-no-wheel]")) return;
  if (!entranceDoneRef.current) skipEntranceIfRunning();
  touchY = e.touches[0]?.clientY ?? 0;
};

const onTouchMove = (e: TouchEvent) => {
  if (detailOpenRef.current) return;
  if ((e.target as HTMLElement)?.closest("[data-no-wheel]")) return;
  e.preventDefault();
  if (!entranceDoneRef.current) skipEntranceIfRunning();
  const y = e.touches[0]?.clientY ?? touchY;
  const delta = touchY - y;
  touchY = y;
  if (navigatingRef.current) {
    gsap.killTweensOf(navProxyRef.current);
    navigatingRef.current = false;
  }
  lastWheelTimeRef.current = performance.now();
  const capped = Math.max(-200, Math.min(200, delta));
  targetPosRef.current += capped / layoutRef.current.pixelsPerItem;
};

window.addEventListener("wheel", onWheel, { passive: false });
section.addEventListener("touchstart", onTouchStart, { passive: true });
section.addEventListener("touchmove", onTouchMove, { passive: false });

// pointerenter/leave on section drive onSectionRef.current
// pointermove updates hoverRef (cursor coords relative to section) and is read
// by the rAF cursor ring update.
```

**Anything inside `[data-no-wheel]`** (the detail panel's content blocks) is exempt so detail-internal scroll works normally.

---

## 9 · Click-anywhere navigation

Every title row and every image slot is `cursor-pointer` and routes through one helper. Clicking an inactive item runs a **gentle GSAP tween** to slide the strip to it, then opens the detail.

```ts
const navigateAndOpen = (i: number) => {
  if (phase !== "idle" || !entranceDoneRef.current) return;
  const currentIdx = activeIdxRef.current;
  if (i === currentIdx) { openDetailFromActiveAt(currentIdx); return; }

  // Shortest-path delta in LOGICAL space.
  const currentPos = posRef.current;
  const currentLogical = ((Math.round(currentPos) % N) + N) % N;
  const clickedLogical = ((i % N) + N) % N;
  let delta = clickedLogical - currentLogical;
  if (delta > N / 2) delta -= N;
  if (delta < -N / 2) delta += N;
  if (delta === 0) { openDetailFromActiveAt(currentIdx); return; }

  // Power3.inOut tween on a number proxy. onUpdate writes BOTH pos and
  // target (rAF lerp sees them equal and steps aside) and wraps through
  // the loop boundary so teleports stay invisible mid-flight.
  const proxy = navProxyRef.current;
  proxy.value = currentPos;
  navigatingRef.current = true;
  gsap.killTweensOf(proxy);
  gsap.to(proxy, {
    value: currentPos + delta,
    duration: 0.85 + Math.abs(delta) * 0.11,  // 1-step ≈ 0.96s, 4-step ≈ 1.29s
    ease: "power3.inOut",
    onUpdate: () => {
      let v = proxy.value;
      while (v < POS_MIN) v += N;
      while (v >= POS_MAX) v -= N;
      posRef.current = v;
      targetPosRef.current = v;
    },
    onComplete: () => {
      navigatingRef.current = false;
      requestAnimationFrame(() => openDetailFromActiveAt(activeIdxRef.current));
    },
  });
};
```

The wheel handler kills `navProxyRef` so a manual scroll mid-tween instantly transfers control.

---

## 10 · Entrance — load-time auto-scroll

Single GSAP timeline, ~2s total. **Locks page scroll** for the duration. **Interruptible by wheel/touch** inside the section.

```ts
useEffect(() => {
  prevBodyOverflowRef.current = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        entranceDoneRef.current = true;
        document.body.style.overflow = prevBodyOverflowRef.current;
        entranceTimelineRef.current = null;
      },
    });
    entranceTimelineRef.current = tl;

    // Strips: opacity + blur + scale + y, 0.9s power4.out, stagger 0.06s
    tl.fromTo(
      [titleStripRef.current, imageStripRef.current],
      { opacity: 0, y: 28, scale: 1.04, filter: "blur(14px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
        duration: 0.9, ease: "power4.out", stagger: 0.06 },
      0,
    );

    // Chrome ([data-chrome]): fade + 8px slide-up, 0.7s power3.out, delay 0.5s
    tl.fromTo(
      sectionRef.current?.querySelectorAll("[data-chrome]") ?? [],
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.05 },
      0.5,
    );

    // Auto-scroll position: tween proxy from POS_MIN to POS_MIN + (1.4×N + random)
    // duration 1.7s power4.out → ~94% of the motion in the first half →
    // items zoom past, then ease into a random landing row.
    const entranceProxy = { value: POS_MIN };
    const cycleDistance = Math.floor(1.4 * N) + Math.floor(Math.random() * N);
    tl.to(entranceProxy, {
      value: POS_MIN + cycleDistance,
      duration: 1.7,
      ease: "power4.out",
      onUpdate: () => {
        let v = entranceProxy.value;
        while (v < POS_MIN) v += N;
        while (v >= POS_MAX) v -= N;
        posRef.current = v;
        targetPosRef.current = v;
      },
    }, 0);
  }, sectionRef);

  return () => {
    ctx.revert();
    document.body.style.overflow = prevBodyOverflowRef.current;
    entranceTimelineRef.current = null;
  };
}, []);

const skipEntranceIfRunning = () => {
  if (entranceDoneRef.current) return;
  entranceTimelineRef.current?.kill();
  entranceTimelineRef.current = null;
  entranceDoneRef.current = true;
  document.body.style.overflow = prevBodyOverflowRef.current;
};
```

**Behaviour:**
- 0–0.9s: strips fade up, blur clears
- 0–1.7s: position tweens through ~1.4 cycles + random offset, easing into a final row (every project flashes through the centre at least once)
- 0.5–1.2s: chrome (counter, etc.) fades in
- ~2s: `entranceDoneRef = true`, body scroll restored
- Wheel/touch inside the section at any point during this → `skipEntranceIfRunning()` kills the tween, restores scroll, and the user takes over from the current position

---

## 11 · Click → detail (FLIP open)

Capture the strip's active rects synchronously, hide the source elements, mount the detail panel, and immediately apply an inverse transform that puts the detail's title and image at the strip rects. Then animate to identity.

```ts
const detailImageRef = useRef<HTMLDivElement>(null);
const detailTitleRef = useRef<HTMLHeadingElement>(null);
const sourceImageRectRef = useRef<DOMRect | null>(null);
const sourceTitleRectRef = useRef<DOMRect | null>(null);
const hiddenIdxRef = useRef<number | null>(null);
const flipAppliedRef = useRef(false);

const openDetailFromActiveAt = (idx: number) => {
  if (phase !== "idle" || !entranceDoneRef.current) return;
  const slot = slotRefs.current[idx];
  const titleRow = titleRefs.current[idx];
  const titleH3 = titleRow?.querySelector("h3") as HTMLElement | null;
  sourceImageRectRef.current = slot?.getBoundingClientRect() ?? null;
  sourceTitleRectRef.current = titleH3?.getBoundingClientRect() ?? null;
  hiddenIdxRef.current = idx;
  if (slot) slot.style.visibility = "hidden";
  if (titleH3) titleH3.style.visibility = "hidden";
  setPhase("opening");
  setDetailIdx(idx % N);
};

useLayoutEffect(() => {
  if (detailIdx === null) { flipAppliedRef.current = false; return; }
  if (flipAppliedRef.current) return;
  flipAppliedRef.current = true;

  const sourceImg = sourceImageRectRef.current;
  const sourceTitle = sourceTitleRectRef.current;
  const imgEl = detailImageRef.current;
  const titleEl = detailTitleRef.current;
  const root = detailRef.current;
  if (!root) return;

  // Scrim — fades up beneath the FLIP'd content; section reads as
  // EXPANDING into detail rather than a stacked modal.
  const scrim = root.querySelector("[data-detail-scrim]");
  if (scrim) gsap.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" });

  // Image FLIP. With matching aspect ratios (4/5) on source AND target,
  // sx === sy → uniform scale → object-cover crop is identical at any
  // FLIP scale → no image-content shift mid-flight.
  if (sourceImg && imgEl) {
    const target = imgEl.getBoundingClientRect();
    const dx = sourceImg.left - target.left;
    const dy = sourceImg.top - target.top;
    const sx = sourceImg.width / target.width;
    const sy = sourceImg.height / target.height;
    gsap.set(imgEl, { visibility: "visible", transformOrigin: "top left",
                      x: dx, y: dy, scaleX: sx, scaleY: sy });
    gsap.to(imgEl, { x: 0, y: 0, scaleX: 1, scaleY: 1,
                     duration: 0.95, ease: "power4.out" });
  }

  // Title FLIP. Uniform scale = source.height / target.height. CRITICAL:
  // strip h3 and detail h2 must share line-height — otherwise the height-
  // based scale ≠ the font-size ratio, and the painted glyph at FLIP-start
  // is a sub-pixel smaller than the source. Use leading-none on both.
  if (sourceTitle && titleEl) {
    const target = titleEl.getBoundingClientRect();
    const dx = sourceTitle.left - target.left;
    const dy = sourceTitle.top - target.top;
    const s = sourceTitle.height / target.height;
    gsap.set(titleEl, { visibility: "visible", transformOrigin: "top left",
                       x: dx, y: dy, scale: s });
    gsap.to(titleEl, { x: 0, y: 0, scale: 1,
                       duration: 0.95, ease: "power4.out",
                       onComplete: () => setPhase("detail") });

    // Items-above lift: every row above the active in the list translates
    // UP by the same displacement as the active title's FLIP, on the same
    // duration + ease. Reads as "the upper half of the list lifts with
    // the active row" rather than the active row vanishing alone.
    const lift = sourceTitle.top - target.top;
    const activeIdxNow = hiddenIdxRef.current;
    if (activeIdxNow !== null && lift !== 0) {
      for (let i = 0; i < activeIdxNow; i++) {
        const row = titleRefs.current[i];
        if (row) gsap.to(row, { y: -lift, duration: 0.95, ease: "power4.out" });
      }
    }
  } else {
    setPhase("detail");
  }

  // Accessory rows reveal slightly behind the FLIP (delay 0.25s).
  gsap.fromTo(
    root.querySelectorAll("[data-detail-reveal]"),
    { y: 24, opacity: 0, filter: "blur(8px)" },
    { y: 0, opacity: 1, filter: "blur(0px)",
      duration: 0.9, ease: "power4.out", stagger: 0.05, delay: 0.25 },
  );
}, [detailIdx]);
```

### Pixel-perfect rules for the FLIP image

- Source slot and target frame: **same `aspectRatio: "4 / 5"`**
- Same `border-radius` (use `rounded-2xl` on both)
- Same gradient overlay alpha (e.g., `from-black/12`)
- **Same Unsplash URL** on source and target (`?w=900&h=1125&fit=crop&q=80&auto=format`) — different sizes re-sample slightly and would visibly shift between source and target
- **No Ken-Burns drift** on the inner image. Any per-frame inner transform creates a content jump at click-time when the FLIP'd target image starts at identity. Outer slot scale (per-frame, distance-based) is fine; inner image must hold still.

### Pixel-perfect rules for the FLIP title

- Same `tracking` on h3 and h2 (`-0.015em`)
- Same `leading-none` (line-height 1.0) on both. Without this the bounding-rect height ≠ font-size on the target → height-based FLIP scale slightly off → painted glyph at FLIP-start is ~1px smaller than source → millisecond shrink-flicker
- Same `wght` axis value (h2 explicitly set to `font-variation-settings: "wght" 620` and `font-weight: 620`, matching the active strip h3's full weight)
- Same DOM string (don't translate or re-format)

---

## 12 · Close → reverse FLIP

Mirror of the open. `gsap.to` instead of `fromTo`, `power3.inOut`, slightly shorter (0.85s), with the items-above lift reversed.

```ts
const handleClose = () => {
  if (phase === "closing" || phase === "idle") return;
  setPhase("closing");

  const sourceImg = sourceImageRectRef.current;
  const sourceTitle = sourceTitleRectRef.current;
  const imgEl = detailImageRef.current;
  const titleEl = detailTitleRef.current;
  const root = detailRef.current;

  // Accessories recede first (faster than the FLIP).
  if (root) {
    const reveal = root.querySelectorAll("[data-detail-reveal]");
    gsap.to(reveal, { y: 14, opacity: 0, filter: "blur(6px)",
                      duration: 0.35, ease: "power3.in", stagger: 0.03 });
    const scrim = root.querySelector("[data-detail-scrim]");
    if (scrim) gsap.to(scrim, { opacity: 0, duration: 0.55, delay: 0.25, ease: "power2.in" });
  }

  if (sourceImg && imgEl) {
    const target = imgEl.getBoundingClientRect();
    const sx = sourceImg.width / target.width;
    const sy = sourceImg.height / target.height;
    gsap.to(imgEl, {
      x: sourceImg.left - target.left, y: sourceImg.top - target.top,
      scaleX: sx, scaleY: sy,
      duration: 0.85, ease: "power3.inOut", delay: 0.05,
    });
  }

  if (sourceTitle && titleEl) {
    const target = titleEl.getBoundingClientRect();
    const s = sourceTitle.height / target.height;
    gsap.to(titleEl, {
      x: sourceTitle.left - target.left, y: sourceTitle.top - target.top,
      scale: s,
      duration: 0.85, ease: "power3.inOut", delay: 0.05,
      onComplete: finalizeClose,
    });
    // Reverse items-above lift on the same curve.
    const activeIdxNow = hiddenIdxRef.current;
    if (activeIdxNow !== null) {
      for (let i = 0; i < activeIdxNow; i++) {
        const row = titleRefs.current[i];
        if (row) gsap.to(row, { y: 0, duration: 0.85, ease: "power3.inOut", delay: 0.05 });
      }
    }
  } else {
    finalizeClose();
  }
};

const finalizeClose = () => {
  const hidIdx = hiddenIdxRef.current;
  if (hidIdx !== null) {
    const slot = slotRefs.current[hidIdx];
    const titleRow = titleRefs.current[hidIdx];
    const titleH3 = titleRow?.querySelector("h3") as HTMLElement | null;
    if (slot) slot.style.visibility = "";
    if (titleH3) titleH3.style.visibility = "";
    // Clear leftover y from the lift so the rAF doesn't compose with stale transforms.
    for (let i = 0; i < hidIdx; i++) {
      const row = titleRefs.current[i];
      if (row) gsap.set(row, { clearProps: "transform" });
    }
  }
  hiddenIdxRef.current = null;
  sourceImageRectRef.current = null;
  sourceTitleRectRef.current = null;
  setDetailIdx(null);
  setPhase("idle");
};
```

Close paths: **Esc keydown**, **✕ button click**, or **click on the bare detail background** all call `handleClose()`.

While detail is open: `document.body.style.overflow = "hidden"` (set in a `useEffect` keyed on `detailIdx`, restored on cleanup).

---

## 13 · Detail panel layout

### Desktop (≥ 768px)

```
.absolute.inset-0.z-30
  ├─ [data-detail-scrim] absolute inset-0 bg-background, opacity tween 0 → 1
  ├─ Left half: <div absolute left-0 top-0 flex h-full flex-col p-8 md:p-14 lg:p-16
  │              style={{width: "calc(55vw - 30px)"}} data-no-wheel>
  │     ├─ [data-detail-reveal] BackButton → calls handleClose
  │     ├─ <h2 ref={titleRef} mt-8 leading-none tracking-[-0.015em] whitespace-nowrap
  │            style={{fontSize: "clamp(2.4rem, 7dvh, 5rem)", fontWeight: 620,
  │                    fontVariationSettings: '"wght" 620', transformOrigin: "top left",
  │                    visibility: "hidden"}}>
  │     ├─ <p data-detail-reveal> {summary} </p>
  │     ├─ [data-detail-reveal] Meta grid (2-col): Client / Year / Industry / Discipline
  │     ├─ [data-detail-reveal] Stars + rating + reviewCount + awards · quote · reviewer
  │     └─ [data-detail-reveal] mt-auto pt-10: "Hire us for your next one" CTA
  │
  └─ Right side: <div absolute data-no-wheel onClick=stopProp
                     style={{top:"30px", right:"30px", bottom:"30px", aspectRatio:"4/5"}}>
        <div ref={imageRef} data-detail-image relative h-full w-full overflow-hidden
              rounded-2xl bg-subtle
              style={{transformOrigin: "top left", visibility: "hidden"}}>
          {video || img}                                              ← FLIP target
          gradient-to-t from-black/12  (matches strip slot)
        </div>
        <button absolute -right-2 -top-2 h-10 w-10 rounded-full bg-foreground
                text-background shadow-lg → handleClose>  ✕
```

### Mobile (< 768px)

Single scrollable column. **`overflow-y: auto` + `overscrollBehavior: "contain"` + `WebkitOverflowScrolling: "touch"`** so reaching the top/bottom of the modal doesn't bubble into a page scroll.

```
.absolute.inset-0.z-30
  ├─ [data-detail-scrim] absolute inset-0 bg-background, opacity tween 0 → 1
  └─ <div data-no-wheel absolute inset-0 overflow-y-auto
          style={{overscrollBehavior: "contain",
                   WebkitOverflowScrolling: "touch"}}>
        <div flex flex-col gap-6 px-6 pb-12 pt-8>
          [data-detail-reveal] BackButton
          <h2 ref={titleRef} leading-none tracking-[-0.015em] break-words
              style={{fontSize: `${MOBILE_LAYOUT.titleFontVhMax * 1.1}dvh`,
                      fontWeight: 620, fontVariationSettings: '"wght" 620',
                      transformOrigin: "top left", visibility: "hidden"}}>
            {item.title}
          </h2>
          <p data-detail-reveal> {summary} </p>
          [data-detail-reveal] Meta grid (2-col)
          [data-detail-reveal] Stars + rating + reviewCount + awards · quote · reviewer
          [data-detail-reveal] CTA
          <div ref={imageRef} ... aspectRatio: "4/5", w-full> {img/video} </div>  ← FLIP target, at bottom
        </div>
```

Mobile h2 size = `MOBILE_LAYOUT.titleFontVhMax × 1.1` ≈ `2.86dvh`. Just enough hierarchy bump above the list-active size to read as "this is the detail title", small enough to stay on a single line for typical phone widths. `break-words` is a fallback for very long titles + extra-narrow viewports.

---

## 14 · Hover cursor ring

A 76×76 thin-bordered circle with a tracked uppercase `VIEW` label. `mix-blend-difference` keeps it readable on any image. Position lerps toward the cursor at 0.22/frame so it feels weighty without lagging.

```tsx
<div ref={clickMeRef} aria-hidden
     className="pointer-events-none absolute left-0 top-0 z-20
                grid h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2
                place-items-center rounded-full border border-white/55"
     style={{ opacity: 0, transition: "opacity 260ms ease-out",
              mixBlendMode: "difference",
              willChange: "transform, opacity" }}>
  <span className="text-[9px] font-medium uppercase tracking-[0.32em] text-white">View</span>
</div>
```

Visible whenever `isHoveringActiveRef && onSectionRef && !detailOpenRef`. Hover handler is on **every image slot** (active and not):

```ts
onPointerEnter={() => { isHoveringActiveRef.current = true; }}
onPointerLeave={() => { isHoveringActiveRef.current = false; }}
```

When hidden, the lerp factor flips to 1 (snap) so the next reveal doesn't fly in from the last position.

---

## 15 · Title rows — interactions

Each row is `cursor-pointer` and `onClick={() => navigateAndOpen(i)}`. On mobile they're `justify-center`; on desktop they're `gap-4` with the inline credit (`<span className="hidden sm:inline">`) revealed only by the rAF subtitle fade on the active row.

Hover triggers a per-row wght bump:

```ts
onPointerEnter={() => { hoveredTitleIdxRef.current = i; }}
onPointerLeave={() => { if (hoveredTitleIdxRef.current === i) hoveredTitleIdxRef.current = null; }}
```

The rAF lerps each row's hover progress at 0.18/frame and adds up to 80 wght units on top of the distance-driven base — every copy of the same logical item bumps together.

---

## 16 · Counter chrome

Top-right of the section, `data-chrome` for the entrance fade-in:

```tsx
<div data-chrome
     className="pointer-events-none absolute right-6 top-7 z-10 flex items-center gap-3
                md:right-12 md:top-10">
  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-muted tabular-nums">
    {String((activeIdx % N) + 1).padStart(2, "0")}
    <span className="mx-1.5 opacity-40">/</span>
    {String(N).padStart(2, "0")}
  </span>
  <span className="h-px w-8 bg-foreground/30" />
</div>
```

No "Selected Work" label, no scroll prompt. The counter alone is the chrome.

---

## 17 · Image source URLs

Use Unsplash with stable canonical IDs. **Identical URL on source and target** for byte-identical bytes:

```
https://images.unsplash.com/photo-{imageId}?w=900&h=1125&fit=crop&q=80&auto=format
```

Resolve the canonical ID by visiting `https://unsplash.com/photos/{slug}-{shortId}` and grabbing the `og:image` URL — the part between `photo-` and the `?` query string is what you want.

---

## 18 · Theme tokens used

Read from CSS custom properties (theme-aware):

```
var(--foreground)   ← active row colour, button bg, ring text
var(--muted)        ← inactive row colour, eyebrow / credit / meta labels
var(--background)   ← section bg, scrim, button text
```

`color-mix(in srgb, var(--foreground) X%, var(--muted))` interpolates between them per-row.

---

## 19 · Numeric constants — single source

Lock these in. Changing them changes the *feel*; pick once and don't drift.

| Constant | Value | What it controls |
|---|---|---|
| `LOOP_COPIES` | `3` | DOM duplication for invisible teleport |
| `WHEEL_PER_EVENT_CAP` | `200` | Per-event delta cap (px) |
| `pixelsPerItem` (desktop) | `600` | Wheel delta per item |
| `pixelsPerItem` (mobile) | `120` | Touch delta per item — 2–3 items per swipe |
| `SMOOTHING` | `0.14` | Lerp factor for pos → target |
| Wheel-idle snap timeout | `90ms` | Idle threshold before target rounds to int |
| `NEAR_OPACITY` / `FAR_OPACITY` | `0.78` / `0.18` | Image slot opacity floor at dist 1 / 2 |
| `NEAR_SCALE` / `FAR_SCALE` | `0.93` / `0.84` | Image slot scale floor at dist 1 / 2 |
| `NONACTIVE_OPACITY` | `0.7` | Non-active title row opacity |
| `tColor` curve | `1 − dist × 2`  | Sharp falloff: only centre row takes foreground tint |
| `tType` curve | `1 − dist × 0.55` | Soft falloff: wght + size breathe gradually |
| `wght` range | `420 + 200·tType` | Variable weight per row |
| `wght` hover bonus | `+80` | Lerped at 0.18/frame |
| `HOVER_LERP` | `0.18` | Hover wght glide factor |
| Subtitle falloff | `1 − dist × 2.8` | Tight — only active row's credit fades in |
| `TITLE_MASK_PX` | `20` | Top + bottom mask gradient zone |
| Image FLIP open | `0.95s power4.out` | Open scale tween |
| Title FLIP open | `0.95s power4.out` | Same duration as image |
| FLIP close (image + title) | `0.85s power3.inOut`, `delay: 0.05s` | Reverse tween |
| Items-above lift open | `0.95s power4.out` | Synced with title FLIP |
| Items-above lift close | `0.85s power3.inOut`, `delay: 0.05s` | Synced with title FLIP-back |
| Scrim open | `0.45s power2.out` | Background fade-in |
| Scrim close | `0.55s power2.in`, `delay: 0.25s` | Background fade-out |
| Detail accessories open | `0.9s power4.out`, `stagger 0.05s`, `delay: 0.25s` | Reveal stagger |
| Detail accessories close | `0.35s power3.in`, `stagger 0.03s` | Recede stagger |
| Click navigation duration | `0.85 + |delta| × 0.11 s` | Distance-aware |
| Click navigation ease | `power3.inOut` | Calm glide |
| Entrance strips | `0.9s power4.out`, `stagger 0.06s` | Fade + un-blur |
| Entrance chrome | `0.7s power3.out`, `stagger 0.05s`, `delay: 0.5s` | Late chrome reveal |
| Entrance auto-scroll | `1.7s power4.out` | ~94% motion in first half |
| Entrance distance | `⌊1.4 × N⌋ + random[0, N)` items | At least one full cycle through every project |
| Cursor ring lerp | `0.22` | Weighty follow without drag |

---

## 20 · Build checklist

Before shipping, verify:

- [ ] **Loop boundary invisible** — wheel through several cycles in both directions; no jumps, no duplicate items inside one visible window.
- [ ] **Active title and active image share the same logical item** at every position (counter `01/09` pairs with the right photo).
- [ ] **Wheel-idle snap** — items always settle on a snap point; never half-way between rows.
- [ ] **Click any item** (active or far, image or title) → glides to the centre, then opens detail.
- [ ] **FLIP open** — at the first painted frame, the detail's image + title visually equal the source's. No flicker, no scale jump, no resampling shift, no border-radius pop. Items above the active lift in lockstep.
- [ ] **FLIP close** — exact reverse. Strip h3 + slot become visible only after the FLIP-back lands.
- [ ] **Mobile FLIP precision** — line-heights match between strip h3 and detail h2, no millisecond shrink at FLIP start.
- [ ] **Body scroll lock** during entrance: outside-section wheel/touch/keyboard arrows can't scroll past until the auto-scroll lands.
- [ ] **Inside-section wheel/touch during entrance** — kills the auto-scroll, hands control to the user from the current position, restores body scroll.
- [ ] **Detail body scroll lock** while open. **Modal `overscroll-behavior: contain`** on mobile so reaching top/bottom doesn't bubble.
- [ ] **Cursor ring** — appears on hover of any image slot, follows the cursor with a small lerp, hidden when detail open or pointer leaves the section, `mix-blend-difference` keeps it legible on any background.
- [ ] **Title hover** — wght bump only, no tooltip. Bumps every copy of the same logical item together.
- [ ] **Active row visual** — full foreground colour + 100% opacity. Every other row at muted + 70% opacity. No middle-ground gradient.
- [ ] **Variable typography** — active row at wght 620 (or +80 on hover); edges at 420. Font-size lerps subtly across rows.
- [ ] **Counter** is the only top chrome. No "Selected Work" label, no scroll prompt.
- [ ] **Mobile layout** — title list 50dvh top, image list 50dvh bottom, both with top + bottom mask gradients. Active title's bottom edge meets the section midline; active image's top edge meets it (with a 20px buffer past the mask zone).
- [ ] **Mobile titles centred horizontally** in the loop; left-aligned in the detail (FLIP handles the position translate automatically).
- [ ] **Mobile detail** is one scrollable column with the image at the bottom; back button at top closes via the same FLIP-back as Esc.
- [ ] **Theme-aware** — works on both light and dark via `var(--foreground/--muted/--background)`.

---

## 21 · What NOT to do

- ❌ Don't use ScrollTrigger pin. The interaction model is wheel-jacked, not scroll-jacked.
- ❌ Don't add Ken-Burns drift to the inner image. It causes a content jump at click-time.
- ❌ Don't size detail h2 with a different line-height than strip h3. The FLIP scale becomes off, glyphs shrink ~1px at FLIP-start.
- ❌ Don't fetch different Unsplash sizes for source and target. Re-sampling shows as a content shift at the FLIP seam.
- ❌ Don't use `vh` on mobile for layout. Use `dvh` so the section matches the actual visible viewport.
- ❌ Don't bail wheel/touch silently during entrance. Either preventDefault + lock the page, or take over. Doing nothing leaves the user wondering if the section is responsive.
- ❌ Don't add a "Selected Work" header or a "Scroll" prompt. The counter and the typography do all the chrome you need.
- ❌ Don't show "Click me" tooltip on title hover. Title hover gets wght bump only.
- ❌ Don't show the cursor ring as a coloured pill. Use `mix-blend-difference` on a thin-bordered circle.
- ❌ Don't skip the items-above lift on FLIP. Without it the active row feels like it vanishes alone instead of lifting with the upper half of the list.

---

## 22 · One-liner for the AI

> *"Build me a wheel-jacked infinite-loop portfolio reel: title list + portrait image strip that ride one fractional position; 3-copy DOM with invisible teleport; per-row variable wght/colour/opacity; click any item → smooth GSAP glide to centre then shared-element FLIP into a detail panel; reverse FLIP on close; entrance auto-scrolls through every project before landing on a random row in 2 seconds with body scroll-locked; mobile stacks columns with title at bottom of upper half / image at top of lower half, mobile detail is a scroll-locked column with the image at the bottom. Numbers and code patterns in the spec are exact — copy them. Items must read coherently against their photos."*
