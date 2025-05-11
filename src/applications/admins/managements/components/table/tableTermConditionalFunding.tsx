import { Pagination } from "flowbite-react";
import { TermType } from "../../../../../types/termsType";
import UpdateButton from "../../../../../components/button/updateButton";
import DeleteButton from "../../../../../components/button/deleteButton";
import DropdownLimit from "../../../../../components/input/dropdownLimit";
import { customTheme } from "../../../../../utils/customThemeFlowbite";
import { useDispatch } from "react-redux";
import { setCurrentPageTerms, setLimitTerms } from "../../../../../service/reducers/manageReducer";

type TableTermsProps = {
  data: TermType[];
  limit: number;
  // setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  currentPage: number;
  totalTerms: number;
  // onPageChange: (page: number) => void;
  handleModal: (id: number | null, type: string) => void;
};

const TableTermConditionalFunding = ({ data, limit, totalPages, currentPage, handleModal }: TableTermsProps) => {
  const dispatch = useDispatch();

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimitTerms(newLimit));
  };
  const onPageChange = (page: number) => {
    dispatch(setCurrentPageTerms(page));
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-6 ">
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
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left border-b max-w-10">No</th>
              <th className="px-4 py-2 text-left border-b ">Syarat dan Ketentuan</th>
              <th className="px-4 py-2 text-left border-b ">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-100">
                <td className="px-4 py-2 border-b"> {index + 1 + (currentPage - 1) * limit}</td>
                <td className="px-4 py-2 border-b ">{item?.terms ?? "-"}</td>
                <td className="px-4 py-2 border-b ">
                  <div className="flex flex-row gap-2">
                    <UpdateButton onClick={() => handleModal(item.id, "Edit")} />
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

export default TableTermConditionalFunding;
