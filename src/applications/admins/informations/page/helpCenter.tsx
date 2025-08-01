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
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const HelpCenter = () => {
  const { center, limit, totalPages, currentPage, dispatch, handleDeleteFaq, search, setSearch } = useHelpCenter();
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
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full  lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <div className="mb-8">
            <Breadcrumb title="PUSAT BANTUAN" items={[{ label: "Pusat Bantuan", url: "" }]} />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Pusat Bantuan</span>
              {/* <AddButton onClick={() => handleModal(null, "Add")} /> */}
            </div>
            <div className="  ">
              <TableWithPagination<HelpCenterType>
                search={search}
                onSearchChange={setSearch}
                columns={[
                  { label: "Email", accessor: "email" },
                  { label: "No Telphone", accessor: "phoneNumber" },
                  { label: "Masalah", accessor: "problem" },
                  {
                    label: "Status",
                    accessor: "status",
                    render: (row) => (row?.status ? "Terkirim" : "Menunggu"),
                  },
                  { label: "Update", accessor: "updatedAt", render: (row) => formatIndonesianDateTime(row?.updatedAt) },
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
                    component: (item) => !item.status && <ReplyButton url={`/informasi/pusat-bantuan/balas/${item?.id}`} />,
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
