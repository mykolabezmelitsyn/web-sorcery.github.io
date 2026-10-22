/* Run before stylesheets so a saved preference is applied before first paint. */
(() => {
  const key = "devdocs:theme";
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const valid = (value) => value === "dark" || value === "light";
  let preference;
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) preference = saved;
  } catch {
    /* Storage may be blocked; switching still works for this page. */
  }

  function apply() {
    document.documentElement.dataset.theme =
      preference ?? (system.matches ? "dark" : "light");
    window.dispatchEvent(new Event("themechange"));
  }

  window.SiteTheme = {
    get current() {
      return document.documentElement.dataset.theme;
    },
    toggle() {
      preference = this.current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(key, preference);
      } catch {
        /* Keep the in-memory choice. */
      }
      apply();
    },
  };
  system.addEventListener("change", () => {
    if (!preference) apply();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    preference = valid(event.newValue) ? event.newValue : undefined;
    apply();
  });
  apply();
})();
