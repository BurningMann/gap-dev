import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const casesSwiper = new Swiper('.cases-section .swiper', {
  slidesPerView: 'auto',
  centeredSlides: false,
  spaceBetween: 20,
  modules: [Navigation, Pagination],
  navigation: {
    prevEl: '.cases-section .swiper-button.is-prev',
    nextEl: '.cases-section .swiper-button.is-next',
  },
  pagination: {
    el: '.cases-section .swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    1024: {
      slidesPerView: 2,
    },
  },
});
