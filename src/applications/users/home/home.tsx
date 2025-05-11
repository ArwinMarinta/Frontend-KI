import Navbar from "../../../components/navigations/navbar";
import Footer from "../../../components/navigations/footer";
// import BackgroundImage from "../../../assets/images/image 3.svg";
import BackgroundImage2 from "../../../assets/images/Background2.webp";
import PeopleIcon from "../../../assets/images/people_image.svg";
import { Section2, Section3 } from "./data/data";
import Button from "./components/button";
import { IoIosWarning } from "react-icons/io";
import useHome from "./hooks/useHome";
import { formatDateRange } from "../../../utils/formatDate";

const Home = () => {
  const { period } = useHome();
  return (
    <>
      <Navbar />
      <main>
        <section id="section-1" className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0 w-full h-full z-0">
            <img src={BackgroundImage2} alt="Background" className="w-full h-full object-cover" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#0067B3] opacity-85 z-10"></div>

          <div className="absolute inset-0 z-20 flex justify-center items-center h-screen pt-14 lg:px-20">
            <div className="container w-full h-full flex flex-row justify-between items-center">
              <div className="flex flex-col items-start justify-center text-white w-[50%]">
                <h1 className="text-3xl xl:text-5xl font-bold text-start">
                  Selamat Datang di Sentra <br /> Kekayaan Intelektual ITK
                </h1>
                <p className="text-lg xl:text-xl mt-8 text-justify w-[80%] ">Sentra Kekayaan Intelektual (KI) ITK hadir untuk melindungi ide dan inovasi Anda. Kami memberikan layanan pengelolaan KI yang mencakup Hak Cipta, Paten, Merek, dan Desain Industri.</p>
              </div>
            </div>
          </div>
          <div className="absolute w-[40%] z-20 lg:-bottom-0 -mb-4 translate-x-[800px] xl:translate-x-0 xl:right-36 xl:bottom-0">
            <img src={PeopleIcon} alt="People" className="self-end h-[400px] xl:w-[700px] xl:h-[700px] object-contain  " />
          </div>
        </section>
        <section id="section-2" className="w-full flex justify-center">
          <div className="w-full items-center container flex justify-center py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
              {Section2.map((data) => (
                <div key={data.id} className="flex flex-col rounded-md border w-full p-4 justify-center items-center gap-8">
                  <h1
                    className="border-b-4 border-PRIMARY02 max-w-fit text-[28px] text-PRIMARY01 font-semibold
                "
                  >
                    {data.title}
                  </h1>
                  <h1 className="text-[80px] font-bold text-PRIMARY01">{data.amount}</h1>
                  <span className="text-[20px] font-semibold">Terdaftar</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="section-4" className="w-full flex justify-center">
          <div className="w-full container flex flex-col gap-8 py-16">
            <h1 className="text-start text-[40px] font-bold text-PRIMARY01 border-b-4 border-PRIMARY02 max-w-fit">Informasi Pendanaan</h1>
            <p className="text-start text-lg font-normal w-[60%]">
              Pengajuan HKI pada tahun 2025 akan dilakukan dengan sistem gelombang (batch), di mana akan dilakukan 3 (tiga) batch dan 1 (satu) batch tambahan dengan status opsional (yang merujuk pada pendanaan yang tersedia), jadwal pendanaan akan diatur sebagai berikut
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
              {period.map((data) => (
                <div key={data.id} className="flex flex-col rounded-md border w-full  justify-center items-start ">
                  <h1
                    className="text-[20px] text-PRIMARY01 font-semibold border-b w-full px-4 py-2 bg-gray-50 rounded-t-md
                "
                  >
                    {data.group}
                  </h1>
                  <div className="flex flex-col w-full  mt-2">
                    <div className="px-4 py-2 text-justify">
                      Total Kouta Pengajuan{" "}
                      {data.quota
                        .filter((item) => item.title === "Hak Cipta" || item.title === "Patent" || item.title === "Merek" || item.title === "Desain Industri")
                        .map((item, index, arr) => (
                          <span key={item.id}>
                            <strong>{item.title}</strong> sebanyak {item.quota}
                            {index === arr.length - 2 ? " dan " : ""}
                            {index < arr.length - 2 ? ", " : ""}
                          </span>
                        ))}
                    </div>
                    <h3 className="mt-8 px-4 mb-5 text-PRIMARY01 font-bold">{formatDateRange(data.startDate, data.endDate)}</h3>
                    {data.quota.map((item) => (
                      <div key={item.id} className="border-t px-4 py-2">
                        Kouta {item.title} : {item.remainingQuota}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="py-4 px-4 bg-YELLOW01 rounded-md text-YELLOW02 font-semibold flex flex-row gap-2 items-center">
              <IoIosWarning />
              <span>Kuota pengajuan bisa berubah seiring dengan perubahan anggaran LPPM ITK</span>
            </div>
          </div>
        </section>

        <section id="section-3" className="w-full flex justify-center">
          <div className="w-full container flex flex-col gap-8 py-16">
            <h1 className="text-start text-[40px] font-bold text-PRIMARY01 border-b-4 border-PRIMARY02 max-w-fit">Pengajuan KI</h1>
            <p className="text-start text-lg font-normal">
              kekayaan intelektual (KI) apa yang Anda butuhkan? <br /> Pelajari berbagai jenis KI yang dapat Anda lindungi bersama kami.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
              {Section3.map((data) => (
                <div key={data.id} className="flex flex-col rounded-md border w-full px-4 py-4  justify-center items-start ">
                  <h1
                    className=" max-w-fit text-[20px] text-PRIMARY01 font-semibold
                "
                  >
                    {data.title}
                  </h1>
                  <p className="text-justify mt-4">{data.description}</p>
                  <Button url={data.url} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
