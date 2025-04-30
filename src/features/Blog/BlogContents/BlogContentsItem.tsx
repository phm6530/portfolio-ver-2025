import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import FadeInAnimation from "@/component/animations/FadeInAnimation";
import Thumbnail from "@/component/ui/Thumbnail";
import { IMG_URL } from "@/constants/apiUrl";
import { device } from "@/config/DeviceConfig";
import PostNewIcon from "@/component/ui/PostNewIcon";
import { DateUtils } from "@/utils/dateUtil";
import { PostItemModel } from "../BlogList/BlogList";
import { useCallback } from "react";

const ProjectFadeinStyle = styled(FadeInAnimation)`
  /* margin-bottom: 1.5rem; */
  padding-bottom: 3.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* flex: 0 0 calc(33.333% - 1.34rem); */
  width: 100%;
  margin-right: 2rem;
  cursor: pointer;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const ProjectDescription = styled.div`
  font-size: 14px;
  /* white-space: pre-line; */
  margin-bottom: 10px;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 표시할 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-description-color);
  @media ${device.tablet} {
    line-height: 1.4rem;
    margin-bottom: 1rem;
    font-size: 14px;
  }
`;

const ProjectItemHeaderStyle = styled.div`
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: -0.7px;
  align-items: center;
  @media ${device.tablet} {
    margin-top: 1.2rem;
    font-size: 1.2rem;
  }
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(70% - 3rem);
  @media ${device.tablet} {
    width: 100%;
  }
`;

const CustomThumNail = styled(Thumbnail)`
  width: 25%;
  padding-bottom: 16%;
  @media ${device.tablet} {
    width: 100%;
    padding-bottom: 65%;
  }
`;

const BlogContentsItem: React.FC<PostItemModel> = ({
  post_id,
  thumbnail_url,
  sub_group_name,
  post_title,
  post_description,
  created_at,
}) => {
  const navigate = useNavigate();

  const unsplashS3Mapping = useCallback((url: string | null) => {
    return url !== null && !url?.startsWith("https://images.unsplash.com")
      ? `${IMG_URL}/${url}`
      : url;
  }, []);

  return (
    <ProjectFadeinStyle onClick={() => navigate(`${post_id}`)}>
      {/* 썸네일  */}

      <CustomThumNail
        img={thumbnail_url ? unsplashS3Mapping(thumbnail_url) : null} //이미지 썸네일 엔드포인트
        badge={sub_group_name}
      />
      <ContentsWrap>
        {/* Header */}

        <ProjectItemHeaderStyle>
          {post_title}
          {DateUtils.isNew(created_at) && <PostNewIcon />}
        </ProjectItemHeaderStyle>

        {/* Company */}
        <ProjectDescription>{post_description}</ProjectDescription>
        {/* <HashTag>{subcategory}</HashTag> */}
        <p className="text-sm opacity-60">
          {DateUtils.dateFormatKR(created_at, "YYYY. MM. DD")}
        </p>
      </ContentsWrap>
    </ProjectFadeinStyle>
  );
};

export default BlogContentsItem;
