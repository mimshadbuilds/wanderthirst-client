import Link from "next/link"
import { ArrowRight, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <main className="flex min-h-[75vh] items-center justify-center bg-white px-6 py-16">
            <div className="mx-auto max-w-xl text-center">
                <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Compass className="size-10" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold tracking-[0.2em] text-brand uppercase">
                    Error 404
                </p>
                <h1 className="mt-4 text-4xl font-medium tracking-tight text-slate-900 sm:text-6xl">
                    Looks like you took a wrong turn.
                </h1>
                <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-500">
                    This page seems to be off the map. Let&apos;s get you back to discovering beautiful destinations and unforgettable experiences.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button render={<Link href="/" />} nativeButton={false} className="h-12 rounded-none bg-brand px-6 text-white hover:bg-brand-dark">
                        Back to Home
                        <ArrowRight className="size-4" />
                    </Button>
                    <Button render={<Link href="/destinations" />} nativeButton={false} variant="outline" className="h-12 rounded-none px-6">
                        Explore Destinations
                    </Button>
                </div>
                <div className="mt-12 border-t border-slate-100 pt-6">
                    <p className="text-xs tracking-[0.15em] text-slate-400 uppercase">
                        Wanderthirst · Find your next adventure
                    </p>
                </div>
            </div>
        </main>
    )
}
