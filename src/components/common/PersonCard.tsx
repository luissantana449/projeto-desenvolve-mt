import Link from 'next/link'
import { Calendar, MapPin, User, Clock } from 'lucide-react'
import { SafeImage } from '@/src/components/ui/SafeImage'
import { MissingPerson } from '@/src/lib/types/domain'
import { PersonCardProps } from '@/src/lib/types/ui'
import { formatDate, getTimeSince, cn } from '@/src/lib/utils'

const getStatusConfig = (person: MissingPerson) => {
    if (person.foundDate) {
        return {
            label: person.foundAlive ? 'Encontrado Vivo' : 'Encontrado Falecido',
            color: person.foundAlive
                ? 'bg-green-50 text-green-900 border-green-200'
                : 'bg-gray-100 text-gray-900 border-gray-300'
        }
    }

    if (!person.isAlive) {
        return {
            label: 'Falecido',
            color: 'bg-gray-100 text-gray-900 border-gray-300'
        }
    }

    return {
        label: 'Desaparecido',
        color: 'bg-red-50 text-red-900 border-red-200'
    }
}

export function PersonCard({ person }: PersonCardProps) {
    const status = getStatusConfig(person)

    return (
        <Link
            href={`/person/${person.id}`}
            className="block group"
        >
            <article className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-200 group-hover:scale-[1.02] overflow-hidden">
                {/* Photo */}
                <div className="relative aspect-[4/5] bg-gray-100">
                    <SafeImage
                        src={person.photoUrl}
                        alt={`Foto de ${person.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        containerClassName="w-full h-full"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEykqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACERMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj9Y5OWcNRpLJxIjj2iFQT7QBdgj3qjEGZO4JDh/Jffs9+y8zLQc/Qp7E7m0Gw+gEKhJNTI/tO8kK3nYkJJ6vxdY5vy8wGmCNHwjjbJAOPLQG//Z"
                        fallback={
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                <User className="w-16 h-16 text-gray-400" />
                            </div>
                        }
                    />

                    {/* Status */}
                    <div className="absolute top-3 right-3">
                        <span className={cn(
                            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm',
                            status.color
                        )}>
                            {status.label}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Nome e Idade */}
                    <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                            {person.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {person.age} anos • {person.gender}
                        </p>
                    </div>

                    {/* Localização */}
                    <div className="flex items-start space-x-1 mb-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 truncate">{person.lastSeenLocation}</span>
                    </div>

                    {/* Data desaparecimento */}
                    <div className="flex items-center space-x-1 mb-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                            Desapareceu em: {formatDate(person.lastSeenDate)}
                        </span>
                    </div>

                    {/* Time since */}
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-600 font-medium">
                            {getTimeSince(person.lastSeenDate)}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    )
}