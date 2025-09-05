import { UsePersonsParams } from "@/src/hooks/usePersons";
import { MissingPerson } from "./domain";

export interface SafeImageProps {
  src: string | undefined;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  fallback?: React.ReactNode;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface ErrorStateProps {
  error?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

export interface PersonCardProps {
  person: MissingPerson;
}

export type ViewType = "grid" | "list";

export interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  className?: string;
}

export interface PersonListItemProps {
  person: MissingPerson;
}

export interface PersonListContainerProps {
  persons: MissingPerson[];
  title: string;
  count: number;
}

export interface MissingPersonsListProps {
  searchFilters: UsePersonsParams;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export interface UsePersonReturn {
  person: MissingPerson | null;
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

export interface PersonDetailProps {
  id: string;
}

export interface SubmitInfoPageProps {
  params: Promise<{
    id: string;
  }>;
}