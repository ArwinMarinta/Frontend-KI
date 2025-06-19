import { Link } from "react-router-dom";

import FieldPassword from "../../../../components/input/fieldPassword";

type FormLoginProps = {
  formLogin: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  errors: {
    email?: string;
    password?: string;
  };
};

const FormLogin = ({ formLogin, handleChange, handleLogin, loading, errors }: FormLoginProps) => {
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 h-full">
      <div className="flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={`bg-gray-50 border ${errors?.email ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2 pr-10`}
          value={formLogin.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-sm text-RED01 mt-1">{errors?.email}</p>}
      </div>
      <FieldPassword value={formLogin.password} name="password" type="password" placeholder="Password" onChange={handleChange} error={errors?.password} />

      <div className="flex flex-row w-full justify-end">
        {/* <div className="flex items-center mb-4">
          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md  focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1 " />
          <label htmlFor="default-checkbox" className="ms-2 text-sm  text-gray-900 ">
            Ingat Saya
          </label>
        </div> */}
        <Link to="/lupa-kata-sandi" className="text-PRIMARY01 hover:underline ">
          Lupa kata Sandi?
        </Link>
      </div>
      <button type="submit" disabled={loading} className={`bg-PRIMARY01 text-white p-2 rounded-md transition font-semibold ${loading && "cursor-not-allowed"}`}>
        {loading ? "Loading..." : "Masuk"}
      </button>
    </form>
  );
};

export default FormLogin;
