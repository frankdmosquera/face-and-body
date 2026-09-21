import { GroupTabs } from "@/components/treatments/GroupTabs";
import { ServiceCard } from "@/components/treatments/ServiceCard";
import { TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { getServicesByCategory } from "@/lib/services";
import type { Category, Service } from "@/types/servicesTypes";

function Grid({ services }: { services: readonly Service[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </ul>
  );
}

/** The slug every group falls back to when a service's own group matches none. */
const UNGROUPED = "more";

/**
 * A category's treatments, as tabs when the category has groups and as a plain
 * grid when it does not. Only facials has groups, so only the home page tabs.
 *
 * Tabbed on 2026-09-20. Stacked, the four groups ran to 3,446px, 3.8 screens,
 * and 36% of the home page, which is most of the page given over to one
 * section. Tabbed they are about one screen and the visitor picks the group
 * that describes their skin.
 *
 * Nothing is hidden from a crawler. `TabsPanel` sets `keepMounted`, so all 22
 * treatments and their descriptions are in the HTML on first response whichever
 * tab is open. That is not incidental: the home page is the one page built to
 * rank for facials.
 *
 * The group label is a tab rather than an `h3` now. The cards' own `h3`s sit
 * directly under the section's `h2` as a result, which is a cleaner outline
 * than the old one, where a group `h3` and a treatment `h3` were siblings at
 * the same level.
 */
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
      const inGroup = services.filter(
        (service) => service.group === group.slug,
      );
      for (const service of inGroup) placed.add(service.slug);
      return { ...group, services: inGroup };
    })
    .filter((block) => block.services.length > 0);

  // A service whose group matches nothing still has to appear somewhere.
  const ungrouped = services.filter((service) => !placed.has(service.slug));
  if (ungrouped.length > 0) {
    blocks.push({
      slug: UNGROUPED,
      label: "More treatments",
      heading: "",
      services: ungrouped,
    });
  }

  /* Built here, on the server, from the same blocks that render the panels, so
     the map and the markup can never disagree about which group holds what. */
  const groupOf = Object.fromEntries(
    blocks.flatMap((block) =>
      block.services.map((service) => [service.slug, block.slug]),
    ),
  );

  return (
    <div data-group-stack>
      <GroupTabs groupOf={groupOf} defaultValue={blocks[0].slug}>
        <TabsList aria-label={`${category.label} by what they do`}>
          {blocks.map((block) => (
            <TabsTab key={block.slug} value={block.slug}>
              {block.label}
              {/* The count belongs on the tab: it is the one thing that tells
                  someone whether a group is worth opening before they open it. */}
              <span className="ml-2 text-muted-foreground/70">
                {block.services.length}
              </span>
            </TabsTab>
          ))}
        </TabsList>

        {blocks.map((block) => (
          <TabsPanel key={block.slug} value={block.slug} data-group>
            {/* The concern line survives the move to tabs. It carries the words
                someone actually searches - congested, breakout-prone, dull -
                which the group label on its own does not. */}
            {block.heading && (
              <p
                data-group-head
                className="mb-8 text-[15px] text-muted-foreground"
              >
                {block.heading}
              </p>
            )}
            <Grid services={block.services} />
          </TabsPanel>
        ))}
      </GroupTabs>
    </div>
  );
}
