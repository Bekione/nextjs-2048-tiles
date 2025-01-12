"use client"

import { useState, useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.add(theme);
      return () => {
        document.documentElement.classList.remove(theme);
      };
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return <>{children}</>;
}