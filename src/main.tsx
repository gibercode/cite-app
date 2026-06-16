import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@/components";
import { router } from "@/router";
import { RouterProvider } from "react-router-dom";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
