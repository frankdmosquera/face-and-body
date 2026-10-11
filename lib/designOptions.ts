/**
 * Design options, flippable on the real pages until Frank (and then the
 * clinic) picks one of each (2026-10-10). Every option is rendered in the
 * markup with `data-option="<group>-<id>"`; the CSS built below hides them
 * all and shows the one chosen on <html data-<group>>, or the group's
 * fallback when nothing is chosen. `DesignPicker` sets the attribute, the
 * boot script in app/layout.tsx restores it before the page draws.
 *
 * Plain data and strings, no "use client", so the server layout and the
 * client picker read the same list.
 *
 * Once the picks are made: keep the winners as plain markup, delete the rest,
 * this file, `DesignPicker` and the two tags in the layout. Until then the
 * hidden options are still in the HTML (on home, two extra copies of the
 * consultation heading and the product links).
 */

export type DesignPageType =
  "home" | "other-treatments" | "products" | "contact" | "book";

type DesignGroupType = {
  key: string;
  page: DesignPageType;
  label: string;
  fallback: string;
  options: readonly { id: string; label: string }[];
};

const BACKDROPS = [
  { id: "plain", label: "Plain" },
  { id: "plate", label: "Plate" },
  { id: "glow", label: "Glow" },
  { id: "rings", label: "Rings" },
] as const;

/* Pages whose top already holds a round plate or a photograph beside the
   copy offer the backdrops without the plate: two circles side by side read
   as a mistake, not a choice. */
const NO_PLATE = BACKDROPS.filter((option) => option.id !== "plate");

/* The treatment cards. One set of markup restyled by the card styles at the
   end of app/globals.css rather than three copies, because a card carries an
   `id` that links jump to and the facials are the text Google reads. */
const CARDS = [
  { id: "cards", label: "Cards" },
  { id: "photo", label: "Photo" },
  { id: "menu", label: "Menu" },
] as const;

/* How dark the veil over a background photograph is. */
const VEILS = [
  { id: "light", label: "Light" },
  { id: "medium", label: "Medium" },
  { id: "deep", label: "Deep" },
] as const;

export const DESIGN_OPTIONS: readonly DesignGroupType[] = [
  {
    key: "hero",
    page: "home",
    label: "Top of the page",
    fallback: "plate",
    options: BACKDROPS,
  },
  {
    key: "fx-cards",
    page: "home",
    label: "Facial treatment cards",
    fallback: "cards",
    options: CARDS,
  },
  {
    key: "rv-photo",
    page: "home",
    label: "Reviews background",
    fallback: "facial",
    options: [
      { id: "none", label: "None" },
      { id: "facial", label: "Facial" },
      { id: "mask", label: "Mask" },
      { id: "massage", label: "Massage" },
    ],
  },
  {
    key: "rv-veil",
    page: "home",
    label: "Reviews background, how dark",
    fallback: "medium",
    options: VEILS,
  },
  {
    key: "shelf",
    page: "home",
    label: "Eminence section, further down",
    fallback: "plate",
    options: [
      { id: "shelf", label: "Shelf" },
      { id: "plate", label: "Plate" },
      { id: "trio", label: "Trio" },
    ],
  },
  {
    key: "consult",
    page: "home",
    label: "Free consultation band, near the bottom",
    fallback: "full",
    options: [
      { id: "half", label: "Half" },
      { id: "full", label: "Massage" },
      { id: "mask", label: "Mask" },
    ],
  },
  {
    key: "ot-hero",
    page: "other-treatments",
    label: "Top of the page",
    fallback: "plate",
    options: BACKDROPS,
  },
  {
    key: "ot-cards",
    page: "other-treatments",
    label: "Treatment cards",
    fallback: "photo",
    options: CARDS,
  },
  {
    key: "pr-hero",
    page: "products",
    label: "Top of the page",
    fallback: "glow",
    options: NO_PLATE,
  },
  {
    key: "pr-bg",
    page: "products",
    label: "Background behind the products",
    fallback: "warm",
    options: [
      { id: "none", label: "None" },
      { id: "warm", label: "Warm" },
      { id: "globes", label: "Globes" },
    ],
  },
  {
    key: "ct-hero",
    page: "contact",
    label: "Top of the page",
    fallback: "glow",
    options: NO_PLATE,
  },
  {
    key: "bk-hero",
    page: "book",
    label: "Top of the page",
    fallback: "rings",
    options: BACKDROPS,
  },
];

/**
 * Puts remembered options back on <html> before the page draws, and the
 * fallback where nothing is remembered, so the card styles in globals.css can
 * key on the attribute alone. Without script the cards stay plain "Cards".
 */
export const designBootScript = `var d=document.documentElement,g=${JSON.stringify(
  Object.fromEntries(
    DESIGN_OPTIONS.map((group) => [
      group.key,
      [group.fallback, ...group.options.map((option) => option.id)],
    ]),
  ),
)};for(var k in g){var v=null;try{v=localStorage.getItem("option-"+k)}catch(e){}d.setAttribute("data-"+k,v&&g[k].indexOf(v)>0?v:g[k][0])}`;

/**
 * Every option hidden, the chosen one shown. Served as a plain <style> tag,
 * so it is unlayered and `display: none` beats every Tailwind utility, while
 * `revert-layer` on the shown one hands display back to the element's own
 * classes, responsive ones included (`hidden lg:block` still works).
 */
export const designOptionsCss =
  "[data-option]{display:none}" +
  DESIGN_OPTIONS.map((group) =>
    group.options
      .map((option) => {
        const shown = `:root[data-${group.key}="${option.id}"] [data-option="${group.key}-${option.id}"]`;
        return option.id === group.fallback
          ? `:root:not([data-${group.key}]) [data-option="${group.key}-${option.id}"],${shown}`
          : shown;
      })
      .join(","),
  ).join(",") +
  "{display:revert-layer}";
