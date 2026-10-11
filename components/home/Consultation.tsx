import { Check } from "lucide-react";
import Link from "next/link";
import { ConsultSeal } from "@/components/home/ConsultSeal";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import type { ImageSlotType } from "@/data/imagesData";
import { siteConfig } from "@/data/siteConfig";

const { durationMin } = siteConfig.consultation;
const POINTS = [
  `${durationMin} minutes, in the clinic, no cost`,
  "Skin analysis and an honest read on what will actually work",
  "A written plan with pricing before you commit to anything",
];

function Tick() {
  return (
    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-gold/60 text-gold">
      <Check aria-hidden="true" className="size-3.5" strokeWidth={2.4} />
    </span>
  );
}

/**
 * The "Let us look first" treatment from /other-treatments, which Frank liked
 * there: the photograph across the whole band under a dark veil, the ask
 * centred on it, the three points in a row and the seal turning in the
 * corner. Two versions, one per photograph: "Massage" is the same picture as
 * on /other-treatments, "Mask" is a facial, which is what this page sells.
 */
function FullBand({ option, slot }: { option: string; slot: ImageSlotType }) {
  return (
    <Section
      tone="dark"
      data-option={option}
      className="relative isolate overflow-hidden"
    >
      <Photo slot={slot} fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-dark/70" />
      <div className="absolute inset-0 -z-10 bg-radial from-transparent to-dark/60" />
      <ConsultSeal className="absolute top-10 right-[6%] hidden lg:grid" />
      <Container className="reveal max-w-5xl py-6 text-center lg:py-10">
        <Eyebrow>Not sure where to start</Eyebrow>
        <h2 className="mt-4 lg:text-[56px]">
          Book a <em className="text-gold">free</em> consultation
        </h2>
        <ul className="mx-auto mt-10 grid max-w-4xl gap-5 text-left text-[16px] md:grid-cols-3 md:gap-8">
          {POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3.5">
              <Tick />
              {point}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className={`${buttonVariants()} mt-11 inline-flex`}
        >
          Book a consultation
        </Link>
      </Container>
    </Section>
  );
}

/** Three versions, one shown at a time by the design options (`DesignPicker`). */
export function Consultation() {
  return (
    <>
      <HalfBand />
      <FullBand option="consult-full" slot="concernMuscleTension" />
      <FullBand option="consult-mask" slot="consultation" />
    </>
  );
}

function HalfBand() {
  /* Dark, the page's second espresso band: it was sand beside the sand FAQ,
     and the ask should stand out. The photograph bleeds to the page edge
     across half the band, no frame (the arch belongs to "Your visit"), with
     the seal riding the seam. */
  return (
    <Section
      tone="dark"
      data-option="consult-half"
      className="relative overflow-hidden py-0! lg:py-0!"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 size-[38rem] rounded-full bg-copper/20 blur-[120px]"
      />
      <div className="relative grid lg:min-h-[620px] lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Photo
            slot="consultation"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-dark-surface/40 max-lg:hidden" />
          <ConsultSeal className="absolute -bottom-14 left-1/2 z-10 -translate-x-1/2 lg:top-1/2 lg:-right-14 lg:bottom-auto lg:left-auto lg:translate-x-0 lg:-translate-y-1/2" />
        </div>
        <div className="reveal flex flex-col justify-center px-gutter-sm pt-24 pb-section-sm lg:px-20 lg:py-20 xl:pr-[max(var(--spacing-gutter),calc((100vw-var(--container-site))/2+var(--spacing-gutter)))]">
          <Eyebrow>Not sure where to start</Eyebrow>
          <h2 className="mt-4">
            Book a <em className="text-gold">free</em> consultation
          </h2>
          <ul className="my-8 mb-10 space-y-4">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3.5 text-[16px]">
                <Tick />
                {point}
              </li>
            ))}
          </ul>
          <div>
            <Link href="/contact" className={buttonVariants()}>
              Book a consultation
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
