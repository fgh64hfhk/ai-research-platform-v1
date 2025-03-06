"use client";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1 overflow-hidden">
        <div className="overflow-auto h-full p-4">{children}</div>
      </main>
    </>
  );
}
