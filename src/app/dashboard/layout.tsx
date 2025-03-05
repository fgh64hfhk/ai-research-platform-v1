"use client";

import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";

import Header from "./Header";

import { Toaster } from "@/components/ui/sonner";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { NotificationProvider } from "./hook/useNotifications";
import { NotificationSettingsProvider } from "./hook/useNotificationSettings";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar 固定左側 */}
      <AppSidebar />

      <div className="flex flex-col flex-1">
        {/* Header 固定上方 */}
        <Header />

        {/* 主要內容區域 */}
        <main className="flex-1 overflow-hidden">
          <div className="overflow-auto h-full p-4">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SidebarProvider>
        <NotificationSettingsProvider>
          <NotificationProvider>
            <Toaster richColors />
            <DashboardLayout>{children}</DashboardLayout>
          </NotificationProvider>
        </NotificationSettingsProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
