import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import FormReportAnalitic from "../components/formReportAnalitic";
import useReportAnalitic from "../hooks/useReportAnalitic";
import TableWithPagination from "../../../../components/table/tableComponent";
import { ReportandAnalitic } from "../../../../types/document";
import { formatIndonesianDateTime } from "../../../../utils/formatDate";
import { setCurrentPage, setLimit } from "../../../../service/reducers/informationReducer";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const ReportsAnalitic = () => {
  const { report, limit, totalPages, currentPage, handleChangeReportAnalitic, formReportAnalitic, handleSearchReport, dispatch } = useReportAnalitic();
  return (
    <>
      <main className="flex flex-row w-full min-h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideNavigation />
        </div>
        <div className="lg:w-[84%] w-full  border ">
          <HeaderNavigation />

          <div className="px-4 lg:px-12  py-8">
            <div className="mb-8">
              <Breadcrumb title="LAPORAN & ANALISIS" items={[{ label: "Laporan & Analisis", url: "" }]} />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="flex flex-row justify-between mb-12">
                <span className="text-3xl font-semibold">Laporan dan Analisis</span>
              </div>
              <FormReportAnalitic form={formReportAnalitic} onChange={handleChangeReportAnalitic} handleSearch={handleSearchReport} />
            </div>
            {report.length > 0 && (
              <div className="mt-10 lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
                <TableWithPagination<ReportandAnalitic>
                  columns={[
                    { label: "Nama Pengguna", accessor: "user", render: (item) => item.namaPengguna },
                    { label: "Jenis Pengajuan", accessor: "user", render: (item) => item.jenisPengajuan },
                    { label: "Pendanaan", accessor: "action", render: (item) => item.skemaPengajuan },
                    { label: "Progress", accessor: "user", render: (item) => item.progressPengajuan },
                    { label: "Peran", accessor: "user", render: (item) => item.peran },
                    { label: "Waktu", accessor: "updatedAt", render: (item) => formatIndonesianDateTime(item.waktuPengajuan) },
                  ]}
                  data={report}
                  limit={limit}
                  totalPages={Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1}
                  currentPage={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "reportAndAnalitic", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "logActivity", currentPage: page }))}
                  actions={[]}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ReportsAnalitic;
