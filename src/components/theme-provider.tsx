"use client";

import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// 主題模式的供應器中設置 延遲伺服器端的渲染 並提供未掛載的狀態 注意不要重複渲染

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>未掛載組件</div>;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
