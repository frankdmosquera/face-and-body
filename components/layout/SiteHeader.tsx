import Link from "next/link";
import { Brand } from "@/components/layout/Brand";
import { Container } from "@/components/layout/Container";
import { NavMenu } from "@/components/layout/NavMenu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/88 backdrop-blur-[10px]">
      <Container className="relative flex h-16 items-center justify-between lg:h-[76px]">
        <Brand />
        <NavMenu links={siteConfig.nav}>
          <a
            href={siteConfig.phone.tel}
            className="hidden text-[13px] text-muted-foreground lg:inline"
          >
            {siteConfig.phone.display}
          </a>
          <Link href="/contact" className={buttonVariants()}>
            Book now
          </Link>
        </NavMenu>
      </Container>
    </header>
  );
}
