import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/userType";
import { PaginationType } from "../../types/paginationType";

interface UserState {
  account: PaginationType & { users: User[] };
  userDetails: User | null;
  reviewer: User[] | null;
}

const initialState: UserState = {
  account: {
    users: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  userDetails: null,
  reviewer: [],
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
    setReviewer: (state, action) => {
      state.reviewer = action.payload;
    },
    setLimit: (state, action: PayloadAction<{ key: "account"; limit: number }>) => {
      const { key, limit } = action.payload;
      const target = state[key];

      if (target) {
        target.limit = limit;
        target.currentPage = 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<{ key: "account"; currentPage: number }>) => {
      const { key, currentPage } = action.payload;
      const target = state[key];

      if (target) {
        target.currentPage = currentPage;
      }
    },
  },
});

export const { setReviewer, setAccount, setUserDetails, setCurrentPageUser, setLimitUser, setLimit, setCurrentPage } = userSlice.actions;

export default userSlice.reducer;
