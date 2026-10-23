import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import bannerImage from "@/assets/Banner.png"

const primaryButton =
  "inline-flex h-12 items-center justify-center gap-2 bg-brand px-7 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"

const secondaryButton =
  "inline-flex h-12 items-center justify-center bg-white/25 px-7 text-[13px] font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/35 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"

const searchFields = [
  { id: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { id: "date-duration", label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { id: "budget", label: "Budget", placeholder: "$0-$3000" },
  { id: "people", label: "People", placeholder: "5-10" },
]

export function Banner() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-60px)] flex-col overflow-hidden">
      <Image
        src={bannerImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-16 pb-12 text-center sm:px-6 lg:pt-20 lg:pb-16">
          <h1 className="text-[44px] leading-[1.01] font-medium tracking-[-3.12px] text-white sm:text-6xl lg:text-7xl">
            <span className="block">Discover Your</span> <span className="block">Next</span>
            <span className="block">Adventure</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white sm:text-base lg:text-lg">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/destinations" className={`group ${primaryButton}`}>
              Explore Now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="#search" className={secondaryButton}>
              View Destination
            </Link>
          </div>
        </div>

        <form
          id="search"
          aria-label="Search destinations"
          className="w-full bg-white/35 backdrop-blur-sm">
          <div className="flex flex-col divide-y divide-white/30 md:flex-row md:divide-x md:divide-y-0">
            {searchFields.map((field) => (
              <SearchField key={field.id} {...field} />
            ))}
            <button
              type="submit"
              className="h-12 w-full bg-brand text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none md:h-auto md:w-40"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

function SearchField({
  id,
  label,
  placeholder,
}: {
  id: string
  label: string
  placeholder: string
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-3.5 sm:px-6">
      <label
        htmlFor={id}
        className="text-[13px] leading-none font-semibold text-white"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        className="mt-1.5 w-full min-w-0 bg-transparent text-[13px] text-white placeholder:text-white/80 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:outline-none"
      />
    </div>
  )
}
