import { useQuery } from "@tanstack/react-query";

interface Stats {
  quantPessoasDesaparecidas: number;
  quantPessoasEncontradas: number;
  total: number;
}

export interface UseStatsReturn {
  stats: Stats;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

async function fetchStats(): Promise<Stats> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/pessoas/aberto/estatistico`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const stats = {
      quantPessoasDesaparecidas: data.quantPessoasDesaparecidas || 0,
      quantPessoasEncontradas: data.quantPessoasEncontradas || 0,
      total: 0,
    };

    stats.total =
      stats.quantPessoasDesaparecidas + stats.quantPessoasEncontradas;

    return stats;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return {
      quantPessoasDesaparecidas: 0,
      quantPessoasEncontradas: 0,
      total: 0,
    };
  }
}

export function useStats(): UseStatsReturn {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  return {
    stats: data || {
      quantPessoasDesaparecidas: 0,
      quantPessoasEncontradas: 0,
      total: 0,
    },
    isLoading,
    error,
    refetch,
  };
}
