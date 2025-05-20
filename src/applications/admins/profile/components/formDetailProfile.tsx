import Field from "../../../../components/input/fieldInput";
import { User2 } from "../../../../types/userType";

interface FormDetailProfileProps {
  user: User2 | null;
  handleStatusChange: (status: string, type?: "current" | "profile") => void;
}

const FormDetailProfile = ({ user, handleStatusChange }: FormDetailProfileProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 mb-8">
        <Field label="Nama Lengkap" value={user?.fullname || ""} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Email" value={user?.email || ""} name="fullname" type="email" placeholder="" readOnly />
        <Field label="Nomor Handphone" value={user?.phoneNumber || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Fakultas" value={user?.faculty || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Prodi" value={user?.studyProgram || "-"} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <div className="w-full flex  justify-end mt-10">
        <button className="py-1 px-4 border  rounded-md text-white bg-PRIMARY01 font-medium" onClick={() => handleStatusChange("Edit", "profile")}>
          Ubah
        </button>
      </div>
    </>
  );
};

export default FormDetailProfile;
