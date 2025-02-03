import HomePage from "./HomePage";
import Layout from "@/Layout";

export const homeRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
];
