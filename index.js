document.addEventListener("DOMContentLoaded", function () {
  // --- Contact form validation + save to localStorage ---
  const form = document.getElementById("contactForm");
  if (form) {
    form.onsubmit = function (event) {
      event.preventDefault();
      // Get fields & error spans
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const nameErr = document.getElementById("name-error");
      const emailErr = document.getElementById("email-error");
      const messageErr = document.getElementById("message-error");
      const status = document.getElementById("form-status");
      // Reset errors
      nameErr.textContent = emailErr.textContent = messageErr.textContent = "";
      status.textContent = "";
      status.className = "form-status";
      let ok = true;

      if (name.value.trim() === "") {
        nameErr.textContent = "Please enter your name.";
        ok = false;
      }
      const emailVal = email.value.trim();
      if (emailVal === "") {
        emailErr.textContent = "Please enter your email.";
        ok = false;
      } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailVal)) {
        emailErr.textContent = "Please enter a valid email.";
        ok = false;
      }
      if (message.value.trim() === "") {
        messageErr.textContent = "Please enter a message.";
        ok = false;
      }
      if (!ok) {
        status.textContent = "Please fix the errors above.";
        status.classList.add("error");
        return;
      }
      // Save data
      localStorage.setItem("contactFormData", JSON.stringify({
        name: name.value, email: email.value, message: message.value
      }));
      status.textContent = "Form is valid. Redirecting…";
      status.classList.add("success");
      setTimeout(() => {
        window.location.href = "form-details.html";
      }, 700);
    };
  }

  // --- Dark mode toggle ---
  const themeBtn = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeBtn) themeBtn.textContent = "☀️";
  }
  if (themeBtn) {
    themeBtn.onclick = function () {
      const isDark = document.body.classList.toggle("dark-mode");
      themeBtn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }

  // --- Back to top button ---
  const upBtn = document.getElementById("backToTop");
  if (upBtn) {
    window.onscroll = function () {
      upBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    };
    upBtn.onclick = function () {
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  }

  // --- Project cards click ---
  document.querySelectorAll(".project-card").forEach(function(card) {
    card.style.cursor = "pointer";
    card.onclick = function () {
      const url = card.getAttribute("data-url");
      if (url) location.href = url;
    }
  });
});
