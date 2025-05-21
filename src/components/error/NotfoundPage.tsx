import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NotFoundPageProps {
  redirectPath: string;
}

const NotfoundPage: React.FC<NotFoundPageProps> = ({ redirectPath }) => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center flex-col justify-center">
      <h1 className="text-3xl mb-3 text-center">
        <span className="text-red-300 mb-3 inline-block"> "404" </span>
        <br></br>권한이 없거나 존재하지 않는 페이지입니다.
      </h1>
      <p className="mb-10">아래의 버튼을 눌러 정상 경로로 접근 부탁드립니다.</p>
      <Button
        variant={"outline"}
        className="button rounded-full p-6"
        onClick={() => navigate(redirectPath)}
      >
        이전화면
      </Button>
    </div>
  );
};

export default NotfoundPage;
