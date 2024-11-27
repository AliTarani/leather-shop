import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ContextProvider from "./startup/contextProvider.tsx";
import Loading from "./components/loading.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </ContextProvider>
  </StrictMode>
);
