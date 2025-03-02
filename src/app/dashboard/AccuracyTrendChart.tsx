"use client";

import { useState } from "react";

import { CartesianGrid, Line, LineChart, XAxis, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { version: "v1.0", timestamp: "2025-02-28", modelA: 78.5, modelB: 76.2 },
  { version: "v1.1", timestamp: "2025-03-01", modelA: 82.3, modelB: 79.8 },
  { version: "v2.0", timestamp: "2025-03-05", modelA: 88.7, modelB: 84.1 },
  { version: "v2.1", timestamp: "2025-03-10", modelA: 90.2, modelB: 86.5 },
];

const chartConfig = {
  modelA: {
    label: "Model A",
    color: "hsl(var(--chart-1))",
  },
  modelB: {
    label: "Model B",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function AccuracyTrendChart() {
  const [useVersion, setUseVersion] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Accuracy Trend</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span className="ml-2">Select X-Axis Display:</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={useVersion}
              onCheckedChange={() => setUseVersion(!useVersion)}
            />
            <span>Use Model Version (Uncheck to use Timestamp)</span>
          </label>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={useVersion ? "version" : "timestamp"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Legend
              formatter={(value) =>
                value === "modelA" ? "Model A" : "Model B"
              }
            />
            <Line
              dataKey="modelA"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="modelB"
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items center gap-2 font-medium leading-none">
              Accuracy Formula: Accuracy = (Correct Predictions / Total Samples)
              x 100%
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Displays accuracy trends across different model versions.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
