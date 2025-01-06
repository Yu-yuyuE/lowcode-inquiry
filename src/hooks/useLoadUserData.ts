// 1. 定义isWaitingUserData，表示是否已经有了用户信息
// 2. 当isWaitingUserData为false的时候，调用接口获取用户信息，存储到userStore中
// 3. 当isWaitingUserData为true的时候，无需重新调用接口

import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { getUserInfoService } from "@/services/userinfo";
import useGetUserInfo from "./useGetUserInfo";
import { loginReducer } from "@/store/userReducer";

function useLoadUserData() {
  const [isWaitingUserData, setWaitingUserData] = useState(true);
  const dispatch = useDispatch();

  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // // 判断当前 user store 是否已经存在用户信息
  const { username } = useGetUserInfo(); // user store
  console.log("username", username);
  useEffect(() => {
    if (username) {
      setWaitingUserData(false); // 如果 user store 已经存在用户信息，就不用重新加载了
      return;
    }
    run(); // 如果 user store 中没有用户信息，则进行加载
  }, [username]);

  return { isWaitingUserData };
}

export default useLoadUserData;
