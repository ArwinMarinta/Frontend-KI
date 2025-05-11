const FormComplateIndustrialDesign = () => {
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
        </div>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-4 text-lg font-medium ">
          Dokumen Paten Keseluruhan <span className="text-RED01">*</span>
        </label>
        <div className="flex flex-row justify-start gap-16">
          <div className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md  focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1 " />
            <label htmlFor="default-checkbox" className="ms-2 text-sm  text-gray-900 ">
              Bentuk
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md  focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1 " />
            <label htmlFor="default-checkbox" className="ms-2 text-sm  text-gray-900 ">
              Konfigurasi
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md  focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1 " />
            <label htmlFor="default-checkbox" className="ms-2 text-sm  text-gray-900 ">
              Komposisi Garis
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md  focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1 " />
            <label htmlFor="default-checkbox" className="ms-2 text-sm  text-gray-900 ">
              Komposisi Warna
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Tampak Perspektif<span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Tampak Depan <span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Tampak Belakang <span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Tampak Samping Kanan<span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Tampak Samping Kiri<span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Tampak Atas<span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Tampak Bawah<span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Gambar Lainnya<span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Surat Pengalihan Desain Industri<span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>

      <div>
        <label htmlFor="first_name" className="block mb-2 text-lg font-medium ">
          Surat Kepemilikan Desain Industri<span className="text-RED01">*</span>
        </label>
        <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file"></input>
        <span className="">Gabungkan berkas Deskripsi, Abstrak, Klaim, Gambar menjadi dalam satu file dengan format doc/docx/pdf</span>
      </div>
    </div>
  );
};

export default FormComplateIndustrialDesign;
