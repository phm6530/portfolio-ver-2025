import { forwardRef } from "react";
import ErrorBubble from "@/components/error/ErrorBubble";
import { FieldError } from "react-hook-form";
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
>(({ label, error, type, isAuth, name, sum, ...rest }, ref) => {
  return (
    <>
      <div className={cn("relative", sum && "w-full")}>
        {type === "textarea" ? (
          <Textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...rest}
            className={cn("  rounded-lg", error && "border-destructive!")}
          />
        ) : (
          <Input
            disabled={isAuth}
            autoComplete="off"
            className={cn(" rounded-lg p-2", error && "border-destructive")}
            {...rest}
            type={type}
          />
        )}
        {/* {error && <ErrorBubble>{error.message}</ErrorBubble>} */}
      </div>
    </>
  );
});

export default BoardCommentInput;
