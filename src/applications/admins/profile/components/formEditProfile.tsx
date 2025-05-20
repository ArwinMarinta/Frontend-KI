import { FiArrowLeftCircle } from "react-icons/fi";
import Field from "../../../../components/input/fieldInput";
import { UpdateProfileErrors, User2, User3 } from "../../../../types/userType";
interface FormDetailProfileProps {
  user: User2 | null;
  form: User3;
  handleStatusChange: (status: string, type?: "current" | "profile") => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: UpdateProfileErrors;
  isFormChanged: boolean;
}

const FormEditProfile = ({ user, handleStatusChange, form, handleChange, handleSubmit, errors, isFormChanged }: FormDetailProfileProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mb-8">
        <Field label="Nama Lengkap" value={form.fullname} name="fullname" type="text" placeholder="" onChange={handleChange} error={errors.fullname} />
        <Field label="Email" value={user?.email || ""} name="fullname" type="email" placeholder="" readOnly />
        <Field label="Nomor Handphone" value={form.phoneNumber} name="phoneNumber" type="text" placeholder="" onChange={handleChange} error={errors.phoneNumber} />
        <Field label="Fakultas" value={form.faculty} name="faculty" type="text" placeholder="" onChange={handleChange} error={errors.faculty} />
        <Field label="Prodi" value={form.studyProgram} name="studyProgram" type="text" placeholder="" onChange={handleChange} error={errors.studyProgram} />
      </div>
      <div className="flex flex-row gap-4 justify-end mt-10">
        <button onClick={() => handleStatusChange("Detail", "profile")} className="bg-GREY01 px-4 py-2 flex flex-row items-center gap-2 text-GREY02 font-medium rounded-md">
          <FiArrowLeftCircle className="text-xl" />
          Kembali
        </button>
        <button
          disabled={!isFormChanged}
          type="submit"
          className={`py-1 px-2 border bg-PRIMARY01 rounded-md text-white font-medium 
    ${!isFormChanged ? " cursor-not-allowed" : ""}`}
        >
          Ubah Profile
        </button>
      </div>
    </form>
  );
};

export default FormEditProfile;
