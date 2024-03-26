/* EFECTOS */
const sr = ScrollReveal({
  distance: "50px",
  duration: 500,
  reset: false,
});

sr.reveal("#banner", { delay: 200, origin: "top" });
sr.reveal("#categories", { delay: 300, origin: "left" });
sr.reveal("#trending", { delay: 300, origin: "top" });
sr.reveal("#nowPlaying", { delay: 300, origin: "top" });
sr.reveal("#popular", { delay: 300, origin: "top" });
sr.reveal("#toprated", { delay: 300, origin: "top" });
sr.reveal("#upcoming", { delay: 300, origin: "top" });

const swiperSection = () => {
  new Swiper(".swiperSection", {
    grabCursor: true,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
      640: {
        spaceBetween: 20,
        slidesPerView: "auto",
      },
      768: {
        centeredSlides: false,
        slidesPerView: "auto",
      },
      1024: {
        centeredSlides: false,
        slidesPerView: "auto",
      },
    },
  });
};

const swiperBanner = () => {
  new Swiper(".swiperBanner", {
    grabCursor: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: ["-120%", 0, -500],
      },
      next: {
        translate: ["120%", 0, -500],
      },
    },
  });
};

const swiperCategories = () => {
  new Swiper(".swiperCategories", {
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 30,
  });
};
