import { AlertCircle, RefreshCw, Users, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { ErrorStateProps, EmptyStateProps } from "@/src/lib/types/ui";

export function ErrorState({
  error,
  onRetry,
  showRetry = true,
  className,
  size = "md",
}: ErrorStateProps) {
  const errorMessage = error;

  const sizeClasses = {
    sm: {
      container: "p-4",
      icon: "w-8 h-8",
      title: "text-lg",
      description: "text-sm",
      button: "px-3 py-1.5 text-sm",
    },
    md: {
      container: "p-8",
      icon: "w-12 h-12",
      title: "text-xl",
      description: "text-base",
      button: "px-4 py-2",
    },
    lg: {
      container: "p-12",
      icon: "w-16 h-16",
      title: "text-2xl",
      description: "text-lg",
      button: "px-6 py-3",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center bg-white rounded-lg border",
        classes.container,
        className
      )}
    >
      <AlertCircle className={cn("text-red-500 mb-4", classes.icon)} />

      <h3 className={cn("font-semibold text-gray-900 mb-2", classes.title)}>
        Algo deu errado
      </h3>

      <p className={cn("text-gray-600 mb-6 max-w-sm", classes.description)}>
        {errorMessage}
      </p>

      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className={cn(
            "inline-flex items-center space-x-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors",
            classes.button
          )}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Tentar novamente</span>
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  size = "md",
}: EmptyStateProps) {
  const sizeClasses = {
    sm: {
      container: "p-4",
      icon: "w-8 h-8",
      title: "text-lg",
      description: "text-sm",
      button: "px-3 py-1.5 text-sm",
    },
    md: {
      container: "p-8",
      icon: "w-12 h-12",
      title: "text-xl",
      description: "text-base",
      button: "px-4 py-2",
    },
    lg: {
      container: "p-12",
      icon: "w-16 h-16",
      title: "text-2xl",
      description: "text-lg",
      button: "px-6 py-3",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center bg-white rounded-lg border",
        classes.container,
        className
      )}
    >
      <div className={cn("text-gray-400 mb-4", classes.icon)}>
        {icon || <Users className="w-full h-full" />}
      </div>

      <h3 className={cn("font-semibold text-gray-900 mb-2", classes.title)}>
        {title}
      </h3>

      <p className={cn("text-gray-600 mb-6 max-w-sm", classes.description)}>
        {description}
      </p>

      {action &&
        (action.href ? (
          <Link
            href={action.href}
            className={cn(
              "inline-flex items-center space-x-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors",
              classes.button
            )}
          >
            <span>{action.label}</span>
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className={cn(
              "inline-flex items-center space-x-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors",
              classes.button
            )}
          >
            <span>{action.label}</span>
          </button>
        ))}
    </div>
  );
}

export function NotFound({
  title = "Página não encontrada",
  description = "A página que você está procurando não existe ou foi removida.",
  showHomeButton = true,
}: {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
      <div className="text-6xl font-bold text-gray-300 mb-4">404</div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>

      <p className="text-gray-600 mb-8 max-w-md">{description}</p>

      <div className="flex space-x-4">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        {showHomeButton && (
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Ir para início</span>
          </Link>
        )}
      </div>
    </div>
  );
}
