import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SupabasePool from "@/lib/supabaseClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormMessage } from "@/components/ui/form";
const STACKTYPE = ["style", "framework", "lib"] as const;

export default function ProjectStackHandler() {
  const form = useForm({
    defaultValues: {
      stackItem: "",
      stackType: "",
    },
  });

  // stack 목록 가져오기
  const { data, isLoading } = useQuery({
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
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { error, data } = await SupabasePool.getInstance()
        .from("project_stack")
        .insert([{ stack: "", type: "" }]);
    },
  });

  const onSubmitHandler = (e) => {
    mutate(e);
  };

  console.log(form.watch());

  console.log(form.formState.errors);

  return (
    <div className="items-start flex flex-col gap-2">
      <h4>Stack</h4>
      <div className="border border-border min-h-[50px] p-5 flex items-center w-full ">
        {data?.length === 0 && (
          <span className="text-sm">아직 등록된 stack이 없습니다.</span>
        )}
      </div>
      <div className="flex gap-2 items-start">
        <Select {...form.register("stackType")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="stack 타입" />
          </SelectTrigger>
          <SelectContent>
            {STACKTYPE.map((e) => {
              return <SelectItem value={e}>{e}</SelectItem>;
            })}
          </SelectContent>
        </Select>

        <Input {...form.register("stackItem")} />
        <Button type="button" onClick={form.handleSubmit(onSubmitHandler)}>
          Add
        </Button>
        {/* <FormMessage>{form.formState.errors}</FormMessage> */}
      </div>
    </div>
  );
}
