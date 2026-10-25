"use client"

import { useMemo, useState } from "react"

import { DestinationCard } from "@/components/destination-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { IDestination, DestinationCategory } from "@/lib/destinations"

interface DestinationBrowserProps {
  destinations: IDestination[]
}

const categoryOptions: { value: DestinationCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "Beach", label: "Beach" },
  { value: "Mountain", label: "Mountain" },
  { value: "City", label: "City" },
  { value: "Adventure", label: "Adventure" },
  { value: "Cultural", label: "Cultural" },
  { value: "Cruise", label: "Cruise" },
]

const priceRanges = [
  { value: "all", label: "Any Price", min: 0, max: Number.POSITIVE_INFINITY },
  { value: "under-1500", label: "Under $1,500", min: 0, max: 1499 },
  { value: "1500-3000", label: "$1,500 – $3,000", min: 1500, max: 3000 },
  { value: "over-3000", label: "Over $3,000", min: 3000, max: Number.POSITIVE_INFINITY },
] as const

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
] as const

type PriceRangeValue = (typeof priceRanges)[number]["value"]
type SortValue = (typeof sortOptions)[number]["value"]

const filterTriggerClass =
  "h-11 w-full justify-between rounded-none border-0 bg-transparent px-4 text-[11px] font-medium tracking-[0.1em] text-slate-600 uppercase shadow-none hover:bg-slate-50 focus-visible:ring-0 data-[size=default]:h-11"

export function DestinationBrowser({ destinations }: DestinationBrowserProps) {
  const [category, setCategory] = useState<DestinationCategory | "all" | null>(null)
  const [priceRange, setPriceRange] = useState<PriceRangeValue | null>(null)
  const [sort, setSort] = useState<SortValue | null>(null)

  const visibleDestinations = useMemo(() => {
    const range =
      priceRanges.find((item) => item.value === priceRange) ?? priceRanges[0]

    const filtered = destinations.filter((destination) =>
        (category === null || category === "all" || destination.category === category) &&
        destination.price >= range.min &&
        destination.price <= range.max,
    )

    switch (sort) {
      case "price-asc":
        return filtered.toSorted((a, b) => a.price - b.price)
      case "price-desc":
        return filtered.toSorted((a, b) => b.price - a.price)
      case "rating-desc":
        return filtered.toSorted((a, b) => b.rating - a.rating)
      default:
        return filtered
    }
  }, [category, destinations, priceRange, sort])

  function resetFilters() {
    setCategory(null)
    setPriceRange(null)
    setSort(null)
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-1 divide-y divide-slate-200 border border-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div>
          <Select
            items={categoryOptions}
            value={category}
            onValueChange={(value) => {
              setCategory(value as DestinationCategory | "all" | null)
            }}>
            <SelectTrigger aria-label="Filter by category" className={filterTriggerClass}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            items={priceRanges}
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value as PriceRangeValue | null)
            }}>
            <SelectTrigger aria-label="Filter by price range" className={filterTriggerClass}>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            items={sortOptions}
            value={sort}
            onValueChange={(value) => {
              setSort(value as SortValue | null)
            }}>
            <SelectTrigger aria-label="Sort destinations" className={filterTriggerClass}>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-500" aria-live="polite">
        Showing {visibleDestinations.length}{" "}
        {visibleDestinations.length === 1 ? "destination" : "destinations"}
      </p>

      {visibleDestinations.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-slate-300 px-6 py-16 text-center">
          <p className="text-sm text-slate-500">
            No destinations match the selected filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-3 text-[11px] font-semibold tracking-[0.08em] text-brand uppercase hover:text-brand-dark">
            Clear filters
          </button>
        </div>
      )}
    </>
  )
}
