// Every photograph on the site. `path` is relative to the site folder named by
// NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT (the endpoint ends in /face-and-body, as
// Primo's ends in /primo-painters); `w` and `h` are the intrinsic pixel size
// so the browser can reserve space. Her Instagram files are 480x640 thumbnails
// at best, which is the photography launch blocker: a real photo replaces one
// by changing its path. Stock is Pexels and Unsplash, sized here at the crop
// requested at download.
export const imagesData = {
  // A PEXELS STAND-IN, UPLOADED 2026-09-21, AND IT IS NOT MEANT TO LAST.
  //
  // Frank's pick out of a shortlist of ten, itself filtered from twenty.
  // The brief he held to throughout, and the reason this one won: the
  // product has to be visibly ON the face. Every prettier frame in the set
  // was hands and nothing else, which sells calm rather than treatment.
  //
  // Watch the red bandana at her jaw. It is the most saturated object in the
  // frame and it is near enough the copper to argue with it rather than
  // match it.
  //
  // What it replaced: /hero-led.jpg, her own photograph, still in the
  // library. That file is a 480x640 Instagram download and the hero column is
  // about 805px wide on a desktop, so it was being upscaled 1.7x, and more
  // than 3x on a retina screen.
  //
  // THE REAL FIX IS STILL HER PHOTOGRAPHS. This is a stranger in somebody
  // else's spa, and the better it looks the worse the gap when a visitor
  // walks into the actual clinic. The moment her camera-roll originals
  // arrive, this slot goes back to being hers and this file can go.
  //
  // No MEDIA_VERSION bump: new filename, new URL, nothing cached to beat.
  hero: {
    path: "/hero-mask-warm.jpg",
    alt: "An aesthetician's hands smoothing a treatment mask across a client's face, in warm daylight",
    source: "pexels 5240820",
    w: 2400,
    h: 3595,
  },
  catFacial: {
    path: "/cat-facial.jpg",
    alt: "Gloved hands working cooling globes over a client’s face",
    source: "unsplash 4pDlorrrOOM",
    w: 1600,
    h: 2400,
  },
  catSkin: {
    path: "/cat-skin.jpg",
    alt: "A skin treatment device passed over a client’s face in the clinic",
    source: "pexels 5069612",
    w: 1600,
    h: 2400,
  },
  catBody: {
    path: "/cat-body.jpg",
    alt: "A wooden body tool worked over a client’s back in a bright treatment room",
    source: "pexels 9335991",
    w: 1600,
    h: 2400,
  },
  catMassage: {
    path: "/cat-massage.jpg",
    alt: "A therapist’s hands working a client’s shoulders during a massage",
    source: "pexels 6628596",
    w: 1600,
    h: 2400,
  },
  catLaser: {
    path: "/cat-laser.jpg",
    alt: "A laser handpiece used on a client’s chin, both wearing safety goggles",
    source: "unsplash iN2ObRIy5Mc",
    w: 1600,
    h: 2133,
  },
  signature: {
    path: "/signature.jpg",
    alt: "Body treatment area with towels laid out",
    source: "instagram post-06",
    w: 360,
    h: 640,
  },
  resultRedness: {
    path: "/result-redness.jpg",
    alt: "Before and after of facial redness, from her Instagram",
    source: "instagram post-01",
    w: 480,
    h: 640,
  },
  // THE EMINENCE BAND'S THREE PICTURES, AND WHY THEY ARE NAMED PRODUCTS NOW.
  //
  // What was here until 2026-09-21 was a woman applying lipstick, a man
  // reaching for hair conditioner, and an orchid, under a heading that says
  // "Authorised Eminence Organics stockist". Those were replaced the same day
  // with three unbranded amber-glass stock shots: honest, atmospheric, and
  // still illustrating a specific brand claim with pictures of nothing.
  //
  // The structural problem that forced the stock shots is worth keeping,
  // because it explains why this is the right fix rather than a fourth
  // attempt: **you cannot illustrate "we stock brand X" with stock
  // photography.** Every good product shot carries a real label, and the
  // search turned up a Wella and DSD hair shelf with rouble price tags, a
  // Cyrillic AHA serum line, a zero-waste refill shop and an entire rival
  // cosmetics catalogue. A competitor's jar under that heading contradicts
  // the sentence above it.
  //
  // So the answer was never a better stock photograph. It was real product
  // shots, which now exist: 193 of them, collected 2026-09-21, one per
  // product, mirroring `data/products/`.
  //
  // WHY THESE THREE. A cleanser, a serum and a moisturiser, which is a
  // routine rather than three jars. Three different silhouettes and three
  // different colours, so the row does not read as one bottle photographed
  // three times. Two are Stone Crop, Eminence's best known line, and the
  // third is Bright Skin.
  //
  // ⚠️ SOURCE. These came from eminenceorganics.com, not from the Spa Partner
  // portal she has a login for. For an authorised stockist showing the brand
  // it stocks that is ordinary use, but the portal is the correct source and
  // that ask is still outstanding. Swap the files, keep the paths.
  eminenceGelWash: {
    path: "/eminence-gel-wash.jpg",
    alt: "Eminence Stone Crop Gel Wash, a tall olive green bottle with a botanical print label",
    source: "eminenceorganics.com",
    w: 1500,
    h: 1125,
  },
  eminenceSerum: {
    path: "/eminence-serum.jpg",
    alt: "Eminence Bright Skin Licorice Root Booster-Serum in an amber glass dropper bottle",
    source: "eminenceorganics.com",
    w: 1500,
    h: 1125,
  },
  eminenceMoisturizer: {
    path: "/eminence-moisturizer.jpg",
    alt: "Eminence Stone Crop Whip Moisturizer in a squat pale green glass jar",
    source: "eminenceorganics.com",
    w: 1500,
    h: 1125,
  },
  consultation: {
    path: "/consultation.jpg",
    alt: "A skin consultation in progress",
    source: "pexels 6135650",
    w: 1600,
    h: 1280,
  },
  room: {
    path: "/room.jpg",
    alt: "The treatment room at Face and Body Wellness Centre",
    source: "instagram post-09",
    w: 361,
    h: 640,
  },

  // The eight concern pages. Before these, all eight borrowed their
  // category's photo, so five of them showed the identical facial shot.
  //
  // The rule they are picked against: it has to look like a service being
  // provided - a professional doing something to a client in a calm room -
  // not someone at home doing it to themselves, and never a photograph of
  // the condition itself. A stock close-up of skin could be mistaken for
  // one of her clients or her results; a treatment in progress cannot be.
  //
  // All eight were re-picked against that rule on 2026-09-19, along with the
  // five category photos. Two of the five previously recorded as correct did
  // not meet it either: body contouring was a woman dry-brushing her own
  // thigh, and pigmentation was a close-up of freckled skin - the condition
  // rather than the treatment.
  //
  // concernBodyContouring is the one landscape file in the set. The page
  // crops 4:5 at lg, so it leans on ImageKit fo-auto to hold the subject.
  concernAcne: {
    path: "/concern-acne.jpg",
    alt: "An ultrasonic cleansing tool worked across a client’s cheek",
    source: "pexels 5069423",
    w: 1600,
    h: 2400,
  },
  concernFineLines: {
    path: "/concern-fine-lines.jpg",
    alt: "A facial massage working the brow and temples",
    source: "unsplash qybZ2w0CzMw",
    w: 1600,
    h: 2400,
  },
  concernPigmentation: {
    path: "/concern-pigmentation.jpg",
    alt: "A brush applying a peel solution to a client’s cheek",
    source: "pexels 22589363",
    w: 1600,
    h: 2844,
  },
  concernDullDehydrated: {
    path: "/concern-dull-dehydrated.jpg",
    alt: "A hydrating mask worked into a client’s face by hand",
    source: "pexels 37033485",
    w: 1600,
    h: 2400,
  },
  concernScarringTexture: {
    path: "/concern-scarring-texture.jpg",
    alt: "A resurfacing device passed over a client’s face",
    source: "pexels 3865548",
    w: 1600,
    h: 2400,
  },
  concernUnwantedHair: {
    path: "/concern-unwanted-hair.jpg",
    alt: "A laser handpiece used on a client’s arm",
    source: "pexels 19239092",
    w: 1600,
    h: 2000,
  },
  concernBodyContouring: {
    path: "/concern-body-contouring.jpg",
    alt: "A wooden roller worked across a client’s back",
    source: "pexels 10893346",
    w: 1600,
    h: 900,
  },
  concernMuscleTension: {
    path: "/concern-muscle-tension.jpg",
    alt: "A neck and shoulder massage in a calm treatment room",
    source: "pexels 19666192",
    w: 1600,
    h: 2400,
  },
} as const;

export type ImageSlotType = keyof typeof imagesData;
