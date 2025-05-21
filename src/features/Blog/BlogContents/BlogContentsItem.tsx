import { useNavigate } from "react-router-dom";
import { IMG_URL } from "@/constants/apiUrl";
import PostNewIcon from "@/components/ui/PostNewIcon";
import { DateUtils } from "@/utils/dateUtil";
import { PostItemModel } from "../BlogList/BlogList";
import { useCallback } from "react";
import StackBadge from "@/components/ui/stack-badge";
import { cn } from "@/lib/utils";

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
      className={cn(
        "grid  gap-5 items-center  md:grid-cols-1 border-x-0 md:border-x-1 py-4 md:gap-0 article-hover md:p-5 md:flex-col  hover:-translate-y-1",
        thumbnail_url && "grid-cols-[minmax(0,5fr)_minmax(100px,2fr)]"
      )}
      onClick={() => navigate(`${post_id}`)}
    >
      {thumbnail_url && (
        <div
          className="md:aspect-[16/6] aspect-[1/1] w-full  rounded-lg order-1 md:order-none"
          style={{
            backgroundImage: `url(${thumbnail_url ? unsplashS3Mapping(thumbnail_url) : null})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
      )}

      <div className="flex flex-col flex-1 gap-2 pt-0 md:pt-4 items-start">
        {/* Header */}
        <div className="flex gap-2 items-center mb-2">
          <StackBadge> {sub_group_name}</StackBadge>
          {DateUtils.isNew(created_at) && <PostNewIcon />}
        </div>
        <div className="flex items-center">{post_title}</div>

        {/* Company */}
        <p className="text-xs line-clamp-2 leading-relaxed text-muted-foreground">
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
