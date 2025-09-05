"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import type { UsePersonsParams } from "@/src/hooks/usePersons";
import { SearchBar } from "@/src/components/common/SearchBar";
import { MissingPersonsList } from "../components/common/MissingPersonsList";

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState<UsePersonsParams>({
    page: 0,
  });

  const handleSearch = (filters: UsePersonsParams) => {
    setSearchFilters(filters);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-700 to-gray-600 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pessoas Desaparecidas - MT
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Ajude-nos a encontrar pessoas desaparecidas no estado de Mato
              Grosso. Sua informação pode fazer a diferença.
            </p>

            {/* Search */}
            <div className="max-w-3xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Estatísticas */}
          

          {/* Contato de Emergnência */}
          <div className="bg-red-700 border border-red-600 rounded-lg p-4 mb-8 shadow-md">
            <div className="flex items-center justify-center space-x-4 text-center">
              <Phone className="w-5 h-5 text-white" />
              <p className="text-white">
                <strong>Emergência:</strong> Ligue{" "}
                <a href="tel:190" className="underline font-semibold">
                  190
                </a>{" "}
                (PM) ou{" "}
                <a href="tel:193" className="underline font-semibold">
                  193
                </a>{" "}
                (BOMBEIROS) ou{" "}
                <a href="tel:197" className="underline font-semibold">
                  197 | 181
                </a>{" "}
                (PJC)
              </p>
            </div>
          </div>

          {/* Resultados */}
          <MissingPersonsList searchFilters={searchFilters} />
        </div>
      </div>
    </div>
  );
}
