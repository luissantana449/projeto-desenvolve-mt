"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { UsePersonsParams } from "@/src/hooks/usePersons";

interface SearchBarProps {
  onSearch: (filters: UsePersonsParams) => void;
  initialValues?: UsePersonsParams;
  className?: string;
}

type FormState = {
  query: string;
  gender: string;
  ageMin: string;
  ageMax: string;
  location: string;
};

export function SearchBar({
  onSearch,
  initialValues,
  className,
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const [formState, setFormState] = useState<FormState>(() => ({
    query: initialValues?.query || "",
    gender: initialValues?.gender || "",
    ageMin: initialValues?.ageMin?.toString() || "",
    ageMax: initialValues?.ageMax?.toString() || "",
    location: initialValues?.location || "",
  }));

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Verifica se há filtros aplicados
  const hasFilters = Object.values(formState).some((value) => value !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filters: UsePersonsParams = {
      query: formState.query || undefined,
      gender: formState.gender || undefined,
      ageMin: formState.ageMin ? parseInt(formState.ageMin) : undefined,
      ageMax: formState.ageMax ? parseInt(formState.ageMax) : undefined,
      location: formState.location || undefined,
      page: 0,
    };

    onSearch(filters);
  };

  // Limpar filtros
  const clearFilters = () => {
    setFormState(formState);
    onSearch({ page: 0 });
  };

  // Toggle filtros
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={formState.query}
              onChange={(e) => updateField("query", e.target.value)}
              placeholder="Buscar por nome..."
              className="w-full pl-12 pr-32 py-4 text-lg text-gray-700 bg-white border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-white shadow-lg backdrop-blur-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFilters}
                className={cn(
                  "inline-flex items-center px-4 py-2 rounded-lg transition-colors font-medium text-sm gap-2",
                  showFilters
                    ? "bg-gray-100 text-gray-700"
                    : "hover:bg-gray-100 text-gray-600"
                )}
                aria-label={showFilters ? "Ocultar filtros" : "Mostrar filtros"}
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="gender-select"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Gênero
                </label>
                <select
                  id="gender-select"
                  value={formState.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="age-min"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Idade Mínima
                </label>
                <input
                  id="age-min"
                  type="number"
                  value={formState.ageMin}
                  onChange={(e) => updateField("ageMin", e.target.value)}
                  placeholder="0"
                  min="0"
                  max="120"
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="age-max"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Idade Máxima
                </label>
                <input
                  id="age-max"
                  type="number"
                  value={formState.ageMax}
                  onChange={(e) => updateField("ageMax", e.target.value)}
                  placeholder="120"
                  min="0"
                  max="120"
                  className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </div>

            {hasFilters && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="w-4 h-4 mr-1" />
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
