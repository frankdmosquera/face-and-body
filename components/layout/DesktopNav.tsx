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
  type NavLink,
} from "@/data/siteConfig";
import { cn } from "@/lib/utils";

const TOP_LINK =
  "h-auto rounded-none border-b border-transparent bg-transparent px-0 py-1.5 text-[13px] font-normal tracking-[0.06em] uppercase transition-colors hover:border-copper hover:bg-transparent focus:bg-transparent focus-visible:ring-0 focus-visible:border-copper";

function isActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function isGroupActive(group: NavGroup, pathname: string) {
  return group.items.some((link) => isActive(link.href, pathname));
}

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <NavigationMenu aria-label="Main" className="hidden lg:flex">
      <NavigationMenuList className="gap-8">
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
                <ul className="grid w-[600px] grid-cols-2 gap-1 p-3">
                  {item.items.map((link) => (
                    <PanelLink
                      key={link.href}
                      link={link}
                      active={isActive(link.href, pathname)}
                    />
                  ))}
                </ul>
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

function PanelLink({ link, active }: { link: NavLink; active: boolean }) {
  return (
    <li>
      <NavigationMenuLink
        closeOnClick
        className="group/panel-link flex flex-col items-start gap-1 rounded-sm p-3.5 hover:bg-muted focus:bg-muted"
        render={
          <Link href={link.href} aria-current={active ? "page" : undefined} />
        }
      >
        <span className="font-serif text-[22px] leading-tight text-foreground">
          {link.label}
        </span>
        <span className="text-[13px] leading-snug text-muted-foreground">
          {link.blurb}
        </span>
        <span className="mt-1.5 h-px w-6 bg-copper transition-[width] duration-300 group-hover/panel-link:w-10 group-aria-[current=page]/panel-link:w-10" />
      </NavigationMenuLink>
    </li>
  );
}
