import SideNavigation from "../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../components/adminNavigation/headerNavigation";
import ButtonAdd from "../../../components/button/linkButton";
import useAccount from "./hooks/useAccount";
// import { useState } from "react";
import TableAccount from "./components/tableAccount";
import { useModal } from "../../../hooks/useModal";
import ModalWarning from "../../../components/modal/modalWarning";
import Breadcrumb from "../../../components/breadcrumb.tsx/breadcrumb";

const Account = () => {
  const { users, limit, totalPages, currentPage, totalValue, handleDeleteUser } = useAccount();
  const { activeModal, handleOpenModal, handleCloseModal, setId, setMessage, id, message } = useModal();
  const handleModal = (id: number | null, types: string) => {
    if (types === "Delete") {
      setId(id);
      handleOpenModal(id, "DeleteUser");
      setMessage("Apakah Anda Yakin Ingin Menghapus User Ini?");
    }
  };

  return (
    <>
      <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full  lg:w-[16%] hidden lg:block bg-white">
          <SideNavigation />
        </div>
        <div className="lg:w-[84%] w-full  border  ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8">
            <div className="mb-8">
              <Breadcrumb title="PENGATURAN AKUN" items={[{ label: "Pengaturan Akun", url: "" }]} />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="flex flex-row justify-between mb-20">
                <span className="text-3xl font-semibold">Pengaturan Akun</span>
                <ButtonAdd url={"/pengaturan/akun/tambah/user"} />
              </div>
              <div className="">
                <TableAccount data={users} limit={limit} totalPages={totalPages} currentPage={currentPage} totalTerms={totalValue} handleModal={handleModal} />
              </div>
              <ModalWarning modal={activeModal === "DeleteUser" || activeModal === "DeleteTerms"} setModal={handleCloseModal} id={id} message={message} handleDelete={handleDeleteUser} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Account;
