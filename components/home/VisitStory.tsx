import { StoryWatch } from "@/components/home/StoryWatch";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import { ProductTrio } from "@/components/products/ProductTrio";
import { visitData } from "@/data/visitData";
import { cn } from "@/lib/cn";
import type { VisitStepType } from "@/types/visitTypes";

/* Written out per index so Tailwind sees every class: frame n shows, and step
   n brightens, while the wrapper's data-active is n. */
const FRAME_ON = [
  "group-data-[active=0]/story:opacity-100 group-data-[active=0]/story:scale-100",
  "group-data-[active=1]/story:opacity-100 group-data-[active=1]/story:scale-100",
  "group-data-[active=2]/story:opacity-100 group-data-[active=2]/story:scale-100",
  "group-data-[active=3]/story:opacity-100 group-data-[active=3]/story:scale-100",
];
const STEP_ON = [
  "lg:group-data-[active=0]/story:opacity-100",
  "lg:group-data-[active=1]/story:opacity-100",
  "lg:group-data-[active=2]/story:opacity-100",
  "lg:group-data-[active=3]/story:opacity-100",
];
const DOT_ON = [
  "group-data-[active=0]/story:w-10 group-data-[active=0]/story:bg-copper",
  "group-data-[active=1]/story:w-10 group-data-[active=1]/story:bg-copper",
  "group-data-[active=2]/story:w-10 group-data-[active=2]/story:bg-copper",
  "group-data-[active=3]/story:w-10 group-data-[active=3]/story:bg-copper",
];

function Visual({ step, sizes }: { step: VisitStepType; sizes: string }) {
  if (step.visual.kind === "photo") {
    return (
      <Photo
        slot={step.visual.slot}
        fill
        sizes={sizes}
        className="object-cover"
      />
    );
  }
  return <ProductTrio />;
}

/**
 * "Your visit": four steps told beside one pinned picture that changes as each
 * step reaches the middle of the screen. On a phone there is no pinning; each
 * step carries its own picture above it.
 */
export function VisitStory() {
  return (
    <Section className="relative">
      <Container>
        <div className="reveal max-w-2xl">
          <Eyebrow>Your visit</Eyebrow>
          <h2 className="mt-4">
            From the first look <em className="text-copper">to your shelf</em>
          </h2>
        </div>

        <StoryWatch className="group/story mt-14 grid gap-16 lg:mt-6 lg:grid-cols-2 lg:gap-20">
          <div aria-hidden="true" className="hidden lg:block">
            <div className="sticky top-[12vh] h-[76vh] max-h-[680px]">
              <div className="relative h-full overflow-hidden rounded-t-full rounded-b-lg shadow-[0_40px_80px_-40px_rgba(28,26,23,0.45)]">
                {visitData.map((step, index) => (
                  <div
                    key={step.title}
                    className={cn(
                      "absolute inset-0 scale-105 opacity-0 transition-[opacity,scale] duration-700 ease-out",
                      FRAME_ON[index],
                    )}
                  >
                    <Visual step={step} sizes="45vw" />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-center gap-2">
                {visitData.map((step, index) => (
                  <span
                    key={step.title}
                    className={cn(
                      "h-1 w-4 rounded-full bg-border transition-[width,background-color] duration-500",
                      DOT_ON[index],
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          <ol>
            {visitData.map((step, index) => (
              <li
                key={step.title}
                data-step={index}
                className={cn(
                  "flex flex-col justify-center transition-opacity duration-500 not-last:mb-16 lg:min-h-[64vh] lg:opacity-30 lg:not-last:mb-0",
                  STEP_ON[index],
                )}
              >
                <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-lg lg:hidden">
                  <Visual step={step} sizes="100vw" />
                </div>
                <span className="font-serif text-[56px] leading-none text-copper italic lg:text-[72px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[32px] lg:text-[40px]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </StoryWatch>
      </Container>
    </Section>
  );
}
