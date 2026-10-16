// Small enhancements: mobile sidebar toggle, active-section highlight, footer year.
(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile sidebar toggle
  var toggle = document.querySelector(".sidebar-toggle");
  var scrim = document.getElementById("sidebar-scrim");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("sidebar-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  function closeSidebar() {
    if (document.body.classList.contains("sidebar-open")) {
      document.body.classList.remove("sidebar-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
  }
  if (scrim) scrim.addEventListener("click", closeSidebar);
  var contentsLinks = document.getElementById("sidebar-links");
  if (contentsLinks) {
    contentsLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeSidebar();
    });
  }

  // Highlight sidebar link for the section in view
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navAnchors = contentsLinks
    ? Array.prototype.slice.call(contentsLinks.querySelectorAll("a"))
    : [];
  if (!("IntersectionObserver" in window) || !sections.length || !navAnchors.length) return;

  var byId = {};
  navAnchors.forEach(function (a) {
    var href = a.getAttribute("href");
    if (href && href.charAt(0) === "#") {
      byId[href.slice(1)] = a;
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) { a.classList.remove("active"); });
        var a = byId[entry.target.id];
        if (a) a.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
})();
