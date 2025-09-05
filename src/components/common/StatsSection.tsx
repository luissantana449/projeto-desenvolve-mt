"use client";

import { Users, TrendingUp, Search } from "lucide-react";
import { useStats } from "@/src/hooks/useStats";
import { StatsSkeleton } from "@/src/components/common/Loading";

export function StatsSection() {
  const { stats, isLoading, error } = useStats();

  if (isLoading) {
    return <StatsSkeleton />;
  }

  if (error) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total de Casos</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
            <Users className="w-7 h-7 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Pessoas Desaparecidas
            </p>
            <p className="text-3xl font-bold text-orange-600">
              {stats.quantPessoasDesaparecidas}
            </p>
          </div>
          <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Pessoas Encontradas
            </p>
            <p className="text-3xl font-bold text-green-600">
              {stats.quantPessoasEncontradas}
            </p>
          </div>
          <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
            <Search className="w-7 h-7 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
