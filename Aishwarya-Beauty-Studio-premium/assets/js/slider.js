/* ===========================================================
   SLIDER — Swiper init for the testimonials carousel
   (only runs if a .testimonialSwiper element exists on the page)
=========================================================== */
(function () {
  const el = document.querySelector(".testimonialSwiper");
  if (!el || typeof Swiper === "undefined") return;

  new Swiper(".testimonialSwiper", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    spaceBetween: 28,
    slidesPerView: 1,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
  });
})();
