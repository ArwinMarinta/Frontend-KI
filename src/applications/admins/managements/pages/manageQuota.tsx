import { useModal } from "../../../../hooks/useModal";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import TableWithPagination from "../../../../components/table/tableComponent";
import { QuotaItem } from "../../../../types/fundingType";
import { setCurrentPage, setLimit } from "../../../../service/reducers/manageReducer";
import UpdateButton from "../../../../components/button/updateButton";
import useQuota from "../hooks/useQuota";
import ModalQuota from "../components/modal/modalQuota";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const ManageQuota = () => {
  const { quota, limit, totalPages, currentPage, dispatch } = useQuota();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();

  const handleModal = (id: number | null, types: string) => {
    if (types === "Edit") {
      setId(id);
      handleOpenModal(id, "EditQuota");
      setMessage("Ubah Quota Pendanaan");
      setType(types);
    }
  };
  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8">
          <div className="mb-8">
            <Breadcrumb
              title="PENDANAAN"
              items={[
                { label: "Tahun Pendanaan", url: "/manajemen/tahun/pendanaan" },
                { label: "Gelombang Pendanaan", url: `` },
                { label: "Kuota Pendanaan", url: `` },
              ]}
            />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Kouta Pendanaan</span>
            </div>
            <div className=" ">
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
