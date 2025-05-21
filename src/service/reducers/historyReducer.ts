import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationType } from "../../types/paginationType";
import { Review } from "../../types/submissionType";

interface HistoryState {
  historySubmission: PaginationType & { user: Review[] };
  reviewerSubmission: PaginationType & { reviewer: Review[] };
}

const initialState: HistoryState = {
  historySubmission: {
    user: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  reviewerSubmission: {
    reviewer: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistorySubmission: (state, action) => {
      state.historySubmission = action.payload;
    },
    setReviewerSubmission: (state, action) => {
      state.reviewerSubmission = action.payload;
    },

    setLimit: (state, action: PayloadAction<{ key: "historySubmission" | "reviewerSubmission"; limit: number }>) => {
      const { key, limit } = action.payload;
      const target = state[key];

      if (target) {
        target.limit = limit;
        target.currentPage = 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<{ key: "historySubmission" | "reviewerSubmission"; currentPage: number }>) => {
      const { key, currentPage } = action.payload;
      const target = state[key];

      if (target) {
        target.currentPage = currentPage;
      }
    },
  },
});

export const { setHistorySubmission, setReviewerSubmission, setCurrentPage, setLimit } = historySlice.actions;

export default historySlice.reducer;
