import Fire from "./Fire";
import Plant from "./Plant";
import Water from "./Water";

export const categoryRouter = [
  {
    path: "category",
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
        element: <Plant />,
      },
    ],
  },
];
