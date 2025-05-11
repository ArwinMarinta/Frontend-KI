import React from "react";

const Section_2 = () => {
  return (
    <div className="flex flex-col bg-whit p-6 bg-white rounded-md">
      <div>Pengajuan Terakhir</div>
      <div className="overflow-x-auto w-full mb-6">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b max-w-10">No</th>
              <th className="px-4 py-2 text-left border-b ">Nama Pengguna</th>
              <th className="px-4 py-2 text-left border-b ">Jenis Pengajuan</th>
              <th className="px-4 py-2 text-left border-b ">Skema Pendanaan</th>
              <th className="px-4 py-2 text-left border-b ">Progress Pengajuan</th>
              <th className="px-4 py-2 text-left border-b ">Waktu Pengajuan</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white hover:bg-gray-50">
              <td className="px-4 py-2 border-b">1</td>
              <td className="px-4 py-2 border-b ">FORMULASI DAN SPESIFIKASI TEPUNG BIJI</td>
              <td className="px-4 py-2 border-b">Pemeriksaan Substantif</td>
              <td className="px-4 py-2 border-b">Lihat Progress</td>
              <td className="px-4 py-2 border-b">Detail Pengajuan</td>
              <td className="px-4 py-2 border-b text-cyan-600 hover:underline cursor-pointer">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Section_2;
