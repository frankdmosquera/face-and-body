import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Lede } from "@/components/layout/Lede";
import { Section } from "@/components/layout/Section";
import { Photo } from "@/components/media/Photo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";
import { dayLabel, formatHours } from "@/lib/hours";

export function Location() {
  const { address, phone, hours } = siteConfig;
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-stretch lg:gap-16">
        <div>
          <Eyebrow>Find us</Eyebrow>
          <h2 className="mt-4">Midnapore, Calgary SE</h2>
          <Lede className="mt-5">
            {address.unit}, {address.street}
            <br />
            {address.city}, {address.province} {address.postalCode}
          </Lede>
          <table className="my-7 w-full border-collapse text-[15px]">
            <tbody>
              {hours.map((entry) => (
                <tr
                  key={entry.day}
                  className="border-t border-border last:border-b"
                >
                  <td className="py-2.5">{dayLabel(entry.day)}</td>
                  <td className="py-2.5 text-right text-muted-foreground">
                    {formatHours(entry)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 flex flex-wrap gap-4">
            <a
              href={phone.tel}
              className={buttonVariants({ variant: "outline" })}
            >
              Call {phone.display}
            </a>
            <a
              href={phone.sms}
              className={buttonVariants({ variant: "outline" })}
            >
              Text us
            </a>
          </div>
        </div>
        <div className="relative min-h-[280px] overflow-hidden rounded-lg lg:min-h-[440px]">
          <Photo
            slot="room"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </Section>
  );
}
