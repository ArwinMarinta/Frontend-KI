import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import ButtonAdd from "../../../../components/button/linkButton";
import { useModal } from "../../../../hooks/useModal";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import useBrand from "../hooks/useBrand";
import { setCurrentPage, setLimit } from "../../../../service/reducers/submissionReducer";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import ModalUpdateReviewer from "../components/modalUpdateReviewer";
import useStatus from "../hooks/useStatus";
import ModalSubmissionStatus from "../components/modalSubmissionStatus";
import { truncateText } from "../../../../utils/caracterLength";
import { Link } from "react-router-dom";
import { toSlug } from "../../../../utils/toSlug";
import useReviewer from "../hooks/useReviewer";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const SubmissionBrand = () => {
  const { brand, currentPage, limit, totalPages, dispatch, handleDeleteSubmission, search, setSearch } = useBrand();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, id, message, type } = useModal();
  const { setStatus, status } = useStatus();
  const { reviewer, setReviewer } = useReviewer();

  const handleModal = (id: number | null, types: string, status?: string | null | undefined, reviewerId?: number) => {
    if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubmissionBrand");
      setMessage("Apakah Anda Yakin Ingin Menghapus Permohonan Paten Ini?");
    } else if (types === "Reviewer") {
      setId(id);
      handleOpenModal(id, "updateReviewerBrand");
      setMessage("Ubah Reviewer");
      setReviewer(reviewerId);
    } else if (types === "Status") {
      setId(id);
      handleOpenModal(id, "updateStatusBrand");
      setMessage("Ubah Status Pengajuan");
      if (status) {
        setStatus(status);
      }
    }
  };

  return (
    <>
      <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideNavigation />
        </div>
        <div className="lg:w-[84%] w-full  border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb title="PERMOHONAN MEREK" items={[{ label: "Merek", url: "/permohonan/merek" }]} />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="bg-white  ">
                <div className="flex flex-row justify-between mb-20">
                  <span className="text-3xl font-semibold">Merek</span>
                  <ButtonAdd url={"/permohonan/merek/tambah"} />
                </div>
                <TableWithPagination<Review>
                  search={search}
                  onSearchChange={setSearch}
                  excel={true}
                  columns={[
                    { label: "Nama Pemohon", accessor: "user", render: (item) => item?.user?.fullname },
                    // { label: "Judul Invensi", accessor: "submission", render: (item) => item?.submission?.patent?.inventionTitle ?? "-" },
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
                        <Link to={`/permohonan/${toSlug(item.submission?.submissionType?.title)}/progres`} state={{ submissionId: `${item.id}` }}>
                          <button title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-white border border-GREY04 hover:bg-GREY04 hover:text-white rounded-md flex items-center justify-center whitespace-nowrap">
                            {truncateText(item.progress[0].status)}
                          </button>
                        </Link>
                      ),
                    },
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
                      component: (item) => (
                        <Link to={`/permohonan/${toSlug(item.submission?.submissionType?.title)}/detail`} state={{ submissionId: `${item.id}`, types: "Ubah Merek" }}>
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
              <ModalSubmissionStatus modal={activeModal === "updateStatusBrand" || activeModal === "updateStatusBrand"} setModal={handleCloseModal} type={type} id={id} message={message} status={status} />
              <ModalUpdateReviewer modal={activeModal === "updateReviewerBrand" || activeModal === "updateReviewerBrand"} setModal={handleCloseModal} type={type} id={id} message={message} reviewer={reviewer} />
              <ModalWarning modal={activeModal === "DeleteSubmissionBrand" || activeModal === "DeleteSubmissionBrand"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteSubmission} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmissionBrand;
