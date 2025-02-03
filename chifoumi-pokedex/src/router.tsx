import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "@/pages/auth/router";
import { categoryRouter } from "@/pages/category/router";
import NotFound from "@/components/NotFound";
import { gameRouter } from "./pages/game/router";
import { userRouter } from "./pages/user/router";
import { homeRouter } from "./pages/home/router";

export const rootRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      ...homeRouter,
      ...userRouter,
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
