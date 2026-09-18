# Catalogue - the cleaned service list

Reviewed 2026-09-18 against the live Square booking page
(`book.squareup.com/appointments/p6p3layudnzt4f/...`), rendered in a browser
because it needs JavaScript. The Square site (`square.site`) redirected to an
empty cart and could not be re-read, so its from-prices stand as recorded in
`services.md` on 2026-09-17. `services.md` stays the raw scrape; this file is
what the code mirrors and what she signs off.

Rules applied: presentation is ours to tidy (names, grouping, duplicates,
descriptions); prices, durations and which treatments exist are hers. A
wrong-looking value is recorded as a question, never corrected.

## Every Square listing

45 rows. `kept` and `renamed` rows become site services (40). `dropped` rows
do not, with the reason.

| # | Square name | Square price and time | Site name | Decision | Notes |
|---|---|---|---|---|---|
| 1 | MICRODERMABRASION FACIAL | $145, 1 hr | Microdermabrasion Facial | kept | |
| 2 | DEEP CLEANSING FACIAL | $159, 1 hr 15 min | Deep Cleansing Facial | kept | |
| 3 | DERMAPLANING FACIAL | $145, 1 hr | Dermaplaning Facial | kept | |
| 4 | HYDRA SPA FACIAL | $159, 1 hr 10 min | Hydra Spa Facial | kept | overlap with 32, see below; description has a typo "The HydroFacial in is" |
| 5 | Relaxation 60 | $100, 1 hr | Relaxation Massage (60 min) | renamed | one treatment, three lengths; this is the base entry |
| 6 | Relaxation 90 | $149, 1 hr 30 min | Relaxation Massage (90 min) | renamed | length variant of 5 |
| 7 | DEEP TISSUE MASSAGE | **$126**, 1 hr 15 min | Deep Tissue Massage | kept | `services.md` had "from $105"; Square shows a fixed $126. Square used |
| 8 | THERAPEUTIC MASSAGE | Price varies, 1 hr+ | Therapeutic Massage | kept | from $100 per `services.md` |
| 9 | GOLD FACIAL | $159, 1 hr 15 min | Gold Facial | kept | |
| 10 | Microneedling CIT Face | $290, 1 hr 30 min | Microneedling, Face | renamed | "CIT" is supplier jargon |
| 11 | THERMO-COAGULATION | Price varies, 10 min+ | Thermo-Coagulation | kept | from $40 per `services.md`. Treats spider veins, capillaries, skin tags: no concern in the taxonomy fits, so it carries none. Under Skin Treatments, not Laser, so Laser keeps "consult for pricing" |
| 12 | Wood Therapy | Price varies, 30 min+ | Wood Therapy | kept | from $110 per `services.md`; Square's own copy says "also known as Maderoterapia" |
| 13 | Radio Frequency Facial | $160, 1 hr | Radio Frequency Facial | kept | |
| 14 | Lipo lysis | Price varies, 45 min | Laser Lipolysis | renamed | says what it is; from $150 per `services.md` |
| 15 | CAVITATION | Price varies, 45 min | Cavitation | kept | from $130 per `services.md`; Square says 30 min cavitation plus 15 min hot wrap |
| 16 | Micro needling abdomen CIT | $350, 1 hr 30 min | Microneedling, Abdomen | renamed | no description on Square |
| 17 | HIFU FACIAL | $155, 1 hr | HIFU Facial | kept | |
| 18 | CONSULTATION | Free, 15 min | | dropped | the free consultation is a call to action, not a catalogue item; feature 11 decides how it books |
| 19 | CHEMICAL PEEL | Price varies, 30 min | Chemical Peel | kept | from $80 per `services.md`; no description on Square |
| 20 | DETOXIFYING FACIAL | $145, 1 hr | Detoxifying Facial | renamed | brand moves to the Eminence flag; description ends with a stray "eminenceorganics" |
| 21 | MINI FACIAL | $60, 30 min | Mini Facial | kept | **question:** description says "a 20 min facial", listing says 30 min |
| 22 | Facial Consultation | Price varies, 15 min | | dropped | one of three consultations; see 18 |
| 23 | Facial Light Therapy LED | $60, 30 min | LED Light Therapy | renamed | word order |
| 24 | LYMPHATIC | $125, 1 hr | Lymphatic Drainage Massage | renamed | one plain name |
| 25 | REVITALIZING FACIAL | $155, 1 hr | Revitalizing Facial | renamed | brand moves to the Eminence flag; stray "eminenceorganics" |
| 26 | Lifting Facial | $159, 1 hr | Lifting Facial | kept | no description on Square |
| 27 | BODY WRAP | Price varies, 1 hr | Body Wrap | kept | from $130 per `services.md`; description carries detox and weight-loss claims we do not repeat |
| 28 | BACK FACIAL | $189, 1 hr 15 min | Back Facial | kept | description ends with a stray "4o mini" line |
| 29 | IPL Consultation | Free, 10 min | | dropped | see 18 |
| 30 | OXYGEN REJUVENATING FACIAL | $155, 1 hr | Oxygen Rejuvenating Facial | kept | no description on Square |
| 31 | OXYGEN BRIGHTENING FACIAL | $155, 1 hr | Oxygen Brightening Facial | kept | no description on Square |
| 32 | HYDRODERMABRASION | $155, 1 hr 15 min | Hydrodermabrasion | kept | overlap with 4, see below |
| 33 | FIRE AND ICE FACIAL | $169, 1 hr | Fire and Ice Facial | kept | Square's copy calls it an Eminence facial; flagged Eminence |
| 34 | EMINENCE FACIAL | $159, 1 hr 20 min | Eminence Facial | kept | no description on Square |
| 35 | HEAD MASSAGE | $79, 30 min | Head Massage | kept | |
| 36 | CARBON PEEL | $150, 45 min | Carbon Peel | kept | overlap with 37, see below |
| 37 | Hollywood Peel Facial | $260, 1 hr 45 min | Hollywood Peel Facial | kept | no description on Square |
| 38 | Laser Hair Removal | Price varies, 10 min+ | Laser Hair Removal | kept | **no price anywhere**; launch blocker 5 |
| 39 | FRACTIONAL MICRONEEDLING | Price varies, 15 min+ | Fractional Microneedling | kept | **no price anywhere**; launch blocker 5 |
| 40 | IPL TREATMENTS | Price varies, 15 min+ | IPL Treatment | renamed | singular; **no price anywhere**; Square lists hair removal among its uses, so it also carries the unwanted-hair concern |
| 41 | MASSAGE | Free, 30 min | | dropped | a combined listing whose description pastes four massages together; "Free" is clearly wrong. Its text mentions a **leg massage** that exists nowhere else: question for her |
| 42 | relaxation 75 | $120, 1 hr 15 min | Relaxation Massage (75 min) | renamed | length variant of 5 |
| 43 | ACNE ADVANCED TREATMENT | $80, 30 min | Acne Advanced Treatment | kept | **`services.md` recorded this as "SPF"**, the last word of its description. The prototype's "SPF Treatment" card was built on that mistake. It is a short chemical-peel facial for acne: cleanse, peel, mask, moisturise, SPF |
| 44 | MANICURE | $25, 45 min | | dropped | not one of the five categories and outside the clinic's positioning. Say if it should be on the site anyway |
| 45 | RELAXATION MASSAGE DONE BY ESTHETICIAN | $80, 1 hr | Gentle Relaxation Massage | renamed | plain words; Square's copy says "very low pressure" |

