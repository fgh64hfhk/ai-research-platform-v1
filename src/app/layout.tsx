"use client";

import ServerLayout from "./layout.server";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NotificationProvider } from "@/hooks/useNotifications";
import { NotificationSettingsProvider } from "@/hooks/useNotificationSettings";

import { Toaster } from "@/components/ui/sonner";

import { Header } from "@/components/layout/Header";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname(); // 取得當前路徑
  const isHome = pathname === "/"; // 檢查是否為首頁

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServerLayout>
          <ThemeProvider attribute="class" defaultTheme="system">
            {isHome ? (
              // 如果是首頁，使用首頁專屬的版面配置
              <div className="home-layout">
                <div className="home-content">
                  <main>{children}</main>
                </div>
              </div>
            ) : (
              // 其他的頁面使用統一的版面
              <SidebarProvider>
                <NotificationSettingsProvider>
                  <NotificationProvider>
                    <Toaster richColors />
                    <div className="flex h-sreen w-full">
                      {/* Sidebar 固定左側 */}
                      <AppSidebar />
                      <div className="flex flex-col flex-1">
                        {/* Header 固定上方 */}
                        <Header />
                        {/* 主要內容區域 */}
                        <main className="flex-1 overflow-hidden">
                          <div className="overflow-auto h-full p-4">
                            {children}
                          </div>
                        </main>
                      </div>
                    </div>
                  </NotificationProvider>
                </NotificationSettingsProvider>
              </SidebarProvider>
            )}
          </ThemeProvider>
        </ServerLayout>
      </body>
    </html>
  );
}
