import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { CONCERNS } from "@/data/concerns";
import { getConcernCount } from "@/lib/services";

export function Concerns() {
  return (
    <Section>
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Start with the concern</Eyebrow>
            <h2 className="mt-4">I&apos;m interested in treating</h2>
          </div>
          <Lede>
            Most people don&apos;t know the name of the treatment they need.
            They know what&apos;s bothering them. Start there and we&apos;ll
            narrow it down.
          </Lede>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {CONCERNS.map((concern, index) => {
            const count = getConcernCount(concern.slug);
            return (
              <Link
                key={concern.slug}
                href={`/concerns/${concern.slug}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-[22px] py-3.5 text-sm transition-colors hover:border-copper hover:text-accent-foreground"
              >
                {concern.label}
                <small className="text-xs text-muted-foreground">
                  {index === 0 ? `${count} treatments` : count}
                </small>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
