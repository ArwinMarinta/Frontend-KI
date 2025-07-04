import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setDetailBrand, setDetailCopyright, setDetailDesign, setDetailPaten, setDoc, setDocCategory, setFaq, setFaqCategory, setIprCount, setNotifications, setQuota, setSubmissionType, setTermsLanding, setUserDashboard } from "../reducers/landingReducer";
import { toast } from "sonner";

export const getFaqLanding = (title: string | undefined, limit: number, search?: string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/faq/by-type/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: limit,
          search: search,
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
export const getDocumentLanding = (title: string | undefined, limit: number, search?: string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      console.log(title);

      const response = await axios.get(`${API_URL}/document/by-type/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: limit,
          search: search,
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

      console.log(responseType.data.periods.group);

      dispatch(setQuota(responseType?.data?.periods[0]?.group ?? null));
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

export const getDetailSubmissionLanding = (type: string, id: string | undefined): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/get-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (type === "Hak Cipta") {
        dispatch(setDetailCopyright(response?.data?.userSubmission?.submission?.copyright ?? null));
      }
      if (type === "Paten") {
        dispatch(setDetailPaten(response.data.userSubmission.submission.patent ?? null));
      }
      if (type === "Merek") {
        dispatch(setDetailBrand(response.data.userSubmission.submission.brand ?? null));
      }
      if (type === "Desain Industri") {
        dispatch(setDetailDesign(response.data.userSubmission.submission.industrialDesign ?? null));
      }
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

export const getNotification = (limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const responseType = await axios.get(`${API_URL}/notification/by-user-id`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: limit,
        },
      });

      dispatch(
        setNotifications({
          notifications: responseType?.data.notification ?? null,
          totalUnread: responseType?.data.totalUnread ?? 0,
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

export const updateNotification = (limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.patch(
        `${API_URL}/notification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response?.data?.message);
      dispatch(getNotification(limit));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.success(error?.response?.data?.message);
        // if (error.response?.status === 401) {
        //   console.log(error.response.data.message);
        // } else {
        //   console.log("No response received:", error.message);
        // }
      }
    }
  };
};

export const getIprCount = (): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/user-submission/count`);

      dispatch(
        setIprCount({
          hakCipta: response.data.data.hakCipta ?? 0,
          paten: response.data.data.paten ?? 0,
          merek: response.data.data.merek ?? 0,
          desainIndustri: response.data.data.desainIndustri ?? 0,
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

export const getUserDashboard = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const response = await axios.get(`${API_URL}/user-submission/user-dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setUserDashboard(response.data ?? null));
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
