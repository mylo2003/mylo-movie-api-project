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

const swiperTrending = () => {
  new Swiper(".swiperTrending", {
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

const swiperPlaying = () => {
  new Swiper(".swiperPlaying", {
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

const swiperPopular = () => {
  new Swiper(".swiperPopular", {
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

const swiperRated = () => {
  new Swiper(".swiperRated", {
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

const swiperComing = () => {
  new Swiper(".swiperComing", {
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
    loop: true,
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
