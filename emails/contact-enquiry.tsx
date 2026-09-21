import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

import { siteConfig } from "@/data/siteConfig";
import { imagekitEndpoint, MEDIA_VERSION } from "@/lib/imagekitConfig";

/**
 * The enquiry notification. One person receives this: whoever reads the clinic
 * inbox.
 *
 * TWO AUDIENCES, and they pull in different directions. To the clinic it is a
 * notification, so the name, the way back to them and the message have to be
 * scannable in a second. To the visitor it is brand facing, because hitting
 * Reply quotes this whole email underneath the response. That is why it is
 * laid out and not decorated: legible first, branded second.
 *
 * COLOURS ARE HEX, not tokens, and that is not an oversight. Email clients do
 * not support CSS custom properties, so `--color-copper` cannot reach here.
 * These values are copied from `app/globals.css` and have to be kept in step
 * with it by hand.
 *
 * THE MARK COMES FROM IMAGEKIT, NOT `public/`. An `<Img>` in an email needs an
 * absolute URL, and this project has no site URL constant to build one from -
 * no domain is registered and the Vercel preview URL changes per deploy. So
 * `public/logo-mark.jpg` was uploaded a second time to
 * `face-and-body/brand/logo-mark.jpg`, which has a permanent URL that survives
 * the domain arriving. The header keeps serving its own copy from `public/`
 * for the reason the upload script gives: it must load with no external
 * dependency. Two copies, each with a job.
 *
 * THE WORDMARK STAYS BESIDE IT, for the reason `components/layout/Brand.tsx`
 * gives: the mark is added to the words, not swapped in for them. It also
 * means a client that blocks images - which most do until the reader allows
 * them - still shows who the email is from.
 *
 * Preview it with `npm run email`, which serves this at localhost:3001 and
 * reloads as you edit. No email is sent.
 */

// From app/globals.css. The trailing comment is the token each one came from.
const COPPER = "#c0704f"; // --color-copper, the button, same pairing as the site
const COPPER_TEXT = "#96492a"; // --color-copper-text, links, darker so it reads on cream
const COPPER_INK = "#fffdf9"; // --color-copper-ink, the text on the button
const INK = "#1c1a17"; // --color-ink
const MUTED = "#6b645b"; // --color-ink-muted
const LINE = "#e2d7c6"; // --color-line
const CREAM = "#f7f2ea"; // --color-cream, the page behind the card
const SURFACE = "#fffdf9"; // --color-surface, the card

// Cormorant is a webfont and will not be installed on the reader's machine, so
// Georgia is the one that actually renders. It is the closest thing every mail
// client already has to the site's serif.
const SERIF = "'Cormorant Garamond', Garamond, Georgia, 'Times New Roman', serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/**
 * Served at twice its display size so it stays sharp on a phone, and `undefined`
 * when the endpoint is not configured - a local run without `.env.local` then
 * drops the mark and keeps the wordmark rather than rendering a broken image.
 *
 * Outlook ignores `border-radius`, so the disc is square there. That is why the
 * source keeps its white background instead of being knocked out: square or
 * round, white on the near-white card reads as a badge either way.
 */
const logoUrl = imagekitEndpoint
  ? `${imagekitEndpoint}/brand/logo-mark.jpg?v=${MEDIA_VERSION}&tr=w-136,h-136`
  : undefined;

export type ContactEnquiryEmailProps = {
  name: string;
  /**
   * Either may be empty, never both: the form requires one and accepts two.
   * The template renders the ones that are filled and sizes its sign-off to
   * what it actually got, so she is never told to call someone who left no
   * number.
   */
  email: string;
  phone: string;
  topic: string;
  message: string;
  /** When the enquiry came in. Formatted in clinic time, see below. */
  receivedAt: Date;
};

/**
 * Her time, always, regardless of where this renders. Vercel runs UTC, so
 * formatting with the server's own zone would stamp every summer enquiry an
 * hour or six wrong and nobody would notice until she answered the wrong
 * morning.
 */
function formatReceived(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: siteConfig.timezone,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Section style={{ marginBottom: "14px" }}>
      <Text
        style={{
          margin: "0 0 2px",
          fontFamily: SANS,
          fontSize: "11px",
          lineHeight: "16px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          margin: 0,
          fontFamily: SANS,
          fontSize: "16px",
          lineHeight: "24px",
          color: INK,
        }}
      >
        {children}
      </Text>
    </Section>
  );
}

