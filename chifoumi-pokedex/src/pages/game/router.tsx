import MatchList from "./MatchList";
import MatchDetails from "./MatchDetails";

export const gameRouter = [
  {
    path: "game",
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
