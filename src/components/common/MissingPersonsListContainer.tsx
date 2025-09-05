"use client";

import { ViewToggle } from "@/src/components/ui/ViewToggle";
import { PersonCard } from "@/src/components/common/PersonCard";
import { PersonListItem } from "@/src/components/common/PersonListItem";
import { useViewType } from "@/src/hooks/useViewType";
import { MissingPerson } from "@/src/lib/types/domain";
import { PersonListContainerProps } from "@/src/lib/types/ui";

export function MissingPersonsListContainer({
  persons,
  title,
  count,
}: PersonListContainerProps) {
  const { viewType, changeViewType } = useViewType();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {title}
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({count} {count === 1 ? "pessoa" : "pessoas"})
          </span>
        </h2>

        <ViewToggle
          currentView={viewType}
          onViewChange={changeViewType}
          className="ml-4"
        />
      </div>

      {viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {persons.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {persons.map((person) => (
            <PersonListItem key={person.id} person={person} />
          ))}
        </div>
      )}
    </>
  );
}
