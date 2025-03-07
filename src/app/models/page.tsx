import { Model, ModelVersion, columns, versionColumns } from "./components/columns";
import { DataTable } from "./components/data-table";

async function getData(): Promise<Model[]> {
  // Fetch data from your API here.
  return [
    {
      id: "TRN001",
      name: "Model_A",
      version: "v_1.0",
      language: "python",
      trainingTime: 95,
      buildDate: "20240523",
      status: "Deployment Failed",
    },
    {
      id: "TRN002",
      name: "Model_B",
      version: "v_1.0",
      language: "python",
      trainingTime: 135,
      buildDate: "20250908",
      status: "Deployed",
    },
    {
      id: "TRN003",
      name: "Model_C",
      version: "v_1.0",
      language: "python",
      trainingTime: 25,
      buildDate: "20231130",
      status: "Training",
    },
    {
      id: "TRN004",
      name: "Model_D",
      version: "v_1.0",
      language: "python",
      trainingTime: 185,
      buildDate: "20241009",
      status: "Deployment Canceled",
    },
    {
      id: "TRN005",
      name: "Model_E",
      version: "v_1.0",
      language: "python",
      trainingTime: 195,
      buildDate: "20240314",
      status: "Pending Deployment",
    },
    {
      id: "TRN006",
      name: "Model_F",
      version: "v_1.0",
      language: "python",
      trainingTime: 125,
      buildDate: "20240218",
    },
  ];
}

async function getModelVersion(modelId: string): Promise<ModelVersion[]> {
  // 模擬 API 請求
  const allVersions: ModelVersion[] = [
    {
      modelId: "Model_A",
      version: "v1.0",
      modifiedDate: "20240523",
      modifiedType: "Initial Release",
      status: "Failed",
    },
    {
      modelId: "Model_A",
      version: "v1.1",
      modifiedDate: "20240601",
      modifiedType: "Hyperparameter Tuning",
      status: "Deployed",
    },
    {
      modelId: "Model_A",
      version: "v2.0",
      modifiedDate: "20240610",
      modifiedType: "Added New Dataset",
      status: "Scheduled",
    },
    {
      modelId: "Model_B",
      version: "v1.0",
      modifiedDate: "20250908",
      modifiedType: "Initial Release",
      status: "Deployed",
    },
    {
      modelId: "Model_B",
      version: "v1.1",
      modifiedDate: "20251001",
      modifiedType: "Bug Fixes",
      status: "Inactive",
    },
  ];

  // 篩選符合 `modelId` 的版本
  return allVersions.filter((version) => version.modelId === modelId);
}

export default async function Models() {
  const data = await getData();
  const modelVersionData = await getModelVersion("Model_B");
  return (
    <div className="p-6 space-y-6">
      {/* 標題 & 按鈕區塊 */}
      <div className="flex items-center justify-between">
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
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Add Model
          </button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Manage Versions
          </button>
        </div>
      </div>

      {/* 模型管理內容區塊 */}
      <section className="space-y-4">
        {/* 模型列表 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
            Model Data Table
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <DataTable columns={columns} data={data} filterColumnKey="name" filterPlaceholder="Filter Model Name" />
            </div>
          </div>
        </div>

        {/* 版本控制 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
            Version Control
          </h2>
          <div className="grid grid-cols-1 gap-6">
            
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <DataTable columns={versionColumns} data={modelVersionData} filterColumnKey="version" filterPlaceholder="Filter Model Version" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
