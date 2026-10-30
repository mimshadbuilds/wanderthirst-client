"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import AuthUserPage from "./AuthUser"
import { authClient } from "@/lib/auth-client"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "My Bookings", href: "/my-bookings" },
]

const linkClass = "text-[13px] font-medium text-slate-800 transition-colors hover:text-brand"

export function Navbar() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const { data: session } = authClient.useSession()
    const role = (session?.user as { role?: string } | undefined)?.role || "user"
    const isAdmin = role === "admin"

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href)

    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            <nav aria-label="Main navigation" className="relative flex h-[60px] items-center justify-between px-4 sm:px-6">
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    className="inline-flex size-9 items-center justify-center text-slate-800 transition-colors hover:text-brand md:hidden">
                    {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>

                <ul className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={isActive(link.href) ? "page" : undefined}
                                className={isActive(link.href) ? "text-[13px] font-medium text-brand" : linkClass}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    {isAdmin && (
                        <>
                            <li>
                                <Link
                                    href="/admin"
                                    aria-current={pathname.startsWith("/admin") ? "page" : undefined}
                                    className={pathname.startsWith("/admin") ? "text-[13px] font-medium text-brand" : linkClass}>
                                    Admin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/add-destination"
                                    aria-current={pathname === "/add-destination" ? "page" : undefined}
                                    className={pathname === "/add-destination" ? "text-[13px] font-medium text-brand" : linkClass}>
                                    Add Destination
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold tracking-tight text-brand sm:text-[26px]">
                    Wanderthirst
                </Link>
                <div className="hidden items-center md:flex">
                    <AuthUserPage />
                </div>
            </nav>

            {menuOpen && (
                <div id="mobile-menu" className="border-t border-slate-100 bg-white px-4 pt-2 pb-5 md:hidden">
                    <ul className="flex flex-col">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    aria-current={isActive(link.href) ? "page" : undefined}
                                    className={`block py-2.5 text-sm font-medium ${isActive(link.href) ? "text-brand" : "text-slate-800"}`}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        {isAdmin && (
                            <>
                                <li>
                                    <Link
                                        href="/admin"
                                        onClick={() => setMenuOpen(false)}
                                        aria-current={pathname.startsWith("/admin") ? "page" : undefined}
                                        className={`block py-2.5 text-sm font-medium ${pathname.startsWith("/admin") ? "text-brand" : "text-slate-800"}`}>
                                        Admin
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/add-destination"
                                        onClick={() => setMenuOpen(false)}
                                        aria-current={pathname === "/add-destination" ? "page" : undefined}
                                        className={`block py-2.5 text-sm font-medium ${pathname === "/add-destination" ? "text-brand" : "text-slate-800"}`}>
                                        Add Destination
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="mt-2 flex justify-end border-t border-slate-100 pt-4">
                        <AuthUserPage />
                    </div>
                </div>
            )}
        </header>
    )
}
