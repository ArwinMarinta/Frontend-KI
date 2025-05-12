import ProgressButton from "../../../../components/button/progressButton";
import Navbar from "../../../../components/navigations/navbar";
import TableWithPagination from "../../../../components/table/tableComponent";
import { Review } from "../../../../types/submissionType";
import SideProfile from "../../profile/components/sideProfile";
import useHistorySubmission from "../hooks/useHistorySubmission";
import { setCurrentPage, setLimit } from "../../../../service/reducers/historyReducer";
import DeleteButton from "../../../../components/button/deleteButton";
import { useModal } from "../../../../hooks/useModal";
import ModalWarning from "../../../../components/modal/modalWarning";
import Button from "../components/button";
import { Link } from "react-router-dom";

const SubmissionHistory = () => {
  const { user, limit, currentPage, totalPages, dispatch, currentStatus, setCurrentStatus, handleDeleteSubmission } = useHistorySubmission();
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
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-row py-32 h-full gap-8">
          <div className="min-h-full w-[20%]">
            <SideProfile />
          </div>
          <div className="min-h-full w-[80%]">
            <div className="flex flex-col p-8 border rounded-md shadow-md">
              <h1 className="text-3xl font-bold mb-14">Histori Pengajuan</h1>
              <div className="flex flex-row w-full">
                <Button label={"Hak Cipta"} isActive={currentStatus === "Hak Cipta"} onClick={() => setCurrentStatus("Hak Cipta")} />
                <Button label={"Paten"} isActive={currentStatus === "Paten"} onClick={() => setCurrentStatus("Paten")} />
                <Button label={"Merek"} isActive={currentStatus === "Merek"} onClick={() => setCurrentStatus("Merek")} />
                <Button label={"Desain Industri"} isActive={currentStatus === "Desain Industri"} onClick={() => setCurrentStatus("Desain Industri")} />
              </div>
              <div className="mt-8">
                <TableWithPagination<Review>
                  columns={[
                    ...(currentStatus !== "Merek"
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
                    { label: "Progres Pengajuan", accessor: "submission", render: (item) => <ProgressButton label={"Lihat Progres"} url={`/histori-pengajuan/progress/${item.id}`} /> },
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
                  data={user}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "historySubmission", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "historySubmission", currentPage: page }))}
                  actions={[
                    {
                      label: "Skema Pembayaran",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[item.progress.length - 1].status === "Skema Pembayaran") {
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
                      label: "Lengkapi Berkas",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[item.progress.length - 1].status === "Lengkapi Berkas") {
                          return (
                            <Link to="/lengkapi-berkas-pengajuan" state={{ type: "Lengkapi Berkas", submissionType: `${item.submission?.submissionType.title}`, submissionId: `${item.submissionId}` }}>
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
                      component: (item: Review) => {
                        // Memeriksa apakah progress ada dan mengambil status dari progress terakhir
                        const lastProgress = item.progress && item.progress.length > 0 ? item.progress[item.progress.length - 1] : null;
                        const lastStatus = lastProgress ? lastProgress.status : null;

                        if (lastStatus === "Pending" || lastStatus === "Revisi Draft") {
                          return (
                            <Link to="">
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
                        if (item.progress.length > 0 && item.progress[item.progress.length - 1].status === "Pending") {
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
      </main>
    </>
  );
};

export default SubmissionHistory;
