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
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const SubIndustrialDesign = () => {
  const { design, limit, totalPages, currentPage, dispatch, handleDeleteFaq, search, setSearch } = useSubIndusDesign();
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
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border  ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8">
          <div className="mb-8">
            <Breadcrumb
              title="SUB JENIS DESAIN INDUSTRI"
              items={[
                { label: "Jenis Desain Industri", url: "/kategori/desain-industri" },
                { label: "Sub-Jenis Desain Industri", url: "" },
              ]}
            />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Sub-Jenis Desain Industri</span>
              <AddButton onClick={() => handleModal(null, "Add")} />
            </div>
            <div className="  ">
              <TableWithPagination<IndustialDesignType>
                search={search}
                onSearchChange={setSearch}
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
