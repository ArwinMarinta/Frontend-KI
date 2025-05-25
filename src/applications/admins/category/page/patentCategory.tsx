import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import ModalWarning from "../../../../components/modal/modalWarning";
import TableWithPagination from "../../../../components/table/tableComponent";
import { CategoryPatent } from "../../../../types/patentType";
import { setCurrentPage, setLimit } from "../../../../service/reducers/categoryReducer";
import AddButton from "../../../../components/button/addButton";
import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";
import usePatent from "../hooks/usePatent";
import { useModal } from "../../../../hooks/useModal";
import ModalPatent from "../components/modalPatent";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const PatentCategory = () => {
  const { patents, limit, totalPages, currentPage, dispatch, handleDeleteFaq } = usePatent();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddPatent");
      setType(types);
      setMessage("Tambah Jenis Paten");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditPatent");
      setMessage("Ubah Jenis Paten");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeletePatent");
      setMessage("Apakah Anda Yakin Ingin Menghapus Jenis Paten Ini?");
    }
  };
  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border  ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <div className="mb-8">
            <Breadcrumb title="JENIS PATEN" items={[{ label: "Jenis Paten", url: "" }]} />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Jenis Paten</span>
              <AddButton onClick={() => handleModal(null, "Add")} />
            </div>
            <div className="  ">
              <TableWithPagination<CategoryPatent>
                columns={[{ label: "Jenis Paten", accessor: "title" }]}
                data={patents}
                limit={limit}
                totalPages={Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1}
                currentPage={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "categoryPatent", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "categoryPatent", currentPage: page }))}
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
            <ModalPatent modal={activeModal === "AddPatent" || activeModal === "EditPatent"} setModal={handleCloseModal} type={type} id={id} message={message} />
            <ModalWarning modal={activeModal === "DeletePatent" || activeModal === "DeletePatent"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PatentCategory;
