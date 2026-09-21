import { GroupTabs } from "@/components/treatments/GroupTabs";
import { ServiceCard } from "@/components/treatments/ServiceCard";
import { TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { getServicesByCategory } from "@/lib/serviceQueries";
import type { CategoryType, ServiceType } from "@/types/servicesTypes";

function Grid({ services }: { services: readonly ServiceType[] }) {
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 xl:grid-cols-4">
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
export function ServiceList({ category }: { category: CategoryType }) {
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
      <GroupTabs
        groupOf={groupOf}
        order={blocks.map((block) => block.slug)}
      >
        {/* PINNED, at every width, exactly as `/products` is.

            This reverses the "Only here" line in the commit that pinned the
            products strip, which argued 22 cards is one screen so a bar over
            them would cost a band of the page and solve nothing. That was
            measured on a desktop grid. On a phone `Grid` stacks single column
            and one group runs 1.5 to 2.7 screens - Massage on
            `/other-treatments` is 2,209px against an 812px viewport - so the
            problem the products strip solves exists here too.

            It was briefly pinned below `md` only, on the reasoning that
            desktop did not need it. Frank asked for the same behaviour as
            products, saw the desktop difference immediately and said so. The
            consistency is worth more than the band of page it costs: three
            pages with chips should not behave three ways.

            No scroll listener. A sticky element sticks only inside its own
            parent's box, and that parent is the Tabs root, which ends with
            the last panel. It pins through the cards and releases itself once
            you are past them.

            z-10 against the header's z-20 on purpose. The header hides on
            scroll down, so the strip is alone at the top while you read; on
            the way back up the header slides over it, which is the right
            loser. */}
        <TabsList
          aria-label={`${category.label} by what they do`}
          /* `bg-secondary`, not `bg-background`, because the only caller with
             groups is the home page's facials section and that Section is
             `tone="sand"`. A pinned strip needs an opaque background or the
             cards scroll through it, and the first attempt used the cream that
             `/products` and `/other-treatments` sit on - which showed as a
             cream band across the sand. It has to match the ground it pins
             over, so the token follows the Section rather than the default. */
          className="sticky top-0 z-10 bg-secondary py-3"
        >
          {blocks.map((block) => (
            <TabsTab key={block.slug} value={block.slug}>
              {block.label}
              {/* The count belongs on the tab: it is the one thing that tells
                  someone whether a group is worth opening before they open it.
                  It follows the chip into its filled state, or it disappears
                  against the copper. */}
              <span className="ml-2 text-muted-foreground/70 group-data-active:text-copper-ink/70">
                {block.services.length}
              </span>
            </TabsTab>
          ))}
        </TabsList>

        {blocks.map((block) => (
          <TabsPanel key={block.slug} value={block.slug} data-group>
            <Grid services={block.services} />
            {/* Below the cards, not above them. This line carries the words
                people actually search - congested, breakout-prone, dull, dry -
                which the group labels do not, so it earns its place on the
                page. Between the tabs and the cards it bought that at the
                price of pushing the cards down and reading as leftover
                furniture under a row of chips. Down here it costs the visitor
                nothing: the cards are the first thing under the tabs, and the
                sentence is still in the document for anyone, or anything,
                reading it. */}
            {block.heading && (
              <p
                data-group-head
                className="mt-8 text-[14px] text-muted-foreground"
              >
                {block.heading}
              </p>
            )}
          </TabsPanel>
        ))}
      </GroupTabs>
    </div>
  );
}
