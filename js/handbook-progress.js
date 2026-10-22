/* Shared per-guide learning progress; lesson identity is independent of filters. */
(() => {
  const content = document.querySelector("#content");
  const toolbar = document.querySelector(".toolbar");
  if (!content || !toolbar) return;

  const guide = location.pathname
    .split("/")
    .pop()
    .replace(/\.html$/, "");
  const storageKey = `devdocs:progress:v1:${guide}`;
  const initialized = new WeakSet();
  const identities = new WeakMap();
  let storageAvailable = true;

  function read() {
    let value;
    try {
      value = localStorage.getItem(storageKey);
    } catch {
      storageAvailable = false;
      return null;
    }
    try {
      const saved = JSON.parse(value);
      return new Set(
        saved?.version === 1 && Array.isArray(saved.learned)
          ? saved.learned.filter((id) => typeof id === "string")
          : [],
      );
    } catch {
      // An invalid saved value should not prevent reading or using the guide.
      return new Set();
    }
  }

  let learned = read() ?? new Set();
  const panel = document.createElement("div");
  panel.className = "guide-progress";
  panel.setAttribute("aria-label", "Learning progress");
  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  const clear = document.createElement("button");
  clear.type = "button";
  clear.textContent = "Clear progress";
  clear.setAttribute("aria-label", "Clear progress for this guide");
  panel.append(status, clear);
  toolbar.after(panel);

  function updateStatus() {
    const count = learned.size;
    status.textContent = `${count} ${count === 1 ? "entry" : "entries"} learned. ${
      storageAvailable
        ? "Progress is saved in this browser."
        : "Progress is kept for this visit only; browser storage is unavailable."
    }`;
    clear.disabled = count === 0;
  }

  function updateEntry(entry) {
    const checked = learned.has(identities.get(entry));
    entry.querySelector(".entry-progress input").checked = checked;
    entry.classList.toggle("is-learned", checked);
  }

  function sync() {
    for (const entry of content.querySelectorAll(".entry")) {
      if (initialized.has(entry)) updateEntry(entry);
    }
    updateStatus();
  }

  function decorate(entry) {
    if (initialized.has(entry)) return;
    const heading = entry.querySelector("h3, h4");
    if (!heading) return;
    // Section + lesson title stays stable when other lessons are filtered out.
    // Explicit IDs can override this when a lesson is renamed in the future.
    const identity =
      entry.dataset.progressId ||
      entry.id ||
      JSON.stringify([
        entry.closest("section")?.id ?? "guide",
        heading.textContent.trim().replace(/\s+/g, " "),
      ]);
    identities.set(entry, identity);
    initialized.add(entry);
    const control = document.createElement("div");
    control.className = "entry-progress";
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute(
      "aria-label",
      `Mark ${heading.textContent.trim()} as learned`,
    );
    // const text = document.createElement("span");
    // text.textContent = "Learned";
    // label.append(checkbox, text);
    label.append(checkbox);
    control.append(label);
    entry.prepend(control);
    updateEntry(entry);
    checkbox.addEventListener("change", () => {
      // Merge against current storage so another open tab's checks are retained.
      learned = (storageAvailable ? read() : null) ?? learned;
      if (checkbox.checked) learned.add(identity);
      else learned.delete(identity);
      try {
        localStorage.setItem(
          storageKey,
          JSON.stringify({ version: 1, learned: [...learned] }),
        );
        storageAvailable = true;
      } catch {
        storageAvailable = false;
      }
      sync();
    });
  }

  clear.addEventListener("click", () => {
    learned = new Set();
    try {
      // Only this guide's progress is removed; theme and other guides are kept.
      localStorage.removeItem(storageKey);
      storageAvailable = true;
    } catch {
      storageAvailable = false;
    }
    sync();
  });

  for (const entry of content.querySelectorAll(".entry")) decorate(entry);
  updateStatus();
  new MutationObserver((records) => {
    for (const record of records) {
      for (const added of record.addedNodes) {
        if (!(added instanceof Element)) continue;
        if (added.matches(".entry")) decorate(added);
        for (const entry of added.querySelectorAll(".entry")) decorate(entry);
      }
    }
  }).observe(content, { childList: true, subtree: true });

  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    learned = read() ?? learned;
    sync();
  });
})();
