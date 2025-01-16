import React, { FunctionComponent } from "react";
import "./index.module.scss";
import List from "./List";

interface StarProps {}

const Star: FunctionComponent<StarProps> = () => {
  return <List isStar={true}></List>;
};

export default Star;
