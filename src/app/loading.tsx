const HomeLoading = () => {
    return (
        <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <section className="mb-12">
                <div className="animate-pulse rounded-3xl bg-slate-200 p-8 sm:p-12 lg:p-16">
                    <div className="max-w-2xl space-y-5">
                        <div className="h-4 w-32 rounded-full bg-slate-300" />

                        <div className="h-10 w-full max-w-xl rounded-lg bg-slate-300 sm:h-12" />

                        <div className="h-5 w-full max-w-lg rounded bg-slate-300" />

                        <div className="h-5 w-3/4 max-w-md rounded bg-slate-300" />

                        <div className="mt-6 h-12 w-40 rounded-xl bg-slate-300" />
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <div className="mb-6 animate-pulse space-y-3">
                    <div className="h-8 w-64 rounded-lg bg-slate-200" />
                    <div className="h-4 w-80 max-w-full rounded bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                        >
                            <div className="aspect-[4/3] animate-pulse bg-slate-200" />

                            <div className="animate-pulse space-y-4 p-5">
                                <div className="h-6 w-3/4 rounded bg-slate-200" />

                                <div className="space-y-2">
                                    <div className="h-4 w-full rounded bg-slate-100" />
                                    <div className="h-4 w-5/6 rounded bg-slate-100" />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="h-5 w-24 rounded bg-slate-200" />
                                    <div className="h-9 w-28 rounded-xl bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-5 h-6 w-48 rounded bg-slate-200" />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <div className="h-4 w-24 rounded bg-slate-200" />
                                <div className="h-12 rounded-xl bg-slate-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="animate-pulse space-y-3">
                        <div className="h-8 w-56 rounded-lg bg-slate-200" />
                        <div className="h-4 w-72 max-w-full rounded bg-slate-100" />
                    </div>

                    <div className="hidden h-10 w-32 animate-pulse rounded-xl bg-slate-200 sm:block" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="aspect-[4/3] animate-pulse bg-slate-200" />

                            <div className="animate-pulse space-y-4 p-5">
                                <div className="h-6 w-3/4 rounded bg-slate-200" />

                                <div className="space-y-2">
                                    <div className="h-4 w-full rounded bg-slate-100" />
                                    <div className="h-4 w-5/6 rounded bg-slate-100" />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="h-5 w-24 rounded bg-slate-200" />
                                    <div className="h-9 w-28 rounded-xl bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default HomeLoading;