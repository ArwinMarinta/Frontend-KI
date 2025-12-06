import { Link } from "react-router-dom";
import ProgressButton from "../../../../components/button/progressButton";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import useAssignment from "../hooks/useAssignment";
import { setCurrentPage, setLimit } from "../../../../service/reducers/historyReducer";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const ReviewerAssignment = () => {
  const { reviewer, limit, currentPage, totalPages, dispatch, search, setSearch } = useAssignment();
  return (
    <>
      <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideSubmisson />
        </div>
        <div className="lg:w-[84%] w-full border   ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8">
            <div className="mb-8">
              <Breadcrumb title="PENUGASAN" items={[{ label: "Penugasan", url: "" }]} />
            </div>
            <div className=" lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <h1 className="text-3xl font-bold mb-14">Penugasan Reviewer</h1>

              <div className="mt-8">
                <TableWithPagination<Review>
                  search={search}
                  onSearchChange={setSearch}
                  columns={[
                    { label: "Judul Ciptaan", accessor: "submission", render: (item) => item.submission?.copyright?.titleInvention ?? "-" },
                    {
                      label: "Jenis Pengajuan",
                      accessor: "submission",
                      render: (item) => {
                        if (item.submission?.brand !== null) {
                          return "Merek";
                        } else if (item.submission?.copyright !== null) {
                          return "Hak Cipta";
                        } else if (item.submission?.patent !== null) {
                          return "Paten";
                        } else if (item.submission?.industrialDesign !== null) {
                          return "Desain Industri";
                        }
                      },
                    },
                    { label: "Status Pengajuan", accessor: "submission", render: (item) => item?.centralStatus?.name },
                    {
                      label: "Progres Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <ProgressButton
                          label={"Ubah Progres"}
                          url={`/penugasan/progress`}
                          state={{
                            type: item.progress[0].status,
                            submissionType: item.submission?.submissionType?.title,
                            submissionId: item.id,
                          }}
                        />
                      ),
                    },
                    {
                      label: "Informasi  Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <Link to={`/histori-pengajuan/detail`} state={{ type: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType?.title}`, submissionId: `${item.id}` }}>
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
