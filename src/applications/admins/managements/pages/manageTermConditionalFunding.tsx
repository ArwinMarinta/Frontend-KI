import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import useTerms from "../hooks/useTerms";
import AddButton from "../../../../components/button/addButton";
import { useModal } from "../../../../hooks/useModal";
import ModalTerms from "../components/modal/modalTerms";
import ModalWarning from "../../../../components/modal/modalWarning";
import { setCurrentPage, setLimit } from "../../../../service/reducers/manageReducer";
import { TermType } from "../../../../types/termsType";
import TableWithPagination from "../../../../components/table/tableComponent";
import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";

const ManageTermConditionalFunding = () => {
  const { terms, limit, totalPages, currentPage, handleDelete, dispatch } = useTerms();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddTerm");
      setType(types);
      setMessage("Tambah Syarat dan Ketentuan");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditTerms");
      setMessage("Ubah Syarat dan Ketentuan");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteTerms");
      setMessage("Apakah Anda Yakin Ingin Menghapus Data Syarat & Ketentuan Ini?");
    }
  };

  return (
    <>
      <main className="flex flex-row w-full h-full bg-GREY01">
        <div className="min-h-screen w-[16%] bg-white ">
          <SideNavigation />
        </div>
        <div className="w-[84%]  border ">
          <HeaderNavigation />
          <div className="container  mt-16">
            <div className="bg-white p-6 rounded-md">
              <div className="flex flex-row justify-between mb-20">
                <span className="text-3xl font-semibold">S&K Pendanaan</span>
                <AddButton onClick={() => handleModal(null, "Add")} />
              </div>
              <div className="  ">
                <TableWithPagination<TermType>
                  columns={[{ label: "Syarat dan Ketentuan", accessor: "terms" }]}
                  data={terms}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "termsData", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "termsData", currentPage: page }))}
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
            </div>

            <ModalTerms modal={activeModal === "AddTerm" || activeModal === "EditTerms"} setModal={handleCloseModal} type={type} id={id} message={message} />
            <ModalWarning modal={activeModal === "DeleteTerms" || activeModal === "DeleteTerms"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDelete} />
          </div>
        </div>
      </main>
    </>
  );
};

export default ManageTermConditionalFunding;
