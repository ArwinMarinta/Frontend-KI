import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import Section_1 from "../../../admins/dashboard/components/section_1";

const DashboardUser = () => {
  return (
    <div className="flex flex-row w-full h-full bg-gray-100">
      <div className="min-h-full w-[16%] bg-white">
        <SideSubmisson />
      </div>
      <div className="w-[84%]  border ">
        <HeaderNavigation />
        <div className="px-4 lg:px-12   py-16">
          <div className="grid grid-cols-4 gap-6">
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
