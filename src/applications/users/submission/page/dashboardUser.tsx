import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";
import Section_1 from "../../../admins/dashboard/components/section_1";
import useUserDashboard from "../hooks/useUserDashboard";

const DashboardUser = () => {
  const { userDashboard } = useUserDashboard();
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideSubmisson />
      </div>
      <div className="lg:w-[84%] w-full border ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <div className="mb-8">
            <Breadcrumb title="DASHBOARD" items={[{ label: "Dashboard", url: `` }]} />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            <Section_1 label={"Hak Cipta"} total={userDashboard?.totalPengajuan?.hakCipta ?? 0} description={"Total Pengajuan"} />
            <Section_1 label={"Paten"} total={userDashboard?.totalPengajuan?.paten ?? 0} description={"Total Pengajuan"} />
            <Section_1 label={"Merek"} total={userDashboard?.totalPengajuan?.merek ?? 0} description={"Total Pengajuan"} />
            <Section_1 label={"Desain Industri"} total={userDashboard?.totalPengajuan?.desainIndustri ?? 0} description={"Total Pengajuan"} />
            <Section_1 label={"Pendanaan"} total={userDashboard?.totalPendanaan?.pendanaan ?? 0} description={"Total Pengajuan"} />
            <Section_1 label={"Mandiri"} total={userDashboard?.totalPendanaan?.mandiri ?? 0} description={"Total Pengajuan"} />
          </div>
          <div className="mt-10">
            <div className="flex flex-col bg-whit lg:p-16 p-4 shadow-md bg-white rounded-md gap-6">
              <div className=" border-PRIMARY01 border-l-[5px] text-lg font-medium pl-1">Pengajuan Terakhir</div>
              <div className="overflow-x-auto w-full mb-6">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left border-b max-w-10">No</th>

                      <th className="px-4 py-2 text-left border-b ">Jenis Pengajuan</th>
                      <th className="px-4 py-2 text-left border-b ">Skema Pendanaan</th>
                      <th className="px-4 py-2 text-left border-b ">Progress Pengajuan</th>
                      <th className="px-4 py-2 text-left border-b ">Waktu Pengajuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDashboard?.pengajuanTerakhir.map((item, index) => (
                      <tr key={item.id} className="bg-white hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{index + 1}</td>

                        <td className="px-4 py-2 border-b">{item.jenisPengajuan}</td>
                        <td className="px-4 py-2 border-b">{item.pendanaan}</td>
                        <td className="px-4 py-2 border-b">{item.progres}</td>
                        <td className="px-4 py-2 border-b">{item.waktuPengajuan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
