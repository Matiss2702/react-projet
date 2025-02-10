import Fire from "./Fire";
import Grass from "./Grass";
import Water from "./Water";
import Layout from "@/Layout";

export const categoryRouter = [
  {
    path: "category",
    element: <Layout />,
    children: [
      {
        path: "water",
        element: <Water />,
      },
      {
        path: "fire",
        element: <Fire />,
      },
      {
        path: "plant",
        element: <Grass />,
      },
    ],
  },
];
