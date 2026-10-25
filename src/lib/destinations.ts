import type { StaticImageData } from "next/image"

import beachAerial from "@/assets/destinations/image2.png"
import desertLake from "@/assets/destinations/image1.png"
import machuPicchu from "@/assets/destinations/image3.png"
import maldives from "@/assets/destinations/image5.png"
import mountainSwing from "@/assets/destinations/image4.png"
import planeWing from "@/assets/destinations/image6.png"

export type DestinationCategory =
  | "Beach"
  | "Mountain"
  | "City"
  | "Adventure"
  | "Cultural"
  | "Cruise"

export interface IDestination {
  id: string
  name: string
  country: string
  category: DestinationCategory
  price: number
  duration: string
  rating: number
  /** Remote API image when available, local bundled image otherwise. */
  image: StaticImageData | string
  /** Local image used only if the live image fails to load. */
  fallbackImage?: StaticImageData
}

/**
 * Local imagery used for the destination cards. The order is reused as a
 * fallback for destinations coming from the API that have no image of their own.
 */
export const destinationImages = [
  planeWing,
  maldives,
  mountainSwing,
  machuPicchu,
  beachAerial,
  desertLake,
]

export const demoDestinations: IDestination[] = [
  {
    id: "bali-paradise",
    name: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: 2700,
    duration: "7 Days / 6 Nights",
    rating: 4.5,
    image: planeWing,
  },
  {
    id: "maldives-overwater-escape",
    name: "Maldives Overwater Escape",
    country: "Maldives",
    category: "Beach",
    price: 3400,
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    image: maldives,
  },
  {
    id: "swiss-alps-adventure",
    name: "Swiss Alps Adventure",
    country: "Switzerland",
    category: "Mountain",
    price: 2950,
    duration: "8 Days / 7 Nights",
    rating: 4.7,
    image: mountainSwing,
  },
  {
    id: "machu-picchu-trek",
    name: "Machu Picchu Trek",
    country: "Peru",
    category: "Adventure",
    price: 1850,
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    image: machuPicchu,
  },
  {
    id: "phuket-island-escape",
    name: "Phuket Island Escape",
    country: "Thailand",
    category: "Beach",
    price: 1600,
    duration: "6 Days / 5 Nights",
    rating: 4.6,
    image: beachAerial,
  },
  {
    id: "sonoran-desert-escape",
    name: "Sonoran Desert Escape",
    country: "United States",
    category: "Adventure",
    price: 1250,
    duration: "4 Days / 3 Nights",
    rating: 4.4,
    image: desertLake,
  },
]
