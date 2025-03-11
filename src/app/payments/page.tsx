import { PaymentsProvider } from "./PaymentsProvider";
import { PaymentsTable } from "./PaymentsTable";

export default function DemoPage() {
  return (
    <PaymentsProvider>
      <div className="container mx-auto py-10">
        <PaymentsTable />
      </div>
    </PaymentsProvider>
  );
}
