"use client";
import { useState, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type GpuUsageData = {
  core: number;
  memory: number;
};

export default function GPUUsage() {
  // 狀態管理
  const [gpuData, setGpuData] = useState<GpuUsageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 模擬從 API 獲取數據
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // TODO: 實際的 API
        const mockData: GpuUsageData = {
          core: Math.random() * 100,
          memory: Math.random() * 100,
        };
        setGpuData(mockData);
        setError(null);
      } catch (err) {
        setError("無法獲取數據：" + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: ["Core Usage", "Memory Usage"],
    datasets: [
      {
        data: [gpuData?.core, gpuData?.memory],
        backgroundColor: ["#3B82F6", "#F59E0B"],
        hoverBackgroundColor: ["#2563EB", "#D97706"],
      },
    ],
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        GPU Usage
      </h2>
      {/* 加載狀態 */}
      {loading && <p className="text-gray-500 dark:text-gray-400">載入中...</p>}
      {/* 錯誤訊息 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 數據展示區 + 圖表 */}
      {!loading && !error && gpuData && (
        <div className="mt-4 grid grid-cols-2 items-center">
          {/* 數據展示區 */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                GPU Core 使用率
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {gpuData.core.toFixed(1)}%
              </p>
            </div>

            <div className="p-4 bg-gray-200 dark:bg-gray-600 rounded-lg text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Memory 使用率
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {gpuData.memory.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="ml-2 flex justify-center items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <Doughnut data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}
