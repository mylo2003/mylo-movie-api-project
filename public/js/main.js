import { API_KEY } from "/src/js/api-key.js";

console.log(API_KEY);

const swiper = new Swiper(".swiperHome", {
  slidesPerView: "auto",
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});


const swiperMain = new Swiper(".swiperMain", {
  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-120%", 0, -500],
    },
    next: {
      shadow: true,
      translate: ["120%", 0, -500],
    },
  },
});


const swiperCategories = new Swiper(".swiperCategories", {
  slidesPerView: 'auto',
  grabCursor: true,
  centeredSlides: true,
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 5,
    },
  },
});