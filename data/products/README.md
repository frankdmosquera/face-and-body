# Eminence product catalogue

194 records covering 152 distinct products, scraped 2026-09-21 from eminenceorganics.com/ca.

**This folder is committed. The images are not.**

`public/images/` is gitignored, so every `image` path below resolves only on
Frank's machine. **Upload to ImageKit before anything renders these.** Every
other photo on this site is served from there through
`components/media/Photo.tsx` with a slot in `data/imagesData.ts`, and these
belong in the same place. Vercel builds from this repo, so an ignored image
is a production 404 that works perfectly on localhost.

Every description here is Eminence's own wording, unedited - this is the
source, not anything publishable. Shipping assets should come from her
Spa Partner portal rather than from these downloads.

## Folders

Each group below has a matching image folder at the same path under
`public/images/product-images/`. The counts should always agree.

| group | file | products | images |
| --- | --- | --: | --: |
| `facials/cleansing` | [cleansers](facials/cleansing/cleansers.md) | 15 | 25 |
|  | [toners-mists](facials/cleansing/toners-mists.md) | 10 |  |
| `facials/eye-lip-spf` | [eye-care](facials/eye-lip-spf/eye-care.md) | 9 | 19 |
|  | [lip-care](facials/eye-lip-spf/lip-care.md) | 4 |  |
|  | [sun-care](facials/eye-lip-spf/sun-care.md) | 7 |  |
| `facials/hydrating` | [moisturizers](facials/hydrating/moisturizers.md) | 22 | 43 |
|  | [serums-oils-concentrates](facials/hydrating/serums-oils-concentrates.md) | 21 |  |
| `facials/lifting` | [firming](facials/lifting/firming.md) | 36 | 36 |
| `facials/resurfacing` | [exfoliants](facials/resurfacing/exfoliants.md) | 9 | 9 |
| `other-treatments/body` | [body-lotions-oils](other-treatments/body/body-lotions-oils.md) | 11 | 16 |
|  | [body-scrubs](other-treatments/body/body-scrubs.md) | 3 |  |
|  | [body-sun-care](other-treatments/body/body-sun-care.md) | 1 |  |
|  | [hand-care](other-treatments/body/hand-care.md) | 1 |  |
| `other-treatments/skin` | [masks-treatments](other-treatments/skin/masks-treatments.md) | 26 | 26 |
| `spa-only` | [spa-only-products](spa-only/spa-only-products.md) | 19 | 19 |
| | **total** | **194** | **193** |

## Where each group came from

| group | Eminence source |
| --- | --- |
| `facials/cleansing` | face/cleansers<br>face/toners-mists |
| `facials/eye-lip-spf` | face/eye-care<br>face/lip-care<br>face/sun-care |
| `facials/hydrating` | face/moisturizers<br>face/serums-oils-concentrates |
| `facials/lifting` | face?prefn1=skinConcern&prefv1=lackOfFirmness&sz=100 |
| `facials/resurfacing` | face/exfoliants |
| `other-treatments/body` | body/lotions-oils<br>body/scrubs<br>body/sun-care<br>body/hand-care |
| `other-treatments/skin` | face/masks-treatments |
| `spa-only` | spa-only-products |

## Products in more than one group

41 of 152 products appear twice, which is why there are
194 records. A firming serum is honestly both a serum and a firming
product, so it is filed under both. The `sku` is the key that joins them.

