import Link from "next/link";
import { ServiceCard } from "@/components/treatments/ServiceCard";
import { categoryHref } from "@/data/categories";
import { getServicesByConcernGrouped } from "@/lib/services";
import type { ConcernSlug } from "@/types/services";

export function ConcernServices({ concern }: { concern: ConcernSlug }) {
  const blocks = getServicesByConcernGrouped(concern);

  if (blocks.length === 0) {
    return (
      <p className="text-[15px] text-muted-foreground">
        Nothing is listed for this yet. The free consultation is the fastest way
        to find out what would help.
      </p>
    );
  }

  return (
    <div className="grid gap-16">
      {blocks.map(({ category, services }) => (
        <section key={category.slug}>
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
            <h2 className="text-[40px]">{category.label}</h2>
            <Link
              href={categoryHref(category)}
              className="text-xs tracking-[0.06em] text-accent-foreground uppercase hover:text-foreground"
            >
              All {category.label.toLowerCase()} &rarr;
            </Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
