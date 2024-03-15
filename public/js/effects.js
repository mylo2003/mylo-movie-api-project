/* EFECTOS */
const sr = ScrollReveal({
  distance: "50px",
  duration: 1000,
  reset: false,
});

sr.reveal("#banner", { delay: 200, origin: "top" });
sr.reveal("#categories", { delay: 300, origin: "left" });
sr.reveal("#trending", { delay: 300, origin: "top" });
sr.reveal("#comedy", { delay: 300, origin: "top" });
sr.reveal("#drama", { delay: 300, origin: "top" });
sr.reveal("#horror", { delay: 300, origin: "top" });

const swiperSection = () => {
  new Swiper(".swiperHome", {
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  });
};

const swiperMain = () => {
  new Swiper(".swiperMain", {
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
};

const swiperCategories = () => {
  new Swiper(".swiperCategories", {
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 30,
  });
};
