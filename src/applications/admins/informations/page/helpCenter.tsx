import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import useHelpCenter from "../hooks/useHelpCenter";
import { useModal } from "../../../../hooks/useModal";
import TableWithPagination from "../../../../components/table/tableComponent";
import { HelpCenterType } from "../../../../types/helpCenter";
import { setCurrentPage, setLimit } from "../../../../service/reducers/informationReducer";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalWarning from "../../../../components/modal/modalWarning";
import { formatIndonesianDateTime } from "../../../../utils/formatDate";
import ReplyButton from "../../../../components/button/replyButton";

const HelpCenter = () => {
  const { center, limit, totalPages, currentPage, dispatch, handleDeleteFaq } = useHelpCenter();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message } = useModal();

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
      handleOpenModal(id, "DeleteHelpCenter");
      setMessage("Apakah Anda Yakin Ingin Menghapus Kekeyaan Inteletual Ini?");
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
              <span className="text-3xl font-semibold">Pusat Bantuan</span>
              {/* <AddButton onClick={() => handleModal(null, "Add")} /> */}
            </div>
            <div className="  ">
              <TableWithPagination<HelpCenterType>
                columns={[
                  { label: "Email", accessor: "email" },
                  { label: "No Telphone", accessor: "phoneNumber" },
                  { label: "Masalah", accessor: "problem" },
                  {
                    label: "Status",
                    accessor: "status",
                    render: (row) => (row.status ? "Terkirim" : "Menunggu"),
                  },
                  { label: "Update", accessor: "updatedAt", render: (row) => formatIndonesianDateTime(row.updatedAt) },
                ]}
                data={center}
                limit={limit}
                totalPages={Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1}
                currentPage={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "helpCenter", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "helpCenter", currentPage: page }))}
                actions={[
                  {
                    label: "Reply",
                    onClick: () => {},
                    component: (item) => !item.status && <ReplyButton url={`/informasi/pusat-bantuan/balas/${item.id}`} />,
                  },

                  {
                    label: "Delete",
                    onClick: (item) => handleModal(item.id, "Delete"),
                    component: (item) => <DeleteButton onClick={() => handleModal(item.id, "Delete")} />,
                  },
                ]}
              />
            </div>
            {/* <ModalIpr modal={activeModal === "AddIpr" || activeModal === "EditIpr"} setModal={handleCloseModal} type={type} id={id} message={message} /> */}
            <ModalWarning modal={activeModal === "DeleteHelpCenter" || activeModal === "DeleteHelpCenter"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HelpCenter;
