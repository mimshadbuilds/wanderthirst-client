"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, CalendarCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

export default function AdminOverview() {
    const [destinationCount, setDestinationCount] = useState<number | null>(null)
    const [userCount, setUserCount] = useState<number | null>(null)
    const [bookingCount, setBookingCount] = useState<number | null>(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                let token: string | undefined
                try {
                    const tokenResult = await (authClient as unknown as { token?: () => Promise<{ data?: { token?: string }; token?: string } | undefined> }).token?.()
                    token = tokenResult?.data?.token || tokenResult?.token
                } catch (err) {
                    console.warn("Failed to get auth token", err)
                }

                const headersInit: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

                const [destRes, userRes, bookingRes] = await Promise.all([
                    fetch("http://localhost:5000/destinations", { cache: "no-store" }),
                    fetch("http://localhost:5000/users/count", { cache: "no-store", headers: headersInit }),
                    fetch("http://localhost:5000/bookings/count", { cache: "no-store", headers: headersInit }),
                ])

                if (destRes.ok) {
                    const data = await destRes.json()
                    setDestinationCount(Array.isArray(data) ? data.length : null)
                }
                if (userRes.ok) {
                    const data = await userRes.json()
                    setUserCount(typeof data.count === "number" ? data.count : null)
                }
                if (bookingRes.ok) {
                    const data = await bookingRes.json()
                    setBookingCount(typeof data.count === "number" ? data.count : null)
                }
            } catch (err) {
                console.error("Failed to fetch stats", err)
            }
        }
        fetchStats()
    }, [])

    const stats = [
        {
            label: "Total Destinations",
            value: destinationCount ?? "-",
            icon: MapPin,
        },
        {
            label: "Total Users",
            value: userCount ?? "-",
            icon: Users,
        },
        {
            label: "Total Bookings",
            value: bookingCount ?? "-",
            icon: CalendarCheck,
        },
    ]

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.label} className="shadow-sm">
                    <CardContent className="flex items-center gap-4 p-6">
                        <div className="flex size-12 items-center justify-center rounded-full bg-brand/10">
                            <stat.icon className="size-6 text-brand" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-semibold">{stat.value}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
