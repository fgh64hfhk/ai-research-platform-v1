"use client";

import { useMemo, useState } from "react";

import { PieChart, Pie, Label, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// 模擬數據：包含不同版本的準確率
const modelData = {
  modelA: {
    v1_0: { accuracy: 48.5, total: 10600 },
    v1_1: { accuracy: 43.3, total: 17500 },
    v2_0: { accuracy: 32.7, total: 12000 },
    v2_1: { accuracy: 22.2, total: 15000 },
  },
  modelB: {
    v1_0: { accuracy: 76.2, total: 10700 },
    v1_1: { accuracy: 79.8, total: 23500 },
    v2_0: { accuracy: 84.1, total: 12800 },
    v2_1: { accuracy: 86.5, total: 15000 },
  },
};

// 錯誤率 (比例)
const falsePositiveRate = 0.3;
const falseNegativeRate = 0.5;

// 圖表顏色
const COLORS = {
  correct: "#4CAF50", // 綠色
  incorrect: "#F44336", // 紅色
  falsePositive: "#FF9800", // 橙色
  falseNegative: "#E91E63", // 粉色
  uncertain: "#9C27B0", // 紫色
};

// 圖表設定
const chartConfig = {
  accuracy: {
    label: "Accuracy",
    color: COLORS.correct,
  },
  failure: {
    label: "Failure",
    color: COLORS.incorrect,
  },
  fail_pos: {
    label: "Positives",
    color: COLORS.falsePositive,
  },
  fail_nag: {
    label: "Negatives",
    color: COLORS.falseNegative,
  },
  fail_unc: {
    label: "Uncertain",
    color: COLORS.uncertain,
  },
} satisfies ChartConfig;

export default function PredictionPieChart() {
  const [selectedModel, setSelectedModel] = useState("modelA");
  const [selectedVersion, setSelectedVersion] = useState("v1_0");

  // 取得選擇的模型數據
  const { accuracy, total } =
    modelData[selectedModel as keyof typeof modelData][
      selectedVersion as keyof (typeof modelData)[keyof typeof modelData]
    ];

  // 計算正確與錯誤預測的數量
  const correctPredictions = Math.round((accuracy / 100) * total);
  const incorrectPredictions = total - correctPredictions;

  // 細分錯誤預測

  const falsePositives = Math.round(incorrectPredictions * falsePositiveRate);
  const falseNegatives = Math.round(incorrectPredictions * falseNegativeRate);
  const uncertainPredictions =
    incorrectPredictions - (falsePositives + falseNegatives);

  // 動態 Pie Chart 數據
  const pieData = useMemo(
    () => [
      {
        name: "accuracy",
        value: correctPredictions,
        fill: "var(--color-accuracy)",
      },
      {
        name: "failure",
        value: incorrectPredictions,
        fill: "var(--color-failure)",
      },
    ],
    [correctPredictions, incorrectPredictions]
  );

  // 錯誤細分類
  const errorBreakdown = useMemo(
    () => ({
      failure: [
        {
          name: "False Positives",
          value: falsePositives,
          fill: "var(--color-fail_pos)",
        },
        {
          name: "False Negatives",
          value: falseNegatives,
          fill: "var(--color-fail_nag)",
        },
        {
          name: "Uncertain Predictions",
          value: uncertainPredictions,
          fill: "var(--color-fail_unc)",
        },
      ],
    }),
    [falsePositives, falseNegatives, uncertainPredictions]
  );

  const id = "pie-interactive";

  // 高亮選擇的區塊
  const [active, setActive] = useState(pieData[0].name);

  // 取得當前選擇的索引
  const activeIndex = useMemo(
    () => pieData.findIndex((item) => item.name === active),
    [active, pieData]
  );

  // 取得所有狀態的陣列
  const status = useMemo(() => pieData.map((item) => item.name), [pieData]);

  // 取得當前錯誤細分類別
  const activeErrorData = useMemo(
    () => (active === "failure" ? errorBreakdown["failure"] : []),
    [active, errorBreakdown]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />

      <CardHeader>
        <CardTitle>Prediction Accuracy</CardTitle>
        <CardDescription>
          Select a model and version to view accuracy distribution.
        </CardDescription>

        {/* 模型選擇 */}
        <Select onValueChange={setSelectedModel} defaultValue={selectedModel}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modelA">Model A</SelectItem>
            <SelectItem value="modelB">Model B</SelectItem>
          </SelectContent>
        </Select>

        {/* 版本選擇 */}
        <Select
          onValueChange={setSelectedVersion}
          defaultValue={selectedVersion}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Version" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="v1_0">Version 1.0</SelectItem>
            <SelectItem value="v1_1">Version 1.1</SelectItem>
            <SelectItem value="v2_0">Version 2.0</SelectItem>
            <SelectItem value="v2_1">Version 2.1</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="relative flex flex-col items-center space-y-0 pb-0">
        {/* 選擇高亮圖表的類別 - 固定於右上角 */}
        <div className="absolute top-0 right-0 mt-2 mr-4">
          <Select defaultValue={active} onValueChange={setActive}>
            <SelectTrigger
              className="h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select Category"
            >
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {status.map((key) => {
                const config = chartConfig[key as keyof typeof chartConfig];
                if (!config) return null;
                return (
                  <SelectItem
                    key={key}
                    value={key}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          background: `var(--color-${key})`,
                        }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* 圓餅圖 - 保持置中 */}
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-sm min-w-[200px] max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => {
                // 確保 `startAngle` 和 `endAngle` 存在
                const startAngle = props.startAngle ?? 0;
                const endAngle = props.endAngle ?? 0;

                // 避免計算錯誤
                if (startAngle === endAngle) return <g />; // 改為空 `<g />`，不回傳 `null`

                const totalAngle = endAngle - startAngle;

                // 如果選擇的是 "failure"，則細分該區塊
                if (active === "failure") {
                  const failureData = pieData.find(
                    (item) => item.name === "failure"
                  );
                  const totalFailureValue = failureData?.value || 1; // 避免除數為 0

                  let currentAngle = startAngle; // 獨立變數來儲存當前角度

                  const errorSectors = activeErrorData.map((item) => {
                    const arcAngle =
                      (item.value / totalFailureValue) * totalAngle;
                    const sector = (
                      <Sector
                        {...props}
                        key={item.name}
                        fill={item.fill}
                        startAngle={currentAngle}
                        endAngle={currentAngle + arcAngle}
                        innerRadius={outerRadius + 15}
                        outerRadius={outerRadius + 30}
                      />
                    );
                    currentAngle += arcAngle; // 只影響本地變數，不影響 `props`
                    return sector;
                  });
                  return (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 5} />
                      {errorSectors}
                    </g>
                  );
                }
                // 如果是其他類別，則只顯示一般高亮
                return <Sector {...props} outerRadius={outerRadius + 5} />;
              }}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {pieData[activeIndex].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Samples
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 border-t pt-4">
        <div className="text-sm text-muted-foregroud">
          <span className="font-semibold">Accuracy Formula: </span>
          Accuracy = (Correct Predictions / Total Samples) × 100%
        </div>

        {/* 錯誤類別區塊 */}
        <div className="flex flex-col gap-2 w-full text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF9800]"></span>
            <span className="font-semibold">False Positive (假陽性, FP)：</span>
            <span className="text-muted-foreground">
              模型錯誤地將負類別預測為正類別
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#E91E63]"></span>
            <span className="font-semibold">False Negative (假陰性, FN)：</span>
            <span className="text-muted-foreground">
              模型錯誤地將正類別預測為負類別
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#9C27B0]"></span>
            <span className="font-semibold">
              Uncertain Predictions (不確定預測)：
            </span>
            <span className="text-muted-foreground">
              模型的信心低於某個閾值
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
