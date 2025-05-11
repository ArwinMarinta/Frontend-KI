import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { QuotaForm } from "../../../../types/fundingType";

const useManageQuota = () => {
  const { group } = useParams<{ group: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<QuotaForm>({
    quota: 0,
    remainingQuota: 0,
  });
  const [errors, setErrors] = useState({
    quota: false,
    remainingQuota: false,
  });
  const { token } = useSelector((state: RootState) => state.auth);
  const { quotaDetail } = useSelector((state: RootState) => state.manage);
  const { currentPage, limit } = useSelector((state: RootState) => state.manage.groupsData);

  return {
    form,
    setForm,
    navigate,
    dispatch,
    token,
    quotaDetail,
    currentPage,
    limit,
    group,
    errors,
    setErrors,
  };
};

export default useManageQuota;
