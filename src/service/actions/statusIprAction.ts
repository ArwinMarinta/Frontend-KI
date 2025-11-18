import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setStatusByType, getStatusAllByType } from "../reducers/statusReducer";
import { toast } from "sonner";

export const getStatusIpr = (currentPage: number, limit: number, type: string, search:string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/central-status/type/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
          search: search,
        },
      });

      dispatch(
        setStatusByType({
          type,
          payload: {
            center: response.data?.data ?? [],
            currentPage: response.data?.pagination?.currentPage ?? 1,
            totalPages: response.data?.pagination?.totalPages ?? 1,
            totalValue: response.data?.pagination?.totalData ?? 0,
            limit: response.data?.pagination?.limit ?? 10,
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


export const getAllStatusByType = (  type: string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/central-status/type/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      });

      dispatch(
        getStatusAllByType({
          type,
          payload: response.data?.data ?? [],
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


export const storeStatusIpr = (type: string, title: string, limit:number, page:number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.post(
        `${API_URL}/central-status`,
        {
          name: title,
          type: type,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    await  dispatch(getStatusIpr(page, limit,  type, ""));
      toast.success(response?.data?.message);

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


export const updateStatusIpr = (id:number | string, type: string, title: string, limit: number, page: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.patch(
        `${API_URL}/central-status/${id}`,
        {
          name: title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    await dispatch(getStatusIpr(page, limit, type, ""));
      toast.success(response?.data?.message);

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

export const deleteStatusIpr = (id: number | string | null, type: string , limit: number, page: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.delete(
        `${API_URL}/central-status/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getStatusIpr(page, limit, type, ""));
      toast.success(response?.data?.message);

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