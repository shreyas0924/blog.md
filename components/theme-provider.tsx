"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { flushSync } from "react-dom";

type Props = React.ComponentProps<typeof NextThemesProvider>;

function ThemeAnimationWrapper({ children }: { children: React.ReactNode }) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = (e?: React.MouseEvent) => {
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;

    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);

    const next = theme === "dark" ? "light" : "dark";

    if (!("startViewTransition" in document)) {
      setTheme(next);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeToggleContext.Provider>
  );
}

/* Context so you can use toggle anywhere */
const ThemeToggleContext = React.createContext<{
  toggleTheme: (e?: React.MouseEvent) => void;
} | null>(null);

export function useThemeToggle() {
  const ctx = React.useContext(ThemeToggleContext);
  if (!ctx) throw new Error("useThemeToggle must be used inside ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children, ...props }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      <ThemeAnimationWrapper>{children}</ThemeAnimationWrapper>
    </NextThemesProvider>
  );
}