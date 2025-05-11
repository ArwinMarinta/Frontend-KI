import { Pagination } from "flowbite-react";
import { User } from "../../../../types/userType";
// import UpdateButton from "../../../../components/button/updateButton";
import DeleteButton from "../../../../components/button/deleteButton";
import DetailButton from "../../../../components/button/detailButton";
import DropdownLimit from "../../../../components/input/dropdownLimit";
import { setCurrentPageUser, setLimitUser } from "../../../../service/reducers/userReducer";
import { useDispatch } from "react-redux";

type TableAccountProps = {
  data: User[];
  limit: number;
  totalPages: number;
  currentPage: number;
  totalTerms: number;
  handleModal: (id: number | null, type: string) => void;
};

const TableAccount = ({ data, limit, totalPages, currentPage, handleModal }: TableAccountProps) => {
  const dispatch = useDispatch();

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimitUser(newLimit));
  };
  const onPageChange = (page: number) => {
    dispatch(setCurrentPageUser(page));
  };

  const customTheme = {
    pages: {
      selector: {
        // base: " text-sm border border-gray-300 bg-white text-gray-700 hover:bg-blue",
        active: "bg-PRIMARY01 text-white",
      },
    },
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-6">
        <div>
          <input type="email" name="email" placeholder="Cari..." className="p-2 border border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" required />
        </div>
        <div className="flex flex-row gap-3 items-center justify-end w-full">
          <DropdownLimit value={limit} onChange={handleLimitChange} />

          <span className="font-medium">entries per paper</span>
        </div>
        <div></div>
      </div>
      <div className="overflow-x-auto w-full mb-6">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b max-w-10">No</th>
              <th className="px-4 py-2 text-left border-b ">Nama Pengguna</th>
              <th className="px-4 py-2 text-left border-b ">Email Pengguna</th>
              <th className="px-4 py-2 text-left border-b ">Instansi</th>
              <th className="px-4 py-2 text-left border-b ">Role</th>
              <th className="px-4 py-2 text-left border-b ">Verifikasi</th>
              <th className="px-4 py-2 text-left border-b ">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b ">{item?.fullname ?? "-"}</td>
                <td className="px-4 py-2 border-b ">{item?.email ?? "-"}</td>
                <td className="px-4 py-2 border-b ">{item?.institution ?? "-"}</td>
                <td className="px-4 py-2 border-b ">{item?.role ?? "-"}</td>
                <td className="px-4 py-2 border-b ">{item?.isVerified ? "Sudah" : "Belum"}</td>
                <td className="px-4 py-2 border-b ">
                  <div className="flex flex-row gap-2">
                    <DetailButton url="/pengaturan/akun/detail/user" state={{ id: item?.id }} />
                    {/* <UpdateButton /> */}
                    <DeleteButton onClick={() => handleModal(item.id, "Delete")} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between mb-6 items-center">
        <span className="font-medium">{`Showing ${currentPage} to ${totalPages} of ${limit} entries`}</span>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination previousLabel="Prev" nextLabel="Next" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons theme={customTheme} />
        </div>
      </div>
    </>
  );
};

export default TableAccount;
