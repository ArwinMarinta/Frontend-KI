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

  useEffect(() => {
    if (token) {
      dispatch(getFaqCateoryLanding());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (category && category.length > 0) {
      const typeToUse = selectedType || category[0].type;
      dispatch(getFaqLanding(typeToUse, limit));
    }
  }, [category, dispatch, limit, selectedType]);

  const handleCategoryChange = (type: string) => {
    setSelectedType(type);
  };

  return {
    dispatch,
    faq,
    limit,
    category,
    handleCategoryChange,
    selectedType,
  };
};

export default useFaq;
