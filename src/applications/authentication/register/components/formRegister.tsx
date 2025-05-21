import FieldPassword from "../../../../components/input/fieldPassword";
import { RegisterErrors } from "../../../../hooks/useRegister";

type FormRegisterProps = {
  formRegister: {
    fullname: string;
    email: string;
    password: string;
    confPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  errors?: RegisterErrors;
  loading?: boolean;
};

const FormRegister = ({ formRegister, handleChange, handleRegister, errors, loading }: FormRegisterProps) => {
  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <input
          type="text"
          name="fullname"
          placeholder="Nama Lengkap"
          className={`bg-gray-50 border ${errors?.fullname ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2 pr-10`}
          value={formRegister.fullname}
          onChange={handleChange}
        />
        {errors?.email && <p className="text-sm text-RED01 mt-1">{errors?.fullname}</p>}
      </div>
      <div className="flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`bg-gray-50 border ${errors?.email ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2 pr-10`}
          value={formRegister.email}
          onChange={handleChange}
        />
        {errors?.email && <p className="text-sm text-RED01 mt-1">{errors?.email}</p>}
      </div>
      <FieldPassword value={formRegister.password} name="password" type="password" placeholder="Password" onChange={handleChange} error={errors?.password} />
      <FieldPassword value={formRegister.confPassword} name="confPassword" type="password" placeholder="Konfirmasi Password" onChange={handleChange} error={errors?.confPassword} />

      <button type="submit" disabled={loading} className={`bg-PRIMARY01 text-white p-2 font-semibold rounded-md transition ${loading ? " cursor-not-allowed" : "bg-PRIMARY01"}`}>
        {loading ? "Loading..." : "Daftar"}
      </button>
    </form>
  );
};

export default FormRegister;
