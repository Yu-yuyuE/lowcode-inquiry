import React from "react";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router";
import "./App.less";
import "@arco-design/web-react/dist/css/arco.css";

function App() {
  return <RouterProvider router={routerConfig} />;
}

export default App;
