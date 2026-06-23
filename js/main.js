/* =========================================================================
   HARMONY — shared site behaviour (runs on every page)
   ========================================================================= */

/* Graceful image fallback: Unsplash -> picsum (seeded) -> brass gradient.
   Referenced inline via onerror="harmonyImgFallback(this)". */
function harmonyImgFallback(img) {
  var step = img.getAttribute("data-fb") || "0";
  if (step === "2") return;
  if (step === "0") {
    img.setAttribute("data-fb", "1");
    var seed = img.getAttribute("data-seed") || "harmony";
    var w = img.getAttribute("data-w") || 800;
    var h = img.getAttribute("data-h") || 800;
    img.src = "https://picsum.photos/seed/" + encodeURIComponent(seed) + "/" + w + "/" + h;
  } else {
    img.setAttribute("data-fb", "2");
    img.removeAttribute("src");
    img.classList.add("img-fallback");
  }
}

(function () {
  "use strict";
  var H = window.HARMONY || { categories: [] };

  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };

  function catUrl(id) { return "category.html?cat=" + id; }

  /* ---- build navigation from data ---- */
  function buildNav() {
    var drop = document.querySelector(".js-cat-drop");
    if (drop) {
      drop.innerHTML = H.categories.map(function (c) {
        return '<a href="' + catUrl(c.id) + '"><span class="di">' + c.icon + "</span>" + c.name + "</a>";
      }).join("");
    }
    var foot = document.querySelector(".js-cat-foot");
    if (foot) {
      foot.innerHTML = H.categories.map(function (c) {
        return '<a href="' + catUrl(c.id) + '">' + c.name + "</a>";
      }).join("");
    }
    var mob = document.querySelector(".js-cat-mobile");
    if (mob) {
      mob.innerHTML = '<a href="category.html">Browse all products</a>' +
        H.categories.map(function (c) {
          return '<a href="' + catUrl(c.id) + '">' + c.short + "</a>";
        }).join("");
    }
  }

  /* ---- accessibility hygiene applied to every page ---- */
  function enhance() {
    // decorative icons should be skipped by screen readers
    document.querySelectorAll("svg").forEach(function (s) {
      if (!s.querySelector("title") && !s.getAttribute("aria-label")) {
        s.setAttribute("aria-hidden", "true");
        s.setAttribute("focusable", "false");
      }
    });
    // give the icon-only newsletter button a hover tooltip
    document.querySelectorAll(".news-form button").forEach(function (b) {
      if (!b.getAttribute("title")) b.setAttribute("title", "Subscribe");
    });
  }

  /* ---- sticky header colour state ---- */
  function header() {
    var hd = document.querySelector(".header");
    if (!hd || hd.classList.contains("is-light")) return;
    var onScroll = function () {
      if (window.scrollY > window.innerHeight * 0.62) hd.classList.add("is-solid");
      else hd.classList.remove("is-solid");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- mobile menu ---- */
  function mobileMenu() {
    var burger = document.querySelector(".burger");
    if (!burger) return;
    burger.setAttribute("aria-expanded", "false");
    var open = function () {
      document.body.classList.add("mobile-open");
      burger.setAttribute("aria-expanded", "true");
    };
    var close = function (restoreFocus) {
      if (!document.body.classList.contains("mobile-open")) return;
      document.body.classList.remove("mobile-open");
      burger.setAttribute("aria-expanded", "false");
      if (restoreFocus) burger.focus();
    };
    burger.addEventListener("click", function () {
      if (document.body.classList.contains("mobile-open")) close(true); else open();
    });
    document.querySelectorAll(".mobile-menu a").forEach(function (a) {
      a.addEventListener("click", function () { close(false); });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(true); });
  }

  /* ---- header "Products" dropdown: clickable + keyboard ---- */
  function dropdowns() {
    document.querySelectorAll(".has-drop .navlink").forEach(function (nl) {
      var go = function () { window.location.href = "category.html"; };
      nl.addEventListener("click", go);
      nl.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
        else if (e.key === "Escape") { nl.blur(); }
      });
    });
  }

  /* ---- scroll reveal ---- */
  function reveals() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- newsletter + toast ---- */
  function toast(msg) {
    var t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      t.setAttribute("aria-atomic", "true");
      document.body.appendChild(t);
    }
    t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>' + msg;
    requestAnimationFrame(function () { t.classList.add("show"); });
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }
  window.harmonyToast = toast;

  function newsletter() {
    document.querySelectorAll(".news-form").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = f.querySelector("input");
        if (input && input.value.trim()) {
          toast("Thanks — you're on the list.");
          input.value = "";
        }
      });
    });
  }

  function year() {
    document.querySelectorAll(".js-year").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildNav();
    header();
    mobileMenu();
    dropdowns();
    reveals();
    newsletter();
    year();
    enhance();
  });
})();
