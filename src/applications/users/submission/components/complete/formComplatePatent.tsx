import { Datepicker } from "flowbite-react";
import React from "react";

const FormComplatePatent = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Judul Invensi <span className="text-RED01">*</span>
        </label>
        <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
      </div>

      <div>
        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Jenis Paten <span className="text-RED01">*</span>
            </label>
            <select id="countries" required className="bg-gray-50 border mt-3 border-BORDER01 text-gray-900 text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 ">
              <option value="" disabled hidden>
                Pilih Jenis Pengajuan
              </option>
              <option value="Hak Cipta">Hak Cipta</option>
              <option value="Paten">Paten</option>
              <option value="Merek">Merek</option>
              <option value="Desain Industri">Desain Industri</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Sub-Jenis Paten <span className="text-RED01">*</span>
            </label>
            <select id="countries" required className="bg-gray-50 border mt-3 border-BORDER01 text-gray-900 text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 ">
              <option value="" disabled hidden>
                Pilih Jenis Pengajuan
              </option>
              <option value="Hak Cipta">Hak Cipta</option>
              <option value="Paten">Paten</option>
              <option value="Merek">Merek</option>
              <option value="Desain Industri">Desain Industri</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-row w-full gap-6">
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Negara Pertama Kali Diumumkan <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
          <div className="w-full">
            <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
              Kota Pertama Kali Diumumkan <span className="text-RED01">*</span>
            </label>
            <input type="text" id="first_name" className="bg-gray-50 border border-BORDER01  text-base rounded-md focus:ring-PRIMARY01 focus:border-PRIMARY01 block w-full p-2 " placeholder="John" required />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full">
          <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
            Waktu Pertama Kali Diumumkan <span className="text-RED01">*</span>
          </label>
          <Datepicker
            language="id"
            theme={{
              root: {
                input: {
                  field: {
                    input: {
                      base: "!bg-gray-50 !border !border-BORDER01 focus:!ring-PRIMARY01 focus:!border-PRIMARY01 !text-base !rounded-md block !w-full p-2 ",
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Dokumen Paten Keseluruhan <span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Deskripsi<span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Abstrak <span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Gambar Invensi <span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Surat Pernyataan Kepemilikan Invensi <span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Surat Pengalihan Hak Atas Invensi <span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>
    </div>
  );
};

export default FormComplatePatent;
