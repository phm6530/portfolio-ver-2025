import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface BoardCommentInputProps {
  label: string;
  error?: FieldError;
  type?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  isAuth?: boolean;
  sum?: boolean;
}
const BoardCommentInput = forwardRef<
  HTMLInputElement | HTMLDivElement,
  BoardCommentInputProps
>(({ error, type, isAuth, sum, ...rest }, ref) => {
  return (
    <>
      <div className={cn("relative", sum && "w-full")}>
        {type === "textarea" ? (
          <Textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...rest}
            className={cn(
              "rounded-lg text-xs md:text-sm",
              error && "border-destructive!"
            )}
          />
        ) : (
          <Input
            disabled={isAuth}
            autoComplete="off"
            className={cn(
              "text-xs md:text-sm rounded-lg p-2",
              error && "border-destructive"
            )}
            {...rest}
            type={type}
          />
        )}
      </div>
    </>
  );
});

export default BoardCommentInput;
