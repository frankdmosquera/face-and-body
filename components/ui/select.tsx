"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "cn";

/**
 * A select styled as one of the page's chips.
 *
 * Base UI rather than shadcn's Select, which is not installed and would be a
 * dependency decision. Base UI is already here: it is what `tabs.tsx` is built
 * on, so this adds a file and nothing else.
 *
 * It replaced a native `<select>`, which worked and looked like 2003. A
 * browser default is the one control on a page that cannot be made to match
 * anything around it, and on a page where every other control is a copper
 * pill it reads as something that leaked in from another site.
 */
function Select(props: SelectPrimitive.Root.Props<string>) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        // Deliberately the same shape as TabsTab: border, pill, uppercase
        // tracking, copper on hover and focus. Two controls that do different
        // things but belong to the same page.
        "group flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-sans text-[12px] tracking-[0.08em] whitespace-nowrap text-muted-foreground uppercase transition-colors outline-none",
        "hover:border-copper hover:text-foreground",
        "focus-visible:border-copper focus-visible:ring-2 focus-visible:ring-copper/40",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="transition-transform duration-200 group-data-popup-open:rotate-180">
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectValue(props: SelectPrimitive.Value.Props) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectContent({
  className,
  children,
  ...props
}: SelectPrimitive.Popup.Props) {
  return (
    <SelectPrimitive.Portal>
      {/* `alignItemWithTrigger={false}` so the popup opens below the trigger
          like every other menu on the site. Left on, Base UI lifts the popup
          so the selected item sits over the trigger, which is macOS behaviour
          and reads as a glitch on a web page. */}
      <SelectPrimitive.Positioner
        sideOffset={6}
        alignItemWithTrigger={false}
        className="z-30"
      >
        <SelectPrimitive.Popup
          data-slot="select-popup"
          className={cn(
            "min-w-[var(--anchor-width)] overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg outline-none",
            "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-sans text-[12px] tracking-[0.08em] text-muted-foreground uppercase outline-none transition-colors",
        "data-highlighted:bg-copper/10 data-highlighted:text-foreground",
        "data-selected:text-foreground",
        className,
      )}
      {...props}
    >
      {/* The span holds the space, not the indicator. Base UI renders
          ItemIndicator only for the selected item, so sizing the indicator
          itself would let every other label sit 14px further left and the
          whole list would shift sideways as the selection moved. */}
      <span className="flex size-3.5 shrink-0 items-center justify-center text-copper">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-3.5" aria-hidden="true" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
