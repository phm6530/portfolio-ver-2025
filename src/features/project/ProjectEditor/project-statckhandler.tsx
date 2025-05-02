import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SupabasePool from "@/lib/supabaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectStackSchema } from "../schema/project-stack-schema";
import { z } from "zod";

import { useState } from "react";
import { X } from "lucide-react";
import { projectSchema } from "../schema/project-schema";
import { cn } from "@/lib/utils";
const STACKTYPE = [
  "style",
  "framework",
  "lib",
  "Database",
  "orm",
  "design",
] as const;

export default function ProjectStackHandler() {
  const [view, setView] = useState<boolean>(false);

  const {
    watch,
    setValue,
    getValues,
    formState: { errors: rootFormError },
    trigger,
  } = useFormContext<z.infer<typeof projectSchema>>();

  // 얘는 스택폼
  const form = useForm<z.infer<typeof projectStackSchema>>({
    defaultValues: {
      stackItem: "",
      stackType: "",
    },
    resolver: zodResolver(projectStackSchema),
  });

  const queryclient = useQueryClient();

  // stack 목록 가져오기
  const { data } = useQuery<Array<{ id: number; stack: string; type: string }>>(
    {
      queryKey: ["STACK"],
      queryFn: async () => {
        const { error, data } = await SupabasePool.getInstance()
          .from("project_stack")
          .select("*");

        if (error) {
          throw new Error("스택 목록을 불러오는데 실패하였습니다.");
        }

        return data;
      },
      staleTime: Infinity,
    }
  );

  const { mutate } = useMutation({
    mutationFn: async (body: z.infer<typeof projectStackSchema>) => {
      const pool = SupabasePool.getInstance();

      const { data: stackData } = await pool
        .from("project_stack")
        .select("*")
        .eq("stack", body.stackItem);

      if (stackData?.length !== 0) {
        throw new Error("이미 등록된 Stack 입니다.");
      }

      const { error } = await pool
        .from("project_stack")
        .insert([{ stack: body.stackItem, type: body.stackType }]);

      if (error) {
        throw new Error("실패");
      }
    },
    onSuccess: () => {
      form.reset();
      queryclient.invalidateQueries({
        queryKey: ["STACK"],
      });
    },
  });

  const onSubmitHandler = (e: z.infer<typeof projectStackSchema>) => {
    mutate(e);
  };

  const selected = watch("useStack") || [];

  return (
    <div className="items-start flex flex-col gap-2 ">
      <h4>
        사용스택
        <span className="text-indigo-300">({selected.length ?? 0})</span>
      </h4>
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          setView((prev) => !prev);
        }}
        className="text-xs border border-border"
      >
        {view ? (
          <>
            닫기 <X />
          </>
        ) : (
          "+ 직접 추가하기"
        )}
      </Button>
      {view && (
        <div className="flex gap-2 items-start">
          <FormField
            control={form.control}
            name="stackType"
            render={({ field }) => {
              return (
                <FormItem>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="stack 타입" />
                    </SelectTrigger>
                    <SelectContent>
                      {STACKTYPE.map((e) => {
                        return <SelectItem value={e}>{e}</SelectItem>;
                      })}
                    </SelectContent>
                    {form.formState.errors.stackType && (
                      <FormMessage>
                        {form.formState.errors.stackType.message}
                      </FormMessage>
                    )}
                  </Select>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="stackItem"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="stack 명을 입력해주세요" />
                  </FormControl>
                  {form.formState.errors.stackItem && (
                    <FormMessage>
                      {form.formState.errors.stackItem.message}
                    </FormMessage>
                  )}
                </FormItem>
              );
            }}
          />

          <Button type="button" onClick={form.handleSubmit(onSubmitHandler)}>
            Add
          </Button>
        </div>
      )}{" "}
      {rootFormError.useStack && (
        <FormMessage>{rootFormError.useStack.message}</FormMessage>
      )}
      <div
        className={cn(
          "border border-foreground/20 min-h-[50px] p-5 flex items-center w-full gap-2 flex-wrap",
          !!rootFormError.useStack && "border-destructive"
        )}
      >
        {(!data || data.length === 0) && (
          <span className="text-sm">아직 등록된 stack이 없습니다.</span>
        )}

        {data &&
          data.length > 0 &&
          data.map((e) => {
            const isSelected = selected.some((item) => item === e.id);
            return (
              <div
                key={e.id}
                className={cn(
                  "border flex gap-3 items-center border-border rounded-full px-3 py-2 text-sm cursor-pointer hover:text-indigo-300 hover:border-indigo-400 transition-all",
                  isSelected && "text-indigo-300 border-indigo-400"
                )}
                onClick={() => {
                  const current = getValues("useStack") || [];
                  const exist = current.find((id) => id === e.id);

                  if (exist) {
                    setValue(
                      "useStack",
                      current.filter((id) => id !== e.id)
                    );
                  } else {
                    setValue("useStack", [...current, e.id]);
                  }
                  trigger("useStack");
                }}
              >
                {/* <span className="size-1 inline-block rounded-full bg-indigo-500"></span> */}
                {e.stack}
              </div>
            );
          })}
      </div>
    </div>
  );
}
