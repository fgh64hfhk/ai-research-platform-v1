"use client";
import { useState, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useNotifications } from "@/hooks/useNotifications";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";

import { toast } from "@/components/layout/SonnerToast";

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

  const { addNotification } = useNotifications();
  const { isPushEnabled } = useNotificationSettings();

  // 模擬從 API 獲取數據
  useEffect(() => {
    const interval = setInterval(() => {
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

          if (mockData.core > 90) {
            if (isPushEnabled) {
              toast({
                title: "警告：GPU 高負載",
                description: `GPU 負載超過 ${mockData.core.toFixed(
                  2
                )}%，請注意！`,
                type: "warning",
              });
            }
            addNotification(
              "警告：GPU 高負載",
              `GPU 負載超過 ${mockData.core.toFixed(2)}%，請注意！`,
              "warning"
            );
          }
        } catch (err) {
          setError("無法獲取數據：" + err);
        } finally {
          setLoading(false);
        }
      };
      fetchData(); // 設定計時器時執行第一次
    }, 1000);
    return () => clearInterval(interval); // ✅ 卸載時清理計時器，確保不會多次執行
  }, [isPushEnabled, addNotification]);

  const coreUsageChartData = {
    labels: ["使用中", "未使用"],
    datasets: [
      {
        data: [gpuData?.core ?? 0, 100 - (gpuData?.core ?? 0)],
        backgroundColor: ["#3B82F6", "#E5E7EB"], // 藍色表示使用中，灰色表示未使用
        hoverBackgroundColor: ["#2563EB", "#D97706"],
      },
    ],
  };

  const memoryUsageChartData = {
    labels: ["使用中", "未使用"],
    datasets: [
      {
        data: [gpuData?.memory ?? 0, 100 - (gpuData?.memory ?? 0)],
        backgroundColor: ["#F59E0B", "#E5E7EB"], // 橙色表示使用中，灰色表示未使用
        hoverBackgroundColor: ["#D97706", "#D1D5DB"],
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
        <div className="mt-4 grid grid-cols-2 gap-6">
          {/* 數據展示區 */}
          <div className="space-y-4">
            {/* GPU Core 使用率區塊 */}
            <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow border border-gray-300 dark:border-gray-600 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                GPU Core 使用率
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {gpuData.core.toFixed(1)}%
              </p>
            </div>

            {/* Memory 使用率區塊 */}
            <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow border border-gray-300 dark:border-gray-600 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Memory 使用率
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {gpuData.memory.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* 圖表區塊 */}
          <div className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-300 dark:border-gray-600">
            {/* GPU 核心 Doughnut 圖表 */}
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                GPU 核心使用率
              </h3>
              <Doughnut data={coreUsageChartData} />
            </div>

            {/* 記憶體 Doughnut 圖表 */}
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Memory 使用率
              </h3>
              <Doughnut data={memoryUsageChartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
