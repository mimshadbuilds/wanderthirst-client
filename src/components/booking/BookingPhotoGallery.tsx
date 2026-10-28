import { DestinationPhoto } from "@/components/destination/DestinationPhoto"

export function BookingPhotoGallery({
  photos,
  destinationName,
  fallbackSrc,
}: {
  photos: string[]
  destinationName: string
  fallbackSrc?: string
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:h-[380px] sm:grid-cols-[2fr_1fr] sm:grid-rows-2">
      <PhotoTile
        photo={photos[0]}
        alt={destinationName}
        priority
        fallbackSrc={fallbackSrc}
        className="sm:row-span-2"
      />
      <PhotoTile
        photo={photos[1]}
        alt={`${destinationName} photo 2`}
        fallbackSrc={fallbackSrc}
      />
      <PhotoTile
        photo={photos[2]}
        alt={`${destinationName} photo 3`}
        fallbackSrc={fallbackSrc}
      />
    </div>
  )
}

function PhotoTile({
  photo,
  alt,
  priority = false,
  fallbackSrc,
  className = "",
}: {
  photo?: string
  alt: string
  priority?: boolean
  fallbackSrc?: string
  className?: string
}) {
  return (
    <div
      className={`relative aspect-[2/1] min-h-0 overflow-hidden rounded-xl bg-slate-200 sm:aspect-auto ${className}`}
    >
      <DestinationPhoto
        src={photo}
        fallbackSrc={fallbackSrc}
        alt={alt}
        priority={priority}
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  )
}
