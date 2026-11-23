import { createGlobe, loadGlobe } from "./globe.js";

const CONFIG = {
  breakpoint: 720, // Switch to the mobile layout below this width.
  fov: 30, // Vertical camera field of view in degrees.
  mobileWidth: 0.82, // Maximum globe width as a fraction of the mobile viewport.
  desktopWidth: 0.43, // Leave room for both wordmark flanks on a portrait tablet.
  dpr: 1.75, // Maximum device pixel ratio.
  initialYaw: 4, // Initial old-world longitude.
  axialTilt: -0.409, // Earth's axial roll in radians.
  sun: [0.32, 0.18, 0.95], // Fixed light direction in world space.
  autoSpin: 0.028, // Idle yaw in radians per second.
  cloudSpeed: 0.006, // Independent cloud drift in radians per second.
  dragSensitivity: 0.005, // Radians per dragged pixel.
  wheelSensitivity: 0.00034, // Wheel momentum per pixel.
  decay: 0.94, // Momentum multiplier per 60 Hz frame.
  pitchLimit: 1.2, // Maximum drag pitch in radians.
  clickDistance: 6, // Pointer travel that separates click from drag.
  browseX: -0.4, // Desktop globe position behind the wordmark.
  openX: -1.3, // Desktop globe position with the panel open.
  idMap: [4096, 2048], // Country map sampling dimensions.
  stars: 2000, // Number of points on the fixed star shell.
  introSeconds: 1.8, // Globe entrance duration.
  flySeconds: 1.3, // Fly-to duration.
  closeSeconds: 0.95, // Return-to-browse duration.
};
const highlights = new URL("./assets/highlights.json", import.meta.url).href;
const greatWall = new URL("./assets/great-wall.jpg", import.meta.url).href;
const tajMahal = new URL("./assets/taj-mahal.jpg", import.meta.url).href;
const curated = {
  IND: {
    name: "India",
    tagline: "From the Himalayas to the Indian Ocean",
    places: [
      {
        label: "Taj Mahal",
        blurb:
          "A white marble mausoleum and formal gardens on the bank of the Yamuna in Agra.",
        image: tajMahal,
        hi: "https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal,_Agra,_India_edit3.jpg?width=3840",
        credit:
          "© Yann Forget · edited by King of Hearts and Jbarta · CC BY-SA 3.0",
        source:
          "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit3.jpg",
      },
    ],
  },
  CHN: {
    name: "China",
    tagline: "The Middle Kingdom",
    places: [
      {
        label: "Great Wall",
        blurb:
          "Thirteen thousand miles of rammed earth and stone winding over the northern ridges.",
        image: greatWall,
        hi: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/3840px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
        credit: "Severin.stalder · edited by Brandmeister · CC BY-SA 3.0",
        source:
          "https://commons.wikimedia.org/wiki/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
      },
    ],
  },
};

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function button(className, text, action, signal, label) {
  const node = element("button", className, text);
  node.type = "button";
  if (label) node.setAttribute("aria-label", label);
  node.addEventListener("click", action, { signal });
  return node;
}

function photograph(url, className, eager = false) {
  const image = element("img", className);
  image.alt = "";
  const reveal = () => image.classList.add("loaded");
  image.addEventListener("load", reveal, { once: true });
  if (eager) image.fetchPriority = "high";
  image.src = url;
  if (image.complete && image.naturalWidth) reveal();
  return image;
}

