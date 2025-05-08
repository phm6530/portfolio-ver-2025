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

const CustomThumNail = styled(Thumbnail)`
  width: 25%;
  padding-bottom: 16%;
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
    <div
      className="flex article-hover p-5 flex-col"
      onClick={() => navigate(`${post_id}`)}
    >
      <div
        className="w-full aspect-[16/5]"
        style={{
          backgroundImage: `url(${thumbnail_url ? unsplashS3Mapping(thumbnail_url) : null})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />

      {/* 썸네일  */}
      {/* <CustomThumNail
        img={thumbnail_url ? unsplashS3Mapping(thumbnail_url) : null}
        badge={sub_group_name}
      /> */}
      <div className="flex flex-col gap-2 pt-4">
        {/* Header */}

        <div className="">
          {post_title}
          {DateUtils.isNew(created_at) && <PostNewIcon />}
        </div>

        {/* Company */}
        <p className="text-xs line-clamp-2 leading-relaxed">
          {post_description}
        </p>
        {/* <HashTag>{subcategory}</HashTag> */}
        <p className="text-sm opacity-60">
          {DateUtils.dateFormatKR(created_at, "YYYY. MM. DD")}
        </p>
      </div>
    </div>
  );
};

export default BlogContentsItem;
