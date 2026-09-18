import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

// Wordmark only until the logo file lands; the image then goes through the ImageKit wrapper.
export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <span className="font-serif text-lg leading-none tracking-[0.04em] lg:text-[21px]">
        {siteConfig.shortName}
        <small className="mt-1 block font-sans text-[9px] tracking-[0.22em] uppercase text-muted-foreground">
          {siteConfig.subName}
        </small>
      </span>
    </Link>
  );
}
