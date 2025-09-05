"use client";

import { Grid, List } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ViewToggleProps } from "@/src/lib/types/ui";

export function ViewToggle({
  currentView,
  onViewChange,
  className,
}: ViewToggleProps) {
  return (
    <div
      className={cn("flex items-center bg-gray-100 rounded-lg p-1", className)}
    >
      <button
        onClick={() => onViewChange("grid")}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-md transition-all",
          currentView === "grid"
            ? "bg-white shadow-sm text-blue-600"
            : "text-gray-600 hover:text-gray-900"
        )}
        aria-label="Visualização em grade"
        title="Visualização em grade"
      >
        <Grid className="w-4 h-4" />
      </button>

      <button
        onClick={() => onViewChange("list")}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-md transition-all ml-1",
          currentView === "list"
            ? "bg-white shadow-sm text-blue-600"
            : "text-gray-600 hover:text-gray-900"
        )}
        aria-label="Visualização em lista"
        title="Visualização em lista"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}
