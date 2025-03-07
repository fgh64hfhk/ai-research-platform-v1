"use client";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* 主要內容區域 */}
      <main className="flex-1 overflow-hidden">
        <div className="overflow-auto h-full p-4">{children}</div>
      </main>
    </>
  );
}
