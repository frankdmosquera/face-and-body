import { Container } from "@/components/layout/Container";
import { servicesData } from "@/data/servicesData";
import { siteConfig } from "@/data/siteConfig";
import { primaryRating } from "@/lib/ratings";

/**
 * Four facts set as numbers, the way an editorial page states a record: big
 * serif figures, a quiet line under each. Parking moved out of here with the
 * lift; the FAQ answers it and the footer carries the address on every page.
 */
export function TrustStrip() {
  const { consultation, founded } = siteConfig;
  const rating = primaryRating();
  const items = [
    {
      figure: rating.value,
      unit: "★",
      label: `${rating.source} rating, ${rating.count} reviews`,
    },
    {
      figure: String(servicesData.length),
      unit: "",
      label: "Treatments, face to body",
    },
    {
      figure: String(consultation.durationMin),
      unit: "min",
      label: "Free consultation, no commitment",
    },
    {
      figure: String(founded),
      unit: "",
      label: "Licensed City of Calgary clinic since",
    },
  ];

  return (
    <div className="border-y border-border bg-card">
      <Container className="grid grid-cols-2 px-0 lg:grid-cols-4 lg:px-0">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-border px-5 py-7 odd:border-r max-lg:nth-[-n+2]:border-b lg:border-r lg:px-8 lg:py-9 lg:last:border-r-0"
          >
            <b className="block font-serif text-[44px] leading-none font-medium text-copper lg:text-[56px]">
              {item.figure}
              {item.unit && (
                <span className="ml-1.5 align-top font-sans text-[15px] font-normal tracking-[0.04em] text-accent-foreground lg:text-[17px]">
                  {item.unit}
                </span>
              )}
            </b>
            <span className="mt-3 block text-[13px] leading-snug text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </Container>
    </div>
  );
}
