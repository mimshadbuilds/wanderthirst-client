import Link from "next/link"
import { Compass } from "lucide-react"

import { Button } from "@/components/ui/button"

function BookingNotice({ message, action,}: { message: string
action?: { label: string; href: string }
}) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 border border-dashed border-slate-200 px-6 py-16 text-center">
      <Compass className="size-8 text-slate-300" strokeWidth={1.4} />
      <p className="text-sm text-slate-500">{message}</p>
      {action && (
        <Button
          render={<Link href={action.href} />}
          className="mt-2 h-9 bg-brand px-5 text-xs font-semibold tracking-[0.08em] text-white uppercase hover:bg-brand-dark"
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}

export function SignInPrompt() {
  return (
    <BookingNotice
      message="Sign in to view and manage your bookings."
      action={{ label: "Sign In", href: "/login" }}
    />
  )
}

export function EmptyBookings() {
  return (
    <BookingNotice
      message="You have no bookings yet. Start exploring to plan your next trip."
      action={{ label: "Explore Destinations", href: "/destinations" }}
    />
  )
}

export function BookingLoadError() {
  return (
    <BookingNotice
      message="We couldn't load your bookings. Refresh the page to try again."
    />
  )
}

export function BookingsSkeleton() {
  return (
    <div aria-hidden className="mt-8 flex animate-pulse flex-col gap-5">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 border border-slate-200 bg-white p-3 sm:flex-row"
        >
          <div className="aspect-[2/1] w-full shrink-0 bg-slate-100 sm:aspect-auto sm:h-[150px] sm:w-[280px]" />
          <div className="flex flex-1 flex-col gap-2 py-1">
            <div className="h-5 w-24 rounded-full bg-slate-100" />
            <div className="h-6 w-1/2 bg-slate-100" />
            <div className="h-3 w-56 bg-slate-100" />
            <div className="h-3 w-44 bg-slate-100" />
            <div className="mt-3 h-6 w-24 bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  )
}
