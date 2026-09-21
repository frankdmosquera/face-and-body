// Every photograph on the site. `path` is relative to the site folder named by
// NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT (the endpoint ends in /face-and-body, as
// Primo's ends in /primo-painters); `w` and `h` are the intrinsic pixel size
// so the browser can reserve space. Her Instagram files are 480x640 thumbnails
// at best, which is the photography launch blocker: a real photo replaces one
// by changing its path. Stock is Pexels and Unsplash, sized here at the crop
// requested at download.
export const imagesData = {
  hero: {
    path: "/hero-led.jpg",
    alt: "The aesthetician working an LED light device over a client's face",
    source: "instagram post-04",
    w: 480,
    h: 640,
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
  eminenceWide: {
    path: "/eminence-1.jpg",
    alt: "Skincare products arranged on a shelf",
    source: "pexels 4482931",
    w: 1600,
    h: 800,
  },
  eminenceA: {
    path: "/eminence-2.jpg",
    alt: "A jar of organic skincare cream",
    source: "pexels 7440140",
    w: 1000,
    h: 1000,
  },
  eminenceB: {
    path: "/eminence-3.jpg",
    alt: "Botanical skincare ingredients",
    source: "pexels 21528800",
    w: 1000,
    h: 1000,
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
