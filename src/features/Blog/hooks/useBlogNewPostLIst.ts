import { fetchNewPostlist } from "@/services/blogService";
import { queryKey } from "@/services/queryKey";
import { BlogNewPostListProps } from "@/type/BlogTypes";
import { useQuery } from "@tanstack/react-query";

const useBlogNewPostList = () => {
  return useQuery<BlogNewPostListProps[]>({
    queryKey: [queryKey.blogNewPostLIst],
    queryFn: fetchNewPostlist,
    staleTime: 5 * 60 * 1000,
  });
};

export default useBlogNewPostList;
