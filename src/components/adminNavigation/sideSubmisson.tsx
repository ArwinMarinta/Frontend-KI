import LogoKI from "../../assets/logo_ki.webp";
import { Link, useLocation } from "react-router-dom";
import Button from "../adminNavigation/buttonSideNavigation";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineMusicNote } from "react-icons/hi";
import { LuAtom } from "react-icons/lu";
import { LiaTagSolid } from "react-icons/lia";
import { RxCube } from "react-icons/rx";
import { BiTask } from "react-icons/bi";
import { RiHistoryLine } from "react-icons/ri";
import useProfile from "../../hooks/useProfile";

const SideSubmisson = () => {
  const location = useLocation();
  const { user } = useProfile();
  const type = "hak-cipta";
  return (
    <div className="overflow-y-scroll top-0 sticky left-0  ">
      <div className="flex flex-col px-8 pt-8  w-full h-screen  ">
        <Link to="/" className="flex w-full flex-col items-center p-4 gap-4">
          <img src={LogoKI} alt="image" className="h-28 rounded-full" />
          <span className="font-bold text-PRIMARY01 text-2xl">
            Sentra <br /> KI ITK
          </span>
        </Link>
        <div className="flex flex-col gap-2 mt-8 ">
          <div className="mb-2 flex flex-col gap-1">
            <h1 className="font-bold text-GREY02 mb-2">MENU</h1>
            <Button text={"Dashboard"} icon={<MdOutlineDashboard className={`text-lg`} />} url={"/dashboard/pengajuan"} location={location} />
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <h1 className="font-bold text-GREY02 mb-2">PENGAJUAN</h1>
            <Button text={"Hak Cipta"} icon={<HiOutlineMusicNote className="text-lg" />} url={"/pengajuan/hak-cipta"} location={location} />
            <Button text={"Paten"} icon={<LuAtom className="text-lg" />} url={"/pengajuan/paten"} location={location} />
            <Button text={"Merek"} icon={<LiaTagSolid className="text-lg" />} url={"/pengajuan/merek"} location={location} />
            <Button text={"Desain Industri"} icon={<RxCube className="text-lg" />} url={"/pengajuan/desain-industri"} location={location} />
          </div>
          {user?.role === "reviewer" && (
            <div className="mb-2 flex flex-col gap-1">
              <h1 className="font-bold text-GREY02 mb-2">REVIEWER</h1>
              <Button text={"Penugasan"} icon={<BiTask className="text-lg" />} url={"/penugasan"} location={location} />
            </div>
          )}

          <div className="mb-2 flex flex-col gap-1">
            <h1 className="font-bold text-GREY02 mb-2">PANGAJUAN SAYA</h1>
            <Button text={"Progres Pengajuan"} icon={<RiHistoryLine className="text-lg" />} url={`/histori-pengajuan/${type}`} location={location} />

            {/* <Button text={"Riwayat"} icon={<RiHistoryLine className="text-lg" />} url={"/histori-pengajuan/hak-cipta"} location={location} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideSubmisson;
