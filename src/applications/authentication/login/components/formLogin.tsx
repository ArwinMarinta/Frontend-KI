import { Link } from "react-router-dom";

type FormLoginProps = {
  formLogin: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormLogin = ({ formLogin, handleChange, handleLogin }: FormLoginProps) => {
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input type="email" name="email" placeholder="Email" className="p-2 border border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" required value={formLogin.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="p-2 border border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" required value={formLogin.password} onChange={handleChange} />

      <div className="flex flex-row w-full justify-between">
        <div className="flex items-center mb-4">
          <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md  focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1 " />
          <label htmlFor="default-checkbox" className="ms-2 text-sm  text-gray-900 ">
            Ingat Saya
          </label>
        </div>
        <Link to="/lupa-kata-sandi" className="text-PRIMARY01 hover:underline ">
          Lupa kata Sandi?
        </Link>
      </div>
      <button type="submit" className="bg-blue-600 hover:bg-PRIMARY01 text-white p-2 rounded-md transition">
        Masuk
      </button>
    </form>
  );
};

export default FormLogin;
