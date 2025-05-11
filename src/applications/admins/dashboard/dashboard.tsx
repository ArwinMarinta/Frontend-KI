import HeaderNavigation from "../../../components/adminNavigation/headerNavigation";
import SideNavigation from "../../../components/adminNavigation/sideNavigation";
import Section_1 from "./components/section_1";
import Section_2 from "./components/section_2";

const Dashboard = () => {
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
              <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
              <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
              <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
              <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
              <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
              <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
              <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
              <Section_1 label={"Hak Cipta"} total={24} description={"Total Pengajuan"} />
            </div>
            <div className="mt-10">
              <Section_2 />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
