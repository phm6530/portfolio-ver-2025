import { AlertCircle } from "lucide-react";

const ErrorBubble: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative text-destructive dark:bg-background bg-white p-2 rounded-lg text-xs inline-flex gap-2 items-center  animate-popup-in  right-0  shadow-xl  border ">
      <div className="absolute size-3 dark:bg-background bg-white border-b border-r border-destructive rotate-45 -bottom-[7px] left-5" />
      <AlertCircle size={20} />
      {children}
    </div>
  );
};
export default ErrorBubble;
