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

  // Highlight the current page in the nav
  // Highlight the current page in the nav
  const currentPath = window.location.pathname;
  let currentPage = currentPath.split("/").pop();

  // If the URL ends with "/" treat it as the home page
  if (!currentPage || currentPage === "") {
    currentPage = "index.html";
  }

  // Remove active from all navigation links first
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    link.classList.remove("active");
  });

  // Add active only to the current page
  const currentLink = document.querySelector(
    `.nav-link[data-page="${currentPage}"]`,
  );

  if (currentLink) {
    currentLink.classList.add("active");
  }
})();
