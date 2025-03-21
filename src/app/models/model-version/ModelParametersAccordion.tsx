import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export function ModelParamAccordion() {
  const { control } = useFormContext();

  return (
    <Accordion type="single" collapsible className="border rounded-lg p-4">
      <AccordionItem value="parameters">
        <AccordionTrigger className="font-semibold text-sm">
          模型參數
        </AccordionTrigger>
        <AccordionContent className="space-y-6">
          {/* Learning Rate */}
          <FormField
            control={control}
            name="parameters.learningRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Learning Rate
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="border-gray-300 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Batch Size */}
          <FormField
            control={control}
            name="parameters.batchSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Batch Size
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="border-gray-300 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Epochs */}
          <FormField
            control={control}
            name="parameters.epochs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Epochs</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    className="border-gray-300 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Optimizer */}
          <FormField
            control={control}
            name="parameters.optimizer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Optimizer</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) =>
                      field.onChange(value as "adam" | "sgd" | "rmsprop")
                    }
                  >
                    <SelectTrigger className="border-gray-300 rounded-md">
                      <SelectValue placeholder="選擇優化器" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adam">Adam</SelectItem>
                      <SelectItem value="sgd">SGD</SelectItem>
                      <SelectItem value="rmsprop">RMSProp</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Loss Function */}
          <FormField
            control={control}
            name="parameters.lossFunction"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Loss Function
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) =>
                      field.onChange(value as "crossentropy" | "mse")
                    }
                  >
                    <SelectTrigger className="border-gray-300 rounded-md">
                      <SelectValue placeholder="選擇損失函數" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crossentropy">CrossEntropy</SelectItem>
                      <SelectItem value="mse">MSE</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dataset Version */}
          <FormField
            control={control}
            name="parameters.datasetVersion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Dataset Version
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-gray-300 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pretrained Model */}
          <FormField
            control={control}
            name="parameters.pretrainedModel"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between mb-4">
                <FormLabel className="text-sm font-medium">
                  Pretrained Model
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Augmentation */}
          <FormField
            control={control}
            name="parameters.augmentation"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between mb-4">
                <FormLabel className="text-sm font-medium">
                  Augmentation
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
