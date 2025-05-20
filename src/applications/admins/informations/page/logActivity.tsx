import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import TableWithPagination from "../../../../components/table/tableComponent";
import useLogActivity from "../hooks/useLogActivity";
import { ActivityLog } from "../../../../types/logActivity";
import { setCurrentPage, setLimit } from "../../../../service/reducers/informationReducer";
import { formatIndonesianDateTime } from "../../../../utils/formatDate";

const LogActivity = () => {
  const { activity, limit, currentPage, totalPages, dispatch } = useLogActivity();
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
              <span className="text-3xl font-semibold">Log Aktivitas</span>
              {/* <AddButton onClick={() => handleModal(null, "Add")} /> */}
            </div>
            <div className="  ">
              <TableWithPagination<ActivityLog>
                columns={[
                  { label: "Nama Pengguna", accessor: "user", render: (item) => item.user.fullname },
                  { label: "Email", accessor: "user", render: (item) => item.user.email },
                  { label: "Aktivitas", accessor: "action" },
                  { label: "Role", accessor: "user", render: (item) => item.user.role },
                  { label: "Waktu", accessor: "updatedAt", render: (item) => formatIndonesianDateTime(item.user.updatedAt) },
                ]}
                data={activity}
                limit={limit}
                totalPages={Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1}
                currentPage={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
                // totalData={totalValue}
                onLimitChange={(val) => dispatch(setLimit({ key: "logActivity", limit: val }))}
                onPageChange={(page) => dispatch(setCurrentPage({ key: "logActivity", currentPage: page }))}
                actions={[]}
              />
            </div>
            {/* <ModalIpr modal={activeModal === "AddIpr" || activeModal === "EditIpr"} setModal={handleCloseModal} type={type} id={id} message={message} /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogActivity;
