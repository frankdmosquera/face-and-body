import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Watermark } from "@/components/layout/Watermark";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";

export default function Home() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <Watermark className="-top-[60px] -left-[140px]" />
        <Container className="relative">
          <Eyebrow>Medical aesthetics &middot; Midnapore, Calgary SE</Eyebrow>
          <h1 className="my-6 lg:mt-6 lg:mb-7 lg:text-[80px]">
            Skin that shows
            <br />
            the <em className="text-copper">work</em> you
            <br />
            put into it.
          </h1>
          <Lede>{siteConfig.description}</Lede>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link href="/contact" className={buttonVariants()}>
              Book a treatment
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "link" })}
            >
              Free consultation &rarr;
            </Link>
          </div>
        </Container>
      </Section>
      <Divider className="pb-section-sm lg:pb-section" />
    </>
  );
}
