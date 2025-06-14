import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../service/store";
import { useState } from "react";
import { PeriodForm } from "../../../../types/fundingType";

const useManageGroup = () => {
  const { years } = useParams<{ years: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<PeriodForm>({
    group: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState<{
    group: string | null;
    startDate: string | null;
    endDate: string | null;
  }>({
    group: null,
    startDate: null,
    endDate: null,
  });
  const { token } = useSelector((state: RootState) => state.auth);
  const { groupDetail } = useSelector((state: RootState) => state.manage);
  const { currentPage, limit } = useSelector((state: RootState) => state.manage.groupsData);

  return {
    form,
    setForm,
    navigate,
    dispatch,
    token,
    groupDetail,
    currentPage,
    limit,
    years,
    errors,
    setErrors,
  };
};

export default useManageGroup;
