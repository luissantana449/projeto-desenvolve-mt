"use client";

import { useState, useEffect } from "react";
import { ViewType } from "../lib/types/ui";

const STORAGE_KEY = "view-type";

export function useViewType(defaultView: ViewType = "grid") {
  const [viewType, setViewType] = useState<ViewType>(defaultView);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === "grid" || saved === "list")) {
      setViewType(saved as ViewType);
    }
    setIsHydrated(true);
  }, []);

  const changeViewType = (newViewType: ViewType) => {
    setViewType(newViewType);
    localStorage.setItem(STORAGE_KEY, newViewType);
  };

  return {
    viewType: isHydrated ? viewType : defaultView,
    changeViewType,
    isHydrated,
  };
}
