"use client"

import { Destination } from "@/app/destinations/[id]/page"
import DestinationEditDialog from "@/components/destination/DestinationEditDialog"
import DestinationDeleteDialog from "@/components/destination/DestinationDeleteDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminDestinations() {
    const [destinations, setDestinations] = useState<Destination[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, { cache: "no-store" })
                if (res.ok) {
                    const data = await res.json()
                    setDestinations(data)
                }
            } catch (err) {
                console.error("Failed to fetch destinations", err)
            } finally {
                setLoading(false)
            }
        }
        fetchDestinations()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">All Destinations</h2>
                <Button render={<Link href="/add-destination" />} nativeButton={false} className="bg-brand hover:bg-brand-dark">
                    <Plus className="size-4" />
                    Add Destination
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                        Country
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : destinations.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                                            No destinations found
                                        </td>
                                    </tr>
                                ) : (
                                    destinations.map((destination) => (
                                        <tr key={destination._id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                                {destination.destinationName || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {destination.country || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {destination.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                ${destination.price}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <DestinationEditDialog destination={destination} />
                                                    <DestinationDeleteDialog destination={destination} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
