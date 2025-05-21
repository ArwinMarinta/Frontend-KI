import { Pagination } from "flowbite-react";
import DropdownLimit from "../input/dropdownLimit";

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
};

function TableWithPagination<T extends { id: number | string }>({ columns, data, limit, totalPages, currentPage, onLimitChange, onPageChange, actions = [], searchable = true }: TableProps<T>) {
  const customTheme = {
    pages: {
      selector: {
        active: "bg-PRIMARY01 text-white",
      },
    },
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-6 lg:gap-2 lg justify-between mb-6">
        {searchable && <input type="text" placeholder="Cari..." className="p-2 border border-BORDER01 text-base rounded-md focus:outline-none" />}
        <div className="flex items-center gap-3">
          <DropdownLimit value={limit} onChange={onLimitChange} />
          <span className="font-medium">entries per page</span>
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
