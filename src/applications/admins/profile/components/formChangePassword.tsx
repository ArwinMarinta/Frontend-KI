import FieldPassword from "../../../../components/input/fieldPassword";
import ModalLoading from "../../../../components/modal/modalLoading";
import useChangePassword from "../../../../hooks/useChangePassword";

const FormChangePassword = () => {
  const { form, errors, handleChange, handleSubmit, loading } = useChangePassword();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-8">
          <FieldPassword label="Password Lama" value={form.password} name="password" type="password" placeholder="********" onChange={handleChange} error={errors.password ?? null} need />
          <FieldPassword label="Password" value={form.newPassword} name="newPassword" type="password" placeholder="********" onChange={handleChange} error={errors.newPassword} need />
          <FieldPassword label="Konfirmasi Password" value={form.confirmPassword} name="confirmPassword" type="password" placeholder="********" onChange={handleChange} error={errors.confirmPassword} need />
        </div>
        <div className="flex flex-row gap-4 justify-end mt-10">
          <button type="submit" className="py-1 px-4 border bg-PRIMARY01 rounded-md text-white font-medium">
            Ubah
          </button>
        </div>
      </form>
      <ModalLoading show={loading} />
    </>
  );
};

export default FormChangePassword;
