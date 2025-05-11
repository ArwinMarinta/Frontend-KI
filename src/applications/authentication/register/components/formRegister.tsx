type FormRegisterProps = {
  formRegister: {
    fullname: string;
    email: string;
    password: string;
    confPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormRegister = ({ formRegister, handleChange, handleRegister }: FormRegisterProps) => {
  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <input type="text" name="fullname" placeholder="Nama Lengkap" className="p-2 border border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" value={formRegister.fullname} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" className="p-2 border border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" value={formRegister.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" className="p-2 border border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" value={formRegister.password} onChange={handleChange} required />
      <input type="password" name="confPassword" placeholder="Konfirmasi Password" className="p-2 border border-BORDER01 text-base rounded-md focus:outline-none focus:ring-0 focus:ring-PRIMARY01" value={formRegister.confPassword} onChange={handleChange} required />

      <button type="submit" className="bg-blue-600 hover:bg-PRIMARY01 text-white p-2 rounded-md transition">
        Daftar
      </button>
    </form>
  );
};

export default FormRegister;
