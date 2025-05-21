import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationType } from "../../types/paginationType";
import { IprType } from "../../types/iprType";
import { CategoryPatent } from "../../types/patentType";
import { CategoryBrandType } from "../../types/brandType";
import { CopyrightType, SubCopyrightType } from "../../types/copyright";
import { IndustialDesignType } from "../../types/industrialDesignType";

interface CategoryState {
  categoryIpr: PaginationType & { iprs: IprType[] };
  categoryIprDetail: IprType | null;
  categoryPatent: PaginationType & { patents: CategoryPatent[] };
  categoryPatentDetail: CategoryPatent | null;
  categoryBrand: PaginationType & { brands: CategoryBrandType[] };
  categoryBrandDetail: CategoryBrandType | null;
  categoryCopyright: PaginationType & { copyright: CopyrightType[] };
  categoryCopyrightDetail: CopyrightType | null;
  categorySubCopyright: PaginationType & { copyright: SubCopyrightType[] };
  categorySubCopyrightDetail: SubCopyrightType | null;
  categoryIndustrialDesign: PaginationType & { design: IndustialDesignType[] };
  categoryIndustrialDesignDetail: IndustialDesignType | null;
  categorySubIndustrialDesign: PaginationType & { design: IndustialDesignType[] };
  categorySubIndustrialDesignDetail: IndustialDesignType | null;
}

const initialState: CategoryState = {
  categoryIpr: {
    iprs: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  categoryPatent: {
    patents: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  categoryBrand: {
    brands: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  categoryCopyright: {
    copyright: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  categorySubCopyright: {
    copyright: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  categoryIndustrialDesign: {
    design: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  categorySubIndustrialDesign: {
    design: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  categoryIprDetail: null,
  categoryPatentDetail: null,
  categoryBrandDetail: null,
  categoryCopyrightDetail: null,
  categorySubCopyrightDetail: null,
  categoryIndustrialDesignDetail: null,
  categorySubIndustrialDesignDetail: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryIpr: (state, action) => {
      state.categoryIpr = action.payload;
    },
    setCategoryIprDetail: (state, action) => {
      state.categoryIprDetail = action.payload;
    },
    setCategoryPatents: (state, action) => {
      state.categoryPatent = action.payload;
    },
    setCategoryPatentDetail: (state, action) => {
      state.categoryPatentDetail = action.payload;
    },
    setCategoryBrands: (state, action) => {
      state.categoryBrand = action.payload;
    },
    setCategoryBrandDetail: (state, action) => {
      state.categoryBrandDetail = action.payload;
    },
    setCategoryCopyright: (state, action) => {
      state.categoryCopyright = action.payload;
    },
    setCategoryCopyrightDetail: (state, action) => {
      state.categoryCopyrightDetail = action.payload;
    },
    setCategorySubCopyright: (state, action) => {
      state.categorySubCopyright = action.payload;
    },
    setCategorySubCopyrightDetail: (state, action) => {
      state.categorySubCopyrightDetail = action.payload;
    },
    setCategoryIndustrialDesign: (state, action) => {
      state.categoryIndustrialDesign = action.payload;
    },
    setCategoryIndustrialDesignDetail: (state, action) => {
      state.categoryIndustrialDesignDetail = action.payload;
    },
    setCategorySubIndustrialDesign: (state, action) => {
      state.categorySubIndustrialDesign = action.payload;
    },
    setCategorySubIndustrialDesignDetail: (state, action) => {
      state.categorySubIndustrialDesignDetail = action.payload;
    },

    setLimit: (state, action: PayloadAction<{ key: "categoryIpr" | "categoryPatent" | "categoryBrand" | "categoryCopyright" | "categorySubCopyright" | "categoryIndustrialDesign" | "categorySubIndustrialDesign"; limit: number }>) => {
      const { key, limit } = action.payload;
      const target = state[key];

      if (target) {
        target.limit = limit;
        target.currentPage = 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<{ key: "categoryIpr" | "categoryPatent" | "categoryBrand" | "categoryCopyright" | "categorySubCopyright" | "categoryIndustrialDesign" | "categorySubIndustrialDesign"; currentPage: number }>) => {
      const { key, currentPage } = action.payload;
      const target = state[key];

      if (target) {
        target.currentPage = currentPage;
      }
    },
  },
});

export const {
  setLimit,
  setCategoryPatents,
  setCategoryIndustrialDesign,
  setCategoryIndustrialDesignDetail,
  setCategorySubIndustrialDesign,
  setCategorySubIndustrialDesignDetail,
  setCategoryBrandDetail,
  setCategoryBrands,
  setCategoryCopyright,
  setCategoryCopyrightDetail,
  setCategorySubCopyright,
  setCategorySubCopyrightDetail,
  setCategoryPatentDetail,
  setCurrentPage,
  setCategoryIpr,
  setCategoryIprDetail,
} = categorySlice.actions;

export default categorySlice.reducer;
