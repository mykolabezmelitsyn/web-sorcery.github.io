export function initPortfolio() {
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const storageKey = "portfolio-theme";
  let chosenTheme = null;

  try {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme === "dark" || storedTheme === "light") {
      chosenTheme = storedTheme;
    }
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) toggle.setAttribute("aria-pressed", String(theme === "dark"));
  };

  applyTheme(chosenTheme ?? (systemTheme.matches ? "dark" : "light"));

  systemTheme.addEventListener("change", (event) => {
    if (chosenTheme === null) applyTheme(event.matches ? "dark" : "light");
  });

  const themeToggle = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".header__nav");
  const desktop = window.matchMedia("(min-width: 48rem)");

  themeToggle.hidden = false;
  menuToggle.hidden = false;
  applyTheme(root.dataset.theme);

  themeToggle.addEventListener("click", () => {
    chosenTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(chosenTheme);
    try {
      localStorage.setItem(storageKey, chosenTheme);
    } catch {
      // Retain the chosen theme for this visit even if it cannot be saved.
    }
  });

  const setMenu = (open) => {
    menuToggle.setAttribute("aria-expanded", String(open));
    navigation.hidden = !desktop.matches && !open;
    menuToggle.querySelector("span").textContent = open ? "−" : "+";
  };

  menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || desktop.matches) return;

    setMenu(false);
    // Only move focus for anchors on this page; other links navigate normally.
    if (link.origin !== window.location.origin || link.pathname !== window.location.pathname || !link.hash) return;
    const destination = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!destination) return;

    destination.setAttribute("tabindex", "-1");
    destination.focus({ preventScroll: true });
    destination.addEventListener("blur", () => destination.removeAttribute("tabindex"), { once: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !desktop.matches && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  desktop.addEventListener("change", () => {
    const focusedNavigation = navigation.contains(document.activeElement);
    const focusedToggle = document.activeElement === menuToggle;
    setMenu(false);
    if (!desktop.matches && focusedNavigation) menuToggle.focus();
    if (desktop.matches && focusedToggle) navigation.querySelector("a").focus();
  });
  setMenu(false);

  // GSAP ANIMATION PLACEHOLDER:
  // After adding the CDN script tag in layouts/base.njk, initialize the first
  // card's [data-animation-target] here. Respect prefers-reduced-motion.
}
