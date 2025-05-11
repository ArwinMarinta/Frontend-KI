import { useModal } from "../../../../hooks/useModal";
import useSubIndusDesign from "../hooks/useSubIndusDesign";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import AddButton from "../../../../components/button/addButton";
import TableWithPagination from "../../../../components/table/tableComponent";
import { IndustialDesignType } from "../../../../types/industrialDesignType";
import { setCurrentPage, setLimit } from "../../../../service/reducers/categoryReducer";
import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalSubIndusDesign from "../components/modalSubIndusDesign";
import ModalWarning from "../../../../components/modal/modalWarning";

const SubIndustrialDesign = () => {
  const { design, limit, totalPages, currentPage, dispatch, handleDeleteFaq } = useSubIndusDesign();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddSubIndusDesign");
      setType(types);
      setMessage("Tambah Sub-Jenis Desain Industri");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditSubIndusDesign");
      setMessage("Ubah Sub-Jenis Desain Industri");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubIndusDesign");
      setMessage("Apakah Anda Yakin Ingin Menghapus Sub-Jenis Desain Industri Ini?");
    }
  };
  return (
    <main className="flex flex-row w-full h-full bg-GREY01">
      <div className="min-h-full w-[16%] bg-white">
        <SideNavigation />
      </div>
      <div className="w-[84%]  border ">
        <HeaderNavigation />
        <div className="container  mt-16">
          <div className="bg-white p-6 rounded-md">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Sub-Jenis Desain Industri</span>
              <AddButton onClick={() => handleModal(null, "Add")} />
            </div>
            <div className="  ">
              <TableWithPagination<IndustialDesignType>
                columns={[{ label: "Jenis Hak Cipta", accessor: "title" }]}
                data={design}
                limit={limit}
                totalPages={Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1}
                currentPage={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "categorySubIndustrialDesign", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "categorySubIndustrialDesign", currentPage: page }))}
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
            <ModalSubIndusDesign modal={activeModal === "AddSubIndusDesign" || activeModal === "EditSubIndusDesign"} setModal={handleCloseModal} type={type} id={id} message={message} />
            <ModalWarning modal={activeModal === "DeleteSubIndusDesign" || activeModal === "DeleteSubIndusDesign"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubIndustrialDesign;
