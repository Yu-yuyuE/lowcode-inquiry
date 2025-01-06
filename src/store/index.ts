import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";

export type StateType = {
  user: UserStateType;
  // components: ComponentsStateType
  // components: StateWithHistory<ComponentsStateType>; // 增加了 undo
  // pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    // components: componentsReducer,
  },
});
