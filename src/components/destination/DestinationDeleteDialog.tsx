'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { Destination } from "@/app/destinations/[id]/page";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { getClientToken } from "@/lib/client-token";

const DestinationDeleteDialog = ({ destination }: { destination: Destination }) => {
    const router = useRouter();
    const handleDeleteDialog = async () => {

        const token = await getClientToken()
            if (!token) {
            toast.add({ title: "Your session has expired. Please sign in again." })
            router.push("/sign-in")
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/destinations/${destination._id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (res.ok) {
                toast.add({ 
                    type: "success", 
                    title: "Package successfully Deleted." 
                });
                router.push("/destinations");
                router.refresh();
                return;
            }
            
        } catch {
            toast.add({ 
                type: "error", 
                title: "Failed to delete package." });
    }
}

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger render={
                    <Button variant="destructive" className="inline-flex h-9 border border-input">
                        <Trash2 className="size-4" /> Delete
                    </Button>}>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {destination.destinationName}
                        from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteDialog}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>       
        </>
    );
};

export default DestinationDeleteDialog;
