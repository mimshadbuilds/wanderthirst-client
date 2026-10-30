"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/toast";
import { useState, type FormEvent } from "react";
import { Destination } from "@/app/destinations/[id]/page";
import { useRouter } from "next/navigation";
import { getClientToken } from "@/lib/client-token";

const categories = [
    "Beach",
    "Mountain",
    "City",
    "Adventure",
    "Cultural",
    "Cruise",
];

const inputClass =
    "h-11 rounded-md border-slate-200 bg-slate-50 px-3 text-base shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand/30";
const labelClass = "text-sm font-semibold text-slate-800";

const DestinationEditDialog = ({ destination }: { destination: Destination }) => {
    const [category, setCategory] = useState(destination.category);
    const router = useRouter();
    const [open, setOpen] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const token = await getClientToken()
            if (!token) {
            toast.add({ title: "Your session has expired. Please sign in again." })
            router.push("/signin")
            return;
        }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/${destination._id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

        if(res.ok) {
            toast.add({ title: "Package successfully updated." });
            setOpen(false);
            router.refresh();
        }else {
            toast.add({ title: "Failed to update package." });
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium text-black shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                    <Pencil className="size-3" />
                    Edit
            </DialogTrigger>
            <DialogContent className="w-[calc(100%-2rem)] min-w-xl max-h-[90dvh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className={'text-2xl font-semibold mb-0 p-0'}>Update Travel Package</DialogTitle>
                    <DialogDescription className='text-xs p-0 font-normal'>Update the travel package details below</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} onReset={() => setCategory(destination.category)} className="space-y-4">
                    <FieldGroup className="gap-4">
                        <Field className="gap-2">
                            <FieldLabel htmlFor="destination-name" className={labelClass}>Destination Name</FieldLabel>
                            <Input id="destination-name" name="destinationName" 
                            defaultValue={destination.destinationName} placeholder="Bali Paradise" className={inputClass} />
                        </Field>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field className="min-w-0 gap-2">
                                <FieldLabel htmlFor="country" className={labelClass}>Country</FieldLabel>
                                <Input id="country" name="country" 
                                    defaultValue={destination.country} placeholder="Indonesia" className={inputClass} />
                            </Field>
                            <Field className="min-w-0 gap-2">
                                <FieldLabel htmlFor="category" className={labelClass}>Category</FieldLabel>
                                <Select name="category"  value={category} onValueChange={(value) => {
                                    if (value !== null) setCategory(value);
                                }}>
                                    <SelectTrigger id="category" className={inputClass}>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((item) => (
                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Field className="min-w-0 gap-2">
                                <FieldLabel htmlFor="price" className={labelClass}>Price ($)</FieldLabel>
                                <Input id="price" name="price" 
                                defaultValue={destination.price} type="number" min="0" step="0.01" placeholder="e.g., 1299" className={inputClass} />
                            </Field>
                            <Field className="min-w-0 gap-2">
                                <FieldLabel htmlFor="duration" className={labelClass}>Duration</FieldLabel>
                                <Input id="duration" name="duration"
                                    defaultValue={destination.duration} placeholder="e.g., 7 Days/6 Nights" className={inputClass} />
                            </Field>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field className="min-w-0 gap-2">
                            <FieldLabel htmlFor="departure-date" className={labelClass}>Departure Date</FieldLabel>
                            <Input id="departure-date" name="departureDate" 
                                defaultValue={destination.departureDate?.slice(0, 10)} type="date" className={inputClass} />
                        </Field>
                        <Field className="min-w-0 gap-2">
                            <FieldLabel htmlFor="image-url" className={labelClass}>Image URL</FieldLabel>
                            <Input id="image-url" name="imageUrl" 
                            defaultValue={destination.imageUrl} type="url" placeholder="https://example.com/image.jpg" className={inputClass} />
                        </Field>
                        </div>
                        <Field className="gap-2">
                            <FieldLabel htmlFor="description" className={labelClass}>Description</FieldLabel>
                            <Textarea id="description" name="description" 
                            defaultValue={destination.description} placeholder="Describe the travel experience..." className="min-h-24 resize-y rounded-md border-slate-200 bg-slate-50 px-3 py-2.5 text-base shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand/30" />
                        </Field>
                    </FieldGroup>
                    <div className="flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end">
                        <Button type="reset" variant="outline" className="h-11 rounded-md border-destructive/30 px-5 text-sm text-destructive hover:bg-destructive/5 hover:text-destructive">
                            <Trash2 className="size-4" />
                            Cancel
                        </Button>
                        <Button type="submit" className="h-11 rounded-md bg-brand px-5 text-sm text-white hover:bg-brand-dark">
                            <Save className="size-4" />
                            Update Travel Package
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DestinationEditDialog;
