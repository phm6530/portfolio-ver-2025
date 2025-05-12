import { useNavigate } from "react-router-dom";
import { IMG_URL } from "@/constants/apiUrl";
import PostNewIcon from "@/component/ui/PostNewIcon";
import { DateUtils } from "@/utils/dateUtil";
import { PostItemModel } from "../BlogList/BlogList";
import { useCallback } from "react";
import StackBadge from "@/components/ui/stack-badge";

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
      className=" grid grid-cols-[1fr_auto] md:grid-cols-1 border-x-0 md:border-x-1 py-4 gap-5 article-hover md:p-5 md:flex-col  hover:-translate-y-1"
      onClick={() => navigate(`${post_id}`)}
    >
      {thumbnail_url && (
        <div
          className="w-full md:aspect-[16/6] aspect-[1/1] rounded-lg order-1 md:order-none"
          style={{
            backgroundImage: `url(${thumbnail_url ? unsplashS3Mapping(thumbnail_url) : null})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
      )}

      <div className="flex flex-col gap-2 pt-0 md:pt-4 items-start">
        {/* Header */}

        <StackBadge> {sub_group_name}</StackBadge>

        <div className="flex items-center">
          {post_title}
          {DateUtils.isNew(created_at) && <PostNewIcon />}
        </div>

        {/* Company */}
        <p className="text-xs line-clamp-2 leading-relaxed text-secondary-foreground">
          {post_description}
        </p>
        {/* <HashTag>{subcategory}</HashTag> */}
        <p className="text-xs opacity-50 mt-4">
          {DateUtils.formatStyledShort(created_at)}
        </p>
      </div>
    </div>
  );
};

export default BlogContentsItem;
