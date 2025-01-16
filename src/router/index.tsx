import { MainLayout, ManageLayout, QuestionLayout } from "@/layout";
import { Home, Login, Manage, NotFound, Register, Star, Trash, List, Edit, Stat } from "@/pages";
import React from "react";
import { createBrowserRouter, createHashRouter, Navigate } from "react-router-dom";

const router = createHashRouter([
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
            path: "",
            element: <Navigate to="list" />,
          },
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

export const HOME_PATHNAME = "/";
export const LOGIN_PATHNAME = "/login";
export const REGISTER_PATHNAME = "/register";
export const MANAGE_INDEX_PATHNAME: string = "/manage/list";
export const MANAGE_STAR_PATHNAME = "/manage/star";
export const MANAGE_TRASH_PATHNAME = "/manage/trash";

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}

export function isNoNeedUserInfo(pathname: string) {
  // 主页、登录、注册页无需登录
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}
