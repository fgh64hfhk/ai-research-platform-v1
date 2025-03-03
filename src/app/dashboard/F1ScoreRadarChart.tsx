"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

// 模擬醫療診斷 F1-score 數據
const sampleData = [
  { category: "肺癌", f1: 0.72, precision: 0.75, recall: 0.81 },
  { category: "心臟病", f1: 0.85, precision: 0.88, recall: 0.82 },
  { category: "糖尿病", f1: 0.68, precision: 0.7, recall: 0.66 },
  { category: "阿茲海默症", f1: 0.79, precision: 0.8, recall: 0.78 },
  { category: "帕金森氏症", f1: 0.58, precision: 0.6, recall: 0.57 },
  { category: "新冠肺炎", f1: 0.9, precision: 0.92, recall: 0.88 },
];

const sampleConfig = {
  f1: {
    label: "F1-score",
    color: "#8884d8",
  },
  precision: {
    label: "Precision",
    color: "#82ca9d",
  },
  recall: {
    label: "Recall",
    color: "#ff7300",
  },
} satisfies ChartConfig;

interface DataPoint {
  category: string;
  f1: number;
  precision: number;
  recall: number;
}

// 自動計算數據範圍的函數
const getDynamicRange = (data: DataPoint[]) => {
  const values = data.flatMap((d) => [d.f1, d.precision, d.recall]);

  console.log("values:", values);

  let minValue = Math.min(...values);
  let maxValue = Math.max(...values);
  console.log("[min, max]:", [minValue.toFixed(2), maxValue.toFixed(2)]);

  let range = maxValue - minValue;
  console.log("range:", range.toFixed(2));

  // 確保數據間距明顯
  if (range < 0.1) {
    range = 0.2; // 如果範圍過小，強制擴展
  }

  // 讓最小值往 0.5 附近靠近，避免數據擠在上方
  minValue = Math.max(0.5, minValue - 0.05);
  maxValue = minValue + range; // 調整最大值以確保範圍

  // 根據範圍大小決定 `tickInterval`
  let tickInterval;
  if (range < 0.1) {
    tickInterval = 0.01; // 如果範圍極小，設定較小間隔
  } else if (range < 0.2) {
    tickInterval = 0.03; // 適合較小範圍
  } else if (range < 0.4) {
    tickInterval = 0.05; // 適合中等範圍
  } else if (range < 0.6) {
    tickInterval = 0.07; // 避免間距過大
  } else {
    tickInterval = 0.1; // 預設較大間隔
  }

  console.log("tick interval:", tickInterval);

  // 🔹 確保 tickCount 至少有 4 個
  const tickCount = Math.max(
    4,
    Math.ceil((maxValue - minValue) / tickInterval) + 1
  );
  console.log("result:", tickCount);

  return {
    domain: [minValue, maxValue],
    tickCount,
  };
};

export default function F1ScoreRadarChart() {
  // 狀態管理：最小 F1-score 篩選條件
  const [minF1, setMinF1] = useState(0.6);
  // 是否篩選 Top 5 低 F1-score
  const [filterTop5, setFilterTop5] = useState(false);
  // 是否顯示 Precision 和 Recall
  const [showPrecisionRecall, setShowPrecisionRecall] = useState(true);

  //   // 過濾符合條件的數據
  //   let filteredData = sampleData.filter((d) => d.f1 >= minF1);
  //   if (filterTop5) {
  //     filteredData = [...filteredData]
  //       .sort((a, b) => a.f1 - b.f1) // 依照 F1-score 升序排序
  //       .slice(0, 5); // 取得最低的前 5 個類別
  //   }

  const dynamicRange = useMemo(() => getDynamicRange(sampleData), []);

  return (
    <Card>
      {/* 📌 卡片標題與說明 */}
      <CardHeader>
        <CardTitle>F1-score 分析</CardTitle>
        <CardDescription>
          比較不同類別的 Precision、Recall 及 F1-score。
        </CardDescription>
      </CardHeader>

      {/* 📌 互動控制區域 */}
      <CardContent className="space-y-4">
        {/* 🔹 F1-score 篩選 (滑桿) */}
        <div className="flex flex-col space-y-2">
          <Label>篩選最低 F1-score：{minF1.toFixed(2)}</Label>
          <Slider
            defaultValue={[minF1]}
            min={0.5}
            max={1.0}
            step={0.05}
            onValueChange={(value) => setMinF1(value[0])}
          />
        </div>
        {/* 🔹 篩選按鈕 (Top 5 / 全部) */}
        <div className="flex space-x-2">
          <Button
            variant={filterTop5 ? "default" : "outline"}
            onClick={() => setFilterTop5(true)}
          >
            顯示 Top 5 低 F1-score 類別
          </Button>
          <Button
            variant={!filterTop5 ? "default" : "outline"}
            onClick={() => setFilterTop5(false)}
          >
            查看所有類別
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={showPrecisionRecall}
            onCheckedChange={() => setShowPrecisionRecall(!showPrecisionRecall)}
          />
          <Label>顯示 Precision & Recall</Label>
        </div>
      </CardContent>

      {/* 📌 圖表區域 */}
      <CardContent>
        <ChartContainer
          config={sampleConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <RadarChart data={sampleData} cx="50%" cy="50%" outerRadius="90%">
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarGrid radialLines={true} />
            <PolarAngleAxis
              dataKey="category"
              textAnchor="middle"
              tick={{ fontSize: 12 }}
            />
            {/* 隱藏 PolarRadiusAxis 的線條，但仍讓其控制範圍 */}
            <PolarRadiusAxis
              domain={dynamicRange.domain}
              tickCount={dynamicRange.tickCount} // 使用動態計算的 tickCount
              axisLine={false} // 移除軸線
              tick={false} // 移除數字標籤
            />
            <Radar
              dataKey="f1"
              stroke="var(--color-f1)"
              strokeWidth={3}
              fill="var(--color-f1)"
              fillOpacity={0.4}
            />
            {/* Precision & Recall 顯示 */}
            {true && (
              <>
                <Radar
                  dataKey="precision"
                  fill="var(--color-precision)"
                  fillOpacity={0}
                  stroke="var(--color-precision)"
                  strokeWidth={2.5}
                />
                <Radar
                  dataKey="recall"
                  fill="var(--color-recall)"
                  fillOpacity={0}
                  stroke="var(--color-recall)"
                  strokeWidth={2.5}
                />
              </>
            )}
          </RadarChart>
        </ChartContainer>
      </CardContent>

      {/* 📌 卡片底部 (當前篩選條件) */}
      <CardFooter className="text-sm text-muted-foreground">
        {true
          ? "顯示 Top 5 低 F1-score 類別"
          : `顯示所有類別，篩選最低 F1-score: ${minF1.toFixed(2)}`}
      </CardFooter>
    </Card>
  );
}
