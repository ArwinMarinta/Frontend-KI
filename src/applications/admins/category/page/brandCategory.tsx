import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import AddButton from "../../../../components/button/addButton";
import useBrand from "../hooks/useBrand";
import { useModal } from "../../../../hooks/useModal";
import TableWithPagination from "../../../../components/table/tableComponent";
import { setCurrentPage, setLimit } from "../../../../service/reducers/categoryReducer";
import { CategoryBrandType } from "../../../../types/brandType";
import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalBrand from "../components/modalBrand";
import ModalWarning from "../../../../components/modal/modalWarning";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const BrandCategory = () => {
  const { brands, limit, totalPages, currentPage, dispatch, handleDeleteFaq } = useBrand();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddBrands");
      setType(types);
      setMessage("Tambah  Jenis Merek");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditBrands");
      setMessage("Ubah Jenis Merek");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteBrands");
      setMessage("Apakah Anda Yakin Ingin Menghapus Jenis Merek Ini?");
    }
  };
  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8">
          <div className="mb-8">
            <Breadcrumb title="JENIS MEREK" items={[{ label: "Jenis Merek", url: "" }]} />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Jenis Merek</span>
              <AddButton onClick={() => handleModal(null, "Add")} />
            </div>
            <div className="  ">
              <TableWithPagination<CategoryBrandType>
                columns={[{ label: "Jenis Merek", accessor: "title" }]}
                data={brands}
                searchable={false}
                limit={limit}
                totalPages={Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1}
                currentPage={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "categoryBrand", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "categoryBrand", currentPage: page }))}
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
            <ModalBrand modal={activeModal === "AddBrands" || activeModal === "EditBrands"} setModal={handleCloseModal} type={type} id={id} message={message} />
            <ModalWarning modal={activeModal === "DeleteBrands" || activeModal === "DeleteBrands"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BrandCategory;
