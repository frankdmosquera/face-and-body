"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/cn";

/**
 * The reviews carousel: a fixed handful of cards, two per view, looping, with
 * one control row underneath.
 *
 * ONE ROW OF CONTROLS. Previously the arrows were `CarouselPrevious` and
 * `CarouselNext`, which position themselves absolutely outside the track at
 * `-left-12` / `-right-12`. That fights the page gutters at every width, had
 * to be hidden below `lg` because there was no room beside a full-width card,
 * and left the pause button orphaned somewhere else entirely. These are plain
 * buttons driving the same `api`, sitting in the flow with the dots, so they
 * work at every width and read as one set of controls.
 *
 * AUTOPLAY, five seconds. `stopOnInteraction` hands control over for good on
 * the first swipe, arrow or dot - nothing should move a card out from under
 * someone reading it. The pause button is a WCAG 2.2.1 requirement for
 * content that moves on its own, not a nicety.
 *
 * NO "SHOW MORE" AND NO HIDDEN GRID. This used to hold another 54 cards
 * behind a reveal. The section now shows a fixed sample and sends people to
 * the listing for the rest, which is both simpler and more honest: the count
 * above the cards says how many of how many, and the button goes to all of
 * them at the source.
 */

export function ReviewsCarousel({ slides }: { slides: ReactNode[] }) {
  // Built once, via a lazy initialiser. Inline, a fresh plugin every render
  // restarts its own timer and the carousel never advances; in a ref, reading
  // .current during render trips the React compiler. State holds it properly.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [playing, setPlaying] = useState(true);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    // Reading the Embla API's current snapshot once it is ready, then
    // subscribing to its own change events - external-system sync, not state
    // derived from props.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => onSelect(api));
    api.on("reInit", () => onSelect(api));
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    // The plugin stops itself on the first swipe, so the button has to read
    // its state rather than assume it.
    const sync = () => setPlaying(autoplay.isPlaying());
    sync();
    api.on("autoplay:play", sync);
    api.on("autoplay:stop", sync);
    api.on("reInit", sync);
  }, [api, autoplay]);

  // Neutral at rest, copper on hover. Copper at rest put four accent-coloured
  // circles under every card and pulled the eye off the reviews; on hover it
  // ties to the theme at the moment you are actually reaching for it.
  const control =
    "grid size-9 shrink-0 place-items-center rounded-full border border-foreground/20 text-foreground/60 transition-colors hover:border-primary hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none in-data-[tone=dark]:border-on-dark/25 in-data-[tone=dark]:text-on-dark/70 in-data-[tone=dark]:hover:border-copper-soft in-data-[tone=dark]:hover:text-copper-soft";

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        plugins={[autoplay]}
        className="mt-10 w-full"
      >
        <CarouselContent className="items-stretch">
          {slides.map((slide, i) => (
            // One card on a phone, two from md, three from xl.
            //
            // Three at `lg` looked right and measured wrong: at 1024 the
            // container is not yet wide enough for three, so a card went
            // from 349px at 768 to 304px at 1024 and started clipping
            // quotes. The card got smaller as the screen got bigger. At `xl`
            // there is room, and a card lands around 370px.
            <CarouselItem key={i} className="md:basis-1/2 xl:basis-1/3">
              {slide}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation: back, position, forward. Every target is at least 36px
          of clickable area even though a dot reads as 6px - the visible dot
          is an inner span and the padding around it is the target.

          Dot colours are token-based rather than `bg-muted`, which resolves
          to near-black in dark mode and left the inactive dots invisible
          against the band. */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous review"
          className={control}
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>

        <div className="flex items-center gap-1 px-1">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to review ${i + 1}`}
              aria-current={current === i}
              className="grid h-9 w-5 place-items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  current === i
                    ? "w-6 bg-primary in-data-[tone=dark]:bg-copper-soft"
                    : "w-1.5 bg-foreground/25 hover:bg-foreground/50 in-data-[tone=dark]:bg-on-dark/30 in-data-[tone=dark]:hover:bg-on-dark/60",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Next review"
          className={control}
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>

      </div>

      {/* On its own centred line, below the navigation. It does a different
          job from prev/dots/next - it governs the whole section rather than
          moving one card - and on the end of that row it read as a fourth
          navigation control. Centred under them it reads as what it is. */}
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={() => {
            // Branch on our own state, not autoplay.isPlaying(): that reports
            // stale on the same tick and reports false in a background tab
            // even right after play(), so both made the button need two
            // presses. The listeners above reconcile if the plugin stops
            // on its own.
            if (playing) {
              autoplay.stop();
              setPlaying(false);
            } else {
              autoplay.play();
              setPlaying(true);
            }
          }}
          aria-label={playing ? "Pause the reviews" : "Play the reviews"}
          className={control}
        >
          {playing ? (
            <Pause aria-hidden="true" className="size-3.5 fill-current" />
          ) : (
            <Play
              aria-hidden="true"
              className="size-3.5 translate-x-px fill-current"
            />
          )}
        </button>
      </div>
    </>
  );
}
