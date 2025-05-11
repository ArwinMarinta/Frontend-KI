import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import FormReportAnalitic from "../components/formReportAnalitic";

const ReportsAnalitic = () => {
  return (
    <>
      <main className="flex flex-row w-full h-full bg-GREY01">
        <div className="min-h-full w-[16%] bg-white">
          <SideNavigation />
        </div>
        <div className="w-[84%]  border ">
          <HeaderNavigation />
          <div className="container  mt-16">
            <div className="bg-white p-6 rounded-md">
              <div className="flex flex-row justify-between mb-12">
                <span className="text-3xl font-semibold">Laporan dan Analisis</span>
              </div>
              <FormReportAnalitic />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReportsAnalitic;
