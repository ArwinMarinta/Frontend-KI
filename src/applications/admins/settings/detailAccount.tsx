import SideNavigation from "../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../components/adminNavigation/headerNavigation";

import Field from "../../../components/input/fieldInput";
import useUserDetail from "./hooks/useUserDetail";
import { formatIndonesianDateTime } from "../../../utils/formatDate";

const DetailAccount = () => {
  const { userDetails } = useUserDetail();
  return (
    <>
      <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideNavigation />
        </div>
        <div className="lg:w-[84%] w-full  border">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8">
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
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
