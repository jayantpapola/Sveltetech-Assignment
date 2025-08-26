import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import settingsReducer from "./reducers/settingsSlice";
import usersReducer from "./reducers/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    users: usersReducer,
  },
});
