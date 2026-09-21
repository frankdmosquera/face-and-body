import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { getService, serviceHref } from "@/lib/serviceQueries";

const SLUGS = [
  "microneedling-face",
  "microneedling-abdomen",
  "fractional-microneedling",
] as const;

export function Signature() {
  const lead = getService("microneedling-face");
  const services = SLUGS.map(getService).filter(
    (service) => service !== undefined,
  );

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <Photo
            slot="signature"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <Eyebrow>Signature treatment</Eyebrow>
          <h2 className="mt-4 mb-5">Microneedling collagen induction</h2>
          {lead && <Lede>{lead.description}</Lede>}
          <ul className="my-7 mb-9">
            {services.map((service) => (
              <li
                key={service.slug}
                className="flex justify-between gap-4 border-t border-border py-3.5 text-[15px] last:border-b"
              >
                {service.name}
                <span className="text-right text-muted-foreground">
                  {service.price === null
                    ? "Priced at consultation"
                    : `$${service.price} · ${service.durationMin} min`}
                </span>
              </li>
            ))}
          </ul>
          {/* The fallback below was /treatments/skin, a route deleted on
              2026-09-20. It never rendered, because `lead` is always set while
              microneedling is in the catalogue, so nothing caught it.
              /other-treatments#skin is where those treatments live now. */}
          <Link
            href={lead ? serviceHref(lead) : "/other-treatments#skin"}
            className={buttonVariants({ variant: "outline" })}
          >
            About microneedling
          </Link>
        </div>
      </Container>
    </Section>
  );
}
