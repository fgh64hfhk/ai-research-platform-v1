"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import Welcome from "@/app/mdx-page/page.mdx";

// UI 元件
import ModeToggle from "@/components/layout/ModeToggle";

export default function Home() {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    setTimeout(() => {
      router.push(href);
    }, 150);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto] place-items-center px-10 py-12 gap-12 bg-gray-100 dark:bg-gray-900">
      {/* 頭部區域 */}
      <header className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-lg px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          AI 研究平台
        </h1>
        <div className="flex gap-4">
          <ModeToggle />
          <Button asChild variant="outline">
            <Link href="/login">登入</Link>
          </Button>
        </div>
      </header>

      {/* 主內容區域 */}
      <main className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 flex flex-col items-center text-center space-y-6">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <p className="text-lg text-gray-700 dark:text-gray-300">
          歡迎使用 AI 研究平台，這裡可以管理你的 AI 模型與數據集。
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="secondary"
            className="transition-all duration-150 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => handleNavigation("/dashboard")}
          >
            使用者儀表板
          </Button>
          <Button
            variant="secondary"
            className="transition-all duration-150 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => handleNavigation("/models")}
          >
            模型管理
          </Button>
        </div>

        <section className="w-full flex flex-wrap justify-center gap-4">
          {/* README Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                查看 README.md
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogTitle>專案 README</DialogTitle>
              {/* 這裡使用 Server Component 來顯示靜態 README 內容 */}
              <Welcome />
            </DialogContent>
          </Dialog>
          {/* Next.js 簡介 Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Next.js 介紹
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogTitle>Next.js 簡介</DialogTitle>
              <p className="text-gray-700 dark:text-gray-300">
                Next.js 是一個基於 React 的框架，提供
                SSR（伺服器端渲染）、ISR（增量靜態再生） 和 API Routes
                等功能，適用於現代 Web 應用開發。
              </p>
              <p>
                官方文件：
                <Link
                  href="https://nextjs.org/docs"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Next.js 官方文件
                </Link>
              </p>
            </DialogContent>
          </Dialog>
        </section>
      </main>

      {/* 頁腳區域 */}
      <footer className="w-full max-w-3xl border-t border-gray-300 dark:border-gray-700 pt-4 flex justify-center gap-6 text-gray-600 dark:text-gray-400">
        <Link href="/resume">Resume</Link>
        <Link href="https://github.com/your-github" target="_blank">
          GitHub
        </Link>
        <Link href="https://vercel.com" target="_blank">
          部署於 Vercel
        </Link>
      </footer>
    </div>
  );
}