| product | groups |
| --- | --- |
| Arctic Berry Peptide Radiance Cream | facials/hydrating · facials/lifting |
| Ashwagandha Ultra-Rich Restorative Cream | facials/hydrating · facials/lifting · other-treatments/body |
| Bakuchiol + Niacinamide Moisturizer | facials/hydrating · facials/lifting |
| Bamboo Age Corrective Masque | facials/lifting · other-treatments/skin |
| Bamboo Firming Fluid | facials/hydrating · facials/lifting |
| Birch Water Purifying Essence | facials/cleansing · facials/lifting |
| Bright Skin Moisturizer SPF 40 | facials/eye-lip-spf · facials/hydrating |
| Camellia Glow Solid Face Oil | facials/hydrating · facials/lifting |
| Charcoal Exfoliating Gel Cleanser | facials/cleansing · facials/resurfacing |
| Chocolate Mousse Hydration Masque | facials/lifting · other-treatments/skin |
| Citrus & Kale Potent C+E Masque | facials/lifting · other-treatments/skin |
| Citrus & Kale Potent C+E Serum | facials/hydrating · facials/lifting |
| Copper Tripeptide Serum | facials/hydrating · facials/lifting |
| Eight Greens Phyto Masque – Hot | facials/lifting · other-treatments/skin |
| Eight Greens Youth Serum | facials/hydrating · facials/lifting |
| Firm Skin Acai Cleanser | facials/cleansing · facials/lifting |
| Firm Skin Acai Exfoliating Peel | facials/lifting · facials/resurfacing |
| Hibiscus Instant Line Filler | facials/lifting · other-treatments/skin |
| Hibiscus Ultra Lift Eye Cream | facials/eye-lip-spf · facials/lifting |
| Hibiscus Ultra Lift Neck Cream | facials/hydrating · facials/lifting |
| Lilikoi Daily Defense Moisturizer SPF 40 | facials/eye-lip-spf · facials/hydrating |
| Lilikoi Mineral Defense Sport Sunscreen SPF 30 | facials/eye-lip-spf · other-treatments/body |
| Linden Calendula Treatment | facials/lifting · other-treatments/skin |
| Marine Flower Peptide Concentrate | facials/hydrating · facials/lifting |
| Marine Flower Peptide Eye Cream | facials/eye-lip-spf · facials/lifting |
| Marine Flower Peptide Lip Serum | facials/eye-lip-spf · facials/lifting |
| Marine Flower Peptide Night Cream | facials/hydrating · facials/lifting |
| Marine Flower Peptide Serum | facials/hydrating · facials/lifting |
| Monoi Age Corrective Exfoliating Cleanser | facials/cleansing · facials/lifting |
| Monoi Age Corrective Night Cream for Face & Neck | facials/hydrating · facials/lifting |
| Neroli Age Corrective Hydrating Mist | facials/cleansing · facials/lifting |
| Radiant Protection SPF Fluid | facials/eye-lip-spf · facials/lifting |
| Rosehip & Lemongrass Lip Balm SPF 15 | facials/eye-lip-spf — twice in one folder |
| Rosehip Triple C+E Firming Oil | facials/hydrating · facials/lifting |
| Snow Mushroom & Reishi Masque | facials/lifting · other-treatments/skin |
| Snow Mushroom Moisture Cloud Eye Cream | facials/eye-lip-spf · facials/lifting |
| Stone Crop Cleansing Oil | facials/cleansing · facials/lifting |
| Strawberry Rhubarb Hyaluronic Serum | facials/hydrating · facials/lifting |
| Tetrapeptide Lifting Gel | facials/lifting · other-treatments/skin |
| Vitamin C⁺ Serum | facials/hydrating · facials/lifting |
| Wild Plum Eye Cream | facials/eye-lip-spf · facials/lifting |

## Known gaps

- **No price, size or blurb on 19 spa-only products.** Eminence puts
  professional pricing behind a trade login, so those pages carry no price at
  all. Not a failed parse - there is nothing on the page to read.
- **No star ratings except on cleansers.** The rating widget is JavaScript, so
  fetching the page never sees it.
- **Only the main product shot.** Each page also has a closeup, a texture
  swatch, two lifestyle photos and two video stills that were not downloaded.
- **Key ingredients only.** Eminence publishes no full INCI list anywhere.

## Regenerating

Scripts live in the session scratchpad, not in the repo:
`run.mjs` scrapes one listing, `summarise.mjs` rewrites every .md,
`audit.mjs` checks every field, path and image, `index.mjs` writes this file.
