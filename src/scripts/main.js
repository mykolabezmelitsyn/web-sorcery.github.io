import { initPortfolio } from "./modules/portfolio.js";
import { initShowcase } from "./modules/gsap-showcase.js";

document.documentElement.classList.replace("no-js", "js");
initPortfolio();
initShowcase(document.querySelector(".gsap-container"));
