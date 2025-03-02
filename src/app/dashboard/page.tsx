"use client";

import LossChart from "@/app/dashboard/LossChart";
import AccuracyTrendChart from "./AccuracyTrendChart";
import PredictionPieChart from "./PredictionPieChart";
import { Component } from "./InteractivePieChart";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        儀表板首頁
      </h1>

      {/* 訓練模型總覽 */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          訓練模型總覽
        </h2>
        <LossChart />
        <hr />
        <AccuracyTrendChart />
        <hr />
        <PredictionPieChart />
        <hr />
        <Component />
      </div>
    </div>
  );
}
