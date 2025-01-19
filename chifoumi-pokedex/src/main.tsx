import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { rootRouter } from "@/router";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <RouterProvider router={rootRouter} />
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>
);
