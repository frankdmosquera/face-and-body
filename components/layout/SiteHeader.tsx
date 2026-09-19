import Link from "next/link";
import { Brand } from "@/components/layout/Brand";
import { Container } from "@/components/layout/Container";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { HeaderScrollHider } from "@/components/layout/HeaderScrollHider";
import { MobileNav } from "@/components/layout/MobileNav";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";

export function SiteHeader() {
  return (
    <HeaderScrollHider>
      <Container className="relative flex h-16 items-center justify-between lg:h-[76px]">
        <Brand />
        <DesktopNav items={siteConfig.nav} />
        <div className="flex items-center gap-2.5 lg:gap-[22px]">
          <ModeToggle />
          <a
            href={siteConfig.phone.tel}
            className="hidden text-[13px] text-muted-foreground lg:inline"
          >
            {siteConfig.phone.display}
          </a>
          <Link href="/contact" className={buttonVariants()}>
            Book now
          </Link>
          <MobileNav items={siteConfig.nav} />
        </div>
      </Container>
    </HeaderScrollHider>
  );
}
