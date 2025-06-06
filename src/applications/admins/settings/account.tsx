import SideNavigation from "../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../components/adminNavigation/headerNavigation";
import useAccount from "./hooks/useAccount";
import { useModal } from "../../../hooks/useModal";
import ModalWarning from "../../../components/modal/modalWarning";
import Breadcrumb from "../../../components/breadcrumb.tsx/breadcrumb";
import TableWithPagination from "../../../components/table/tableComponent";
import { User } from "../../../types/userType";
import { Link } from "react-router-dom";
import DeleteButton from "../../../components/button/deleteButton";
import DetailButton from "../../../components/button/detailButton";
import { setCurrentPage, setLimit } from "../../../service/reducers/userReducer";
import { FaPlus } from "react-icons/fa6";

const Account = () => {
  const { users, limit, totalPages, currentPage, handleDeleteUser, dispatch, search, setSearch } = useAccount();
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
                <Link to={"/pengaturan/akun/tambah/user"} state={{ type: "create" }}>
                  <button className="flex flex-row items-center gap-1 bg-white border-2 border-PRIMARY01 hover:border-0  text-PRIMARY01 rounded-md hover:bg-PRIMARY01 hover:text-white px-3 py-1 font-medium">
                    <FaPlus />
                    <span>Tambah</span>
                  </button>
                </Link>
              </div>
              <div className="">
                <TableWithPagination<User>
                  search={search}
                  onSearchChange={setSearch}
                  columns={[
                    { label: "Nama Pengguna", accessor: "fullname" },
                    { label: "Email", accessor: "email" },
                    { label: "Instansi", accessor: "institution" },
                    { label: "Role", accessor: "role" },
                    { label: "Verifikasi", accessor: "isVerified ", render: (item: User) => (item.isVerified ? "Sudah" : "Belum") },
                  ]}
                  data={users}
                  limit={limit}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  // totalData={totalValue}
                  onLimitChange={(val) => dispatch(setLimit({ key: "account", limit: val }))}
                  onPageChange={(page) => dispatch(setCurrentPage({ key: "account", currentPage: page }))}
                  actions={[
                    {
                      label: "Detail",
                      onClick: () => {},
                      component: (item) => <DetailButton url="/pengaturan/akun/detail/user" state={{ id: item?.id, type: "detail" }} />,
                    },
                    {
                      label: "Edit",
                      onClick: () => {},
                      component: (item) => (
                        <Link to={"/pengaturan/akun/ubah/user"} state={{ userId: item.id, type: "update" }} className="py-1 px-2 border border-YELLOW03 rounded-md text-YELLOW03 font-medium">
                          Ubah
                        </Link>
                      ),
                    },
                    {
                      label: "Delete",
                      onClick: (item) => handleModal(item.id, "Delete"),
                      component: (item) => <DeleteButton onClick={() => handleModal(item.id, "Delete")} />,
                    },
                  ]}
                />

                {/* <TableAccount data={users} limit={limit} totalPages={totalPages} currentPage={currentPage} totalTerms={totalValue} handleModal={handleModal} /> */}
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
