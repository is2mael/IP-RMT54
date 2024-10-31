import "./index.css";
import { createRoot } from "react-dom/client";
import {NextUIProvider} from "@nextui-org/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Side Bar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/Home",
    element: 
    <>
    <Home />
    </>
  }
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
