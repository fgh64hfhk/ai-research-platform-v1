import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const formSchema = z.object({
  modelName: z
    .string()
    .min(5, { message: "Model name must be at least 5 characters long" }),
  language: z.enum(["Java", "Python", "C++"], {
    message: "Only Java, Python, or C++ are allowed",
  }),
  description: z.string().optional(),
  file: z
    .instanceof(File)
    .refine((file) => file !== null, { message: "請上傳模型檔案" })
    .refine(
      (file) =>
        [".h5", ".pkl", ".onnx"].some((ext) =>
          file.name.toLowerCase().endsWith(ext)
        ),
      { message: "檔案格式錯誤，僅接受 .h5, .pkl, .onnx" }
    )
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "檔案大小不可超過 20MB",
    }),
});

export function useModelForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modelName: "Model_Test",
      language: "Java",
      description: "",
      file: undefined,
    },
    shouldUseNativeValidation: false,
  });

  return { form, formSchema };
}
