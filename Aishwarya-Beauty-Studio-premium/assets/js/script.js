/* ===========================================================
   MAIN SCRIPT — form validation & mock submit, FAQ accordion,
   footer year
=========================================================== */
(function () {
  /* ---- Footer year ---- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- FAQ accordion (no Bootstrap JS dependency) ---- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close any sibling FAQs in the same list for a clean accordion feel
      item.parentElement
        .querySelectorAll(".faq-item.open")
        .forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".faq-answer").style.maxHeight = null;
          }
        });

      item.classList.toggle("open", !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  /* ---- Booking / contact form validation + submission ---- */
  const form = document.getElementById("bookingForm");
  if (!form) return;

  // Enquiries are delivered by email via FormSubmit.co (no backend required).
  // NOTE: the very first submission ever sent to this address triggers a
  // one-time confirmation email from FormSubmit — it must be clicked once
  // to activate delivery. After that, every submission arrives normally.
  const FORM_ENDPOINT = "https://formsubmit.co/ajax/aishwaryapote70@gmail.com";

  const successBox = form.parentElement.querySelector(".form-success");
  let errorBox = form.parentElement.querySelector(".form-error-global");
  if (!errorBox) {
    errorBox = document.createElement("div");
    errorBox.className = "form-success form-error-global";
    errorBox.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> <span>Something went wrong sending your enquiry. Please try again, or WhatsApp us directly.</span>`;
    successBox.insertAdjacentElement("afterend", errorBox);
  }

  const validators = {
    name: (v) => v.trim().length >= 2,
    phone: (v) => /^[0-9+\-\s()]{7,15}$/.test(v.trim()),
    email: (v) =>
      v.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    service: (v) => v !== "" && v !== "Select Service",
    message: (v) => v.trim().length >= 10,
  };

  const showError = (field, show) => {
    const wrapper = field.closest(".mb-3") || field.parentElement;
    const errorEl = wrapper.querySelector(".form-error");
    field.classList.toggle("is-invalid", show);
    if (errorEl) errorEl.classList.toggle("show", show);
  };

  const validateField = (field) => {
    const rule = validators[field.name];
    if (!rule) return true;
    const valid = rule(field.value);
    showError(field, !valid);
    return valid;
  };

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    form
      .querySelectorAll("input[name], select[name], textarea[name]")
      .forEach((field) => {
        if (!validateField(field)) isValid = false;
      });

    if (!isValid) {
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="bi bi-arrow-repeat"></i> Sending...`;
    errorBox.classList.remove("show");

    const payload = Object.fromEntries(new FormData(form).entries());

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(() => {
        form.reset();
        form
          .querySelectorAll(".is-invalid")
          .forEach((el) => el.classList.remove("is-invalid"));
        successBox.classList.add("show");
        successBox.setAttribute("role", "status");
        successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        setTimeout(() => successBox.classList.remove("show"), 6000);
      })
      .catch(() => {
        errorBox.classList.add("show");
        errorBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
  });
})();
