import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/secureStorage";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Load from cookies on app start
const saved = (function () {
  try {
    const raw = Cookies.get("auth");
    if (!raw) return null;
    const dec = decrypt(raw);
    return dec ? JSON.parse(dec) : null;
  } catch (e) {
    return null;
  }
})();

const slice = createSlice({
  name: "auth",
  initialState: saved || initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      try {
        Cookies.set(
          "auth",
          encrypt(JSON.stringify(state)),
          { expires: 1, sameSite: "strict", secure: true } // 1-day expiry
        );
      } catch (e) {}
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove("auth");
    },
    
  },
});

export const { loginSuccess, logout } = slice.actions;
export default slice.reducer;
