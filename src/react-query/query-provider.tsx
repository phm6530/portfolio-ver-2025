import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import type { ReactNode } from "react";

export default function QueryProviderClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
