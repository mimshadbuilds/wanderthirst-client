"use client"

import { useState } from "react"
import AdminOverview from "./_components/AdminOverview"
import AdminDestinations from "./_components/AdminDestinations"
import AdminBookings from "./_components/AdminBookings"

const tabs = [
    { id: "overview", label: "Overview" },
    { id: "destinations", label: "Destinations" },
    { id: "bookings", label: "Bookings" },
] as const

type TabId = (typeof tabs)[number]["id"]

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<TabId>("overview")

    return (
        <section className="min-h-[calc(100vh-60px)] bg-[#f7f8f9] px-4 py-10 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                        Admin Panel
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Manage destinations and bookings
                    </p>
                </div>

                <div className="mb-6 border-b border-slate-200">
                    <nav className="flex gap-6" aria-label="Admin tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-3 text-sm font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? "border-b-2 border-brand text-brand"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {activeTab === "overview" && <AdminOverview />}
                {activeTab === "destinations" && <AdminDestinations />}
                {activeTab === "bookings" && <AdminBookings />}
            </div>
        </section>
    )
}
