"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Phone,
  AlertTriangle,
  Clock,
  MessageCircle,
} from "lucide-react";
import { SafeImage } from "@/src/components/ui/SafeImage";
import { WhatsAppButton } from "@/src/components/ui/WhatsAppButton";
import { formatDate, getTimeSince, cn } from "@/src/lib/utils";
import { usePerson } from "@/src/hooks/usePerson";
import type { MissingPerson } from "@/src/lib/types/domain";
import { PersonDetailProps } from "@/src/lib/types/ui";
import { PersonDetailSkeleton } from "./Loading";
import { ErrorState } from "./ErrorState";

const getStatusConfig = (person: MissingPerson) => {
  if (person.foundDate) {
    return {
      label: person.foundAlive ? "Encontrado Vivo" : "Encontrado Falecido",
      color: person.foundAlive
        ? "bg-green-100 text-green-800 border-green-200"
        : "bg-gray-100 text-gray-800 border-gray-200",
      bgColor: person.foundAlive ? "bg-green-50" : "bg-gray-50",
      textColor: person.foundAlive ? "text-green-800" : "text-gray-800",
    };
  }

  if (!person.isAlive) {
    return {
      label: "Falecido",
      color: "bg-gray-100 text-gray-800 border-gray-200",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
    };
  }

  return {
    label: "Desaparecido",
    color: "bg-red-100 text-red-800 border-red-200",
    bgColor: "bg-red-50",
    textColor: "text-red-800",
  };
};

export function PersonDetail({ id }: PersonDetailProps) {
  const { person, isLoading, error } = usePerson(id);

  if (isLoading) {
    return <PersonDetailSkeleton />;
  }

  if (error || !person) {
    return <ErrorState />;
  }

  const status = getStatusConfig(person);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container py-8">
        {/* Voltar */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1"
            aria-label="Voltar para a página inicial"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Photo */}
            <div className="lg:col-span-1">
              {/* Main photo */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                <div className="relative aspect-[3/4] bg-gray-100">
                  <SafeImage
                    src={person.photoUrl}
                    alt={`Foto de ${person.name}`}
                    className="object-cover w-full h-full"
                    priority
                  />

                  {/* Status overlay */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm",
                        status.color
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão do WhatsApp */}
              <div className="mt-4">
                <WhatsAppButton
                  personId={person.id}
                  personName={person.name}
                  personAge={person.age}
                />
              </div>
            </div>

            {/* Detalhes */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-sm p-6 mb-6">
                {/* Header */}
                <header className="border-b border-gray-200 pb-6 mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {person.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>
                        {person.gender}, {person.age} anos
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Desapareceu em {formatDate(person.lastSeenDate)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-red-600 font-medium">
                        {getTimeSince(person.lastSeenDate)}
                      </span>
                    </div>
                  </div>
                </header>

                {/* Informações Básicas */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      Informações do Caso
                    </h2>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Código da Ocorrência
                        </dt>
                        <dd className="text-sm text-gray-900 font-mono">
                          {person.occurrenceId}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Status
                        </dt>
                        <dd className="text-sm">
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                              status.color
                            )}
                          >
                            {status.label}
                          </span>
                        </dd>
                      </div>
                      {person.foundDate && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Data de Localização
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {formatDate(person.foundDate)}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      Local do Desaparecimento
                    </h2>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-900">
                        {person.lastSeenLocation}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Informações Adicionais */}
                {(person.disappearanceInfo || person.clothing) && (
                  <section className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      Informações Adicionais
                    </h2>
                    <div className="space-y-4">
                      {person.disappearanceInfo && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Informações sobre o Desaparecimento
                          </h3>
                          <p className="text-sm text-gray-900 leading-relaxed">
                            {person.disappearanceInfo}
                          </p>
                        </div>
                      )}

                      {person.clothing && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Vestimentas no Momento do Desaparecimento
                          </h3>
                          <p className="text-sm text-gray-900">
                            {person.clothing}
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </article>

              {/* Contato */}
              <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  <Phone className="w-5 h-5 inline mr-2" />
                  Informações de Contato
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        Polícia Civil - MT
                      </dt>
                      <dd>
                        <a
                          href="tel:197"
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
                        >
                          <Phone className="w-4 h-4" />
                          <span>197</span>
                        </a>
                      </dd>
                    </div>

                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        Polícia Militar - MT
                      </dt>
                      <dd>
                        <a
                          href="tel:190"
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
                        >
                          <Phone className="w-4 h-4" />
                          <span>190</span>
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-1">
                        Disque Denúncia
                      </dt>
                      <dd>
                        <a
                          href="tel:181"
                          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
                        >
                          <Phone className="w-4 h-4" />
                          <span>181</span>
                        </a>
                      </dd>
                    </div>
                  </div>
                </div>
              </section>

              {/* Ações */}
              <section className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/person/${person.id}/submit-info`}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar Informação</span>
                  </Link>

                  <a
                    href="tel:181"
                    className="btn-secondary flex items-center justify-center space-x-2 flex-1 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Ligar para Disque Denúncia</span>
                  </a>
                </div>
              </section>

              {/* Aviso Importante */}
              <aside className={cn("rounded-lg p-4 mt-6", status.bgColor)}>
                <div className="flex items-start space-x-3">
                  <AlertTriangle
                    className={cn("w-5 h-5 mt-0.5", status.textColor)}
                  />
                  <div>
                    <h3 className={cn("font-medium mb-1", status.textColor)}>
                      Informação Importante
                    </h3>
                    <p className={cn("text-sm", status.textColor)}>
                      Se você tem informações sobre esta pessoa, entre em
                      contato imediatamente com as autoridades. Não tente
                      abordar a pessoa sozinho. Qualquer informação, por menor
                      que seja, pode ser valiosa.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
