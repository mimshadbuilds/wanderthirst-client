import Image from "next/image"

import headsetIcon from "@/assets/Headset.png"
import mapTrifoldIcon from "@/assets/MapTrifold.png"
import shieldCheckIcon from "@/assets/ShieldCheck.png"

const features = [
  {
    icon: shieldCheckIcon,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: mapTrifoldIcon,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: headsetIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-choose" className="bg-brand-soft py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="text-center">
          <h2 className="text-3xl font-medium text-slate-900 sm:text-[40px]">
            Why Choose Wanderthirst
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="border border-slate-200 bg-white p-7 shadow-sm"
            >
              <Image src={feature.icon} alt="" className="size-10" />
              <h3 className="mt-5 text-2xl font-medium text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
