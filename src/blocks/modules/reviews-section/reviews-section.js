import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const reviewsSwiper = new Swiper('.reviews-section .swiper', {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 240,
  modules: [Navigation, Pagination],
  navigation: {
    prevEl: '.reviews-section .swiper-button.is-prev',
    nextEl: '.reviews-section .swiper-button.is-next',
  },
  pagination: {
    el: '.reviews-section .swiper-pagination',
    clickable: true,
  },

  /* loop: true, */
  /*   autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  }, */

  breakpoints: {
    1024: {
      spaceBetween: 340,
      slidesPerView: 'auto',
    },
  },
});
