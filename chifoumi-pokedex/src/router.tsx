import { createBrowserRouter } from "react-router-dom";
import { Router } from "./constants/type.ts";
import Home from "./Home.tsx";
import { pokedexRouter } from "./pages/pokedex/router.tsx";

const rootRoutes: Router[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
      },
      ...pokedexRouter
    ],
  },
];

export const rootRouter = createBrowserRouter(rootRoutes, {
  basename: "/",
});