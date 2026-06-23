/* =========================================================================
   HARMONY — home page: hero carousel + category switcher + showcases
   ========================================================================= */
(function () {
  "use strict";
  var H = window.HARMONY;
  if (!H) return;
  var cats = H.categories;

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  function catUrl(id) { return "category.html?cat=" + id; }
  function esc(s) { return String(s == null ? "" : s).replace(/"/g, "&quot;"); }
  function img(src, seed, w, h, cls, alt) {
    var lazy = cls === "slide__img" ? "" : ' loading="lazy"';
    return '<img class="' + cls + '" src="' + src + '" alt="' + esc(alt) + '"' + lazy + ' ' +
      'data-seed="' + seed + '" data-w="' + w + '" data-h="' + h + '" ' +
      'onerror="harmonyImgFallback(this)">';
  }

  /* ----------------------------- HERO ---------------------------------- */
  var stage = document.querySelector(".hero__stage");
  var track = document.querySelector(".switcher__track");

  stage.innerHTML = cats.map(function (c, i) {
    return (
      '<div class="slide' + (i === 0 ? " is-active" : "") + '" data-i="' + i + '">' +
        img(c.heroImg, "hero-" + c.id, 2000, 1300, "slide__img", c.name) +
        '<div class="slide__overlay"></div>' +
        '<div class="hero__inner"><div class="hero__content slide__content">' +
          '<span class="eyebrow hero__eyebrow">' + c.eyebrow + "</span>" +
          '<h2 class="slide__title">' + c.heroTitle + "</h2>" +
          '<p class="hero__sub">' + c.heroSubtitle + "</p>" +
          '<div class="hero__cta">' +
            '<a class="btn btn--brass" href="' + catUrl(c.id) + '">Explore the collection ' + ARROW + "</a>" +
            '<a class="btn btn--light" href="#categories">All Categories</a>' +
          "</div>" +
        "</div></div>" +
      "</div>"
    );
  }).join("");

  track.innerHTML = cats.map(function (c, i) {
    return (
      '<button class="swatch' + (i === 0 ? " is-active" : "") + '" data-i="' + i + '" ' +
        'aria-label="Feature ' + c.name + '">' +
        img(c.thumb, "thumb-" + c.id, 360, 360, "swatch__img") +
        '<div class="swatch__body">' +
          '<div class="swatch__name">' + c.short + "</div>" +
          '<span class="swatch__go">Open store ' + ARROW + "</span>" +
        "</div>" +
        '<span class="swatch__bar"></span>' +
      "</button>"
    );
  }).join("");

  var slides = Array.prototype.slice.call(stage.querySelectorAll(".slide"));
  var swatches = Array.prototype.slice.call(track.querySelectorAll(".swatch"));
  var countEl = document.querySelector(".hero__count b");
  var totalEl = document.querySelector(".hero__count .hero__total");
  if (totalEl) totalEl.textContent = ("0" + slides.length).slice(-2);
  var idx = 0, timer = null, DURATION = 6000;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function render() {
    slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
    swatches.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
    if (countEl) countEl.textContent = ("0" + (idx + 1)).slice(-2);
    centerSwatch();
  }

  // Centre the active swatch WITHIN the strip only — horizontal scroll of the
  // track, never the page. (scrollIntoView would scroll every ancestor, yanking
  // the whole page back up to the hero each time the banner auto-rotates.)
  function centerSwatch() {
    var active = swatches[idx];
    if (!active || track.scrollWidth <= track.clientWidth + 2) return;
    var a = active.getBoundingClientRect();
    var t = track.getBoundingClientRect();
    var delta = (a.left + a.width / 2) - (t.left + t.width / 2);
    if (Math.abs(delta) > 1) track.scrollBy({ left: delta, behavior: "smooth" });
  }
  function go(n) { idx = (n + slides.length) % slides.length; render(); }
  function next() { go(idx + 1); }
  function prev() { go(idx - 1); }
  function start() { if (!timer && !reduceMotion && slides.length > 1) timer = setInterval(next, DURATION); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  swatches.forEach(function (sw, i) {
    sw.addEventListener("click", function () {
      if (i === idx) { window.location.href = catUrl(cats[i].id); }
      else { go(i); restart(); }
    });
  });

  var aNext = document.querySelector(".hero__arrow--next");
  var aPrev = document.querySelector(".hero__arrow--prev");
  if (aNext) aNext.addEventListener("click", function () { next(); restart(); });
  if (aPrev) aPrev.addEventListener("click", function () { prev(); restart(); });

  var hero = document.querySelector(".hero");
  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });
  window.addEventListener("pagehide", stop);
  document.addEventListener("keydown", function (e) {
    if (window.scrollY > window.innerHeight * 0.8) return;
    if (e.key === "ArrowRight") { next(); restart(); }
    else if (e.key === "ArrowLeft") { prev(); restart(); }
  });

  render();
  start();

  /* ------------------------ CATEGORY SHOWCASE -------------------------- */
  var grid = document.querySelector(".cats__grid");
  if (grid) {
    grid.innerHTML = cats.map(function (c, i) {
      return (
        '<a class="catcard reveal" data-d="' + (i % 4) + '" href="' + catUrl(c.id) + '">' +
          img(c.heroImg, "cat-" + c.id, 900, 700, "") +
          '<div class="catcard__veil"></div>' +
          '<div class="catcard__body">' +
            '<div class="catcard__kicker">' + c.eyebrow + "</div>" +
            "<h3>" + c.name + "</h3>" +
            "<p>" + c.blurb + "</p>" +
            '<span class="catcard__go">Explore ' + ARROW + "</span>" +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  /* ------------------------ FEATURED PRODUCTS -------------------------- */
  var prow = document.querySelector(".prow");
  if (prow) {
    var featured = [];
    cats.forEach(function (c) {
      var n = c.products.filter(function (p) { return p.badge === "New"; });
      if (n[0]) featured.push(n[0]);
    });
    // top up to 8 with a spread of others
    cats.forEach(function (c) {
      if (featured.length >= 8) return;
      var extra = c.products.find(function (p) { return featured.indexOf(p) === -1; });
      if (extra) featured.push(extra);
    });
    prow.innerHTML = featured.slice(0, 8).map(function (p) {
      return (
        '<a class="pcard reveal" href="product.html?id=' + p.id + '">' +
          '<div class="pcard__frame">' +
            img(p.img, p.seed, 700, 700, "", p.name + " in " + p.finish + " finish") +
            (p.badge ? '<span class="pcard__badge">' + p.badge + "</span>" : "") +
            '<div class="pcard__quick">View details</div>' +
          "</div>" +
          '<div class="pcard__body">' +
            '<div class="pcard__tag">' + p.subcat + "</div>" +
            "<h3>" + p.name + "</h3>" +
            '<div class="pcard__foot">' +
              '<span class="pcard__price">Rs ' + p.price + "</span>" +
              '<span class="pcard__finish">' + p.finish + "</span>" +
            "</div>" +
          "</div>" +
        "</a>"
      );
    }).join("");

    // edge arrows: scroll the row by ~one viewport-width of cards
    var pPrev = document.querySelector(".prow-arrow--prev");
    var pNext = document.querySelector(".prow-arrow--next");
    function prowStep() { return Math.max(prow.clientWidth * 0.85, 260); }
    function prowUpdate() {
      var max = prow.scrollWidth - prow.clientWidth - 2;
      if (pPrev) pPrev.disabled = prow.scrollLeft <= 2;
      if (pNext) pNext.disabled = prow.scrollLeft >= max;
    }
    if (pPrev) pPrev.addEventListener("click", function () { prow.scrollBy({ left: -prowStep(), behavior: "smooth" }); });
    if (pNext) pNext.addEventListener("click", function () { prow.scrollBy({ left: prowStep(), behavior: "smooth" }); });
    prow.addEventListener("scroll", prowUpdate, { passive: true });
    window.addEventListener("resize", prowUpdate);
    prowUpdate();
  }
})();
