import type { CSSProperties } from "react";
import type { Metadata } from "next";
import {
  fetchSiteColours,
  siteColourTokens,
} from "@frankdmosquera/booking-component/site-colours";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { BookingHost } from "@/components/booking/BookingHost";
import { ChatHost } from "@/components/chat/ChatHost";
import { chatTreatmentTiles } from "@/data/chatTiles";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

/** Her three hand-made looks (globals.css), by the main colour that picks
 *  each on Booking CRM's Look page. Copper is the base, so it sets nothing. */
const HAND_MADE_LOOKS: Record<string, "copper" | "gold" | "espresso"> = {
  "#c0704f": "copper",
  "#8f6f3a": "gold",
  "#2b2522": "espresso",
};

/** Her own lightest and darkest, for words on any other main colour. */
const SITE_INKS = { light: "#fffdf9", dark: "#1c1a17" };

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Her colours from Booking CRM's Look page, read again once a minute so the
  // pages stay static. None saved, or the API unreachable, leaves her own
  // copper in globals.css. Her main colour picking one of her hand-made looks
  // shows that look shade for shade; any other is worked out from the three.
  const theme = await fetchSiteColours(BOOKING_API_URL, BOOKING_SLUG, {
    next: { revalidate: 60 },
  });
  const look = HAND_MADE_LOOKS[theme?.main?.toLowerCase() ?? ""];
  const siteColours = look ? {} : siteColourTokens(theme, SITE_INKS);
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
      data-look={look === "copper" ? undefined : look}
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
            {/* The AI chat in the corner, inside BookingHost so its "Book a
                treatment" opens the same window. */}
            <ChatHost
              apiUrl={BOOKING_API_URL}
              slug={BOOKING_SLUG}
              tiles={chatTreatmentTiles()}
            />
          </BookingHost>
        </ThemeProvider>
      </body>
    </html>
  );
}
