"use client";

import { ReactNode } from "react";

import Provider from "@/components/theme-provider";
import Header from "./Header";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <SidebarProvider>
        <div className="flex h-screen">
          {/* Sidebar 固定左側 */}
          <AppSidebar />

          {/* Main content area */}
          <div className="flex flex-col flex-1">
            {/* 頭部導航欄 固定在上方 */}
            <Header />

            {/* Main content with overflow handling */}
            <main className="flex-1 overflow-auto p-6 mt-16">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </Provider>
  );
}
