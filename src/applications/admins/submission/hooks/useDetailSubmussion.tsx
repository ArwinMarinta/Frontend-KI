import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getDetailSubmission } from "../../../../service/actions/submissionAction";
import { useParams } from "react-router-dom";
import { setNullDetail } from "../../../../service/reducers/submissionReducer";

const useDetailSubmussion = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { detailSubmission } = useSelector((state: RootState) => state.submission);
  const [current, setCurrent] = useState("Informasi Umum");

  const handleChange = (value: string) => {
    setCurrent(value);
  };

  useEffect(() => {
    if (token) {
      dispatch(setNullDetail());
      dispatch(getDetailSubmission(id));
    }
  }, [token, dispatch, id]);

  return {
    detailSubmission,
    handleChange,
    current,
  };
};

export default useDetailSubmussion;
