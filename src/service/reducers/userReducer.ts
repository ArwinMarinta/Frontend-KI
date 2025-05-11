import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/userType";
import { PaginationType } from "../../types/paginationType";

interface UserState {
  account: PaginationType & { users: User[] };
  userDetails: User | null;
}

const initialState: UserState = {
  account: {
    users: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setLimitUser: (state, action) => {
      state.account.limit = action.payload;
      state.account.currentPage = 1;
    },
    setCurrentPageUser: (state, action) => {
      state.account.currentPage = action.payload;
    },
  },
});

export const { setAccount, setUserDetails, setCurrentPageUser, setLimitUser } = userSlice.actions;

export default userSlice.reducer;
