import { cn } from '@/src/lib/utils'
import { LoadingProps } from '@/src/lib/types/ui'

export function Loading({ text = 'Carregando...', size = 'md', className }: LoadingProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    }

    return (
        <div className={cn('flex items-center justify-center p-4', className)}>
            <div className="flex items-center space-x-2">
                <div className={cn(
                    'animate-spin rounded-full border-2 border-gray-300 border-t-primary',
                    sizeClasses[size]
                )} />
                {text && (
                    <span className="text-gray-600 text-sm">{text}</span>
                )}
            </div>
        </div>
    )
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
    )
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    )
}

export function HomePageLoading() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Hero section skeleton */}
            <div className="text-center space-y-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse mx-auto w-2/3" />
                <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto w-1/2" />
            </div>

            {/* Cards skeleton */}
            <CardGridSkeleton />
        </div>
    )
}