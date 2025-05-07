import styled, { keyframes } from "styled-components";

import { device } from "@/config/DeviceConfig";

import BlogNewPostList from "@/features/Blog/BlogNewPostList/BlogNewPostList";

export const infiniteBgAni = keyframes`
  0% {
    background-size: 100%;
  }
  100% {
    background-size: 120%;
  }
`;

export const HomeContainer = styled.div`
  position: relative;
  padding-top: 13rem;
  padding-bottom: 8rem;
  overflow: hidden;
  background-position: center bottom;
  background-repeat: no-repeat;
  /* height: 100vh; */
`;

export const Division = styled.span`
  color: #6e31e1;
  font-weight: 400;
  font-size: 50px;
  @media ${device.tablet} {
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

export const CareerGoal = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  font-style: normal;
  font-size: 16px;
  line-height: 1.7rem;
  color: #d1d2eb;
  margin-bottom: 70px;
  position: relative;
  word-break: keep-all;
  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    border-top: 1px solid #898989;
    width: 20px;
  }

  @media ${device.tablet} {
    font-size: 14px;
    width: 100%;
    padding-top: 40px;
    margin-top: 0;
    line-height: 1.7rem;
    margin-top: 20px;
  }
`;

export const MainPoint = styled.div`
  background: var(--gradient-title-color);
  color: transparent;
  display: inline-block;
  background-clip: text;
  -webkit-background-clip: text;
  font-weight: 700;
  font-family: "Inter";
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 1rem;
  @media ${device.tablet} {
    font-size: 15px;
  }
`;

type tst = {
  $mobileBiger?: boolean;
};

export const TitleWrapper = styled.div``;

export const ButtomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const MainButtonWrap = styled.div`
  display: flex;
  @media ${device.tablet} {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`;

export const BottomWrap = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${device.laptop} {
    flex-direction: column;
  }
`;

export const BlogNewList = styled(BlogNewPostList)`
  /* background: #00000024; */
  /* padding: 0.6rem 2rem; */
  border-radius: 1rem;
  margin-left: 2rem;
  width: 35%;
  @media ${device.laptop} {
    margin-left: 0;
    width: 100%;
  }
`;
