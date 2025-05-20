import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import Section_1 from "../components/section_1";
import useDashboardAdmin from "../hooks/useDashboardAdmin";

const Dashboard = () => {
  const { dashboard } = useDashboardAdmin();
  return (
    <>
      <main className="flex flex-row w-full h-full bg-GREY01">
        <div className="min-h-full lg:w-[16%] hidden md:block bg-white  ">
          <SideNavigation />
        </div>
        <div className="w-[84%]  border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12   py-16">
            <div className="grid grid-cols-4 gap-6">
              <Section_1 label={"Hak Cipta"} total={dashboard?.totalPengajuan.hakCipta ?? 0} description={"Total Pengajuan"} />
              <Section_1 label={"Paten"} total={dashboard?.totalPengajuan.paten ?? 0} description={"Total Pengajuan"} />
              <Section_1 label={"Merek"} total={dashboard?.totalPengajuan.merek ?? 0} description={"Total Pengajuan"} />
              <Section_1 label={"Desain Industri"} total={dashboard?.totalPengajuan.desainIndustri ?? 0} description={"Total Pengajuan"} />
              <Section_1 label={"Pendanaan"} total={dashboard?.totalPendanaan.pendanaan ?? 0} description={"Total Biaya ITK"} />
              <Section_1 label={"Mandiri"} total={dashboard?.totalPendanaan.mandiri ?? 0} description={"Total Biaya Mandiri"} />
              <Section_1 label={"FAQ"} total={dashboard?.faq ?? 0} description={"Total FAQ"} />
              <Section_1 label={"Unduhan"} total={dashboard?.unduhan ?? 0} description={"Total Dokumen"} />
            </div>
            <div className="mt-10">
              <div className="flex flex-col bg-whit p-6 bg-white rounded-md gap-6">
                <div className=" border-PRIMARY01 border-l-[5px] text-lg font-medium pl-1">Pengajuan Terakhir</div>
                <div className="overflow-x-auto w-full mb-6">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left border-b max-w-10">No</th>
                        <th className="px-4 py-2 text-left border-b ">Nama Pengguna</th>
                        <th className="px-4 py-2 text-left border-b ">Jenis Pengajuan</th>
                        <th className="px-4 py-2 text-left border-b ">Skema Pendanaan</th>
                        <th className="px-4 py-2 text-left border-b ">Progress Pengajuan</th>
                        <th className="px-4 py-2 text-left border-b ">Waktu Pengajuan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard?.pengajuanTerakhir.map((item, index) => (
                        <tr key={item.id} className="bg-white hover:bg-gray-50">
                          <td className="px-4 py-2 border-b">{index + 1}</td>
                          <td className="px-4 py-2 border-b">{item.namaPengguna}</td>
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
      </main>
    </>
  );
};

export default Dashboard;
