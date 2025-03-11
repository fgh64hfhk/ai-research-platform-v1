"use client";

import { usePayments } from "./PaymentsProvider";
import { columns } from "./PaymentsColumns";
import { DataTable } from "./DataTable";

export function PaymentsTable() {
  const {
    payments,
    loading,
    error,
    fetchPayments,
    refreshPayments,
    addPayment,
    updatePayment,
    deletePayment,
  } = usePayments();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={fetchPayments}
      >
        Fetch Payments
      </button>

      <button
        className="mb-4 ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={refreshPayments}
      >
        Refresh Payments
      </button>

      <button
        className="mb-4 ml-2 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() =>
          addPayment({
            id: "new123",
            amount: 200,
            status: "pending",
            email: "new@example.com",
            date: "20250310",
          })
        }
      >
        Add Payment
      </button>

      <button
        className="mb-4 ml-2 px-4 py-2 bg-yellow-500 text-white rounded"
        onClick={() =>
          updatePayment({
            id: payments[0]?.id,
            amount: 500,
            status: "success",
            email: "updated@example.com",
            date: "new Date",
          })
        }
      >
        Update First Payment
      </button>

      <button
        className="mb-4 ml-2 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => deletePayment(payments[0]?.id)}
      >
        Delete First Payment
      </button>

      <DataTable columns={columns} data={payments} />
    </div>
  );
}
