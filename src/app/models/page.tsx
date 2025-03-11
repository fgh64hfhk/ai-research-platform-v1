import { ModelsProvider } from "./ModelsProvider";
import { ModelsTable } from "./ModelsTable";

export default function ModelPage() {
  return (
    <ModelsProvider>
      <div className="container mx-auto py-10">
        <ModelsTable />
      </div>
    </ModelsProvider>
  );
}

// import { useState } from "react";

// import {
//   Model,
//   ModelVersion,
//   getModelColumns,
//   getVersionColumns,
// } from "./components/columns";

// import { DataTable } from "./components/data-table";

// import { Upload, Rocket } from "lucide-react";
// import { Button } from "@/components/ui/button";

// // 模型資料 (models)
// const models: Model[] = [
//   {
//     id: "TRN001",
//     name: "Model_A",
//     language: "python",
//     description: "First AI model",
//   },
//   {
//     id: "TRN002",
//     name: "Model_B",
//     language: "java",
//     description: "Java-based AI",
//   },
//   {
//     id: "TRN003",
//     name: "Model_C",
//     language: "python",
//     description: "Lightweight AI model",
//   },
//   {
//     id: "TRN004",
//     name: "Model_D",
//     language: "python",
//     description: "High-performance model",
//   },
//   {
//     id: "TRN005",
//     name: "Model_E",
//     language: "c++",
//     description: "Optimized for edge computing",
//   },
//   {
//     id: "TRN006",
//     name: "Model_F",
//     language: "python",
//     description: "NLP model",
//   },
// ];

// // 模型版本資料 (modelVersions) 使用 key-value 結構
// const modelVersions: Record<string, ModelVersion[]> = {
//   TRN001: [
//     {
//       modelId: "TRN001",
//       version: "v1.0",
//       modifiedDate: "20240523",
//       modifiedType: "Initial Release",
//       trainingTime: 95,
//       buildDate: "20240523",
//       status: "Deployment Failed",
//     },
//     {
//       modelId: "TRN001",
//       version: "v1.1",
//       modifiedDate: "20240601",
//       modifiedType: "Hyperparameter Tuning",
//       trainingTime: 100,
//       buildDate: "20240601",
//       status: "Deployed",
//     },
//     {
//       modelId: "TRN001",
//       version: "v2.0",
//       modifiedDate: "20240610",
//       modifiedType: "Added New Dataset",
//       trainingTime: 120,
//       buildDate: "20240610",
//       status: "Training",
//     },
//   ],
//   TRN002: [
//     {
//       modelId: "TRN002",
//       version: "v1.0",
//       modifiedDate: "20250908",
//       modifiedType: "Initial Release",
//       trainingTime: 135,
//       buildDate: "20250908",
//       status: "Deployment Canceled",
//     },
//     {
//       modelId: "TRN002",
//       version: "v1.1",
//       modifiedDate: "20251001",
//       modifiedType: "Bug Fixes",
//       trainingTime: 140,
//       buildDate: "20251001",
//       status: "Pending Deployment",
//     },
//   ],
//   TRN003: [
//     {
//       modelId: "TRN003",
//       version: "v1.0",
//       modifiedDate: "20231130",
//       modifiedType: "Initial Release",
//       trainingTime: 25,
//       buildDate: "20231130",
//       status: "Scheduled",
//     },
//     {
//       modelId: "TRN003",
//       version: "v2.0",
//       modifiedDate: "20231230",
//       modifiedType: "Add Dataset",
//       trainingTime: 30,
//       buildDate: "20231230",
//       status: "Inactive",
//     },
//     {
//       modelId: "TRN003",
//       version: "v2.1",
//       modifiedDate: "20240230",
//       modifiedType: "Adjust Epoch",
//       trainingTime: 35,
//       buildDate: "20240230",
//       status: "Scheduled",
//     },
//   ],
//   TRN004: [
//     {
//       modelId: "TRN004",
//       version: "v1.0",
//       modifiedDate: "20231130",
//       modifiedType: "Initial Release",
//       trainingTime: 35,
//       buildDate: "20240930",
//       status: "Training",
//     },
//     {
//       modelId: "TRN004",
//       version: "v1.1",
//       modifiedDate: "20231130",
//       modifiedType: "Initial Release",
//       trainingTime: 25,
//       buildDate: "20231130",
//     },
//   ],
// };

// export default function Models() {
//   const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

//   const handleModelClick = (modelId: string) => {
//     console.log("Selected Model:", modelId);
//     setSelectedModelId(modelId);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* 標題 & 按鈕區塊 */}
//       <div className="flex items-center justify-between">
//         {/* 標題區塊 */}
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//             Manage Your Models
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             View, edit, and manage your AI models efficiently.
//           </p>
//         </div>
//         {/* 右側按鈕區塊 */}
//         <div className="flex space-x-2">
//           <Button
//             variant="secondary"
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//           >
//             <Upload className="w-5 h-5" />
//             Upload Model
//           </Button>
//           <Button
//             disabled={true}
//             variant="outline"
//             className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//           >
//             <Rocket className="w-5 h5" />
//             Deploy All
//           </Button>
//         </div>
//       </div>

//       {/* 模型管理內容區塊 */}
//       <section className="space-y-4">
//         {/* 模型列表 */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
//             Model Data Table
//           </h2>
//           <div className="grid grid-cols-1 gap-6">
//             <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
//               <DataTable
//                 columnsAction={getModelColumns}
//                 model={models}
//                 modelVersions={modelVersions}
//                 filterColumnKey="name"
//                 filterPlaceholder="Filter Model Name"
//                 onModelClickAction={handleModelClick}
//               />
//             </div>
//           </div>
//         </div>

//         {/* 版本控制 */}
//         {selectedModelId && (
//           <div className="mt-6">
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
//               Version Control
//             </h2>
//             <div className="grid grid-cols-1 gap-6">
//               <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
//                 {modelVersions[selectedModelId] ? (
//                   <DataTable
//                     columnsAction={getVersionColumns}
//                     model={modelVersions[selectedModelId]}
//                     modelVersions={modelVersions}
//                     filterColumnKey="version"
//                     filterPlaceholder="Filter Model Version"
//                     description={models.find((m) => m.id === selectedModelId)?.description}
//                     onModelClickAction={handleModelClick}
//                   />
//                 ) : (
//                   <div className="text-lg">This Model has no Version.</div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
