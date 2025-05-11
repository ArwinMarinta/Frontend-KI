import Field from "../../../../components/input/fieldInput";
import { UpdateProfileErrors, User2, User3 } from "../../../../types/userType";
interface FormDetailProfileProps {
  user: User2 | null;
  form: User3;
  handleStatusChange: (status: string, type?: "current" | "profile") => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: UpdateProfileErrors;
}

const FormEditProfile = ({ user, handleStatusChange, form, handleChange, handleSubmit, errors }: FormDetailProfileProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mb-8">
        <Field label="Nama Lengkap" value={form.fullname} name="fullname" type="text" placeholder="" onChange={handleChange} error={errors.fullname} />
        <Field label="Email" value={user?.email || ""} name="fullname" type="email" placeholder="" readOnly />
        <Field label="Nomor Handphone" value={form.phoneNumber} name="phoneNumber" type="text" placeholder="" onChange={handleChange} error={errors.phoneNumber} />
        <Field label="Fakultas" value={form.faculty} name="faculty" type="text" placeholder="" onChange={handleChange} error={errors.faculty} />
        <Field label="Prodi" value={form.studyProgram} name="studyProgram" type="text" placeholder="" onChange={handleChange} error={errors.studyProgram} />
      </div>
      <div className="flex flex-row gap-4 justify-end">
        <button className="py-1 px-4 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium" onClick={() => handleStatusChange("Detail", "profile")}>
          Kembali
        </button>
        <button type="submit" className="py-1 px-2 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
};

export default FormEditProfile;
