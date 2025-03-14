import React from "react";

import { Badge } from "@/components/ui/badge";

// 狀態顏色函數
const getModelStatusColor = (status: string | undefined) => {
  switch (status) {
    case "Deployment Failed":
      return "bg-red-500 text-white hover:bg-red-100 hover:text-red-500"; // ❌
    case "Deployed":
      return "bg-green-500 text-white hover:bg-green-100 hover:text-green-500"; // ✅
    case "Training":
      return "bg-yellow-500 text-white hover:bg-yellow-100 hover:text-yellow-500"; // ⏳
    case "Deployment Canceled":
      return "bg-gray-500 text-white hover:bg-gray-100 hover:text-gray-500"; // 🚫
    case "Pending Deployment":
      return "bg-blue-500 text-white hover:bg-blue-100 hover:text-blue-500"; // ⚪
    case "Scheduled":
      return "bg-orange-500 text-white hover:bg-orange-100 hover:text-orange-500";
    case "Inactive":
      return "bg-lime-500 text-white hover:bg-lime-100 hover:text-lime-500";
    default:
      return "bg-white text-black hover:bg-black hover:text-white"; // 預設樣式
  }
};

// ModelStatusBadge 組件
export const ModelStatusBadge: React.FC<{ status?: string }> = ({ status }) => {
    const displayStatus = status || "Default";
    return (
      <Badge className={getModelStatusColor(displayStatus)}>
        {displayStatus}
      </Badge>
    );
};