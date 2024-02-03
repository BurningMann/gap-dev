import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// import Swiper and modules styles
/* import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; */
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

const lenis = new Lenis();
gsap.registerPlugin(ScrollTrigger);
setTimeout(() => {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}, 0);

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
