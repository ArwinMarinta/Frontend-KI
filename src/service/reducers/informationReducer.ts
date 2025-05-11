import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationType } from "../../types/paginationType";
import { HelpCenterType } from "../../types/helpCenter";
import { ActivityLog } from "../../types/logActivity";

interface InformationState {
  helpCenter: PaginationType & { center: HelpCenterType[] };
  helpCenterDetail: HelpCenterType | null;
  logActivity: PaginationType & { activity: ActivityLog[] };
}

const initialState: InformationState = {
  helpCenter: {
    center: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  logActivity: {
    activity: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  helpCenterDetail: null,
};

const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {
    setHelpCenter: (state, action) => {
      state.helpCenter = action.payload;
    },
    setHelpCenterDetail: (state, action) => {
      state.helpCenterDetail = action.payload;
    },
    setLogActivity: (state, action) => {
      state.logActivity = action.payload;
    },
    setLimit: (state, action: PayloadAction<{ key: "helpCenter" | "logActivity"; limit: number }>) => {
      const { key, limit } = action.payload;
      const target = state[key];

      if (target) {
        target.limit = limit;
        target.currentPage = 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<{ key: "helpCenter" | "logActivity"; currentPage: number }>) => {
      const { key, currentPage } = action.payload;
      const target = state[key];

      if (target) {
        target.currentPage = currentPage;
      }
    },
  },
});

export const { setHelpCenter, setCurrentPage, setLogActivity, setLimit, setHelpCenterDetail } = informationSlice.actions;

export default informationSlice.reducer;
