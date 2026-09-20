"use client";

// Client because the active section reads the pathname.
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  isNavGroup,
  type NavGroup,
  type NavItem,
  type NavSection,
} from "@/data/siteConfig";
import { cn } from "@/lib/utils";

const TOP_LINK =
  "h-auto rounded-none border-b border-transparent bg-transparent px-0 py-1.5 text-[13px] font-normal tracking-[0.06em] uppercase transition-colors hover:border-copper hover:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:border-copper";

const HEADING =
  "mb-2 block text-[11px] tracking-[0.12em] text-accent-foreground uppercase";

const PANEL_WIDTH: Record<number, string> = {
  1: "w-[280px] grid-cols-1",
  2: "w-[520px] grid-cols-2",
  3: "w-[720px] grid-cols-3",
  4: "w-[920px] grid-cols-4",
};

function isActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function isGroupActive(group: NavGroup, pathname: string) {
  return (
    isActive(group.href, pathname) ||
    group.sections.some((section) =>
      section.links.some((link) => isActive(link.href, pathname)),
    )
  );
}

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <NavigationMenu aria-label="Main" align="center" className="hidden xl:flex">
      <NavigationMenuList className="gap-7">
        {items.map((item) =>
          isNavGroup(item) ? (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger
                data-active={isGroupActive(item, pathname) ? "" : undefined}
                className={cn(
                  TOP_LINK,
                  "data-popup-open:border-copper data-popup-open:bg-transparent data-popup-open:hover:bg-transparent data-active:border-copper",
                )}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <div
                  className={cn(
                    "grid max-w-[calc(100vw-2rem)] gap-7 p-7",
                    PANEL_WIDTH[Math.min(item.sections.length, 4)],
                  )}
                >
                  {item.sections.map((section, index) => (
                    <Column
                      key={section.label ?? index}
                      section={section}
                      pathname={pathname}
                    />
                  ))}
                </div>
                {item.more && (
                  <div className="border-t border-border px-7 py-3">
                    <NavigationMenuLink
                      closeOnClick
                      className="inline-block rounded-none border-b border-copper p-0 pb-0.5 text-[11px] tracking-[0.1em] text-accent-foreground uppercase hover:bg-transparent focus:bg-transparent"
                      render={<Link href={item.href} />}
                    >
                      {item.more}
                    </NavigationMenuLink>
                  </div>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                className={cn(TOP_LINK, "aria-[current=page]:border-copper")}
                render={
                  <Link
                    href={item.href}
                    aria-current={
                      isActive(item.href, pathname) ? "page" : undefined
                    }
                  />
                }
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function Column({
  section,
  pathname,
}: {
  section: NavSection;
  pathname: string;
}) {
  return (
    <div className="flex flex-col">
      {section.label &&
        (section.href ? (
          <NavigationMenuLink
            closeOnClick
            className={cn(HEADING, "rounded-none p-0 hover:bg-transparent hover:text-foreground focus:bg-transparent")}
            render={<Link href={section.href} />}
          >
            {section.label}
          </NavigationMenuLink>
        ) : (
          <span className={HEADING}>{section.label}</span>
        ))}
      <ul className="flex flex-col">
        {section.links.map((link) => (
          <li key={link.href}>
            <NavigationMenuLink
              closeOnClick
              className="-mx-2 block rounded-sm px-2 py-1.5 text-[13px] leading-snug text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted aria-[current=page]:text-accent-foreground"
              render={
                <Link
                  href={link.href}
                  aria-current={isActive(link.href, pathname) ? "page" : undefined}
                />
              }
            >
              {link.label}
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
