"use client";

import { useState } from "react";

import { PieChart, Pie } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

// 模擬數據：包含不同版本的準確率
const modelData = {
  modelA: {
    v1_0: { accuracy: 78.5, total: 10000 },
    v1_1: { accuracy: 82.3, total: 10000 },
    v2_0: { accuracy: 88.7, total: 12000 },
    v2_1: { accuracy: 90.2, total: 15000 },
  },
  modelB: {
    v1_0: { accuracy: 76.2, total: 10000 },
    v1_1: { accuracy: 79.8, total: 10000 },
    v2_0: { accuracy: 84.1, total: 12000 },
    v2_1: { accuracy: 86.5, total: 15000 },
  },
};

// 圖表顏色
const COLORS = ["#4CAF50", "#F44336"];

// 圖表設定
const chartConfig2 = {
  accuracy: {
    label: "Accuracy",
    color: COLORS[0],
  },
  failure: {
    label: "Failure",
    color: COLORS[1],
  },
} satisfies ChartConfig;

export default function PredictionPieChart() {
  const [selectedModel, setSelectedModel] = useState("modelA");
  const [selectedVersion, setSelectedVersion] = useState("v1_0");

  // 取得選擇的模型數據
  const { accuracy, total } = modelData[selectedModel][selectedVersion];

  // 計算正確與錯誤預測的數量
  const correctPredictions = Math.round((accuracy / 100) * total);
  const incorrectPredictions = total - correctPredictions;

  // 讓錯誤預設進一步區分
  const falsePositiveRate = 0.3;
  const falseNegativeRate = 0.5;
  const uncertainRate = 0.2;

  const falsePositives = Math.round(incorrectPredictions * falsePositiveRate);
  const falseNegatives = Math.round(incorrectPredictions * falseNegativeRate);
  const uncertainPredictions =
    incorrectPredictions - (falsePositives + falseNegatives);

  // Pie Chart 數據
  const pieData = [
    {
      name: "Correct Predictions",
      value: correctPredictions,
      fill: "var(--color-accuracy)",
    },
    {
      name: "Incorrect Predictions",
      value: incorrectPredictions,
      fill: "var(--color-failure)",
    },
    { name: "False Positives", value: falsePositives, fill: "#FF9800" }, // 橙色
    { name: "False Negatives", value: falseNegatives, fill: "#E91E63" }, // 粉色
    {
      name: "Uncertain Predictions",
      value: uncertainPredictions,
      fill: "#9C27B0",
    }, // 紫色
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction Accuracy</CardTitle>
        <CardDescription>
          Select a model and version to view accuracy distribution.
        </CardDescription>
        {/* Dropdown Model Selected */}
        <Select
          onValueChange={(value) => setSelectedModel(value)}
          defaultValue={selectedModel}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="modelA">Model A</SelectItem>
            <SelectItem value="modelB">Model B</SelectItem>
          </SelectContent>
        </Select>
        {/* Dropdown Version Selected */}
        <Select
          onValueChange={(value) => setSelectedVersion(value)}
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

      <CardContent className="flex-1 pb-0">
        {/* Pie Chart Division */}
        <ChartContainer
          config={chartConfig2}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={pieData} dataKey="value" nameKey="name" />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div>
          Accuracy Formula: Accuracy = (Correct Predictions / Total Samples) ×
          100%
        </div>
        <div>
          • False Positive (假陽性, FP)：模型錯誤地將負類別預測為正類別
          <br /> • False Negative (假陰性, FN)：模型錯誤地將正類別預測為負類別
          <br /> • Uncertain Predictions (不確定預測)：模型的信心低於某個閾值
        </div>
      </CardFooter>
    </Card>
  );
}
