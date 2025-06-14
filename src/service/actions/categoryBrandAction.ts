import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setCategoryBrandDetail, setCategoryBrands } from "../reducers/categoryReducer";
import { toast } from "sonner";

export const getCategoryBrand = (currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/brand/type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
        },
      });

      dispatch(
        setCategoryBrands({
          brands: response.data?.brandTypes ?? [],
          currentPage: response.data?.currentPage ?? 1,
          totalPages: response.data?.totalPages ?? 1,
          totalValue: response.data?.totalValue ?? 0,
          limit: response.data?.limit ?? 2,
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

export const getCategoryBrandById = (id: number | string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/brand/type/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setCategoryBrandDetail(response.data.brandType));
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

export const createCategoryBrand = (patent: string, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.post(
        `${API_URL}/brand/type`,
        {
          title: patent,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getCategoryBrand(currentPage, limit));
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const updateCategoryBrand = (id: number | string, title: string, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.patch(
        `${API_URL}/brand/type/${id}`,
        {
          title: title,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getCategoryBrand(currentPage, limit));
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const deleteCategoryBrand = (id: number | string | null, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.delete(
        `${API_URL}/brand/type/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getCategoryBrand(currentPage, limit));
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};
