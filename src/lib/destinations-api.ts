import {
  demoDestinations,
  destinationImages,
  type DestinationCategory,
  type IDestination,
} from "@/lib/destinations"

const DESTINATIONS_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/destinations`

interface ApiDestination {
  _id: string
  destinationName: string
  country: string
  category?: string
  price: number | string
  duration: string
  rating?: number
  imageUrl?: string
}

/**
 * Prefers the live image supplied by the API. The bundled image is used as the
 * card fallback when the API record has no usable image URL.
 */
function getImageSource(
  imageUrl: string | undefined,
  index: number
): IDestination["image"] {
  if (imageUrl) {
    try {
      const { protocol } = new URL(imageUrl)
      if (protocol === "http:" || protocol === "https:") return imageUrl
    } catch {
      // Malformed URLs are ignored and handled by the fallback below.
    }
  }

  return destinationImages[index % destinationImages.length]
}

/**
 * Loads the destination collection from the API. Bundled demo packages are
 * only used when the API is unreachable or returns no destinations.
 */
export async function getDestinations(): Promise<IDestination[]> {
  try {
    const res = await fetch(DESTINATIONS_ENDPOINT, { cache: "no-store" })

    if (!res.ok) return demoDestinations

    const data: ApiDestination[] = await res.json()

    if (!Array.isArray(data) || data.length === 0) return demoDestinations

    return data.map((item, index) => ({
      id: item._id,
      name: item.destinationName,
      country: item.country,
      category: (item.category as DestinationCategory | undefined) ?? "Adventure",
      price: Number(item.price),
      duration: item.duration,
      rating: item.rating ?? 4.5,
      image: getImageSource(item.imageUrl, index),
      fallbackImage: destinationImages[index % destinationImages.length],
    }))
  } catch {
    return demoDestinations
  }
}

const FEATURED_DESTINATIONS_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`

function pickImage(imageUrl: string | undefined, index: number): IDestination["image"] {
    if (imageUrl?.startsWith("http://") || imageUrl?.startsWith("https://")) {
        return imageUrl
    }

    return destinationImages[index % destinationImages.length]
}

export async function getFeaturedDestinations(): Promise<IDestination[]> {
    try {
        const res = await fetch(FEATURED_DESTINATIONS_ENDPOINT, {
            cache: "no-store",
        })

        if (!res.ok) return demoDestinations

        const data: ApiDestination[] = await res.json()

        if (!Array.isArray(data) || data.length === 0) return demoDestinations

        return data.map((item, index) => ({
            id: item._id,
            name: item.destinationName,
            country: item.country,
            category: (item.category as IDestination["category"] | undefined) ?? "Adventure",
            price: Number(item.price),
            duration: item.duration,
            rating: item.rating ?? 4.5,
            image: pickImage(item.imageUrl, index),
            fallbackImage: destinationImages[index % destinationImages.length],
        }))
    } catch {
        return demoDestinations
    }
}
