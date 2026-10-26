import type { ReactNode } from "react";
import { bookingHref, bookingTrigger } from "@/lib/bookingConfig";

/**
 * A Book control: a real link that `BookingHost` turns into the booking window.
 *
 * A PLAIN `<a>`, NEVER NEXT'S `<Link>`, and that is the whole reason this
 * component exists rather than four call sites spreading the attributes
 * themselves.
 *
 * With Cal.com both were firing: `Link` navigated to /book while the
 * provider's own listener opened its overlay, and the visitor got two
 * calendars stacked. On a plain anchor `BookingHost` cancels the click and
 * only the window opens.
 *
 * The `href` still matters and is not decoration. Without JavaScript, or
 * before the page has hydrated, the anchor does what an anchor does and the
 * visitor lands on /book - so middle-click, copy link address and sharing keep
 * working, and a Book button is never a dead control.
 */
export function BookLink({
  treatmentSlug,
  className,
  children,
}: {
  /** The treatment to open. Omitted for a general Book control. */
  treatmentSlug?: string;
  className?: string;
  /* Optional because Base UI render props inject their own children: the
     sheet's SheetClose passes "Book now" in when it clones this. */
  children?: ReactNode;
}) {
  return (
    <a
      href={bookingHref(treatmentSlug)}
      {...bookingTrigger(treatmentSlug)}
      className={className}
    >
      {children}
    </a>
  );
}
