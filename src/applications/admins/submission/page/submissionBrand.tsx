import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import AddButton from "../../../../components/button/addButton";

import { useModal } from "../../../../hooks/useModal";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import useBrand from "../hooks/useBrand";
import { setCurrentPage, setLimit } from "../../../../service/reducers/submissionReducer";
import ManageButton from "../../../../components/button/manageButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import ProgressButton from "../../../../components/button/progressButton";
import ModalUpdateReviewer from "../components/modalUpdateReviewer";
import useStatus from "../hooks/useStatus";
import ModalSubmissionStatus from "../components/modalSubmissionStatus";
import { truncateText } from "../../../../utils/caracterLength";

const SubmissionBrand = () => {
  const { brand, currentPage, limit, totalPages, dispatch, handleDeleteSubmission } = useBrand();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, id, message, type } = useModal();
  const { setStatus } = useStatus();

  const handleModal = (id: number | null, types: string, status?: string) => {
    if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubmissionBrand");
      setMessage("Apakah Anda Yakin Ingin Menghapus Permohonan Paten Ini?");
    } else if (types === "Reviewer") {
      setId(id);
      handleOpenModal(id, "updateReviewerBrand");
      setMessage("Ubah Reviewer");
    } else if (types === "Status") {
      setId(id);
      handleOpenModal(id, "updateStatusBrand");
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
                    { label: "Nama Pemohon", accessor: "user", render: (item) => item?.user?.fullname },
                    { label: "Judul Invensi", accessor: "submission", render: (item) => item?.submission?.patent?.inventionTitle ?? "-" },
                    { label: "Pembayaran", accessor: "submission", render: (item) => item?.submission?.submissionScheme ?? "-" },
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
                    { label: "Progres Pengajuan", accessor: "submission", render: (item) => <ProgressButton label={"Ubah Progres"} url={`/permohonan/${item.submission?.submissionType.title}/progres/${item.id}`} /> },
                  ]}
                  data={brand}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "brandData", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "brandData", currentPage: page }))}
                  actions={[
                    {
                      label: "Detail",
                      onClick: () => {},
                      component: (item) => <ManageButton url={`/permohonan/${item.submission?.submissionType.title}/detail/${item.id}`} />,
                    },
                    {
                      label: "Delete",
                      onClick: (item) => handleModal(item.id, "Delete"),
                      component: (item) => <DeleteButton onClick={() => handleModal(item.id, "Delete")} />,
                    },
                  ]}
                />
              </div>
              <ModalSubmissionStatus modal={activeModal === "updateStatusBrand" || activeModal === "updateStatusBrand"} setModal={handleCloseModal} type={type} id={id} message={message} />
              <ModalUpdateReviewer modal={activeModal === "updateReviewerBrand" || activeModal === "updateReviewerBrand"} setModal={handleCloseModal} type={type} id={id} message={message} />
              <ModalWarning modal={activeModal === "DeleteSubmissionBrand" || activeModal === "DeleteSubmissionBrand"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteSubmission} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmissionBrand;
