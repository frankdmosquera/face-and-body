import { PhotoByPath } from "@/components/media/PhotoByPath";
import type { ProductType } from "@/types/productsTypes";

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <li
      id={product.slug}
      /* The sort keys ride on the card rather than being shipped to the
         browser a second time. `ProductSort` reads them straight off the DOM
         and sets a CSS `order`, so reordering 133 products costs no payload
         at all and the descriptions never cross the server boundary. Same
         trick `data-concerns` on `ServiceCard` was left in place for. */
      data-product=""
      data-name={product.name}
      data-price={product.priceCad}
      /* scroll-mt pair matches `ServiceCard` and the tab strip: the header is
         172px below `xsm` and 96px from there up. */
      className="flex scroll-mt-44 xsm:scroll-mt-24 flex-col rounded-lg border border-border bg-card p-4 transition-transform duration-200 hover:-translate-y-0.5"
    >
      {/* A white well rather than a white card. The packshots are the product
          centred on pure rgb(255,255,255) and `bg-card` is rgb(255,253,249),
          so a photograph dropped straight onto the card shows a hard seam
          across a large square. `Eminence` on the home page solves it by
          making the whole card white and pinning its text; that works for
          three cards and would put 133 white slabs on a dark page here. A
          bordered well keeps the edge deliberate instead of accidental.

          4:3 matches the 1500x1125 assets, so `object-contain` has nothing to
          letterbox and the product is as large as the well allows. Re-measure
          if the shots are ever reshot at another ratio. */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white">
        <PhotoByPath
          path={product.image}
          alt={product.name}
          width={1500}
          height={1125}
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
          className="absolute inset-0 h-full w-full object-contain p-3"
        />
      </div>
      <h3 className="mt-4 line-clamp-2 min-h-[2lh] text-[19px] leading-[1.15]">
        {product.name}
      </h3>
      <p className="mt-2 line-clamp-4 min-h-[4lh] text-[14px] leading-relaxed text-muted-foreground">
        {product.description}
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-3">
        <span className="font-serif text-[26px] leading-none text-copper">
          ${product.priceCad}
        </span>
        <span className="text-xs tracking-[0.04em] text-muted-foreground">
          {product.retailSize}
        </span>
      </div>
    </li>
  );
}
