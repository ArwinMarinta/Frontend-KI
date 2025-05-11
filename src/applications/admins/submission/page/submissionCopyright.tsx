import React from "react";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import AddButton from "../../../../components/button/addButton";
import useCopyright from "../hooks/useCopyright";
import { useModal } from "../../../../hooks/useModal";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import { setCurrentPage, setLimit } from "../../../../service/reducers/submissionReducer";
import ManageButton from "../../../../components/button/manageButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import ProgressButton from "../../../../components/button/progressButton";

const SubmissionCopyright = () => {
  const { copyright, currentPage, limit, totalPages, dispatch, handleDeleteSubmission } = useCopyright();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, id, message } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubmissionCopyright");
      setMessage("Apakah Anda Yakin Ingin Menghapus Permohonan Hak Cipta Ini?");
    }
  };

  console.log(copyright);

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
                    { label: "Judul Ciptaan", accessor: "submission", render: (item) => item.submission?.copyright?.titleInvention ?? "-" },
                    { label: "Pembayaran", accessor: "submission", render: (item) => item.submission?.submissionScheme ?? "-" },
                    { label: "Reviewer", accessor: "submission", render: (item) => <ProgressButton label={item.reviewer?.fullname ?? "-"} url={`/dashboard`} /> },
                    { label: "Status Pengajuan", accessor: "submission", render: (item) => <ProgressButton label={item.centralStatus ?? "-"} url={`/dashboard`} /> },
                    { label: "Progres Pengajuan", accessor: "submission", render: (item) => <ProgressButton label={"Ubah Progres"} url={`/permohonan/${item.submission?.submissionType.title}/progres/${item.id}`} /> },
                  ]}
                  data={copyright}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "copyrightData", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "copyrightData", currentPage: page }))}
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
              <ModalWarning modal={activeModal === "DeleteSubmissionCopyright" || activeModal === "DeleteSubmissionPatent"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteSubmission} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmissionCopyright;
