import * as S from "./HomeStyle";
import BackgroundImgCover from "@/component/ui/BackgroundImgCover";
import ShootingStar from "@/component/animations/ShootingStar";
import { Grid } from "@/layout/Grid";
import ViewAnimation from "@/component/animations/ViewAnimation";
import MainvannerBtn from "./components/main-btn";
import { TbUserSquareRounded } from "react-icons/tb";
import StarAnimation from "@/component/animations/StarAnimation";

const PATHS = [
  {
    label: "ABOUT ME",
    to: "/about",
  },
  {
    label: "WEB PROJECT",
    to: "/about",
  },
  {
    label: "GUEST BOOK",
    to: "/about",
  },
];

const Home = () => {
  return (
    <>
      <S.HomeContainer>
        <BackgroundImgCover mainPage={true} imgSrc="/img/Main_bg.webp">
          <ShootingStar /> <StarAnimation />
        </BackgroundImgCover>

        <Grid>
          <ViewAnimation>
            <S.TitleWrapper>
              <h2 className="mb-5 animate-leftIn font-SUIT-Regular  text-xl font-bold bg-gradient-to-r from-indigo-300 via-blue-500 to-green-400 text-transparent bg-clip-text">
                FRONT END & Web Publisher
              </h2>
              <h1 className="animate-leftIn text-7xl font-Poppins font-semibold bg-gradient-to-t from-white via-white to-blue-300 text-transparent bg-clip-text">
                PORTFOLIO
              </h1>
              <h1 className="animate-leftIn text-7xl font-Poppins font-semibold bg-gradient-to-t from-white via-white to-blue-300 text-transparent bg-clip-text">
                WEB DEVELOPER<S.Division>&lt;/&gt;</S.Division>
              </h1>
            </S.TitleWrapper>
            <S.BottomWrap>
              <S.ButtomWrapper className="view-animation">
                <S.CareerGoal>
                  <br></br>
                  더욱 전문성 있는 프론트엔드 개발자로 성장하고자 합니다.
                  <br></br>
                  새로운 기술을 학습하며, 익숙해지는 것에 전념하고 있습니다.
                  <br></br>
                </S.CareerGoal>
                <div className="flex gap-2 md:flex-row flex-col">
                  {PATHS.map((e) => {
                    return (
                      <MainvannerBtn to="/about" key={`${e.label}-btn`}>
                        <TbUserSquareRounded size={20} />
                        {e.label}
                      </MainvannerBtn>
                    );
                  })}
                </div>
              </S.ButtomWrapper>
            </S.BottomWrap>
            {/* <MainNavs /> */}
            {/* <DashBoardTitle>
                    <b>FRONTEND DEVELOPER</b>
                </DashBoardTitle> */}
          </ViewAnimation>{" "}
        </Grid>
      </S.HomeContainer>
    </>
  );
};

export default Home;
