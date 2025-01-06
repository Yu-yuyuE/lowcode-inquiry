import store, { StateType } from "@/store";
import { UserStateType } from "@/store/userReducer";
import { useSelector } from "react-redux";

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType;
  return { username, nickname };
}

export default useGetUserInfo;
