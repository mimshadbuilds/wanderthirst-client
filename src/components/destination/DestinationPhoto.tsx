"use client"

import { useState } from "react"
import Image from "next/image"
import type { StaticImageData } from "next/image"

import { destinationImages } from "@/lib/destinations"

function randomDestinationImage(exclude?: StaticImageData) {
  const options = exclude
    ? destinationImages.filter((image) => image.src !== exclude.src)
    : destinationImages

  return options[Math.floor(Math.random() * options.length)]
}

export function DestinationPhoto({
  src,
  fallbackSrc,
  alt,
  priority = false,
  sizes,
  className,
}: {
  src?: string
  fallbackSrc?: string
  alt: string
  priority?: boolean
  sizes: string
  className?: string
}) {
  const [failedImage, setFailedImage] = useState<StaticImageData>()

  return (
    <Image
      src={failedImage || src || fallbackSrc || destinationImages[0]}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized
      className={className}
      onError={() => setFailedImage((current) => randomDestinationImage(current))}
    />
  )
}
