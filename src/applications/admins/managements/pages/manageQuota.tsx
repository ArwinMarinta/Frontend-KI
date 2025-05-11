import { useModal } from "../../../../hooks/useModal";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import TableWithPagination from "../../../../components/table/tableComponent";
import { QuotaItem } from "../../../../types/fundingType";
import { setCurrentPage, setLimit } from "../../../../service/reducers/manageReducer";
import UpdateButton from "../../../../components/button/updateButton";
import useQuota from "../hooks/useQuota";
import ModalQuota from "../components/modal/modalQuota";

const ManageQuota = () => {
  const { quota, limit, totalPages, currentPage, dispatch } = useQuota();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    // if (types === "Add") {
    //   handleOpenModal(null, "AddQuota");
    //   setType(types);
    //   setMessage("Tambah  Quota");
    // } else
    if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditQuota");
      setMessage("Ubah FAQ");
      setType(types);
    }
    // else if (types === "Delete") {
    //   setId(id);
    //   handleOpenModal(id, "DeleteQuota");
    //   setMessage("Apakah Anda Yakin Ingin Menghapus Gelombang Pendanaan ini?");
    // }
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
              <span className="text-3xl font-semibold">Kouta Pendanaan</span>
            </div>
            <div className="  ">
              <TableWithPagination<QuotaItem>
                columns={[
                  { label: "Kekayaan Intelektual", accessor: "title" },
                  { label: "Kouta", accessor: "quota" },
                  { label: "Sisa Kouta", accessor: "remainingQuota" },
                ]}
                data={quota}
                limit={limit}
                totalPages={totalPages}
                currentPage={currentPage}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "quotasData", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "quotasData", currentPage: page }))}
                actions={[
                  //   {
                  //     label: "Detail",
                  //     onClick: () => {},
                  //     component: (item) => <ManageButton url={`/manajemen/tahun/pendanaan/${item.id}`} />,
                  //   },
                  {
                    label: "Edit",
                    onClick: (item) => handleModal(item.id, "Edit"),
                    component: (item) => <UpdateButton onClick={() => handleModal(item.id, "Edit")} />,
                  },
                  //   {
                  //     label: "Delete",
                  //     onClick: (item) => handleModal(item.id, "Delete"),
                  //     component: (item) => <DeleteButton onClick={() => handleModal(item.id, "Delete")} />,
                  //   },
                ]}
              />
            </div>
            <ModalQuota modal={activeModal === "EditQuota" || activeModal === "EditQuota"} setModal={handleCloseModal} type={type} id={id} message={message} />
            {/* <ModalWarning modal={activeModal === "DeleteGroups" || activeModal === "DeleteGroups"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageQuota;
