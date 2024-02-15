import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

/* import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules'; */

/* Base scripts */

/* Проверка на safari */
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  document.querySelector('html').classList.add('is-safari');
}

/* Проверка на ios */
function isIpad() {
  if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
    return true;
  }
}
function isIOS() {
  return isIpad() || /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isMac() {
  return navigator.userAgent.match(/Mac/);
}

if (isIOS() || isMac()) {
  document.querySelector('html').classList.add('is-OSX');
}

/* Проверка на моб девайс */

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  ) || isIOS();
if (isMobile) {
  document.querySelector('html').classList.add('is-mobile');
}

/* Проверка ширины экрана */
/* function checkInnerWidth(width) {
  if (window.innerWidth <= width) {
    return true;
  } else {
    return false;
  }
} */

/* POPUPS */
/* $('[data-popup]').click(function (e) {
  e.preventDefault();
  let popup = $(this).data('popup');
  $(`.${popup}_popup`).fadeIn();
  $('body,html').addClass('noskroll');
});

$('.popup__close').click(function () {
  let popup = $(this).closest('.popup');
  $(popup).fadeOut();
  $('body,html').removeClass('noskroll');
}); */

/* FORM ERRORS */
/* 
const contactForm = document.querySelectorAll('.contacts-form');
contactForm.forEach((el) => {
  el.addEventListener('submit', function (event) {
    let errors = 0;

    const fields = el.querySelectorAll('.input');
    fields.forEach((field) => {
      const error = field.closest('.form-field-box').querySelector('.field-error');
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (field.classList.contains('is-required') && !field.value) {
        errors++;
        field.classList.add('is-error');
        if (error) {
          error.classList.add('is-visible');
          error.innerHTML = 'Field is required';
        }
      } else if (field.classList.contains('is-email') && !field.value.match(mailformat)) {
        errors++;
        field.classList.add('is-error');
        if (error) {
          error.classList.add('is-visible');
          error.innerHTML = 'The field is filled incorrectly';
        }
      }
    });

    if (errors) {
      event.preventDefault();
      return false;
    }
  });
});

const fields = document.querySelectorAll('form .input');
fields.forEach((el) => {
  const error = el.closest('.form-field-box').querySelector('.field-error');
  el.addEventListener('input', function (event) {
    el.classList.remove('is-error');
    if (error) {
      error.classList.remove('is-visible');
      error.innerHTML = '';
    }
  });
}); */

/* Lazy load */
/* var observer = lozad('[data-lazysrc]', {
  threshold: 0.1,
  enableAutoReload: true,
  load: function(el) {
    el.src = el.getAttribute("data-lazysrc");
    // el.srcset = el.getAttribute("data-lazysrc");
    el.onload = function() {
      $(el).addClass("load")
    }
  }
})
observer.observe()

var pictureObserver = lozad('.lozad', {
  threshold: 0.1
})
pictureObserver.observe() */
gsap.registerPlugin(ScrollTrigger);

window.startLenis = () => {
  window.lenis = new Lenis();
  document.querySelector('html').classList.remove('noskroll');
  document.querySelector('body').classList.remove('noskroll');

  window.lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);

  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

window.stopLenis = () => {
  window.lenis.destroy();
  document.querySelector('html').classList.add('noskroll');
  document.querySelector('body').classList.add('noskroll');
};

setTimeout(() => {
  window.startLenis();
}, 0);

/* navigation */
const navLinks = document.querySelectorAll('.js-navigate-link');
navLinks.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const id = el.getAttribute('href')?.slice(1);
    if (!id) return;
    const offset = el.dataset.headerOffset ? 0 - document.querySelector('.header').offsetHeight : 0;
    const target = id === 'start' ? document.querySelector('body') : document.getElementById(id);
    window.lenis.scrollTo(target, { offset });
  });
});

/* Start fansybox */
Fancybox.bind('[data-fancybox]', {
  Hash: false,
});

/* Start phone mask */

import { MaskInput } from 'maska';

(() => {
  const maskList = [
    {
      name: 'Russia',
      code: '+7',
      iso: 'RU',
      flag: 'https://cdn.kcak11.com/CountryFlags/countries/ru.svg',
      mask: '(###)###-##-##',
    },
    {
      name: 'Belarus',
      code: '+375',
      iso: 'BY',
      flag: 'https://cdn.kcak11.com/CountryFlags/countries/by.svg',
      mask: '(##)###-##-##',
    },
  ];

  new MaskInput('input', {
    mask: `${maskList[0].code}${maskList[0].mask}`,
    eager: true,
    onMaska: (detail) => console.log(detail.completed),
  });
})();

/* file input */

(() => {
  const inputs = document.querySelectorAll('.file-input');
  inputs.forEach((el) => {
    const input = el.querySelector('input');
    const name = el.querySelector('.file-input__name');
    el.addEventListener('click', (e) => {
      const placeholder = input.placeholder;
      if (el.classList.contains('is-active')) {
        e.preventDefault();
        input.value = '';
        el.title = '';
        name.innerHTML = placeholder;
        el.classList.remove('is-active');
      }
    });
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (file) {
        name.innerHTML = file.name;
        el.title = file.name;
        el.classList.add('is-active');
      }
    });
  });
})();
import './import/modules';
import './import/components';
