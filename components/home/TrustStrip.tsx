import { Container } from "@/components/layout/Container";
import { servicesData } from "@/data/servicesData";
import { siteConfig } from "@/data/siteConfig";

export function TrustStrip() {
  const { address, consultation, founded } = siteConfig;
  const items = [
    {
      glyph: "✓",
      title: `Licensed since ${founded}`,
      text: "City of Calgary registered clinic",
    },
    {
      glyph: "◆",
      title: `${servicesData.length} treatments`,
      text: "Face, body, skin and massage",
    },
    {
      glyph: "✦",
      title: "Free consultation",
      text: `${consultation.durationMin} minutes, no commitment`,
    },
    {
      glyph: "●",
      title: "Free parking at the door",
      text: `${address.unit}, ${address.street}`,
    },
  ];

  return (
    <div className="border-y border-border bg-card">
      <Container className="grid grid-cols-2 px-0 max-xsm:grid-cols-1 lg:grid-cols-4 lg:px-0">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3.5 border-b border-border px-5 py-5 text-sm lg:border-r lg:border-b-0 lg:px-6 lg:py-[26px] lg:last:border-r-0"
          >
            <i
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-copper font-serif text-lg text-copper not-italic"
            >
              {item.glyph}
            </i>
            <div>
              <b className="block font-medium">{item.title}</b>
              <span className="text-[13px] text-muted-foreground">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
