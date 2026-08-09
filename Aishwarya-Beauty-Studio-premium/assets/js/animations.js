/* ===========================================================
   ANIMATIONS — AOS init, scroll progress, counters, reveals,
   back-to-top button, loading screen dismissal
=========================================================== */
(function () {
  /* ---- AOS (scroll reveal library) ---- */
  if (window.AOS) {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }

  /* ---- Loading screen ---- */
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("loader-hide"), 500);
    });
    // Safety net: never let the loader trap the page for more than 2.5s
    setTimeout(() => loader.classList.add("loader-hide"), 2500);
  }

  /* ---- Scroll progress bar ---- */
  const progressBar = document.querySelector(".progress-bar-scroll");
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = percent + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
  }

  /* ---- Animated counters (only run once each element enters view) ---- */
  const counters = document.querySelectorAll(".counter");
  if (counters.length) {
    const animateCounter = (el) => {
      const target = +el.dataset.target;
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        el.textContent = Math.floor(eased * target) + (el.dataset.suffix || "");

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + (el.dataset.suffix || "");
        }
      };

      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* ---- Generic fade-up reveal for elements not using AOS ---- */
  const revealEls = document.querySelectorAll(".fade-up");
  if (revealEls.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---- Back-to-top button ---- */
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => {
        backToTop.classList.toggle("show", window.scrollY > 500);
      },
      { passive: true },
    );
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
