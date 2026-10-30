export function initMotion() {
  const card = document.querySelector("[data-motion-card]");
  const gsap = window.gsap;
  if (!card || !gsap) return () => {};

  const media = gsap.matchMedia();
  let played = false;

  media.add("(prefers-reduced-motion: no-preference)", () => {
    // Nothing is pre-hidden: a failed CDN request never obscures the content.
    const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
      .from("[data-star]", { scale: 0.45, rotation: -100, duration: 1.4 })
      .from("[data-orbit]", { scale: 0.6, opacity: 0, duration: 1 }, 0.15);

    if (played) {
      timeline.progress(1);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      played = true;
      timeline.play();
      observer.disconnect();
    }, { threshold: 0.25 });

    observer.observe(card);
    return () => observer.disconnect();
  }, card);

  return () => media.revert();
}
