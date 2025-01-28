import AccountPage from "./AccountPage";

export const userRouter = [
  {
    path: "account",
    children: [
      {
        path: "",
        element: <AccountPage />,
      },
    ],
  },
];
