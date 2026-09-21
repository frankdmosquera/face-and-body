import Link from "next/link";
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
    <footer className="overflow-hidden bg-dark pt-20 pb-8 text-on-dark dark:bg-dark-surface">
      <Container>
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
              <h4 className="mb-[18px] font-sans text-[11px] font-normal tracking-[0.18em] uppercase text-copper-soft">
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
          className="-mx-2 mb-10 font-serif text-[clamp(64px,11vw,160px)] leading-[0.9] tracking-[-0.02em] whitespace-nowrap text-dark-surface dark:text-on-dark/10"
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
