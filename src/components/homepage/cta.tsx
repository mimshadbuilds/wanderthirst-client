import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import ctaImage from "@/assets/CTA.png"

export function CallToAction() {
  return (
    <section id="plan-trip" className="bg-[#1b1b1b] pt-12 sm:pt-20">
      <div className="relative">
        <Image
          src={ctaImage}
          alt=""
          sizes="100vw"
          className="h-auto w-full"
        />
        <div aria-hidden className="absolute inset-0 bg-black/70" />
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 pt-2 pb-16 text-center lg:pb-20">
        <h2 className="text-3xl font-medium text-white sm:text-[40px]">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="group mt-7 inline-flex h-12 items-center justify-center gap-2 bg-white px-8 text-[13px] font-semibold tracking-[0.08em] text-slate-900 uppercase transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
          Book Your Trip Today
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}
