import { ArrowLeft, Phone, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InfoForm } from "@/src/components/forms/InfoForm";
import { getMissingPersonById } from "@/src/lib/services/api";
import { SubmitInfoPageProps } from "@/src/lib/types/ui";

export default async function SubmitTipPage({ params }: SubmitInfoPageProps) {
  const resolvedParams = await params;

  let person;
  try {
    person = await getMissingPersonById(resolvedParams.id);

    if (!person) {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching person:", error);
    notFound();
  }

  const occurrenceId = person.occurrenceId;
  const personName = person.name;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Início
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href={`/person/${resolvedParams.id}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {personName}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600">Enviar Informação</li>
          </ol>
        </nav>

        {/* Botão de voltar */}
        <Link
          href={`/person/${resolvedParams.id}`}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para detalhes
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Enviar Informação sobre {personName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sua informação pode ser fundamental para encontrar {personName}.
            Todas as informações são tratadas com sigilo absoluto.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Informações Importantes
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Todas as informações são confidenciais</li>
                  <li>• Você pode enviar de forma anônima</li>
                  <li>• Qualquer detalhe pode ser relevante</li>
                  <li>• Anexe fotos ou vídeos se tiver</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Emergência?</h3>
                <p className="text-sm text-red-800 mb-2">
                  Se você viu a pessoa recentemente ou tem informações urgentes:
                </p>
                <div className="space-y-1">
                  <a
                    href="tel:190"
                    className="block text-red-600 font-semibold hover:underline"
                  >
                    190 - Polícia Militar
                  </a>
                  <a
                    href="tel:197"
                    className="block text-red-600 font-semibold hover:underline"
                  >
                    197 - Polícia Civil
                  </a>
                  <a
                    href="tel:181"
                    className="block text-red-600 font-semibold hover:underline"
                  >
                    181 - Disque Denúncia
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <InfoForm personId={occurrenceId} personName={personName} />

        {/* Informações adicionais */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">
            O que acontece após o envio?
          </h3>
          <ol className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>1.</strong> Sua informação é recebida de forma segura e
              confidencial
            </li>
            <li>
              <strong>2.</strong> As autoridades competentes analisam a
              informação
            </li>
            <li>
              <strong>3.</strong> Se relevante, a informação é investigada pelas
              forças de segurança
            </li>
            <li>
              <strong>4.</strong> A família é notificada quando houver avanços
              no caso
            </li>
          </ol>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Lembre-se:</strong> Fornecer informações falsas é crime
            previsto no artigo 340 do Código Penal, com pena de reclusão de 1 a
            3 anos e multa.
          </p>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 60;
