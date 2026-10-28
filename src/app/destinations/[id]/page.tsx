import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Check, MapPin, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import DestinationEditDialog from "@/components/destination/DestinationEditDialog"
import DestinationDeleteDialog from "@/components/destination/DestinationDeleteDialog"
import BookingCard from "@/components/booking/BookingCard"
import { DestinationPhoto } from "@/components/destination/DestinationPhoto"

export type Destination = {
    country?: string
    destinationName?: string
    imageUrl?: string
    fallbackImageUrl?: string
    rating?: number | string
    reviews?: number | string
    reviewCount?: number | string
    duration?: string
    overview?: string
    description?: string
    highlights?: string[]
    amenities?: string[]
    galleryImages?: string[]
    price?: number | string
    category: string
    departureDate: string
    _id: string
}

const defaultHighlights = [
    "Luxury beachfront accommodation",
    "Visit Uluwatu Temple at sunset",
    "Traditional Balinese spa treatment",
    "Private beach dinner experience",
    "Sunrise trek to Mount Batur",
]

const DestinationsDetailsPage = async ({ params } : { params: Promise<{id: string}>}) => {
    const { id } = await params
    const res = await fetch(`http://localhost:5000/destinations/${id}`, { cache: "no-store" })

    if (res.status === 404) notFound()
    if (!res.ok) throw new Error("Failed to fetch destination")

    const destination: Destination = await res.json()

    const name = destination.destinationName ?? "Destination"
    const country = destination.country ?? ""
    const rating = destination.rating ?? 4.9
    const reviews = destination.reviews ?? destination.reviewCount ?? 234
    const duration = destination.duration ?? "7 Days / 6 Nights"
    const overview = destination.overview ?? destination.description ?? `Discover the magic of ${name} with pristine beaches, vibrant local culture, and unforgettable experiences.`
    const highlights = destination.highlights?.length ? destination.highlights : defaultHighlights

    return (
        <main className="min-h-screen bg-background my-5">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <Link href="/destinations" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="size-4" />
                        Back to Destinations
                    </Link>
                    <div className="flex gap-2">
                        <DestinationEditDialog destination={destination} />
                        <DestinationDeleteDialog destination={destination} />
                    </div>
                </div>
                <div className="relative h-[230px] overflow-hidden rounded-lg bg-muted sm:h-[320px] lg:h-[420px]">
                    <DestinationPhoto
                        src={destination.imageUrl}
                        fallbackSrc={destination.fallbackImageUrl}
                        alt={`${name}, ${country}`}
                        priority
                        sizes="(max-width: 768px) 100vw, 1200px"
                        className="object-cover"
                    />
                </div>
                <Separator className="my-6 sm:my-8" />
                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
                    <section>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="size-4" />
                            {country}
                        </div>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px]">
                            {name}
                        </h1>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                            <span className="flex items-center gap-1.5 font-semibold">
                                <Star className="size-4 fill-green-600 text-green-600" />
                                {rating}
                            </span>
                            <span className="text-muted-foreground">({reviews} reviews)</span>
                            <span className="flex items-center gap-1.5">
                                <CalendarDays className="size-4 text-muted-foreground" />
                                {duration}
                            </span>
                        </div>
                        <section className="mt-7">
                            <h2 className="text-xl font-semibold">Overview</h2>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                                {overview}
                            </p>
                        </section>
                        <section className="mt-7">
                            <h2 className="text-xl font-semibold">Highlights</h2>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                                Discover the best of {name} with carefully selected experiences, beautiful landscapes, and memorable moments throughout your trip.
                            </p>
                            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                                {highlights.map((highlight) => (
                                    <li key={highlight} className="flex items-start gap-2.5 text-sm">
                                        <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </section>
                <BookingCard destination={destination} />
                </div>
            </div>
        </main>
    )
}

export default DestinationsDetailsPage