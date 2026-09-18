import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";

export function Eminence() {
  return (
    <Section tone="sand">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Eyebrow>Products we trust</Eyebrow>
          <h2 className="mt-4">Authorised Eminence Organics stockist</h2>
          <Lede className="mt-5">
            Every facial uses Eminence Organics, the Hungarian skincare line
            built on organic, biodynamic ingredients. It&apos;s the brand behind
            our Detoxifying, Revitalizing and Fire and Ice facials, and you can
            take it home from the clinic.
          </Lede>
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <div className="relative col-span-2 aspect-[2/1] overflow-hidden rounded-lg">
            <Photo
              slot="eminenceWide"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Photo
              slot="eminenceA"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Photo
              slot="eminenceB"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
