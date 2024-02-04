import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

gsap.to('.team-section__footer', {
  scrollTrigger: {
    trigger: '.team-section__footer',
    start: 'top bottom',
    once: true,
    onEnter: () => {
      const obj = document.querySelectorAll('.team-section__footer-col-number span');
      obj.forEach((el) => {
        animateValue(el, 0, Number(el.innerHTML), 2000);
      });
    },
  },
});
