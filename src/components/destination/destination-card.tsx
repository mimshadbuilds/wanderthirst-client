"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react"

import type { IDestination } from "@/lib/destinations"

interface DestinationCardProps {
  destination: IDestination
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const [imageSrc, setImageSrc] = useState<IDestination["image"]>(destination.image)

  function handleImageError() {
    if (destination.fallbackImage && imageSrc !== destination.fallbackImage) {
      setImageSrc(destination.fallbackImage)
    }
  }

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[2/1] overflow-hidden bg-slate-100">
        <Image
          src={imageSrc}
          alt={`${destination.name}, ${destination.country}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
        />

        <span className="absolute top-2 right-2 inline-flex items-center gap-1 bg-white px-2 py-1 text-[11px] leading-none font-medium text-slate-800 shadow-sm">
          {destination.rating.toFixed(1)}
          <Star className="size-3 fill-slate-900 text-slate-900" strokeWidth={1} />
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <p className="flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="size-3.5" strokeWidth={1.6} />
          {destination.country}
        </p>

        <div className="mt-2 flex items-baseline justify-between gap-3">
          <h3 className="text-[17px] leading-snug font-medium text-slate-900">
            {destination.name}
          </h3>
          <p className="shrink-0 text-[17px] leading-snug font-semibold text-slate-900">
            ${destination.price.toLocaleString("en-US")}
            <span className="ml-1 text-[10px] font-normal text-slate-500">
              Person
            </span>
          </p>
        </div>

        <p className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays className="size-3.5" strokeWidth={1.6} />
          {destination.duration}
        </p>

        <Link href={`/destinations/${destination.id}`}
          className="mt-3 inline-flex w-fit items-center gap-1 text-[11px] font-semibold tracking-[0.08em] text-brand uppercase transition-colors hover:text-brand-dark focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none">
          Book Now
          <ArrowUpRight className="size-3.5" strokeWidth={2} />
        </Link>
      </div>
    </article>
  )
}
