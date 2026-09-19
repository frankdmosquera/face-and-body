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

### F-03 [P2] open - The whole 41-service catalogue ships to the browser

**File:** components/contact/ContactForm.tsx:14
**Found:** 2026-09-18 by /audit (scope: changed; lens: performance)
**Why it matters:** `ContactForm` is the first `"use client"` file in the project
to import `@/lib/contact` and `@/lib/services`, both of which pull in
`data/services.ts` (15.5 KB of source, 41 services, every description).
Confirmed in the build output: `.next/static/chunks/2awfbqj392sk9.js` is 53 KB
and contains the service descriptions, and both `/` and `/contact` reference it,
so the home page pays for it too. The client needs three service names for the
topic list and one slug lookup for the prefill.
**Suggested fix:** Resolve both on the server. Pass `CONTACT_TOPICS` and the
prefilled topic and message into `ContactForm` as props from `app/contact/page.tsx`,
and keep `SERVICES` out of the client graph.
**Resolution:**

### F-04 [P2] open - RESEND_API_KEY and RESEND_FROM have no committed record

**File:** .gitignore:34
**Found:** 2026-09-18 by /audit (scope: changed; lens: quality)
**Why it matters:** The Next scaffold's `.env*` rule also swallows
`.env.example`, so the two variables this feature depends on exist only on this
machine. A deploy without `RESEND_API_KEY` returns the same `FAILED` result for
every submission, and nothing in the build, the logs, or the repo says why. The
ignore rule predates this feature, but this feature is the first thing that
breaks because of it.
**Suggested fix:** Add `!.env.example` below the `.env*` line and commit the
file.
**Resolution:**

### F-05 [P3] open - The contact page meta description runs to about 230 characters

**File:** app/contact/page.tsx:19
**Found:** 2026-09-18 by /audit (scope: changed; lens: quality)
**Why it matters:** `LEDE` does double duty as the on-page lede and the meta
description. Google truncates around 155 to 160 characters, so the tail is cut
in the snippet. On a build where the standards call SEO the product rather than
a finishing pass, that is a wasted result line.
**Suggested fix:** A separate `DESCRIPTION` constant under 155 characters, front
loaded with the clinic and the city.
**Resolution:**

### F-06 [P3] unverified - Visitor name reaches the Resend subject with no newline restriction

**File:** actions/contact.ts:39
**Found:** 2026-09-18 by /audit (scope: changed; lens: security)
**Why it matters:** `subject: \`New enquiry from ${name}\`` and the schema's
`.trim()` only strips leading and trailing whitespace, so a name containing a
carriage return or newline survives validation. Resend builds the MIME from a
JSON payload rather than raw SMTP, which almost certainly encodes it safely, but
nothing in this project proves that, so the classic header-injection shape is
present without confirming evidence. Recorded as a lead, not a defect.
**Suggested fix:** Add `.regex(/^[^\r\n]+$/)` to the name field. It costs one
line and removes the question.
**Resolution:**
