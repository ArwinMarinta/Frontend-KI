// import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { setUser } from "../reducers/authReducer";
import { AppThunk } from "../store";
import { setAccount, setUserDetails } from "../reducers/userReducer";
import { User3, UserForm } from "../../types/userType";
import { NavigateFunction } from "react-router-dom";
import { API_URL } from "../../config/config";
import { logout } from "./authAction";
import { toast } from "sonner";
import { getSubmissionBrand, getSubmissionCopyRight, getSubmissionIndustrialDesign, getSubmissionPatent } from "./submissionAction";

export const getMe = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      if (!token) {
        dispatch(logout());
        return Promise.reject();
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setUser(response.data.data));
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          dispatch(logout());
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const updateProfile = (form: User3, id: string | number, onSuccess?: () => void): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.patch(
        `${API_URL}/user/${id}`,

        {
          fullname: form.fullname,
          phoneNumber: form.phoneNumber,
          faculty: form.faculty,
          studyProgram: form.studyProgram,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getMe());
      toast.success(response?.data?.message);
      if (onSuccess) onSuccess();
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

export const getAccount = (currentPage: number, limit: number, search?: string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user`, {
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
        setAccount({
          users: response.data.users,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalValue: response.data.totalUsers,
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

export const getUserById = (id: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setUserDetails(response.data.user));
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

export const deleteUser = (id: number | string | null, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.delete(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getAccount(currentPage, limit));
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

export const createAccount = (formUser: UserForm, currentPage: number, limit: number, navigate: NavigateFunction): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.post(
        `${API_URL}/user`,
        {
          fullname: formUser.fullname,
          email: formUser.email,
          password: formUser.password,
          faculty: formUser.faculty,
          studyProgram: formUser.studyProgram,
          institution: formUser.institution,
          phoneNumber: formUser.phoneNumber,
          role: formUser.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getAccount(currentPage, limit));
      navigate("/pengaturan/akun");
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

export const updateReviewer = (id: number | string | null, reviewerId: number, type: string, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.patch(
        `${API_URL}/user-submission/submission-reviewer/${id}`,
        { reviewerId: reviewerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (type === "hak-cipta") {
        dispatch(getSubmissionCopyRight(currentPage, limit));
      }
      if (type === "paten") {
        dispatch(getSubmissionPatent(currentPage, limit));
      }
      if (type === "merek") {
        dispatch(getSubmissionBrand(currentPage, limit));
      }
      if (type === "desain-industri") {
        dispatch(getSubmissionIndustrialDesign(currentPage, limit));
      }
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
export const updateSubmissionStatus = (id: number | string | null, centralStatus: number | string | null, type: string, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {

      console.log("centralStatus", centralStatus )
      const { token } = getState().auth;

      const response = await axios.patch(
        `${API_URL}/user-submission/submission-status/${id}`,
        { centralStatusId: centralStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (type === "hak-cipta") {
        dispatch(getSubmissionCopyRight(currentPage, limit));
      }
      if (type === "paten") {
        dispatch(getSubmissionPatent(currentPage, limit));
      }
      if (type === "merek") {
        dispatch(getSubmissionBrand(currentPage, limit));
      }
      if (type === "desain-industri") {
        dispatch(getSubmissionIndustrialDesign(currentPage, limit));
      }
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.success(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const updateAccount = (id: number | undefined, formUser: UserForm, currentPage: number, limit: number, navigate: NavigateFunction): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const payload: Partial<UserForm> = {};
      Object.entries(formUser).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          payload[key as keyof UserForm] = value;
        }
      });

      const response = await axios.patch(`${API_URL}/user/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getAccount(currentPage, limit));
      navigate("/pengaturan/akun");
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.success(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};
