import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect, useState } from "react";
import { getFaqCateoryLanding, getFaqLanding } from "../../../../service/actions/landingAction";

const useFaq = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { category } = useSelector((state: RootState) => state.landing.faqCategory);
  const { faq, limit } = useSelector((state: RootState) => state.landing.faq);
  const [selectedType, setSelectedType] = useState<string>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getFaqCateoryLanding());
  }, [token, dispatch]);

  useEffect(() => {
    if (category && category.length > 0) {
      const typeToUse = selectedType || category[0].type;
      dispatch(getFaqLanding(typeToUse, limit, search));
    }
  }, [category, dispatch, limit, selectedType, search]);

  const handleCategoryChange = (type: string) => {
    setSelectedType(type);
  };

  useEffect(() => {
    if (category && category.length > 0 && selectedType === "") {
      setSelectedType(category[0].type);
    }
  }, [category, selectedType]);

  return {
    dispatch,
    faq,
    limit,
    category,
    handleCategoryChange,
    selectedType,
    search,
    setSearch,
  };
};

export default useFaq;
