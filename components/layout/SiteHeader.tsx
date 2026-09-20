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
      <Container className="relative flex flex-wrap items-center justify-between gap-y-4 pt-4 pb-3 xsm:h-16 xsm:flex-nowrap xsm:gap-y-0 xsm:pt-0 xsm:pb-0 lg:h-[76px]">
        <Brand />
        <DesktopNav items={NAV} />
        <div className="flex items-center gap-2.5 lg:gap-[22px]">
          <ModeToggle />
          {/* Click-to-call, icon only where the number does not fit. She is closed
              far more hours than she is open, so reaching her is the header's
              second job after booking. */}
          <a
            href={siteConfig.phone.tel}
            aria-label={`Call ${siteConfig.phone.display}`}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card lg:hidden"
          >
            <Phone className="size-4" />
          </a>
          <a
            href={siteConfig.phone.tel}
            className="hidden text-[13px] text-muted-foreground lg:inline"
          >
            {siteConfig.phone.display}
          </a>
        </div>
        {/* Order puts this last in the DOM so it wraps to row two on its own;
            from `xsm` it returns inline, ahead of the burger, as before.

            Outlined on the two-row layout, solid from `xsm`. Full width and solid
            put a second copper slab about 180px above the hero's own "Book a
            treatment" on the home page, and two shouting buttons in one screen
            means neither is the loud one. Outlined keeps it always-there without
            competing; the hero stays the primary. */}
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
        <MobileNav items={NAV} />
      </Container>
    </HeaderScrollHider>
  );
}
