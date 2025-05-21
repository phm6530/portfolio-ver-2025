import FadeInAnimation from "@/components/animations/FadeInAnimation";

const NonData = ({ message }: { message: React.ReactNode }) => {
  return (
    <FadeInAnimation>
      <div className="h-[200px] text-center flex items-center  w-full justify-center">
        {message}
      </div>
    </FadeInAnimation>
  );
};

export default NonData;
