import Link from "next/link";
import { BookLink } from "@/components/booking/BookLink";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { FOOTER } from "@/data/nav";
import { siteConfig, type SiteLinkType } from "@/data/siteConfig";

function FooterLink({ label, href }: SiteLinkType) {
  const className = "hover:text-on-dark";
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} rel="noopener">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  const { address, phone, email } = siteConfig;
  return (
    <footer className="relative overflow-hidden bg-dark pt-20 pb-8 text-on-dark dark:bg-dark-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[110px]"
      />
      <Container className="relative">
        {/* The clinic's own tagline, which the site never used until now, as a
            last invitation on every page. */}
        <div className="mb-16 flex flex-col gap-8 border-b border-gold/20 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-serif text-[44px] leading-[1.05] lg:text-[64px]">
            {siteConfig.tagline.split(" ").map((word, index, words) =>
              index === words.length - 1 ? (
                <em key={word} className="text-gold">
                  {word}
                </em>
              ) : (
                <span key={word}>{word} </span>
              ),
            )}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <BookLink className={buttonVariants()}>Book now</BookLink>
            <a
              href={phone.tel}
              className="font-serif text-[24px] text-on-dark-muted hover:text-on-dark"
            >
              {phone.display}
            </a>
          </div>
        </div>
        <div className="mb-[72px] grid grid-cols-2 gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <p className="mb-5 font-serif text-[21px] leading-none tracking-[0.04em]">
              {siteConfig.shortName}
              <small className="mt-1 block font-sans text-[9px] tracking-[0.22em] uppercase text-on-dark-muted">
                {siteConfig.subName}
              </small>
            </p>
            <p className="text-sm leading-[1.8] text-on-dark-muted">
              {address.unit}, {address.street}
              <br />
              {address.city}, {address.province} {address.postalCode}
              <br />
              <a href={phone.tel} className="hover:text-on-dark">
                {phone.display}
              </a>
              <br />
              <a href={`mailto:${email}`} className="hover:text-on-dark">
                {email}
              </a>
            </p>
          </div>
          {FOOTER.map((group) => (
            <div key={group.heading}>
              <h4 className="mb-[18px] font-sans text-[11px] font-normal tracking-[0.18em] uppercase text-gold">
                {group.heading}
              </h4>
              <ul className="space-y-2.5 text-sm text-on-dark-muted">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="-mx-2 mb-10 bg-linear-to-r from-gold-deep/45 via-gold/25 to-gold-deep/45 bg-clip-text font-serif text-[clamp(64px,11vw,160px)] leading-[0.9] tracking-[-0.02em] whitespace-nowrap text-transparent"
        >
          {siteConfig.shortName}
        </div>
        <div className="flex flex-col gap-2 border-t border-dark-surface pt-6 text-xs text-on-dark-muted lg:flex-row lg:justify-between dark:border-on-dark/10">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </Container>
    </footer>
  );
}
