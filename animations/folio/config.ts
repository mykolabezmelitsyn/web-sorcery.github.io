const DESKTOP_LAYOUT = {
  titleAreaVh: 80,
  titleTopVh: 10,
  titleMidVh: 40,
  titleSlotVh: 80 / 9,
  titleVisible: 9,
  titleFontVhMax: 4.5,
  titleFontVhMin: 4.2,
  imageWrapperTopVh: 0,
  imageWrapperHeightVh: 100,
  imageWrapperMidViewportVh: 50,
  imageHeightVh: 60,
  imageGapVh: 5,
  imagePitchVh: 65,
  imageOffsetPx: 0,
  pixelsPerItem: 600,
};

const MOBILE_LAYOUT = {
  titleAreaVh: 50,
  titleTopVh: 0,
  titleMidVh: 45,
  titleSlotVh: 50 / 5,
  titleVisible: 5,
  titleFontVhMax: 2.6,
  titleFontVhMin: 2.5,
  imageWrapperTopVh: 50,
  imageWrapperHeightVh: 50,
  imageWrapperMidViewportVh: 69,
  imageHeightVh: 38,
  imageGapVh: 4,
  imagePitchVh: 42,
  imageOffsetPx: 20,
  pixelsPerItem: 120,
};

export const CONFIG = {
  desktop: DESKTOP_LAYOUT, // Two-column geometry in dynamic viewport units.
  mobile: MOBILE_LAYOUT, // Stacked geometry and touch sensitivity.
  mobileQuery: "(max-width: 767px)", // Switch both strips together.
  copies: 3, // Identical sets on either side of the working copy.
  wheelCap: 200, // Maximum pixels accepted per wheel or touch event.
  smoothing: 0.14, // Per-frame pursuit of the input target at 60 Hz.
  snapMs: 90, // Quiet period before rounding to a project.
  nearOpacity: 0.78, // Opacity one photo away.
  farOpacity: 0.18, // Opacity two or more photos away.
  nearScale: 0.93, // Scale one photo away.
  farScale: 0.84, // Scale two or more photos away.
  rowOpacity: 0.7, // Opacity of inactive titles.
  baseWeight: 420, // Weight of distant rows.
  weightRange: 200, // Weight gain near the active row.
  hoverWeight: 80, // Additional weight for the hovered title.
  hoverLerp: 0.18, // Weight interpolation at 60 Hz.
  colourFalloff: 2, // Active title colour falloff.
  typeFalloff: 0.55, // Title size and weight falloff.
  creditFalloff: 2.8, // Active credit falloff.
  cursorLerp: 0.22, // View ring pointer pursuit at 60 Hz.
  mask: 20, // Top and bottom mask zone in pixels.
  photoRadius: 16, // Shared image corner radius in pixels.
  entranceSeconds: 1.7, // Auto-scroll duration.
  entranceDistance: 1.4, // Minimum number of archive lengths covered.
  stripSeconds: 0.9, // Entrance fade, scale and blur duration.
  stripStagger: 0.06, // Photo reveal trails the title reveal.
  chromeDelay: 0.5, // Counter enters after the strips begin moving.
  chromeSeconds: 0.7, // Counter entrance duration.
  navigateSeconds: 0.85, // Base click navigation duration.
  navigatePerStep: 0.11, // Added seconds per traversed project.
  openSeconds: 0.95, // Shared image and title travel into detail.
  closeSeconds: 0.85, // Shared image and title travel back into the reel.
  closeDelay: 0.05, // Give accessories a head start when closing.
  scrimOpen: { duration: 0.45, ease: "power2.out" }, // Detail background fades in under the flight.
  scrimClose: { duration: 0.55, delay: 0.25, ease: "power2.in" }, // Reel appears under the reverse flight.
  detailReveal: { duration: 0.9, stagger: 0.05, delay: 0.25 }, // Accessory rows trail the shared elements.
  detailRecede: { duration: 0.35, stagger: 0.03, ease: "power3.in" }, // Accessories leave first.
  openEase: "power4.out", // Entrance and detail reveal deceleration.
  travelEase: "power3.inOut", // Click navigation and reverse FLIP easing.
  contact: "mailto:?subject=Folio%20project%20enquiry", // Replace with the portfolio owner's inbox.
};

export type FolioConfig = typeof CONFIG;
