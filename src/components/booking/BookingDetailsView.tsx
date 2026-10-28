import Link from "next/link"
import {
  ArrowLeft,
  BedDouble,
  Check,
  Dumbbell,
  MapPin,
  ParkingCircle,
  Sparkles,
  Utensils,
  Waves,
  Wifi,
  Star,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { IBooking } from "@/components/booking/MyBookingsCard"
import { BookingPhotoGallery } from "@/components/booking/BookingPhotoGallery"
import { BookingSummary } from "@/components/booking/BookingSummary"

export function BookingDetailsView({ booking }: { booking: IBooking }) {
  const photos = [
    booking.imageUrl,
    ...(booking.galleryImages ?? []),
  ].slice(0, 3)
  const highlights = booking.amenities?.length
    ? booking.amenities
    : booking.highlights ?? []

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Booking Details
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review your reservation and itinerary
          </p>
        </header>

        <Link
          href="/my-bookings"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-brand"
        >
          <ArrowLeft className="size-4" />
          Back to My Bookings
        </Link>

        <BookingPhotoGallery
          photos={photos}
          destinationName={booking.destinationName}
          fallbackSrc={booking.fallbackImageUrl}
        />

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="flex flex-wrap gap-2">
                {booking.category && (
                  <Badge variant="secondary">{booking.category}</Badge>
                )}
                {booking.duration && (
                  <Badge variant="secondary">{booking.duration}</Badge>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {booking.destinationName}
                  </h2>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="size-4" />
                    {booking.country ?? "Destination"}
                  </p>
                </div>
                {booking.rating && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
                    <Star className="size-4 fill-current" />
                    {booking.rating}
                    {booking.reviews && (
                      <span className="text-xs text-amber-600">
                        ({booking.reviews})
                      </span>
                    )}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {booking.description ??
                  `Your upcoming trip to ${booking.destinationName}.`}
              </p>
            </section>

            {highlights.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
                <h2 className="text-lg font-semibold text-slate-900">
                  Amenities
                </h2>
                <ul className="mt-4 grid max-w-4xl gap-3 sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-700"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <AmenityIcon name={highlight} />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <BookingSummary booking={booking} />
        </div>
      </div>
    </main>
  )
}

function AmenityIcon({ name }: { name: string }) {
  const amenity = name.toLowerCase()

  if (/beach|pool|ocean|water|shore|lake/.test(amenity)) {
    return <Waves className="size-4" />
  }
  if (/room|suite|bed|accommodation|hotel/.test(amenity)) {
    return <BedDouble className="size-4" />
  }
  if (/restaurant|food|dining|breakfast|meal|bar/.test(amenity)) {
    return <Utensils className="size-4" />
  }
  if (/wi.?fi|internet|wireless/.test(amenity)) {
    return <Wifi className="size-4" />
  }
  if (/fitness|gym|workout/.test(amenity)) {
    return <Dumbbell className="size-4" />
  }
  if (/parking|shuttle|transfer|transport/.test(amenity)) {
    return <ParkingCircle className="size-4" />
  }
  if (/spa|wellness|sauna|massage/.test(amenity)) {
    return <Sparkles className="size-4" />
  }

  return <Check className="size-4" />
}
