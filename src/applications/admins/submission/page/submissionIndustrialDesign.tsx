import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import ButtonAdd from "../../../../components/button/linkButton";
import useIndustrialDesign from "../hooks/useIndustrialDesign";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import { setCurrentPage, setLimit } from "../../../../service/reducers/submissionReducer";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import { useModal } from "../../../../hooks/useModal";
import ModalUpdateReviewer from "../components/modalUpdateReviewer";
import useStatus from "../hooks/useStatus";
import ModalSubmissionStatus from "../components/modalSubmissionStatus";
import { truncateText } from "../../../../utils/caracterLength";
import { Link } from "react-router-dom";
import { toSlug } from "../../../../utils/toSlug";
import useReviewer from "../hooks/useReviewer";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";
import { exportIndustrialDesignToExcel } from "../../../../components/export/submissionData";

const SubmissionIndustrialDesign = () => {
  const { design, currentPage, limit, totalPages, dispatch, handleDeleteSubmission, search, setSearch } = useIndustrialDesign();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, id, message, type } = useModal();
  const { setStatus, status, handleChange } = useStatus();
  const { reviewer, setReviewer, handleChange: handleChangeReviewer } = useReviewer();

  const handleModal = (id: number | null, types: string, status?: string | null, reviewerId?: number) => {
    if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubmissionIndutrialDesign");
      setMessage("Apakah Anda Yakin Ingin Menghapus Permohonan Paten Ini?");
    } else if (types === "Reviewer") {
      setId(id);
      handleOpenModal(id, "updateReviewerIndustrialDesign");
      setMessage("Ubah Reviewer");
      setReviewer(reviewerId);
    } else if (types === "Status") {
      setId(id);
      handleOpenModal(id, "updateStatusIndustrialDesign");
      setMessage("Ubah Status Pengajuan");
      if (status) {
        setStatus(status);
      }
    }
  };

  const exportToExcel = () => {
    exportIndustrialDesignToExcel(design);
  };

  return (
    <>
      <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideNavigation />
        </div>
        <div className="lg:w-[84%] w-full  border">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb title="PERMOHONAN DESAIN INDUSTRI" items={[{ label: "Desain Industri", url: "/permohonan/desain-industri" }]} />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="bg-white  ">
                <div className="flex flex-row justify-between mb-20">
                  <span className="text-3xl font-semibold">Desain Industri</span>
                  <ButtonAdd url={"/permohonan/desain-industri/tambah"} />
                </div>
                <TableWithPagination<Review>
                  exportButton={exportToExcel}
                  search={search}
                  onSearchChange={setSearch}
                  excel={true}
                  columns={[
                    { label: "Nama Pemohon", accessor: "user", render: (item) => item.user?.fullname },
                    { label: "Judul Invensi", accessor: "submission", render: (item) => item?.submission?.patent?.inventionTitle ?? "-" },
                    { label: "Pembayaran", accessor: "submission", render: (item) => item?.submission?.submissionScheme ?? "-" },
                    {
                      label: "Reviewer",
                      accessor: "submission",
                      render: (item) => (
                        <button onClick={() => handleModal(item.id, "Reviewer", null, item.reviewer?.id)} title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-white border border-GREY04 hover:bg-GREY04 hover:text-white rounded-md flex items-center justify-center whitespace-nowrap">
                          {item.reviewer?.fullname ?? "-"}
                        </button>
                      ),
                    },
                    {
                      label: "Status Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <button onClick={() => handleModal(item.id, "Status", item.centralStatus)} title={item.centralStatus} className="py-1 px-4 w-full max-w-full bg-white border border-GREY04 hover:bg-GREY04 hover:text-white rounded-md flex items-center justify-center">
                          <span className="truncate overflow-hidden text-ellipsis whitespace-nowrap  text-center">{truncateText(item.centralStatus)}</span>
                        </button>
                      ),
                    },
                    {
                      label: "Progres Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <Link to={`/permohonan/${toSlug(item.submission?.submissionType?.title)}/progres`} state={{ submissionId: `${item?.id}` }}>
                          <button title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-white border border-GREY04 hover:bg-GREY04 hover:text-white rounded-md flex items-center justify-center whitespace-nowrap">
                            {truncateText(item.progress[0].status)}
                          </button>
                        </Link>
                      ),
                    },
                  ]}
                  data={design}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "industrialDesignData", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "industrialDesignData", currentPage: page }))}
                  actions={[
                    {
                      label: "Detail",
                      onClick: () => {},
                      component: (item) => (
                        <Link to={`/permohonan/${toSlug(item.submission?.submissionType?.title)}/detail`} state={{ submissionId: `${item.id}`, types: "Ubah Desain Industri" }}>
                          <button title="Klik untuk mengubah progres" className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 ">
                            Detail
                          </button>
                        </Link>
                      ),
                    },
                    {
                      label: "Delete",
                      onClick: (item) => handleModal(item.id, "Delete"),
                      component: (item) => <DeleteButton onClick={() => handleModal(item.id, "Delete")} />,
                    },
                  ]}
                />
              </div>
              <ModalSubmissionStatus modal={activeModal === "updateStatusIndustrialDesign" || activeModal === "updateStatusIndustrialDesign"} setModal={handleCloseModal} type={type} id={id} message={message} status={status} handleChange={handleChange} />
              <ModalUpdateReviewer modal={activeModal === "updateReviewerIndustrialDesign" || activeModal === "updateReviewerIndustrialDesign"} setModal={handleCloseModal} type={type} id={id} message={message} reviewer={reviewer} handleChange={handleChangeReviewer} />
              <ModalWarning modal={activeModal === "DeleteSubmissionIndutrialDesign" || activeModal === "DeleteSubmissionIndutrialDesign"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteSubmission} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmissionIndustrialDesign;
