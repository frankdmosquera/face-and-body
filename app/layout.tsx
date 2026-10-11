import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { BookingPopup } from "@/components/booking/BookingPopup";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LookSwitch, lookBootScript } from "@/components/theme/LookSwitch";
import { designBootScript, designOptionsCss } from "@/lib/designOptions";
import { siteConfig } from "@/data/siteConfig";
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
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          {/* Renders nothing. It arms every data-cal-link on the page and
              warms the booker, so a Book click opens an overlay that is
              already loaded rather than starting to load. */}
          <BookingPopup />
          <LookSwitch />
        </ThemeProvider>
      </body>
    </html>
  );
}
