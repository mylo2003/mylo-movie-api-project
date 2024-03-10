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


const sr = ScrollReveal ({
  distance: '50px',
  duration: 1000,
  reset: false
}); 


sr.reveal('#banner', {delay: 200, origin: 'top'});
sr.reveal('#categories', {delay: 200, origin: 'left'});
sr.reveal('#trending', {delay: 200, origin: 'top'});
sr.reveal('#comedy', {delay: 200, origin: 'top'});
sr.reveal('#drama', {delay: 200, origin: 'top'});
sr.reveal('#horror', {delay: 200, origin: 'top'});

const menu = document.querySelector('#menu-icon');
const i = document.querySelector('#icon');
const navList = document.querySelector('.nav-list');
const etiquetas = document.querySelectorAll('.e');

function cerrar () {
  i.classList.toggle('bx-x');

  if(navList.classList.contains('-right-full')){
    navList.classList.replace('-right-full', 'right-0');
  } else {
    navList.classList.replace('right-0', '-right-full');
  }
}

menu.addEventListener('click', cerrar);

etiquetas.forEach(element => {
  element.addEventListener('click', cerrar);
});

