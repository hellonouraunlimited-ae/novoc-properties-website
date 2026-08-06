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

  // Sticky header
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
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !navigation) return;

    menuToggle.classList.add("active");
    navigation.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      if (navigation.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) {
        closeMenu();
      }
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    });
  });

  // Demo proposal form
  if (proposalForm) {
    proposalForm.addEventListener("submit", function (e) {
      e.preventDefault();

      alert(
        "Thank you for contacting NOVOC Properties. Our team will contact you shortly."
      );

      proposalForm.reset();
    });
  }
});
