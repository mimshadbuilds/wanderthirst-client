"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarDays, CheckCircle2, Clock3, Eye, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { destinationImages } from "@/lib/destinations"
import BookingDeleteDialog from "./BookingDeleteDialog"

export interface IBooking {
  _id: string
  username?: string
  email: string
  image?: string
  destinationName: string
  destinationId?: string
  country?: string
  category?: string
  price: number | string
  duration?: string
  departureDate: string
  imageUrl?: string
  fallbackImageUrl?: string
  description?: string
  bookingDate?: string
  status?: "Confirmed" | "Pending"
  galleryImages?: string[]
  highlights?: string[]
  amenities?: string[]
  rating?: number | string
  reviews?: number | string
}

interface MyBookingsCardProps {
  booking: IBooking
  fallbackIndex: number
}

function formatDepartureDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function MyBookingsCard({
  booking,
  fallbackIndex,
}: MyBookingsCardProps) {
  const fallbackImage = destinationImages[fallbackIndex % destinationImages.length]
  const [imageSrc, setImageSrc] = useState<string | typeof fallbackImage>(
    booking.imageUrl ?? fallbackImage
  )

  const status = booking.status ?? "Confirmed"
  function handleImageError() {
    if (imageSrc !== fallbackImage) setImageSrc(fallbackImage)
  }

  return (
    <article className="flex flex-col gap-3 border border-slate-200 bg-white p-2 sm:flex-row">
      <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-slate-100 sm:aspect-auto sm:h-[150px] sm:w-[280px]">
        <Image
          src={imageSrc}
          alt={`${booking.destinationName}${booking.country ? `, ${booking.country}` : ""}`}
          fill
          sizes="(min-width: 640px) 280px, 100vw"
          className="object-cover"
          onError={handleImageError}
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 sm:px-2 sm:py-0.5">
        <StatusBadge status={status} />

        <h2 className="mt-1.5 text-2xl leading-snug font-normal text-slate-900">
          {booking.destinationName}
        </h2>

        <p className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays className="size-3.5 shrink-0" strokeWidth={1.6} />
          Departure: {formatDepartureDate(booking.departureDate)}
        </p>

        <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          <MapPin className="size-3.5 shrink-0" strokeWidth={1.6} />
          Booking ID: {booking._id}
        </p>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-3 sm:mt-auto sm:pt-0.5">
          <p className="text-2xl leading-none font-normal text-brand">
            ${booking.price}
          </p>

          <div className="flex items-center gap-2">
          <BookingDeleteDialog booking={booking} />

            <Button
              render={<Link href={`/my-bookings/${booking._id}`} />}
              className="h-8 gap-1.5 rounded-xs bg-brand px-3 text-xs font-medium text-white hover:bg-brand-dark">
              <Eye className="size-3.5" />
              View
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

function StatusBadge({ status }: { status: IBooking["status"] }) {
  if (status === "Pending") {
    return (
      <Badge className="h-auto gap-1 rounded-full border-0 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-600">
        <Clock3 className="size-3" strokeWidth={2} />
        Pending
      </Badge>
    )
  }

  return (
    <Badge className="h-auto gap-1 rounded-full border-0 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
      <CheckCircle2 className="size-3" strokeWidth={2} />
      Confirmed
    </Badge>
  )
}
