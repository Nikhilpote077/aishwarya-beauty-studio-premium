/* ===========================================================
   GALLERY FILTER — optional category tabs (Bridal / Party / etc.)
   Only runs if .gallery-filter-btn elements exist on the page.
=========================================================== */
(function () {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  if (!filterBtns.length) return;

  const items = document.querySelectorAll("[data-category]");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      items.forEach((item) => {
        const show = filter === "all" || item.dataset.category === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });
})();

/* ===========================================================
   GALLERY LIGHTBOX — click any .gallery-item image to open a
   full-screen viewer with prev/next/close and keyboard support
=========================================================== */
(function () {
  const items = document.querySelectorAll("[data-lightbox] img");
  if (!items.length) return;

  const images = Array.from(items).map((img) => img.currentSrc || img.src);
  let currentIndex = 0;

  // Build the lightbox markup once
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close gallery"><i class="bi bi-x-lg"></i></button>
    <button class="lightbox-prev" aria-label="Previous image"><i class="bi bi-chevron-left"></i></button>
    <img src="" alt="Portfolio image preview" />
    <button class="lightbox-next" aria-label="Next image"><i class="bi bi-chevron-right"></i></button>
    <div class="lightbox-counter"></div>
  `;
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector("img");
  const counterEl = lightbox.querySelector(".lightbox-counter");

  const show = (index) => {
    currentIndex = (index + images.length) % images.length;
    imgEl.src = images[currentIndex];
    counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
  };

  const open = (index) => {
    show(index);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  items.forEach((img, index) => {
    img.closest("[data-lightbox]").style.cursor = "zoom-in";
    img.closest("[data-lightbox]").addEventListener("click", () => open(index));
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", close);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => show(currentIndex - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => show(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });
})();
