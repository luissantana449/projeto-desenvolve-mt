import {
  MissingPersonApiPaginatedResponse,
  MissingPersonApiResponse,
} from "../types/api";
import { MissingPerson, SearchParams } from "../types/domain";

const API_BASE_URL = process.env.API_BASE_URL || "https://abitus-api.geia.vip";

export async function getMissingPersons(
  params?: SearchParams
): Promise<MissingPersonApiPaginatedResponse> {
  const url = new URL(`${API_BASE_URL}/v1/pessoas/aberto/filtro`);

  if (params?.query) {
    url.searchParams.append("nome", params.query);
  }
  if (params?.page !== undefined) {
    url.searchParams.append("pagina", params.page.toString());
  }
  if (params?.gender) {
    url.searchParams.append("sexo", params.gender.toUpperCase());
  }
  if (params?.ageMin !== undefined) {
    url.searchParams.append("faixaIdadeInicial", params.ageMin.toString());
  }
  if (params?.ageMax !== undefined) {
    url.searchParams.append("faixaIdadeFinal", params.ageMax.toString());
  }

  url.searchParams.append("porPagina", "12");

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export async function getMissingPersonById(
  id: string
): Promise<MissingPerson | null> {
  const url = `${API_BASE_URL}/v1/pessoas/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return transformApiResponse(data);
}

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
