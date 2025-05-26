import { Pagination } from "flowbite-react";
import DropdownLimit from "../input/dropdownLimit";
import { useState } from "react";

type ActionType<T> = {
  label: string;
  onClick: (item: T) => void;
  component: (item: T) => React.ReactNode;
};
type TableProps<T extends { id: number | string }> = {
  columns: { label: string; accessor: keyof T | string; render?: (item: T) => React.ReactNode; width?: string }[];
  data: T[];
  limit: number;
  totalPages: number;
  currentPage: number;
  // totalData: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  actions?: ActionType<T>[];
  searchable?: boolean;
  search?: string;
  onSearchChange?: (value: string) => void;
  exportButton?: () => void;
  excel?: boolean;
};

function TableWithPagination<T extends { id: number | string }>({ columns, data, limit, totalPages, currentPage, onLimitChange, onPageChange, actions = [], searchable = true, onSearchChange, exportButton, excel = false }: TableProps<T>) {
  const customTheme = {
    pages: {
      selector: {
        active: "bg-PRIMARY01 text-white",
      },
    },
  };

  const [localSearch, setLocalSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange?.(localSearch);
  };

  return (
    <>
      <div className={`flex lg:flex-row flex-col items-center gap-6 lg:gap-2 lg mb-6 ${searchable ? "justify-between" : "justify-end"}`}>
        {searchable && (
          <form onSubmit={handleSubmit} className="flex xl:w-[500px]">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-md border border-gray-300 focus:ring-PRIMARY01 focus:border-PRIMARY01"
                placeholder="Pembayaran, progres, status"
                required
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-PRIMARY01 rounded-e-lg border border-PRIMARY01 hover:bg-PRIMARY01 focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </form>
        )}
        <div className="flex items-center h-full gap-6">
          <div className="flex items-center gap-3">
            <DropdownLimit value={limit} onChange={onLimitChange} />
            <span className="font-medium">entries per page</span>
          </div>
          {excel && (
            <div>
              <button onClick={exportButton} className=" bg-green-600 text-white p-2.5 rounded-md">
                Unduh Excel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto w-full mb-6">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">No</th>
              {columns.map((col, i) => (
                <th key={i} className={`px-4 py-2 text-left border-b ${col.width ?? ""}`}>
                  {col.label}
                </th>
              ))}
              {actions?.length > 0 && <th className="px-4 py-2 text-left w-max  border-b">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white hover:bg-gray-50 ">
                <td className="px-4 py-2 border-b">{index + 1 + (currentPage - 1) * limit}</td>
                {columns.map((col, i) => (
                  <td key={i} className="px-4 py-2 border-b break-words">
                    {col.render ? col.render(item) : ((item[col.accessor as keyof T] ?? "-") as React.ReactNode)}
                  </td>
                ))}
                {actions?.length > 0 && (
                  <td className="border-b whitespace-nowrap w-max ">
                    <div className="">
                      {actions.map((action, i) => (
                        <button key={i} onClick={() => action.onClick(item)} className={`inline-flex ${i !== actions.length - 1 ? "mr-2" : ""}`}>
                          {action.component(item)}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-2 justify-between items-center mb-6">
        <span className="font-medium">{`Showing ${currentPage} to ${totalPages} of ${limit} entries`}</span>
        <Pagination previousLabel="Prev" nextLabel="Next" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons theme={customTheme} />
      </div>
    </>
  );
}

export default TableWithPagination;
