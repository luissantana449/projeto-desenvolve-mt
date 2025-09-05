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

export function getTimeSince(
    date: string | Date,
    locale: string = "pt-BR"
): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return "Hoje";
    } else if (diffInDays === 1) {
        return "Ontem";
    } else if (diffInDays < 30) {
        return `${diffInDays} dias atrás`;
    } else if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return `${months} ${months === 1 ? "mês" : "meses"} atrás`;
    } else {
        const years = Math.floor(diffInDays / 365);
        return `${years} ${years === 1 ? "ano" : "anos"} atrás`;
    }
}