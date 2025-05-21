import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useState } from "react";
import { getReportAndAnalitic } from "../../../../service/actions/helpCenterAction";
import { FormReportAnaliticType } from "../../../../types/document";

const useReportAnalitic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { report, limit, currentPage, totalPages } = useSelector((state: RootState) => state.information.reportAndAnalitic);
  const [formReportAnalitic, setFormReportAnalitic] = useState<FormReportAnaliticType>({
    namaPengguna: "",
    jenisPengajuan: "",
    tanggalPengajuan: "",
    peran: "",
    instansi: "",
  });

  const handleSearchReport = () => {
    const isAllEmpty = Object.values(formReportAnalitic).every((value) => value.trim() === "");

    if (isAllEmpty) {
      return;
    }

    dispatch(getReportAndAnalitic(formReportAnalitic, currentPage, limit));
  };

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
