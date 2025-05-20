import SideNavigation from "../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../components/adminNavigation/headerNavigation";
import Field from "../../../components/input/fieldInput";
import useUserCreate from "./hooks/useUserCreate";
import FieldDropdown from "../../../components/input/FieldDropDown";
import FieldPassword from "../../../components/input/fieldPassword";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getUserById } from "../../../service/actions/userAction";
import ModalLoading from "../../../components/modal/modalLoading";
import CreateButton from "../../../components/button/createButton";

const UpdateAccount = () => {
  const location = useLocation();
  const { userId, type } = location.state || {};
  const { formUser, handleChange, errors, token, dispatch, loading, handleSubmit } = useUserCreate();

  useEffect(() => {
    if (token && userId) {
      dispatch(getUserById(userId));
    }
  }, [token, userId, dispatch, type]);
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
              <span className="text-3xl font-semibold">Ubah Pengguna</span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Field label="Nama Lengkap" value={formUser.fullname || ""} name="fullname" type="text" placeholder="Sentra Kekayaan Intelektual" onChange={handleChange} error={errors.fullname} need />
              <Field label="Email" value={formUser.email || ""} name="email" type="email" placeholder="sentra@example.com" onChange={handleChange} error={errors.email} need />
              <FieldDropdown
                label="Role"
                name="role"
                type="select"
                value={formUser.role}
                onChange={handleChange}
                options={[
                  { label: "Super Admin", value: "superAdmin" },
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                ]}
                error={errors.role}
                need
              />
              <Field label="Nomor Telphone" value={formUser.phoneNumber || ""} name="phoneNumber" type="text" placeholder="" onChange={handleChange} />
              <Field label="Instansi" value={formUser.institution || ""} name="institution" type="text" placeholder="" onChange={handleChange} />
              <Field label="Fakultas" value={formUser.faculty || ""} name="faculty" type="text" placeholder="" onChange={handleChange} />
              <Field label="Prodi" value={formUser.studyProgram || ""} name="studyProgram" type="text" placeholder="" onChange={handleChange} />
              <FieldPassword label="Password" value={formUser.password || ""} name="password" type="password" placeholder="********" onChange={handleChange} error={errors.password} need />
              <FieldPassword label="Konfirmasi Password" value={formUser.confirmPassword || ""} name="confirmPassword" type="password" placeholder="********" onChange={handleChange} error={errors.confirmPassword} need />

              <div className="w-full flex justify-end mt-12">
                <CreateButton type="submit" label="Tambah" />
              </div>
            </form>
          </div>
          <ModalLoading show={loading} />
        </div>
      </div>
    </main>
  );
};

export default UpdateAccount;
