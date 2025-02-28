"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SonnerDemo() {
  const formattedDate = new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  const handleShowToast = () => {
    toast("活動已建立！", {
      description: `時間： ${formattedDate}`,
      action: {
        label: "復原",
        onClick: () => alert("操作已復原！"),
      },
      duration: 3000,
      style: {
        backgroundColor: "#2563eb", // Tailwind bg-blue-600
        color: "#ffffff", // Tailwind text-white
        fontWeight: "bold", // Tailwind font-bold
        padding: "16px", // Tailwind p-4
        borderRadius: "8px", // Tailwind rounded-lg
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Tailwind shadow-lg
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 p-6">
      <Button variant="default" size="lg" onClick={handleShowToast}>
        Show Toast
      </Button>
    </div>
  );
}
