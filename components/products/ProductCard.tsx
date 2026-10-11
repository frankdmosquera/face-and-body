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
      className="group/card relative flex scroll-mt-44 xsm:scroll-mt-24 flex-col overflow-hidden rounded-2xl bg-card p-4 shadow-[0_1px_2px_rgba(28,26,23,0.04),0_14px_32px_-20px_rgba(28,26,23,0.22)] transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_56px_-26px_rgba(28,26,23,0.38)]"
    >
      {/* Same hover line as the treatment cards. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-copper to-gold transition-transform duration-500 ease-out group-hover/card:scale-x-100"
      />
      {/* A WARM WELL, NOT A WHITE ONE. The packshots are the product centred
          on pure white, which against `bg-card` shows a hard seam. It was a
          white well, a deliberate edge but 133 white squares down the page.
          Now the well is the warm ground of the /products hero plate and the
          photograph multiplies into it, so the white disappears and only the
          product is left. The ground is a brand constant, light in both
          themes, which multiply needs. The scale on hover is on the image
          itself, not a wrapper, so the blend still sees the well behind it.

          4:3 matches the 1500x1125 assets, so `object-contain` has nothing to
          letterbox and the product is as large as the well allows. Re-measure
          if the shots are ever reshot at another ratio. */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-linear-to-b from-copper-tint to-surface">
        <PhotoByPath
          path={product.image}
          alt={product.name}
          width={1500}
          height={1125}
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
          className="absolute inset-0 h-full w-full object-contain p-3 mix-blend-multiply transition-transform duration-500 ease-out group-hover/card:scale-105"
        />
      </div>
      <h3 className="mt-4 line-clamp-2 min-h-[2lh] text-[19px] leading-[1.15] transition-colors duration-300 group-hover/card:text-accent-foreground">
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
