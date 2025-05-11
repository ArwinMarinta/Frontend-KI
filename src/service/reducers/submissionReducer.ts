import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationType } from "../../types/paginationType";
import { Review, SubmissionProgress } from "../../types/submissionType";
import { DetailSubmissionType } from "../../types/submissionType";

interface SubmissionState {
  patentData: PaginationType & { patent: Review[] };
  copyrightData: PaginationType & { copyright: Review[] };
  brandData: PaginationType & { brand: Review[] };
  industrialDesignData: PaginationType & { design: Review[] };
  detailSubmission: DetailSubmissionType | null;
  progresSubmission: SubmissionProgress[] | null;
}

const initialState: SubmissionState = {
  patentData: {
    patent: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  copyrightData: {
    copyright: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  brandData: {
    brand: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  industrialDesignData: {
    design: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  progresSubmission: null,
  detailSubmission: null,
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

export const { setPatentData, setNullDetail, setProgresSubmission, setLimit, setCurrentPage, setDetailSubmission, setCopyrightData, setBrandData, setIndustrialDesignData } = submissionSlice.actions;

export default submissionSlice.reducer;
