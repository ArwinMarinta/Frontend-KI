import Navbar from "../../../../components/navigations/navbar";
import FaqImage from "../../../../assets/images/faq.webp";
import { Accordion } from "flowbite-react";
import useFaq from "../hooks/useFaq";
import { useState } from "react";

const Faq = () => {
  const { faq, category, handleCategoryChange, selectedType, setSearch } = useFaq();
  const [localSearch, setLocalSearch] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(localSearch);
  };
  return (
    <>
      <Navbar />
      <main className="w-full flex justify-center">
        <div className="container w-full h-full pt-32 pb-20 ">
          <section id="section-1" className="flex flex-col-reverse pb-10 gap-2 lg:gap-0 lg:flex-row  w-full h-full justify-center items-center">
            <div className="flex flex-col justify-start w-full lg:w-1/2">
              <h1 className="font-bold text-[40px]">Ada yang bisa kami bantu?</h1>
              <p className="mt-8 text-lg">
                Silakan ketikkan pertanyaan Anda pada kolom pencarian di atas, atau telusuri FAQ kami yang telah dirancang untuk menjawab pertanyaan yang sering diajukan. Jika pertanyaan Anda tidak terjawab dalam FAQ, Kami juga menyediakan layanan bantuan melalui Hubungi Kami, yang siap membantu
                Anda.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-end">
              <img src={FaqImage} alt="..." loading="lazy" />
            </div>
          </section>
          <section id="section-2" className="flex lg:flex-row flex-col gap-10">
            <div className="flex flex-col  lg:w-[25%] w-full justify-start border p-4 shadow-md rounded-md gap-2">
              {category?.map((item) => (
                <button key={item?.id} onClick={() => handleCategoryChange(item?.type)} className={`text-start px-6 py-2 ${selectedType === item?.type ? "bg-PRIMARY01 text-white" : "bg-white border border-PRIMARY01 text-PRIMARY01"} rounded-md font-medium`}>
                  <span>{item?.type}</span>
                </button>
              ))}
            </div>
            <div className="lg:w-[75%] border p-4 rounded-md flex flex-col shadow-md mt-2 lg:mt-0">
              <form className="w-full mx-auto" onSubmit={handleSubmit}>
                <div className="flex">
                  <div className="relative w-full">
                    <input
                      type="search"
                      id="search-dropdown"
                      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-md border-gray-300 focus:ring-PRIMARY01 focus:border-PRIMARY01"
                      placeholder="Cari pertanyaan"
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
              <div className=" w-full gap-16 mt-10">
                {faq && faq?.length > 0 ? (
                  <Accordion>
                    {faq?.map((item, index) => (
                      <Accordion.Panel key={index}>
                        <Accordion.Title>{item?.question}</Accordion.Title>
                        <Accordion.Content>{item?.answer}</Accordion.Content>
                      </Accordion.Panel>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-gray-500">FAQ tidak tersedia.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Faq;
