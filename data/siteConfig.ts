export type SiteLink = { label: string; href: string };

export type SiteConfig = {
  name: string;
  shortName: string;
  subName: string;
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
  social: { instagram: string; facebook: string };
  nav: SiteLink[];
  footer: { heading: string; links: SiteLink[] }[];
};

const social = {
  instagram: "https://www.instagram.com/faceandbodywellnesscentre/",
  facebook: "https://www.facebook.com/FACEANDBODYWELLNESSCENTRE/",
};

const treatments: SiteLink[] = [
  { label: "Facials", href: "/treatments/facials" },
  { label: "Skin Treatments", href: "/treatments/skin" },
  { label: "Body", href: "/treatments/body" },
  { label: "Massage", href: "/treatments/massage" },
  { label: "Laser and IPL", href: "/treatments/laser" },
];

export const siteConfig: SiteConfig = {
  name: "Face and Body Wellness Centre",
  shortName: "Face & Body",
  subName: "Wellness Centre",
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
