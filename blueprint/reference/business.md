# Face and Body Wellness Centre - the business

Everything found on the open web, 2026-09-17. Confirm anything marked
**verify** with the owner before it goes on the site.

## Facts

```
Face and Body Wellness Centre
290 Midpark Way SE, Unit 330
Calgary, AB T2X 1P1
(587) 969-3796
faceandbodywellnesscentre@gmail.com
```

- Neighbourhood: Midnapore, Calgary SE
- City of Calgary business licence: active, licensed since 2023
- Coordinates: 50.9095038, -114.0637929
- **Unit 330 matters.** The Square booking page omits it, the City licence and
  Facebook both include it. Use the full address with the unit.

## Where she already exists online

| Surface | State |
|---|---|
| Square site | Bare service menu. No branding, no photos, no pages. This is the whole current website. |
| Square booking | The real booking engine. Works. Keep it. |
| Instagram | @faceandbodywellnesscentre, 458 followers. The strongest asset by far. |
| Facebook | 240+ followers, 5.0 from 3 reviews. `https://www.facebook.com/FACEANDBODYWELLNESSCENTRE/`, found by web search 2026-09-18 |
| Yelp | Listed under Medical Spas |
| Eminence Organics | Authorised stockist, has an official spa link |
| Directory noise | bookbeauty.ca, cityofcalgary.com, wheree, wanderboat, maptons, trip.com. Scraped listings, not hers. |

There is no real website. The Square page is a menu with a Book button.

## How she describes herself

Her own words, from the Square site:

> Face and Body Wellness Centre is a premier medical aesthetics clinic in
> Calgary specializing in advanced facials, skin rejuvenation, laser hair
> removal and therapeutic massage. We are dedicated to delivering personalized
> treatments using professional-grade products and advanced technology to help
> you achieve healthy, radiant skin.

From Facebook:

> a self wellness spa & clinic sanctuary in Calgary

From Instagram:

> INVEST IN YOUR SKIN. IT WILL THANK YOU EVERY DAY.
> RENEW. REVITALIZE. RADIATE.

Note the tension: "medical aesthetics clinic" and "wellness sanctuary" are two
different businesses with two different websites. **verify** which one she
wants to be. The service list leans clinic, the Instagram leans sanctuary.

## Visual identity

She already has one, and it is consistent. Do not invent a new one.

- **Logo**: circular. A woman's profile in black silhouette, with copper and
  rose-gold orchids through her hair.
- **Palette**: copper / rose gold / bronze as the accent, cream and ivory as
  the ground, near-black for text. Warm, not cool.
- **Motif**: orchid and botanical line work, drawn in the same copper.
- **Instagram highlight covers** already use this system: Client Love,
  Facials, Massage Therapy, Eminence Organic Skin Care. They read as one
  brand.

The site should extend this, not replace it. Pull the exact colours off the
logo file rather than eyeballing them from a screenshot - **verify** she can
supply the original logo asset.

## Photography

**verify.** Instagram has before-and-after posts and treatment shots, but
Instagram crops are not website hero images. A treatment site lives or dies on
photography. Open question whether she has, or can get, real photographs of the
room, the equipment and the treatments.

## Positioning notes

- Midnapore is a long way from downtown. She is a neighbourhood clinic, and
  the site should say where she is early and clearly. Local SEO matters more
  than national polish.
- Three reviews on Facebook, all 5.0. Not enough social proof to lead with.
  The Instagram "Client Love" highlight is the better source, and the site
  should be built so reviews can be added as they accumulate.
- Eminence Organics is a genuine differentiator. It is a real, recognised
  organic skincare brand and she is an authorised stockist. Currently it is
  buried inside three service names.

---

## Confirmed from her Instagram, 2026-09-17

Her own "NEW BUSINESS HOURS" post (`ig/post-11.jpg`) settles several of the
open questions above. This is her own published material, so it outranks the
directory listings.

### Real hours

| Day | Hours |
|---|---|
| Monday | 4:00 p.m. - 8:00 p.m. |
| Tuesday | 10:00 a.m. - 1:00 p.m. |
| Wednesday | 9:00 a.m. - 12:00 p.m. |
| Thursday | 12:00 p.m. - 3:30 p.m. |
| Friday | 2:00 p.m. - 6:00 p.m. |
| Saturday | 7:00 a.m. - 11:30 a.m. |
| Sunday | Closed |

**These are short, and they are different every single day.** Around 24 hours
a week, never the same window twice, with a 7:00 a.m. Saturday and an 8:00
p.m. Monday. No visitor will hold that in their head, and a standard
"Mon-Fri 9-5" hours block on the site would be a lie.

Two consequences for the build:

- The hours table has to show all seven days explicitly, never collapsed into
  ranges, and is worth pairing with an "open now / closed" state.
- Booking through Square matters more here than on a normal clinic site,
  because "just call them" mostly fails against these windows.

### Postal code conflict

Her own post says **T2X 1M2**. Square, Yelp and the City licence all say
**T2X 1P1**. Same street address, same unit. One of them is wrong and it
affects maps and local SEO. **verify** before launch.

