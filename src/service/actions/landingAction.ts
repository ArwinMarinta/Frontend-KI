import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setDocCategory, setFaq, setFaqCategory } from "../reducers/landingReducer";

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
