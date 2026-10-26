import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { BookingHost } from "@/components/booking/BookingHost";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LookSwitch, lookBootScript } from "@/components/theme/LookSwitch";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <head>
        {/* With LookSwitch below, until the client picks a look. */}
        <script dangerouslySetInnerHTML={{ __html: lookBootScript }} />
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
            <LookSwitch />
          </BookingHost>
        </ThemeProvider>
      </body>
    </html>
  );
}
