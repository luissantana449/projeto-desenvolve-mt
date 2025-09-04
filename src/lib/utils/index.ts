import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format date utilities
export function formatDate(
    date: string | Date,
    locale: string = "pt-BR"
): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
