import { IMG_URL } from "@/constants/apiUrl";

const imgUrlMapper = ({ thumbnail }: { thumbnail: string }) => {
  console.log(thumbnail);
  return /^(https?:)?\/\//.test(thumbnail)
    ? thumbnail
    : `${IMG_URL}/${thumbnail}`;
};

export default imgUrlMapper;
