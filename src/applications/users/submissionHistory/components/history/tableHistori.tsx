import { Dropdown, DropdownItem } from "flowbite-react";
import { FaAngleDown } from "react-icons/fa6";
import { Pagination } from "flowbite-react";
import { useState } from "react";

const TabelHistori = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <>
      <div className="flex flex-row justify-between mb-6">
        <div>
          <input type="email" name="email" placeholder="Cari..." className="p-2 border border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" required />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <button className="relative rounded-md border border-GREY02 px-3 py-2 ">
                <div className="flex flex-row items-center gap-1">
                  <span>10</span>
                  <FaAngleDown className="text-[10px]" />
                </div>
              </button>
            )}
            className="<w-max-fit></w-max-fit> "
          >
            <DropdownItem value="10" className="text-gray-900 hover:bg-gray-100">
              10
            </DropdownItem>
            <DropdownItem value="20" className="text-gray-900 hover:bg-gray-100">
              20
            </DropdownItem>
            <DropdownItem value="30" className="text-gray-900 hover:bg-gray-100">
              30
            </DropdownItem>
            <DropdownItem value="40" className="text-gray-900 hover:bg-gray-100">
              40
            </DropdownItem>
          </Dropdown>

          <span className="font-medium">entries per paper</span>
        </div>
      </div>
      <div className="overflow-x-auto w-full mb-6">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b max-w-10">No</th>
              <th className="px-4 py-2 text-left border-b ">Judul Ciptaan</th>
              <th className="px-4 py-2 text-left border-b ">Status Pengajuan</th>
              <th className="px-4 py-2 text-left border-b ">Progress Pengajuan</th>
              <th className="px-4 py-2 text-left border-b ">Informasi Pengajuan</th>
              <th className="px-4 py-2 text-left border-b ">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white hover:bg-gray-50">
              <td className="px-4 py-2 border-b">1</td>
              <td className="px-4 py-2 border-b ">FORMULASI DAN SPESIFIKASI TEPUNG BIJI</td>
              <td className="px-4 py-2 border-b">Pemeriksaan Substantif</td>
              <td className="px-4 py-2 border-b">Lihat Progress</td>
              <td className="px-4 py-2 border-b">Detail Pengajuan</td>
              <td className="px-4 py-2 border-b text-cyan-600 hover:underline cursor-pointer">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between mb-6 items-center">
        <span className="font-medium">Showing 1 to 10 of 21 entries</span>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination previousLabel="Prev" nextLabel="Next" layout="navigation" currentPage={currentPage} totalPages={5} onPageChange={onPageChange} showIcons />
        </div>
      </div>
    </>
  );
};

export default TabelHistori;
