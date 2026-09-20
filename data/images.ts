// Every photograph on the site. `path` is relative to the site folder named by
// NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT (the endpoint ends in /face-and-body, as
// Primo's ends in /primo-painters); `w` and `h` are the intrinsic pixel size
// so the browser can reserve space. Her Instagram files are 480x640 thumbnails
// at best, which is the photography launch blocker: a real photo replaces one
// by changing its path. Stock is Pexels only, sized here at the crop requested
// at download.
export const IMAGES = {
  hero: {
    path: "/hero-led.jpg",
    alt: "The aesthetician working an LED light device over a client's face",
    source: "instagram post-04",
    w: 480,
    h: 640,
  },
  catFacial: {
    path: "/cat-facial.jpg",
    alt: "A client mid-facial with product applied",
    source: "instagram post-03",
    w: 480,
    h: 640,
  },
  catSkin: {
    path: "/cat-skin.jpg",
    alt: "Close-up of skin texture on the abdomen during treatment",
    source: "instagram post-02",
    w: 480,
    h: 640,
  },
  catBody: {
    path: "/cat-body.jpg",
    alt: "Body treatment with folded towels",
    source: "instagram post-05",
    w: 360,
    h: 640,
  },
  catMassage: {
    path: "/cat-massage.jpg",
    alt: "Massage in a calm treatment room",
    source: "pexels 7233264",
    w: 1200,
    h: 1680,
  },
  catLaser: {
    path: "/cat-laser.jpg",
    alt: "A laser handpiece ready for treatment",
    source: "pexels 5619448",
    w: 1200,
    h: 1680,
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
  // STILL TO REPLACE: concernAcne, concernFineLines and concernDullDehydrated
  // do not meet that rule - they are at-home or ambiguous shots, kept only
  // because they beat five pages sharing one image. Re-pick when there is
  // time. The other five are correct.
  concernAcne: {
    path: "/concern-acne.jpg",
    alt: "A deep cleansing facial being carried out",
    source: "pexels 6475989",
    w: 1600,
    h: 2400,
  },
  concernFineLines: {
    path: "/concern-fine-lines.jpg",
    alt: "A facial massage tool resting in an open hand",
    source: "pexels 5927834",
    w: 1600,
    h: 2398,
  },
  concernPigmentation: {
    path: "/concern-pigmentation.jpg",
    alt: "Sunlight falling across freckled skin",
    source: "pexels 16069404",
    w: 1600,
    h: 1600,
  },
  concernDullDehydrated: {
    path: "/concern-dull-dehydrated.jpg",
    alt: "A hydrating serum being applied to the cheek",
    source: "pexels 29745247",
    w: 1600,
    h: 2401,
  },
  concernScarringTexture: {
    path: "/concern-scarring-texture.jpg",
    alt: "A microneedling pen being used on the face",
    source: "pexels 29648626",
    w: 1600,
    h: 2400,
  },
  concernUnwantedHair: {
    path: "/concern-unwanted-hair.jpg",
    alt: "A laser hair removal handpiece in use",
    source: "pexels 36930637",
    w: 1600,
    h: 2845,
  },
  concernBodyContouring: {
    path: "/concern-body-contouring.jpg",
    alt: "A wood therapy tool used on the thigh",
    source: "pexels 9165651",
    w: 1600,
    h: 1067,
  },
  concernMuscleTension: {
    path: "/concern-muscle-tension.jpg",
    alt: "Hands working the muscles of the back",
    source: "pexels 38407786",
    w: 1600,
    h: 1067,
  },
} as const;

export type ImageSlot = keyof typeof IMAGES;
