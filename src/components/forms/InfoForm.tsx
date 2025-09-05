"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, AlertCircle, CheckCircle, Send } from "lucide-react";
import {
  useInfoMutation,
  type SubmitInfoResult,
} from "@/src/hooks/useInfoMutation";
import { cn } from "@/src/lib/utils";

interface InfoFormProps {
  personId: number;
  personName?: string;
  className?: string;
}

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full sm:w-auto px-6 py-3 text-white font-medium rounded-lg transition-all",
          "flex items-center justify-center gap-2",
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
        )}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar Informação
          </>
        )}
      </button>
    </>
  );
}

export function InfoForm({ personId, personName, className }: InfoFormProps) {
  const {
    submitTip: submitInfoMutation,
    isLoading,
    error,
    reset,
  } = useInfoMutation();
  const [submissionResult, setSubmissionResult] =
    useState<SubmitInfoResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const result = await submitInfoMutation(formData);
      setSubmissionResult(result);

      if (result.success) {
        formRef.current?.reset();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (err) {
      setSubmissionResult({
        success: false,
        message: "Erro ao enviar informação. Tente novamente.",
        error: err instanceof Error ? err.message : "Erro desconhecido",
      });
    }
  };

  // Reset state when component unmounts or resets
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-6", className)}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {personName
          ? `Enviar Informação sobre ${personName}`
          : "Enviar Informação"}
      </h2>

      {/* Status Messages */}
      {submissionResult?.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-green-800 font-medium">
              {submissionResult.message}
            </p>
            <p className="text-green-600 text-sm mt-1">
              Sua informação será analisada pelas autoridades competentes.
            </p>
          </div>
        </div>
      )}

      {(submissionResult && !submissionResult.success) ||
        (error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">
                {submissionResult?.message || "Erro ao enviar informação"}
              </p>
              {(submissionResult?.error || error) && (
                <p className="text-red-600 text-sm mt-1">
                  {submissionResult?.error || error?.message}
                </p>
              )}
            </div>
          </div>
        ))}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden field for person ID - always required */}
        <input type="hidden" name="ocoId" value={personId} />

        {/* Information */}
        <div>
          <label
            htmlFor="informacao"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Informação *
          </label>
          <textarea
            id="informacao"
            name="informacao"
            required
            minLength={10}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Descreva a informação que você possui sobre esta pessoa..."
          />
          <p className="mt-1 text-xs text-gray-500">Mínimo de 10 caracteres</p>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="data"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Data da Informação *
          </label>
          <input
            type="date"
            id="data"
            name="data"
            required
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">
            Quando você obteve esta informação?
          </p>
        </div>

        {/* Files */}
        <div>
          <label
            htmlFor="files"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Arquivos (Opcional)
          </label>
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              id="files"
              name="files"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              className="hidden"
            />
            <label
              htmlFor="files"
              className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
            >
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Clique para adicionar arquivos ou arraste aqui
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Imagens, vídeos ou documentos (máx. 10MB cada)
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Importante:</strong> Todas as informações enviadas são
            confidenciais e serão tratadas com sigilo pelas autoridades
            competentes. Fornecer informações falsas é crime previsto no Código
            Penal.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <SubmitButton isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}
