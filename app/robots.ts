import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

/** Every page may be crawled; /book and /thank-you keep themselves out of results with their own noindex. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
