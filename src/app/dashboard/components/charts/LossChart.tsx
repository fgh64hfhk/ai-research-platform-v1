"use client";

import { TrendingDown } from "lucide-react";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = Array.from({ length: 20 }, (_, i) => ({
  epoch: `Epoch ${i + 1}`,
  trainingLoss: parseFloat((0.9 - i * 0.04).toFixed(2)),
  validationLoss: parseFloat((0.95 - i * 0.037).toFixed(2)),
}));

const chartConfig = {
  trainingLoss: {
    label: "Training Loss",
    color: "hsl(var(--chart-1))",
  },
  validationLoss: {
    label: "Validation Loss",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const LossChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loss Over Time</CardTitle>
        <CardDescription>
          Tracking model loss over training epochs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="epoch"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              type="linear"
              dataKey="trainingLoss"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="linear"
              dataKey="validationLoss"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Loss decreased by 7.3% over last 20 epochs{" "}
          <TrendingDown className="h-4 w-4 text-red-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Training & Validation Loss Trends
        </div>
      </CardFooter>
    </Card>
  );
};

export default LossChart;
