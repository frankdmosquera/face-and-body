"use client";

// Client because the sheet has open state and closes itself after navigation.
import { ChevronRight, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "@/components/layout/Brand";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { isNavGroup, siteConfig, type NavItem } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

const ROW =
  "flex w-full items-center justify-between border-b border-border py-3.5 font-sans text-[15px] tracking-[0.06em] uppercase";

const SUB_LINK =
  "group/sub flex items-center justify-between py-2.5 text-muted-foreground transition-colors hover:text-accent-foreground aria-[current=page]:text-accent-foreground";

const CHEVRON =
  "size-4 -translate-x-1 opacity-0 transition-all group-hover/sub:translate-x-0 group-hover/sub:opacity-100 group-aria-[current=page]/sub:translate-x-0 group-aria-[current=page]/sub:opacity-100";

const HEADING =
  "mt-3 mb-1 block text-[11px] tracking-[0.12em] text-accent-foreground uppercase first:mt-0";

function isActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [seenPathname, setSeenPathname] = useState(pathname);

  // The wordmark in the sheet header navigates too, so close on any route change.
  if (seenPathname !== pathname) {
    setSeenPathname(pathname);
    setOpen(false);
  }

  function close() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Menu"
        className="flex size-10 flex-col items-center justify-center gap-[5px] rounded-full border border-border bg-card lg:hidden"
      >
        <span className="block h-px w-4 bg-foreground" />
        <span className="block h-px w-4 bg-foreground" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full gap-0 border-border bg-background p-0 text-base sm:max-w-sm"
      >
        <SheetHeader className="h-16 flex-row items-center border-b border-border px-gutter-sm py-0 pr-16">
          <Brand />
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Treatments and how to reach the clinic
          </SheetDescription>
        </SheetHeader>
        <nav
          aria-label="Main"
          className="stagger flex-1 overflow-y-auto px-gutter-sm py-2"
        >
          {items.map((item) =>
            isNavGroup(item) ? (
              <Accordion key={item.label}>
                <AccordionItem
                  value={item.label}
                  className="border-b border-border"
                >
                  <AccordionTrigger
                    className={cn(
                      ROW,
                      "rounded-none border-x-0 border-t-0 font-normal hover:no-underline focus-visible:border-b-copper focus-visible:ring-0",
                      isActive(item.href, pathname) && "text-accent-foreground",
                    )}
                  >
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-[15px] [&_a]:no-underline">
                    <div className="ml-1 border-l border-copper/40 pl-4">
                      {item.sections.map((section, index) => (
                        <div key={section.label ?? index}>
                          {section.label &&
                            (section.href ? (
                              <Link
                                href={section.href}
                                onClick={close}
                                className={HEADING}
                              >
                                {section.label}
                              </Link>
                            ) : (
                              <span className={HEADING}>{section.label}</span>
                            ))}
                          <ul>
                            {section.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={close}
                                  aria-current={
                                    isActive(link.href, pathname)
                                      ? "page"
                                      : undefined
                                  }
                                  className={SUB_LINK}
                                >
                                  {link.label}
                                  <ChevronRight className={CHEVRON} />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {item.more && (
                        <Link
                          href={item.href}
                          onClick={close}
                          className="mt-2 inline-block border-b border-copper pb-0.5 text-[11px] tracking-[0.1em] text-accent-foreground uppercase"
                        >
                          {item.more}
                        </Link>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={isActive(item.href, pathname) ? "page" : undefined}
                className={cn(ROW, "aria-[current=page]:text-accent-foreground")}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <SheetFooter className="gap-3 border-t border-border px-gutter-sm pt-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={siteConfig.phone.tel}
              className={buttonVariants({ variant: "outline" })}
            >
              <Phone />
              Call
            </a>
            <a
              href={siteConfig.phone.sms}
              className={buttonVariants({ variant: "outline" })}
            >
              <MessageSquare />
              Text
            </a>
          </div>
          <SheetClose
            nativeButton={false}
            className={buttonVariants({ className: "w-full" })}
            render={<Link href="/contact" />}
          >
            Book now
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
