import * as S from "./HomeStyle";
import { VscProject } from "react-icons/vsc";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import BackgroundImgCover from "@/component/ui/BackgroundImgCover";
import ShootingStar from "@/component/animations/ShootingStar";
import { Grid } from "@/layout/Grid";
import ViewAnimation from "@/component/animations/ViewAnimation";
import BlogNewPostList from "@/features/Blog/BlogNewPostList/BlogNewPostList";
import MainvannerBtn from "./components/main-btn";
import { TbUserSquareRounded } from "react-icons/tb";

const Home = () => {
  return (
    <>
      <S.HomeContainer>
        <BackgroundImgCover mainPage={true} imgSrc="/img/Main_bg.webp">
          <ShootingStar />
        </BackgroundImgCover>

        <Grid>
          <ViewAnimation>
            <S.TitleWrapper>
              <h2 className="mb-5 animate-leftIn font-SUIT-Regular  text-2xl font-bold bg-gradient-to-r from-indigo-300 via-blue-500 to-green-400 text-transparent bg-clip-text">
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

                <div className="flex gap-3">
                  <MainvannerBtn to="/about">
                    <TbUserSquareRounded size={20} />
                    About me
                  </MainvannerBtn>{" "}
                  <MainvannerBtn to="/board">
                    <IoChatbubbleEllipsesSharp size={20} />
                    Guest Board
                  </MainvannerBtn>{" "}
                  <MainvannerBtn to="/project">
                    <VscProject size={20} />
                    Web Project
                  </MainvannerBtn>
                </div>
              </S.ButtomWrapper>

              <BlogNewPostList className="view-animation" page="main" />
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
