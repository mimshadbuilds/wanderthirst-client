"use client"

import { useState, type FormEvent } from "react"
import { Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { redirect } from "next/navigation"
import { destinationImages } from "@/lib/destinations"


const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural", "Cruise"]
const photoOptions = [
    { label: "Beach and ocean", image: destinationImages[4] },
    { label: "Desert lake", image: destinationImages[5] },
    { label: "Mountain adventure", image: destinationImages[2] },
    { label: "Machu Picchu", image: destinationImages[3] },
    { label: "Tropical island", image: destinationImages[1] },
    { label: "Airplane view", image: destinationImages[0] },
]

const inputClass =
    "h-11 rounded-md border-slate-200 bg-slate-50 px-3 text-base shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand/30"

const labelClass = "text-sm font-semibold text-slate-800"

export default function AddDestinationPage() {
    const [category, setCategory] = useState("Beach")

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const amenities = String(formData.get("amenities") ?? "")
            .split(",")
            .map((amenity) => amenity.trim())
            .filter(Boolean)
        const galleryImages = ["galleryImage1", "galleryImage2"]
            .map((field) => {
                const selectedImage = String(formData.get(field) ?? "")
                if (selectedImage) return selectedImage

                const fallbackIndex = Math.floor(Math.random() * destinationImages.length)
                return destinationImages[fallbackIndex].src
            })
        const fallbackImageUrl =
            destinationImages[Math.floor(Math.random() * destinationImages.length)].src
        formData.delete("galleryImage1")
        formData.delete("galleryImage2")
        const data = {
            ...Object.fromEntries(formData.entries()),
            fallbackImageUrl,
            galleryImages,
            amenities,
        }

        const res = await fetch('http://localhost:5000/add-destination', {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const result = await res.json();
        console.log(result);
        toast.add({title: `Package successfully added.`})
        if(res.ok){
            redirect('/destinations')
        }
    }

    return (
        <section className="min-h-[calc(100vh-60px)] bg-[#f7f8f9] px-4 py-10 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-2xl font-semibold text-center tracking-tight text-slate-900 sm:text-3xl">
                    Add New Travel Package
                </h1>
                <Card className="mx-auto mt-8 w-full max-w-2xl rounded-xl border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-5 sm:p-8">
                        <form onSubmit={handleSubmit}
                            onReset={() => setCategory("Beach")}>
                            <FieldGroup className="gap-5">
                                <Field className="gap-2">
                                    <FieldLabel htmlFor="destination-name" className={labelClass}>
                                        Destination Name
                                    </FieldLabel>
                                    <Input
                                        id="destination-name"
                                        name="destinationName"
                                        placeholder="Bali Paradise"
                                        className={inputClass}
                                    />
                                </Field>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="country" className={labelClass}>
                                            Country
                                        </FieldLabel>
                                        <Input
                                            id="country"
                                            name="country"
                                            placeholder="Indonesia"
                                            className={inputClass}
                                        />
                                    </Field>
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="category" className={labelClass}>
                                            Category
                                        </FieldLabel>
                                        <Select
                                            name="category"
                                            value={category}
                                            onValueChange={(value) => { 
                                                if(value !== null ) setCategory(value)
                                                }}>
                                            <SelectTrigger id="category" className={inputClass}>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((item) => (
                                                    <SelectItem key={item} value={item}>
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="price" className={labelClass}>
                                            Price (USD)
                                        </FieldLabel>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="e.g., 1299"
                                            className={inputClass}
                                        />
                                    </Field>

                                    <Field className="gap-2">
                                        <FieldLabel htmlFor="duration" className={labelClass}>
                                            Duration
                                        </FieldLabel>
                                        <Input
                                            id="duration"
                                            name="duration"
                                            placeholder="e.g., 7 Days/6 Nights"
                                            className={inputClass}
                                        />
                                    </Field>
                                </div>

                                <Field className="gap-2">
                                    <FieldLabel htmlFor="departure-date" className={labelClass}>
                                        Departure Date
                                    </FieldLabel>
                                    <Input
                                        id="departure-date"
                                        name="departureDate"
                                        type="date"
                                        className={inputClass}
                                    />
                                </Field>

                                <Field className="gap-2">
                                    <FieldLabel htmlFor="image-url" className={labelClass}>
                                        Image URL (optional)
                                    </FieldLabel>
                                    <Input
                                        id="image-url"
                                        name="imageUrl"
                                        type="url"
                                        placeholder="https://example.com/image.jpg"
                                        className={inputClass}
                                    />
                                    <p className="text-xs text-slate-500">
                                        If empty or unavailable, a random bundled photo is shown automatically.
                                    </p>
                                </Field>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    {[1, 2].map((slot) => (
                                        <Field key={slot} className="gap-2">
                                            <FieldLabel
                                                htmlFor={`gallery-image-${slot}`}
                                                className={labelClass}
                                            >
                                                Booking Detail Photo {slot} (optional)
                                            </FieldLabel>
                                            <select
                                                id={`gallery-image-${slot}`}
                                                name={`galleryImage${slot}`}
                                                defaultValue=""
                                                className={`${inputClass} w-full`}
                                            >
                                                <option value="">Leave photo slot empty</option>
                                                {photoOptions.map(({ label, image }) => (
                                                    <option key={image.src} value={image.src}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>
                                    ))}
                                </div>
                                <p className="-mt-3 text-xs text-slate-500">
                                    These two optional photos fill the extra gallery spaces on the booking details page.
                                </p>

                                <Field className="gap-2">
                                    <FieldLabel htmlFor="description" className={labelClass}>
                                        Description
                                    </FieldLabel>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Describe the travel experience..."
                                        className="min-h-32 resize-y rounded-md border-slate-200 bg-slate-50 px-3 py-2.5 text-base shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand/30"
                                    />
                                </Field>
                                <Field className="gap-2">
                                    <FieldLabel htmlFor="amenities" className={labelClass}>
                                        Amenities (optional)
                                    </FieldLabel>
                                    <Textarea
                                        id="amenities"
                                        name="amenities"
                                        placeholder="Private beach, infinity pool, restaurant"
                                        className="min-h-24 resize-y rounded-md border-slate-200 bg-slate-50 px-3 py-2.5 text-base shadow-none placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand/30"
                                    />
                                    <p className="text-xs text-slate-500">
                                        Separate each amenity with a comma.
                                    </p>
                                </Field>
                            </FieldGroup>

                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <Button
                                    type="reset"
                                    variant="outline"
                                    className="h-11 rounded-md border-destructive/30 px-5 text-sm text-destructive hover:bg-destructive/5 hover:text-destructive">
                                    <Trash2 className="size-4" />
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="h-11 rounded-md bg-brand px-5 text-sm text-white hover:bg-brand-dark">
                                    <Save className="size-4" />
                                    Add Travel Package
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}