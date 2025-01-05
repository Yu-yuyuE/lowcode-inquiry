import { MainLayout, ManageLayout, QuestionLayout } from "@/layout";
import { Home, Login, Manage, NotFound, Register, Star, Trash, List, Edit, Stat } from "@/pages";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        children: [
          {
            path: "list",
            element: <List />,
          },
          {
            path: "star",
            element: <Star />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit:id",
        element: <Edit />,
      },
      {
        path: "stat:id",
        element: <Stat />,
      },
    ],
  },
]);

export default router;
