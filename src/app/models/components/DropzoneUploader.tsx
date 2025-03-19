"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface DropzoneUploaderProps {
  onFileSelectAction: (file: File | null) => void;
  selectedFile: File | null;
}

export default function DropzoneUploader({
  onFileSelectAction,
  selectedFile,
}: DropzoneUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 20 * 1024 * 1024;
  const acceptedExtensions = [".h5", ".pkl", ".onnx"];

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "application/octet-stream": acceptedExtensions,
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setError("檔案大小超過 20MB 或格式不支援");
        onFileSelectAction(null);
        return;
      }

      const file = acceptedFiles[0];
      const fileName = file.name.toLowerCase();

      const isValidFormat = acceptedExtensions.some((ext) =>
        fileName.endsWith(ext)
      );
      if (!isValidFormat) {
        setError(`檔案格式錯誤，僅接受 ${acceptedExtensions.join(", ")}`);
        onFileSelectAction(null);
        return;
      }

      setError(null);
      onFileSelectAction(file);
    },
  });

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        {...getRootProps({
          className:
            "w-full border-2 border-gray-300 border-dashed p-6 rounded-lg text-center cursor-pointer transition-all hover:border-blue-500",
        })}
      >
        <input {...getInputProps()} />

        {selectedFile ? (
          <p className="text-gray-600 font-medium">
            {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}{" "}
            MB)
          </p>
        ) : (
          <p className="text-gray-600">拖曳檔案至此或點擊選擇檔案</p>
        )}
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className="mt-3 px-4 py-2 text-sm"
        >
          <Upload className="w-4 h-4 mr-2" />
          選擇檔案
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
