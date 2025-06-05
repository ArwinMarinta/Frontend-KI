import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect, useState } from "react";
import { deletesHelpCenter, getHelpCenter, getHelpCenterById, updateHelpCenter } from "../../../../service/actions/helpCenterAction";
import { useNavigate, useParams } from "react-router-dom";
import { FormReplyHelpCenter } from "../../../../types/helpCenter";

const useHelpCenter = () => {
  const { ids } = useParams<{ ids: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const { center, limit, currentPage, totalPages } = useSelector((state: RootState) => state.information.helpCenter);
  const { helpCenterDetail } = useSelector((state: RootState) => state.information);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormReplyHelpCenter>({
    answer: "",
  });

  const [errors, setErrors] = useState({
    answer: false,
  });

  useEffect(() => {
    if (token || search !== "") {
      dispatch(getHelpCenter(currentPage, limit, search));
    }
  }, [token, dispatch, currentPage, limit, search]);

  const handleDeleteFaq = async (id: number | string | null) => {
    if (token) {
      const newPage = center.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;

      dispatch(deletesHelpCenter(id, newPage, limit));
    }
  };

  useEffect(() => {
    if (ids) {
      dispatch(getHelpCenterById(ids));
    }
  }, [token, dispatch, ids]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      answer: form.answer.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.answer) return;

    dispatch(updateHelpCenter(ids, form.answer, currentPage, limit, navigate));
  };

  return {
    ids,
    center,
    currentPage,
    totalPages,
    limit,
    handleDeleteFaq,
    dispatch,
    helpCenterDetail,
    setForm,
    form,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    search,
    setSearch,
  };
};

export default useHelpCenter;
