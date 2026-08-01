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
    const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl, {
      toggle: false,
    });

    collapseEl.querySelectorAll(".nav-link, .btn").forEach((link) => {
      link.addEventListener("click", () => {
        if (collapseEl.classList.contains("show")) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Highlight the current page in the nav
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
})();
