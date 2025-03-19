import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DropzoneUploader from "./DropzoneUploader";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./useModelForm";

interface AddModelFormUIProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function AddModelFormUI({ form }: AddModelFormUIProps) {
  return (
    <div className="w-full max-w-[400px] mx-auto">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="modelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>模型名稱</FormLabel>
                <FormControl>
                  <Input placeholder="請輸入模型名稱" {...field} />
                </FormControl>
                <FormDescription>
                  請輸入模型的名稱，至少 5 個字符。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>開發語言</FormLabel>
                <FormControl>
                  <Input placeholder="請選擇開發語言" {...field} />
                </FormControl>
                <FormDescription>
                  目前僅支援 Java、Python、C++。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>模型描述</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="請輸入模型的用途與特色 (可選填)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  描述此模型的功能與應用範圍 (選填)。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>上傳模型檔案</FormLabel>
                <FormControl>
                  <DropzoneUploader
                    onFileSelectAction={(file) => field.onChange(file)}
                    selectedFile={field.value}
                  />
                </FormControl>
                <FormDescription>
                  請上傳 `.h5`, `.pkl`, 或 `.onnx` 格式的檔案 (最大 20MB)。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
