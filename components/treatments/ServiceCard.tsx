import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
        // scroll-mt clears the sticky header when the nav jumps to this card.
        "flex scroll-mt-24 flex-col rounded-lg border border-border bg-card p-4 transition-transform duration-200 hover:-translate-y-0.5",
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
      <h3 className="line-clamp-2 min-h-[1lh] text-[22px] leading-[1.15] xl:min-h-[2lh]">
        {service.name}
      </h3>
      <p className="mt-1 line-clamp-4 min-h-[4lh] text-[14px] leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      {/* Wraps because "At consultation" beside "Ask about pricing" exceeds a
          phone-width card, and neither is allowed to shrink. */}
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-3">
        <div>
          <Price service={service} />
          {/* Eminence rides on the duration line rather than as a badge above
              the title. Only 4 of the 40 treatments carry it, so a badge row
              meant either 36 cards reserving empty space for it or 4 cards
              standing taller than the rest. Neither survives "all the same
              height". Here it costs nothing and still sits beside the price,
              which is where a brand claim earns its keep. */}
          <span className="mt-1.5 block text-xs tracking-[0.04em] text-muted-foreground">
            {service.durationMin} min
            {service.eminence && (
              <span className="text-accent-foreground">{" · "}Eminence</span>
            )}
          </span>
        </div>
        <Link
          href={`/contact?treatment=${service.slug}`}
          className={cn(
            buttonVariants({
              variant: unpriced ? "outline" : "default",
              size: "sm",
            }),
            "shrink-0",
          )}
        >
          {unpriced ? "Enquire" : "Book"}
        </Link>
      </div>
    </li>
  );
}
