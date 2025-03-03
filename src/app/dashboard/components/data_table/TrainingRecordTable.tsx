import { Training, columns } from "./columns";
import { DataTable } from "./data-table";

async function getDate(): Promise<Training[]> {
  return [
    {
      id: "TRN001",
      name: "ResNet-50",
      status: "success",
      duration: 135,
      date: "2024-02-25",
    },
    {
      id: "TRN002",
      name: "BERT-base",
      status: "pending",
      duration: 45,
      date: "2024-02-26",
    },
    {
      id: "TRN003",
      name: "GPT-3",
      status: "processing",
      duration: 365,
      date: "2024-02-27",
    },
    {
      id: "TRN004",
      name: "Sonnia-5",
      status: "failed",
      duration: 453,
      date: "2024-02-28",
    },
  ];
}

export default async function TrainingRecordTable() {
  const data = await getDate();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold">Training Record</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
