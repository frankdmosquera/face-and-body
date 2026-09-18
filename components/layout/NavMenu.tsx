"use client";

// Client because the burger has open state and the active link reads the pathname.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import type { SiteLink } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

const MENU_ID = "site-menu";

export function NavMenu({
  links,
  children,
}: {
  links: SiteLink[];
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function close() {
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") close();
  }

  return (
    <div className="contents" onKeyDown={onKeyDown}>
      <nav
        id={MENU_ID}
        aria-label="Main"
        className={cn(
          "text-[13px] tracking-[0.06em] uppercase",
          "max-lg:absolute max-lg:inset-x-0 max-lg:top-full max-lg:flex-col max-lg:border-b max-lg:border-border max-lg:bg-background max-lg:px-gutter-sm max-lg:pt-2 max-lg:pb-4 max-lg:text-[15px]",
          "lg:flex lg:gap-8",
          open ? "flex" : "hidden",
        )}
      >
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              onClick={close}
              className={cn(
                "border-b border-transparent py-1.5 hover:border-copper aria-[current=page]:border-copper",
                "max-lg:border-border max-lg:py-3.5 max-lg:hover:border-border max-lg:hover:text-accent-foreground max-lg:aria-[current=page]:border-border max-lg:aria-[current=page]:text-accent-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-2.5 lg:gap-[22px]">
        {children}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((value) => !value)}
          className="flex size-10 flex-col items-center justify-center gap-[5px] rounded-full border border-border bg-card lg:hidden"
        >
          <span className="block h-px w-4 bg-foreground" />
          <span className="block h-px w-4 bg-foreground" />
        </button>
      </div>
    </div>
  );
}
