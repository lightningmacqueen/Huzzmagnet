document.addEventListener("DOMContentLoaded", function () {
  // ------- Contact form validation + localStorage -------
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const formStatus = document.getElementById("form-status");

  function resetErrors() {
    if (!formStatus) return;
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";
    formStatus.className = "form-status";
  }

  function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      resetErrors();

      let isValid = true;
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (name === "") {
        nameError.textContent = "Please enter your name.";
        isValid = false;
      }
      if (email === "") {
        emailError.textContent = "Please enter your email.";
        isValid = false;
      } else if (!isValidEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }
      if (message === "") {
        messageError.textContent = "Please enter a message.";
        isValid = false;
      }

      if (!isValid) {
        formStatus.textContent = "Please fix the highlighted errors.";
        formStatus.classList.add("error");
        return;
      }

      try {
        const formData = { name, email, message };
        localStorage.setItem("contactFormData", JSON.stringify(formData));
        formStatus.textContent = "Form is valid. Redirecting…";
        formStatus.classList.add("success");
        setTimeout(function () {
          window.location.href = "form-details.html";
        }, 700);
      } catch (e) {
        formStatus.textContent = "Unable to save data. Please try again.";
        formStatus.classList.add("error");
      }
    });
  }

  // ------- Dark mode toggle -------
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme"); // "dark" or "light"
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.textContent = "☀️";
  }
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const isDark = body.classList.toggle("dark-mode");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ------- Back to top button -------
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    });
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ------- Project cards click -> open live site -------
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
      const url = card.getAttribute("data-url");
      if (url) window.location.href = url;
    });
  });
});
