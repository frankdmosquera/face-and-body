import { ProductCard } from "@/components/products/ProductCard";
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
      <GroupTabs groupOf={groupOf} order={blocks.map((block) => block.slug)}>
        <TabsList aria-label="Products by what they do">
          {blocks.map((block) => (
            <TabsTab key={block.slug} value={block.slug}>
              {block.label}
              <span className="ml-2 text-muted-foreground/70 group-data-active:text-copper-ink/70">
                {block.products.length}
              </span>
            </TabsTab>
          ))}
        </TabsList>

        {blocks.map((block) => (
          <TabsPanel key={block.slug} value={block.slug} data-group>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
              {block.products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </ul>
            <p data-group-head className="mt-8 text-[14px] text-muted-foreground">
              {block.heading}
            </p>
          </TabsPanel>
        ))}
      </GroupTabs>
    </div>
  );
}
