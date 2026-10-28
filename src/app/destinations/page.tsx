import type { Metadata } from "next"

import { DestinationBrowser } from "@/components/destination/destination-browser"
import { getDestinations } from "@/lib/destinations-api"

export const metadata: Metadata = {
    title: "Explore All Destinations | Wanderthirst",
    description:
        "Find your perfect travel experience from our curated collection of destinations.",
}

export default async function AllDestinationsPage() {
    const destinations = await getDestinations()

    return (
        <section className="bg-white py-10 sm:py-14">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <header>
            <h1 className="text-3xl font-medium tracking-tight text-slate-900 sm:text-[40px]">
                Explore All Destinations
            </h1>
            <p className="mt-3 text-sm text-slate-500">
                Find your perfect travel experience from our curated collection
            </p>
            </header>
            <DestinationBrowser destinations={destinations} />
        </div>
        </section>
    )
}
