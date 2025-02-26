import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function TableDemo({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center h-screen p-6">
      <div className="w-[550px]">
        <Table className={cn("w-full", className)}>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium",
                    invoice.paymentStatus === "Paid" &&
                      "bg-green-100 text-green-700",
                    invoice.paymentStatus === "Pending" &&
                      "bg-yellow-100 text-yellow-700",
                    invoice.paymentStatus === "Unpaid" &&
                      "bg-red-100 text-red-700"
                  )}
                >
                  {invoice.paymentStatus}
                </TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="flex items-center space-x-2">
                  NO.{index + 1}
                  <Check className="w-4 h-4 text-green-500" />
                </TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">
                {invoices
                  .reduce(
                    (acc, i) =>
                      acc + parseFloat(i.totalAmount.replace(/[$,]/g, "")),
                    0
                  )
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
