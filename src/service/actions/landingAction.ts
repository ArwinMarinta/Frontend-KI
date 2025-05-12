import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setDoc, setDocCategory, setFaq, setFaqCategory, setSubmissionType } from "../reducers/landingReducer";

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
            type: responseType.data?.typeCreation,
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
      const { type } = getState().landing.submissionType.copyright;

      const responseType = await axios.get(`${API_URL}/copyright/sub-type/not-pagination/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        setSubmissionType({
          copyright: {
            type: type ?? null,
            subtype: responseType.data?.subTypeCreation ?? null,
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
            type: response.data?.brandTypes ?? null,
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
