"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { SafeImageProps } from "@/src/lib/types/ui";

export function SafeImage({
  src,
  alt,
  fill = false,
  className,
  containerClassName,
  fallback,
  priority = false,
  sizes,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
  lazy = true,
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Show fallback if no src or error
  if (!src || error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 w-full h-full",
          containerClassName
        )}
      >
        {fallback || <User className="w-16 h-16 text-gray-400" />}
      </div>
    );
  }

  // For Next.js Image with fill
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse z-10">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-cover transition-opacity duration-300",
            loading ? "opacity-0" : "opacity-100",
            className
          )}
          sizes={sizes}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          loading={lazy && !priority ? "lazy" : "eager"}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative", containerClassName)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <User className="w-16 h-16 text-gray-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          loading ? "opacity-0" : "opacity-100",
          className
        )}
        loading={lazy && !priority ? "lazy" : "eager"}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
}
