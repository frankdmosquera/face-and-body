import { Orchid } from "@/components/brand/Orchid";
import { getServicesByCategory } from "@/lib/serviceQueries";

/**
 * The facial menu's names drifting past on a dark ribbon, between the trust
 * strip and the menu itself: a taste of the range before the prices.
 *
 * The track holds the list twice so moving it half its width loops without a
 * seam; the copy is hidden from screen readers, and the whole ribbon is too,
 * because every name is in the menu directly below it. Hovering pauses it.
 */
export function TreatmentRibbon() {
  const names = getServicesByCategory("facial").map((service) => service.name);

  const run = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {names.map((name) => (
        <li key={name} className="flex items-center">
          <span className="px-7 font-serif text-[26px] whitespace-nowrap italic lg:text-[30px]">
            {name}
          </span>
          <Orchid className="h-5 w-[18px] text-copper" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      aria-hidden="true"
      className="lift-marquee-wrap overflow-hidden bg-dark-surface py-6 text-on-dark lg:py-8"
    >
      <div className="lift-marquee flex w-max">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