export function mountAnimation(container, options = {}) {
  const config = { ...CONFIG, ...options };
  const controller = new AbortController();
  const { signal } = controller;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const find = (selector) => container.querySelector(selector);
  const stage = find(".atlas-stage");
  const status = find(".atlas-status");
  const tooltip = find(".atlas-hover");
  const overlay = find(".atlas-country");
  const panel = find(".atlas-panel");
  const back = find(".atlas-back");
  const form = find(".atlas-search");
  const input = form.querySelector("input");
  const results = find(".atlas-results");
  const pauseButton = find(".atlas-pause");

  let globe;
  let countries;
  let content = {};
  let current;
  let cardSession;
  let resultSession;
  let dialogSession;
  let dialog;
  let returnFocus;
  let paused = false;
  let closeTimer;
  let dialogTimer;
  let matches = [];
  let outgoingTimer;
  let searchReady = false;

  function setPaused(value) {
    paused = value;
    globe?.setPaused(value);
    container.classList.toggle("is-paused", value);
    pauseButton.setAttribute("aria-pressed", String(value));
    pauseButton.textContent = value ? "Play animation" : "Pause animation";
  }

  function updateMotion() {
    pauseButton.hidden = motion.matches || !globe || !searchReady;
  }

  function showHover(name, ocean, x, y) {
    if (tooltip.textContent !== name) tooltip.textContent = name;
    tooltip.classList.toggle("is-ocean", ocean);
    tooltip.classList.toggle("is-visible", Boolean(name));
    if (!name) return;
    const bounds = container.getBoundingClientRect();
    const left = Math.max(
      8,
      Math.min(x - bounds.left + 18, bounds.width - tooltip.offsetWidth - 8),
    );
    tooltip.style.transform = `translate(${left}px, ${Math.max(6, y - bounds.top - 34)}px)`;
  }

  function showResults() {
    matches = countries?.search(input.value) ?? [];
    resultSession?.abort();
    resultSession = new AbortController();
    results.replaceChildren(
      ...matches.map((country) =>
        button("", country.name, () => select(country), resultSession.signal),
      ),
    );
    results.hidden = matches.length === 0;
    if (input.value.trim() && !matches.length) {
      results.append(element("p", "", "No countries found."));
      results.hidden = false;
    }
  }

  function openPhoto(place, trigger) {
    if (dialog) return;
    returnFocus = trigger;
    dialogSession = new AbortController();
    const popupSignal = dialogSession.signal;
    dialog = element("dialog", "atlas-fullbleed");
    dialog.setAttribute("aria-labelledby", "atlas-place-title");
    const photo = element("div", "atlas-full-image");
    if (place.image) photo.append(photograph(place.image, "atlas-photo"));
    const high =
      place.hi ||
      place.image?.replace(
        /([?&]width=)1000\b/,
        (_, prefix) => prefix + "3840",
      );
    if (high && high !== place.image)
      photo.append(photograph(high, "atlas-photo"));
    const caption = element("div", "atlas-caption");
    const eyebrow = element("p", "atlas-eyebrow", current.name);
    const title = element("h2", "", place.label);
    title.id = "atlas-place-title";
    caption.append(eyebrow, title, element("p", "", place.blurb));
    if (place.source) {
      const credit = element(
        "a",
        "atlas-credit",
        place.credit || "Photo source",
      );
      credit.href = place.source;
      credit.target = "_blank";
      credit.rel = "noopener";
      caption.append(credit);
    }
    const close = button(
      "atlas-photo-close atlas-glass",
      "✕",
      closePhoto,
      popupSignal,
      "Close highlight",
    );
    const globeButton = button(
      "atlas-back",
      "← Globe",
      closePhoto,
      popupSignal,
    );
    dialog.append(photo, caption, close, globeButton);
    dialog.addEventListener(
      "click",
      (event) => {
        if (!event.target.closest("a, button")) closePhoto();
      },
      { signal: popupSignal },
    );
    dialog.addEventListener(
      "cancel",
      (event) => {
        event.preventDefault();
        closePhoto();
      },
      { signal: popupSignal },
    );
    container.append(dialog);
    dialog.showModal();
    close.focus();
  }

  function closePhoto() {
    if (!dialog || dialog.classList.contains("is-closing")) return;
    dialog.classList.add("is-closing");
    dialogTimer = setTimeout(
      () => {
        dialogSession.abort();
        dialog.close();
        dialog.remove();
        dialog = null;
        returnFocus?.focus();
      },
      motion.matches ? 0 : 360,
    );
  }

  function makeDetails(entry, session) {
    const details = element("div", "atlas-details");
    const places = entry.places;
    if (!places.length) {
      details.append(
        element(
          "p",
          "atlas-no-content",
          `Highlights for ${current.name} are on the way.`,
        ),
      );
      return details;
    }
    const card = element("div", "atlas-card");
    const track = element("div", "atlas-track");
    const dots = element("div", "atlas-dots");
    const list = element("div", "atlas-list");
    let index = 0;
    const expand = button(
      "atlas-expand atlas-glass",
      "⤢",
      () => openPhoto(places[index], expand),
      session,
      "Expand highlight",
    );
    const prev = button(
      "atlas-prev atlas-glass",
      "‹",
      () => showPlace(index - 1),
      session,
      "Previous highlight",
    );
    const next = button(
      "atlas-next atlas-glass",
      "›",
      () => showPlace(index + 1),
      session,
      "Next highlight",
    );

    function showPlace(active) {
      index = active;
      track.style.transform = `translateX(${-active * 100}%)`;
      prev.hidden = active === 0;
      next.hidden = active === places.length - 1;
      for (let position = 0; position < places.length; position++) {
        track.children[position].setAttribute(
          "aria-hidden",
          String(position !== active),
        );
        list.children[position].setAttribute(
          "aria-pressed",
          String(position === active),
        );
        dots.children[position]?.setAttribute(
          "aria-pressed",
          String(position === active),
        );
      }
      expand.setAttribute("aria-label", `Expand ${places[index].label}`);
    }

    places.forEach((place, position) => {
      const slide = element("div", "atlas-slide");
      if (place.image)
        slide.append(photograph(place.image, "atlas-photo", position === 0));
      const copy = element("div", "atlas-card-copy");
      copy.append(
        element("h3", "", place.label),
        element("p", "", place.blurb),
      );
      slide.append(copy);
      track.append(slide);
      const row = button("atlas-row", "", () => showPlace(position), session);
      row.append(
        element("span", "atlas-number", String(position + 1).padStart(2, "0")),
        element("span", "", place.label),
      );
      list.append(row);
      if (places.length > 1)
        dots.append(
          button(
            "atlas-dot",
            "",
            () => showPlace(position),
            session,
            place.label,
          ),
        );
    });
    track.addEventListener("click", () => openPhoto(places[index], expand), {
      signal: session,
    });
    card.append(track, expand, prev, next, dots);
    details.append(card, list);
    showPlace(0);
    return details;
  }

  function select(country, focus = true) {
    if (current?.id === country.id) return;
    const switched = Boolean(current);
    current = country;
    clearTimeout(closeTimer);
    clearTimeout(outgoingTimer);
    panel.querySelector(".atlas-outgoing")?.remove();
    const previous = panel.querySelector(".atlas-entry");
    cardSession?.abort();
    cardSession = new AbortController();
    const available = curated[country.iso3];
    const auto = content[country.iso3] ?? [];
    const entry = available
      ? {
          tagline: available.tagline,
          places: [
            ...available.places,
            ...auto.filter(
              (place) =>
                !available.places.some((feature) =>
                  place.label.includes(feature.label),
                ),
            ),
          ].slice(0, 5),
        }
      : { tagline: auto.length ? "World Heritage Sites" : "", places: auto };
    const block = element(
      "div",
      `atlas-entry ${switched ? "atlas-switch" : "atlas-first"}`,
    );
    const heading = element("div", "atlas-heading");
    heading.append(element("h2", "", country.name));
    if (entry.tagline) heading.append(element("p", "", entry.tagline));
    block.append(heading, makeDetails(entry, cardSession.signal));
    if (switched && previous && !motion.matches) {
      previous.classList.add("atlas-outgoing");
      previous.inert = true;
      outgoingTimer = setTimeout(() => previous.remove(), 560);
    } else {
      previous?.remove();
    }
    panel.append(block);
    overlay.classList.remove("is-closing");
    overlay.hidden = false;
    overlay.inert = false;
    container.classList.add("has-country");
    form.inert = true;
    form.reset();
    results.hidden = true;
    matches = [];
    globe?.select(country);
    if (focus && !switched) back.focus({ preventScroll: true });
  }

  function closeCountry() {
    if (!current) return;
    current = null;
    overlay.inert = true;
    overlay.classList.add("is-closing");
    container.classList.remove("has-country");
    form.inert = false;
    globe?.select(null);
    input.focus({ preventScroll: true });
    closeTimer = setTimeout(
      () => {
        overlay.hidden = true;
        panel.replaceChildren();
        cardSession?.abort();
      },
      motion.matches ? 0 : 440,
    );
  }

  input.addEventListener("input", showResults, { signal });
  input.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Enter" || event.isComposing) return;
      event.preventDefault();
      if (matches[0]) select(matches[0]);
    },
    { signal },
  );
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      if (matches[0]) select(matches[0]);
    },
    { signal },
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape" || dialog) return;
      if (
        current &&
        (event.target === document.body || container.contains(event.target))
      ) {
        event.preventDefault();
        closeCountry();
      } else if (form.contains(event.target)) {
        event.preventDefault();
        form.reset();
        showResults();
        input.focus();
      }
    },
    { signal },
  );
  back.addEventListener("click", closeCountry, { signal });
  pauseButton.addEventListener("click", () => setPaused(!paused), { signal });
  motion.addEventListener("change", updateMotion, { signal });

  async function initialize() {
    const contentRequest = fetch(highlights, { signal })
      .then((response) => response.json())
      .catch(() => ({}));
    try {
      const assets = await loadGlobe(config, signal);
      countries = assets.countries;
      try {
        globe = createGlobe(
          stage,
          assets,
          config,
          { hover: showHover, select },
          signal,
        );
        globe.setPaused(paused);
        await globe.start();
      } catch {
        globe?.destroy();
        globe = null;
        stage.classList.add("atlas-static");
        status.textContent = "3D is unavailable. Search to explore countries.";
        status.hidden = false;
      }
      content = await contentRequest;
      if (signal.aborted) return;
      searchReady = true;
      form.inert = false;
      updateMotion();
    } catch {
      if (signal.aborted) return;
      stage.classList.add("atlas-static");
      status.textContent =
        "Atlas could not load. Reload the page to try again.";
      status.hidden = false;
    }
    if (!signal.aborted) container.classList.add("is-ready");
  }

  initialize();
  return {
    play: () => setPaused(false),
    pause: () => setPaused(true),
    destroy() {
      if (signal.aborted) return;
      controller.abort();
      globe?.destroy();
      cardSession?.abort();
      resultSession?.abort();
      dialogSession?.abort();
      dialog?.remove();
      clearTimeout(closeTimer);
      clearTimeout(dialogTimer);
      clearTimeout(outgoingTimer);
      panel.replaceChildren();
      results.replaceChildren();
      form.reset();
      form.inert = true;
      results.hidden =
        overlay.hidden =
        status.hidden =
        pauseButton.hidden =
          true;
      container.classList.remove("is-ready", "has-country", "is-paused");
      stage.classList.remove("atlas-static");
      showHover("");
    },
  };
}

const root = document.querySelector(".atlas");
if (root) mountAnimation(root);
