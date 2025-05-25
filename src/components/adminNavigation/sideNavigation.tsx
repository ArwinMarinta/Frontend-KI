import LogoKI from "../../assets/logo_ki.webp";
import Button from "./buttonSideNavigation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiOutlineMusicNote } from "react-icons/hi";
import { LuAtom, LuSettings, LuFileSliders } from "react-icons/lu";
import { LiaTagSolid } from "react-icons/lia";
import { RxCube, RxActivityLog } from "react-icons/rx";
// import { TbCategory2 } from "react-icons/tb";
import { MdOutlineMarkChatUnread, MdOutlineQuestionAnswer, MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { TbFileDownload, TbBrandGoogleAnalytics, TbContract } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../../service/store";

const SideNavigation = () => {
  const location = useLocation();

  const { user, token } = useSelector((state: RootState) => state.auth);

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
            <Button text={"Dashboard"} icon={<MdOutlineDashboard className={`text-lg`} />} url={"/dashboard"} location={location} />
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <h1 className="font-bold text-GREY02 mb-2">PERMOHONAN</h1>
            <Button text={"Hak Cipta"} icon={<HiOutlineMusicNote className="text-lg" />} url={"/permohonan/hak-cipta"} location={location} />
            <Button text={"Paten"} icon={<LuAtom className="text-lg" />} url={"/permohonan/paten"} location={location} />
            <Button text={"Merek"} icon={<LiaTagSolid className="text-lg" />} url={"/permohonan/merek"} location={location} />
            <Button text={"Desain Industri"} icon={<RxCube className="text-lg" />} url={"/permohonan/desain-industri"} location={location} />
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <h1 className="font-bold text-GREY02 mb-2">KATEGORI</h1>
            <Button text={"Kategori KI"} icon={<MdOutlineCategory className="text-lg" />} url={"/kategori/kekayaan-intelektual"} location={location} />
            <Button text={"Ketegori H.Cipta"} icon={<HiOutlineMusicNote className="text-lg" />} url={"/kategori/hak-cipta"} location={location} />
            <Button text={"Kategori Paten"} icon={<LuAtom className="text-lg" />} url={"/kategori/paten"} location={location} />
            <Button text={"Kategori Merek"} icon={<LiaTagSolid className="text-lg" />} url={"/kategori/merek"} location={location} />
            <Button text={"Kategori D.Industri"} icon={<RxCube className="text-lg" />} url={"/kategori/desain-industri"} location={location} />
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <h1 className="font-bold text-GREY02 mb-2">MANAJEMEN</h1>
            <Button text={"FAQ"} icon={<MdOutlineQuestionAnswer className="text-lg" />} url={"/manajemen/kategori/faq"} location={location} />
            <Button text={"Unduhan"} icon={<TbFileDownload className="text-lg" />} url={"/manajemen/kategori/unduhan"} location={location} />
            <Button text={"Pendanaan"} icon={<LuFileSliders className="text-lg" />} url={"/manajemen/tahun/pendanaan"} location={location} />
            <Button text={"S&K Pendanaan"} icon={<TbContract className="text-lg" />} url={"/manajemen/syarat-ketentuan-pendanaan"} location={location} />
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <h1 className="font-bold text-GREY02 mb-2">INFORMASI</h1>
            <Button text={"Laporan & Analisis"} icon={<TbBrandGoogleAnalytics className="text-lg" />} url={"/informasi/laporan-analisis"} location={location} />
            <Button text={"Pusat Bantuan"} icon={<MdOutlineMarkChatUnread className="text-lg" />} url={"/informasi/pusat-bantuan"} location={location} />
            {token && user?.role === "superAdmin" && <Button text={"Log Aktivitas"} icon={<RxActivityLog className="text-lg" />} url={"/informasi/log-aktivitas"} location={location} />}
          </div>

          {token && user?.role === "superAdmin" && (
            <div className="mb-2 flex flex-col gap-1">
              <h1 className="font-bold text-GREY02 mb-2">PENGATURAN</h1>
              <Button text={"Akun"} icon={<LuSettings className="text-lg" />} url={"/pengaturan/akun"} location={location} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
