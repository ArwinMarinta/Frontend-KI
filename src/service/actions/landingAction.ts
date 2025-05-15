import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setDoc, setDocCategory, setFaq, setFaqCategory, setQuota, setSubmissionType, setTermsLanding } from "../reducers/landingReducer";

export const getFaqLanding = (title: string | undefined, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/faq/by-type/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: limit,
        },
      });

      dispatch(
        setFaq({
          faq: response.data?.faqs ?? [],
          limit: response.data?.limit ?? 999,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};
export const getFaqCateoryLanding = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/faq/by-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 999,
        },
      });

      dispatch(
        setFaqCategory({
          category: response.data?.faqs ?? [],
          limit: response.data?.limit ?? 999,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};
export const getDocumentLanding = (title: string | undefined, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/document/by-type/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: limit,
        },
      });

      dispatch(
        setDoc({
          doc: response.data?.docs ?? [],
          limit: response.data?.limit ?? 999,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getDocumentCateoryLanding = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/document/by-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 999,
        },
      });

      dispatch(
        setDocCategory({
          category: response.data?.docs ?? [],
          limit: response.data?.limit ?? 999,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getTypeCopyright = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const responseType = await axios.get(`${API_URL}/copyright/type/not-pagination`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        setSubmissionType({
          copyright: {
            typeCopy: responseType.data?.typeCreation ?? null,
            subTypeCopy: null,
          },
          indusDesign: {
            typeDesign: null,
            subtypeDesain: null,
          },
          paten: {
            typePaten: null,
          },
          brand: {
            typeBrand: null,
          },
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getSubTypeCopyright = (id: number | null | undefined): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const { typeCopy } = getState().landing.submissionType.copyright;

      const responseType = await axios.get(`${API_URL}/copyright/sub-type/not-pagination/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        setSubmissionType({
          copyright: {
            typeCopy: typeCopy ?? null,
            subTypeCopy: responseType.data?.subTypeCreation ?? null,
          },
          indusDesign: {
            typeDesign: null,
            subtypeDesain: null,
          },
          paten: {
            typePaten: null,
          },
          brand: {
            typeBrand: null,
          },
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getTypeIndusDesign = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const responseType = await axios.get(`${API_URL}/design-industri/type/not-pagination`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        setSubmissionType({
          copyright: {
            typeCopy: null,
            subTypeCopy: null,
          },
          indusDesign: {
            typeDesign: responseType.data.typeDesigns ?? null,
            subtypeDesain: null,
          },
          paten: {
            typePaten: null,
          },
          brand: {
            typeBrand: null,
          },
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getSubTypeIndusDesign = (id: number | null | undefined): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const { typeDesign } = getState().landing.submissionType.indusDesign;

      const responseType = await axios.get(`${API_URL}/design-industri/sub-type/not-pagination/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        setSubmissionType({
          copyright: {
            typeCopy: null,
            subTypeCopy: null,
          },
          indusDesign: {
            typeDesign: typeDesign ?? null,
            subtypeDesain: responseType.data?.subTypeDesign ?? null,
          },
          paten: {
            typePaten: null,
          },
          brand: {
            typeBrand: null,
          },
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getTypeBrand = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/brand/type/not-pagination`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        setSubmissionType({
          copyright: {
            typeCopy: null,
            subTypeCopy: null,
          },
          indusDesign: {
            typeDesign: null,
            subtypeDesain: null,
          },
          paten: {
            typePaten: null,
          },
          brand: {
            typeBrand: response.data?.brandTypes ?? null,
          },
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};
export const getTypePaten = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/patent/type/not-pagination`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        setSubmissionType({
          copyright: {
            typeCopy: null,
            subTypeCopy: null,
          },
          indusDesign: {
            typeDesign: null,
            subtypeDesain: null,
          },
          paten: {
            typePaten: response.data.patentTypes ?? null,
          },
          brand: {
            typeBrand: null,
          },
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getTermsLanding = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/terms/not-pagination`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setTermsLanding(response.data.terms ?? null));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getQuotaLanding = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const responseType = await axios.get(`${API_URL}/period/this-year`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setQuota(responseType.data.periods[0].group ?? null));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};
