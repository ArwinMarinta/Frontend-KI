import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLoadingProses = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return {
    loading,
    setLoading,
    navigate,
  };
};

export default useLoadingProses;
