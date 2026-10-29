import { headers } from "next/headers"
import { Camera, DollarSign, Globe, MapPin, Pen, Plane, TrendingUp, type LucideIcon, } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookingLoadError, SignInPrompt, } from "@/components/booking/BookingsStates"
import { type IBooking } from "@/components/booking/MyBookingsCard"
import { auth } from "@/lib/auth"
import { getServerToken } from "@/lib/server-token"

const NOW = Date.now()

export default async function ProfilePanel() {
    const session = await auth.api.getSession({ headers: await headers() })
    const user = session?.user

    if (!user?.email) return <SignInPrompt />

    let bookings: IBooking[]
    
    try {
        bookings = await getBookings(user.email)
    } catch {
        return <BookingLoadError />
    }

    const totalBookings = bookings.length
    const countriesVisited = new Set(
        bookings.map((booking) => booking.country).filter(Boolean)
    ).size
    const upcomingTrips = bookings.filter(
        (booking) => new Date(booking.departureDate).getTime() > NOW
    ).length
    const totalSpent = bookings.reduce(
        (sum, booking) => sum + Number(booking.price || 0),
        0)

    const name = user.name ?? "Traveler"
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    const nationality = user.nationality
    const location = user.email ?? nationality

    const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    })

    return (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[320px_1fr]">
            <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
                <CardContent className="flex flex-col items-center px-6 py-8 text-center">
                    <Avatar size="lg" className="size-24">
                        <AvatarImage src={user.image ?? undefined} alt={name} />
                        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-xl font-semibold text-slate-900">{name}</h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="size-4 text-slate-400" />
                        {location}
                    </p>

                    <Separator className="mt-6" />

                    <div className="mt-6 w-full space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Member since</span>
                            <span className="font-semibold text-slate-900">{memberSince}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Nationality</span>
                            <span className="font-semibold text-slate-900">
                                {nationality ?? "—"}
                            </span>
                        </div>
                    </div>
                    <Button className="mt-6 h-11 w-full bg-brand px-5 text-sm text-white hover:bg-brand-dark">
                        <Pen className="size-4" />
                        Edit Profile
                    </Button>
                    <button
                        aria-label="Instagram"
                        className="mt-4 flex size-8 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark">
                        <Camera className="size-4" />
                    </button>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-xl font-semibold text-slate-900">
                    Travel Statistics
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <StatCard
                        label="Total Bookings"
                        value={String(totalBookings)}
                        icon={Plane}
                        iconClassName="bg-blue-100 text-blue-600"
                    />
                    <StatCard
                        label="Countries Visited"
                        value={String(countriesVisited)}
                        icon={Globe}
                        iconClassName="bg-green-100 text-green-600"
                    />
                    <StatCard
                        label="Upcoming Trips"
                        value={String(upcomingTrips)}
                        icon={TrendingUp}
                        iconClassName="bg-orange-100 text-orange-500"
                    />
                    <StatCard
                        label="Total Spent"
                        value={`$${totalSpent.toLocaleString("en-US")}`}
                        icon={DollarSign}
                        iconClassName="bg-pink-100 text-pink-500"
                    />
                </div>
            </div>
        </div>
    )
}

async function getBookings(email: string): Promise<IBooking[]> {
    const token = await getServerToken()

    if (!token) {
        throw new Error("No authorization token available")
    }

    const res = await fetch(
        `http://localhost:5000/my-bookings/${encodeURIComponent(email)}`,
        {
            cache: "no-store",
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    )

    if (!res.ok) {
        throw new Error(`Could not load bookings (${res.status})`)
    }

    const data: IBooking[] = await res.json()
    if (!Array.isArray(data)) {
        throw new Error("The bookings response was not a list")
    }

    return data as IBooking[]
}

function StatCard({
    label,
    value,
    icon: Icon,
    iconClassName,
}: {
    label: string
    value: string
    icon: LucideIcon
    iconClassName: string
}) {
    return (
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
                <div>
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
                </div>
                <span
                    className={`flex size-10 items-center justify-center rounded-full ${iconClassName}`}>
                    <Icon className="size-5" />
                </span>
            </CardContent>
        </Card>
    )
}