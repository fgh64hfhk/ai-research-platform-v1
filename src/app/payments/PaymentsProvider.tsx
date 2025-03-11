"use client";

import {
  createContext,
  useContext,
  useEffect,
  //   useState,
  useReducer,
} from "react";
import {
  paymentsReducer,
  initialState,
  PaymentsState,
  //   PaymentsAction,
} from "./paymentsReducer";
import { Payment } from "./PaymentsColumns";

interface PaymentsContextType extends PaymentsState {
  fetchPayments: () => void;
  addPayment: (payment: Payment) => void;
  updatePayment: (payment: Payment) => void;
  deletePayment: (id: string) => void;
  refreshPayments: () => void;
}

const PaymentsContext = createContext<PaymentsContextType | undefined>(
  undefined
);

const paymentsData: Payment[] = [
  {
    id: "PAY001",
    amount: 250.0,
    status: "success",
    email: "alice@example.com",
    date: "2024-02-25",
  },
  {
    id: "PAY002",
    amount: 120.5,
    status: "pending",
    email: "bob@example.com",
    date: "2024-02-26",
  },
  {
    id: "PAY003",
    amount: 500.75,
    status: "processing",
    email: "charlie@example.com",
    date: "2024-02-27",
  },
  {
    id: "PAY004",
    amount: 90.0,
    status: "failed",
    email: "david@example.com",
    date: "2024-02-28",
  },
  {
    id: "PAY005",
    amount: 320.25,
    status: "success",
    email: "emma@example.com",
    date: "2024-02-29",
  },
];

async function fetchPaymentsAPI(): Promise<Payment[]> {
  try {
    // const res = await fetch("/api/payments");
    // if (!res.ok) throw new Error("Failed to fetch payments");
    // return await res.json();

    if (!paymentsData) throw new Error("Failed to fetch payments");

    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(paymentsData);
      }, 1000);
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 建立 Provider
export function PaymentsProvider({ children }: { children: React.ReactNode }) {
  //   const [payments, setPayments] = useState<Payment[]>([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);
  const [payments, dispatch] = useReducer(paymentsReducer, initialState);

  // 讀取數據
  const fetchPayments = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await fetchPaymentsAPI();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: `Failed to load payments: ${err}`,
      });
    }
  };

  // 新增付款
  const addPayment = (payment: Payment) => {
    dispatch({ type: "ADD_PAYMENT", payload: payment });
  };

  // 更新付款
  const updatePayment = (payment: Payment) => {
    dispatch({ type: "UPDATE_PAYMENT", payload: payment });
  };

  // 刪除付款
  const deletePayment = (id: string) => {
    dispatch({ type: "DELETE_PAYMENT", payload: id });
  };

  // 初始化數據
  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <PaymentsContext.Provider
      value={{
        ...payments,
        fetchPayments,
        refreshPayments: fetchPayments,
        addPayment,
        updatePayment,
        deletePayment,
      }}
    >
      {children}
    </PaymentsContext.Provider>
  );
}

// Hook 讓組件使用 Context
export function usePayments() {
  const context = useContext(PaymentsContext);
  if (!context)
    throw new Error("usePayments must be used within a PaymentsProvider");
  return context;
}
