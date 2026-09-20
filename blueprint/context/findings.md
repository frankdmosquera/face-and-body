# Findings

> **Generated file.** The findings ledger: review findings raised by `/audit`
> against the work in progress, each with a durable ID, severity (P0-P3), and
> status. `/implement` marks repaired findings `fixed`, a later `/audit` pass
> moves them to `closed`, and `/complete` refuses to merge while any P0 or P1
> finding is `open` or `fixed`, then archives resolved findings with the work
> and resets this file.

### F-02 [P2] open - The form promises "Nothing is stored beyond the message itself"

**File:** components/contact/ContactForm.tsx:193
**Found:** 2026-09-18 by /audit (scope: changed; lens: security)
**Why it matters:** That sentence is a privacy claim, shown to a visitor who is
being invited to describe her skin, a condition, or a medication in the message
box. The message travels through Resend, a US third party that retains sent mail
in its logs and dashboard, and lands in a Gmail account. Neither is "nothing
stored". The site has no privacy policy page and the build plan has no item for
one, so there is nothing the claim could point at. For a Canadian clinic taking
health-adjacent personal information this is a PIPEDA exposure, not only an
inaccurate string, and the coding standards already require that every string a
visitor can read be true.
**Suggested fix:** Drop the sentence or say what is actually true, and add a
privacy policy to the build plan.
**Resolution:**

### F-08 [P1] open - The feature 10 spec targets three routes this site no longer has

**File:** blueprint/context/current-feature.md:38
**Found:** 2026-09-19 by /audit (scope: full; lens: quality)
**Why it matters:** The spec's in-scope list, build steps 1 and 2, Files/Changed
and both Done when lines name `/hours`, `/treat/[slug]`, `app/hours/page.tsx`
and `app/treat/[slug]/page.tsx`. None exist. 9ffb12c folded hours into
`/contact` and renamed the concern route, and `next.config.ts` now 308-redirects
both old paths. The spec also never mentions `/what-we-treat`, which is a real
page with its own metadata and is the hub all eight concern pages breadcrumb
back to. Implemented as written, step 1 emits a sitemap listing a URL that
redirects and omitting a page that ranks, and step 2 writes canonical and Open
Graph blocks for two files that are not there. This is the one feature whose
entire job is making the sitemap, the canonical tag and the schema agree.
**Suggested fix:** Rewrite the route list against `find app -name page.tsx`
before starting: `/`, `/contact`, `/what-we-treat`, five
`/treatments/[category]`, eight `/what-we-treat/[slug]`. Sixteen URLs, the same
count the spec predicted, a different set.
**Resolution:** Left open on 2026-09-20. Offered a surgical fix to the spec's
route list and Frank declined for now, so the spec stays as written - but the
finding stays open, not accepted, because it is still a defect waiting to be
built into feature 10 rather than a decision to live with.

What that means in practice, recorded so it is not a surprise later: the spec
still instructs a sitemap containing `/hours` and canonical tags for
`app/hours/page.tsx` and `app/treat/[slug]/page.tsx`. `/hours` 308-redirects to
`/contact#hours` and neither file exists. `/what-we-treat`, which does exist and
is the hub all eight concern pages breadcrumb back to, is absent from the spec
entirely. The spec's own Done when line would pass on a wrong sitemap, because
it only counts 16 URLs and the wrong set also totals 16.

Read the routes off `find app -name page.tsx` before starting feature 10, not off
this spec.

### F-10 [P2] open - Ninety copies of one star icon are 40% of the home page markup

**File:** components/home/ReviewCard.tsx:88
**Found:** 2026-09-19 by /audit (scope: full; lens: performance)
**Why it matters:** `StarRating` renders two lucide `<Star>` elements per star,
an outline and a clipped fill, five stars per widget, across eight cards and the
section header. Measured in the build output: `.next/server/app/index.html` is
296 KB, 157 KB of it markup, and 62.5 KB of that markup is 90 inline copies of
the identical star path. Every other icon on the page comes to 14 KB combined.
It compresses well, but it is still parsed and it is still in the DOM, on the
one page that carries the LCP hero and the standards that say these sites exist
to rank.
**Suggested fix:** Emit the path once as an SVG `<symbol>` and reference it with
`<use href="#star">`. The shape and the clipping box stay exactly as they are.
**Resolution:**

