import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../../types/fundingType";
import { FaqCategoryType, FaqType } from "../../types/faqType";
import { DocumentCategoryType, DocumentType } from "../../types/document";

interface LandingState {
  home: {
    year: string | null;
    period: Group[];
  };
  faq: {
    faq: FaqType[] | null;
    limit: number;
  };
  faqCategory: {
    category: FaqCategoryType[] | null;
    limit: number;
  };
  doc: {
    doc: DocumentType[] | null;
    limit: number;
  };
  docCategory: {
    category: DocumentCategoryType[] | null;
    limit: number;
  };
}

const initialState: LandingState = {
  home: {
    year: null,
    period: [],
  },
  faq: {
    faq: null,
    limit: 20,
  },
  faqCategory: {
    category: null,
    limit: 999,
  },
  doc: {
    doc: null,
    limit: 20,
  },
  docCategory: {
    category: null,
    limit: 999,
  },
};

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setHome: (state, action) => {
      state.home = action.payload;
    },
    setFaq: (state, action) => {
      state.faq = action.payload;
    },
    setFaqCategory: (state, action) => {
      state.faqCategory = action.payload;
    },
    setDoc: (state, action) => {
      state.doc = action.payload;
    },
    setDocCategory: (state, action) => {
      state.docCategory = action.payload;
    },
  },
});

export const { setHome, setFaq, setFaqCategory, setDoc, setDocCategory } = landingSlice.actions;

export default landingSlice.reducer;
