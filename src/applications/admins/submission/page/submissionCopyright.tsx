import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import useCopyright from "../hooks/useCopyright";
import { useModal } from "../../../../hooks/useModal";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import { setCurrentPage, setLimit } from "../../../../service/reducers/submissionReducer";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import ModalUpdateReviewer from "../components/modalUpdateReviewer";
import ModalSubmissionStatus from "../components/modalSubmissionStatus";
import useStatus from "../hooks/useStatus";
import { truncateText } from "../../../../utils/caracterLength";
import { Link } from "react-router-dom";
import { toSlug } from "../../../../utils/toSlug";
import ButtonAdd from "../../../../components/button/linkButton";
import useReviewer from "../hooks/useReviewer";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SubmissionCopyright = () => {
  const { copyright, currentPage, limit, totalPages, dispatch, handleDeleteSubmission, setSearch, search } = useCopyright();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, id, message, type } = useModal();
  const { setStatus, status, handleChange } = useStatus();
  const { reviewer, setReviewer } = useReviewer();

  const handleModal = (id: number | null, types: string, status?: string | null | undefined, reviewerId?: number) => {
    if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubmissionCopyright");
      setMessage("Apakah Anda Yakin Ingin Menghapus Permohonan Hak Cipta Ini?");
    } else if (types === "Reviewer") {
      setId(id);
      handleOpenModal(id, "updateReviewerCopyright");
      setMessage("Ubah Reviewer");
      setReviewer(reviewerId);
    } else if (types === "Status") {
      setId(id);
      handleOpenModal(id, "updateStatusCopyright");
      setMessage("Ubah Status Pengajuan");
      setStatus(status ?? "Draft");
    }
  };

  const exportToExcel = () => {
    const dataToExport = copyright.map((item) => ({
      "Nama Pemohon": item?.user?.fullname ?? "-",
      Pembayaran: item?.submission?.submissionScheme ?? "-",
      Reviewer: item?.reviewer?.fullname ?? "-",
      "Status Pengajuan": item?.centralStatus ?? "-",
      "Progres Pengajuan": item?.progress?.[0]?.status ?? "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Permohonan Hak Cipta");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "Permohonan_Merek.xlsx");
  };

  return (
    <>
      <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideNavigation />
        </div>
        <div className="lg:w-[84%] w-full  border">
          <HeaderNavigation />

          <div className="px-4 lg:px-12  py-8">
            <div className="mb-8">
              <Breadcrumb title="PERMOHONAN HAK CIPTA" items={[{ label: "Hak Cipta", url: "/permohonan/hak-cipta" }]} />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="bg-white  ">
                <div className="flex flex-row justify-between mb-20">
                  <span className="text-3xl font-semibold">Hak Cipta</span>
                  <ButtonAdd url={"/permohonan/hak-cipta/tambah"} />
                </div>

                <TableWithPagination<Review>
                  exportButton={exportToExcel}
                  search={search}
                  excel={true}
                  onSearchChange={setSearch}
                  columns={[
                    { label: "Nama Pemohon", accessor: "user", render: (item) => item.user?.fullname },
                    { label: "Judul Ciptaan", accessor: "submission", render: (item) => item.submission?.copyright?.titleInvention ?? "-" },
                    { label: "Pembayaran", accessor: "submission", render: (item) => item.submission?.submissionScheme ?? "-" },
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
                      component: (item) => (
                        <Link to={`/permohonan/${toSlug(item.submission?.submissionType?.title)}/detail`} state={{ submissionId: `${item?.id}`, types: "Ubah Hak Cipta" }}>
                          <button title="Klik untuk mengubah progres" className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 ">
                            Detail
                          </button>
                        </Link>
                      ),
                    },
                    {
                      label: "Delete",
                      onClick: () => {},
                      component: (item) => <DeleteButton onClick={() => handleModal(item.id, "Delete")} />,
                    },
                  ]}
                />
              </div>
              <ModalSubmissionStatus modal={activeModal === "updateStatusCopyright" || activeModal === "updateStatusCopyright"} setModal={handleCloseModal} type={type} id={id} message={message} status={status} handleChange={handleChange} />
              <ModalUpdateReviewer modal={activeModal === "updateReviewerCopyright" || activeModal === "updateReviewerCopyright"} setModal={handleCloseModal} type={type} id={id} message={message} reviewer={reviewer} />
              <ModalWarning modal={activeModal === "DeleteSubmissionCopyright" || activeModal === "DeleteSubmissionPatent"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteSubmission} />
              {/* <ModalLoading show={loading} /> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmissionCopyright;
