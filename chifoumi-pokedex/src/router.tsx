import { createBrowserRouter } from "react-router-dom";
import Layout from "@/Layout";
import { authRouter } from "@/pages/auth/router";
import { categoryRouter } from "@/pages/category/router";
import NotFound from "@/components/NotFound";
import { gameRouter } from "./pages/game/router";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      ...authRouter,
      ...categoryRouter,
      ...gameRouter,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
