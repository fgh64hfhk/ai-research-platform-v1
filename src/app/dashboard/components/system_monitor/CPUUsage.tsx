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
const generateMockData = (range: "20d" | "3m") => {
  const data: CpuUsageData[] = [];
  const dataPoints = range === "20d" ? 20 : 90; // 20 天 或者 3 個月（假設 90 天）
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
  const [filter, setFilter] = useState<"20d" | "3m">("20d");

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
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        CPU Usage
      </h2>

      {/* 過濾選項 */}
      <div className="flex justify-end space-x-2 my-2">
        <Button
          onClick={() => setFilter("20d")}
          className={`px-3 py-1 rounded ${
            filter === "20d"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          20 天
        </Button>
        <Button
          onClick={() => setFilter("3m")}
          className={`px-3 py-1 rounded ${
            filter === "3m"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          3 個月
        </Button>
      </div>

      {/* 加載狀態 */}
      {loading && <p className="text-gray-500 dark:text-gray-400">載入中...</p>}

      {/* 折線圖 */}
      {!loading && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}
