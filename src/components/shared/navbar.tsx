"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CircleUserRound, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
]

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
]

const linkClass =
  "text-[13px] font-medium text-slate-800 transition-colors hover:text-brand"

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <nav
        aria-label="Main navigation"
        className="relative flex h-[60px] items-center justify-between px-4 sm:px-6">
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={
                  isActive(link.href)
                    ? "text-[13px] font-medium text-brand"
                    : linkClass
                }>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="inline-flex size-9 items-center justify-center text-slate-800 transition-colors hover:text-brand md:hidden"
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold tracking-tight text-brand sm:text-[26px]">
          Wanderthirst
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/profile"
            className={`${linkClass} inline-flex items-center gap-1.5`}>
            <CircleUserRound className="size-4" strokeWidth={1.8} />
            Profile
          </Link>
          {authLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-100 bg-white px-4 pt-2 pb-5 md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block py-2.5 text-sm font-medium ${
                    isActive(link.href) ? "text-brand" : "text-slate-800"
                  }`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-4">
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-800">
              <CircleUserRound className="size-4" strokeWidth={1.8} />
              Profile
            </Link>
            <div className="flex items-center gap-5">
              {authLinks.map((link) => (
                <Link key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-slate-800">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
