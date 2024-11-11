import { ReactNode } from "react";
import { AuthProvider } from "../context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ContextProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default ContextProvider;
