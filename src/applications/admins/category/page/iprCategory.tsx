import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import { setCurrentPage, setLimit } from "../../../../service/reducers/categoryReducer";
import TableWithPagination from "../../../../components/table/tableComponent";
import { IprType } from "../../../../types/iprType";
import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import useIpr from "../hooks/useIpr";
import { useModal } from "../../../../hooks/useModal";
import ModalIpr from "../components/modalIpr";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const IprCategory = () => {
  const { iprs, limit, totalPages, currentPage, dispatch, handleDeleteFaq } = useIpr();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddIpr");
      setType(types);
      setMessage("Tambah Kekayaan Inteletual");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditIpr");
      setMessage("Ubah Kekayaan Inteletual");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteIpr");
      setMessage("Apakah Anda Yakin Ingin Menghapus Kekeyaan Inteletual Ini?");
    }
  };
  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <div className="mb-8">
            <Breadcrumb title="JENIS KEKAYAAN INTELEKTUAL" items={[{ label: "Jenis Kekayaan Intelektual", url: "" }]} />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Kategori Kekayaan Intelektual</span>
              {/* <AddButton onClick={() => handleModal(null, "Add")} /> */}
            </div>
            <div className="  ">
              <TableWithPagination<IprType>
                columns={[
                  { label: "Kekayaan Intelektual", accessor: "title" },
                  {
                    label: "Publish",
                    accessor: "isPublish",
                    render: (item) => <input type="checkbox" checked={item.isPublish} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" />,
                  },
                ]}
                data={iprs}
                limit={limit}
                totalPages={Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1}
                currentPage={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "categoryIpr", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "categoryIpr", currentPage: page }))}
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
            <ModalIpr modal={activeModal === "AddIpr" || activeModal === "EditIpr"} setModal={handleCloseModal} type={type} id={id} message={message} />
            <ModalWarning modal={activeModal === "DeleteIpr" || activeModal === "DeleteIpr"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default IprCategory;
