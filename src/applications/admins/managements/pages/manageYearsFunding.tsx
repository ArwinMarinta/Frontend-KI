import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import useYears from "../hooks/useYears";
import { useModal } from "../../../../hooks/useModal";
import ModalWarning from "../../../../components/modal/modalWarning";
import { setCurrentPage, setLimit } from "../../../../service/reducers/manageReducer";
import AddButton from "../../../../components/button/addButton";
import TableWithPagination from "../../../../components/table/tableComponent";
import { YearsType } from "../../../../types/fundingType";
import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";
import ModalYears from "../components/modal/modalYears";
import ManageButton from "../../../../components/button/manageButton";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";
import { useState } from "react";

const ManageYearsFunding = () => {
  const { years, limit, totalPages, currentPage, dispatch, handleDeleteFaq } = useYears();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, setType, id, message, type } = useModal();
  const [oldYears, setOldYears] = useState<string | null | undefined>("");
  const handleModal = (id: number | null, types: string, yearsOld?: string | null | undefined) => {
    if (types === "Add") {
      handleOpenModal(null, "AddYears");
      setType(types);
      setMessage("Tambah Tahun Pendanaan");
    } else if (types === "Edit") {
      setOldYears(yearsOld);
      setId(id);
      handleOpenModal(id, "EditYears");
      setMessage("Ubah Tahun Pendanaan");
      setType(types);
    } else if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteYears");
      setMessage("Apakah Anda Yakin Ingin Menghapus Tahun ini?");
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
            <Breadcrumb title="PENDANAAN" items={[{ label: "Tahun Pendanaan", url: "" }]} />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Tahun Pendanaan</span>
              <AddButton onClick={() => handleModal(null, "Add")} />
            </div>
            <div className="  ">
              <TableWithPagination<YearsType>
                columns={[{ label: "Tahun Pendanaan", accessor: "year" }]}
                data={years}
                limit={limit}
                searchable={false}
                totalPages={totalPages}
                currentPage={currentPage}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "periodsData", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "periodsData", currentPage: page }))}
                actions={[
                  {
                    label: "Detail",
                    onClick: () => {},
                    component: (item) => <ManageButton url={`/manajemen/tahun/pendanaan/${item?.id}`} />,
                  },
                  {
                    label: "Edit",
                    onClick: (item) => handleModal(item?.id, "Edit", item?.year),
                    component: (item) => <UpdateButton onClick={() => handleModal(item?.id, "Edit", item?.year)} />,
                  },
                  {
                    label: "Delete",
                    onClick: (item) => handleModal(item.id, "Delete"),
                    component: (item) => <DeleteButton onClick={() => handleModal(item?.id, "Delete")} />,
                  },
                ]}
              />
            </div>
            <ModalYears modal={activeModal === "AddYears" || activeModal === "EditYears"} setModal={handleCloseModal} type={type} id={id} message={message} oldYears={oldYears} />
            <ModalWarning modal={activeModal === "DeleteYears" || activeModal === "DeleteYears"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteFaq} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageYearsFunding;
