import Link from "next/link";
import { Tag } from "@/components/layout/Tag";
import { buttonVariants } from "@/components/ui/button";
import type { Service } from "@/types/services";
import { cn } from "@/lib/utils";

function Price({ service }: { service: Service }) {
  if (service.price === null) {
    return (
      <span className="font-serif text-[22px] leading-none text-copper">
        At consultation
      </span>
    );
  }
  return (
    <span className="font-serif text-[26px] leading-none text-copper">
      {service.priceFrom && (
        <small className="mr-1 font-sans text-xs tracking-[0.04em] text-muted-foreground">
          from
        </small>
      )}
      ${service.price}
    </span>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const unpriced = service.price === null;

  return (
    <li
      id={service.slug}
      data-concerns={service.concerns.join(" ")}
      className={cn(
        // scroll-mt clears the sticky header when the nav jumps to this card.
        "flex scroll-mt-24 flex-col rounded-lg border border-border bg-card p-7 transition-transform duration-200 hover:-translate-y-0.5",
        service.featured && "lg:col-span-3",
      )}
    >
      {service.eminence && <Tag className="mb-3 self-start">Eminence Organics</Tag>}
      <h3 className={cn("text-[26px]", service.featured && "lg:text-[34px]")}>
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      {/* Wraps because "At consultation" beside "Ask about pricing" exceeds a
          phone-width card, and neither is allowed to shrink. */}
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-4">
        <div>
          <Price service={service} />
          <span className="mt-1.5 block text-xs tracking-[0.04em] text-muted-foreground">
            {service.durationMin} min
          </span>
        </div>
        <Link
          href={`/contact?treatment=${service.slug}`}
          className={cn(
            buttonVariants({ variant: unpriced ? "outline" : "default" }),
            "shrink-0",
          )}
        >
          {unpriced ? "Ask about pricing" : "Book"}
        </Link>
      </div>
    </li>
  );
}
