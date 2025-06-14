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
import { toSlug } from "../../../../utils/toSlug";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";
import { API_FILE } from "../../../../config/config";

const SubmissionHistory = () => {
  const { user, limit, currentPage, totalPages, dispatch, type, handleDeleteSubmission, search, setSearch } = useHistorySubmission();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, id, message } = useModal();

  console.log(user);

  const handleModal = (id: number | null, types: string) => {
    if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubmissionUser");
      setMessage("Apakah Anda Yakin Ingin Menghapus Permohonan Hak Cipta Ini?");
    }
  };

  const downloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlBlob;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full  lg:w-[16%] hidden lg:block bg-white">
          <SideSubmisson />
        </div>
        <div className="lg:w-[84%] w-full border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb title="PROGRES PENGAJUAN" items={[{ label: "Progres Pengajuan", url: "" }]} />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <h1 className="text-3xl font-bold mb-14">Progres Pengajuan</h1>
              <div className="flex flex-row w-full h-full">
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
                  search={search}
                  onSearchChange={setSearch}
                  columns={[
                    ...(type !== "Merek"
                      ? [
                          {
                            label: "Judul Ciptaan",
                            accessor: "submission",
                            render: (item: Review) => item?.submission?.copyright?.titleInvention ?? "-",
                            width: "w-1/3",
                          },
                        ]
                      : [
                          {
                            label: "Tipe Merek",
                            accessor: "submission",
                            render: (item: Review) => item?.submission?.brand?.brandTypeId ?? "-",
                          },
                        ]),
                    { label: "Status Pengajuan", accessor: "submission", render: (item) => item?.centralStatus, width: "w-1/3" },
                    {
                      label: "Progres Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <ProgressButton
                          label={"Lihat Progres"}
                          url={`/histori-pengajuan/progress`}
                          state={{
                            type: item.progress[0]?.status,
                            submissionType: item?.submission?.submissionType?.title,
                            submissionId: item.id,
                          }}
                        />
                      ),
                      width: "w-1/6",
                    },
                    {
                      label: "Informasi  Pengajuan",
                      accessor: "submission",
                      render: (item) => (
                        <Link to="/histori-pengajuan/detail" state={{ type: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType?.title}`, submissionId: `${item.id}`, status: "Riwayat" }}>
                          <button title="Klik untuk mengubah progres" className="py-1 px-4 w-full bg-[#D1E7DD] border text-[#055160] font-medium rounded-md flex items-center justify-center whitespace-nowrap">
                            Detail Pengajuan
                          </button>
                        </Link>
                      ),
                      width: "w-1/6",
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
                      component: (item: Review) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Pembayaran" && item.progress[0].isStatus === false) {
                          return (
                            <Link
                              to="/lengkapi-berkas-pengajuan"
                              state={{
                                types: `${item.progress[0]?.status}`,
                                submissionType: `${item.submission?.submissionType?.title}`,
                                submissionId: `${item.submissionId}`,
                                paymentId: `${item.submission?.payment?.id}`,
                                billingCode: `${item.submission?.payment?.billingCode}`,
                                paymentSchema: `${item.submission?.submissionScheme}`,
                              }}
                              className="py-1 px-2 border  whitespace-nowrap overflow-hidden truncate   border-PRIMARY01 rounded-md text-PRIMARY01 font-medium"
                            >
                              Pembayaran
                            </Link>
                          );
                        } else if (item.progress[0].status === "Pembayaran" && item.progress[0].isStatus === true) {
                          return <span className=" italic text-GREY04">Proses Selanjutnya</span>;
                        }
                        return null;
                      },
                    },

                    {
                      label: "Skema Pendanaan",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Skema Pendanaan" && item.progress[0].isStatus === false) {
                          return (
                            <Link to="/lengkapi-berkas-pengajuan" state={{ types: `${item.progress[0]?.status}`, submissionType: `${item.submission?.submissionType?.title}`, submissionId: `${item.id}` }}>
                              <button className="py-1 px-2 border  whitespace-nowrap overflow-hidden truncate border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">Skema Pembayaran</button>
                            </Link>
                          );
                        } else if (item.progress[0].status === "Skema Pendanaan" && item.progress[0].isStatus === true) {
                          return <span className=" italic text-GREY04">Proses Selanjutnya</span>;
                        }
                        return null;
                      },
                    },
                    {
                      label: "Unduh Sertifikat",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Sertifikat Terbit") {
                          const certFile = item.progress[0].certificateFile;
                          let filename = "";

                          if (typeof certFile === "string") {
                            filename = certFile;
                          } else if (certFile instanceof File) {
                            filename = certFile.name;
                          }

                          if (!filename) return null;

                          return (
                            <button onClick={() => downloadFile(`${API_FILE}/documents/${filename}`, filename)} className="py-1 px-2 border whitespace-nowrap underline overflow-hidden truncate border-green-500 rounded-md text-green-600 font-medium">
                              Sertifikat
                            </button>
                          );
                        }
                        return null;
                      },
                    },
                    {
                      label: "Revisi",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Revisi" && item.progress[0].isStatus === false) {
                          return (
                            <Link
                              to="/lengkapi-berkas-pengajuan"
                              state={{ types: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType?.title}`, submissionId: `${item.id}` }}
                              className="py-1 px-2 border  whitespace-nowrap overflow-hidden truncate border-PRIMARY03 rounded-md text-PRIMARY03 font-medium"
                            >
                              Revisi
                            </Link>
                          );
                        } else if (item.progress[0].status === "Revisi" && item.progress[0].isStatus === true) {
                          return <span className=" italic text-GREY04">Proses Selanjutnya</span>;
                        }
                        return null;
                      },
                    },
                    {
                      label: "pesan",
                      onClick: () => {},
                      component: (item) => {
                        if ((item.progress.length > 0 && item.progress[0].status === "Direview") || item.progress[0].status === "Diajukan") {
                          return <span className=" italic text-GREY04">Proses Selanjutnya</span>;
                        }
                        // return null;
                      },
                    },
                    {
                      label: "Lengkapi Berkas",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Lengkapi Berkas" && item.progress[0].isStatus === false) {
                          return (
                            <Link
                              to="/lengkapi-berkas-pengajuan"
                              state={{ types: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType?.title}`, submissionId: `${item.id}`, patenId: `${item.submission?.patentId}`, designId: `${item.submission?.industrialDesignId}` }}
                              className="py-1 px-2 whitespace-nowrap overflow-hidden truncate border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium"
                            >
                              Lengkapi Berkas
                            </Link>
                          );
                        } else if (item.progress[0].status === "Lengkapi Berkas" && item.progress[0].isStatus === true) {
                          return <span className=" italic text-GREY04">Proses Selanjutnya</span>;
                        }
                        return null;
                      },
                    },

                    {
                      label: "Ubah",
                      onClick: () => {},
                      component: (item) => {
                        if (item.progress.length > 0 && item.progress[0].status === "Menunggu") {
                          return (
                            <Link to={`/histori-pengajuan/${toSlug(item.submission?.submissionType?.title)}/ubah`} state={{ types: `${item.progress[0].status}`, submissionType: `${item.submission?.submissionType?.title}`, submissionId: `${item.id}`, actionTypes: "Mengubah Pengajuan" }}>
                              <button className="py-1 px-2 border whitespace-nowrap overflow-hidden truncate border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">Ubah</button>
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
                        if (item.progress.length > 0 && item.progress[0].status === "Menunggu") {
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
