import Link from "next/link";
import { CalendarSearch, ArrowLeft, Home } from "lucide-react";

const MyBookingsNotFound = () => {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-slate-100">
                    <CalendarSearch className="size-10 text-slate-500" />
                </div>

                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-500">
                    Page Not Found
                </p>

                <h1 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                    Bookings Unavailable
                </h1>

                <p className="mb-8 leading-7 text-slate-600">
                    We couldn&apos;t find the bookings page you requested. The page
                    may have moved, or the address might be incorrect.
                </p>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
                    >
                        <Home className="size-4" />
                        Back to Home
                    </Link>

                    <Link
                        href="/destinations"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        <ArrowLeft className="size-4" />
                        Explore Destinations
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default MyBookingsNotFound;