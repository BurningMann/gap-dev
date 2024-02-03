const header = document.querySelector('.header');
const headerMobile = header.querySelector('.header__mobile-wrapper');
const headerMobileNav = header.querySelector('.header__mobile-wrapper-nav');

headerMobile.addEventListener('click', () => {
  if (headerMobile.classList.contains('is-active')) {
    headerMobileNav.style.maxHeight = '0';
    setTimeout(() => {
      headerMobileNav.classList.remove('is-active');
      headerMobile.classList.remove('is-active');
    }, 300);
  } else {
    headerMobileNav.classList.add('is-active');
    headerMobile.classList.add('is-active');
    setTimeout(() => {
      headerMobileNav.style.maxHeight = headerMobileNav.scrollHeight + 'px';
    }, 300);
  }
});
