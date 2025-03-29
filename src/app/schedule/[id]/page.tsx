"use client";

import { useParams, useRouter } from "next/navigation";
import { useScheduleContext } from "@/app/models/schedule/ScheduleContextProvider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function ScheduleDetailPage() {
  const { state } = useScheduleContext();
  const router = useRouter();
  const params = useParams();
  const scheduleId = params.id as string;

  const schedule = state.schedules.find((s) => s.id === scheduleId);

  if (!schedule) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-semibold">任務詳細資訊</h1>
        <p className="text-destructive">
          找不到該任務，請確認任務 ID 是否正確。
        </p>
        <Button onClick={() => router.back()}>返回清單</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">任務詳細資訊</h1>
        <Button variant="outline" onClick={() => router.push("/schedule")}>
          返回清單
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <Info label="模型 ID" value={schedule.modelId} />
          <Info label="模型版本" value={schedule.version} />
          <Info label="建構日期" value={schedule.buildDate} />
          <Info
            label="排程執行時間"
            value={format(new Date(schedule.runDate), "yyyy-MM-dd HH:mm")}
          />
          <Info
            label="任務狀態"
            value={
              <Badge variant={getStatusBadgeVariant(schedule.status)}>
                {getStatusLabel(schedule.status)}
              </Badge>
            }
          />
          {schedule.createdAt && (
            <Info
              label="建立時間"
              value={format(
                new Date(schedule.createdAt),
                "yyyy-MM-dd HH:mm:ss"
              )}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// 子元件：顯示單行資訊
const Info = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between border-b py-2">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

// 狀態翻譯與 badge 樣式
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
