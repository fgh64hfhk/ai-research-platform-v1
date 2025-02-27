import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getDate(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
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
}

export default async function DemoPage() {
  const data = await getDate();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold">Payments</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
