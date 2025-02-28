"use client";

import { ReactNode } from "react";

import Provider from "@/components/theme-provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center h-screen p-6">
      <Provider>{children}</Provider>
    </div>
  );
}
