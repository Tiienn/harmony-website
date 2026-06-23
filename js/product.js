/* =========================================================================
   HARMONY — product detail page
   ========================================================================= */
(function () {
  "use strict";
  var H = window.HARMONY;
  if (!H) return;

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 6L9 17l-5-5"/></svg>';
  function esc(s) { return String(s == null ? "" : s).replace(/"/g, "&quot;"); }
  function img(src, seed, w, h, cls, alt) {
    return '<img class="' + cls + '" src="' + src + '" alt="' + esc(alt) + '" data-seed="' + seed +
      '" data-w="' + w + '" data-h="' + h + '" onerror="harmonyImgFallback(this)">';
  }
  function param(k) { return new URLSearchParams(window.location.search).get(k); }

  var p = H.productsById[param("id")];
  var root = document.querySelector(".pd .wrap");

  if (!p) {
    root.innerHTML = '<div class="empty" style="padding:90px 0;text-align:center">' +
      '<h2 style="font-family:var(--font-display);color:var(--ink)">Product not found</h2>' +
      '<p style="margin:14px 0 22px;color:var(--muted)">That item may have moved.</p>' +
      '<a class="btn btn--solid" href="index.html">Back to home ' + ARROW + "</a></div>";
    return;
  }

  var cat = H.categories.find(function (c) { return c.id === p.cat; });
  if (!cat) cat = H.categories[0];
  document.title = p.name + " — Harmony";
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", p.name + " — " + p.blurb);

  var finishes = [p.finish, "Brushed Brass", "Matte Black", "Brushed Nickel"]
    .filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, 4);

  root.querySelector(".pd__grid").innerHTML =
    '<div class="pd__media reveal">' +
      '<div class="pd__main">' + img(p.imgLarge, p.seed, 1200, 1000, "", p.name + " in " + p.finish + " finish") + "</div>" +
    "</div>" +
    '<div class="pd__info reveal" data-d="1">' +
      '<nav class="crumb"><a href="index.html">Home</a>' + ARROW +
        '<a href="category.html?cat=' + cat.id + '">' + cat.name + "</a></nav>" +
      '<span class="eyebrow">' + p.subcat + "</span>" +
      "<h1>" + p.name + "</h1>" +
      '<div class="pd__price"><b>$' + p.price + '</b><span>incl. fittings · ex. installation</span></div>' +
      '<p class="pd__desc">' + p.blurb + " Built and finished to Harmony's standard, with a lifetime mechanical warranty." +
      "</p>" +
      '<div class="pd__opts"><h4>Finish</h4><div class="finish-row">' +
        finishes.map(function (f, i) {
          return '<button class="finish-pill' + (i === 0 ? " is-on" : "") + '">' + f + "</button>";
        }).join("") +
      "</div></div>" +
      '<div class="pd__actions">' +
        '<button class="btn btn--solid js-enquire">Request a quote ' + ARROW + "</button>" +
        '<a class="btn btn--ghost" href="category.html?cat=' + cat.id + '">Back to ' + cat.short + "</a>" +
      "</div>" +
      '<div class="pd__note">' + CHECK + " In stock · ships in 3–5 business days from our showroom.</div>" +
      (p.specs && p.specs.length
        ? '<div class="pd__specs"><h4>Specifications</h4><ul>' +
            p.specs.map(function (s) { return "<li>" + CHECK + "<span>" + s + "</span></li>"; }).join("") +
          "</ul></div>"
        : "") +
    "</div>";

  // finish pill toggle
  root.querySelectorAll(".finish-pill").forEach(function (btn) {
    btn.addEventListener("click", function () {
      root.querySelectorAll(".finish-pill").forEach(function (b) { b.classList.remove("is-on"); });
      btn.classList.add("is-on");
    });
  });
  // enquire
  root.querySelector(".js-enquire").addEventListener("click", function () {
    if (window.harmonyToast) window.harmonyToast("Quote request noted — we'll be in touch.");
  });

  /* --------------------------- related -------------------------------- */
  var relGrid = document.querySelector(".related .pgrid");
  if (relGrid) {
    var rel = cat.products.filter(function (x) { return x.id !== p.id; }).slice(0, 4);
    relGrid.innerHTML = rel.map(function (r) {
      return (
        '<a class="pcard reveal" href="product.html?id=' + r.id + '">' +
          '<div class="pcard__frame">' + img(r.img, r.seed, 700, 700, "", r.name + " in " + r.finish + " finish") +
            (r.badge ? '<span class="pcard__badge">' + r.badge + "</span>" : "") +
            '<div class="pcard__quick">View details</div></div>' +
          '<div class="pcard__body"><div class="pcard__tag">' + r.subcat + "</div>" +
            "<h3>" + r.name + "</h3>" +
            '<div class="pcard__foot"><span class="pcard__price">$' + r.price + "</span>" +
            '<span class="pcard__finish">' + r.finish + "</span></div></div>" +
        "</a>"
      );
    }).join("");
  }
})();
