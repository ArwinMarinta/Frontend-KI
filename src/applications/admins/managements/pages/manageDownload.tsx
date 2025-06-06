import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import AddButton from "../../../../components/button/addButton";
import TableWithPagination from "../../../../components/table/tableComponent";
import { setCurrentPage, setLimit } from "../../../../service/reducers/manageReducer";
import UpdateButton from "../../../../components/button/updateButton";
import useDocument from "../hooks/useDocument";
import { useModal } from "../../../../hooks/useModal";
import ModalWarning from "../../../../components/modal/modalWarning";
import DeleteButton from "../../../../components/button/deleteButton";
import { DocumentType } from "../../../../types/document";
import ModalDocument from "../components/modal/modalDocument";
import { API_FILE } from "../../../../config/config";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const ManageDownload = () => {
  const { docs, limit, totalPages, currentPage, dispatch, handleDelete, search, setSearch } = useDocument();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | string | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddDocuments");
      setType(types);
      setMessage("Tambah Dokumen");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditDocuments");
      setMessage("Ubah Dokumen");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteDocuments");
      setMessage("Apakah Anda Yakin Ingin Menghapus File Ini?");
    }
  };
  return (
    <>
      <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideNavigation />
        </div>
        <div className="lg:w-[84%] w-full  border  ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb
                title="UNDUHAN"
                items={[
                  { label: "Kategori Unduhan", url: "/manajemen/kategori/unduhan" },
                  { label: "Dokumen Unduhan", url: "" },
                ]}
              />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="flex flex-row justify-between mb-20">
                <span className="text-3xl font-semibold">Dokumen Unduhan</span>
                <AddButton onClick={() => handleModal(null, "Add")} />
              </div>
              <div className="  ">
                <TableWithPagination<DocumentType>
                  search={search}
                  onSearchChange={setSearch}
                  columns={[
                    { label: "Nama File", accessor: "title" },
                    {
                      label: "Cover Dokumen",
                      accessor: "document",
                      render: (item: DocumentType) =>
                        item.document ? (
                          <a href={`${API_FILE}/image/${item.cover}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Lihat File
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">Tidak ada file</span>
                        ),
                    },
                    {
                      label: "Dokumen",
                      accessor: "document",
                      render: (item: DocumentType) =>
                        item.document ? (
                          <a href={`${API_FILE}/documents/${item.document}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Lihat File
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">Tidak ada file</span>
                        ),
                    },
                  ]}
                  data={docs}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "documentsData", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "documentsData", currentPage: page }))}
                  actions={[
                    {
                      label: "Edit",
                      onClick: (item) => handleModal(item.id, "Edit"),
                      component: (item) => <UpdateButton onClick={() => handleModal(item.id, "Edit")} />,
                    },
                    {
                      label: "Delete",
                      onClick: (item) => handleModal(item.id, "Delete"),
                      component: (item) => <DeleteButton onClick={() => handleModal(item.id, "Delete")} />,
                    },
                  ]}
                />
              </div>
              <ModalDocument modal={activeModal === "AddDocuments" || activeModal === "EditDocuments"} setModal={handleCloseModal} type={type} id={id} message={message} />
              <ModalWarning modal={activeModal === "DeleteDocuments" || activeModal === "DeleteDocuments"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDelete} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ManageDownload;
