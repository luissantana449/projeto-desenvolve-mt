import { cn } from "@/src/lib/utils";
import { LoadingProps } from "@/src/lib/types/ui";

export function Loading({
  text = "Carregando...",
  size = "md",
  className,
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <div className="flex items-center space-x-2">
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
            sizeClasses[size]
          )}
        />
        {text && <span className="text-gray-600 text-sm">{text}</span>}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
      <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
      <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function PersonDetailSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen animate-pulse">
      <div className="container py-8">
        <div className="mb-6">
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Photo skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                <div className="aspect-[3/4] bg-gray-200"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
            {/* Content skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  <div className="h-4 w-56 bg-gray-200 rounded"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-4 w-36 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg border p-6 space-y-3">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="h-12 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          </div>
        ))}
      </div>
    )
  }