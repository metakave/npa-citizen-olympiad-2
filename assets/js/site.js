/* Shared site behaviour: mobile nav, scroll reveal, small helpers. */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "মেনু খুলুন");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "মেনু বন্ধ করুন" : "মেনু খুলুন");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) closeNav();
    });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Label table cells from their column headers so tables can stack on phones.
  document.querySelectorAll("table").forEach(function (table) {
    var heads = Array.prototype.map.call(
      table.querySelectorAll("thead th"),
      function (th) { return th.textContent.trim(); }
    );
    table.querySelectorAll("tbody tr").forEach(function (tr) {
      Array.prototype.forEach.call(tr.children, function (td, i) {
        if (heads[i]) td.setAttribute("data-label", heads[i]);
      });
    });
  });

  // Bengali numeral helper shared by quiz + form.
  window.toBn = function (n) {
    var bn = "০১২৩৪৫৬৭৮৯";
    return String(n).replace(/\d/g, function (d) { return bn[+d]; });
  };

  // --- Theme Toggle Management (Default Light) ---
  var currentTheme = localStorage.getItem("gco_theme") || "light";
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  window.toggleTheme = function () {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("gco_theme", "light");
      updateThemeButtons("light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("gco_theme", "dark");
      updateThemeButtons("dark");
    }
  };

  function updateThemeButtons(theme) {
    document.querySelectorAll(".theme-toggle-btn").forEach(function (btn) {
      btn.innerHTML = theme === "dark" ? "☀️ Light" : "🌙 Dark";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateThemeButtons(currentTheme);
    document.querySelectorAll(".theme-toggle-btn").forEach(function (btn) {
      btn.addEventListener("click", window.toggleTheme);
    });
  });
})();

