"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

import { modelsReducer, initialState, ModelsState } from "./modelsReducer";

import { Model, ModelVersion, ModelWithLatestVersion } from "./ModelsColumns";

import { getLatestModelVersions } from "./getLatestModelVersions";

interface ModelsContextType extends ModelsState {
  fetchModels: () => void;
  addModel: (model: Model) => void;
  updateModel: (model: Model) => void;
  deleteModel: (id: string) => void;
  refreshModels: () => void;
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
    trainingTime: 95, // 時間以分鐘為單位
    buildDate: "2024-04-23",
    status: "Deployment Failed",
  },
  {
    modelId: "TRN001",
    version: "v1.1",
    modifiedDate: "2024-06-01",
    modifiedType: "Hyperparameter Tuning",
    trainingTime: 100,
    buildDate: "2024-06-01",
    status: "Deployed",
  },
  {
    modelId: "TRN001",
    version: "v2.0",
    modifiedDate: "2024-06-10",
    modifiedType: "Added New Dataset",
    trainingTime: 120,
    buildDate: "2024-06-05",
    status: "Training",
  },
  {
    modelId: "TRN002",
    version: "v1.0",
    modifiedDate: "2025-09-08",
    modifiedType: "Initial Release",
    trainingTime: 135,
    buildDate: "2025-09-08",
    status: "Deployment Canceled",
  },
  {
    modelId: "TRN002",
    version: "v1.1",
    modifiedDate: "2025-10-01",
    modifiedType: "Bug Fixes",
    trainingTime: 140,
    buildDate: "2025-10-01",
    status: "Pending Deployment",
  },
  {
    modelId: "TRN003",
    version: "v1.0",
    modifiedDate: "2023-11-30",
    modifiedType: "Initial Release",
    trainingTime: 60,
    buildDate: "2023-11-30",
    status: "Scheduled",
  },
  {
    modelId: "TRN003",
    version: "v2.0",
    modifiedDate: "2023-12-30",
    modifiedType: "Added Dataset",
    trainingTime: 75,
    buildDate: "2023-12-30",
    status: "Inactive",
  },
  {
    modelId: "TRN003",
    version: "v2.1",
    modifiedDate: "2024-02-28", // 修正錯誤日期
    modifiedType: "Adjusted Epochs",
    trainingTime: 80,
    buildDate: "2024-02-28",
    status: "Scheduled",
  },
  {
    modelId: "TRN004",
    version: "v1.0",
    modifiedDate: "2023-11-30",
    modifiedType: "Initial Release",
    trainingTime: 90,
    buildDate: "2023-11-30",
    status: "Training",
  },
  {
    modelId: "TRN004",
    version: "v1.1",
    modifiedDate: "2024-09-30",
    modifiedType: "Performance Optimization",
    trainingTime: 50,
    buildDate: "2024-09-30",
    status: "Deployed",
  },
];

// 取得最新的版本
const latestModelVersions = getLatestModelVersions(modelsData, modelVersionsData);
console.log(latestModelVersions);

async function fetchModelsAPI(): Promise<ModelWithLatestVersion[]> {
  try {
    // const res = await fetch("/api/payments");
    // if (!res.ok) throw new Error("Failed to fetch payments");
    // return await res.json();

    if (!modelsData) throw new Error("Failed to fetch models");

    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(latestModelVersions);
      }, 1000);
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 建立 Provider
export function ModelsProvider({ children }: { children: React.ReactNode }) {
  const [models, dispatch] = useReducer(modelsReducer, initialState);

  // 讀取數據
  const fetchModels = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await fetchModelsAPI();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: `Failed to load payments: ${err}`,
      });
    }
  };

  // 新增付款
  const addModel = (model: Model) => {
    dispatch({ type: "ADD_MODEL", payload: model });
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
        ...models,
        fetchModels,
        refreshModels: fetchModels,
        addModel,
        updateModel,
        deleteModel,
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
