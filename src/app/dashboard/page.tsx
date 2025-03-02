"use client";

import LossChart from "@/app/dashboard/LossChart";
import AccuracyTrendChart from "./AccuracyTrendChart";
import PredictionPieChart from "./PredictionPieChart";
import { Component } from "./InteractivePieChart";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* 儀表板首頁標題 */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        儀表板首頁
      </h1>

      {/* 訓練模型總覽 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          訓練模型總覽
        </h2>

        {/* 圖表區塊 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LossChart />
          <AccuracyTrendChart />
        </div>

        {/* Pie Charts 區塊 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PredictionPieChart />
          <Component />
        </div>
      </section>
    </div>
  );
}
