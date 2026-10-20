(() => {
  const lab = document.querySelector("#timeline-lab");
  if (!lab) return;
  const status = document.querySelector("#lab-status");
  const progress = document.querySelector("#lab-progress");
  const output = document.querySelector("#lab-output");
  let started = false;
  function loadGSAP() {
    if (window.gsap) return Promise.resolve(window.gsap);
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js";
      script.onload = () =>
        window.gsap
          ? resolve(window.gsap)
          : reject(new Error("GSAP unavailable"));
      script.onerror = reject;
      document.head.append(script);
    });
  }
  lab.addEventListener("toggle", async () => {
    if (!lab.open || started) return;
    started = true;
    status.textContent = "Loading the interactive example…";
    try {
      const gsap = await loadGSAP();
      let timeline;
      const first = lab.querySelector(".lab-first");
      const second = lab.querySelector(".lab-second");
      const sync = () => {
        const value = Math.round(timeline.progress() * 100);
        progress.value = value;
        output.value = value + "%";
      };
      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const reduced = context.conditions.reduced;
          timeline = gsap.timeline({ paused: true, onUpdate: sync });
          const distance = () =>
            Math.max(0, first.parentElement.clientWidth - first.offsetWidth);
          timeline
            .fromTo(
              first,
              reduced ? { opacity: 1 } : { x: 0 },
              {
                ...(reduced ? { opacity: 0.35 } : { x: distance }),
                duration: 1,
                ease: "power2.out",
              },
              0,
            )
            .fromTo(
              second,
              reduced ? { opacity: 1 } : { x: 0 },
              {
                ...(reduced ? { opacity: 0.35 } : { x: distance }),
                duration: 1,
                ease: "power2.out",
              },
              0.35,
            );
          progress.value = 0;
          output.value = "0%";
          status.textContent = reduced
            ? "Ready. Reduced motion uses opacity changes instead of travel."
            : "Ready. The blue and purple tweens share one 1.35-second timeline.";
        },
      );
      document.querySelector("#lab-play").onclick = () => timeline.play();
      document.querySelector("#lab-pause").onclick = () => timeline.pause();
      document.querySelector("#lab-reverse").onclick = () => timeline.reverse();
      document.querySelector("#lab-restart").onclick = () => timeline.restart();
      progress.addEventListener("input", () => {
        timeline.pause().progress(Number(progress.value) / 100);
        sync();
      });
      const observer = new ResizeObserver(() => {
        const position = timeline.progress();
        timeline.invalidate().progress(position);
      });
      observer.observe(lab.querySelector(".lab-stage"));
      lab.addEventListener("toggle", () => {
        if (!lab.open) timeline.pause();
      });
      lab.querySelectorAll("button, input").forEach((control) => {
        control.disabled = false;
      });
      window.addEventListener("pagehide", (event) => {
        timeline.pause();
        // Keep the lab usable when Back/Forward restores this document.
        if (!event.persisted) {
          observer.disconnect();
          mm.revert();
        }
      });
    } catch {
      status.textContent =
        "The demo could not load. The handbook and all code examples remain available. Close and reopen this lab to retry.";
      started = false;
    }
  });
})();
