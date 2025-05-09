"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { modelsReducer, initialState, ModelsState } from "./modelsReducer";

import {
  Model,
  ModelStatus,
  ModelVersion,
  ModelWithVersion,
} from "./ModelsColumns";

import { getLatestVersionModels } from "./getLatestVersionModels";
import { getAllModelVersionNumbers } from "./getAllModelVersionNumbers";
import { findModelVersion } from "./findModelVersion";

interface ModelsContextType extends ModelsState {
  allModelVersionNumbers: Record<string, string[]>;
  fetchModels: () => void;
  addTempModel: (model: Model) => void;
  addFinalModel: (modelWithVersion: ModelWithVersion) => void;
  updateModel: (model: Model) => void;
  deleteModel: (id: string) => void;
  refreshModels: () => void;
  selectModelVersion: (modelId: string, versionNumber: string) => void;
}

const ModelsContext = createContext<ModelsContextType | undefined>(undefined);

const modelsData: Model[] = [
  {
    id: "TRN001",
    name: "Model_A",
    language: "python",
    description: "First AI model",
  },
  {
    id: "TRN002",
    name: "Model_B",
    language: "java",
    description: "Java-based AI",
  },
  {
    id: "TRN003",
    name: "Model_C",
    language: "python",
    description: "Lightweight AI model",
  },
  {
    id: "TRN004",
    name: "Model_D",
    language: "python",
    description: "High-performance model",
  },
  {
    id: "TRN005",
    name: "Model_E",
    language: "c++",
    description: "Optimized for edge computing",
  },
  {
    id: "TRN006",
    name: "Model_F",
    language: "python",
    description: "NLP model",
  },
];

const modelVersionsData: ModelVersion[] = [
  {
    modelId: "TRN001",
    version: "v1.0",
    modifiedDate: "2024-05-23",
    modifiedType: "Initial Release",
    trainingTime: 95,
    buildDate: "20240423",
    status: ModelStatus.DEPLOYED,
  },
  {
    modelId: "TRN001",
    version: "v1.1",
    modifiedDate: "2024-06-01",
    modifiedType: "Hyperparameter Tuning",
    trainingTime: 100,
    buildDate: "20240501",
    status: ModelStatus.DEPLOYMENT_CANCELED,
  },
  {
    modelId: "TRN001",
    version: "v2.0",
    modifiedDate: "2024-06-30",
    modifiedType: "Added New Dataset",
    trainingTime: 120,
    buildDate: "20240530",
    status: ModelStatus.DEPLOYMENT_FAILED,
  },
  {
    modelId: "TRN002",
    version: "v1.0",
    modifiedDate: "2025-09-08",
    modifiedType: "Initial Release",
    trainingTime: 135,
    buildDate: "20250808",
    status: ModelStatus.INACTIVE,
  },
  {
    modelId: "TRN002",
    version: "v1.1",
    modifiedDate: "2025-10-01",
    modifiedType: "Bug Fixes",
    trainingTime: 140,
    buildDate: "20250901",
    status: ModelStatus.PENDING_DEPLOYMENT,
  },
  {
    modelId: "TRN003",
    version: "v1.0",
    modifiedDate: "2023-11-30",
    modifiedType: "Initial Release",
    trainingTime: 60,
    buildDate: "20231030",
    status: ModelStatus.SCHEDULED,
  },
  {
    modelId: "TRN003",
    version: "v2.0",
    modifiedDate: "2023-12-30",
    modifiedType: "Added Dataset",
    trainingTime: 75,
    buildDate: "20231130",
    status: ModelStatus.TRAINING,
  },
  {
    modelId: "TRN003",
    version: "v2.1",
    modifiedDate: "2024-02-28",
    modifiedType: "Adjusted Epochs",
    trainingTime: 80,
    buildDate: "20240128",
    status: ModelStatus.DEPLOYED,
  },
  {
    modelId: "TRN004",
    version: "v1.0",
    modifiedDate: "2023-11-30",
    modifiedType: "Initial Release",
    trainingTime: 90,
    buildDate: "20231030",
    status: ModelStatus.DEPLOYMENT_CANCELED,
  },
  {
    modelId: "TRN004",
    version: "v1.1",
    modifiedDate: "2024-09-30",
    modifiedType: "Performance Optimization",
    trainingTime: 50,
    buildDate: "20240230",
    status: ModelStatus.DEPLOYMENT_FAILED,
  },
];

// 取得每個模型的最新版本
const latestModelVersions: ModelWithVersion[] = getLatestVersionModels(
  modelsData,
  modelVersionsData
);
console.log(latestModelVersions);

