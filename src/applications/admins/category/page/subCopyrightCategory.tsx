import useSubCopyright from "../hooks/useSubCopyright";
import { useModal } from "../../../../hooks/useModal";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import AddButton from "../../../../components/button/addButton";
import TableWithPagination from "../../../../components/table/tableComponent";
import { CopyrightType } from "../../../../types/copyright";
import { setCurrentPage, setLimit } from "../../../../service/reducers/categoryReducer";
import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import ModalSubCopyright from "../components/modalSubCopyright";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const SubCopyrightCategory = () => {
  const { copyright, limit, totalPages, currentPage, dispatch, handleDeleteFaq, search, setSearch } = useSubCopyright();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddSubBrands");
      setType(types);
      setMessage("Tambah Sub-Jenis Hak Cipta");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditSubBrands");
      setMessage("Ubah Sub-Jenis Hak Cipta");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteSubBrands");
      setMessage("Apakah Anda Yakin Ingin Menghapus Sub-Jenis Hak Cipta Ini?");
    }
  };
  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full w-[16%] bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <div className="mb-8">
            <Breadcrumb
              title="SUB JENIS HAK CIPTA"
              items={[
                { label: "Jenis Hak Cipta", url: "/kategori/hak-cipta" },
                { label: "Sub Jenis Hak Cipta", url: "" },
              ]}
            />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Sub-Jenis Hak Cipta</span>
              <AddButton onClick={() => handleModal(null, "Add")} />
            </div>
            <div className="  ">
              <TableWithPagination<CopyrightType>
                search={search}
                onSearchChange={setSearch}
                columns={[{ label: "Jenis Hak Cipta", accessor: "title" }]}
                data={copyright}
                limit={limit}
                totalPages={Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1}
                currentPage={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "categorySubCopyright", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "categorySubCopyright", currentPage: page }))}
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
            <ModalSubCopyright modal={activeModal === "AddSubBrands" || activeModal === "EditSubBrands"} setModal={handleCloseModal} type={type} id={id} message={message} />
            <ModalWarning modal={activeModal === "DeleteSubBrands" || activeModal === "DeleteSubBrands"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubCopyrightCategory;
