"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("main-navigation");
  const yearElement = document.getElementById("current-year");
  const proposalForm = document.querySelector(".proposal-form");

  // Footer year
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Sticky header styling
  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Mobile navigation
  const closeMenu = () => {
    if (!menuToggle || !navigation) return;

    menuToggle.classList.remove("active");
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !navigation) return;

    menuToggle.classList.add("active");
    navigation.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("menu-open");
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        closeMenu();
      }
    });
  }

  // Smooth-scroll internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerOffset = header ? header.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset -
        18;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });

  // Temporary proposal form handling
  // Later we will connect this form to a real email/form service.
  if (proposalForm) {
    proposalForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const submitButton = proposalForm.querySelector(
        'button[type="submit"]'
      );

      if (!submitButton) return;

      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = "Request Received";

      window.setTimeout(() => {
        proposalForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        alert(
          "Thank you. Your proposal request has been recorded. We will connect this form to NOVOC's business email before launch."
        );
      }, 500);
    });
  }
});