export function ContactEnquiryEmail({
  name,
  email,
  phone,
  topic,
  message,
  receivedAt,
}: ContactEnquiryEmailProps) {
  // The button is a single tap target, so it picks one. The phone wins when
  // there is one: a clinic books by talking, and an email sits in a queue.
  const callFirst = phone !== "";
  // Strip the display formatting a visitor types, or the tel: link carries
  // brackets and spaces into the dialer.
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const buttonHref = callFirst ? telHref : `mailto:${email}`;

  return (
    <Html lang="en">
      <Head />
      {/* The line the inbox shows next to the subject, before opening it. */}
      <Preview>{`${name} - ${topic}`}</Preview>
      <Body style={{ margin: 0, backgroundColor: CREAM, fontFamily: SANS }}>
        <Container
          style={{ maxWidth: "560px", margin: "0 auto", padding: "32px 16px" }}
        >
          <Section
            style={{
              backgroundColor: SURFACE,
              borderRadius: "4px",
              border: `1px solid ${LINE}`,
              padding: "28px",
            }}
          >
            {/* The lockup, the way the site header builds it: mark, then the
                name in serif with the rest spaced out underneath. Row and
                Column render as a table, which is the only side-by-side an
                email client can be trusted with. */}
            <Row style={{ marginBottom: "24px" }}>
              {logoUrl ? (
                <Column style={{ width: "80px", verticalAlign: "middle" }}>
                  {/* Decorative: the name is right beside it, so alt text would
                      make a screen reader say it twice. */}
                  <Img
                    src={logoUrl}
                    alt=""
                    width="68"
                    height="68"
                    style={{
                      display: "block",
                      borderRadius: "34px",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </Column>
              ) : null}
              <Column style={{ verticalAlign: "middle" }}>
                <Text
                  style={{
                    margin: "0 0 2px",
                    fontFamily: SERIF,
                    fontSize: "26px",
                    lineHeight: "32px",
                    color: INK,
                  }}
                >
                  {siteConfig.shortName}
                </Text>
                <Text
                  style={{
                    margin: 0,
                    fontFamily: SANS,
                    fontSize: "10px",
                    lineHeight: "14px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: MUTED,
                  }}
                >
                  {siteConfig.subName}
                </Text>
              </Column>
            </Row>

            <Heading
              as="h1"
              style={{
                margin: "0 0 4px",
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "32px",
                color: INK,
              }}
            >
              New enquiry from the website
            </Heading>

            <Text
              style={{
                margin: "0 0 24px",
                fontFamily: SANS,
                fontSize: "13px",
                lineHeight: "18px",
                color: MUTED,
              }}
            >
              {formatReceived(receivedAt)}
            </Text>

            <Field label="Name">{name}</Field>

            {email ? (
              <Field label="Email">
                <Link
                  href={`mailto:${email}`}
                  style={{ color: COPPER_TEXT, textDecoration: "none" }}
                >
                  {email}
                </Link>
              </Field>
            ) : null}

            {phone ? (
              <Field label="Phone">
                <Link
                  href={telHref}
                  style={{ color: COPPER_TEXT, textDecoration: "none" }}
                >
                  {phone}
                </Link>
              </Field>
            ) : null}

            <Field label="About">{topic}</Field>

            <Hr style={{ borderColor: LINE, margin: "20px 0" }} />

            <Text
              style={{
                margin: "0 0 6px",
                fontFamily: SANS,
                fontSize: "11px",
                lineHeight: "16px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              Message
            </Text>
            {/* Split rather than <br />, so a blank line between paragraphs
                survives instead of collapsing. */}
            {message.split(/\n{2,}/).map((paragraph, i) => (
              <Text
                key={i}
                style={{
                  margin: "0 0 12px",
                  fontFamily: SANS,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: INK,
                }}
              >
                {paragraph}
              </Text>
            ))}

            {/* A tap target rather than a link. This is read on a phone, and
                the whole point of an enquiry is to answer it. */}
            <Button
              href={buttonHref}
              style={{
                display: "block",
                marginTop: "20px",
                backgroundColor: COPPER,
                borderRadius: "4px",
                color: COPPER_INK,
                fontFamily: SANS,
                fontSize: "16px",
                fontWeight: 600,
                padding: "14px 20px",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {callFirst ? `Call ${name}` : `Reply to ${name}`}
            </Button>
          </Section>

          {/* Honest either way. `replyTo` is only set when the visitor left an
              address, so promising that Reply reaches someone who left a phone
              number would be a lie the inbox only discovers afterwards. */}
          <Text
            style={{
              margin: "16px 0 0",
              fontFamily: SANS,
              fontSize: "12px",
              lineHeight: "18px",
              color: MUTED,
              textAlign: "center" as const,
            }}
          >
            {email
              ? `Sent from the contact form. Replying goes straight to ${name}.`
              : `Sent from the contact form. ${name} left a phone number only, so reply by calling.`}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/**
 * The preview server renders the default export, with these props. They are
 * sample data for design only and never reach a real send.
 */
export default function PreviewContactEnquiryEmail() {
  return (
    <ContactEnquiryEmail
      name="Sarah Whitfield"
      email="sarah.whitfield@example.com"
      phone="(403) 555-0148"
      topic="Microneedling"
      receivedAt={new Date()}
      message={
        "Hi! I'm in my late thirties and I've got some acne scarring on my cheeks that I've never done anything about.\n\nI saw microneedling on your site but I'm not sure whether it's the right thing, or how many sessions it would take. Could I come in for the consultation first? Saturday mornings work best for me."
      }
    />
  );
}
