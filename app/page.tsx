import { Categories } from "@/components/home/Categories";
import { Concerns } from "@/components/home/Concerns";
import { Consultation } from "@/components/home/Consultation";
import { Eminence } from "@/components/home/Eminence";
import { Hero } from "@/components/home/Hero";
import { Location } from "@/components/home/Location";
import { Results } from "@/components/home/Results";
import { Reviews } from "@/components/home/Reviews";
import { Signature } from "@/components/home/Signature";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Divider } from "@/components/layout/Divider";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Concerns />
      <Categories />
      <Signature />
      <Divider className="pb-section-sm lg:pb-section" />
      <Results />
      <Eminence />
      <Reviews />
      <Consultation />
      <Location />
    </>
  );
}
