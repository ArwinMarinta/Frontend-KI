import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

const FormPersonalData = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-6 p-6 border border-PRIMARY01 rounded-md">
        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Nama Ketua Pencipta <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Email <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Instansi <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Pekerjaan <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Fakultas <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Prodi <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Negara Kebangsaan <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Negara Tempat Tinggal <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Provinsi <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Kota/Kabupaten <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Kecamatan <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Lelurahan <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Facebook <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Whatsapp <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>

        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Instagram <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Twitter <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
            Kode pos <span className="text-RED01">*</span>
          </label>
          <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
        </div>

        <div>
          <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
            Alamat <span className="text-RED01">*</span>
          </label>
          <textarea id="message" rows={4} className="block p-2 w-full text-lg  bg-gray-50 rounded-md border border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01 " placeholder="Tuliskan Alamat Anda"></textarea>
        </div>
        <div>
          <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
            KTP Pencipta <span className="text-RED01">*</span>
          </label>
          <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file" ></input>
          <span className="">
            Foto Harus terlihat dengan jelas. Batas maksimal file <span className="text-RED01">2MB</span>
          </span>
        </div>
      </div>
      <div className="mt-10">
        <button className="flex flex-row items-center gap-2 text-PRIMARY01 ">
          <FaCirclePlus className="text-xl" />
          <span className="font-semibold">Tambah Kontributor</span>
        </button>
      </div>
    </>
  );
};

export default FormPersonalData;
