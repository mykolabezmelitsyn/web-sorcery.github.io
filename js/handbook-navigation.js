(() => {
  const nav = document.querySelector("#nav");
  const content = document.querySelector("#content");
  if (!nav || !content) return;

  let frame = null;

  function updateActive() {
    frame = null;
    const sections = [...content.querySelectorAll("section")];
    const midpoint = window.innerHeight / 2;
    // Keep the current section active until the next heading crosses the center.
    let selected = sections[0];
    for (const section of sections) {
      const heading = section.querySelector("h2");
      if (!heading) continue;
      const rect = heading.getBoundingClientRect();
      if (rect.top + rect.height / 2 <= midpoint) selected = section;
      else break;
    }

    for (const link of nav.querySelectorAll("a")) {
      const active = link.getAttribute("href") === "#" + selected?.id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }

  function scheduleUpdate() {
    if (frame === null) frame = requestAnimationFrame(updateActive);
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("hashchange", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);
  // Search rebuilds both the sections and the menu.
  new MutationObserver(scheduleUpdate).observe(content, { childList: true });
  scheduleUpdate();
})();
