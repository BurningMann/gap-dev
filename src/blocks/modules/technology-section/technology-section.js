import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const servicesSection = document.querySelector('.technology-section');

if (servicesSection) {
  let tags = servicesSection.querySelectorAll('.technology-section__tag');
  const tl = gsap.timeline({
    paused: true,
  });
  for (let i = 0; i < tags.length; i++) {
    tl.to(
      tags[i],
      {
        duration: Math.random() * 0.5 + 0.35,
        ease: 'expo.inOut',
        /* ease: 'bounce.inOut', */
        opacity: 1,
        translateX: 0,
      },
      Math.random() * 0.5
    );
  }

  gsap.to('.technology-section__wrapper', {
    scrollTrigger: {
      trigger: '.technology-section__wrapper',
      start: 'top 50%',
      end: `bottom 50%`,
      onEnter: () => {
        tl.play();
      },
    },
  });
}
