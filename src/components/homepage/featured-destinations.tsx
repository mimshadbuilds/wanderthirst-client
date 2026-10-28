import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { FeaturedDestinationsCarousel } from "@/components/homepage/featured-destinations-carousel"
import { getDestinations } from "@/lib/destinations-api"

const FEATURED_LIMIT = 5

export function FeaturedDestinations() {
  return (
    <section id="destinations" className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-medium text-slate-900 sm:text-[40px]">
              Featured Destinations
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>
          <Link
            href="/destinations"
            className="group inline-flex w-fit items-center justify-center gap-2 border border-brand px-5 py-3 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase transition-colors hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
          >
            All Destinations
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <Suspense fallback={<FeaturedDestinationsSkeleton />}>
          <FeaturedDestinationsList />
        </Suspense>
      </div>
    </section>
  )
}

async function FeaturedDestinationsList() {
  const destinations = await getDestinations()

  return (
    <FeaturedDestinationsCarousel
      destinations={destinations.slice(0, FEATURED_LIMIT)}
    />
  )
}

function FeaturedDestinationsSkeleton() {
  return (
    <div aria-hidden className="mt-8 animate-pulse">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className={index === 2 ? "hidden lg:block" : undefined}>
            <div className="aspect-[2/1] bg-slate-100" />
            <div className="mt-3 h-3 w-20 bg-slate-100" />
            <div className="mt-3 h-4 w-2/3 bg-slate-100" />
            <div className="mt-3 h-3 w-24 bg-slate-100" />
          </div>
        ))}
      </div>
      <div className="mt-7 h-11" />
    </div>
  )
}
