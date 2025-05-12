import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { FormEvent, InputHTMLAttributes, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchField({
  name,
  className,
  ...props
}: {
  name: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(location.search);
    searchParams.set(name, value.trim());
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={submitHandler} className=" w-full ">
      <div
        className={cn(
          `bg-black/10  border border-transparent rounded-full dark:bg-custom-input overflow-hidden 
            
       flex flex-1 focus-within:border-indigo-300`,
          className
        )}
      >
        <input
          type="text"
          autoComplete="off"
          name={name}
          className="bg-transparent flex-1   focus:outline-0 border-0 h-full p-4 pl-4 md:text-sm text-[13px] "
          placeholder="검색어를 입력해주세요"
          {...props}
          onChange={(e) => setValue(e.currentTarget.value)}
        />

        <button
          type="submit"
          className="flex items-center focus:border-0 p-3  pr-5"
        >
          <SearchIcon size={16} />
        </button>
      </div>
    </form>
  );
}
