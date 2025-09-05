import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface SubmitInfoResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

interface UseInfoMutationReturn {
  submitTip: (formData: FormData) => Promise<SubmitInfoResult>;
  isLoading: boolean;
  error: any;
  reset: () => void;
}

export function useInfoMutation(): UseInfoMutationReturn {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData): Promise<SubmitInfoResult> => {
      const response = await fetch("/api/tips", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Erro ao enviar informação");
      }

      return result;
    },
    onSuccess: (data, variables) => {
      // Invalida cache relacionado quando sucesso
      const ocoId = variables.get("ocoId");
      if (ocoId) {
        // Invalida dados da pessoa específica
        queryClient.invalidateQueries({
          queryKey: ["person", ocoId.toString()],
        });
        // Invalida lista de pessoas
        queryClient.invalidateQueries({ queryKey: ["persons"] });
        // Invalida estatísticas
        queryClient.invalidateQueries({ queryKey: ["stats"] });
      }
    },
    onError: (error) => {
      console.error("Error submitting tip:", error);
    },
  });

  return {
    submitTip: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
