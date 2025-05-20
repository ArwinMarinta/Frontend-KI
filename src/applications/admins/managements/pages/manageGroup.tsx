import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import AddButton from "../../../../components/button/addButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ManageButton from "../../../../components/button/manageButton";
import UpdateButton from "../../../../components/button/updateButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import TableWithPagination from "../../../../components/table/tableComponent";
import { useModal } from "../../../../hooks/useModal";
import { setCurrentPage, setLimit } from "../../../../service/reducers/manageReducer";
import { PeriodType } from "../../../../types/fundingType";
import { formatIndonesianDate } from "../../../../utils/formatDate";
import ModalGroup from "../components/modal/modalGroup";
import useGroup from "../hooks/useGroup";

const ManageGroup = () => {
  const { group, limit, totalPages, currentPage, dispatch, handleDeleteFaq, years } = useGroup();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Add") {
      handleOpenModal(null, "AddGroups");
      setType(types);
      setMessage("Tambah  FAQ");
    } else if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditGroups");
      setMessage("Ubah FAQ");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteGroups");
      setMessage("Apakah Anda Yakin Ingin Menghapus Gelombang Pendanaan ini?");
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
              <span className="text-3xl font-semibold">Tahun Pendanaan</span>
              <AddButton onClick={() => handleModal(null, "Add")} />
            </div>
            <div className="  ">
              <TableWithPagination<PeriodType>
                columns={[
                  { label: "Gelombang Pendanaan", accessor: "group" },
                  { label: "Waktu Mulai", accessor: "startDate", render: (item) => formatIndonesianDate(item.startDate) },
                  { label: "Waktu Selesai", accessor: "endDate", render: (item) => formatIndonesianDate(item.endDate) },
                ]}
                data={group}
                limit={limit}
                totalPages={totalPages}
                currentPage={currentPage}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "groupsData", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "groupsData", currentPage: page }))}
                actions={[
                  {
                    label: "Detail",
                    onClick: () => {},
                    component: (item) => <ManageButton url={`/manajemen/tahun/pendanaan/${years}/quota/${item.id}`} />,
                  },
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
            <ModalGroup modal={activeModal === "AddGroups" || activeModal === "EditGroups"} setModal={handleCloseModal} type={type} id={id} message={message} />
            <ModalWarning modal={activeModal === "DeleteGroups" || activeModal === "DeleteGroups"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageGroup;
