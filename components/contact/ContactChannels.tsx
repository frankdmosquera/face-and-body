import { MessageSquare, Phone } from "lucide-react";
import type { ReactElement } from "react";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/cn";

type ChannelType = {
  key: string;
  href: string;
  /** Doubles as the accessible name and the hover tooltip. */
  title: string;
  icon: ReactElement;
  external: boolean;
};

/**
 * WHY THIS IS HAND DRAWN. lucide dropped brand marks, so there is no
 * `MessageCircle` that actually reads as WhatsApp, and the alternative is a
 * package for one glyph. This is twelve lines of path data against the rule in
 * the workspace CLAUDE.md: if it is two seconds of hand-written code, write it
 * rather than adding a dependency.
 *
 * `currentColor` and no explicit size, so it inherits from the button exactly
 * as the lucide icons beside it do - `buttonVariants` sets
 * `[&_svg:not([class*='size-'])]:size-4` and this has to be caught by it.
 */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.746.456 3.45 1.323 4.95L2 22l5.25-1.377a9.87 9.87 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.647-1.03-5.135-2.9-7.006A9.85 9.85 0 0 0 12.04 2Zm0 18.13h-.004a8.2 8.2 0 0 1-4.176-1.144l-.3-.178-3.114.817.83-3.036-.195-.312a8.18 8.18 0 0 1-1.254-4.367c0-4.538 3.694-8.232 8.236-8.232a8.18 8.18 0 0 1 5.82 2.414 8.18 8.18 0 0 1 2.41 5.822c-.002 4.538-3.696 8.216-8.253 8.216Z" />
    </svg>
  );
}

const { phone } = siteConfig;

/**
 * The three ways to reach the clinic, as icons.
 *
 * ONE PLACEMENT, AND THAT IS THE POINT. It briefly sat under the form and
 * beside the map as well, which put the same three actions on the page three
 * times over, on top of the buttons already in the hero. An action offered
 * four times reads as four different offers. It lives in the hero now, beside
 * the number, and nowhere else; it stays its own component because the
 * WhatsApp gating and the hand-drawn mark are worth keeping out of the page.
 *
 * WHATSAPP RENDERS ONLY IF IT IS CONFIGURED. `wa.me` does not fail quietly: a
 * link to a number that is not registered lands the visitor on "this phone
 * number is not on WhatsApp", which is worse mid-enquiry than never offering
 * it. So the channel is present in the config or it is not on the page, and
 * turning it on is one line in `siteConfig` once the account is confirmed.
 *
 * ICON ONLY, AND STILL NAMED. Each link carries an `aria-label`, because an
 * icon with no accessible name is a link a screen reader announces as "link"
 * and nothing else. That is also what lets `label` be dropped where the
 * context already reads, as it does under the number in the hero.
 */
export function ContactChannels({
  label = "Or reach us directly",
  className,
}: {
  /** `null` drops the label, for placements where the context is already set. */
  label?: string | null;
  className?: string;
}) {
  /* Built with a push rather than a filtered literal. `cond && {...}` in an
     array leaves `false` in the type, and the `.filter` that removes it does
     not narrow it back out, so every read below needs a non-null assertion. */
  const channels: ChannelType[] = [];
  if (phone.whatsapp) {
    channels.push({
      key: "whatsapp",
      href: phone.whatsapp,
      title: "WhatsApp",
      /**
       * BIGGER THAN THE OTHER TWO, AND NOT BY EYE. 22px against their 18, to
       * cancel a difference that is real rather than imagined: lucide icons
       * are 2px strokes and this one is a solid fill, and a filled glyph reads
       * smaller and denser than an outlined one at the same box. Matching the
       * numbers would keep them looking mismatched.
       *
       * The green is WhatsApp's own, #25D366, and it stays a literal rather
       * than becoming a token. The palette is one copper accent on cream; a
       * third party's brand colour is not part of it and must not start
       * looking like it is. It earns the exception because a WhatsApp mark in
       * any other colour stops being recognisable, which is the entire reason
       * to carry the icon at all.
       */
      icon: <WhatsAppIcon className="size-[22px] text-[#25D366]" />,
      external: true,
    });
  }
  channels.push(
    {
      key: "sms",
      href: phone.sms,
      title: `Text ${phone.display}`,
      icon: <MessageSquare className="size-[18px] text-copper" />,
      external: false,
    },
    {
      key: "tel",
      href: phone.tel,
      title: `Call ${phone.display}`,
      icon: <Phone className="size-[18px] text-copper" />,
      external: false,
    },
  );

  return (
    <div className={className}>
      {label && (
        <span className="block text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
          {label}
        </span>
      )}
      <div className={cn("flex gap-2.5", label && "mt-3")}>
        {channels.map((channel) => (
          <a
            key={channel.key}
            href={channel.href}
            aria-label={channel.title}
            title={channel.title}
            {...(channel.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            /* No blanket `[&_svg]:size-*` here any more, and no colour on the
               anchor. Each icon carries its own size and colour, because the
               three are not interchangeable: two are ours and one belongs to
               WhatsApp. A parent rule would win on specificity over a class on
               the svg and quietly flatten all three back to the same. The
               border is what still reacts to hover, so the affordance survives
               icons that no longer inherit `currentColor`. */
            className={cn(
              "flex size-11 items-center justify-center rounded-full border border-border bg-card transition-colors",
              "hover:border-copper hover:bg-secondary",
              "focus-visible:border-copper focus-visible:ring-2 focus-visible:ring-copper/40 focus-visible:outline-none",
            )}
          >
            {channel.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
