# Fix: Group headings collide with the concern filter

**Type:** Fix
**Status:** verified
**Branch:** `fix/group-headings-collide-with-filter`

## The problem

Frank filtered the facials page by "Fine lines and wrinkles" and got this:

> **For congested and breakout-prone skin** - 1 card
> **For texture, scarring and dullness** - 1 card
> **For dull, dry or tired skin** - 1 card
> **For skin that's losing its bounce** - 3 cards

Four 40px headings for six cards, three of them naming a concern the visitor
did not ask for. Asking for wrinkles and being answered with a heading about
acne reads as broken.

The cause is that the facial groups are the concerns again at lower
resolution. Checked against the data:

| Group | Heading | Dominant concern |
|---|---|---|
| cleansing | For congested and breakout-prone skin | acne, 5 of 6 |
| resurfacing | For texture, scarring and dullness | scarring-texture, 5 of 7 |
| hydrating | For dull, dry or tired skin | dull-dehydrated, 6 of 6 |
| lifting | For skin that's losing its bounce | fine-lines, 3 of 3 |

The page was slicing one dimension twice: eight concern chips over four
concern-shaped buckets that do not line up with them.

Two further problems Frank found on review:

- **The cards kept their original positions.** Each group owns its own grid,
  so hiding cards in place left the survivors stranded one per grid rather
  than packing into a tidy block.
- **No way back to all treatments.** Clicking the active chip again cleared
  the filter, but nothing said so.

## The fix

Two axes, not three. Category is what kind of treatment and owns the page;
concern is what problem and owns the filter and the `/treat` pages. Groups
stop competing.

- The group heading leads with the group name and demotes the concern line to
  supporting text, so it reads as a section of the catalogue rather than a
  second filter.
- While a filter is active the headings hide entirely, and the group and list
  boxes become `display: contents` so every remaining card is a child of one
  grid and they pack from the top. Breakpoints match the unfiltered grid.
- An "All" chip, first in the row, active when nothing is selected.

## Build steps

- [x] **1. Heading hierarchy and hide-while-filtering.**
  *Done when:* unfiltered shows the four group names as headings with the
  concern line beneath; filtering shows no headings.

- [x] **2. Reflow.**
  *Done when:* six filtered cards form even rows rather than one per group.

- [x] **3. All chip.**
  *Done when:* it is present, active with no filter, and restores all 22.

## Verify

Confirmed against the production build, in the DOM and visually:

| State | Cards | Headings | Active chip |
|---|---|---|---|
| Unfiltered | 22 | four group names | All |
| Fine lines | 6, three even rows of two | none | Fine lines and wrinkles |
| Cleared | 22 | four back | All |

The six under Fine lines are LED Light Therapy, Microdermabrasion, Gold,
HIFU, Lifting and Radio Frequency Facial. `npx tsc --noEmit`, `npm run lint`
and `npm run build` clean, 18 routes.

## Notes

The browser pane would only capture cleanly at scroll position zero; scrolled
screenshots came back blank or composited the header over the hero. The visual
confirmation was taken by hiding the header and hero in the live DOM so the
grid sat at the top. That was a capture workaround, not a source change.

An earlier reading of a downscaled screenshot suggested the active chip styling
was wrong. At full resolution it was correct; the downscale was misleading.