### Taglines, in her words

- `RENEW. REVITALIZE. RADIATE.` - sits under the wordmark, part of the logo lockup
- `CONFIDENT SKIN. BEAUTIFUL YOU.` - footer line on her graphics

Both are hers and both should appear on the site.

### Logo, sampled

`ig/logo.jpg` is only 150x150, enough to sample colour but not to ship.
**verify** she can supply the original.

| Token | Hex | Where it sits in the logo |
|---|---|---|
| Mid copper | `#c0704f` | The orchid petals, the main mass |
| Deep copper | `#a05030` | Petal shadows and outlines |
| Rose gold | `#f0b090` | Petal highlights |
| Cream | `#fff0e0` | The ground |
| Black | near `#111` | The hair silhouette |

The wordmark is a copper script "Face and Body" over letterspaced
"WELLNESS CENTRE", with a second orchid mark above it.

## Photography we actually have

Pulled from Instagram into `blueprint/reference/ig/`. Thirteen files, and the
login wall stops the scroll at twelve posts, so this is not her whole feed.

**Real photographs, usable:**

| File | What it shows |
|---|---|
| `post-04` | Her, in a white coat, working a red LED device on a client. The best action shot she has. |
| `post-12` | Her in scrubs, standing in the treatment room. Best full portrait. |
| `post-09` | The treatment room, captioned "My treatment room" |
| `post-03` | A man mid-facial with product on |
| `post-01` | A genuine before and after, facial redness |
| `post-02` | Abdomen close up, skin texture |
| `post-05`, `post-06` | Body treatment, towels |

**Promo graphics with text baked in, not usable as photography:**
`post-07`, `post-08`, `post-10`, `post-11`. Useful as brand reference only,
and `post-11` is where the hours came from.

**What is still missing.** A wide hero shot or a short video of the room, a
clean portrait of her without text over it, product-on-shelf, reception, and
more before-and-afters shot in matched light. Her feed is mostly Canva
graphics rather than photography, which is the real gap: the business has no
photo library yet.

### Her Google Business Profile has the wrong hours on six of seven days

Checked 2026-09-17. Google's own AI summary reproduces her Instagram hours
correctly, but the Business Profile panel underneath it, which is what feeds
Maps and the local pack, says something different.

| Day | Her hours (Instagram, 22 Jul 2026) | Google Business Profile |
|---|---|---|
| Monday | 4:00 - 8:00 p.m. | **Closed** |
| Tuesday | 10:00 a.m. - 1:00 p.m. | 12:00 - 7:00 p.m. |
| Wednesday | 9:00 a.m. - 12:00 p.m. | 9:00 a.m. - 4:00 p.m. |
| Thursday | 12:00 - 3:30 p.m. | 11:30 a.m. - 9:00 p.m. |
| Friday | 2:00 - 6:00 p.m. | 10:00 a.m. - 5:00 p.m. |
| Saturday | 7:00 - 11:30 a.m. | 11:00 a.m. - 4:00 p.m. |
| Sunday | Closed | Closed |

Only Sunday agrees.

**The worst one is Monday.** Google tells people she is closed. Her own Square
booking page said "Opening Monday 4:00 p.m." on the day this was checked, so
she is open and taking bookings, and Google is turning that traffic away
before it ever reaches her.

Thursday runs the other way: Google advertises until 9:00 p.m. when she
actually stops at 3:30 p.m. Someone arriving at 7:00 p.m. finds a dark unit.

bookbeauty.ca lists "Tuesday 12-7 p.m.", which is Google's figure rather than
hers, so the bad data is already being copied outward by scrapers. Every week
this stays wrong, more directories inherit it.

**This is fixable today and does not need the website.** She signs into her
Google Business Profile and corrects the seven rows. It is almost certainly
worth more revenue this month than the site launch.

Treat the Instagram hours as correct for the build, still **verify** with her,
and put the same seven rows on the site so there is one published source to
point the other listings at.

## Google Maps listing, read 2026-09-18

The public Maps listing (search "Face and Body Wellness Centre 290 Midpark Way
SE Calgary") corrects two things above:

- **Rating is 4.7 from 79 Google reviews**, not "5.0 across every public
  review". Facebook's 5.0 is from 3. The site prints the Google figure; the
  project plan's line should be corrected.
- **The owner's name is Sandra.** Reviews and her replies use it. Not yet in
  any site copy; the About page will need it confirmed.

Google shows the listing as "Facial spa", "LGBTQ+ friendly", "Identifies as
women-owned", and the review topics people mention most: laser hair removal
(6), relaxing massage (4), skin consultation (2), microneedling (2).

Three reviews were readable in full and are used as verbatim excerpts in
`data/reviews.ts` with the author shortened to first name and initial:
O.O. B (a month ago, deep cleansing facial, acne-prone skin), Daniela Flores
Samame (2 years ago, massages and laser hair removal), Irene Regier (a year
ago, facial). Their Google star counts were not confirmed from the text; the
cards do not print stars per review until they are.
