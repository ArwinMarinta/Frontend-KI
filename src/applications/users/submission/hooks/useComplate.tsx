import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useComplate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { types, submissionId, submissionType } = location.state || {};
  console.log(types, submissionType, submissionId);
  useEffect(() => {
    // const invalidTypes = ["Merek", "Hak Cipta"];
    if (!types || !submissionType || !submissionId) {
      navigate("*");
    }
    // if (types === "Lengkapi Berkas" && invalidTypes.includes(submissionType)) {
    //   navigate("*");
    // }
  }, [types, submissionType, submissionId, navigate]);

  return {
    types,
    submissionId,
    submissionType,
  };
};

export default useComplate;
