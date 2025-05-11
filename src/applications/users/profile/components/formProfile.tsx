import ProfileImage from "../../../../assets/images/profile.webp";

const FormProfile = () => {
  return (
    <div className="flex flex-col p-8 border rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-14">Profile</h1>
      <form>
        <img src={ProfileImage} alt="image" className="h-20 rounded-full" />
        <div className="mt-4">
          <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 max-w-xs focus:outline-none" id="file_input" type="file"></input>
          <span className="">Format file JPG, PNG, JPEG</span>
        </div>
        <div className="mt-10 flex flex-col gap-3">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Nama Lengkap
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Email
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Nomor Telphone
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Fakultas
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Prodi
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Instansi
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-base font-semibold">
              Pekerjaan
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="py-2 px-4 bg-PRIMARY01 font-medium text-white rounded-md">Ubah</button>
        </div>
      </form>
    </div>
  );
};

export default FormProfile;
