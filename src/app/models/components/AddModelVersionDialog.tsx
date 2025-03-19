"use client";
import { useState, useEffect, JSX } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Model,
  ModelVersion,
  ModelStatus,
  ModelWithVersion,
} from "../ModelsColumns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useModels } from "../ModelsProvider";
import { Upload } from "lucide-react";

/**
 * AddModelVersionDialog - A form dialog for adding a new version to a model.
 *
 * @param {object} props - Component props
 * @param {(version: ModelVersion) => void} props.onSubmit - Callback function to handle the submission of a new model version
 * @returns {JSX.Element} The dialog component for adding a model version.
 */

export default function AddModelVersionDialog(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEditModel, setCurrentEditModel] = useState<Model | null>(null);
  const [version, setVersion] = useState("");
  const [modifiedType, setModifiedType] = useState("");
  const [trainingTime, setTrainingTime] = useState("");
  const [status, setStatus] = useState<ModelStatus | undefined>(undefined);

  const { addFinalModel } = useModels();

  // 監聽 sessionStorageUpdated 事件來更新選取的模型
  useEffect(() => {
    const checkNewModel = () => {
      const storedModel = sessionStorage.getItem("tempModel");
      if (storedModel) {
        const parsedModel = JSON.parse(storedModel);
        if (parsedModel.id !== currentEditModel?.id) {
          // 只有在不同模型時才更新
          setTimeout(() => {
            setCurrentEditModel(JSON.parse(storedModel));
            setIsOpen(true); // 自動開啟對話框
          }, 0); // 🔥 這樣確保 setState 在 effect 階段執行，而不是 render 階段
        }
      }
    };

    checkNewModel(); // 🚨 這行在 render 階段被執行，現在它不會同步修改狀態了

    window.addEventListener("sessionStorageUpdated", checkNewModel);
    return () => {
      window.removeEventListener("sessionStorageUpdated", checkNewModel);
    };
  }, [currentEditModel?.id]); // 🔥 只有 `currentEditModel` 變更時，才執行這個 effect

  const handleSave = () => {
    if (
      !currentEditModel ||
      !version ||
      !modifiedType ||
      !trainingTime ||
      !status
    ) {
      alert("請填寫完整的版本資訊！");
      return;
    }

    const newModelVersion: ModelVersion = {
      modelId: currentEditModel.id,
      version,
      modifiedDate: new Date().toISOString().split("T")[0], // 自動填入當前日期
      modifiedType,
      trainingTime: Number(trainingTime),
      buildDate: new Date().toISOString().split("T")[0], // 預設 buildDate 為今天
      status,
    };

    const newModelWithVersion: ModelWithVersion = {
      ...currentEditModel,
      modelVersion: newModelVersion,
    };
    console.log("新增模型版本:", newModelWithVersion);

    addFinalModel(newModelWithVersion);

    // 清除正在編輯的模型狀態
    setCurrentEditModel(null);

    setIsOpen(false);
  };
  return (
    <div className="flex items-center justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={currentEditModel ? false : true}
          >
            <Upload className="w-5 h-5" />
            新增模型版本
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>新增模型版本</DialogTitle>
            <DialogDescription>
              {currentEditModel
                ? `請為 ${currentEditModel.name} 設定版本資訊`
                : "請先選擇一個模型"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* 版本號 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="version" className="text-right">
                版本號
              </Label>
              <Input
                id="version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="col-span-3"
                placeholder="例如 v1.0, v2.0"
              />
            </div>

            {/* 修改類型 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modifiedType" className="text-right">
                修改類型
              </Label>
              <Input
                id="modifiedType"
                value={modifiedType}
                onChange={(e) => setModifiedType(e.target.value)}
                className="col-span-3"
                placeholder="例如 Bug 修復, 增加數據集"
              />
            </div>

            {/* 訓練時間 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trainingTime" className="text-right">
                訓練時間
              </Label>
              <Input
                id="trainingTime"
                type="number"
                value={trainingTime}
                onChange={(e) => setTrainingTime(e.target.value)}
                className="col-span-3"
                placeholder="輸入訓練時間 (分鐘)"
              />
            </div>

            {/* 狀態 (ENUM 下拉選單) */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                狀態
              </Label>
              <Select
                onValueChange={(value) => setStatus(value as ModelStatus)}
                value={status}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="選擇狀態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>模型狀態</SelectLabel>
                    {Object.values(ModelStatus).map((statusOption) => (
                      <SelectItem key={statusOption} value={statusOption}>
                        {statusOption}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <Button onClick={handleSave}>新增</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
