import "./index.css";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";

import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavbarP from "./components/Navbar";
import Favorite from "./pages/Favorite";

const isNotLogin = async () => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    throw redirect("/login");
  } else {
    return null;
  }
};

const isLogin = async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    throw redirect("/home");
  } else {
    return null;
  }
};

const router = createBrowserRouter([
  {
    element: (
      <>
        <NavbarP />
        <Outlet />
      </>
    ),
    loader: isNotLogin,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
    ],
  },
  {
    element: (
      <>
        <NavbarP />
        <Outlet />
      </>
    ),
    loader: isLogin,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  ,
]);

createRoot(document.getElementById("root")).render(
  <>
    <NextUIProvider />
    <main className="dark text-foreground bg-background min-h-screen">
      <RouterProvider router={router} />
    </main>
    <NextUIProvider />
  </>
);
