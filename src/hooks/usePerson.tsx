import { useQuery } from "@tanstack/react-query";
import { getMissingPersonById } from "@/src/lib/services/api";
import { UsePersonReturn } from "../lib/types/ui";

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
    person: data || null,
    isLoading,
    error,
    refetch,
  };
}
