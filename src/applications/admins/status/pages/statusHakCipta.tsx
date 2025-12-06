import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation"
import SideNavigation from "../../../../components/adminNavigation/sideNavigation"
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb"
import AddButton from "../../../../components/button/addButton";
import DeleteButton from "../../../../components/button/deleteButton";
// import ManageButton from "../../../../components/button/manageButton";
import UpdateButton from "../../../../components/button/updateButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import TableWithPagination from "../../../../components/table/tableComponent";
import { useModal } from "../../../../hooks/useModal";
import { setLimit , setCurrentPage} from "../../../../service/reducers/statusReducer";
import { StatusCentral } from "../../../../types/submissionType";
import ModalStatus from "../components/modalStatus";
// import useStatus from "../hooks/useStatus";
import useStatusCopyright from "../hooks/useStatusHakCipta";

const statusHakCipta = () => {
  const { center, limit, totalPages, currentPage, dispatch, search, setSearch, handleDeleteStatusByType } = useStatusCopyright();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddStatusCopyright");
      setType(types);
      setMessage("Tambah status Hak Cipta");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditStatusCopyright");
      setMessage("Ubah Jenis Hak Cipta");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteStatusCopyright");
      setMessage("Apakah Anda Yakin Ingin Menghapus Status Hak Cipta Ini?");
    }
  };
  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full  lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <div className="mb-8">
            <Breadcrumb title="STATUS DJKI" items={[{ label: "Status Merek", url: "" }]} />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Status Hak Cipta</span>
              <AddButton onClick={() => handleModal(null, "Add")} />
            </div>
            <div className="  ">
              <TableWithPagination<StatusCentral>
                search={search}
                onSearchChange={setSearch}
                columns={[
                  { label: "Status DJKI", accessor: "name" },
                ]}
                data={center}
                limit={limit}
                totalPages={Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1}
                currentPage={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "hakCipta", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "hakCipta", currentPage: page }))}
                actions={[
                  // {
                  //   label: "Detail",
                  //   onClick: () => { },
                  //   component: (item) => <ManageButton url={`/kategori/hak-cipta/${item.id}/sub-jenis`} />,
                  // },
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
            <ModalStatus modal={activeModal === "AddStatusCopyright" || activeModal === "EditStatusCopyright"} setModal={handleCloseModal} type={type} id={id} message={message} flag={"hakcipta"} />
            <ModalWarning modal={activeModal === "DeleteStatusCopyright" || activeModal === "DeleteStatusCopyright"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteStatusByType} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default statusHakCipta