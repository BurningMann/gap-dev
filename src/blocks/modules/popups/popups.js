const popupButtons = document.querySelectorAll('[data-popup]');
const closePopup = document.querySelectorAll('.js-close-popup');
popupButtons.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const popupSlug = el.dataset.popup;

    const popup = document.querySelector(`.${popupSlug}_popup`);
    if (popup) {
      popup.classList.add('is-active');
      window.stopLenis();
    }
  });
});

closePopup.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const popup = el.closest('.popup');
    if (popup) {
      popup.classList.remove('is-active');
      window.startLenis();
    }
  });
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup')) {
    e.target.classList.remove('is-active');
    window.startLenis();
  }
});
