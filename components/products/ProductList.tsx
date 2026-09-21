import { ProductCard } from "@/components/products/ProductCard";
import { ProductSearch } from "@/components/products/ProductSearch";
import { ProductSort } from "@/components/products/ProductSort";
import { GroupTabs } from "@/components/treatments/GroupTabs";
import { TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { productGroupsData } from "@/data/productsData";
import { getProductsByGroup } from "@/lib/productQueries";

/**
 * The range, tabbed by the same words the facials are tabbed by.
 *
 * `GroupTabs` is reused rather than reimplemented, so the products page behaves
 * exactly as the facial menu does: same chips, same swipe, same instant swap.
 * Its `groupOf` map exists to scroll a named card into view, and a product can
 * sit under two headings, so a slug maps to the first heading that holds it.
 * That is enough for the one thing the map is for.
 *
 * `TabsPanel` keeps every panel mounted, so all 133 products are in the HTML on
 * first response whichever tab is open. On a page whose job is to prove she
 * stocks the real range, hiding 100 of them from a crawler would defeat it.
 */
export function ProductList() {
  const blocks = productGroupsData
    .map((group) => ({ ...group, products: getProductsByGroup(group.slug) }))
    .filter((block) => block.products.length > 0);

  const groupOf: Record<string, string> = {};
  for (const block of blocks) {
    for (const product of block.products) {
      groupOf[product.slug] ??= block.slug;
    }
  }

  return (
    <div data-group-stack>
      {/* Above the sticky strip rather than inside it, and staying there.
          Both are decisions you make once and then scroll, unlike the chips,
          which are navigation you use the whole way down. Pinning them too
          would cost about 115px of the chip strip on a phone, or make the
          stuck bar 112px on an 812px screen, and the chips are what earns
          that space. Reconsider if anyone is ever seen scrolling back up to
          change a sort. */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ProductSearch />
        <ProductSort />
      </div>
      <GroupTabs groupOf={groupOf} order={blocks.map((block) => block.slug)}>
        {/* STICKY, AND ONLY HERE. The facials menu passes no className and is
            untouched: 22 cards is one screen, so a bar pinned over them would
            solve nothing and cost a strip of the page.

            133 products is many screens, and a visitor three screens into
            Hydrating and brightening has no way back to the other six groups
            without scrolling up past everything they just read.

            It needs no scroll listener. A sticky element only sticks inside
            its own parent's box, and this one's parent is the Tabs root, which
            ends with the last panel. So it pins through the cards and leaves
            by itself the moment you are past them, which is the behaviour
            without the machinery.

            z-10 against the header's z-20, deliberately. The header hides on
            scroll down, so while you are reading cards the strip is alone at
            the top, which is the common case. Scrolling back up the header
            slides in over it, and that is the right loser: the header is the
            way out of the page and these chips are not. */}
        <TabsList
          aria-label="Products by what they do"
          className="sticky top-0 z-10 bg-background py-3"
        >
          {blocks.map((block) => (
            <TabsTab key={block.slug} value={block.slug}>
              {block.label}
              {/* `data-total` parks the real number so clearing the search can
                  put it back. Recalculating it would mean counting the DOM to
                  recover something the server already knew. */}
              <span
                data-count-for={block.slug}
                data-total={block.products.length}
                className="ml-2 text-muted-foreground/70 group-data-active:text-copper-ink/70"
              >
                {block.products.length}
              </span>
            </TabsTab>
          ))}
        </TabsList>

        {blocks.map((block) => (
          <TabsPanel
            key={block.slug}
            value={block.slug}
            data-group
            data-group-slug={block.slug}
          >
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
              {block.products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </ul>
            {/* Rendered always and hidden by `ProductSearch`, rather than
                created when a search empties the panel. It is one line of
                markup per group, and building it in JavaScript would mean the
                empty state is the one part of this page that does not exist
                until something goes wrong. */}
            <p
              data-empty
              style={{ display: "none" }}
              className="py-10 text-center text-[15px] text-muted-foreground"
            >
              Nothing in {block.label} matches. Check the numbers on the other
              groups above.
            </p>
            <p data-group-head className="mt-8 text-[14px] text-muted-foreground">
              {block.heading}
            </p>
          </TabsPanel>
        ))}
      </GroupTabs>
    </div>
  );
}
