import Navbar from "../../../../components/navigations/navbar";
import FileImage from "../../../../assets/images/files.webp";
import FileUnduhan from "../../../../assets/images/file_unduhan.png";
import useDocument from "../hooks/useDocument";

const Files = () => {
  const { category, doc, handleCategoryChange } = useDocument();
  return (
    <>
      <Navbar />
      <main className="w-full flex justify-center h-full">
        <div className="container w-full h-full">
          <section id="section-1" className="flex py-32 flex-row w-full h-full justify-center items-center">
            <div className="flex justify-start w-full flex-col">
              <h1 className="font-bold text-[40px]">
                Dapatkan Dokumen yang
                <br /> Anda Perlukan
              </h1>
              <p className="mt-8 text-lg">Kami menyediakan berbagai dokumen yang dapat Anda unduh dengan mudah. Baik itu laporan, panduan, atau dokumen lainnya, semuanya tersedia untuk membantu Anda mendapatkan informasi yang diperlukan.</p>
            </div>
            <div className="w-full flex justify-end">
              <img src={FileImage} alt="..." />
            </div>
          </section>
          <section id="section-2" className="flex flex-row w-full justify-center h-full gap-10">
            <div className="flex flex-col w-[25%] justify-start border p-4 rounded-md gap-2">
              {category?.map((item) => (
                <button key={item.id} onClick={() => handleCategoryChange(item.type)} className={`text-start px-6 py-2 ${doc?.some((faqItem) => faqItem.type === item.type) ? "bg-PRIMARY01 text-white" : "bg-white border border-PRIMARY01 text-PRIMARY01"} rounded-md font-medium`}>
                  <span>{item.type}</span>
                </button>
              ))}
            </div>
            <div className="w-[70%] border p-4 rounded-md flex flex-col">
              <form className="w-full mx-auto">
                <div className="flex">
                  <div className="relative w-full">
                    <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-md   border-gray-300 focus:ring-PRIMARY01 focus:border-PRIMARY01" placeholder="Search Mockups, Logos, Design Templates..." required />
                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-PRIMARY01 rounded-e-lg border border-PRIMARY01 hover:bg-PRIMARY01 focus:ring-4 focus:outline-none focus:ring-blue-300  ">
                      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                      <span className="sr-only">Search</span>
                    </button>
                  </div>
                </div>
              </form>
              <div className="grid grid-cols-3 gap-16 mt-10">
                <div className="flex flex-col">
                  <img src={FileUnduhan} />
                  <span className="mt-4">Panduan - Hak Kekayaan Intelektual 2024 V2.pdf</span>
                </div>
                <div className="flex flex-col">
                  <img src={FileUnduhan} />
                  <span className="mt-4">Panduan - Hak Kekayaan Intelektual 2024 V2.pdf</span>
                </div>
                <div className="flex flex-col">
                  <img src={FileUnduhan} />
                  <span className="mt-4">Panduan - Hak Kekayaan Intelektual 2024 V2.pdf</span>
                </div>
                <div className="flex flex-col">
                  <img src={FileUnduhan} />
                  <span className="mt-4">Panduan - Hak Kekayaan Intelektual 2024 V2.pdf</span>
                </div>
                <div className="flex flex-col">
                  <img src={FileUnduhan} />
                  <span className="mt-4">Panduan - Hak Kekayaan Intelektual 2024 V2.pdf</span>
                </div>
                <div className="flex flex-col">
                  <img src={FileUnduhan} />
                  <span className="mt-4">Panduan - Hak Kekayaan Intelektual 2024 V2.pdf</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Files;
