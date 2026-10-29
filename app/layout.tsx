import type { CSSProperties } from "react";
import type { Metadata } from "next";
import {
  fetchSiteColours,
  siteColourTokens,
} from "@frankdmosquera/booking-component/site-colours";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { BookingHost } from "@/components/booking/BookingHost";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { designBootScript, designOptionsCss } from "@/lib/designOptions";
import { siteConfig } from "@/data/siteConfig";
import { BOOKING_API_URL, BOOKING_SLUG } from "@/lib/bookingConfig";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Her colours from Booking CRM's Look page, read again once a minute so the
  // pages stay static. None saved, or the API unreachable, leaves her own
  // copper in globals.css.
  const siteColours = siteColourTokens(
    await fetchSiteColours(BOOKING_API_URL, BOOKING_SLUG, {
      next: { revalidate: 60 },
    }),
  );
  // Which of the three she saved, for globals.css: "main bg text".
  const savedColours = [
    siteColours["--site-main"] && "main",
    siteColours["--site-bg"] && "bg",
    siteColours["--site-text"] && "text",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} h-full`}
      style={siteColours as CSSProperties}
      data-site-colours={savedColours || undefined}
    >
      <head>
        {/* With DesignPicker on each page, until the options are picked. */}
        <style dangerouslySetInnerHTML={{ __html: designOptionsCss }} />
        <script dangerouslySetInnerHTML={{ __html: designBootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          {/* Every Book anchor on the page opens Booking CRM's window. */}
          <BookingHost apiUrl={BOOKING_API_URL} slug={BOOKING_SLUG}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </BookingHost>
        </ThemeProvider>
      </body>
    </html>
  );
}
