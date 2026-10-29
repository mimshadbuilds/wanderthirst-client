"use client"

import { useCallback, useSyncExternalStore } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DestinationCard } from "@/components/destination/destination-card"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/ui/carousel"
import type { IDestination } from "@/lib/destinations"

export function FeaturedDestinations({ destinations }: { destinations: IDestination[] }) {
    return (
        <section id="destinations" className="bg-white py-16 lg:py-20">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-medium text-slate-900 sm:text-[40px]">
                            Featured Destinations
                        </h2>
                        <p className="mt-3 text-sm text-slate-500">
                            Handpicked travel experiences for the adventure seekers
                        </p>
                    </div>
                    <Link href="/destinations"
                        className="group inline-flex w-fit items-center justify-center gap-2 border border-brand px-5 py-3 text-[11px] font-semibold tracking-[0.12em] text-brand uppercase transition-colors hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none">
                        All Destinations
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

                <Carousel opts={{ align: "start" }} aria-label="Featured destinations" className="mt-8">
                    <CarouselContent>
                        {destinations.map((destination) => (
                            <CarouselItem key={destination.id} className="sm:basis-1/2 lg:basis-1/3">
                                <DestinationCard destination={destination} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselFooter total={destinations.length} />
                </Carousel>
            </div>
        </section>
    )
}

function CarouselFooter({ total }: { total: number }) {
    const { api, scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

    const subscribe = useCallback(
        (onStoreChange: () => void) => {
            if (!api) return () => {}

            api.on("select", onStoreChange)
            api.on("reInit", onStoreChange)

            return () => {
                api.off("select", onStoreChange)
                api.off("reInit", onStoreChange)
            }
        },
        [api]
    )

    const current = useSyncExternalStore(
        subscribe,
        () => (api ? api.selectedScrollSnap() + 1 : 1),
        () => 1
    )

    return (
        <div className="mt-7 flex items-center gap-6">
            <p className="shrink-0 text-sm text-slate-900 tabular-nums">
                {total ? Math.min(current, total) : 0}/{total}
            </p>
            <div aria-hidden className="h-px flex-1 bg-slate-200" />
            <div className="flex shrink-0 items-center gap-3">
                <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                    aria-label="Previous destinations"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60">
                    <ArrowLeft className="size-5" strokeWidth={1.5} />
                </button>
                <button
                    type="button"
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                    aria-label="Next destinations"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60">
                    <ArrowRight className="size-5" strokeWidth={1.5} />
                </button>
            </div>
        </div>
    )
}