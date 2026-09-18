import { CATEGORIES, categoryHref } from "@/data/categories";

export type SiteLink = { label: string; href: string };

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/** Times are 24-hour local strings ("16:00"); feature 8 turns them into an open-now state. */
export type DayHours =
  | { day: Day; open: string; close: string }
  | { day: Day; closed: true };

export type SiteConfig = {
  name: string;
  shortName: string;
  subName: string;
  tagline: string;
  description: string;
  phone: { display: string; tel: string; sms: string };
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
  hours: readonly DayHours[];
  founded: number;
  ratings: readonly {
    source: "google" | "facebook";
    value: number;
    count: number;
  }[];
  consultation: { durationMin: number; price: number };
  social: { instagram: string; facebook: string };
  nav: SiteLink[];
  footer: { heading: string; links: SiteLink[] }[];
};

const social = {
  instagram: "https://www.instagram.com/faceandbodywellnesscentre/",
  facebook: "https://www.facebook.com/FACEANDBODYWELLNESSCENTRE/",
};

const treatments: SiteLink[] = CATEGORIES.map((category) => ({
  label: category.label,
  href: categoryHref(category),
}));

export const siteConfig: SiteConfig = {
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
  nav: [...treatments.slice(0, 4), { label: "About", href: "/about" }],
  footer: [
    { heading: "Treatments", links: treatments },
    {
      heading: "Clinic",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Book",
      links: [
        { label: "Book now", href: "/contact" },
        { label: "Instagram", href: social.instagram },
        { label: "Facebook", href: social.facebook },
      ],
    },
  ],
};
