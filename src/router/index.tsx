import { Home, Login, Manage, NotFound, Question, Register } from "@/pages";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/manage",
    element: <Manage />,
    children: [
      //   {
      //     path: "home",
      //     element: <Home />
      //   }
    ]
  },
  {
    path: "/question",
    element: <Question />,
    children: [
      //   {
      //     path: "home",
      //     element: <Home />
      //   }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
