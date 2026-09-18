import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";

export function Consultation() {
  const { durationMin } = siteConfig.consultation;
  const points = [
    `${durationMin} minutes, in the clinic, no cost`,
    "Skin analysis and an honest read on what will actually work",
    "A written plan with pricing before you commit to anything",
  ];

  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
          <Photo
            slot="consultation"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <Eyebrow>Not sure where to start</Eyebrow>
          <h2 className="mt-4">Book a free consultation</h2>
          <ul className="my-7 mb-9">
            {points.map((point) => (
              <li
                key={point}
                className="border-t border-border py-3.5 text-[15px] last:border-b"
              >
                {point}
              </li>
            ))}
          </ul>
          <Link href="/contact" className={buttonVariants()}>
            Book a consultation
          </Link>
        </div>
      </Container>
    </Section>
  );
}
