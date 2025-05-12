import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useComplate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, submissionId, submissionType } = location.state || {};
  useEffect(() => {
    if (!type || !submissionType || !submissionId) {
      navigate("*");
    }
  }, [type, submissionType, submissionId, navigate]);

  console.log(type);
  console.log(submissionId);
  console.log(submissionType);
  return {
    type,
    submissionId,
    submissionType,
  };
};

export default useComplate;
