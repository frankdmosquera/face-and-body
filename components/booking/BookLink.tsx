import type { ReactNode } from "react";
import { bookingHref, bookingTrigger } from "@/lib/bookingConfig";

/**
 * A Book control: a real link that Cal turns into an overlay.
 *
 * A PLAIN `<a>`, NEVER NEXT'S `<Link>`, and that is the whole reason this
 * component exists rather than four call sites spreading the attributes
 * themselves.
 *
 * Both were firing. `Link` handles the click in React and navigates to /book,
 * which renders the inline booker; Cal's own document listener opens the
 * overlay. The visitor got the calendar twice, one on top of the other, and
 * had to dismiss the overlay to reach the page underneath it. On a plain
 * anchor Cal cancels the click and only the overlay happens.
 *
 * The `href` still matters and is not decoration. Without JavaScript, or
 * before Cal's script has loaded, the anchor does what an anchor does and the
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
