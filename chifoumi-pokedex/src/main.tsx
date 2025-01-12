import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RecoilRoot } from 'recoil';

import { RouterProvider } from "react-router-dom";
import { rootRouter } from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
    <RouterProvider router={rootRouter} />
    </RecoilRoot>
  </React.StrictMode>
);
