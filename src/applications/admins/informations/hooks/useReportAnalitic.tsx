import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect, useState } from "react";
import { FormReportAnaliticType } from "../../../../types/document";
import { getReportAndAnalitic } from "../../../../service/actions/helpCenterAction";

const useReportAnalitic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { report, limit, currentPage, totalPages } = useSelector((state: RootState) => state.information.reportAndAnalitic);

  const [formReportAnalitic, setFormReportAnalitic] = useState<FormReportAnaliticType>({
    namaPengguna: "",
    jenisPengajuan: "",
    skemaPengajuan: "",
    progressPengajuan: "",
    peran: "",
    instansi: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const isAllEmpty = Object.values(formReportAnalitic).every((value) => value.trim() === "");
    if (isAllEmpty) {
      return;
    }
    dispatch(getReportAndAnalitic(currentPage, limit, formReportAnalitic));
  }, [dispatch, currentPage, limit, formReportAnalitic]);

  const handleSearchReport = (form: FormReportAnaliticType) => {
    setFormReportAnalitic({
      namaPengguna: form.namaPengguna,
      jenisPengajuan: form.jenisPengajuan,
      skemaPengajuan: form.skemaPengajuan,
      progressPengajuan: form.progressPengajuan,
      peran: form.peran,
      instansi: form.instansi,
      startDate: form.startDate,
      endDate: form.endDate,
    });
  };

  return {
    report,
    currentPage,
    totalPages,
    limit,
    dispatch,

    formReportAnalitic,
    handleSearchReport,
  };
};

export default useReportAnalitic;
