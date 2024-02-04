import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const servicesSection = document.querySelector('.services-section');

if (servicesSection) {
  const servicesCointainer = servicesSection.querySelectorAll('.service-row__container');
  const services = servicesSection.querySelectorAll('.service-row');

  /* services.forEach((el) => {
    const contentBox = el.querySelector('.service-row__box');
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: `top+=${window.innerHeight}px top`,
        pin: true,
        markers: true,
        onEnter: () => {
          contentBox.classList.add('is-open');
          console.log(4449);
        },
        onLeave: () => {
          contentBox.classList.remove('is-open');
          console.log(4449);
        },
      },
    });
  }); */

  /*   gsap.to('.service-row', {
    yPercent: -100,
    ease: 'none',
    stagger: 0.5,
    scrollTrigger: {
      trigger: servicesCointainer,
      start: 'top top',
      end: '+=300%',
      scrub: true,
      pin: true,
    },
  }); */

  /* gsap.set('.service-row', { zIndex: (i, target, targets) => targets.length - i }); */

  const textSection = document.querySelector('.services-section__bottom');
  const textSectionContent = textSection.querySelector('.services-section__bottom-text');
  const textSectionDecor = textSection.querySelector('.services-section__bottom-decor');

  class Paragraph {
    constructor(el, _delay = 0.025) {
      this.el = el;
      this.delay = _delay;
      this.html = this.el.innerHTML;
      this.clean();
      this.setTL();
    }

    show() {
      this.tl.play();
    }

    hide() {
      this.tl.reverse();
    }

    setTL() {
      let spans = this.el.querySelectorAll('span');
      spans = Array.prototype.slice.call(spans).sort(() => 0.5 - Math.random());
      this.tl = gsap.timeline({
        paused: true,
      });
      for (let i = 0; i < spans.length; i++) {
        this.tl.to(
          spans[i],
          {
            duration: Math.random() * 0.35 + 0.35,
            ease: 'bounce.in',
            opacity: 1,
          },
          Math.random() * 0.5
        );
      }
    }

    clean() {
      let words = this.html.replace(/\s\s+/g, ' ').split(' ');
      let clean = [];
      let txt = '';
      for (var i = 0; i < words.length; i++) {
        let word = words[i];
        txt += word + ' ';
        if (txt.length < 8 && i != words.length - 1) {
          continue;
        }
        clean.push(txt);
        txt = '';
      }
      this.words = clean;
      this.set();
    }

    open(str) {
      if (str.indexOf('<b>') >= 0) return 'b';
      else if (str.indexOf('<u>') >= 0) return 'u';
      else return false;
    }

    close(str) {
      return str.indexOf('</b>') >= 0 || str.indexOf('</u>') >= 0; // || str.indexOf(")") >= 0);
    }

    set() {
      let words = [];
      let txt = '';
      let openTag = false;
      for (let i = 0; i < this.words.length; i++) {
        let word = this.words[i];
        if (this.open(word) && this.close(word)) {
          words.push(' ' + word);
        } else {
          if (this.open(word)) {
            this.open_tag = this.open(word);
            txt = ' ';
            openTag = true;
          }
          if (openTag) {
            txt += ' ' + word;
            if (txt.length > 14 && !this.close(word)) {
              txt += '</' + this.open_tag + '>';
              words.push(txt);
              txt = '<' + this.open_tag + '>';
            }
          } else words.push(word);
          if (this.close(word)) {
            words.push(txt + ' ');
            openTag = false;
            txt = '';
          }
        }
      }
      this.seted = true;
      this.setWords(words);
    }

    setWords(words) {
      let html = '';
      for (var i = 0; i < words.length; i++) html += '<span> ' + words[i] + '</span> ';
      this.el.innerHTML = html;
      this.spans = this.el.querySelectorAll('span');
    }

    destroy() {
      this.el.innerHTML = this.html;
      delete this.spans;
      delete this.words;
      delete this.el;
      delete this;
    }
  }
  const _text = new Paragraph(textSectionContent);

  gsap.to(textSection, {
    scrollTrigger: {
      trigger: textSection,
      start: '30% 50%',
      end: `bottom 50%`,
      onEnter: () => {
        console.log(4449);
        _text.show();
      },
    },
  });

  gsap.to(textSectionDecor, {
    scrollTrigger: {
      trigger: textSection,
      start: '30% 50%',
      end: `bottom 50%`,
    },
    duration: Math.random() * 0.35 + 0.35,
    ease: 'bounce.in',
    opacity: 1,
  });
}
