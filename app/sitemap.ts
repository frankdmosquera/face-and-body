import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";

/** The pages built to be found. /book and /thank-you are left out: both ask search engines not to list them. */
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/other-treatments", priority: 0.8 },
  { path: "/products", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
