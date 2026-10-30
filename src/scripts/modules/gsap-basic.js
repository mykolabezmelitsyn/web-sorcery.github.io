import {gsap} from "gsap";

export function initGSAPBasicAnimation() {
  const toggleButton = document.querySelector('[data-gsap-play="basic"]')
  const element = document.querySelector('[data-gsap-example="basic"]')

  let textAnimation = gsap.to(element, {
    x: -100,
    scale: 0.8,
    rotation: -10,
    duration: 1,
    paused: true,
    immediateRender: false
  });

  toggleButton.addEventListener('click', function () {
    textAnimation.paused(!textAnimation.paused());
  })
}
