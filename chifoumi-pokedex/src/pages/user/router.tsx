import AccountPage from "./AccountPage";
import Layout from "@/Layout";

export const userRouter = [
  {
    path: "account",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <AccountPage />,
      },
    ],
  },
];
