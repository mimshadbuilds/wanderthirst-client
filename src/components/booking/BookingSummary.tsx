import type { ReactNode } from "react"
import { CalendarDays, Clock3 } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { IBooking } from "@/components/booking/MyBookingsCard"

export function BookingSummary({ booking }: { booking: IBooking }) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-3xl font-semibold tracking-tight text-brand">
            ${booking.price}
          </p>
          <p className="mt-1 text-xs text-slate-500">Total trip price</p>
        </div>
        <Badge
          className={
            booking.status === "Pending"
              ? "border-0 bg-amber-50 px-3 py-1.5 text-amber-700"
              : "border-0 bg-emerald-50 px-3 py-1.5 text-emerald-700"
          }>
          {booking.status ?? "Confirmed"}
        </Badge>
      </div>

      <div className="my-5 border-t border-slate-100" />

      <BookingDetail label="Booking ID" value={booking._id} />
      {booking.bookingDate && (
        <BookingDetail
          label="Booked on"
          value={formatDepartureDate(booking.bookingDate)}
          icon={<CalendarDays className="size-4" />}
        />
      )}
      <BookingDetail
        label="Departure"
        value={formatDepartureDate(booking.departureDate)}
        icon={<CalendarDays className="size-4" />}
      />
      {booking.duration && (
        <BookingDetail
          label="Duration"
          value={booking.duration}
          icon={<Clock3 className="size-4" />}
        />
      )}
      {booking.username && (
        <BookingDetail label="Booked by" value={booking.username} />
      )}

      {booking.destinationId && (
        <Button
          render={<Link href={`/destinations/${booking.destinationId}`} />}
          className="mt-6 w-full rounded-full bg-brand text-white hover:bg-brand-dark"
        >
          View Destination
        </Button>
      )}
    </aside>
  )
}

function BookingDetail({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 text-sm">
      <span className="flex shrink-0 items-center gap-2 text-slate-500">
        {icon}
        {label}
      </span>
      <span className="break-all text-right font-medium text-slate-800">
        {value}
      </span>
    </div>
  )
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
