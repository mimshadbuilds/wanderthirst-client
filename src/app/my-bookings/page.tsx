import { Suspense } from "react"
import { headers } from "next/headers"

import { BookingLoadError, BookingsSkeleton, EmptyBookings, SignInPrompt, } from "@/components/booking/BookingsStates"
import { MyBookingsCard, type IBooking } from "@/components/booking/MyBookingsCard"
import { auth } from "@/lib/auth"
import { getServerToken } from "@/lib/server-token"

export default function MyBookingsPage() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <header>
          <h1 className="text-3xl font-normal tracking-tight text-slate-900 sm:text-[40px]">
            My Bookings
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Manage and view your upcoming travel plans
          </p>
        </header>

        <Suspense fallback={<BookingsSkeleton />}>
          <BookingsPanel />
        </Suspense>
      </div>
    </section>
  )
}

async function BookingsPanel() {
  const session = await auth.api.getSession({ headers: await headers() })
  const email = session?.user?.email

  if (!email) return <SignInPrompt />

  let result: { bookings: IBooking[] } | { error: true }
  try {
    result = { bookings: await getBookings(email) }
  } catch {
    result = { error: true }
  }

  if ("error" in result) return <BookingLoadError />
  if (result.bookings.length === 0) return <EmptyBookings />

  return (
    <div className="mt-8 flex flex-col gap-5">
      {result.bookings.map((booking, index) => (
        <MyBookingsCard
          key={booking._id}
          booking={booking}
          fallbackIndex={index}
        />
      ))}
    </div>
  )
}

async function getBookings(email: string): Promise<IBooking[]> {
  const token = await getServerToken()

  if (!token) {
    throw new Error("No authorization token available")
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${encodeURIComponent(email)}`,
    { cache: "no-store", 
      headers: {
        authorization: `Bearer ${token}`
      }
    },
  )

  if (!res.ok) {
    throw new Error(`Could not load bookings (${res.status})`)
  }

  const data: unknown = await res.json()
  if (!Array.isArray(data)) {
    throw new Error("The bookings response was not a list")
  }

  return data as IBooking[]
}
