import { Router } from "../../../constants/type.ts";
import PokedexLayout from "./PokedexLayout.tsx";
import Eau from "./eau/Eau.tsx";
import Feu from "./feu/Feu.tsx";
import Plante from "./plante/Plante.tsx";

export const typeRouter: Router[] = [
  {
    path: "type",
    element: <PokedexLayout />,
    children: [
      {
        path: "eau",
        element: <Eau />,
      },
      {
        path: "feu",
        element: <Feu />,
      },
      {
        path: "plante",
        element: <Plante />,
      },
    ],
  },
];
