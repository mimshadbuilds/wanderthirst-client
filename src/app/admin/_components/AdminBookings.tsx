"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

type Booking = {
    _id: string
    email: string
    destinationId: string
    destinationName?: string
    departureDate?: string
    guests?: number
    totalPrice?: number
    status?: string
}

export default function AdminBookings() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                let token: string | undefined
                try {
                    const tokenResult = await (authClient as unknown as { token?: () => Promise<{ data?: { token?: string }; token?: string } | undefined> }).token?.()
                    token = tokenResult?.data?.token || tokenResult?.token
                } catch (err) {
                    console.warn("Failed to get auth token", err)
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-bookings`, { 
                    cache: "no-store",
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                })
                if (res.ok) {
                    const data = await res.json()
                    setBookings(data)
                }
            } catch (err) {
                console.error("Failed to fetch bookings", err)
            } finally {
                setLoading(false)
            }
        }
        fetchBookings()
    }, [])

    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Destination
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Departure Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Guests
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500">
                                        No bookings found
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 text-sm text-slate-900">
                                            {booking.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {booking.destinationName || booking.destinationId}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {booking.departureDate || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {booking.guests || 1}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {booking.totalPrice ? `$${booking.totalPrice}` : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                                {booking.status || "pending"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
