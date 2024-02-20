import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  const phoneInputs = document.querySelectorAll('.phone-input');

  phoneInputs.forEach((el) => {
    const input = el.querySelector('.input');
    const dropdown = el.querySelector('.phone-input__mask-switch-dropdown');
    const current = el.querySelector('.phone-input__mask-switch-current');
    let mask = null;
    function setMask(maskItem) {
      mask = new MaskInput(input, {
        mask: `${maskItem.code}${maskItem.mask}`,
        eager: true,
        onMaska: (detail) => {
          if (detail.completed) {
            el.classList.add('is-valid');
          } else {
            el.classList.remove('is-valid');
          }
        },
      });
    }
    setMask(maskList[0]);

    maskList.forEach((item) => {
      var div = document.createElement('div');
      div.innerHTML = `<div class="phone-input__dropdown-item"><img src="${item.flag}" class="phone-input__main-icon"> ${item.name} ${item.code}</div>`;
      dropdown.appendChild(div);

      div.addEventListener('click', (e) => {
        current.innerHTML = `<img src="${item.flag}" class="phone-input__main-icon">`;
        input.value = '+';
        mask.destroy();
        setMask(item);
      });
    });
    current.innerHTML = `<img src="${maskList[0].flag}" class="phone-input__main-icon">`;

    current.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle('is-active');
    });

    input.addEventListener('focus', () => {
      if (!input.value) {
        input.value = '+';
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.phone-input__mask-switch')) {
      document
        .querySelectorAll('.phone-input__mask-switch-dropdown.is-active')
        .forEach((el) => el.classList.remove('is-active'));
    }
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
const toastData = {
  success: {
    icon: '<svg viewBox="0 0 32 32" width="1.25rem" height="1.25rem" style="overflow: visible;"><circle cx="16" cy="16" r="0" fill="#34C759"><animate attributeName="opacity" values="0; 1; 1" dur="0.35s" begin="100ms" fill="freeze" calcMode="spline" keyTimes="0; 0.6; 1" keySplines="0.25 0.71 0.4 0.88; .59 .22 .87 .63"></animate><animate attributeName="r" values="0; 17.5; 16" dur="0.35s" begin="100ms" fill="freeze" calcMode="spline" keyTimes="0; 0.6; 1" keySplines="0.25 0.71 0.4 0.88; .59 .22 .87 .63"></animate></circle><circle cx="16" cy="16" r="12" opacity="0" fill="#34C759"><animate attributeName="opacity" values="1; 0" dur="1s" begin="350ms" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.0 0.0 0.2 1"></animate><animate attributeName="r" values="12; 26" dur="1s" begin="350ms" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.0 0.0 0.2 1"></animate></circle><path fill="none" stroke-width="4" stroke-dasharray="22" stroke-dashoffset="22" stroke-linecap="round" stroke-miterlimit="10" d="M9.8,17.2l3.8,3.6c0.1,0.1,0.3,0.1,0.4,0l9.6-9.7" stroke="#FCFCFC"><animate attributeName="stroke-dashoffset" values="22;0" dur="0.25s" begin="250ms" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.0, 0.0, 0.58, 1.0"></animate></path></svg>',
  },
  error: {
    icon: '<svg viewBox="0 0 32 32" width="1.25rem" height="1.25rem" style="overflow: visible;"><circle cx="16" cy="16" r="0" fill="#FF3B30"><animate attributeName="opacity" values="0; 1; 1" dur="0.35s" begin="100ms" fill="freeze" calcMode="spline" keyTimes="0; 0.6; 1" keySplines="0.25 0.71 0.4 0.88; .59 .22 .87 .63"></animate><animate attributeName="r" values="0; 17.5; 16" dur="0.35s" begin="100ms" fill="freeze" calcMode="spline" keyTimes="0; 0.6; 1" keySplines="0.25 0.71 0.4 0.88; .59 .22 .87 .63"></animate></circle><circle cx="16" cy="16" r="12" opacity="0" fill="#FF3B30"><animate attributeName="opacity" values="1; 0" dur="1s" begin="320ms" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.0 0.0 0.2 1"></animate><animate attributeName="r" values="12; 26" dur="1s" begin="320ms" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.0 0.0 0.2 1"></animate></circle><path fill="none" stroke-width="4" stroke-dasharray="9" stroke-dashoffset="9" stroke-linecap="round" d="M16,7l0,9" stroke="#FFFFFF"><animate attributeName="stroke-dashoffset" values="9;0" dur="0.2s" begin="250ms" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.0, 0.0, 0.58, 1.0"></animate></path><circle cx="16" cy="23" r="2.5" opacity="0" fill="#FFFFFF"><animate attributeName="opacity" values="0;1" dur="0.25s" begin="350ms" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.0, 0.0, 0.58, 1.0"></animate></circle></svg>',
  },
};
let toastTimeout = null;
function activateToast(text, type, delay) {
  const toast = document.querySelector('.custom-toast');
  if (!toast) return false;

  const toastIcon = toast.querySelector('.custom-toast__icon');
  const toastText = toast.querySelector('.custom-toast__text');

  toastIcon.innerHTML = toastData[type].icon;
  toastText.innerHTML = text;
  toast.classList.add('is-enter');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-enter');
    toast.classList.add('is-out');
    setTimeout(() => {
      toast.classList.remove('is-out');
      toastIcon.innerHTML = '';
      toastText.innerHTML = '';
    }, 300);
  }, delay);
}

/* FORM ERRORS */
const validateForms = document.querySelectorAll('.js-validate-form');
validateForms.forEach((el) => {
  el.addEventListener('submit', function (event) {
    let errors = 0;
    const fields = el.querySelectorAll('.form-input');
    fields.forEach((field) => {
      const input = field.querySelector('.input');
      if (input) {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (field.classList.contains('is-checkbox') && field.classList.contains('is-required') && !input.checked) {
          errors++;
          field.classList.add('is-error');
        } else if (field.classList.contains('is-email') && input.value && !input.value.match(mailformat)) {
          errors++;
          field.classList.add('is-error');
        } else if (
          field.classList.contains('is-required') &&
          field.classList.contains('is-phone') &&
          !field.classList.contains('is-valid')
        ) {
          errors++;
          field.classList.add('is-error');
        } else if (field.classList.contains('is-required') && !input.value) {
          errors++;
          field.classList.add('is-error');
        }
      }
    });

    if (errors) {
      event.preventDefault();
      activateToast('Заполните обязательные поля', 'error', 2000);
      return false;
    }
  });
});

const fields = document.querySelectorAll('.js-validate-form .form-input');
fields.forEach((field) => {
  const input = field.querySelector('.input');
  if (input) {
    input.addEventListener('input', function () {
      field.classList.remove('is-error');
    });
  }
});

import './import/modules';
import './import/components';
