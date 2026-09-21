import { Image } from "@imagekit/next";
import { imagekitEndpoint, MEDIA_VERSION } from "@/lib/imagekitConfig";
import { cn } from "@/lib/cn";

/** Every packshot is the product centred on white at this size. */
const PACKSHOT_WIDTH = 1500;
const PACKSHOT_HEIGHT = 1125;

type Props = {
  /** Media library path, as `productsData` stores it: `/product-images/...`. */
  path: string;
  /** The product name. These are packshots on plain white, so the product is
   *  the entire content of the picture and its name is the whole description
   *  of it. Writing 133 separate alt strings would restate the `h3` underneath
   *  in different words, which is worse for a screen reader, not better. */
  alt: string;
  className?: string;
  sizes?: string;
};

export function ProductPhoto({ path, alt, className, sizes }: Props) {
  if (!imagekitEndpoint) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 grid place-items-center bg-placeholder p-2 text-center text-[11px] tracking-[0.14em] text-placeholder-text uppercase",
          className,
        )}
      >
        {alt}
      </div>
    );
  }

  return (
    <Image
      urlEndpoint={imagekitEndpoint}
      src={path}
      alt={alt}
      width={PACKSHOT_WIDTH}
      height={PACKSHOT_HEIGHT}
      queryParameters={{ v: MEDIA_VERSION }}
      sizes={sizes}
      className={className}
    />
  );
}
