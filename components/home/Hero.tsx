import Link from "next/link";
import { Orchid } from "@/components/brand/Orchid";
import { Stars } from "@/components/home/Stars";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Watermark } from "@/components/layout/Watermark";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";
import { primaryRating } from "@/lib/ratings";

export function Hero() {
  const rating = primaryRating();
  return (
    <section className="relative grid overflow-hidden lg:min-h-[86vh] lg:grid-cols-[1.05fr_1fr]">
      <div className="relative flex flex-col justify-center px-gutter-sm py-14 lg:py-24 lg:pr-gutter lg:pl-[max(var(--spacing-gutter),calc((100vw-var(--container-site))/2+var(--spacing-gutter)))]">
        <Watermark className="-top-[60px] -left-[140px]" />
        <div className="relative">
          <Eyebrow>Medical aesthetics &middot; Midnapore, Calgary SE</Eyebrow>
          <h1 className="my-6 text-[48px] lg:mt-6 lg:mb-7 lg:text-[80px]">
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
          <div className="mt-12 flex flex-col gap-2.5 text-[13px] text-muted-foreground lg:flex-row lg:items-center lg:gap-7">
            <span>
              <Stars
                label={`${rating.value} out of 5 on ${rating.source}`}
                className="mr-1.5"
              />
              <b className="font-medium text-foreground">{rating.value}</b> on{" "}
              {rating.source}, {rating.count} reviews
            </span>
            <span>
              Licensed since{" "}
              <b className="font-medium text-foreground">{siteConfig.founded}</b>
            </span>
          </div>
        </div>
      </div>
      <div className="relative aspect-[4/5] lg:aspect-auto">
        <Photo
          slot="hero"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute right-5 bottom-5 z-10 flex items-center gap-3.5 rounded-sm bg-card px-[18px] py-3.5 shadow-[0_12px_40px_rgba(28,26,23,0.12)] lg:right-8 lg:bottom-8">
          <Orchid className="h-8 w-[30px] shrink-0 text-copper" />
          <div>
            <b className="block text-[13px] font-medium">
              Eminence Organics stockist
            </b>
            <span className="text-xs text-muted-foreground">
              Certified organic skincare, in every facial
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
