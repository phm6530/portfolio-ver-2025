import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface BoardCrectorProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const BoardCrector: React.FC<BoardCrectorProps> = ({
  value,
  onChange,
  name,
}) => {
  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <img src="/public/img/board/talk2.png" className="size-5" />
        <span className="text-xl">Crector </span>
        <span
          style={{
            fontSize: "13px",
            opacity: 0.5,
            marginLeft: "15px",
            marginTop: "5px",
            fontWeight: "normal",
          }}
        >
          댓글에 남겨질 캐릭터에요!
        </span>
      </div>

      <div
        className="flex rounded-full gap-0 p-2"
        style={{ backgroundColor: "#c4c4c417" }}
      >
        {[...Array(6)].map((_, idx) => {
          const icon = `person_${idx + 1}`;

          return (
            <label
              key={icon}
              className={cn(
                "relative border-6 border-transparent bg-transparent  rounded-full  cursor-pointer hover:scale-110 transition-all",
                value === icon
                  ? "dark:bg-indigo-300/40"
                  : " grayscale border-transparent"
              )}
              style={{
                boxShadow:
                  value === icon
                    ? "5px 5px 13px rgba(0, 0, 0, 0.2)"
                    : undefined,
              }}
            >
              {value === icon && (
                <div
                  style={{
                    boxShadow: "5px 5px 13px rgba(0, 0, 0, 0.2)",
                  }}
                  className="flex items-center size-5 justify-center absolute bg-gradient-to-t bg-indigo-300 to-indigo-400 -top-[3px] -left-[3px] rounded-full animate-wiggle"
                >
                  <Check size={15} className="text-white" />
                </div>
              )}
              <img
                src={`/img/board/${icon}.png`}
                alt=""
                className="rounded-full w-[50px] "
              />
              <input
                type="radio"
                value={icon}
                onChange={handleIconChange}
                name={name}
                checked={value === icon}
                className="hidden"
              />
            </label>
          );
        })}
      </div>
    </>
  );
};

export default BoardCrector;
