"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel"

import person1 from "@/assets/person1.png"
import person2 from "@/assets/person2.png"

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned, The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: person2,
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: person1,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <Carousel opts={{ align: "start" }} aria-label="Traveler testimonials">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-medium text-slate-900 sm:text-[40px]">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <CarouselControls />
          </div>

          <CarouselContent className="mt-7">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2">
                <figure className="flex h-full border border-slate-200 bg-white shadow-sm">
                  <div className="flex flex-1 flex-col p-6">
                    <blockquote className="text-sm leading-[1.45] text-slate-900">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <figcaption className="mt-auto pt-6">
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="h-px w-3 bg-brand" />
                        <span className="text-sm text-brand">
                          {testimonial.name}
                        </span>
                      </div>
                      <p className="mt-1 pl-5 text-[11px] text-slate-500">
                        {testimonial.location}
                      </p>
                    </figcaption>
                  </div>
                  <div className="relative w-[42%] shrink-0 self-stretch">
                    <div aria-hidden className="aspect-[5/6]" />
                    <Image
                      src={testimonial.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 240px, (min-width: 768px) 20vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

function CarouselControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous testimonials"
        className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ArrowLeft className="size-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next testimonials"
        className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
      >
        <ArrowRight className="size-5" strokeWidth={1.5} />
      </button>
    </div>
  )
}
