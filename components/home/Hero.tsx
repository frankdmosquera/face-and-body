import Link from "next/link";
import { Orchid } from "@/components/brand/Orchid";
import { Stars } from "@/components/home/Stars";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Watermark } from "@/components/layout/Watermark";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { BookLink } from "@/components/booking/BookLink";
import { siteConfig } from "@/data/siteConfig";
import { primaryRating } from "@/lib/ratings";

export function Hero() {
  const rating = primaryRating();
  // The photograph is capped in both directions, because the source is small.
  //
  // HEIGHT. 86vh unbounded meant 929px of hero on a 1080p screen and more above
  // that. Capped, it stays 86vh on a laptop and stops growing once the screen
  // is tall enough for that to be too much.
  //
  // Trimmed 2rem on 2026-09-21: the cap from 780 to 748 and the tall-screen
  // padding from 96px a side to 80px. Both, because they were within 3px of
  // each other - the column measures 585px of copy plus its padding, so the
  // floor and the content took turns setting the height and moving one alone
  // moved nothing. It reads tall on a large desktop and fine on a phone,
  // which is the screen the untouched mobile padding serves.
  //
  // WIDTH. A `1fr` image column kept taking half the viewport however wide it
  // got: 929px at 1920 and 1249px at 2560, from a 426x568 file, which is a
  // 2.18x upscale and then a 2.93x one. It read as oversized and soft for the
  // same reason at both. From `xl` the column is a fixed 620px, which is what
  // `1fr` already resolved to at 1280, so nothing moves at the breakpoint and
  // nothing grows past it. The text column absorbs the difference; its copy is
  // capped at 56ch and the headline breaks by hand, so neither stretches.
  //
  // The real fix is a bigger photograph. This keeps the upscale at 1.46x until
  // one arrives.
  return (
    <section className="relative grid overflow-hidden lg:min-h-[min(86vh,748px)] lg:grid-cols-[1.05fr_1fr] xl:grid-cols-[1fr_620px]">
      {/* Queried on height, not width, the same reason the sheet footer is.
          `min-h` is a floor, and below about 905px of viewport it never binds:
          the hero is whatever this column measures, which is 585px of copy
          plus the padding. At 96px a side that is 777px on every laptop alike,
          so a 720px screen wore 134px of hero below the fold and lost the
          trust strip entirely. 64px under 850px tall brings it to 713 and the
          strip peeks there too. Above 850 nothing changes, which is where it
          already lands right. */}
      <div className="relative flex flex-col justify-center px-gutter-sm py-14 lg:py-16 lg:pr-gutter lg:pl-[max(var(--spacing-gutter),calc((100vw-var(--container-site))/2+var(--spacing-gutter)))] lg:[@media(min-height:850px)]:py-20">
        <Watermark className="-top-[60px] -left-[140px]" />
        <div className="relative">
          <Eyebrow>Medical aesthetics &middot; Midnapore, Calgary SE</Eyebrow>
          <h1 className="my-6 text-[48px] lg:mt-6 lg:mb-7 lg:text-[60px] xl:text-[80px]">
            Skin that shows
            <br />
            the <em className="text-copper">work</em> you
            <br />
            put into it.
          </h1>
          <Lede>{siteConfig.description}</Lede>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <BookLink className={buttonVariants()}>Book a treatment</BookLink>
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
          </div>
        </div>
      </div>
      {/* The ratio follows the layout, the same rule the contact, category and
          concern pages already use. 4:5 at every width put an 834x1042 image
          on a mini iPad, taller than the viewport, so a full screen of
          photograph sat between the buttons and the next section. Portrait
          only once there is a text column beside it. */}
      <div className="relative aspect-[4/3] md:aspect-[2/1] lg:aspect-auto">
        <Photo
          slot="hero"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          /* Crop off the TOP on desktop, not the bottom. The column is 620x748
             and the photograph covers to 620x928, so 180px has to go
             somewhere; centred, it took 90 off each end and cut her shoulder.
             At 88% the window sits low - 158px comes off the top, 22 off the
             bottom - and the shoulder stays in.

             Desktop only. The mobile box is 4:3, where the same rule would
             crop 280px off the top and leave a pillow where her face was. */
          className="object-cover object-center lg:object-[50%_88%]"
        />
        {/* TOP LEFT UNTIL `lg`, BOTTOM RIGHT FROM IT, and the photograph is
            why. Below `lg` the image is a 4:3 crop of a woman lying down, and
            bottom right is her chin and mouth: the badge is 312px wide in a
            375px box, so it does not clear her, it covers her. The top of the
            same crop is blanket and out-of-focus warmth, which is the one part
            of the picture nothing is lost to.

            From `lg` the photograph becomes a tall column beside the text and
            is cropped low (`object-[50%_88%]`, see above), so her face sits
            high and the bottom right corner is blanket again. The corner the
            badge wants is wherever the face is not, and that moves with the
            crop. */}
        <div className="absolute top-5 left-5 z-10 flex items-center gap-3.5 rounded-sm bg-card px-[18px] py-3.5 shadow-[0_12px_40px_rgba(28,26,23,0.12)] lg:top-auto lg:right-8 lg:bottom-8 lg:left-auto">
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
