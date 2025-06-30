import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { projectSchema } from "../schema/project-schema";
import { z } from "zod";
import useRows from "@/hooks/useRows";

export default function SummryItem({
  idx,
  onDelete,
  error,
}: {
  idx: number;
  onDelete: (idx: number) => void;
  error: boolean;
}) {
  const { register } = useFormContext<z.infer<typeof projectSchema>>();
  const [rows, rowsHandler] = useRows();

  const {
    ref,
    onChange: rhfOnChange,
    ...rest
  } = register(`surmmry.${idx}.contents`);

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] p-4 rounded-lg border animate-popup-in divide-foreground/50 group border-foreground/50",
        !!error && "border-destructive"
      )}
    >
      <div className="flex flex-col justify-between">
        <span className="text-2xl mr-5">
          {(idx + 1).toString().padStart(2, "0")}
        </span>
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => onDelete(idx)}
          className="size-8   animate-wiggle opacity-0 group-hover:opacity-100 border rounded-sm"
        >
          <X />
        </Button>
      </div>
      <div className="divide-y divide-foreground/40 ">
        <div className="pb-2">
          <input
            type="text"
            className="w-full placeholder:text-foreground/60 "
            placeholder="항목의 제목을 입력하세요"
            {...register(`surmmry.${idx}.title`)}
          />
        </div>
        <div className="items-center gap-3 pt-3 ">
          <textarea
            className="w-full placeholder:text-foreground/60 resize-y p-4 bg-muted/30 leading-relaxed text-sm"
            placeholder="해당 항목 내용을 입력해주세요"
            rows={rows}
            onChange={(e) => {
              rowsHandler(e);
              rhfOnChange(e);
            }}
            ref={ref}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
}
