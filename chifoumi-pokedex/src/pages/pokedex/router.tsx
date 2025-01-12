import { Router } from "../../constants/type";
import { typeRouter } from "./pokedex/router";

export const pokedexRouter: Router[] = [
  {
    path: "pokedex",
    children: [...typeRouter],
  },
];
