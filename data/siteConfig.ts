/**
 * Business facts only. This module must never import the service catalogue,
 * directly or transitively.
 *
 * It is imported by client components - `OpenNow` for the hours, `MobileNav`
 * for the phone links, `ContactForm` for both - so whatever it pulls in ships
 * to the browser on every page. The header and footer menus are built from all
 * 41 services, and while that derivation lived here, `OpenNow` was shipping
 * every treatment description to render "open now" from an array of times:
 * 56KB, on every route. The menus now live in `data/nav.ts`, which server
 * components import and pass down as props.
 */

export type SiteLinkType = { label: string; href: string };

/** One column of a header panel, or one block of a sheet row. */
export type NavSectionType = {
  label?: string;
  href?: string;
  links: SiteLinkType[];
};

/** A top-level nav entry that opens a panel. `href` is where its own name goes. */
export type NavGroupType = {
  label: string;
  href: string;
  sections: NavSectionType[];
  more?: string;
};

export type NavItemType = SiteLinkType | NavGroupType;

export function isNavGroup(item: NavItemType): item is NavGroupType {
  return "sections" in item;
}

export type DayType =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/** Times are 24-hour local strings ("16:00"); feature 8 turns them into an open-now state. */
export type DayHoursType =
  | { day: DayType; open: string; close: string }
  | { day: DayType; closed: true };

export type SiteConfigType = {
  name: string;
  shortName: string;
  subName: string;
  tagline: string;
  description: string;
  /**
   * `whatsapp` is optional and its absence is meaningful: `ContactChannels`
   * renders the WhatsApp button only when it is set, because a `wa.me` link
   * to a number that is not registered lands the visitor on "this phone
   * number is not on WhatsApp". Set it to
   * `https://wa.me/15879693796` once the account is confirmed.
   */
  phone: { display: string; tel: string; sms: string; whatsapp?: string };
  email: string;
  address: {
    unit: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  geo: { lat: number; lng: number };
  timezone: string;
  hours: readonly DayHoursType[];
  founded: number;
  ratings: readonly {
    source: "google" | "facebook";
    value: number;
    count: number;
  }[];
  consultation: { durationMin: number; price: number };
  social: { instagram: string; facebook: string };
  reviews: { placeId: string };
};

const social = {
  instagram: "https://www.instagram.com/faceandbodywellnesscentre/",
  facebook: "https://www.facebook.com/FACEANDBODYWELLNESSCENTRE/",
};

export const siteConfig: SiteConfigType = {
  name: "Face and Body Wellness Centre",
  shortName: "Face & Body",
  subName: "Wellness Centre",
  tagline: "Renew. Revitalize. Radiate.",
  description:
    "Advanced facials, microneedling, laser and IPL, delivered by a qualified aesthetician who looks at your skin before she looks at the menu.",
  phone: {
    display: "(587) 969-3796",
    tel: "tel:+15879693796",
    sms: "sms:+15879693796",
    whatsapp: "https://wa.me/15879693796",
  },
  email: "faceandbodywellnesscentre@gmail.com",
  address: {
    unit: "Unit 330",
    street: "290 Midpark Way SE",
    city: "Calgary",
    province: "AB",
    // Square, Yelp and the City licence agree on 1P1; her own post says 1M2. See business.md.
    postalCode: "T2X 1P1",
  },
  geo: { lat: 50.9095038, lng: -114.0637929 },
  timezone: "America/Edmonton",
  // From her Instagram post of 22 Jul 2026. Google Business Profile disagrees on six days
  // and is known wrong. Awaiting her confirmation.
  hours: [
    { day: "monday", open: "16:00", close: "20:00" },
    { day: "tuesday", open: "10:00", close: "13:00" },
    { day: "wednesday", open: "09:00", close: "12:00" },
    { day: "thursday", open: "12:00", close: "15:30" },
    { day: "friday", open: "14:00", close: "18:00" },
    { day: "saturday", open: "07:00", close: "11:30" },
    { day: "sunday", closed: true },
  ],
  founded: 2023,
  // Read from the public listings on 2026-09-18. project-plan.md said "5.0 across
  // every public review"; Google Maps actually shows 4.7 from 79. Google first: it
  // is the one the hero quotes.
  ratings: [
    { source: "google", value: 4.7, count: 79 },
    { source: "facebook", value: 5, count: 3 },
  ],
  consultation: { durationMin: 15, price: 0 },
  social,
  // Her Google listing, confirmed 2026-09-19 by a Places text search on the name
  // and address. Feeds the live review fetch in lib/googleReviews.ts.
  reviews: { placeId: "ChIJiRuswV91cVMRsuRTwgJ6hJ0" },
};
