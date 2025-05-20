import SideNavigation from "../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../components/adminNavigation/headerNavigation";

import Field from "../../../components/input/fieldInput";
import useUserDetail from "./hooks/useUserDetail";
import { formatIndonesianDateTime } from "../../../utils/formatDate";

const DetailAccount = () => {
  const { userDetails } = useUserDetail();
  return (
    <>
      <main className="flex flex-row w-full h-full bg-GREY01">
        <div className="min-h-full w-[16%] bg-white">
          <SideNavigation />
        </div>
        <div className="w-[84%]  border ">
          <HeaderNavigation />
          <div className="container py-16 w-full">
            <div className="bg-white p-6 rounded-md w-full">
              <div className="flex flex-row justify-between mb-20">
                <span className="text-3xl font-semibold">Detail Pengguna</span>
              </div>
              <div className="flex flex-col gap-4">
                <Field label="Nama Lengkap" value={userDetails?.fullname || ""} name="fullname" type="email" placeholder="" readOnly />
                <Field label="Email" value={userDetails?.email || ""} name="email" type="text" placeholder="" readOnly />
                <Field label="Nomor Hanphone" value={userDetails?.phoneNumber || "-"} name="phoneNumber" type="text" placeholder="" readOnly />
                <Field label="Instansi" value={userDetails?.institution || "-"} name="institution" type="text" placeholder="" readOnly />
                <Field label="Fakultas" value={userDetails?.faculty || "-"} name="faculty" type="text" placeholder="" readOnly />
                <Field label="Prodi" value={userDetails?.studyProgram || "-"} name="studyProgram" type="text" placeholder="" readOnly />
                <Field label="Role" value={userDetails?.role || "-"} name="role" type="text" placeholder="" readOnly />
                <Field label="Verifikasi" value={userDetails?.isVerified ? "Sudah" : "Belum"} name="isVerify" type="text" placeholder="" readOnly />
                <Field label="Waktu Pendaftaran" value={formatIndonesianDateTime(userDetails?.createdAt ?? "")} name="register" type="text" placeholder="" readOnly />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailAccount;
