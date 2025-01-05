// 1. 定义hasUserData，表示是否已经有了用户信息
// 2. 当hasUserData为false的时候，调用接口获取用户信息，存储到useStore中
// 3. 当hasUserData为true的时候，就不需要重新调用接口了

import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
// import { useDispatch } from "react-redux";
import store from "@/store";
import { getUserInfoService } from "@/services/userinfo";
import useGetUserInfo from "./useGetUserInfo";

function useLoadUserData() {
  const [hasUserData, setHasUserData] = useState(false);

  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      store.userStore.setUserData({ username, nickname });
    },
    onFinally() {
      setHasUserData(true);
    },
  });

  // // 判断当前 user store 是否已经存在用户信息
  const { username } = useGetUserInfo(); // user store
  console.log("username", username);
  useEffect(() => {
    // if (username) {
    //   setHasUserData(true); // 如果 user store 已经存在用户信息，就不用重新加载了
    //   return;
    // }
    run(); // 如果 user store 中没有用户信息，则进行加载
  }, [username]);

  return { hasUserData };
}

export default useLoadUserData;
