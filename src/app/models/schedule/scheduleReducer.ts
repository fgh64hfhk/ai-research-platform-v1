import { TrainingSchedule } from "./schedule";

// Reducer 狀態型別
export interface ScheduleState {
  schedules: TrainingSchedule[];
}

// Action 類型定義
export type ScheduleAction =
  | { type: "ADD_SCHEDULE"; payload: TrainingSchedule }
  | {
      type: "UPDATE_SCHEDULE";
      payload: TrainingSchedule;
    }
  | { type: "REMOVE_SCHEDULE"; payload: { id: string } };

// 實作 reducer function
export const scheduleReducer = (
  state: ScheduleState,
  action: ScheduleAction
): ScheduleState => {
  switch (action.type) {
    case "ADD_SCHEDULE":
      return {
        ...state,
        schedules: [...state.schedules, action.payload],
      };
    case "UPDATE_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case "REMOVE_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.filter((s) => s.id !== action.payload.id),
      };

    default:
      return state;
  }
};

// 預設的初始狀態與匯出
export const initialScheduleState: ScheduleState = {
  schedules: [],
};
