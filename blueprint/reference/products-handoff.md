# Products page: what the next session needs to know

Written 2026-09-21, at the end of the session that replaced the stockist band.
This is a handoff, not a spec. `/feature` writes the spec.

## The state of things

`/products` is live and **every product on it is invented**. `data/productsData.ts`
opens with a warning that says so: real Eminence products from real collections,
but nobody has asked her which ones she actually carries. It carries no prices
and no stock counts on purpose, and the page says "ask in clinic" instead,
which is also true - she sells across the counter, not online.

The page is not a numbered feature in `blueprint/build-plan.md`. It was built
ad hoc. If it is going to be done properly it should be added as an item.

## The catalogue that exists now

Collected 2026-09-21 by a separate agent, committed in `e4f9252`.

- `data/products/` - **194 records, 152 distinct SKUs**, as JSON plus a README
  per folder
- `public/images/product-images/` - **193 packshots**, 1500x1125, product
  centred on pure white
- The two trees **mirror each other folder for folder**, and both mirror the
  site's own navigation:

```
facials/cleansing        25 products   25 images
facials/eye-lip-spf      20            19
facials/hydrating        43            43
facials/lifting          36            36
facials/resurfacing       9             9
other-treatments/body    16            16
other-treatments/skin    26            26
spa-only                 19            19
other-treatments/laser    0   README says why Eminence makes none
other-treatments/massage  0   same
```

**The 194 against 193 is not a missing file.** 41 products are filed in two
folders because a firming serum is honestly both a serum and a firming
product; the SKU joins them. In `eye-lip-spf` it is
`rosehip-lemongrass-lip-balm-spf-15`, in both `lip-care.json` and
`sun-care.json`. Frank's decision, stated explicitly: **do not write dedupe
logic to filter repeats.** The SKU already does it.

**`spa-only` is the professional range.** All 19 carry no price because
Eminence puts trade pricing behind a stockist login. These are back-bar
products used *during* treatments, not things a customer buys. They probably
do not belong on `/products` at all - they are better evidence on the
treatment pages, showing what is actually used on your face.

## Two things that block shipping the catalogue

1. **Every description is Eminence's verbatim wording.** Copied text competes
   with a bigger, older site for the same searches and loses. The rewrite is
   still to come, and it is the real work in this feature.
2. **The images came from eminenceorganics.com, not the Spa Partner portal**
   she has a login for. For an authorised stockist showing the brand it stocks
   that is ordinary use, but the portal is the correct source and that ask is
   open.

## Decisions already made, do not relitigate

- **The page is static.** 152 products from local JSON. No database, no API,
  nothing per request. Streaming and Suspense solve slow async work and there
  is none here. Filtering is client interactivity over statically rendered
  data - the pattern already exists in `GroupTabs`, with `keepMounted` so
  every panel stays in the HTML for a crawler even when closed.
- **The real design question is page weight, not rendering mode.** 152
  products with descriptions, ingredients and how-to-use in one document is a
  heavy page. What goes in the list, what is behind a click, and whether 152
  products live on one URL or split by collection - that is what needs
  deciding.
- **No invented prices, ever.** A made-up price on a live page is a customer
  arriving expecting to pay it.
- **Small fixed artwork goes in `public/`, photographs go to ImageKit.** The
  three band shots are `public/eminence-*.jpg`, rendered by `next/image`,
  because routing them through ImageKit meant the section showed nothing until
  somebody uploaded files by hand. `public/logo-mark.jpg` is the same
  exception. See the note in `data/imagesData.ts` where the slots used to be.
- **`/products` tiles currently cycle the same three band images** as
  placeholders, `object-contain` on a card, because a cropped packshot is a
  product you cannot identify.

## Waiting on Sandra

One message clears all of these. Four are already live claims on the site.

1. Which Eminence collections does she actually stock? **(blocks this feature)**
2. Is the clinic number on WhatsApp? **(live - dead end if not)**
3. Does she reply within a day? **(live)**
4. Does she give the plan in writing after a consultation? **(live)**
5. Is the consultation in person only? **(live)**
6. For feature 7: her name as published, her qualification and where she
   trained, when she started, a photograph
