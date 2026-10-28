"use client"

import { useCallback, useSyncExternalStore } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { DestinationCard } from "@/components/destination/destination-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel"
import type { IDestination } from "@/lib/destinations"

interface FeaturedDestinationsCarouselProps {
  destinations: IDestination[]
}

export function FeaturedDestinationsCarousel({
  destinations,
}: FeaturedDestinationsCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start" }}
      aria-label="Featured destinations"
      className="mt-8"
    >
      <CarouselContent>
        {destinations.map((destination) => (
          <CarouselItem
            key={destination.id}
            className="sm:basis-1/2 lg:basis-1/3"
          >
            <DestinationCard destination={destination} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselFooter total={destinations.length} />
    </Carousel>
  )
}

function useCurrentSlide() {
  const { api } = useCarousel()

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

  return useSyncExternalStore(
    subscribe,
    () => (api ? api.selectedScrollSnap() + 1 : 1),
    () => 1
  )
}

function CarouselFooter({ total }: { total: number }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
  const current = Math.min(useCurrentSlide(), total)

  return (
    <div className="mt-7 flex items-center gap-6">
      <p className="shrink-0 text-sm text-slate-900 tabular-nums">
        {current}/{total}
      </p>
      <div aria-hidden className="h-px flex-1 bg-slate-200" />
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous destinations"
          className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowLeft className="size-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next destinations"
          className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowRight className="size-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
