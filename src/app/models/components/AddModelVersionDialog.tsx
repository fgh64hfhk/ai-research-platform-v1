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

import { Model, ModelVersion, ModelStatus } from "../ModelsColumns";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * AddModelVersionDialog - A form dialog for adding a new version to a model.
 *
 * @param {object} props - Component props
 * @param {(version: ModelVersion) => void} props.onSubmit - Callback function to handle the submission of a new model version
 * @returns {JSX.Element} The dialog component for adding a model version.
 */

export default function AddModelVersionDialog(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [version, setVersion] = useState("");
  const [modifiedType, setModifiedType] = useState("");
  const [trainingTime, setTrainingTime] = useState("");
  const [status, setStatus] = useState<ModelStatus | undefined>(undefined);

  // 監聽 sessionStorageUpdated 事件來更新選取的模型
  useEffect(() => {
    const checkNewModel = () => {
      const storedModel = sessionStorage.getItem("selectedModel");
      if (storedModel) {
        setSelectedModel(JSON.parse(storedModel));
        setIsOpen(true); // 自動開啟對話框
      }
    };

    checkNewModel(); // 初始化時檢查

    window.addEventListener("sessionStorageUpdated", checkNewModel);
    return () => {
      window.removeEventListener("sessionStorageUpdated", checkNewModel);
    };
  }, []);

  const handleSave = () => {
    if (
      !selectedModel ||
      !version ||
      !modifiedType ||
      !trainingTime ||
      !status
    ) {
      alert("請填寫完整的版本資訊！");
      return;
    }

    const newModelVersion: ModelVersion = {
      modelId: selectedModel.id,
      version,
      modifiedDate: new Date().toISOString().split("T")[0], // 自動填入當前日期
      modifiedType,
      trainingTime: Number(trainingTime),
      buildDate: new Date().toISOString().split("T")[0], // 預設 buildDate 為今天
      status,
    };
    console.log("新增模型版本:", newModelVersion);

    // 清除 sessionStorage，避免下次開啟時誤觸發
    sessionStorage.removeItem("selectedModel");

    // **手動移除 event listener，確保 event 監聽器不會持續存在**
    window.removeEventListener("sessionStorageUpdated", () => {});

    setIsOpen(false);
  };
  return (
    <div className="flex items-center justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="default" disabled={!selectedModel}>
            新增模型版本
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>新增模型版本</DialogTitle>
            <DialogDescription>
              {selectedModel
                ? `請為 ${selectedModel.name} 設定版本資訊`
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
