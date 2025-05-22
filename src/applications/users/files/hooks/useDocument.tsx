import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { getDocumentCateoryLanding, getDocumentLanding } from "../../../../service/actions/landingAction";

const useDocument = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { category } = useSelector((state: RootState) => state.landing.docCategory);
  const { doc, limit } = useSelector((state: RootState) => state.landing.doc);
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    dispatch(getDocumentCateoryLanding());
  }, [token, dispatch]);

  useEffect(() => {
    if (category && category.length > 0) {
      const typeToUse = selectedType || category[0].type;
      dispatch(getDocumentLanding(typeToUse, limit));
    }
  }, [category, dispatch, limit, selectedType]);

  const handleCategoryChange = (type: string) => {
    setSelectedType(type);
  };

  return {
    dispatch,
    limit,
    category,
    handleCategoryChange,
    selectedType,
    doc,
  };
};

export default useDocument;
