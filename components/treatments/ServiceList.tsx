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
    <div data-group-stack className="grid gap-16">
      {blocks.map(({ group, services: inGroup }) => (
        <section key={group.slug} data-group>
          {/* The group name leads and the concern line supports it. Reversed,
              the concern reads as a second filter competing with the real one. */}
          <div data-group-head className="mb-8">
            <h2 className="text-[40px]">{group.label}</h2>
            <p className="mt-2 text-[15px] text-muted-foreground">
              {group.heading}
            </p>
          </div>
          <Grid services={inGroup} />
        </section>
      ))}
      {ungrouped.length > 0 && (
        <section data-group>
          <div data-group-head className="mb-8">
            <h2 className="text-[40px]">More treatments</h2>
          </div>
          <Grid services={ungrouped} />
        </section>
      )}
    </div>
  );
}
