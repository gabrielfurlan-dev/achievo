"use client";
//* Libraries imports
import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/utils/query-client";

type Props = {
  children: ReactNode;
}

export function QueryClient({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}