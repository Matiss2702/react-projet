import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import { authRouter } from "@/pages/auth/router";
import { categoryRouter } from "@/pages/category/router";
import NotFound from "@/components/NotFound";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      ...authRouter,
      ...categoryRouter,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
