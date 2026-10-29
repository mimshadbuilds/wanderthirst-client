'use client'
import { toast } from '../ui/toast';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { Trash2 } from 'lucide-react';
import { IBooking } from './MyBookingsCard';

const BookingDeleteDialog = ({ booking }: {booking : IBooking}) => {
    const router = useRouter()
    const handleBookingDelete = async() => {
    try {
        const res = await fetch(`http://localhost:5000/my-bookings/${booking._id}`, {
            method: "DELETE",
        })

        if (!res.ok) throw new Error(`Request failed (${res.status})`)

        toast.add({ type: "success", title: "Booking cancelled." })
        router.push('/my-bookings')
        router.refresh()
    } catch {
        toast.add({ type: "error", title: "Failed to cancel booking." })
    }  
}
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger render={
                    <Button variant="destructive" className="inline-flex h-9 border border-input">
                        <Trash2 className="size-4" /> Cancel
                    </Button>}>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {booking.destinationName}
                        from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleBookingDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>       
        </>
    );
};

export default BookingDeleteDialog;