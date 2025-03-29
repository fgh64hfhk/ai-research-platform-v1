'use client';

import { useScheduleContext } from "../models/schedule/ScheduleContextProvider";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { AddScheduleLogic } from "../models/schedule/AddScheduleLogic";

export default function TaskListPage() {
  const { state } = useScheduleContext();
  const router = useRouter();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-h1 font-semibold">排程任務清單</h1>

      <AddScheduleLogic />

      {state.schedules.length === 0 && (
        <p className="text-muted-foreground">目前沒有任何的排程任務。</p>
      )}

      {state.schedules.map((schedule) => (
        <Card key={schedule.id} className="p-4">
          <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div>
              <p className="font-medium">
                {schedule.modelId} - {schedule.version}
              </p>
              <p className="text-sm text-muted-foreground">
                預定執行：
                {format(new Date(schedule.runDate), "yyyy-MM-dd HH:mm")}
              </p>
              <p className="text-sm text-muted-foreground">建構時間：{schedule.buildDate}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant={getStatusBadgeVariant(schedule.status)}>
                {getStatusLabel(schedule.status)}
              </Badge>
              <Button
                variant="outline"
                onClick={() => router.push(`/schedule/${schedule.id}`)}
              >
                檢視
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// 狀態轉換
const getStatusLabel = (status: string) => {
  switch (status) {
    case "scheduled":
      return "已排程";
    case "running":
      return "執行中";
    case "completed":
      return "已完成";
    case "failed":
      return "失敗";

    default:
      return status;
  }
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "scheduled":
      return "secondary";
    case "running":
      return "default";
    case "completed":
      return "success";
    case "failed":
      return "destructive";

    default:
      return "outline";
  }
};
