import { Link } from "react-router-dom";
import ProgressButton from "../../../../components/button/progressButton";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import useAssignment from "../hooks/useAssignment";
import { setCurrentPage, setLimit } from "../../../../service/reducers/historyReducer";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";

const ReviewerAssignment = () => {
  const { reviewer, limit, currentPage, totalPages, dispatch } = useAssignment();
  return (
    <>
      <div className="flex flex-row w-full h-full bg-gray-100">
        <div className="min-h-full w-[16%] bg-white">
          <SideSubmisson />
        </div>
        <div className="w-[84%]  border  ">
          <HeaderNavigation />
          <div className="container  mt-16  ">
            <div className="flex flex-col p-8 border rounded-md  bg-white">
              <h1 className="text-3xl font-bold mb-14">Penugasan Reviewer</h1>

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
                    {
                      label: "Progres Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <ProgressButton
                          label={"Ubah Progres"}
                          url={`/penugasan/progress`}
                          state={{
                            type: item.progress[0].status,
                            submissionType: item.submission?.submissionType.title,
                            submissionId: item.id,
                          }}
                        />
                      ),
                    },
                    {
                      label: "Informasi  Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <Link to={`/histori-pengajuan/detail`} state={{ type: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType.title}`, submissionId: `${item.id}` }}>
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
      </div>
      {/* <Navbar /> */}
    </>
  );
};

export default ReviewerAssignment;
