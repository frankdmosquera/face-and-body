import { Phone } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/layout/Brand";
import { Container } from "@/components/layout/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { HeaderScrollHider } from "@/components/layout/HeaderScrollHider";
import { MobileNav } from "@/components/layout/MobileNav";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { buttonVariants } from "@/components/ui/button";
import { NAV } from "@/data/nav";
import { siteConfig } from "@/data/siteConfig";

export function SiteHeader() {
  return (
    <HeaderScrollHider>
      {/* Two rows under `xsm`, one row above it. Everything on one line needs
          brand 116 + toggle 40 + phone 40 + book 124 + burger 40, plus gaps and
          gutters: about 432px. `xsm` is 440, so the token already sits where the
          measurement lands. Below it the Book button wraps to its own full-width
          row rather than squeezing the wordmark onto three lines.

          The extra height is affordable because `HeaderScrollHider` takes the
          header away on scroll down and returns it on scroll up, so this is not
          permanent chrome - and the CTA gets bigger on the narrow screens rather
          than smaller, which is the right direction for a site whose job is
          bookings. */}
      {/* HEIGHT IS THE CONTENT, WITH A FLOOR. It used to be `xsm:h-16
          lg:h-[92px]`, two fixed numbers that had to be re-tuned by hand every
          time the logo changed size and silently clipped it if you forgot. The
          row is padding now, so the tallest thing in it sets the height and the
          two can never disagree.

          `min-h` is the guard, not the rule. The logo's own wrapper carries an
          explicit size, so a missing image leaves a white disc of the same
          size rather than collapsing - but the floor means the header
          survives even if that wrapper is ever changed to size itself from the
          file. A header that quietly loses half its height is the kind of thing
          nobody notices until a client does. */}
      <Container className="relative flex flex-wrap items-center justify-between gap-y-4 pt-4 pb-3 xsm:flex-nowrap xsm:min-h-16 xsm:gap-y-0 xsm:py-1 xl:max-w-[1340px] lg:min-h-[92px]">
        {/* The margins only exist from `xl`, because that is the only width
            where the desktop nav is in the row. Measured at 1440 before they
            went in: 116px of wordmark, 690px of nav, 160px of controls and a
            136px button in 1136px of container, which left 11px on either side
            of the menu. Not tight, full. */}
        <Brand className="xl:mr-8" />
        <DesktopNav items={NAV} />
        {/* ONE GROUP FROM `xl`, three loose items below it.
            `justify-between` spreads the leftover evenly across every gap, so
            while the toggle, the phone and Book now were three separate items
            the row had three gaps and the space went into all of them - a third
            of it landing between the phone and the button, where it was not
            wanted. Grouping the controls leaves two gaps, the two either side
            of the menu, and they take the whole leftover between them.

            `contents` rather than a wrapper with a box, because below `xl` the
            three have to stay direct children of the row: Book now carries
            `order-last` so it drops to its own full-width line on a small
            phone, and that only works while the row is its parent. The group
            becomes real at `xl` and is transparent everywhere else, so nothing
            about the small layout changes. */}
        <div className="contents xl:ml-8 xl:flex xl:items-center xl:gap-3.5">
          {/* `xl:contents` for the same reason one level down: at `xl` the
              toggle and the phone join the group directly, so one gap value
              governs toggle to phone to button. Below that they keep their own
              spacing and Book now is not with them. */}
          <div className="flex items-center gap-2.5 lg:gap-[22px] xl:contents">
            <ModeToggle />
            {/* Click-to-call, the icon at every width. It used to become the
                written number from `xl`, which cost about 60px in the row that
                had the least to spare. The number is in the footer on every
                page and at the top of /contact; the tap target is what the
                header owes a visitor. She is closed far more hours than she is
                open, so reaching her is the header's second job after
                booking. */}
            <a
              href={siteConfig.phone.tel}
              aria-label={`Call ${siteConfig.phone.display}`}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card"
            >
              <Phone className="size-4" />
            </a>
          </div>
          {/* Order puts this last in the DOM so it wraps to row two on its own;
              from `xsm` it returns inline, ahead of the burger, as before.

              Outlined on the two-row layout, solid from `xsm`. Full width and
              solid put a second copper slab about 180px above the hero's own
              "Book a treatment" on the home page, and two shouting buttons in
              one screen means neither is the loud one. Outlined keeps it
              always-there without competing; the hero stays the primary. */}
          <Link
            href="/contact"
            className={buttonVariants({
              variant: "outline",
              className:
                "order-last w-full xsm:order-none xsm:w-auto xsm:border-transparent xsm:bg-primary xsm:text-primary-foreground xsm:hover:bg-copper-hover xsm:hover:text-primary-foreground",
            })}
          >
            Book now
          </Link>
        </div>
        <MobileNav items={NAV} />
      </Container>
    </HeaderScrollHider>
  );
}
