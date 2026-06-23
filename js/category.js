/* =========================================================================
   HARMONY — category (store) page
   ========================================================================= */
(function () {
  "use strict";
  var H = window.HARMONY;
  if (!H) return;
  var cats = H.categories;

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 6l6 6-6 6"/></svg>';
  var X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function esc(s) { return String(s == null ? "" : s).replace(/"/g, "&quot;"); }
  function img(src, seed, w, h, cls, alt) {
    return '<img class="' + cls + '" src="' + src + '" alt="' + esc(alt) + '" loading="lazy" data-seed="' + seed +
      '" data-w="' + w + '" data-h="' + h + '" onerror="harmonyImgFallback(this)">';
  }
  function param(k) { return new URLSearchParams(window.location.search).get(k); }

  var cat = cats.find(function (c) { return c.id === param("cat"); }) || cats[0];
  document.title = cat.name + " — Harmony";

  /* ----------------------------- hero --------------------------------- */
  var hero = document.querySelector(".cat-hero");
  hero.insertAdjacentHTML("afterbegin", img(cat.heroImg, "chero-" + cat.id, 2000, 900, ""));
  document.querySelector(".cat-hero h1").textContent = cat.name;
  document.querySelector(".cat-hero p").textContent = cat.blurb;
  document.querySelector(".crumb .crumb-cat").textContent = cat.name;

  /* --------------------------- category nav --------------------------- */
  var nav = document.querySelector(".catnav__track");
  nav.innerHTML = cats.map(function (c) {
    return '<a class="' + (c.id === cat.id ? "active" : "") + '" href="category.html?cat=' + c.id + '">' +
      '<span class="ci">' + c.icon + "</span>" + c.short + "</a>";
  }).join("");
  var activeNav = nav.querySelector("a.active");
  if (activeNav) activeNav.scrollIntoView({ inline: "center", block: "nearest" });

  /* ----------------------------- state -------------------------------- */
  var products = cat.products.slice();
  var finishes = products.map(function (p) { return p.finish; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
  var state = { sub: [], fin: [], sort: "featured" };

  function countSub(s) { return products.filter(function (p) { return p.subcat === s; }).length; }
  function countFin(f) { return products.filter(function (p) { return p.finish === f; }).length; }

  /* ----------------------------- filters UI --------------------------- */
  var fbox = document.querySelector(".filters__groups");
  fbox.innerHTML =
    '<div class="fgroup"><div class="fgroup__label">Category</div>' +
      cat.subcats.map(function (s) {
        return '<label class="fopt"><input type="checkbox" data-type="sub" value="' + s + '"><span>' + s +
          '</span><span class="count">' + countSub(s) + "</span></label>";
      }).join("") +
    "</div>" +
    '<div class="fgroup"><div class="fgroup__label">Finish</div>' +
      finishes.map(function (f) {
        return '<label class="fopt"><input type="checkbox" data-type="fin" value="' + f + '"><span>' + f +
          '</span><span class="count">' + countFin(f) + "</span></label>";
      }).join("") +
    "</div>";

  fbox.addEventListener("change", function (e) {
    var t = e.target;
    if (t.tagName !== "INPUT") return;
    var arr = t.dataset.type === "sub" ? state.sub : state.fin;
    var i = arr.indexOf(t.value);
    if (t.checked && i === -1) arr.push(t.value);
    else if (!t.checked && i > -1) arr.splice(i, 1);
    apply();
  });

  document.querySelector(".filters__reset").addEventListener("click", function () {
    state.sub = []; state.fin = [];
    fbox.querySelectorAll("input").forEach(function (i) { i.checked = false; });
    apply();
  });

  document.querySelector(".store__sort select").addEventListener("change", function (e) {
    state.sort = e.target.value; apply();
  });

  /* ----------------------------- render ------------------------------- */
  var grid = document.querySelector(".pgrid");
  var countEl = document.querySelector(".store__count b");
  var chipsEl = document.querySelector(".chips");

  function filtered() {
    var list = products.filter(function (p) {
      var okSub = !state.sub.length || state.sub.indexOf(p.subcat) > -1;
      var okFin = !state.fin.length || state.fin.indexOf(p.finish) > -1;
      return okSub && okFin;
    });
    if (state.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
    else if (state.sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return list;
  }

  function chips() {
    var all = state.sub.concat(state.fin);
    chipsEl.innerHTML = all.map(function (v) {
      return '<span class="chip">' + v + '<button data-v="' + v + '" aria-label="Remove ' + v + '">' + X + "</button></span>";
    }).join("");
    chipsEl.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.dataset.v;
        [state.sub, state.fin].forEach(function (arr) {
          var i = arr.indexOf(v); if (i > -1) arr.splice(i, 1);
        });
        var input = fbox.querySelector('input[value="' + v + '"]');
        if (input) input.checked = false;
        apply();
      });
    });
  }

  function card(p) {
    return (
      '<a class="pcard" href="product.html?id=' + p.id + '">' +
        '<div class="pcard__frame">' +
          img(p.img, p.seed, 700, 700, "", p.name + " in " + p.finish + " finish") +
          (p.badge ? '<span class="pcard__badge">' + p.badge + "</span>" : "") +
          '<div class="pcard__quick">View details</div>' +
        "</div>" +
        '<div class="pcard__body">' +
          '<div class="pcard__tag">' + p.subcat + "</div>" +
          "<h3>" + p.name + "</h3>" +
          '<p class="pcard__blurb">' + p.blurb + "</p>" +
          '<div class="pcard__foot">' +
            '<span class="pcard__price">Rs ' + p.price + "</span>" +
            '<span class="pcard__finish">' + p.finish + "</span>" +
          "</div>" +
        "</div>" +
      "</a>"
    );
  }

  function apply() {
    var list = filtered();
    countEl.textContent = list.length;
    chips();
    if (!list.length) {
      grid.style.display = "block";
      grid.innerHTML =
        '<div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">' +
        '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
        "<p>No products match these filters.</p></div>";
      return;
    }
    grid.style.display = "grid";
    grid.innerHTML = list.map(card).join("");
  }

  apply();

  /* ------------------------ mobile filter drawer ---------------------- */
  var filtersEl = document.querySelector(".filters");
  var openBtn = document.querySelector(".store__filterbtn");
  var closeBtn = document.querySelector(".filters__close");
  var backdrop = document.querySelector(".backdrop");
  var lastFocus = null;

  function focusables() {
    return Array.prototype.slice.call(filtersEl.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )).filter(function (el) { return el.offsetParent !== null && !el.disabled; });
  }
  function trap(e) {
    if (e.key === "Escape") { closeF(); return; }
    if (e.key !== "Tab") return;
    var f = focusables();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function openF() {
    lastFocus = document.activeElement;
    filtersEl.classList.add("open");
    backdrop.classList.add("show");
    filtersEl.setAttribute("aria-modal", "true");
    filtersEl.setAttribute("role", "dialog");
    if (closeBtn) closeBtn.focus();
    filtersEl.addEventListener("keydown", trap);
  }
  function closeF() {
    filtersEl.classList.remove("open");
    backdrop.classList.remove("show");
    filtersEl.removeAttribute("aria-modal");
    filtersEl.removeEventListener("keydown", trap);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (openBtn) openBtn.addEventListener("click", openF);
  if (closeBtn) closeBtn.addEventListener("click", closeF);
  if (backdrop) backdrop.addEventListener("click", closeF);
})();
