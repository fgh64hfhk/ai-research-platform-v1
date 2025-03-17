"use client";
import { JSX, useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";

import { Model } from "../ModelsColumns";

import { useModels } from "../ModelsProvider";
import { Upload } from "lucide-react";

/**
 * AddModelDialog component displays a dialog form for adding a new model.
 *
 * The model data is stored in sessionStorage and triggers an event to notify other components.
 * @returns {JSX.Element} The dialog component for adding a new model.
 */

export default function AddModelDialog(): JSX.Element {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { addTempModel } = useModels();

  const handleSave = () => {
    if (!name || !language) {
      alert("請填寫完整的模型資訊！");
      return;
    }
    // 建立 Model 物件並存入 sessionStorage
    const newModel: Model = {
      id: crypto.randomUUID(), // 使用 UUID 產生唯一 ID
      name,
      language,
      description,
    };

    addTempModel(newModel);

    setIsOpen(false);
  };
  return (
    <div className="flex items-center justify-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Upload className="w-5 h-5" />
            新增模型
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>新增模型</DialogTitle>
            <DialogDescription>
              請輸入模型的基本資訊，點擊「新增」來儲存。
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* 模型名稱 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                模型名稱
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="請輸入模型名稱"
              />
            </div>

            {/* 開發語言 */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">
                開發語言
              </Label>
              <Input
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="col-span-3"
                placeholder="例如 Python, Java, C++"
              />
            </div>

            {/* 模型描述 */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                描述
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="簡單描述模型的用途"
              />
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
