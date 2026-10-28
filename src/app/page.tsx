import { Banner } from "@/components/homepage/banner"
import { CallToAction } from "@/components/homepage/cta"
import { FeaturedDestinations } from "@/components/homepage/featured-destinations"
import { Testimonials } from "@/components/homepage/testimonials"
import { WhyChooseUs } from "@/components/homepage/why-choose-us"

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </>
  )
}
