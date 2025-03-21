import { Button } from "@/components/ui/button";
import { ModelsProvider } from "./ModelsProvider";
import { ModelsTable } from "./ModelsTable";
import { Rocket } from "lucide-react";

import AddModelDialog from "./components/AddModelDialog";
import AddModelVersionLogic from "./model-version/AddModelVersionLogic";

export default function ModelPage() {
  return (
    <ModelsProvider>
      {/* 標題 & 按鈕區塊 */}
      <div className="flex items-center justify-between m-4">
        {/* 標題區塊 */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Manage Your Models
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View, edit, and manage your AI models efficiently.
          </p>
        </div>
        {/* 右側按鈕區塊 */}
        <div className="flex space-x-3">
          <AddModelDialog />
          <AddModelVersionLogic />

          <Button
            disabled={true}
            variant="outline"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <Rocket className="w-5 h5" />
            Deploy All
          </Button>
        </div>
      </div>

      <ModelsTable />
    </ModelsProvider>
  );
}
