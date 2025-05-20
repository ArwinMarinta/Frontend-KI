const FormChagePassword = () => {
  return (
    <div className="flex flex-col p-8 border rounded-md shadow-md h-full">
      <h1 className="text-3xl font-bold mb-10">Ubah Kata Sandi</h1>
      <form>
        <div className="mt-10 flex flex-col gap-4">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Password Lama
            </label>
            <input type="password" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Password Baru
            </label>
            <input type="password" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Ulangi Password Baru
            </label>
            <input type="password" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="py-2 px-4 bg-PRIMARY01 font-medium text-white rounded-md">Ubah</button>
        </div>
      </form>
    </div>
  );
};

export default FormChagePassword;
