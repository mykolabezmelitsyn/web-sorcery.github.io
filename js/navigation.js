const menuToggle = document.querySelector(".site-menu-toggle");
const siteMenu = document.querySelector("#site-menu");

function setMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu",
  );
  siteMenu.hidden = !open;
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(siteMenu.hidden);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-topbar")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !siteMenu.hidden) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

siteMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("focusin", (event) => {
  if (!event.target.closest(".site-topbar")) {
    setMenuOpen(false);
  }
});

const themeToggle = document.querySelector(".site-theme-toggle");
if (themeToggle && window.SiteTheme) {
  function updateThemeButton() {
    const next = window.SiteTheme.current === "dark" ? "light" : "dark";
    // themeToggle.querySelector(".theme-label").textContent = next === "dark" ? "Dark" : "Light";
    themeToggle.setAttribute("aria-label", "Switch to " + next + " theme");
    themeToggle.title = "Switch to " + next + " theme";
  }
  themeToggle.hidden = false;
  themeToggle.addEventListener("click", () => window.SiteTheme.toggle());
  window.addEventListener("themechange", updateThemeButton);
  updateThemeButton();
}
