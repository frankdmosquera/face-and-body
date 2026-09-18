# Services - source of truth

Scraped 2026-09-17 from the two live Square surfaces. Prices are CAD.

Booking is handled by Square. The site links out to it, it does not replace it.

- Booking flow: https://book.squareup.com/appointments/p6p3layudnzt4f/location/L7WVRTQT2SYS3/services
- Current Square site: https://face-and-body-wellness-centre.square.site

The booking flow shows "Price varies" where the Square site shows a real
"from" price. The from-prices below come from the Square site and are the
better number to put on the website.

## Grouping

Square lists all 45 services in one flat list. The groups below are ours, for
navigation. Square's own ordering is not meaningful.

### Facials (22)

| Service | Price | Duration |
|---|---|---|
| Microdermabrasion Facial | $145 | 1 hr |
| Deep Cleansing Facial | $159 | 1 hr 15 min |
| Dermaplaning Facial | $145 | 1 hr |
| Hydra Spa Facial | $159 | 1 hr 10 min |
| Gold Facial | $159 | 1 hr 15 min |
| HIFU Facial | $155 | 1 hr |
| Detoxifying Facial (Eminence) | $145 | 1 hr |
| Mini Facial | $60 | 30 min |
| Revitalizing Facial (Eminence) | $155 | 1 hr |
| Lifting Facial | $159 | 1 hr |
| Oxygen Rejuvenating Facial | $155 | 1 hr |
| Oxygen Brightening Facial | $155 | 1 hr |
| Hydrodermabrasion | $155 | 1 hr 15 min |
| Fire and Ice Facial | $169 | 1 hr |
| Eminence Facial | $159 | 1 hr 20 min |
| Radio Frequency Facial | $160 | 1 hr |
| Back Facial | $189 | 1 hr 15 min |
| Facial Light Therapy LED | $60 | 30 min |
| Chemical Peel | from $80 | 30 min |
| Carbon Peel | $150 | 45 min |
| Hollywood Peel Facial | $260 | 1 hr 45 min |
| SPF | $80 | 30 min |

### Advanced skin treatments (6)

| Service | Price | Duration |
|---|---|---|
| Microneedling CIT Face | $290 | 1 hr 30 min |
| Microneedling Abdomen CIT | $350 | 1 hr 30 min |
| Fractional Microneedling | **no price set** | 15 min+ |
| IPL Treatments | **no price set** | 15 min+ |
| Laser Hair Removal | **no price set** | 10 min+ |
| Thermo-Coagulation | from $40 | 10 min+ |

### Body and contouring (4)

| Service | Price | Duration |
|---|---|---|
| Wood Therapy (Maderoterapia) | from $110 | 30 min+ |
| Lipolysis (diode) | from $150 | 45 min |
| Cavitation | from $130 | 45 min |
| Body Wrap | from $130 | 1 hr |

### Massage (9)

| Service | Price | Duration |
|---|---|---|
| Relaxation 60 | $100 | 1 hr |
| Relaxation 75 | $120 | 1 hr 15 min |
| Relaxation 90 | $149 | 1 hr 30 min |
| Deep Tissue Massage | from $105 | 1 hr 15 min |
| Therapeutic Massage | from $100 | 1 hr+ |
| Lymphatic (Manual Lymphatic Drainage) | $125 | 1 hr |
| Head Massage | $79 | 30 min |
| Relaxation Massage by Esthetician (low pressure) | $80 | 1 hr |
| Massage (combined listing) | varies | 30 min |

### Nails (1)

| Service | Price | Duration |
|---|---|---|
| Manicure | $25 | 45 min |

### Consultations (3)

| Service | Price | Duration |
|---|---|---|
| Consultation | Free | 15 min |
| Facial Consultation | varies | 15 min |
| IPL Consultation | Free | 10 min |

## Problems in the catalogue

These need her answer before the service pages get built. None of them are
website problems, they are business-listing problems that the website will
otherwise inherit.

- **Three services have no price at all.** Laser Hair Removal, IPL Treatments
  and Fractional Microneedling all sit at $0.00+ on Square. Laser hair removal
  is one of the highest-intent searches in this category, and right now it has
  no number attached anywhere. This is the single biggest gap.
- **Three overlapping consultations.** Two free, one varies. A visitor cannot
  tell which to pick. The site should surface one free consultation and let
  Square sort the rest out.
- **Nine massage entries for what is really four treatments.** Relaxation is
  listed three times by length, plus a combined "Massage" listing and a
  separate esthetician version. Show the treatment once, lengths underneath.
- **Copy is supplier marketing, not her voice.** Several descriptions are
  pasted from product vendors. One still contains a stray "4o mini" line and
  another ends with a bare "eminenceorganics". All of it needs rewriting.
- **Medical-adjacent claims.** Detox, fat reduction and cellulite language
  appears throughout. Worth checking Alberta advertising rules before
  repeating any of it verbatim on a site we control.
- **Hours disagree across the web.** Square, Yelp and bookbeauty.ca each list
  different opening times. Get the real ones from her before hard-coding.
