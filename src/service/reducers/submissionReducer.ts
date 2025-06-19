import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationType } from "../../types/paginationType";
import { Review } from "../../types/submissionType";
import { DashboardData } from "../../types/dashboard";

interface SubmissionState {
  patentData: PaginationType & { patent: Review[] };
  copyrightData: PaginationType & { copyright: Review[] };
  brandData: PaginationType & { brand: Review[] };
  industrialDesignData: PaginationType & { design: Review[] };
  detailSubmission: Review | null;
  progresSubmission: Review | null;
  dashboard: DashboardData | null;
}

const initialState: SubmissionState = {
  patentData: {
    patent: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  copyrightData: {
    copyright: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  brandData: {
    brand: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  industrialDesignData: {
    design: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  progresSubmission: null,
  detailSubmission: null,
  dashboard: null,
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    setPatentData: (state, action) => {
      state.patentData = action.payload;
    },
    setCopyrightData: (state, action) => {
      state.copyrightData = action.payload;
    },
    setBrandData: (state, action) => {
      state.brandData = action.payload;
    },
    setIndustrialDesignData: (state, action) => {
      state.industrialDesignData = action.payload;
    },
    setDetailSubmission: (state, action) => {
      state.detailSubmission = action.payload;
    },
    setProgresSubmission: (state, action) => {
      state.progresSubmission = action.payload;
    },
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
    setNullDetail: (state) => {
      state.detailSubmission = null;
    },
    setLimit: (state, action: PayloadAction<{ key: "patentData" | "copyrightData" | "brandData" | "industrialDesignData"; limit: number }>) => {
      const { key, limit } = action.payload;
      const target = state[key];

      if (target) {
        target.limit = limit;
        target.currentPage = 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<{ key: "patentData" | "copyrightData" | "brandData" | "industrialDesignData"; currentPage: number }>) => {
      const { key, currentPage } = action.payload;
      const target = state[key];

      if (target) {
        target.currentPage = currentPage;
      }
    },
  },
});

export const { setDashboard, setPatentData, setNullDetail, setProgresSubmission, setLimit, setCurrentPage, setDetailSubmission, setCopyrightData, setBrandData, setIndustrialDesignData } = submissionSlice.actions;

export default submissionSlice.reducer;
