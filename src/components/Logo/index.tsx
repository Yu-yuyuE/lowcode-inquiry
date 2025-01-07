import React, { FunctionComponent, useEffect, useState } from "react";
import { useGetUserInfo } from "@/hooks";
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from "@/router";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { Space } from "@arco-design/web-react";
import Title from "@arco-design/web-react/es/Typography/title";
import { IconDriveFile, IconFile } from "@arco-design/web-react/icon";

interface LogoProps {}

const Logo: FunctionComponent<LogoProps> = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <h1>
            <IconFile />
          </h1>
          <h1>低代码问卷</h1>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
