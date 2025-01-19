import { createBrowserRouter } from "react-router-dom";
import { Router } from "./constants/type.ts";
import Home from "./Home.tsx";
import { pokedexRouter } from "./pages/pokedex/router.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import Account from "./pages/Account/Account.tsx";
import NotFound from "./components/NotFound.tsx";

const rootRoutes: Router[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />
      },
      ...pokedexRouter,
      {
        path: "account",
        element: <Account />
      }
    ],
  },
];

export const rootRouter = createBrowserRouter(rootRoutes, {
  basename: "/",
});
