import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationType } from "../../types/paginationType";
import { StatusCentral } from "../../types/submissionType";


interface StatusDjki {
  patent: PaginationType & { center: StatusCentral[] };
  hakCipta: PaginationType & { center: StatusCentral[] };
  brand: PaginationType & { center: StatusCentral[] };
  desainIndustri: PaginationType & { center: StatusCentral[] };
  patentAll: StatusCentral[];
  copyrightAll: StatusCentral[];
  brandAll: StatusCentral[];
  desainIndustriAll: StatusCentral[];
  detailStatus: StatusCentral | null;
}

const initialState: StatusDjki = {
  patent: {
    center: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  hakCipta: {
    center: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  brand: {
    center: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  desainIndustri: {
    center: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  patentAll: [],
  brandAll: [],
  copyrightAll: [],
  desainIndustriAll: [],
  detailStatus: null,

}


const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatusByType: (
      state,
      action: PayloadAction<{ type: string; payload: StatusDjki["patent"] }>
    ) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "patent":
          state.patent = payload;
          break;
        case "hakcipta":
          state.hakCipta = payload;
          break;
        case "brand":
          state.brand = payload;
          break;
        case "desainIndustri":
          state.desainIndustri = payload;
          break;
      }
    },

    getStatusAllByType: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "patent":
          state.patentAll = payload;
          break;
        case "hakCipta":
          state.copyrightAll = payload;
          break;
        case "merek":
          state.brandAll = payload;
          break;
        case "desainIndustri":
          state.desainIndustriAll = payload;
          break;
        default:
          console.warn("Unknown IPR type:", type);
      }
    },
    setLimit: (state, action: PayloadAction<{ key: "patent" | "hakCipta" | "brand" | "desainIndustri"; limit: number }>) => {
      const { key, limit } = action.payload;
      const target = state[key];

      if (target) {
        target.limit = limit;
        target.currentPage = 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<{ key: "patent" | "hakCipta" | "brand" | "desainIndustri"; currentPage: number }>) => {
      const { key, currentPage } = action.payload;
      const target = state[key];

      if (target) {
        target.currentPage = currentPage;
      }
    },
    setDetailStatus: (state, action) => {
      state.detailStatus = action.payload;
    },

    clearDetailStatus: (state) => {
      state.detailStatus = null;
    },
  },

})



export const { setStatusByType, getStatusAllByType, setLimit, setCurrentPage, setDetailStatus, clearDetailStatus } = statusSlice.actions;

export default statusSlice.reducer;