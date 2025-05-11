import Field from "../../../../components/input/fieldInput";
import FieldPassword from "../../../../components/input/fieldPassword";
import useChangePassword from "../../../../hooks/useChangePassword";

const FormChangePassword = () => {
  const { form, errors, handleChange, handleSubmit } = useChangePassword();
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mb-8">
        <Field label="Kata Sandi Lama" value={form.password} name="password" type="text" placeholder="" error={errors.password} need onChange={handleChange} />
        <FieldPassword label="Password" value={form.newPassword} name="newPassword" type="password" placeholder="********" onChange={handleChange} error={errors.newPassword} need />
        <FieldPassword label="Konfirmasi Password" value={form.confirmPassword} name="confirmPassword" type="password" placeholder="********" onChange={handleChange} error={errors.confirmPassword} need />
      </div>
      <div className="flex flex-row gap-4 justify-end">
        <button type="submit" className="py-1 px-4 border border-PRIMARY01 rounded-md text-PRIMARY01 font-medium">
          Ubah
        </button>
      </div>
    </form>
  );
};

export default FormChangePassword;
