import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Tag } from "@/components/layout/Tag";
import { Photo } from "@/components/media/Photo";
import { concernsData } from "@/data/concernsData";
import { resultsData } from "@/data/resultsData";

function concernLabel(slug: string): string {
  return concernsData.find((concern) => concern.slug === slug)?.label ?? slug;
}

export function Results() {
  if (resultsData.length === 0) return null;

  return (
    <Section>
      <Container>
        <Eyebrow>Real results</Eyebrow>
        <h2 className="mt-4">Before and after</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {resultsData.map((result) => (
            <figure
              key={result.slot}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="relative aspect-[3/4]">
                <Photo
                  slot={result.slot}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-6 pt-[22px] pb-[26px]">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {result.concerns.map((slug) => (
                    <Tag key={slug}>{concernLabel(slug)}</Tag>
                  ))}
                </div>
                <p className="font-serif text-[21px] leading-[1.35]">
                  {result.caption}
                </p>
                <small className="mt-3 block text-[13px] text-muted-foreground">
                  Her Instagram
                  {result.treatment ? ` · ${result.treatment}` : ""}
                </small>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