// 取得所有模型的所有版本號
const allModelVersionNumbers: Record<string, string[]> =
  getAllModelVersionNumbers(modelVersionsData);
console.log(allModelVersionNumbers);

async function fetchModelsAPI(
  modelId?: string,
  version?: string,
  models?: ModelWithVersion[]
): Promise<{
  models: ModelWithVersion[];
  versionMap: Record<string, string[]>;
}> {
  try {
    if (!latestModelVersions) throw new Error("Failed to fetch models");

    return await new Promise((resolve) => {
      setTimeout(() => {
        if (!modelId || !version || !models) {
          // 首次調用 API，返回所有模型的最新版本 & 版本號映射
          resolve({
            models: latestModelVersions,
            versionMap: allModelVersionNumbers,
          });
        } else {
          // 模擬呼叫帶有參數的 API 取得該模型對應的版本號碼
          const versionData = findModelVersion(
            modelId,
            version,
            modelVersionsData
          );
          if (!versionData) {
            console.error(`Version ${version} for model ${modelId} not found.`);
            resolve({
              models: latestModelVersions,
              versionMap: allModelVersionNumbers,
            });
          }
          // 更新特定模型的版本，不影響其他模型
          const updateModels = models.map((model) =>
            model.id === modelId
              ? {
                  ...model,
                  modelVersion: versionData,
                }
              : model
          );
          resolve({
            models: updateModels,
            versionMap: allModelVersionNumbers,
          });
        }
      }, 1000);
    });
  } catch (error) {
    console.error(error);
    return { models: [], versionMap: {} };
  }
}

// 建立 Provider
export function ModelsProvider({ children }: { children: React.ReactNode }) {
  const [data, dispatch] = useReducer(modelsReducer, initialState);
  const [allModelVersionNumbers, setAllModelVersionNumbers] = useState<
    Record<string, string[]>
  >({});

  // 讀取數據（首次載入）
  const fetchModels = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const { models, versionMap } = await fetchModelsAPI();
      dispatch({ type: "FETCH_SUCCESS", payload: models });
      setAllModelVersionNumbers(versionMap); // 存入全域狀態
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: `Failed to load payments: ${err}`,
      });
    }
  };

  const updatedModels = data.models;

  // 更新特定模型的版本
  const selectModelVersion = async (modelId: string, versionNumber: string) => {
    try {
      const { models } = await fetchModelsAPI(
        modelId,
        versionNumber,
        updatedModels
      );
      dispatch({
        type: "SELECT_MODEL_VERSION",
        payload: models, // 更新整個 models 陣列
      });
    } catch (error) {
      console.error("Failed to update model version:", error);
    }
  };

  // 新增暫存模型
  const addTempModel = (model: Model) => {
    dispatch({ type: "ADD_MODEL_TEMP", payload: model });
    sessionStorage.setItem("tempModel", JSON.stringify(model));
    console.log("已儲存模型至 sessionStorage:", model);

    sessionStorage.setItem("hasOpenedVersionDialog", "false");

    // 手動觸發 CustomEvent，讓其他組件監聽
    window.dispatchEvent(new Event("sessionStorageUpdated"));
  };

  // 新增完整模型
  const addFinalModel = (modelWithVersion: ModelWithVersion) => {
    setAllModelVersionNumbers((prev) => {
      if (!modelWithVersion.modelVersion) return prev; // 直接返回舊的狀態
      return {
        ...prev,
        [modelWithVersion.id]: [
          ...(prev[modelWithVersion.id] || []),
          modelWithVersion.modelVersion.version,
        ],
      };
    });

    dispatch({ type: "ADD_MODEL_FINAL", payload: modelWithVersion });
  };

  // 更新付款
  const updateModel = (model: Model) => {
    dispatch({ type: "UPDATE_MODEL", payload: model });
  };

  // 刪除付款
  const deleteModel = (id: string) => {
    dispatch({ type: "DELETE_MODEL", payload: id });
  };

  // 初始化數據
  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <ModelsContext.Provider
      value={{
        ...data,
        allModelVersionNumbers,
        fetchModels,
        refreshModels: fetchModels,
        addTempModel,
        addFinalModel,
        updateModel,
        deleteModel,
        selectModelVersion,
      }}
    >
      {children}
    </ModelsContext.Provider>
  );
}

// Hook 讓組件使用 Context
export function useModels() {
  const context = useContext(ModelsContext);
  if (!context)
    throw new Error("useModels must be used within a ModelsProvider");
  return context;
}
