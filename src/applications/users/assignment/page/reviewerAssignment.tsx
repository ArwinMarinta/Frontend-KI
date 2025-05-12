import { Link } from "react-router-dom";
import ProgressButton from "../../../../components/button/progressButton";
import Navbar from "../../../../components/navigations/navbar";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import SideProfile from "../../profile/components/sideProfile";
import useAssignment from "../hooks/useAssignment";
import { setCurrentPage, setLimit } from "../../../../service/reducers/historyReducer";

const ReviewerAssignment = () => {
  const { reviewer, limit, currentPage, totalPages, dispatch } = useAssignment();
  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-row py-32 h-full gap-8">
          <div className="min-h-full w-[20%]">
            <SideProfile />
          </div>
          <div className="min-h-full w-[80%]">
            <div className="flex flex-col p-8 border rounded-md shadow-md">
              <h1 className="text-3xl font-bold mb-14">Histori Pengajuan</h1>

              <div className="mt-8">
                <TableWithPagination<Review>
                  columns={[
                    { label: "Judul Ciptaan", accessor: "submission", render: (item) => item.submission?.copyright?.titleInvention ?? "-" },
                    {
                      label: "Jenis Pengajuan",
                      accessor: "submission",
                      render: (item) => {
                        if (item.submission?.brand !== null) {
                          return "Merek";
                        } else if (item.submission.copyright !== null) {
                          return "Hak Cipta";
                        } else if (item.submission.patent !== null) {
                          return "Paten";
                        } else if (item.submission.industrialDesign !== null) {
                          return "Desain Industri";
                        }
                      },
                    },
                    { label: "Status Pengajuan", accessor: "submission", render: (item) => item.centralStatus },
                    { label: "Progres Pengajuan", accessor: "submission", render: (item) => <ProgressButton label={"Ubah Progres"} url={`/penugasan/progress/${item.id}`} /> },
                    {
                      label: "Informasi  Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <Link to={`/histori-pengajuan/detail/${item.id}`}>
                          <button title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-[#D1E7DD] border text-[#055160] font-medium rounded-md flex items-center justify-center whitespace-nowrap">
                            Detail Pengajuan
                          </button>
                        </Link>
                      ),
                    },
                  ]}
                  data={reviewer}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "reviewerSubmission", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "reviewerSubmission", currentPage: page }))}
                  actions={[]}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReviewerAssignment;
