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
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getDocumentCateoryLanding());
  }, [token, dispatch, search]);

  useEffect(() => {
    if ((category?.length ?? 0) > 0) {
      const typeToUse = selectedType || category?.[0]?.type;
      if (typeToUse) {
        dispatch(getDocumentLanding(typeToUse, limit, search));
      }
    }
  }, [category, dispatch, limit, search, selectedType]);

  useEffect(() => {
    if (category && category.length > 0 && selectedType === "") {
      setSelectedType(category[0].type);
    }
  }, [category, selectedType]);

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
    search,
    setSearch,
  };
};

export default useDocument;
