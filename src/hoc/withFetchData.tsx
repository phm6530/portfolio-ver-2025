import NotfoundPage from "@/components/error/NotfoundPage";
import LoadingSpiner from "@/components/ui/loading-spiner";
import { useQuery } from "@tanstack/react-query";

import { ComponentType } from "react";
import { useParams } from "react-router-dom";

interface WithFetchDataReturnProps {
  redirectPath: string;
  queryKeyPrefix: string;
}

const withFetchData = <P extends object, R extends P>(
  Component: ComponentType<P>,
  fetchFunction: (key: string) => Promise<R>
) => {
  return ({
    redirectPath,
    queryKeyPrefix,
    ...props //뿌리기
  }: WithFetchDataReturnProps & Partial<P>) => {
    const { key } = useParams<{ key: string }>();

    const { data, isLoading } = useQuery<R>({
      queryKey: [queryKeyPrefix, key],
      queryFn: () => fetchFunction(key!),
      enabled: !!key,
      staleTime: 5 * 60 * 1000,
    });

    if (data && !isLoading) {
      return <Component {...(data as R)} {...(props as P)} />;
    } else if (isLoading) {
      return <LoadingSpiner />;
    } else {
      return <NotfoundPage redirectPath={redirectPath} />;
    }
  };
};

export default withFetchData;
