import Link from "next/link";
import { Calendar, MapPin, User, Clock } from "lucide-react";
import { SafeImage } from "@/src/components/ui/SafeImage";
import { MissingPerson } from "@/src/lib/types/domain";
import { formatDate, getTimeSince, cn } from "@/src/lib/utils";
import { PersonListItemProps } from "@/src/lib/types/ui";

const getStatusConfig = (person: MissingPerson) => {
  if (person.foundDate) {
    return {
      label: person.foundAlive ? "Encontrado Vivo" : "Encontrado Falecido",
      color: person.foundAlive
        ? "bg-green-50 text-green-900 border-green-200"
        : "bg-gray-100 text-gray-900 border-gray-300",
    };
  }

  if (!person.isAlive) {
    return {
      label: "Falecido",
      color: "bg-gray-100 text-gray-900 border-gray-300",
    };
  }

  return {
    label: "Desaparecido",
    color: "bg-red-50 text-red-900 border-red-200",
  };
};

export function PersonListItem({ person }: PersonListItemProps) {
  const status = getStatusConfig(person);

  return (
    <Link href={`/person/${person.id}`} className="block group">
      <article className="bg-white rounded-lg shadow-sm border border-l-primary/20 hover:shadow-lg transition-all duration-200 group-hover:scale-[1.005] overflow-hidden">
        <div className="flex p-4 border-l-4">
          {/* Foto */}
          <div className="relative w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <SafeImage
              src={person.photoUrl}
              alt={`Foto de ${person.name}`}
              fill
              className="object-cover"
              sizes="80px"
              containerClassName="w-full h-full"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEykqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACERMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj9Y5OWcNRpLJxIjj2iFQT7QBdgj3qjEGZO4JDh/Jffs9+y8zLQc/Qp7E7m0Gw+gEKhJNTI/tO8kK3nYkJJ6vxdY5vy8wGmCNHwjjbJAOPLQG//Z"
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              }
            />
          </div>

          {/* Content */}
          <div className="flex-1 ml-4 min-w-0">
            <div className="flex items-start justify-between">
              {/* Nome e dados básicos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                    {person.name}
                  </h3>

                  {/* Status */}
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ml-2 flex-shrink-0",
                      status.color
                    )}
                  >
                    {status.label}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {person.age} anos • {person.gender}
                </p>

                {/* Informações */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3 text-sm text-gray-600">
                  {/* Localização */}
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="truncate">{person.lastSeenLocation}</span>
                  </div>

                  {/* Data desaparecimento */}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">
                      Desapareceu: {formatDate(person.lastSeenDate)}
                    </span>
                  </div>

                  {/* Último visto */}
                  <div className="flex items-center space-x-2 md:col-span-1">
                    <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="text-red-600 font-medium truncate">
                      {getTimeSince(person.lastSeenDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
