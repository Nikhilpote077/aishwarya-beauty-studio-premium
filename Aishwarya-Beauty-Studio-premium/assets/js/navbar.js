/* ===========================================================
   NAVBAR — sticky/solid state on scroll + mobile menu behavior
=========================================================== */
(function () {
  const navbar = document.querySelector(".custom-navbar");
  if (!navbar) return;

  const setScrolledState = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  // Run once on load (in case the page loads already scrolled) and on scroll
  setScrolledState();
  window.addEventListener("scroll", setScrolledState, { passive: true });

  // Auto-close the mobile menu after a link is tapped
  const collapseEl = document.getElementById("navbarMenu");
  if (collapseEl && window.bootstrap) {
    const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(
      collapseEl,
      {
        toggle: false,
      },
    );

    collapseEl.querySelectorAll(".nav-link, .btn").forEach((link) => {
      link.addEventListener("click", () => {
        if (collapseEl.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }
  // Active navigation is controlled by each page's HTML.
  // No JavaScript needed here.
})();
