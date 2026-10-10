import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import type { ImageSlotType } from "@/data/imagesData";

/**
 * The closing ask on an inner page, over a photograph instead of a plain sand
 * band: a treatment in progress, darkened enough to read on, with the copy
 * centred on it. `tone="dark"` so the eyebrow and buttons pick their dark-band
 * colours.
 */
export function PhotoCta({
  slot,
  eyebrow,
  title,
  children,
  href,
  action,
}: {
  slot: ImageSlotType;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  href: string;
  action: string;
}) {
  return (
    <Section tone="dark" className="relative isolate overflow-hidden">
      <Photo slot={slot} fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-dark/70" />
      <div className="absolute inset-0 -z-10 bg-radial from-transparent to-dark/60" />
      <Container className="reveal max-w-3xl py-6 text-center lg:py-10">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 lg:text-[56px]">{title}</h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-relaxed text-on-dark-muted lg:text-[19px]">
          {children}
        </p>
        <Link href={href} className={`${buttonVariants()} mt-9 inline-flex`}>
          {action}
        </Link>
      </Container>
    </Section>
  );
}
