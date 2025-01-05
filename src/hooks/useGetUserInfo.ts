import store from "@/store";
function useGetUserInfo() {
  return store.userStore.useGetState();
}
export default useGetUserInfo;
