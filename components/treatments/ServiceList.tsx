import { ServiceCard } from "@/components/treatments/ServiceCard";
import { getServicesByCategory } from "@/lib/services";
import type { Category, Service } from "@/types/services";

function Grid({ services }: { services: readonly Service[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </ul>
  );
}

export function ServiceList({ category }: { category: Category }) {
  const services = getServicesByCategory(category.slug);
  const groups = category.groups ?? [];

  if (groups.length === 0) {
    return (
      <div data-group>
        <Grid services={services} />
      </div>
    );
  }

  const placed = new Set<string>();
  const blocks = groups
    .map((group) => {
      const inGroup = services.filter((service) => service.group === group.slug);
      for (const service of inGroup) placed.add(service.slug);
      return { group, services: inGroup };
    })
    .filter((block) => block.services.length > 0);

  // A service whose group matches nothing still has to appear somewhere.
  const ungrouped = services.filter((service) => !placed.has(service.slug));

  return (
    <div className="grid gap-16">
      {blocks.map(({ group, services: inGroup }) => (
        <section key={group.slug} data-group>
          <span className="block text-[11px] tracking-[0.12em] text-accent-foreground uppercase">
            {group.label}
          </span>
          <h2 className="mt-2.5 mb-8 text-[40px]">{group.heading}</h2>
          <Grid services={inGroup} />
        </section>
      ))}
      {ungrouped.length > 0 && (
        <section data-group>
          <h2 className="mb-8 text-[40px]">More treatments</h2>
          <Grid services={ungrouped} />
        </section>
      )}
    </div>
  );
}
