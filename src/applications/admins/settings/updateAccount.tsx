import SideNavigation from "../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../components/adminNavigation/headerNavigation";
import Field from "../../../components/input/fieldInput";
import useUserCreate from "./hooks/useUserCreate";

const UpdateAccount = () => {
  const { formUser, handleChange } = useUserCreate();

  return (
    <main className="flex flex-row w-full h-full bg-GREY01">
      <div className="min-h-full w-[16%] bg-white">
        <SideNavigation />
      </div>
      <div className="w-[84%]  border ">
        <HeaderNavigation />
        <div className="container  mt-16 w-full">
          <div className="bg-white p-6 rounded-md w-full">
            <div className="flex flex-row justify-between mb-20">
              <span className="text-3xl font-semibold">Tambah Pengguna</span>
            </div>
            <div className="flex flex-col gap-6">
              <Field label="Nama Lengkap" value={formUser.fullname || ""} name="fullname" type="email" placeholder="Sentra Kekayaan Intelektual" onChange={handleChange} required />
              <Field label="Email" value={formUser.email || ""} name="email" type="email" placeholder="sentra@example.com" onChange={handleChange} required />
              <Field label="Role" value={formUser.role || ""} name="role" type="text" placeholder="sentra@example.com" onChange={handleChange} required />
              <Field label="Password" value={formUser.password || ""} name="password" type="password" placeholder="********" onChange={handleChange} required />
              <Field label="Konfirmasi Password" value={formUser.confirmPassword || ""} name="confirmPassword" type="password" placeholder="********" onChange={handleChange} required />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateAccount;
