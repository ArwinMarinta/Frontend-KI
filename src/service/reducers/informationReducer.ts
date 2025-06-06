import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationType } from "../../types/paginationType";
import { HelpCenterType } from "../../types/helpCenter";
import { ActivityLog } from "../../types/logActivity";
import { ReportandAnalitic } from "../../types/document";

interface InformationState {
  helpCenter: PaginationType & { center: HelpCenterType[] };
  helpCenterDetail: HelpCenterType | null;
  logActivity: PaginationType & { activity: ActivityLog[] };
  reportAndAnalitic: PaginationType & { report: ReportandAnalitic[] };
}

const initialState: InformationState = {
  helpCenter: {
    center: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  logActivity: {
    activity: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  reportAndAnalitic: {
    report: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
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
    setReportAnalitic: (state, action) => {
      state.reportAndAnalitic = action.payload;
    },
    setNullReportAnalitic: (state) => {
      state.reportAndAnalitic = state.reportAndAnalitic = {
        report: [],
        currentPage: 1,
        totalPages: 1,
        totalValue: 0,
        limit: 10,
      };
    },
    setLimit: (state, action: PayloadAction<{ key: "helpCenter" | "logActivity" | "reportAndAnalitic"; limit: number }>) => {
      const { key, limit } = action.payload;
      const target = state[key];

      if (target) {
        target.limit = limit;
        target.currentPage = 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<{ key: "helpCenter" | "logActivity" | "reportAndAnalitic"; currentPage: number }>) => {
      const { key, currentPage } = action.payload;
      const target = state[key];

      if (target) {
        target.currentPage = currentPage;
      }
    },
  },
});

export const { setNullReportAnalitic, setReportAnalitic, setHelpCenter, setCurrentPage, setLogActivity, setLimit, setHelpCenterDetail } = informationSlice.actions;

export default informationSlice.reducer;
