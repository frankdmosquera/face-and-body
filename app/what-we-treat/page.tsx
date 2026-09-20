import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { CONCERNS, concernHref } from "@/data/concerns";
import { getServicesByConcern } from "@/lib/services";

const LEDE =
  "Come in with the thing that bothers you rather than a treatment name. Every one of these leads to what she would actually use for it, and why.";

/**
 * The index for the eight concern pages.
 *
 * WHY IT EXISTS. The concerns used to live at /treat/<slug> with no parent,
 * reachable only from a dropdown and a strip on the home page. That left
 * eight pages with almost nothing pointing at them, and it meant the
 * breadcrumb had nowhere to put its middle rung.
 *
 * This is the hub. It links to all eight and each one links back, which is
 * the structure that tells a crawler these pages belong together and that
 * the site has real depth on the subject. Internal linking is a genuine
 * ranking factor in a way that words in a URL are not, so this page does
 * more for the eight than the rename did.
 *
 * It is also a landing page in its own right: someone searching for the
 * problem rather than the procedure has somewhere to arrive.
 */
export const metadata: Metadata = {
  title: "What we treat",
  description:
    "Acne, pigmentation, fine lines, scarring, unwanted hair, muscle tension and more. What Face and Body Wellness Centre treats in Midnapore, Calgary SE, and the treatments used for each.",
};

export default function WhatWeTreatPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Container className="relative py-10 lg:py-[72px]">
          <Watermark className="-top-[140px] -left-[180px]" />
          <div className="relative max-w-3xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 text-xs tracking-[0.08em] text-muted-foreground uppercase"
            >
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span aria-hidden="true"> &nbsp;/&nbsp; </span>
              <span aria-current="page">What we treat</span>
            </nav>
            <Eyebrow>Start with the problem</Eyebrow>
            <h1 className="my-5 lg:text-[66px]">What we treat</h1>
            <Lede>{LEDE}</Lede>
          </div>
        </Container>
      </section>

      <Section tone="sand" className="pt-10 lg:pt-14">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONCERNS.map((concern) => {
              const count = getServicesByConcern(concern.slug).length;
              return (
                <li key={concern.slug}>
                  <Link
                    href={concernHref(concern)}
                    className="group flex h-full flex-col rounded-lg border border-border bg-card p-7 transition-colors hover:border-foreground"
                  >
                    <span className="text-xs tracking-[0.08em] text-muted-foreground uppercase">
                      {count} {count === 1 ? "treatment" : "treatments"}
                    </span>
                    <span className="mt-3 font-serif text-[26px] leading-tight group-hover:text-accent-foreground">
                      {concern.label}
                    </span>
                    <span className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                      {concern.description}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-5 text-xs tracking-[0.08em] text-accent-foreground uppercase"
                    >
                      See treatments &rarr;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </>
  );
}
