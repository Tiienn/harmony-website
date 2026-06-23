# Harmony — premium kitchen & home hardware (catalogue site)

A fast, static marketing + catalogue website for **Harmony**, a company specialising in
kitchen storage, hinges & drawer slides, sink faucets, bathroom hardware, inner doors
and kitchen utensils.

Built with plain **HTML, CSS and vanilla JavaScript** — no build step, no dependencies.
Open it, host it anywhere, edit it freely.

## Features

- **Rotating hero banner** with a clickable category switcher strip (like the reference).
  Click a category to switch the banner; click again (or the "View the Collection"
  button) to open that category's store page. Auto-rotates, pauses on hover, supports
  ← → arrow keys.
- **Store / category pages** (`category.html?cat=…`) with a filter sidebar
  (sub-category + finish), live sorting, active-filter chips, and a responsive product grid.
- **Product detail pages** (`product.html?id=…`) with specs, finish options, a quote
  request, and related products.
- **About** and **Contact** pages (the contact form is front-end only — see below).
- Fully **responsive** (desktop → mobile) with a slide-in mobile menu and filter drawer.
- Smooth scroll-reveal animations, sticky header, and `prefers-reduced-motion` support.
- **Resilient images**: every image falls back gracefully (Unsplash → picsum → gradient)
  so nothing ever shows a broken-image icon.

## Run it

It's static, so any of these work:

```bash
# simplest — just open the file
open index.html

# or serve it (recommended, avoids any browser file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html         Home (hero carousel + showcases)
category.html      Store page (reads ?cat=ID)
product.html       Product detail (reads ?id=ID)
about.html         Brand story
contact.html       Contact + enquiry form
css/styles.css     All styling + design tokens
js/data.js         ← ALL content: categories & products live here
js/main.js         Shared behaviour (header, nav, menu, reveals, image fallback)
js/home.js         Hero carousel + home showcases
js/category.js     Store filtering / sorting
js/product.js      Product detail rendering
```

## Editing content

Everything you'll want to change lives in **`js/data.js`**:

- **Add a product** — copy a `P(...)` line inside a category's `products: [ … ]` array.
  Arguments: `(categoryId, name, subCategory, finish, price, blurb, imageKey, imageIndex, badge, specs[])`.
- **Add a category** — add an object to the `categories` array (give it an `id`, `name`,
  `icon`, hero fields, `subcats`, and `products`). It automatically appears in the hero
  carousel, the nav dropdown, the footer and the category strip.
- **Swap images** — replace the Unsplash IDs in the `IMG` pools at the top of `data.js`,
  or point them at your own image files (e.g. `"assets/products/my-photo.jpg"`).

Brand details (name, email, phone, address) are in the `brand` object at the bottom of `data.js`.

## Going live

Drag the folder onto **Netlify**, push to **GitHub Pages**, or deploy to **Vercel** —
no configuration needed. To wire up the contact form for real, connect it to a service
like Formspree, Netlify Forms, or your own endpoint (currently it just shows a confirmation).

## Notes

- Product photos use stock imagery for now. Drop your real product shots into an
  `assets/` folder and update the paths in `data.js` when you have them.
- Prices and copy are placeholders — edit freely in `data.js`.
