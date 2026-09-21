import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";

const { address, geo } = siteConfig;

// OpenStreetMap needs no key and sets no third-party cookies, which matters on
// a site with no consent banner. Navigation still hands off to Google Maps
// below, which is where people actually get directions.
const SPAN = 0.006;
const mapSrc =
  `https://www.openstreetmap.org/export/embed.html` +
  `?bbox=${geo.lng - SPAN},${geo.lat - SPAN / 2},${geo.lng + SPAN},${geo.lat + SPAN / 2}` +
  `&layer=mapnik&marker=${geo.lat},${geo.lng}`;

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`;

export function Directions() {
  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-border">
        <iframe
          src={mapSrc}
          title={`Map showing ${siteConfig.name} at ${address.street}`}
          loading="lazy"
          className="block h-[320px] w-full border-0 lg:h-[420px]"
        />
      </div>
      {/* The one action a map wants. It used to carry "Text us" and "Call
          (587) 969-3796" beside this, then icons for the same two plus
          WhatsApp, and both were a third and fourth copy of what the hero
          already offers. Next to a map, directions is the action. */}
      <div className="mt-6">
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants()}
        >
          Get directions
        </a>
      </div>
    </div>
  );
}
