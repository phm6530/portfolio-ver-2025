"use client";

import * as React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext, Controller } from "react-hook-form";
import { z } from "zod";
import { projectSchema } from "../schema/project-schema";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { control, formState } =
    useFormContext<z.infer<typeof projectSchema>>();

  return (
    <FormField
      control={control}
      name="workRange"
      render={({ field }) => (
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger>
              <Button
                type="button"
                id="date"
                variant={"ghost"}
                className={cn(
                  "w-[300px] justify-start rounded-sm border text-left font-normal",
                  !field.value?.start && "text-muted-foreground",
                  formState.errors.workRange && "border-destructive"
                )}
              >
                <CalendarIcon className={cn("mr-2 h-4 w-4")} />
                {field.value?.start ? (
                  field.value?.end ? (
                    <>
                      {format(field.value.start, "yyyy년 MM월 dd일", {
                        locale: ko,
                      })}{" "}
                      -{" "}
                      {format(field.value.end, "yyyy년 MM월 dd일", {
                        locale: ko,
                      })}
                    </>
                  ) : (
                    format(field.value.start, "yyyy년 MM월 dd일", {
                      locale: ko,
                    })
                  )
                ) : (
                  <span>작업 기간을 설정해 주세요</span>
                )}
              </Button>
              {formState.errors.workRange && (
                <FormMessage className="text-left mt-3">
                  {formState.errors.workRange.message}
                </FormMessage>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <FormItem>
                <Calendar
                  locale={ko}
                  mode="range"
                  selected={{
                    from: field.value?.start ?? undefined,
                    to: field.value?.end ?? undefined,
                  }}
                  onSelect={(range) => {
                    field.onChange({
                      start: range?.from ?? null,
                      end: range?.to ?? null,
                    });
                  }}
                  initialFocus
                />
              </FormItem>
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
}
