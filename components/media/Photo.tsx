import { Image } from "@imagekit/next";
import { IMAGES, type ImageSlot } from "@/data/images";
import { cn } from "@/lib/utils";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

// A deploy without the endpoint is a mistake; a local build without it is
// just the account not existing yet, so it gets a labelled box instead.
if (!urlEndpoint && process.env.VERCEL === "1") {
  throw new Error("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not set");
}

type Props = {
  slot: ImageSlot;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

export function Photo({ slot, className, sizes, priority, fill }: Props) {
  const image = IMAGES[slot];

  if (!urlEndpoint) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={cn(
          "grid place-items-center bg-placeholder text-center text-[11px] tracking-[0.14em] text-placeholder-text uppercase",
          fill ? "absolute inset-0" : "aspect-[3/4] w-full",
          className,
        )}
      >
        {slot}
      </div>
    );
  }

  return (
    <Image
      urlEndpoint={urlEndpoint}
      src={image.path}
      alt={image.alt}
      width={fill ? undefined : image.w}
      height={fill ? undefined : image.h}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
