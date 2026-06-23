/* ============================================================
   HARMONY — catalog data
   All product / category / banner content lives here.
   To add or edit products, just change the objects below.
   Images use verified Unsplash CDN URLs with a runtime fallback
   chain (see main.js -> harmonyImgFallback).
   ============================================================ */
(function () {
  "use strict";

  // Build an Unsplash CDN url at a given size.
  const U = (id, w, h) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

  // Themed pools of verified image ids (see js note above).
  const IMG = {
    kitchen: [
      "1556911220-bff31c812dba",
      "1556909212-d5b604d0c90d",
      "1565538810643-b5bdb714032a",
      "1616137466211-f939a420be84",
      "1600489000022-c2086d79f9d4",
      "1600585154340-be6161a56a0c",
    ],
    hardware: [
      "1530124566582-a618bc2615dc",
      "1581622558663-b2e33377dfb2",
      "1556909114-f6e7ad7d3136",
      "1600585152220-90363fe7e115",
    ],
    faucet: [
      "1565183997392-2f6f122e5912",
      "1620626011761-996317b8d101",
      "1607472586893-edb57bdc0e39",
      "1556909212-d5b604d0c90d",
    ],
    bathroom: [
      "1584622650111-993a426fbf0a",
      "1552321554-5fefe8c9ef14",
      "1600566752355-35792bedcfea",
      "1584622781564-1d987f7333c1",
    ],
    door: [
      "1558002038-1055907df827",
      "1581858726788-75bc0f6a952d",
      "1600585152220-90363fe7e115",
      "1600607687939-ce8a6c25118c",
    ],
    utensils: [
      "1466637574441-749b8f19452f",
      "1574269909862-7e1d70bb8078",
      "1593618998160-e34014e67546",
      "1556909114-f6e7ad7d3136",
    ],
  };

  // SVG icons used in the category navigation strips.
  const ICON = {
    storage:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 10h18M3 15h18M10 4v16"/><circle cx="6.5" cy="7" r=".6" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".6" fill="currentColor"/></svg>',
    hinge:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="4" y="5" width="6" height="14" rx="1"/><rect x="14" y="5" width="6" height="14" rx="1"/><path d="M10 9h4M10 15h4"/></svg>',
    faucet:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 19h10M7 19v-4a4 4 0 0 1 4-4h3V8a2 2 0 0 1 2-2h2"/><path d="M14 11V8"/><circle cx="18" cy="6" r="1.2"/></svg>',
    bath:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z"/><path d="M7 12V6a2 2 0 0 1 2-2h.5"/><path d="M9.5 6.5h2"/></svg>',
    door:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="6" y="3" width="12" height="18" rx="1"/><circle cx="14.5" cy="12" r="1"/></svg>',
    utensils:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 3v8a2 2 0 0 0 4 0V3M8 11v10"/><path d="M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4 2.5-1 2.5-4-1-5-2.5-5ZM16 16v5"/></svg>',
  };

  let pid = 0;
  // helper to create a product
  const P = (cat, name, subcat, finish, price, blurb, imgKey, imgIdx, badge, specs) => {
    pid += 1;
    const pool = IMG[imgKey];
    const photo = pool[imgIdx % pool.length];
    return {
      id: cat + "-" + pid,
      cat,
      name,
      subcat,
      finish,
      price,
      blurb,
      badge: badge || null,
      img: U(photo, 800, 800),
      imgLarge: U(photo, 1400, 1100),
      seed: cat + pid,
      specs: specs || [],
    };
  };

  const categories = [
    /* ---------------------------------------------------------- */
    {
      id: "kitchen-storage",
      name: "Kitchen Storage Hardware",
      short: "Kitchen Storage",
      icon: ICON.storage,
      eyebrow: "Precision Storage",
      heroTitle: "Schiller 5.0 Lightning Pull-Out",
      heroSubtitle: "Engineered order. A new sense of space inside every cabinet.",
      heroImg: U(IMG.kitchen[0], 2000, 1300),
      thumb: U(IMG.kitchen[0], 360, 360),
      blurb:
        "Pull-out baskets, larder units and drawer systems that turn cabinetry into effortless, organised space.",
      subcats: [
        "Pull-Out Baskets",
        "Tall Larder Units",
        "Corner Solutions",
        "Waste Systems",
        "Drawer Organizers",
      ],
      products: [
        P("kitchen-storage", "Schiller 5.0 Pull-Out Basket", "Pull-Out Baskets", "Gunmetal", 389, "Soft, silent full-extension basket with a tempered base and felt-lined trays.", "kitchen", 0, "New", ["Full extension runners", "120kg load rated", "Soft-close damping", "Anti-slip felt base"]),
        P("kitchen-storage", "Apex Tall Larder Unit", "Tall Larder Units", "Brushed Brass", 1290, "Five-tier larder that glides fully out to bring the whole pantry to your hand.", "kitchen", 1, null, ["5 adjustable tiers", "Full-extension chassis", "Soft-close", "Mounts in 450–600mm units"]),
        P("kitchen-storage", "Magic Corner Carousel", "Corner Solutions", "Chrome", 540, "Swing-out corner mechanism that recovers every centimetre of blind corner space.", "kitchen", 2, null, ["Swing + pull mechanism", "Independent shelves", "Left/right opening", "Tool-free install"]),
        P("kitchen-storage", "Concealed Waste System", "Waste Systems", "Matte Black", 215, "Dual-bin pull-out that hides waste and recycling behind a single cabinet door.", "kitchen", 3, null, ["2 × 18L bins", "Lid-lift mechanism", "Removable for cleaning", "Soft-close runner"]),
        P("kitchen-storage", "Linea Cutlery Tray", "Drawer Organizers", "Brushed Brass", 89, "Modular cutlery insert cut to fit, in a warm metallic finish.", "kitchen", 4, null, ["Cut-to-size modules", "Non-slip feet", "Dishwasher safe", "For 400–1200mm drawers"]),
        P("kitchen-storage", "Vertis Plate Holder", "Drawer Organizers", "Gunmetal", 119, "Adjustable pegs hold plates upright and steady inside deep drawers.", "kitchen", 5, null, ["Repositionable pegs", "Holds up to 24 plates", "Soft contact pads", "Aluminium frame"]),
        P("kitchen-storage", "Pronto Pull-Out Shelf", "Pull-Out Baskets", "Chrome", 165, "A simple sliding shelf that brings the back of the cabinet forward.", "kitchen", 0, null, ["Full extension", "80kg rated", "Ventilated base", "Snap-in mounting"]),
        P("kitchen-storage", "Nova Under-Sink Organiser", "Waste Systems", "Matte Black", 145, "Two-tier rack that works around plumbing to reclaim under-sink chaos.", "kitchen", 1, null, ["Adjustable around pipes", "Pull-out tiers", "Coated steel", "Easy clip assembly"]),
      ],
    },
    /* ---------------------------------------------------------- */
    {
      id: "hinges-slides",
      name: "Hinges & Drawer Slides",
      short: "Hinges & Slides",
      icon: ICON.hinge,
      eyebrow: "Motion Engineering",
      heroTitle: "Glide Pro Undermount",
      heroSubtitle: "Movement you feel but never hear — soft-close motion, perfected.",
      heroImg: U(IMG.hardware[0], 2000, 1300),
      thumb: U(IMG.hardware[0], 360, 360),
      blurb:
        "Soft-close hinges, undermount slides and push-to-open systems engineered for a lifetime of silent motion.",
      subcats: [
        "Soft-Close Hinges",
        "Concealed Hinges",
        "Undermount Slides",
        "Push-to-Open",
        "Lift Systems",
      ],
      products: [
        P("hinges-slides", "Glide Pro Undermount Slide", "Undermount Slides", "Zinc", 64, "Hidden full-extension runner with integrated soft-close and 3D adjustment.", "hardware", 0, "New", ["Full extension", "40kg rated", "3D front adjustment", "Tested 80,000 cycles"]),
        P("hinges-slides", "Silent-X Soft-Close Hinge", "Soft-Close Hinges", "Nickel", 9, "Clip-on hinge with built-in damper for a gentle, consistent close.", "hardware", 1, null, ["110° opening", "Integrated damper", "Clip-on mount", "Tool-free removal"]),
        P("hinges-slides", "Clip Concealed Hinge", "Concealed Hinges", "Nickel", 7, "Fully concealed hinge that disappears when the door is shut.", "hardware", 2, null, ["Invisible when closed", "3-way adjust", "Steel body", "Soft-close ready"]),
        P("hinges-slides", "TipMatic Push-to-Open", "Push-to-Open", "Zinc", 78, "Handle-free runner that opens at a touch and self-closes softly.", "hardware", 3, null, ["Mechanical push latch", "No handles needed", "Soft-close return", "35kg rated"]),
        P("hinges-slides", "AeroLift Cabinet Lift", "Lift Systems", "Grey", 132, "Stay-lift mechanism that holds upper doors open at any angle.", "hardware", 0, null, ["Holds any position", "Soft-close down", "Adjustable tension", "For wall units"]),
        P("hinges-slides", "FullExt Ball-Bearing Runner", "Undermount Slides", "Zinc", 28, "Side-mount steel runner built for heavy, frequently-used drawers.", "hardware", 1, null, ["Side mount", "45kg rated", "Ball-bearing glide", "Detachable"]),
        P("hinges-slides", "MiniGlide Drawer Runner", "Undermount Slides", "Nickel", 19, "Compact runner for shallow internal drawers and narrow cabinets.", "hardware", 2, null, ["Partial extension", "25kg rated", "Quiet nylon rollers", "Snap fit"]),
        P("hinges-slides", "Pivot 165° Wide-Angle Hinge", "Concealed Hinges", "Nickel", 14, "Wide-opening hinge for corner cabinets and pull-out access.", "hardware", 3, null, ["165° opening", "For corner units", "Soft-close", "Clip-on"]),
      ],
    },
    /* ---------------------------------------------------------- */
    {
      id: "sink-faucets",
      name: "Sink Faucets",
      short: "Sink Faucets",
      icon: ICON.faucet,
      eyebrow: "Pure Water",
      heroTitle: "BN3.0 mini Filter Faucet",
      heroSubtitle: "One tap = filtered water + natural water. Form that follows flow.",
      heroImg: U(IMG.faucet[0], 2000, 1300),
      thumb: U(IMG.faucet[0], 360, 360),
      blurb:
        "Pull-down sprays, filter faucets and precision mixers in finishes built to resist a lifetime of water.",
      subcats: [
        "Pull-Down Faucets",
        "Filter Faucets",
        "Mixer Taps",
        "Pot Fillers",
        "Touchless",
      ],
      products: [
        P("sink-faucets", "BN3.0 mini Filter Faucet", "Filter Faucets", "Gunmetal", 459, "A single tap delivering both filtered drinking water and standard supply.", "faucet", 0, "New", ["Dual water paths", "Built-in filter mount", "Pull-out spray", "Lead-free brass"]),
        P("sink-faucets", "Cascade Pull-Down Mixer", "Pull-Down Faucets", "Brushed Nickel", 329, "High-arc spring spout with a magnetic dock and dual spray modes.", "faucet", 1, null, ["Magnetic dock", "Stream / spray", "360° swivel", "Ceramic cartridge"]),
        P("sink-faucets", "PureFlow Triple-Mode", "Filter Faucets", "Chrome", 389, "Switch between filtered, aerated and spray flow at the flick of a lever.", "faucet", 2, null, ["3 flow modes", "Filter ready", "Anti-scale aerator", "Solid brass body"]),
        P("sink-faucets", "Arc Single-Lever Mixer", "Mixer Taps", "Brushed Brass", 219, "A clean, low-profile mixer with smooth ceramic-disc control.", "faucet", 3, null, ["Ceramic disc", "Single lever", "35mm cartridge", "Water-saving"]),
        P("sink-faucets", "Sensa Touchless Faucet", "Touchless", "Matte Black", 549, "Infrared sensor delivers hands-free flow for a cleaner kitchen.", "faucet", 0, null, ["Infrared sensor", "Battery / mains", "Temperature memory", "Auto shut-off"]),
        P("sink-faucets", "Culina Pot Filler", "Pot Fillers", "Brushed Brass", 415, "Wall-mounted folding arm that brings water to the cooktop.", "faucet", 1, null, ["Dual-joint arm", "Wall mount", "Aerated flow", "Folds flat"]),
        P("sink-faucets", "Helix Pull-Out Tap", "Pull-Down Faucets", "Brushed Nickel", 289, "Compact pull-out spray ideal for smaller sinks and prep stations.", "faucet", 2, null, ["Pull-out spray", "Compact arc", "2 spray modes", "Braided hose"]),
        P("sink-faucets", "Onyx Matte Mixer", "Mixer Taps", "Matte Black", 249, "A statement mixer in deep matte black with a soft-touch finish.", "faucet", 3, null, ["PVD matte coating", "Fingerprint resistant", "Ceramic disc", "Single lever"]),
      ],
    },
    /* ---------------------------------------------------------- */
    {
      id: "bathroom",
      name: "Bathroom Hardware",
      short: "Bathroom",
      icon: ICON.bath,
      eyebrow: "Bath & Utility",
      heroTitle: "AF4 Odor-Proof Floor Drain",
      heroSubtitle: "The details that keep a bathroom feeling effortlessly clean.",
      heroImg: U(IMG.bathroom[0], 2000, 1300),
      thumb: U(IMG.bathroom[0], 360, 360),
      blurb:
        "Faucets, shower sets, drains and valves — the quietly engineered hardware behind a great bathroom.",
      subcats: [
        "Bathroom Faucets",
        "Shower Sets",
        "Floor Drains",
        "Angle Valves",
        "Accessories",
      ],
      products: [
        P("bathroom", "AF4 Concealed Floor Drain", "Floor Drains", "Brushed Steel", 79, "Tile-insert drain with a deep odor-proof core and high flow rate.", "bathroom", 0, "New", ["Tile-insert top", "Odor-proof seal", "High drainage rate", "304 stainless"]),
        P("bathroom", "Rainfall Shower Set", "Shower Sets", "Matte Black", 489, "Overhead rain head with hand shower and thermostatic control.", "bathroom", 1, null, ["8\" rain head", "Thermostatic mixer", "Anti-scald", "Hand shower"]),
        P("bathroom", "AM9 Washing Machine Tap", "Bathroom Faucets", "Chrome", 39, "Robust quarter-turn tap sized for appliances and utility sinks.", "bathroom", 2, null, ["Quarter-turn", "Brass body", "Hose connector", "Wall mount"]),
        P("bathroom", "AA6 Bellows Angle Valve", "Angle Valves", "Chrome", 24, "Flexible angle valve that absorbs movement and resists kinking.", "bathroom", 3, null, ["Flexible bellows", "Quarter-turn", "Ceramic seal", '1/2" thread']),
        P("bathroom", "Aqua Basin Mixer", "Bathroom Faucets", "Brushed Brass", 199, "A slim basin mixer with a soft waterfall outlet.", "bathroom", 0, null, ["Waterfall outlet", "Ceramic disc", "Click waste ready", "Solid brass"]),
        P("bathroom", "AM6 Mop Sink Nozzle", "Bathroom Faucets", "Chrome", 29, "Durable bib tap built for mop sinks and outdoor utility use.", "bathroom", 1, null, ["Hose thread", "Zinc handle", "Drip-free seat", "Wall mount"]),
        P("bathroom", "Linea Towel Bar", "Accessories", "Brushed Brass", 69, "A minimal towel bar that ties the room together in warm metal.", "bathroom", 2, null, ["Concealed fixings", "600mm span", "Anti-corrosion", "SUS304"]),
        P("bathroom", "Square Linear Drain", "Floor Drains", "Brushed Steel", 99, "Slimline linear channel drain for walk-in shower zones.", "bathroom", 3, null, ["Linear channel", "Removable insert", "High flow", "Stainless"]),
      ],
    },
    /* ---------------------------------------------------------- */
    {
      id: "inner-doors",
      name: "Inner Doors & Locks",
      short: "Doors & Locks",
      icon: ICON.door,
      eyebrow: "Thresholds",
      heroTitle: "F5 Series Gilded Lock",
      heroSubtitle: "Dazzling and gilded — a grander way to open every room.",
      heroImg: U(IMG.door[0], 2000, 1300),
      thumb: U(IMG.door[0], 360, 360),
      blurb:
        "Lever handles, locks and concealed door hinges where mechanical feel meets sculptural form.",
      subcats: [
        "Lever Handles",
        "Door Locks",
        "Smart Locks",
        "Door Hinges",
        "Pulls",
      ],
      products: [
        P("inner-doors", "F5 Series Gilded Lock", "Door Locks", "Gunmetal", 159, "Magnetic mute lock with a sculpted lever and a reassuring action.", "door", 0, "New", ["Magnetic mute latch", "Zinc-alloy lever", "Reversible handing", "PVD finish"]),
        P("inner-doors", "Aurum Lever Handle", "Lever Handles", "Brushed Brass", 89, "A flowing lever cast in warm brass for interior doors.", "door", 1, null, ["Solid lever", "Concealed rose", "Smooth return spring", "PVD brass"]),
        P("inner-doors", "SmartTouch Fingerprint Lock", "Smart Locks", "Matte Black", 329, "Fingerprint, code and key access in a slim mortise body.", "door", 2, null, ["Fingerprint + code", "Mechanical key backup", "Low-battery alert", "Auto-lock"]),
        P("inner-doors", "Pivot Concealed Hinge", "Door Hinges", "Nickel", 49, "Invisible door hinge for flush, frameless interior doors.", "door", 3, null, ["Fully concealed", "3D adjustment", "60kg rated", "Soft action"]),
        P("inner-doors", "Linea Flush Pull", "Pulls", "Brushed Brass", 35, "Recessed pull for sliding and pocket doors.", "door", 0, null, ["Recessed mount", "Finger relief", "Solid brass", "Pocket-door ready"]),
        P("inner-doors", "Mute Magnetic Latch", "Door Locks", "Nickel", 29, "Silent magnetic latch that closes without a click.", "door", 1, null, ["Magnetic catch", "Silent close", "Reversible", "Tubular body"]),
        P("inner-doors", "Noir Lever Set", "Lever Handles", "Matte Black", 79, "A crisp, architectural lever in soft matte black.", "door", 2, null, ["Square rose", "PVD matte", "Spring-loaded", "Pair + fixings"]),
        P("inner-doors", "Grand Entry Handle", "Lever Handles", "Brushed Brass", 145, "An elongated pull-and-lever set for principal doors.", "door", 3, null, ["400mm pull", "Lever inside", "Heavy-gauge brass", "Privacy option"]),
      ],
    },
    /* ---------------------------------------------------------- */
    {
      id: "kitchen-utensils",
      name: "Kitchen Utensils",
      short: "Utensils",
      icon: ICON.utensils,
      eyebrow: "At The Bench",
      heroTitle: "The Harmony Bench Collection",
      heroSubtitle: "Cookware and tools weighted, balanced and made to be used daily.",
      heroImg: U(IMG.utensils[0], 2000, 1300),
      thumb: U(IMG.utensils[0], 360, 360),
      blurb:
        "Tri-ply cookware, forged knives and prep tools finished to the same standard as our hardware.",
      subcats: ["Cookware", "Knives", "Utensil Sets", "Cutting Boards", "Prep Tools"],
      products: [
        P("kitchen-utensils", "Tri-Ply Sauté Pan", "Cookware", "Stainless", 129, "A 28cm tri-ply pan with even heat and a stay-cool cast handle.", "utensils", 0, "New", ["Tri-ply construction", "Induction ready", "Oven safe 240°C", "Riveted handle"]),
        P("kitchen-utensils", "Damascus Chef's Knife", "Knives", "Steel", 159, "A 67-layer Damascus blade with a balanced full-tang handle.", "utensils", 1, null, ["67-layer steel", "60 HRC core", "Full tang", "Hand-finished edge"]),
        P("kitchen-utensils", "6-Piece Utensil Set", "Utensil Sets", "Walnut", 89, "Stainless tools with warm walnut handles and a hanging rail.", "utensils", 2, null, ["6 essential tools", "Walnut handles", "Hanging rail", "Dishwasher safe heads"]),
        P("kitchen-utensils", "Acacia Cutting Board", "Cutting Boards", "Acacia", 59, "An end-grain acacia board with a juice groove and grip feet.", "utensils", 3, null, ["End-grain build", "Juice groove", "Non-slip feet", "Reversible"]),
        P("kitchen-utensils", "Precision Peeler", "Prep Tools", "Steel", 19, "A sharp, comfortable Y-peeler that lasts for years.", "utensils", 0, null, ["Japanese steel blade", "Soft grip", "Eye remover", "Dishwasher safe"]),
        P("kitchen-utensils", "Cast-Iron Skillet", "Cookware", "Cast Iron", 75, "A pre-seasoned 26cm skillet for searing, baking and roasting.", "utensils", 1, null, ["Pre-seasoned", "Oven & grill safe", "Pour spouts", "Lifetime pan"]),
        P("kitchen-utensils", "Nesting Mixing Bowls", "Prep Tools", "Stainless", 65, "A nesting set of stainless bowls with non-slip bases and lids.", "utensils", 2, null, ["3-bowl set", "Silicone base", "Snap lids", "Stackable"]),
        P("kitchen-utensils", "Stainless Whisk Set", "Prep Tools", "Stainless", 29, "Balloon and flat whisks in polished stainless steel.", "utensils", 3, null, ["2-whisk set", "Sealed heads", "Balanced weight", "Dishwasher safe"]),
      ],
    },
  ];

  // Flatten all products for quick lookup by id.
  const productsById = {};
  categories.forEach((c) => c.products.forEach((p) => (productsById[p.id] = p)));

  window.HARMONY = {
    brand: {
      name: "HARMONY",
      tagline: "Kitchen, crafted in harmony",
      blurb:
        "Harmony designs and engineers premium hardware for the modern kitchen and home — storage, motion, water and thresholds, made to live together.",
      email: "hello@harmony-living.com",
      phone: "+1 (415) 555-0192",
      address: "180 Maker's Row, Design District",
    },
    categories,
    productsById,
    helpers: { U, IMG },
  };
})();
