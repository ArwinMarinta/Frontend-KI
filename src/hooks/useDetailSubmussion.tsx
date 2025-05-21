import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../service/store";
import { getDetailSubmission } from "../service/actions/submissionAction";
import { useLocation, useParams } from "react-router-dom";
import { setNullDetail } from "../service/reducers/submissionReducer";
import { getTermsLanding } from "../service/actions/landingAction";

const useDetailSubmussion = () => {
  const location = useLocation();
  const { submissionId, submissionType, status, types } = location.state || {};
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { detailSubmission } = useSelector((state: RootState) => state.submission);
  const { terms } = useSelector((state: RootState) => state.landing);
  const [current, setCurrent] = useState("Informasi Umum");
  const [statusDetail, setStatusDetail] = useState("Detail");
  const { name } = useParams();

  const handleChange = (value: string, status?: string) => {
    setCurrent(value);
    setStatusDetail(status ?? "Detail");
  };
  const toSlug = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  useEffect(() => {
    if (token) {
      dispatch(setNullDetail());
      dispatch(getDetailSubmission(submissionId));
      dispatch(getTermsLanding());
    }
  }, [token, dispatch, submissionId]);

  return {
    detailSubmission,
    handleChange,
    current,
    submissionType,
    toSlug,
    status,
    terms,
    name,
    statusDetail,
    types,
    submissionId,
  };
};

export default useDetailSubmussion;
