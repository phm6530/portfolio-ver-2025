import SearchField from "@/components/shared/search-input-field";
import { useSearchParams } from "react-router-dom";

const BlogSUbCategoryTitle = () => {
  const [searchParams] = useSearchParams();
  const group: string = searchParams.get("category") || "All";
  const item: string | null = searchParams.get("item");

  return (
    <div className="subText py-4 flex gap-3 items-center justify-between border-b border-border mb-5">
      <div className="flex gap-2 items-center">
        <span className="text-3xl subtext-gradient">{group}</span> /
        {item && <span className="text-lg subtext-gradient">{item}</span>}
      </div>
      {/* Search */}
      <SearchField name="keyword" />
    </div>
  );
};

export default BlogSUbCategoryTitle;
