import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie, removeCookie } from "../../utils/cookie";
import { User2 } from "../../types/userType";

interface AuthState {
  user: User2 | null;
  token: string | null;
}

const initialState: AuthState = {
  token: getCookie("token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        setCookie("token", action.payload, 1);
      } else {
        removeCookie("token");
      }
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
