import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setHelpCenter, setHelpCenterDetail, setReportAnalitic } from "../reducers/informationReducer";
import { NavigateFunction } from "react-router-dom";
import { FormCreateHelpCenter } from "../../types/helpCenter";
import { FormReportAnaliticType } from "../../types/document";
import { toast } from "sonner";

export const getHelpCenter = (currentPage: number, limit: number, search?: string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/help-center`, {
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
        setHelpCenter({
          center: response.data.helpCenter,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalValue: response.data.totalTerms,
          limit: response.data.limit,
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

export const getHelpCenterById = (id: number | string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/help-center/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setHelpCenterDetail(response.data.helpCenter));
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

export const createHelpCenter = (form: FormCreateHelpCenter, navigate: NavigateFunction): AppThunk => {
  return async () => {
    try {
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("problem", form.problem);
      formData.append("message", form.message);
      if (form.document) {
        formData.append("document", form.document);
      }

      const response = await axios.post(`${API_URL}/help-center`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/hubungi-kami", {
        state: { message: response.data.message },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const updateHelpCenter = (id: string | undefined, answer: string, currentPage: number, limit: number, navigate: NavigateFunction): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.patch(
        `${API_URL}/help-center/${id}`,
        {
          answer: answer,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getHelpCenter(currentPage, limit));
      navigate("/informasi/pusat-bantuan");
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

export const deletesHelpCenter = (id: number | string | null, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.delete(
        `${API_URL}/help-center/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getHelpCenter(currentPage, limit));
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

export const getReportAndAnalitic = (currentPage?: number, limit?: number, form?: FormReportAnaliticType): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/submission/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          currentPage: currentPage,
          limit: limit,
          namaPengguna: form?.namaPengguna,
          jenisPengajuan: form?.jenisPengajuan,
          skemaPengajuan: form?.skemaPengajuan,
          progressPengajuan: form?.progressPengajuan,
          peran: form?.peran,
          instansi: form?.instansi,
          startDate: form?.startDate,
          endDate: form?.endDate,
        },
      });

      dispatch(
        setReportAnalitic({
          report: response.data.submissions,
          currentPage: response.data.currentPage ?? 1,
          totalPages: response.data.totalPages ?? 1,
          totalValue: response.data.totalTerms,
          limit: response.data.limit ?? 10,
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
