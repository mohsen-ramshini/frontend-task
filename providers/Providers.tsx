"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/features/dashboard/store";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryProvider>
        <Toaster position="top-right" richColors />
        {children}
      </QueryProvider>
    </Provider>
  );
}
