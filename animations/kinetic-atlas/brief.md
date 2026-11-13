You are a senior front-end engineer with deep expertise in GSAP (GreenSock Animation Platform), ScrollTrigger, SplitText, Draggable, Flip, MotionPath, and modern HTML/CSS/JavaScript. Build a complete, self-contained landing page that serves as a showcase of GSAP animation techniques.

**Container requirement:** Everything must live inside an element with the class `.gsap-container`. Use it as the single root wrapper for all sections, styles scoping, and script initialization. Scope all selectors and animations to this container so nothing leaks into the global page.

**Output requirement:** The landing page should span up to 10 distinct screens (full-viewport sections), each demonstrating a cohesive group of the animation categories below. Combine categories freely where they strengthen the showcase. Every category must be represented somewhere on the page:

- **Transform:** move, rotate, scale, skew
- **Opacity:** fade in/out, crossfade
- **Scroll-based:** ScrollTrigger, pinning, scrubbing
- **Parallax:** elements moving at different speeds
- **Text:** SplitText, typing, scrambling, reveals
- **SVG:** path drawing, shape morphing
- **Motion Path:** animation along custom paths
- **Stagger:** sequential element animations
- **Timeline:** complex synchronized sequences
- **3D Transforms:** perspective, rotation, depth
- **FLIP:** layout and position transitions
- **Physics:** gravity, velocity, inertia
- **Draggable:** drag, throw, snap
- **Mouse interactions:** hover, cursor-following effects
- **Touch interactions:** swipe, gesture-based animations
- **Page transitions:** enter/exit animations
- **UI animations:** menus, modals, accordions, sliders
- **Image animations:** reveals, masks, zoom, clipping
- **Canvas/WebGL:** animate graphical properties and objects
- **Looping:** infinite loops, yoyo, repeat
- **Easing:** bounce, elastic, spring-like motion
- **Responsive animations:** different animations per breakpoint
- **Scroll navigation:** smooth scrolling, scroll-to
- **SVG/Canvas particles:** particle movement and effects
- **Advanced effects:** magnetic buttons, infinite marquees, carousels, horizontal scrolling

**Content:** Generate all required content yourself: headings, body copy, labels, and navigation text; images (use CSS gradients, inline SVG, or generated canvas graphics rather than external URLs that may break); and any SVG icons or shapes needed.

**Technical standards:**

- Deliver a single, runnable HTML file with embedded CSS and JavaScript, or clearly separated files if that is cleaner. Load GSAP and its plugins from the official CDN (cdnjs or jsDelivr), and register all plugins before use.
- Use semantic HTML, accessible markup (proper headings, alt text, keyboard-operable controls, `prefers-reduced-motion` respected by disabling or simplifying motion).
- Write modern, well-organized JavaScript: one initialization function per section, no global pollution, clean cleanup of ScrollTrigger instances on resize where needed.
- Make layouts responsive across mobile, tablet, and desktop, and use `gsap.matchMedia()` for breakpoint-specific animations.
- Handle touch and pointer events so Draggable, swipe, and mouse effects work on both desktop and mobile.
- Ensure animations are smooth: animate transform and opacity where possible, and avoid layout thrashing.

**Deliverable:** Produce the complete, working code, with a brief comment at the top of each section naming which animation categories it demonstrates. Use the same color theme
