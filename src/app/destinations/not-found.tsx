import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DestinationsNotFound() {
    return (
        <main className="flex min-h-[65vh] items-center justify-center bg-white px-6 py-16">
            <div className="mx-auto max-w-lg text-center">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <MapPin className="size-8" strokeWidth={1.5} />
                </div>
                <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                    Destination unavailable
                </p>
                <h1 className="mt-4 text-3xl font-medium text-slate-900 sm:text-4xl">
                    We couldn&apos;t find these destinations.
                </h1>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                    The destination page you&apos;re looking for may have moved or may no longer be available.
                </p>
                <Button render={<Link href="/destinations" />} nativeButton={false} className="mt-8 h-12 rounded-none bg-brand px-6 text-white hover:bg-brand-dark">
                    <ArrowLeft className="size-4" />
                    Browse All Destinations
                </Button>
            </div>
        </main>
    )
}
