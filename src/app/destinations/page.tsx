import type { Metadata } from "next"

import { DestinationBrowser } from "@/components/destination-browser"
import { demoDestinations, destinationImages, type IDestination, type DestinationCategory, } from "@/lib/destinations"

export const metadata: Metadata = {
    title: "Explore All Destinations | Wanderthirst",
    description:
        "Find your perfect travel experience from our curated collection of destinations.",
}

interface ApiDestination {
    _id: string
    destinationName: string
    country: string
    category?: string
    price: number | string
    duration: string
    rating?: number
    imageUrl?: string
}

/**
 * Prefers the live image supplied by the API. The bundled image is only used
 * when the API record has no usable image URL.
 */
function getImageSource(
    imageUrl: string | undefined,
    index: number,
): IDestination["image"] {
    if(imageUrl) {
        try {
        const { protocol } = new URL(imageUrl)
        if (protocol === "http:" || protocol === "https:") return imageUrl
    } catch {
    // Malformed URLs are ignored and handled by the fallback below.
    }
}

    return destinationImages[index % destinationImages.length]
}

/**
 * Loads the destination collection from the API. Bundled demo packages are
 * only used when the API is unreachable or returns no destinations.
 */
async function getDestinations(): Promise<IDestination[]> {
    try {
        const res = await fetch("http://localhost:5000/destinations", {
        cache: "no-store",
    })

    if (!res.ok) return demoDestinations

    const data: ApiDestination[] = await res.json()

    if (!Array.isArray(data) || data.length === 0) return demoDestinations

    return data.map((item, index) => ({
        id: item._id,
        name: item.destinationName,
        country: item.country,
        category: (item.category as DestinationCategory | undefined) ?? "Adventure",
        price: Number(item.price),
        duration: item.duration,
        rating: item.rating ?? 4.5,
        image: getImageSource(item.imageUrl, index),
        fallbackImage: destinationImages[index % destinationImages.length],
        }))
    } catch {
        return demoDestinations
    }
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
