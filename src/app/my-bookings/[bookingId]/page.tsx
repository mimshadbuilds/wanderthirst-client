import { headers } from "next/headers"
import { notFound, redirect } from "next/navigation"

import { BookingDetailsView } from "@/components/booking/BookingDetailsView"
import type { IBooking } from "@/components/booking/MyBookingsCard"
import { auth } from "@/lib/auth"

export default async function BookingDetailsPage({
    params,
}: {
    params: Promise<{ bookingId: string }>
}) {
    const { bookingId } = await params
    const session = await auth.api.getSession({ headers: await headers() })
    const email = session?.user?.email

    if (!email) redirect("/login")

    const response = await fetch(
    `http://localhost:5000/my-bookings/${encodeURIComponent(email)}`,
    { cache: "no-store" },
    )

    if (!response.ok) {
        throw new Error(`Could not load booking (${response.status})`)
    }

    const data: unknown = await response.json()
    if (!Array.isArray(data)) {
        throw new Error("The bookings response was not a list")
    }

    const booking = (data as IBooking[]).find((item) => item._id === bookingId)
    if (!booking) notFound()

    return <BookingDetailsView booking={booking} />
}
