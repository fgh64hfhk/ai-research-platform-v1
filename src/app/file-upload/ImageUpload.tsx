"use client";

import Image from "next/image";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 設定驗證規則（限制上傳圖片格式與檔案大小）
const formSchema = z.object({
  file: z
    .custom<FileList>(
      (val) => typeof window !== "undefined" && val instanceof FileList
    )
    .refine((files) => files.length > 0, "請選擇一張圖片")
    .refine((files) => files[0]?.size < 5 * 1024 * 1024, "檔案大小不可超過 5MB")
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/gif"].includes(files[0]?.type),
      "只允許上傳 JPG、PNG 或 GIF"
    ),
});

export default function FileUpload() {
  //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [isFinish, setIsFinish] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // 監聽 file 變化，更新圖片預覽
  const selectedFile = watch("file");
  const file = selectedFile && selectedFile.length > 0 ? selectedFile[0] : null;

  if (file && !previewURL) {
    setPreviewURL(URL.createObjectURL(file));
  }

  // 模擬上傳與進度
  const fakeUpload = () => {
    let progress = 0;
    const interval = 300;
    const step = 10;

    const uploadTimer = setInterval(() => {
      progress += step;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(uploadTimer);
        setIsFinish(true);
        setTimeout(() => alert("圖片上傳成功！"), 500);
      }
    }, interval);
  };

  // 處理圖片上傳 （模擬進度）
  const onSubmit = () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    fakeUpload();
  };

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader>
        <CardTitle>檔案上傳測試</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input type="file" accept="image/*" {...register("file")} />

          {errors.file && (
            <p className="text-red-500 text-sm">{errors.file.message}</p>
          )}

          {previewURL && (
            <div>
              <Image
                src={previewURL}
                alt="預覽圖片"
                width={500}
                height={300}
                className="mt-2 h-40 w-auto rounded-md border"
              />
            </div>
          )}

          {isUploading && <Progress value={uploadProgress} className="mt-2" />}

          {isFinish ? (
            <Button variant="ghost" disabled className="w-full">
              完成上傳
            </Button>
          ) : (
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "上傳中..." : "上傳圖片"}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
