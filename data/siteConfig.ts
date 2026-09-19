import { CATEGORIES, categoryHref } from "@/data/categories";
import { CONCERNS, concernHref } from "@/data/concerns";
import { getServicesByCategory, serviceHref } from "@/lib/services";
import type { CategorySlug, Service } from "@/types/services";

export type SiteLink = { label: string; href: string };

/** One column of a header panel, or one block of a sheet row. */
export type NavSection = { label?: string; href?: string; links: SiteLink[] };

/** A top-level nav entry that opens a panel. `href` is where its own name goes. */
export type NavGroup = {
  label: string;
  href: string;
  sections: NavSection[];
  more?: string;
};

export type NavItem = SiteLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "sections" in item;
}

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
  nav: NavItem[];
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

function category(slug: CategorySlug) {
  const entry = CATEGORIES.find((item) => item.slug === slug);
  if (!entry) throw new Error(`Unknown category ${slug}`);
  return entry;
}

function serviceLinks(services: readonly Service[]): SiteLink[] {
  return services.map((service) => ({
    label: service.name,
    href: serviceHref(service),
  }));
}

function categorySection(slug: CategorySlug, label?: string): NavSection {
  return {
    label,
    href: label ? categoryHref(category(slug)) : undefined,
    links: serviceLinks(getServicesByCategory(slug)),
  };
}

// The header shows Skin and Laser under one button; the data keeps five categories.
function treatmentGroup(
  label: string,
  slugs: CategorySlug[],
  sections: NavSection[],
): NavGroup {
  const total = sections.reduce((sum, section) => sum + section.links.length, 0);
  return {
    label,
    href: categoryHref(category(slugs[0])),
    sections,
    more: `See all ${total}`,
  };
}

const facialSections: NavSection[] = (category("facial").groups ?? []).map(
  (group) => ({
    label: group.label,
    links: serviceLinks(
      getServicesByCategory("facial").filter(
        (service) => service.group === group.slug,
      ),
    ),
  }),
);

const nav: NavItem[] = [
  treatmentGroup("Facials", ["facial"], facialSections),
  treatmentGroup(
    "Skin and Laser",
    ["skin", "laser"],
    [
      categorySection("skin", "Skin Treatments"),
      categorySection("laser", "Laser and IPL"),
    ],
  ),
  treatmentGroup("Body", ["body"], [categorySection("body")]),
  treatmentGroup("Massage", ["massage"], [categorySection("massage")]),
  {
    label: "More",
    // Feature 7 points this back at /about once that page exists.
    href: "/hours",
    sections: [
      {
        label: "What to treat",
        links: CONCERNS.map((concern) => ({
          label: concern.label,
          href: concernHref(concern),
        })),
      },
      {
        label: "Clinic",
        links: [
          { label: "Hours and location", href: "/hours" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },
];

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
  nav,
  footer: [
    { heading: "Treatments", links: treatments },
    {
      heading: "Clinic",
      links: [
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
