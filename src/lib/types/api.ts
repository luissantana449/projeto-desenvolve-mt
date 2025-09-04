export type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export interface MissingPersonApiPaginatedResponse {
  content: MissingPersonApiResponse[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { sorted: boolean; empty: boolean; unsorted: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: { sorted: boolean; empty: boolean; unsorted: boolean };
  empty: boolean;
}

export interface MissingPersonApiResponse {
  id: number;
  nome: string;
  idade: number;
  sexo: "MASCULINO" | "FEMININO";
  vivo: boolean;
  urlFoto: string | null;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    dataLocalizacao: string | null;
    encontradoVivo: boolean;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevDesapDTO: {
      informacao: string | null;
      vestimentasDesaparecido: string | null;
    } | null;
    listaCartaz: any[] | null;
    ocoId: number;
  } | null;
}