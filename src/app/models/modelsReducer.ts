import { Model, ModelWithVersion } from "./ModelsColumns";

// 定義 Action 類型
export type ModelsAction =
  | { type: "FETCH_SUCCESS"; payload: ModelWithVersion[] }
  | { type: "ADD_MODEL"; payload: Model }
  | { type: "UPDATE_MODEL"; payload: Model }
  | { type: "DELETE_MODEL"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | {
      type: "SELECT_MODEL_VERSION";
      payload: ModelWithVersion[];
    };

// 定義狀態結構
export type ModelsState = {
  models: ModelWithVersion[];
  loading: boolean;
  error: string | null;
};

// 初始狀態
export const initialState: ModelsState = {
  models: [],
  loading: false,
  error: null,
};

// `Reducer` 處理 `state`
export function modelsReducer(
  state: ModelsState,
  action: ModelsAction
): ModelsState {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        models: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_MODEL":
      return { ...state, models: [action.payload, ...state.models] };
    case "UPDATE_MODEL":
      return {
        ...state,
        models: state.models.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
      };
    case "DELETE_MODEL":
      return {
        ...state,
        models: state.models.filter((m) => m.id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SELECT_MODEL_VERSION":
      return {
        ...state,
        models: action.payload, // 直接更新完整的 models 陣列
      };
    default:
      return state;
  }
}
