import Navbar from "../../../../components/navigations/navbar";
import FileImage from "../../../../assets/images/files.webp";
import useDocument from "../hooks/useDocument";
import { API_FILE } from "../../../../config/config";
import { AiOutlineDownload } from "react-icons/ai";
import { useState } from "react";

const Files = () => {
  const { category, doc, handleCategoryChange, setSearch, selectedType } = useDocument();
  const [localSearch, setLocalSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(localSearch);
  };
  const downloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlBlob;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <>
      <Navbar />
      <main className="w-full flex justify-center h-full">
        <div className="container w-full h-full pt-32 pb-20">
          <section id="section-1" className="flex   pb-10 lg:flex-row gap-2 lg:gap-0 flex-col-reverse w-full h-full justify-center items-center">
            <div className="flex justify-start w-full flex-col">
              <h1 className="font-bold text-[40px]">
                Dapatkan Dokumen yang
                <br /> Anda Perlukan
              </h1>
              <p className="mt-8 text-lg">Kami menyediakan berbagai dokumen yang dapat Anda unduh dengan mudah. Baik itu laporan, panduan, atau dokumen lainnya, semuanya tersedia untuk membantu Anda mendapatkan informasi yang diperlukan.</p>
            </div>
            <div className="w-full flex justify-end">
              <img src={FileImage} alt="..." loading="lazy" />
            </div>
          </section>
          <section id="section-2" className="flex lg:flex-row flex-col w-full justify-center h-full gap-10">
            <div className="flex shadow-md flex-col lg:w-[25%] w-full justify-start border drop-shadow-md p-4 rounded-md gap-2">
              {category?.map((item) => (
                <button key={item?.id} onClick={() => handleCategoryChange(item?.type)} className={`text-start px-6 py-2 ${selectedType === item?.type ? "bg-PRIMARY01 text-white" : "bg-white border border-PRIMARY01 text-PRIMARY01"} rounded-md font-medium`}>
                  <span>{item?.type}</span>
                </button>
              ))}
            </div>
            <div className="lg:w-[70%] shadow-md w-full border p-4 rounded-md flex flex-col">
              <form className="w-full mx-auto" onSubmit={handleSubmit}>
                <div className="flex">
                  <div className="relative w-full">
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-md border-gray-300 focus:ring-PRIMARY01 focus:border-PRIMARY01"
                      placeholder="Cari dokumen..."
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target?.value)}
                    />
                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-PRIMARY01 rounded-e-lg border border-PRIMARY01 hover:bg-PRIMARY01 focus:ring-4 focus:outline-none focus:ring-blue-300">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
              <div className="grid lg:grid-cols-3 grid-rows-1 gap-16 mt-10">
                {doc?.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <div className="relative group w-full">
                      <img src={`${API_FILE}/image/${item?.cover}`} alt="cover" className="border border-BORDER01 rounded-md w-full h-[350px] object-cover" />

                      {/* Overlay hitam transparan */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>

                      {/* Tombol Unduh */}
                      <button
                        onClick={() => downloadFile(`${API_FILE}/documents/${item?.document}`, item?.document ?? "")}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black px-3 py-1 rounded shadow font-medium text-sm"
                      >
                        <AiOutlineDownload className="text-PRIMARY02 text-[80px]" />
                      </button>
                    </div>
                    <div className="mt-4">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Files;
