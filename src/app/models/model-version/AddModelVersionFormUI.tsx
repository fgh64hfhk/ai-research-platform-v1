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

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { versionParametersFormSchema } from "./useModelVersionValidation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ModelStatus } from "../ModelsColumns";

import { ModelParamAccordion } from "./ModelParametersAccordion";

interface AddModelVersionFormUIProps {
  form: UseFormReturn<z.infer<typeof versionParametersFormSchema>>;
}

export default function AddModelVersionFormUI({
  form,
}: AddModelVersionFormUIProps) {
  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* 版本號碼 */}
        <FormField
          control={form.control}
          name="version.version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>模型版本號</FormLabel>
              <FormControl>
                <Input {...field} readOnly className="col-span-3 bg-gray-200" />
              </FormControl>
              <FormDescription>系統自動填寫的版本號</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 修改描述 */}
        <FormField
          control={form.control}
          name="version.modifiedType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>模型版本修改</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="col-span-3"
                  placeholder="例如 Bug 修復, 增加數據集"
                />
              </FormControl>
              <FormDescription>請輸入修改模型的原因</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 訓練時間 */}
        <FormField
          control={form.control}
          name="version.trainingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>模型訓練時間（秒）</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="col-span-3"
                  placeholder="輸入訓練時間 (秒)"
                />
              </FormControl>
              <FormDescription>請輸入模型訓練所需的時間（秒）</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 狀態選擇 */}
        <FormField
          control={form.control}
          name="version.status"
          render={({ field }) => {
            const error = form.formState.errors?.version?.status;
            return (
              <FormItem>
                <FormLabel>模型版本的狀態</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) =>
                      form.setValue("version.status", value as ModelStatus)
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="選擇狀態" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>模型版本的狀態</SelectLabel>
                        {Object.values(ModelStatus).map((statusOption) => (
                          <SelectItem key={statusOption} value={statusOption}>
                            {statusOption}
                          </SelectItem>
                        ))}
                        {/* 錯誤訊息直接顯示在選單中 */}
                        {error && (
                          <div className="px-3 py-1 text-sm text-red-500">
                            {error.message}
                          </div>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>請選擇模型版本的當前狀態</FormDescription>
              </FormItem>
            );
          }}
        />
        {/* 模型參數表單 */}
        <FormItem>
          <FormLabel>模型版本的參數表</FormLabel>
          <FormControl>
            <ModelParamAccordion />
          </FormControl>
          <FormDescription>請輸入模型參數</FormDescription>
        </FormItem>
      </form>
    </Form>
  );
}
