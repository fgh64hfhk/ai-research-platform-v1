import { Payment } from "./PaymentsColumns";

// 定義 Action 類型
export type PaymentsAction =
  | { type: "FETCH_SUCCESS"; payload: Payment[] }
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "UPDATE_PAYMENT"; payload: Payment }
  | { type: "DELETE_PAYMENT"; payload: string } // 以 ID 刪除
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

// 定義狀態結構
export type PaymentsState = {
  payments: Payment[];
  loading: boolean;
  error: string | null;
};

// 初始狀態
export const initialState: PaymentsState = {
  payments: [],
  loading: false,
  error: null,
};

// `Reducer` 處理 `state`
export function paymentsReducer(
  state: PaymentsState,
  action: PaymentsAction
): PaymentsState {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        payments: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_PAYMENT":
      return { ...state, payments: [action.payload, ...state.payments] };
    case "UPDATE_PAYMENT":
      return {
        ...state,
        payments: state.payments.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PAYMENT":
      return {
        ...state,
        payments: state.payments.filter((p) => p.id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
