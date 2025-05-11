import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TermType } from "../../types/termsType";
import { PaginationType } from "../../types/paginationType";
import { FaqCategoryType, FaqType } from "../../types/faqType";
import { DocumentCategoryType, DocumentType } from "../../types/document";
import { PeriodType, QuotaItem, YearsType } from "../../types/fundingType";

interface ManageState {
  termsData: PaginationType & { terms: TermType[] };
  faqsCategoryData: PaginationType & { faqs: FaqCategoryType[] };
  faqsData: PaginationType & { faqs: FaqType[] };
  documentsCategoryData: PaginationType & { docs: DocumentCategoryType[] };
  documentsData: PaginationType & { docs: DocumentType[] };
  periodsData: PaginationType & { years: YearsType[] };
  groupsData: PaginationType & { group: PeriodType[] };
  quotasData: PaginationType & { quota: QuotaItem[] };
  faqsDetail: FaqType | null;
  faqCategoryDetail: FaqType | null;
  termsDetail: TermType | null;
  categoryDocumentDetail: DocumentType | null;
  documentDetail: DocumentType | null;
  groupDetail: PeriodType | null;
  quotaDetail: QuotaItem | null;
}

const initialState: ManageState = {
  termsData: {
    terms: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 10,
  },
  faqsCategoryData: {
    faqs: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  faqsData: {
    faqs: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  documentsCategoryData: {
    docs: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  documentsData: {
    docs: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  periodsData: {
    years: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  groupsData: {
    group: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },
  quotasData: {
    quota: [],
    currentPage: 1,
    totalPages: 1,
    totalValue: 0,
    limit: 2,
  },

  termsDetail: null,
  categoryDocumentDetail: null,
  documentDetail: null,
  faqsDetail: null,
  faqCategoryDetail: null,
  groupDetail: null,
  quotaDetail: null,
};

const manageSlice = createSlice({
  name: "manage",
  initialState,
  reducers: {
    setTerms: (state, action) => {
      state.termsData = action.payload;
    },
    setCategoryFaqs: (state, action) => {
      state.faqsCategoryData = action.payload;
    },
    setFaqs: (state, action) => {
      state.faqsData = action.payload;
    },
    setDocumentsCategoryData: (state, action) => {
      state.documentsCategoryData = action.payload;
    },
    setDocumentsData: (state, action) => {
      state.documentsData = action.payload;
    },
    setYearsData: (state, action) => {
      state.periodsData = action.payload;
    },
    setGroupData: (state, action) => {
      state.groupsData = action.payload;
    },
    setQuotaData: (state, action) => {
      state.quotasData = action.payload;
    },

    setTermsDetail: (state, action) => {
      state.termsDetail = action.payload;
    },
    setCategoryDocumentDetail: (state, action) => {
      state.categoryDocumentDetail = action.payload;
    },
    setDocumentDetail: (state, action) => {
      state.documentDetail = action.payload;
    },
    setFaqDetail: (state, action) => {
      state.faqsDetail = action.payload;
    },
    setCategoryFaqDetail: (state, action) => {
      state.faqCategoryDetail = action.payload;
    },
    setGroupDetail: (state, action) => {
      state.groupDetail = action.payload;
    },
    setQuotaDetail: (state, action) => {
      state.quotaDetail = action.payload;
    },

    setLimit: (state, action: PayloadAction<{ key: "termsData" | "faqsData" | "faqsCategoryData" | "documentsCategoryData" | "documentsData" | "periodsData" | "groupsData" | "quotasData"; limit: number }>) => {
      const { key, limit } = action.payload;
      const target = state[key];

      if (target) {
        target.limit = limit;
        target.currentPage = 1;
      }
    },
    setCurrentPage: (state, action: PayloadAction<{ key: "termsData" | "faqsData" | "faqsCategoryData" | "documentsCategoryData" | "documentsData" | "periodsData" | "groupsData" | "quotasData"; currentPage: number }>) => {
      const { key, currentPage } = action.payload;
      const target = state[key];

      if (target) {
        target.currentPage = currentPage;
      }
    },
  },
});

export const { setTerms, setFaqDetail, setQuotaDetail, setGroupDetail, setCategoryFaqDetail, setCategoryDocumentDetail, setDocumentDetail, setCategoryFaqs, setTermsDetail, setLimit, setCurrentPage, setFaqs, setDocumentsCategoryData, setDocumentsData, setYearsData, setQuotaData, setGroupData } =
  manageSlice.actions;

export default manageSlice.reducer;
