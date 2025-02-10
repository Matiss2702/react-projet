import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { rootRouter } from "@/router";
import "@/index.css";
import { UserProvider } from "@/context/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <UserProvider>
        <RouterProvider router={rootRouter} />
      </UserProvider>
    </HelmetProvider>
  </React.StrictMode>
);
