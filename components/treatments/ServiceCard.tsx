import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Orchid } from "@/components/brand/Orchid";
import { buttonVariants } from "@/components/ui/button";
import { BookLink } from "@/components/booking/BookLink";
import type { ServiceType } from "@/types/servicesTypes";
import { cn } from "@/lib/cn";

function Price({ service }: { service: ServiceType }) {
  if (service.price === null) {
    return (
      /* Smaller than a numeric price on purpose. "At consultation" is five
         times the width of "$290" at the same size, and at 254px - the
         narrowest a card gets - it pushed the button onto a second line and
         made those cards 48px taller than every other card on the page. */
      <span className="font-serif text-[17px] leading-none text-copper">
        At consultation
      </span>
    );
  }
  return (
    <span className="font-serif text-[26px] leading-none text-copper">
      {service.priceFrom && (
        <small className="mr-1 font-sans text-xs tracking-[0.04em] text-muted-foreground">
          from
        </small>
      )}
      ${service.price}
    </span>
  );
}

export function ServiceCard({ service }: { service: ServiceType }) {
  const unpriced = service.price === null;

  return (
    <li
      id={service.slug}
      /* Parked, and nothing reads it. It was the hook a concern filter would
         have used to show and hide cards without a re-render. The filter went
         with the /what-we-treat pages on 2026-09-20; see the header of
         `data/concernsData.ts`. Left in place because it costs one attribute
         and is exactly what the filter would need again. */
      data-concerns={service.concerns.join(" ")}
      /**
       * `featured` no longer changes how a card looks, and the flag stays in
       * the data.
       *
       * It used to give a card `lg:col-span-3` and a larger title, which suited
       * the old three-column category pages where spanning the row made a
       * treatment the hero of its section. In the four-column tabbed grid it
       * spanned three of four columns and pushed the rest into new rows: the
       * Skin tab laid four cards out over three rows at 273, 303 and 255px,
       * which is what read as the cards not lining up.
       *
       * All four flagged treatments - Microneedling Face and Abdomen, IPL and
       * Laser Hair Removal - are on /other-treatments, so this never touched
       * the facials. The flag is kept because "this is the one to look at" is
       * still a real thing to say about a treatment; it just needs a treatment
       * that does not break the row it sits in.
       */
      className={cn(
        // scroll-mt clears the sticky header when a link jumps to this card.
        // Two values because the header has two heights: 172px below `xsm`,
        // where Book now sits on its own row, and 96px from there up. Same
        // pair as the tab strip in `GroupTabs`, for the same reason.
        "group/card relative flex scroll-mt-44 xsm:scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-transparent bg-card p-6 shadow-[0_1px_2px_rgba(28,26,23,0.04),0_14px_32px_-20px_rgba(28,26,23,0.22)] transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-copper/30 hover:shadow-[0_30px_56px_-26px_rgba(28,26,23,0.38)]",
      )}
    >
      {/**
       * Two lines of room for the title and three for the description, on
       * every card, whether or not the words need them. That is what makes
       * the grid even.
       *
       * `line-clamp` on its own only sets a ceiling: a three-word treatment
       * still made a shorter card than a wordy one, so the rows stayed ragged.
       * The `min-h` is the half that fixes it. Both are in `lh` rather than
       * pixels so they follow the font size instead of breaking the first time
       * the type changes.
       *
       * The clamp is clear of descenders. The description runs at
       * `leading-relaxed`, a 22.75px line box for 14px text, so the tails on
       * g, y and p sit well above the cut.
       */}
      {/* A copper-to-gold rule that draws across the top edge on hover, the
          same gesture as the rule on the photo tile beside the cards. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-copper to-gold transition-transform duration-500 ease-out group-hover/card:scale-x-100"
      />
      {/* THE FACTS LEAD, THE PRICE CLOSES. Time and Eminence used to share a
          small grey line under the price, where they read as fine print. Up
          here they are the first thing the eye lands on, which is what someone
          scanning forty treatments for "how long" needs, and the footer is
          left to the price and the one action.

          Eminence still costs no height. Only 4 of the 40 treatments carry
          it, and a badge row of its own would mean 36 cards reserving empty
          space or 4 cards standing taller than the rest. Sharing the row with
          the time, it is free. */}
      <div className="flex items-center justify-between gap-3 text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
          <Clock aria-hidden="true" className="size-3.5" />
          {service.durationMin} min
        </span>
        {service.eminence && (
          <span className="inline-flex items-center gap-1.5 text-accent-foreground">
            <Orchid aria-hidden="true" className="h-4 w-3.5" />
            Eminence
          </span>
        )}
      </div>
      <h3 className="mt-4 line-clamp-2 min-h-[1lh] text-[24px] leading-[1.12] transition-colors duration-300 group-hover/card:text-accent-foreground xl:min-h-[2lh]">
        {service.name}
      </h3>
      <p className="mt-2 mb-5 line-clamp-4 min-h-[4lh] text-[14px] leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      {/* Wraps because "At consultation" beside "Ask about pricing" exceeds a
          phone-width card, and neither is allowed to shrink. `mt-auto` pins
          it to the floor, so the rules line up across a row. */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Price service={service} />
        {/* Book goes to the booker, Enquire stays on the contact form. A
            treatment priced at consultation has no time to pick yet: she has
            to look at your skin before anyone knows how long it takes. Until
            an account is configured `bookingHref` returns the contact page
            too, so both buttons behave exactly as they did before /book. */}
        {unpriced ? (
          <Link
            href={`/contact?treatment=${service.slug}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "shrink-0",
            )}
          >
            Enquire
          </Link>
        ) : (
          <BookLink
            treatmentSlug={service.slug}
            className={cn(buttonVariants({ size: "sm" }), "shrink-0")}
          >
            Book
            <ArrowRight
              aria-hidden="true"
              className="-mr-1 size-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5"
            />
          </BookLink>
        )}
      </div>
    </li>
  );
}
