import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useState } from "react";
import { getReportAndAnalitic } from "../../../../service/actions/helpCenterAction";
import { FormReportAnaliticType } from "../../../../types/document";
import { setNullReportAnalitic } from "../../../../service/reducers/informationReducer";

const useReportAnalitic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { report, limit, currentPage, totalPages } = useSelector((state: RootState) => state.information.reportAndAnalitic);
  console.log(limit);

  const [formReportAnalitic, setFormReportAnalitic] = useState<FormReportAnaliticType>({
    namaPengguna: "",
    jenisPengajuan: "",
    tanggalPengajuan: "",
    peran: "",
    instansi: "",
  });

  // useEffect(() => {
  //   const isAllEmpty = Object.values(formReportAnalitic).every((value) => value.trim() === "");
  //   if (isAllEmpty) return;

  //   dispatch(setNullReportAnalitic());
  //   dispatch(getReportAndAnalitic(formReportAnalitic, currentPage, limit));
  // }, [dispatch, currentPage, limit, formReportAnalitic]);

  const handleSearchReport = () => {
    const isAllEmpty = Object.values(formReportAnalitic).every((value) => value.trim() === "");

    if (isAllEmpty) {
      return;
    }

    dispatch(setNullReportAnalitic());

    dispatch(getReportAndAnalitic(currentPage, limit, formReportAnalitic));
  };

  // useEffect(() => {
  //   const isAllEmpty = Object.values(formReportAnalitic).every((value) => value.trim() === "");

  //   if (isAllEmpty) {
  //     return;
  //   }
  //   dispatch(getReportAndAnalitic(currentPage, limit));
  // }, [limit, currentPage, dispatch]);

  const handleChangeReportAnalitic = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormReportAnalitic((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    report,
    currentPage,
    totalPages,
    limit,
    dispatch,
    handleChangeReportAnalitic,
    formReportAnalitic,
    handleSearchReport,
  };
};

export default useReportAnalitic;
