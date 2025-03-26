import { useScheduleContext } from "./ScheduleContextProvider";
import { ScheduleFormValues } from "./scheduleSchema";
import { TrainingSchedule } from "./schedule";

import { v4 as uuidv4 } from "uuid";

export const useScheduleSubmit = () => {
  const { dispatch } = useScheduleContext();

  const submitSchedule = (data: ScheduleFormValues) => {
    // 模擬 API 回傳的完整排程資料（包含 id 與 status）
    const newSchedule: TrainingSchedule = {
      id: uuidv4(),
      modelId: data.modelId,
      version: data.version,
      buildDate: data.buildDate,
      runDate: data.runDate,
      status: "scheduled",
    };

    // 呼叫 reducer 新增排程
    dispatch({
      type: "ADD_SCHEDULE",
      payload: newSchedule,
    });

    // 後續可以回傳結果給外部呼叫者（例如讓對話匡關閉）
    return newSchedule;
  };

  return {
    submitSchedule,
  };
};
