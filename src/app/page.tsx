import { Banner } from "@/components/homepage/banner"
import { CallToAction } from "@/components/homepage/cta"
import { Testimonials } from "@/components/homepage/testimonials"
import { WhyChooseUs } from "@/components/homepage/why-choose-us"
import { getFeaturedDestinations } from "@/lib/destinations-api"
import { FeaturedDestinations } from "@/components/homepage/featured-destinations"

export default async function Home() {
  const destinations = await getFeaturedDestinations()
  return (
    <>
      <Banner />
      <FeaturedDestinations destinations={destinations.slice(0, 5)} />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </>
  )
}
