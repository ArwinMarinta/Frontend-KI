import useCategoryDocument from "../hooks/useCategoryDocument";
import { useModal } from "../../../../hooks/useModal";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import AddButton from "../../../../components/button/addButton";
import TableWithPagination from "../../../../components/table/tableComponent";
import { DocumentCategoryType } from "../../../../types/document";
import { setCurrentPage, setLimit } from "../../../../service/reducers/manageReducer";
import ManageButton from "../../../../components/button/manageButton";
import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import ModalCategoryDocument from "../components/modal/modalCategoryDocument";

const ManageCategoryDownload = () => {
  const { docs, limit, totalPages, currentPage, handleDelete, dispatch } = useCategoryDocument();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | string | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddCategoryDocuments");
      setType(types);
      setMessage("Tambah Kategori Unduhan");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditCategoryDocuments");
      setMessage("Ubah Kategori Unduhan");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteCategoryDocuments");
      setMessage("Apakah Anda Yakin Ingin Menghapus Ketegori Unduhan Ini?");
    }
  };
  return (
    <>
      <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full  lg:w-[16%] hidden lg:block bg-white">
          <SideNavigation />
        </div>
        <div className="lg:w-[84%] w-full  border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8">
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="flex flex-row justify-between mb-20">
                <span className="text-3xl font-semibold">Kategori Unduhan</span>
                <AddButton onClick={() => handleModal(null, "Add")} />
              </div>
              <div className="  ">
                <TableWithPagination<DocumentCategoryType>
                  columns={[
                    { label: "Kategori Unduhan", accessor: "type" },
                    { label: "Total Dokumen", accessor: "totalTypeDigunakan" },
                  ]}
                  data={docs}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "documentsCategoryData", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "documentsCategoryData", currentPage: page }))}
                  actions={[
                    {
                      label: "Detail",
                      onClick: () => {},
                      component: (item) => <ManageButton url={`/manajemen/kategori/unduhan/${item.type}`} />,
                    },
                    {
                      label: "Edit",
                      onClick: (item) => handleModal(item.id, "Edit"),
                      component: (item) => <UpdateButton onClick={() => handleModal(item.id, "Edit")} />,
                    },
                    {
                      label: "Delete",
                      onClick: (item) => handleModal(item.type, "Delete"),
                      component: (item) => <DeleteButton onClick={() => handleModal(item.type, "Delete")} />,
                    },
                  ]}
                />
              </div>
              <ModalCategoryDocument modal={activeModal === "AddCategoryDocuments" || activeModal === "EditCategoryDocuments"} setModal={handleCloseModal} type={type} id={id} message={message} />
              <ModalWarning modal={activeModal === "DeleteCategoryDocuments" || activeModal === "DeleteCategoryDocuments"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDelete} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ManageCategoryDownload;
