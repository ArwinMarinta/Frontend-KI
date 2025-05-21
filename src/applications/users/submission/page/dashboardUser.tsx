import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import Section_1 from "../../../admins/dashboard/components/section_1";

const DashboardUser = () => {
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideSubmisson />
      </div>
      <div className="lg:w-[84%] w-full border ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8 ">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
            <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
            <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
            <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
            <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
            <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
            <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
            <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
            <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
