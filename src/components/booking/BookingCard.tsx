'use client'
import { Destination } from "@/app/destinations/[id]/page";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client";
import { Separator } from "@base-ui/react";
import { ArrowRight, CalendarDays, Check, Clock } from "lucide-react";
import type { FormEvent } from "react";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

const BookingCard = ({ destination }: { destination : Destination }) => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const duration = destination.duration ?? "7 Days / 6 Nights"
    const price = typeof destination.price === "number" ? destination.price.toLocaleString("en-US") : destination.price ?? "1,299"

    const handleBooking = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPending) return

        if (!user?.email) {
            toast.add({
                type: "error",
                title: "Please sign in before booking.",
            })
            router.push("/login")
            return
        }

        const formData = new FormData(e.currentTarget);
        const departureDate = formData.get("departureDate");
        const { _id: destinationId, ...destinationData } = destination

        const data = {
            username: user?.name,
            email: user?.email,
            image: user?.image,
            ...destinationData,
            destinationId,
            departureDate: departureDate,
            bookingDate: new Date(),
        }

        try {
            const res = await fetch(`http://localhost:5000/bookings`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error(`Booking request failed (${res.status})`)
            }

            toast.add({
                type: 'success',
                title: 'Destination successfully booked!'
            })
            router.push('/destinations')
        } catch {
            toast.add({
                type: 'error',
                title: 'Could not complete booking. Please try again.',
            })
        }
    }

    return (
        <aside className="lg:sticky lg:top-6">
            <Card className="shadow-md">
                <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-cyan-600">
                    ${price}
                    </span>
                    <span className="text-sm text-muted-foreground">per person</span>
                </div>
                <Separator className="my-5" />
                
            <form onSubmit={handleBooking}>
                <label htmlFor="travel-date" className="sr-only">
                    Travel date
                </label>
                <div className="mb-4 flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2.5">
                    <CalendarDays className="size-4 shrink-0 text-muted-foreground" />
                <input
                    id="travel-date"
                    name="departureDate"
                    aria-label="Departur-Date"
                    type="date"
                    defaultValue={destination.departureDate}
                    className="w-full min-w-0 bg-transparent text-sm outline-none"
                />
                </div>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-cyan-600 text-white hover:bg-cyan-700"
                    >
                        {isPending ? "Checking account..." : user?.email ? "Book Now" : "Sign in to book"}
                        <ArrowRight className="size-4" />
                    </Button>
            </form>
                <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                    {[
                    "Free cancellation up to 7 days",
                    "Travel insurance included",
                    "24/7 customer support",
                    ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                        <Check className="size-4 shrink-0 text-green-600" />
                        <span>{item}</span>
                    </div>
                    ))}
                </div>
                <Separator className="my-4" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    {duration} package
                </div>
                <Badge variant="secondary" className="mt-4">
                    Best travel experience
                </Badge>
                </CardContent>
            </Card>
        </aside>
    );
};

export default BookingCard;
