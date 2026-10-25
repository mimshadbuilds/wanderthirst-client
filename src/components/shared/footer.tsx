"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
]

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
]

const linkClass =
  "text-sm text-white/70 transition-colors hover:text-white"

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  )
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-[#010101] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 pt-16 pb-8 md:px-10">
        <Link
          href="/"
          className="inline-block text-5xl leading-none font-semibold tracking-tight sm:text-6xl"
        >
          Wanderthirst
        </Link>
        <p className="mt-3 max-w-md text-sm text-white/70">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <h3 className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-xs text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-4 flex h-11 max-w-xs bg-white/10 focus-within:ring-1 focus-within:ring-white/30"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Enter email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex w-11 shrink-0 items-center justify-center text-white transition-colors hover:text-white/70"
              >
                <ArrowUpRight className="size-4" strokeWidth={1.8} />
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-1.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.14em] text-white uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-1.5">
              <li>
                <a href="tel:+17869011622" className={linkClass}>
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderthirst.com"
                  className={`${linkClass} break-all`}
                >
                  info@wanderthirst.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © 2026 Wanderthirst. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Wanderthirst on X"
              className="text-white transition-colors hover:text-white/70"
            >
              <XLogo className="size-[17px]" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Wanderthirst on LinkedIn"
              className="text-white transition-colors hover:text-white/70"
            >
              <LinkedInLogo className="size-[17px]" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Wanderthirst on Instagram"
              className="text-white transition-colors hover:text-white/70"
            >
              <InstagramLogo className="size-[17px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
