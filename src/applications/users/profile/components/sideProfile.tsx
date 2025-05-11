import ProfileImage from "../../../../assets/images/profile.webp";
import Button from "./button";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiHistoryLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";

const SideProfile = () => {
  return (
    <div className="flex flex-col border p-8 rounded-md shadow-md w-full min-h-full ">
      <div className="flex w-full flex-col items-center p-4 gap-4">
        <img src={ProfileImage} alt="image" className="h-28 rounded-full" />
        <span className="font-semibold text-black text-xl">Arwin Marinta</span>
      </div>
      <div className="flex flex-col gap-2 mt-8">
        <Button text={"Profile"} icon={<IoPersonCircleOutline className="text-2xl" />} url={"/profile"} />
        <Button text={"Histori Pengajuan"} icon={<RiHistoryLine className="text-xl" />} url={"/histori-pengajuan"} />
        <Button text={"Penugasan"} icon={<BiTask className="text-xl" />} url={"/penugasan"} />
        <Button text={"Ubah Password"} icon={<RiLockPasswordLine className="text-xl" />} url={"/ubah-password"} />
      </div>
    </div>
  );
};

export default SideProfile;
