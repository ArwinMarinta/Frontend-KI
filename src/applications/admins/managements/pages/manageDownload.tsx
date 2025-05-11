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

const ManageDownload = () => {
  const { docs, limit, totalPages, currentPage, dispatch, handleDelete } = useDocument();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | string | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddDocuments");
      setType(types);
      setMessage("Tambah Kategori Unduhan");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditDocuments");
      setMessage("Ubah Kategori Unduhan");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteDocuments");
      setMessage("Apakah Anda Yakin Ingin Menghapus File Ini?");
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
          <div className="container  mt-16">
            <div className="bg-white p-6 rounded-md">
              <div className="flex flex-row justify-between mb-20">
                <span className="text-3xl font-semibold">Dokumen Unduhan</span>
                <AddButton onClick={() => handleModal(null, "Add")} />
              </div>
              <div className="  ">
                <TableWithPagination<DocumentType>
                  columns={[
                    { label: "Nama File", accessor: "title" },
                    {
                      label: "Cover Dokumen",
                      accessor: "document",
                      render: (item: DocumentType) =>
                        item.document ? (
                          <a href={`${API_FILE}/${item.cover}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
                          <a href={`${API_FILE}/${item.document}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
