import ProgressButton from "../../../../components/button/progressButton";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import useHistorySubmission from "../hooks/useHistorySubmission";
import { setCurrentPage, setLimit } from "../../../../service/reducers/historyReducer";
import DeleteButton from "../../../../components/button/deleteButton";
import { useModal } from "../../../../hooks/useModal";
import ModalWarning from "../../../../components/modal/modalWarning";
import Button from "../components/button";
import { Link } from "react-router-dom";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";

const SubmissionHistory = () => {
  const { user, limit, currentPage, totalPages, dispatch, type, handleDeleteSubmission } = useHistorySubmission();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, id, message } = useModal();
  // const [currentStatus, setCurrentStatus] = useState("Hak Cipta");
  const handleModal = (id: number | null, types: string) => {
    if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubmissionUser");
      setMessage("Apakah Anda Yakin Ingin Menghapus Permohonan Hak Cipta Ini?");
    }
  };
  return (
    <>
      <div className="flex flex-row w-full h-full bg-gray-100">
        <div className="min-h-full w-[16%] bg-white">
          <SideSubmisson />
        </div>
        <div className="w-[84%]  border ">
          <HeaderNavigation />
          <div className="container  mt-16 ">
            <div className="flex flex-col p-8 border rounded-md bg-white">
              <h1 className="text-3xl font-bold mb-14">Histori Pengajuan</h1>
              <div className="flex flex-row w-full">
                <Link to="/histori-pengajuan/hak-cipta">
                  <Button label={"Hak Cipta"} isActive={type === "hak-cipta"} onClick={() => {}} />
                </Link>
                <Link to="/histori-pengajuan/paten">
                  <Button label={"Paten"} isActive={type === "paten"} onClick={() => {}} />
                </Link>
                <Link to="/histori-pengajuan/merek">
                  <Button label={"Merek"} isActive={type === "merek"} onClick={() => {}} />
                </Link>
                <Link to="/histori-pengajuan/desain-industri">
                  <Button label={"Desain Industri"} isActive={type === "desain-industri"} onClick={() => {}} />
                </Link>
              </div>
              <div className="mt-8">
                <TableWithPagination<Review>
                  columns={[
                    ...(type !== "Merek"
                      ? [
                          {
                            label: "Judul Ciptaan",
                            accessor: "submission",
                            render: (item: Review) => item.submission?.copyright?.titleInvention ?? "-",
                          },
                        ]
                      : [
                          {
                            label: "Tipe Merek",
                            accessor: "submission",
                            render: (item: Review) => item.submission?.brand?.brandTypeId ?? "-",
                          },
                        ]),
                    { label: "Status Pengajuan", accessor: "submission", render: (item) => item.centralStatus },
                    {
                      label: "Progres Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <ProgressButton
                          label={"Lihat Progres"}
                          url={`/histori-pengajuan/progress`}
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
                        <Link to="/histori-pengajuan/detail" state={{ type: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType.title}`, submissionId: `${item.id}`, status: "Riwayat" }}>
                          <button title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-[#D1E7DD] border text-[#055160] font-medium rounded-md flex items-center justify-center whitespace-nowrap">
                            Detail Pengajuan
                          </button>
                        </Link>
                      ),
                    },
                  ]}
                  data={user}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "historySubmission", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "historySubmission", currentPage: page }))}
                  actions={[
                    {
                      label: "Pembayaran",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Pembayaran") {
                          return (
                            <Link to="/lengkapi-berkas-pengajuan" state={{ types: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType.title}`, submissionId: `${item.submissionId}` }}>
                              <button className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">Pembayaran</button>
                            </Link>
                          );
                        }
                        return null;
                      },
                    },
                    {
                      label: "Skema Pendanaan",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Skema Pendanaan") {
                          return (
                            <Link to="/lengkapi-berkas-pengajuan" state={{ types: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType.title}`, submissionId: `${item.id}` }}>
                              <button className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">Skema Pembayaran</button>
                            </Link>
                          );
                        }
                        return null;
                      },
                    },
                    {
                      label: "Revisi",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Revisi") {
                          return (
                            <Link to="/lengkapi-berkas-pengajuan" state={{ type: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType.title}`, submissionId: `${item.id}` }}>
                              <button className="py-1 px-2 border border-PRIMARY03 rounded-md text-PRIMARY03 font-medium">Revisi</button>
                            </Link>
                          );
                        }
                        return null;
                      },
                    },
                    {
                      label: "Lengkapi Berkas",
                      onClick: () => {},
                      component: (item) => {
                        console.log(item.progress[0]);
                        if (item.progress.length > 0 && item.progress[0].status === "Lengkapi Berkas") {
                          return (
                            <Link to="/lengkapi-berkas-pengajuan" state={{ types: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType.title}`, submissionId: `${item.id}`, patenId: `${item.submission?.patentId}`, designId: `${item.submission?.industrialDesignId}` }}>
                              <button className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">Lengkapi Berkas</button>
                            </Link>
                          );
                        }
                        return null;
                      },
                    },
                    {
                      label: "Revisi",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Skema Pembayaran") {
                          return (
                            <Link to="">
                              <button className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">Skema Pembayaran</button>
                            </Link>
                          );
                        }
                        return null;
                      },
                    },
                    {
                      label: "Ubah",
                      onClick: () => {},
                      component: (item) => {
                        console.log(item.progress[0]);
                        if (item.progress.length > 0 && item.progress[0].status === "Pending") {
                          return (
                            <Link to="/histori-pengajuan/ubah" state={{ type: `${item.progress[0].status}`, submissionTypes: `${item.submission?.submissionType.title}`, submissionId: `${item.id}` }}>
                              <button className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">Ubah</button>
                            </Link>
                          );
                        }
                        return null;
                      },
                    },

                    {
                      label: "Delete",
                      onClick: (item) => handleModal(item.id, "Delete"),
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Pending") {
                          return <DeleteButton onClick={() => handleModal(item.id, "Delete")} />;
                        }
                        return null;
                      },
                    },
                  ]}
                />
                <ModalWarning modal={activeModal === "DeleteSubmissionUser" || activeModal === "DeleteSubmissionUser"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteSubmission} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionHistory;
