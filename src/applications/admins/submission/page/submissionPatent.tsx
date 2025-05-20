import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import AddButton from "../../../../components/button/addButton";
import usePatent from "../hooks/usePatent";
import TableWithPagination from "../../../../components/table/tableComponent";
import { setCurrentPage, setLimit } from "../../../../service/reducers/submissionReducer";
import { useModal } from "../../../../hooks/useModal";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import { Review } from "../../../../types/submissionType";
import ModalUpdateReviewer from "../components/modalUpdateReviewer";
import useStatus from "../hooks/useStatus";
import ModalSubmissionStatus from "../components/modalSubmissionStatus";
import { truncateText } from "../../../../utils/caracterLength";
import { Link } from "react-router-dom";
import { toSlug } from "../../../../utils/toSlug";

const SubmissionPatent = () => {
  const { patent, currentPage, limit, totalPages, dispatch, handleDeleteSubmission } = usePatent();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, id, message, type } = useModal();
  const { setStatus } = useStatus();

  const handleModal = (id: number | null, types: string, status?: string) => {
    if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubmissionPatent");
      setMessage("Apakah Anda Yakin Ingin Menghapus Permohonan Paten Ini?");
    } else if (types === "Reviewer") {
      setId(id);
      handleOpenModal(id, "updateReviewerPaten");
      setMessage("Ubah Reviewer");
    } else if (types === "Status") {
      setId(id);
      handleOpenModal(id, "updateStatusPaten");
      setMessage("Ubah Status Pengajuan");
      setStatus(status);
    }
  };

  return (
    <>
      <main className="flex flex-row w-full h-full bg-GREY01">
        <div className="min-h-full w-[16%] bg-white">
          <SideNavigation />
        </div>
        <div className="w-[84%]  border ">
          <HeaderNavigation />
          <div className="container  mt-10 ">
            <div className="bg-white p-6 rounded-md">
              <div className="bg-white  ">
                <div className="flex flex-row justify-between mb-20">
                  <span className="text-3xl font-semibold">Paten</span>
                  <AddButton />
                </div>
                <TableWithPagination<Review>
                  columns={[
                    { label: "Nama Pemohon", accessor: "user", render: (item) => item.user?.fullname },
                    { label: "Judul Invensi", accessor: "submission", render: (item) => item.submission?.patent?.inventionTitle ?? "-" },
                    { label: "Pembayaran", accessor: "submission", render: (item) => item.submission?.submissionScheme ?? "-" },
                    {
                      label: "Reviewer",
                      accessor: "submission",
                      render: (item) => (
                        <button onClick={() => handleModal(item.id, "Reviewer")} title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-white border border-GREY04 hover:bg-GREY04 hover:text-white rounded-md flex items-center justify-center whitespace-nowrap">
                          {item.reviewer?.fullname}
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
                        <Link to={`/permohonan/${toSlug(item.submission?.submissionType.title)}/progres`} state={{ submissionId: `${item.id}` }}>
                          <button title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-white border border-GREY04 hover:bg-GREY04 hover:text-white rounded-md flex items-center justify-center whitespace-nowrap">
                            {truncateText(item.progress[0].status)}
                          </button>
                        </Link>
                      ),
                    },
                  ]}
                  data={patent}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "patentData", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "patentData", currentPage: page }))}
                  actions={[
                    {
                      label: "Detail",
                      onClick: () => {},
                      component: (item) => (
                        <Link to={`/permohonan/${toSlug(item.submission?.submissionType.title)}/detail`} state={{ submissionId: `${item.id}` }}>
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
              <ModalSubmissionStatus modal={activeModal === "updateStatusPaten" || activeModal === "updateStatusPaten"} setModal={handleCloseModal} type={type} id={id} message={message} />
              <ModalUpdateReviewer modal={activeModal === "updateReviewerPaten" || activeModal === "updateReviewerPaten"} setModal={handleCloseModal} type={type} id={id} message={message} />
              <ModalWarning modal={activeModal === "DeleteSubmissionPatent" || activeModal === "DeleteSubmissionPatent"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteSubmission} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmissionPatent;
