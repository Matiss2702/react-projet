import Login from "./Login";
import Register from "./Register";
import Layout from "@/Layout";

export const authRouter = [
  {
    path: "auth",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];
