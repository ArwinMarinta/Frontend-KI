import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setHistorySubmission, setReviewerSubmission } from "../reducers/historyReducer";

export const getUserSubmission = (currentPage: number, limit: number, id: number | undefined): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/by-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
          submissionTypeId: id,
        },
      });

      dispatch(
        setHistorySubmission({
          user: response.data?.userSubmissionsSorted ?? [],
          currentPage: response.data?.currentPage ?? 1,
          totalPages: response.data?.totalPages ?? 1,
          totalValue: response.data?.totalUserSubmissions ?? 0,
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
export const getReviewerSubmission = (currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/by-reviewer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
        },
      });

      dispatch(
        setReviewerSubmission({
          reviewer: response.data?.userSubmissions ?? [],
          currentPage: response.data?.currentPage ?? 1,
          totalPages: response.data?.totalPages ?? 1,
          totalValue: response.data?.totalUserSubmissions ?? 0,
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
