import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { CATEGORIES } from "@/data/categoriesData";
import { siteConfig } from "@/data/siteConfig";
import { getUnpricedServices, pricingMessage, smsLink } from "@/lib/contact";

export function PricingEnquiry() {
  const services = getUnpricedServices();
  const { durationMin } = siteConfig.consultation;

  return (
    <Section className="pt-0">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Photo
            slot="catSkin"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <Eyebrow>Priced at consultation</Eyebrow>
          <h2 className="mt-4">Some treatments need a look first</h2>
          <Lede className="mt-5">
            These depend on the area, your skin and how many sessions you need,
            so there is no single number. Ask and we will give you a real
            figure, not a range.
          </Lede>
          <ul className="mt-7">
            {services.map((service) => {
              const category = CATEGORIES.find(
                (entry) => entry.slug === service.category,
              );
              return (
                <li
                  key={service.slug}
                  className="flex items-center justify-between gap-4 border-t border-border py-4 text-[15px] last:border-b"
                >
                  <div>
                    <b className="font-medium">{service.name}</b>
                    <br />
                    <span className="text-[13px] text-muted-foreground">
                      {category?.label}
                    </span>
                  </div>
                  <a
                    href={smsLink(pricingMessage(service))}
                    className="shrink-0 border-b border-copper pb-0.5 text-xs tracking-[0.06em] uppercase"
                  >
                    Ask about pricing
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">
            Or book the free {durationMin} minute consultation and get the whole
            plan in writing.{" "}
            <Link href="#form" className={buttonVariants({ variant: "link" })}>
              Send a message &rarr;
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
