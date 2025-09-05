"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { usePersons } from "@/src/hooks/usePersons";
import { MissingPersonsListContainer } from "@/src/components/common/MissingPersonsListContainer";
import { CardSkeleton } from "@/src/components/common/Loading";
import { EmptyState } from "@/src/components/common/ErrorState";
import { Pagination } from "@/src/components/ui/Pagination";
import { MissingPersonsListProps } from "@/src/lib/types/ui";

export function MissingPersonsList({ searchFilters }: MissingPersonsListProps) {
  const [page, setPage] = useState(0);

  // Reset page when search filters change
  useEffect(() => {
    setPage(0);
  }, [
    searchFilters.query,
    searchFilters.gender,
    searchFilters.ageMin,
    searchFilters.ageMax,
    searchFilters.location,
  ]);

  const { persons, totalPages, isLoading, error } = usePersons({
    ...searchFilters,
    page,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Erro ao carregar dados"
        description="Ocorreu um erro ao buscar as informações. Tente novamente."
        icon={<Search className="w-full h-full" />}
        className="bg-white rounded-lg"
      />
    );
  }

  if (!persons || persons.length === 0) {
    return (
      <EmptyState
        title="Nenhuma pessoa encontrada"
        description="Tente ajustar os filtros de busca ou verifique a ortografia dos termos utilizados."
        icon={<Search className="w-full h-full" />}
        className="bg-white rounded-lg"
      />
    );
  }

  return (
    <>
      <MissingPersonsListContainer
        persons={persons}
        title={searchFilters.query ? "Resultados da Busca" : "Casos Recentes"}
        count={persons.length}
      />

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={(page || 0) + 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