Counts: 28 kept + 12 renamed = 40 site services; 5 dropped.

## For her to rule on

Left as separate services until she answers.

1. **Hydra Spa Facial (4) and Hydrodermabrasion (32).** Both descriptions
   describe water-jet exfoliation with infused serums. Different price and
   length. Same treatment at two lengths, or two treatments?
2. **Carbon Peel (36) and Hollywood Peel Facial (37).** Same carbon-and-laser
   technique; Hollywood has no description. Is it the longer version of the
   same thing?
3. **Deep Cleansing Facial (2) and Detoxifying Facial (20).** Two deep
   cleanses, one Eminence organic. Keep both?
4. **Mini Facial (21)** is described as 20 minutes and listed as 30.
5. **Leg massage** appears only inside the dropped combined listing (41). Is
   it offered?
6. **Deep Tissue (7):** $126 on Square today versus "from $105" a day earlier.
   Which is current?
7. **Three treatments have no price**: Laser Hair Removal, Fractional
   Microneedling, IPL. The site says "priced at consultation" until she gives
   numbers.

## Descriptions

Square's descriptions are supplier copy with pasted-in artefacts ("4o mini",
"eminenceorganics", "The HydroFacial in is"). The site does not reuse them.
Each service carries one plain sentence in `data/services.ts`, all awaiting
her sign-off (project-plan blocker 6). Words deliberately not used anywhere:
detox, fat reduction, cellulite, cures, treats a condition.
