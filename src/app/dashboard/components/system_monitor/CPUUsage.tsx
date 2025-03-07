"use client";

import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { Button } from "@/components/ui/button";

// 註冊 Chart.js 必要組件
ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

// CPU 負載數據類型
type CpuUsageData = {
  timestamp: string;
  core1: number;
  core2: number;
  core3: number;
  core4: number;
};

// 模擬 API 獲取數據
const generateMockData = (range: "7d" | "1m") => {
  const data: CpuUsageData[] = [];
  const dataPoints = range === "7d" ? 7 : 30; // 7 天 或者 1 個月（假設 30 天）
  for (let i = 0; i < dataPoints; i++) {
    data.push({
      timestamp: new Date(Date.now() - i * 86400000)
        .toISOString()
        .split("T")[0],
      core1: Math.random() * 100,
      core2: Math.random() * 100,
      core3: Math.random() * 100,
      core4: Math.random() * 100,
    });
  }
  return data.reverse();
};

export default function CPUUsage() {
  // 狀態管理
  const [cpuData, setCpuData] = useState<CpuUsageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"7d" | "1m">("7d");

  // 取得 CPU 負載數據
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCpuData(generateMockData(filter));
      setLoading(false);
    }, 500); // 模擬 API 延遲
  }, [filter]);

  // Chart.js 數據格式
  const chartData = {
    labels: cpuData.map((d) => d.timestamp),
    datasets: [
      {
        label: "Core 1",
        data: cpuData.map((d) => d.core1),
        borderColor: "#3B82F6",
        fill: false,
      },
      {
        label: "Core 2",
        data: cpuData.map((d) => d.core2),
        borderColor: "#F59E0B",
        fill: false,
      },
      {
        label: "Core 3",
        data: cpuData.map((d) => d.core3),
        borderColor: "#10B981",
        fill: false,
      },
      {
        label: "Core 4",
        data: cpuData.map((d) => d.core4),
        borderColor: "#EF4444",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow w-full min-w-0 max-w-full overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        CPU Usage
      </h2>

      {/* 過濾選項 */}
      <div className="flex justify-end space-x-2 my-2">
        <Button
          onClick={() => setFilter("7d")}
          className={`px-3 py-1 rounded ${
            filter === "7d"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          7 天
        </Button>
        <Button
          onClick={() => setFilter("1m")}
          className={`px-3 py-1 rounded ${
            filter === "1m"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          1 個月
        </Button>
      </div>

      {/* 加載狀態 */}
      {loading && <p className="text-gray-500 dark:text-gray-400">載入中...</p>}

      {/* 圖表區塊 */}
      <div className="mt-4 grid">
        <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-300 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            CPU 核心使用歷史數據
          </h3>

          <div className="grid place-items-center w-full max-w-[1100px] h-[500px] bg-white py-3 px-3">
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
