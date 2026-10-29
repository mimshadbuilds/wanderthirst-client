import { Suspense } from "react"
import ProfilePanel from "./ProfilePanel"

export default function ProfilePage() {
    return (
        <section className="bg-white py-10 sm:py-14">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
                <header>
                    <h1 className="text-3xl font-normal tracking-tight text-slate-900 sm:text-[40px]">
                        My Profile
                    </h1>
                    <p className="mt-3 text-sm text-slate-500">
                        Manage your account settings and travel preferences
                    </p>
                </header>
                <Suspense fallback={<ProfileSkeleton />}>
                    <ProfilePanel />
                </Suspense>
            </div>
        </section>
    )
}

function ProfileSkeleton() {
    return (
        <div aria-hidden className="mt-8 grid animate-pulse gap-6 lg:grid-cols-[320px_1fr]">
            <div className="border border-slate-200 bg-white p-6">
                <div className="mx-auto size-24 rounded-full bg-slate-100" />
                <div className="mx-auto mt-4 h-5 w-32 bg-slate-100" />
                <div className="mx-auto mt-3 h-4 w-40 bg-slate-100" />
                <div className="mt-6 h-px bg-slate-100" />
                <div className="mt-6 h-11 bg-slate-100" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="border border-slate-200 bg-white p-5">
                        <div className="h-4 w-24 bg-slate-100" />
                        <div className="mt-3 h-7 w-16 bg-slate-100" />
                    </div>
                ))}
            </div>
        </div>
    )
}
