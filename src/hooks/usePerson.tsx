import { useQuery } from "@tanstack/react-query";
import { getMissingPersonById } from "@/src/lib/services/api";
import type { MissingPerson } from "@/src/lib/types/domain";
import { MissingPersonApiResponse } from "../lib/types/api";
import { UsePersonReturn } from "../lib/types/ui";

function transformApiResponse(
  apiData: MissingPersonApiResponse
): MissingPerson {
  const occurrence = apiData.ultimaOcorrencia;

  return {
    id: apiData.id.toString(),
    name: apiData.nome || "Nome não informado",
    age: apiData.idade || 0,
    gender: apiData.sexo,
    isAlive: apiData.vivo,
    photoUrl: apiData.urlFoto ?? "",
    lastSeenDate: occurrence?.dtDesaparecimento || "",
    lastSeenLocation:
      occurrence?.localDesaparecimentoConcat || "Local não informado",
    disappearanceInfo: occurrence?.ocorrenciaEntrevDesapDTO?.informacao || null,
    clothing:
      occurrence?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || null,
    occurrenceId: occurrence?.ocoId || apiData.id,
    foundDate: occurrence?.dataLocalizacao || null,
    foundAlive: occurrence?.encontradoVivo || false,
  };
}

export function usePerson(id: string): UsePersonReturn {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["person", id],
    queryFn: () => getMissingPersonById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("404")) {
        return false;
      }
      return failureCount < 2;
    },
  });

  return {
    person: data ? transformApiResponse(data) : null,
    isLoading,
    error,
    refetch,
  };
}
