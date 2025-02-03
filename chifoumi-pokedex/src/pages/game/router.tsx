import MatchList from "./MatchList";
import MatchDetails from "./MatchDetails";
import Layout from "@/Layout";

export const gameRouter = [
  {
    path: "game",
    element: <Layout />,
    children: [
      {
        path: "matchList",
        element: <MatchList />,
      },
      {
        path: "matches/:id",
        element: <MatchDetails />,
      },
    ],
  },
];
