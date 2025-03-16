import Navbar from "../../../components/navigations/navbar";
import CsImage from "../../../assets/images/Email.webp";
import { FileInput, Label } from "flowbite-react";

const contact = () => {
  return (
    <>
      <Navbar />
      <main className="flex justify-center w-full">
        <div className="container flex flex-col">
          <section id="section-1" className="flex py-32 flex-row w-full h-full justify-center items-center gap-6">
            <div className=" flex justify-end w-full">
              <img src={CsImage} alt="..." />
            </div>
            <div className="w-full flex flex-col items-center border h-full px-12 gap-4 py-10 rounded-md">
              <h1 className="text-[40px] font-bold">Butuh Bantuan Kami?</h1>
              <div className="flex flex-row w-full gap-6 mt-6 ">
                <div className="flex flex-col w-full">
                  <span className="font-semibold text-[20px]">Email *</span>
                  <input type="search" id="search-dropdown" className="block p-2.5 w-full mt-2  text-sm text-gray-900 bg-white rounded-md   border-gray-300 focus:ring-PRIMARY01 focus:border-PRIMARY01" placeholder="Search Mockups, Logos, Design Templates..." required />
                </div>
                <div className="flex flex-col w-full">
                  <span className="font-semibold text-[20px]">No Handphone *</span>
                  <input type="search" id="search-dropdown" className="block p-2.5 w-full mt-2  text-sm text-gray-900 bg-white rounded-md   border-gray-300 focus:ring-PRIMARY01 focus:border-PRIMARY01" placeholder="Search Mockups, Logos, Design Templates..." required />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <span className="font-semibold text-[20px]">Masalah *</span>
                <input type="search" id="search-dropdown" className="block p-2.5 w-full mt-2  text-sm text-gray-900 bg-white rounded-md   border-gray-300 focus:ring-PRIMARY01 focus:border-PRIMARY01" placeholder="Search Mockups, Logos, Design Templates..." required />
              </div>
              <div className="flex flex-col w-full">
                <span className="font-semibold text-[20px]">Pesan *</span>
                <textarea id="message" className="block p-2.5 w-full mt-2 text-sm text-gray-900 bg-white rounded-md border-gray-300 focus:ring-PRIMARY01 focus:border-PRIMARY01" placeholder="Tulis pesan Anda di sini..." required rows={4}></textarea>
              </div>
              <div className="w-full flex flex-col">
                <Label htmlFor="file-upload" value="Upload file" className="font-semibold text-[20px]" />
                <FileInput id="file-upload" className="mt-2 file:rounded-md file:border file:border-gray-300 file:bg-white file:px-4 file:py-2 file:text-gray-700 file:hover:bg-gray-100 focus:ring-2 focus:ring-PRIMARY01 focus:border-PRIMARY01" title="Pilih" />
              </div>
              <div className="w-full flex justify-end mt-10">
                <button className="px-6 py-2 bg-PRIMARY01 rounded-md text-white font-semibold">Kirim</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default contact;
