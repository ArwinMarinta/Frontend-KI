import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../../types/fundingType";
import { FaqCategoryType, FaqType } from "../../types/faqType";
import { DocumentCategoryType, DocumentType } from "../../types/document";
import { CopyrightType, SubCopyrightType } from "../../types/copyright";
import { IndustialDesignSubType, IndustialDesignType } from "../../types/industrialDesignType";
import { CategoryPatent } from "../../types/patentType";
import { CategoryBrandType } from "../../types/brandType";

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
  submissionType: {
    copyright: {
      type: CopyrightType[] | null;
      subtype: SubCopyrightType[] | null;
    };
    indusDesign: {
      type: IndustialDesignType[] | null;
      subtype: IndustialDesignSubType[] | null;
    };
    paten: {
      type: CategoryPatent[] | null;
    };
    brand: {
      type: CategoryBrandType[] | null;
    };
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
  submissionType: {
    copyright: {
      type: null,
      subtype: null,
    },
    indusDesign: {
      type: null,
      subtype: null,
    },
    paten: {
      type: null,
    },
    brand: {
      type: null,
    },
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
    setSubmissionType: (state, action) => {
      state.submissionType = action.payload;
    },
  },
});

export const { setHome, setFaq, setFaqCategory, setDoc, setDocCategory, setSubmissionType } = landingSlice.actions;

export default landingSlice.reducer;
