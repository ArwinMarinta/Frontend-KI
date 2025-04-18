import Navbar from "../../../components/navigations/navbar";
import { IoDocumentTextOutline } from "react-icons/io5";

const Notification = () => {
  return (
    <>
      <Navbar />
      <main className="w-full justify-center flex">
        <section className="container flex flex-col py-32 ">
          <div className="flex flex-row justify-between ">
            <h1 className="text-[32px] font-medium">Notifikasi</h1>
            <button className="text-PRIMARY01 font-semibold text-lg">Sudah dibaca</button>
          </div>
          <div className="flex flex-col mt-8 border-b border-BORDER01">
            <div className="flex flex-row justify-between bg-PRIMARY04 px-4  items-center  border-t border-r border-l border-BORDER01">
              <div className="flex flex-row gap-4 py-4 items-center flex-grow">
                <div>
                  <IoDocumentTextOutline className="text-3xl" />
                </div>
                <div className="flex-grow">
                  <h1 className="text-lg font-semibold">Pengajuan Hak Cipta</h1>
                  <span>Penganjuan anda berhasil di kirim</span>
                </div>
              </div>
              <span className="text-PRIMARY01 font-medium text-center whitespace-nowrap  ">15 Nov 2024, 16:23</span>
            </div>
            <div className="flex flex-row justify-between bg-PRIMARY04 px-4  items-center  border-t border-r border-l border-BORDER01">
              <div className="flex flex-row gap-4 py-4 items-center flex-grow">
                <div>
                  <IoDocumentTextOutline className="text-3xl" />
                </div>
                <div className="flex-grow">
                  <h1 className="text-lg font-semibold">Pengajuan Hak Cipta</h1>
                  <span>Penganjuan anda berhasil di kirim</span>
                </div>
              </div>
              <span className="text-PRIMARY01 font-medium text-center whitespace-nowrap  ">15 Nov 2024, 16:23</span>
            </div>
            <div className="flex flex-row justify-between  px-4  items-center border-t border-r border-l border-BORDER01">
              <div className="flex flex-row gap-4 py-4 items-center flex-grow">
                <div>
                  <IoDocumentTextOutline className="text-3xl" />
                </div>
                <div className="flex-grow">
                  <h1 className="text-lg font-semibold">Pengajuan Hak Cipta</h1>
                  <span>Penganjuan anda berhasil di kirim</span>
                </div>
              </div>
              <span className="text-PRIMARY01 font-medium text-center whitespace-nowrap  ">15 Nov 2024, 16:23</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Notification;
