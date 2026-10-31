import { siteConfig, type DayType } from "@/data/siteConfig";

const SCHEMA_DAYS: Record<DayType, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

/**
 * Her business as Google reads it (schema.org BeautySalon): name, address, map point, phone, hours and her
 * profiles, all from siteConfig, so it always says what the pages say. No star rating: Google refuses ratings a
 * business marks up about itself, and ones copied from Google itself above all.
 */
export function BusinessJsonLd() {
  const { name, url, description, phone, email, address, geo, hours, social } =
    siteConfig;
  const business = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${url}/#business`,
    name,
    url,
    description,
    image: `${url}/logo-mark.jpg`,
    telephone: phone.tel.replace("tel:", ""),
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.unit}`,
      addressLocality: address.city,
      addressRegion: address.province,
      postalCode: address.postalCode,
      addressCountry: "CA",
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    openingHoursSpecification: hours.flatMap((day) =>
      "closed" in day
        ? []
        : [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: SCHEMA_DAYS[day.day],
              opens: day.open,
              closes: day.close,
            },
          ],
    ),
    sameAs: [social.instagram, social.facebook],
  };
  return (
    <script
      type="application/ld+json"
      // "<" written as its code, so no text in it can close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(business).replace(/</g, "\\u003c"),
      }}
    />
  );
}
