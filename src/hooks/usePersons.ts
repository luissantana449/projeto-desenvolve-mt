import { useQuery } from "@tanstack/react-query";
import { getMissingPersons } from "@/src/lib/services/api";
import type { SearchParams, MissingPerson } from "@/src/lib/types/domain";

export interface UsePersonsParams extends Omit<SearchParams, "page"> {
  page?: number;
}

export interface UsePersonsReturn {
  persons: MissingPerson[];
  totalPages: number;
  totalElements: number;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

export function usePersons(params: UsePersonsParams = {}): UsePersonsReturn {
  const { page = 0, ...otherParams } = params;

  const searchParams: SearchParams = {
    ...otherParams,
    page,
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["persons", searchParams],
    queryFn: () => getMissingPersons(searchParams),
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  // Transformar dados da API para o formato do frontend
  const persons: MissingPerson[] =
    data?.content?.map((person) => ({
      id: person.id.toString(),
      name: person.nome || "Nome não informado",
      age: person.idade || 0,
      gender: person.sexo,
      isAlive: person.vivo,
      photoUrl:
        person.urlFoto ?? "",
      lastSeenDate: person.ultimaOcorrencia?.dtDesaparecimento || "",
      lastSeenLocation:
        person.ultimaOcorrencia?.localDesaparecimentoConcat ||
        "Local não informado",
      disappearanceInfo:
        person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao || null,
      clothing:
        person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
          ?.vestimentasDesaparecido || null,
      occurrenceId: person.ultimaOcorrencia?.ocoId || person.id,
      foundDate: person.ultimaOcorrencia?.dataLocalizacao || null,
      foundAlive: person.ultimaOcorrencia?.encontradoVivo || false,
    })) || [];

  return {
    persons,
    totalPages: data?.totalPages || 0,
    totalElements: data?.totalElements || 0,
    isLoading,
    error,
    refetch,
  };
}
