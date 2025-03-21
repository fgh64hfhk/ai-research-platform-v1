"use client";

import { useModels } from "./ModelsProvider";
import { columns } from "./ModelsColumns";
import { DataTable } from "./DataTable";

export function ModelsTable() {
  const {
    models,
    loading,
    error,
    fetchModels,
    refreshModels,
    addTempModel,
    updateModel,
    deleteModel,
  } = useModels();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="m-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={fetchModels}
      >
        Fetch Models
      </button>

      <button
        className="mb-4 ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={refreshModels}
      >
        Refresh Models
      </button>

      <button
        className="mb-4 ml-2 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() =>
          addTempModel({
            id: "ID_new",
            name: "TRN_new",
            language: "LAN_new",
            description: "DES_new",
          })
        }
      >
        Add New Model
      </button>

      <button
        className="mb-4 ml-2 px-4 py-2 bg-yellow-500 text-white rounded"
        onClick={() =>
          updateModel({
            id: models[0]?.id,
            name: "TRN_update",
            language: "LAN_update",
            description: "DES_update",
          })
        }
      >
        Update First Model
      </button>

      <button
        className="mb-4 ml-2 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => deleteModel(models[0]?.id)}
      >
        Delete First Model
      </button>

      <DataTable columns={columns} data={models} />
    </div>
  );
}
