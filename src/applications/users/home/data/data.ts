export type Section2Type = {
  id: number;
  title: string;
  amount: number;
};

export type SectionType = {
  id: number;
  title: string;
  amount: number;
  key: string;
};
export type Section3Type = {
  id: number;
  title: string;
  description: string;
  url: string;
};

export type Section4Type = {
  id: number;
  batch: string;
  title: string;
  range_submissions: string;
  kouta: Section2Type[];
};

export const Section2: SectionType[] = [
  {
    id: 1,
    title: "Hak Cipta",
    key: "hakCipta",
    amount: 0,
  },
  {
    id: 2,
    title: "Paten",
    key: "paten",
    amount: 0,
  },
  {
    id: 3,
    title: "Merek",
    key: "merek",
    amount: 0,
  },
  {
    id: 4,
    title: "Desain Industri",
    key: "desainIndustri",
    amount: 0,
  },
];

export const Section3: Section3Type[] = [
  {
    id: 1,
    title: "Hak Cipta",
    description: "Hak Cipta adalah hak eksklusif pencipta yang timbul secara otomatis berdasarkan prinsip deklaratif setelah suatu ciptaan diwujudkan dalam bentuk nyata tanpa mengurangi pembatasan sesuai dengan ketentuan peraturan perundang-undangan.",
    url: "https://www.dgip.go.id/menu-utama/hak-cipta/pengenalan",
  },
  {
    id: 2,
    title: "Paten",
    description: "Paten adalah hak eksklusif yang diberikan oleh negara kepada inventor atas hasil invensinya di bidang teknologi untuk jangka waktu tertentu melaksanakan sendiri invensi tersebut atau memberikan persetujuan kepada pihak lain untuk melaksanakannya",
    url: "https://www.dgip.go.id/menu-utama/paten/pengenalan",
  },
  {
    id: 3,
    title: "Merek",
    description: "Merek adalah elemen penting dalam bisnis yang membedakan produk atau jasa. Merek bisa berupa kata, logo, suara, bentuk tiga dimensi, atau hologram dan memberikan identitas unik bagi produk.",
    url: "https://www.dgip.go.id/menu-utama/merek/pengenalan",
  },
  {
    id: 4,
    title: "Desain Industri",
    description: "Desain Industri adalah suatu kreasi bentuk, konfigurasi, atau komposisi garis dan warna yang memberikan kesan estetis pada suatu produk, komoditas industri, maupun kerajinan tangan. Desain industri bisa berbentuk 3 dimensi atau 2 dimensi. ",
    url: "https://www.dgip.go.id/menu-utama/desain-industri/pengenalan",
  },
];

export const staticSection4: Section4Type[] = [
  {
    id: 1,
    batch: "Gelombang 1",
    title: "Belum Ada Kuota Pengajuan",
    range_submissions: "-",
    kouta: [
      { id: 1, title: "Hak Cipta", amount: 0 },
      { id: 2, title: "Patent", amount: 0 },
      { id: 3, title: "Merek", amount: 0 },
      { id: 4, title: "Desain Industri", amount: 0 },
    ],
  },
  {
    id: 2,
    batch: "Gelombang 2",
    title: "Belum Ada Kuota Pengajuan",
    range_submissions: "-",
    kouta: [
      { id: 1, title: "Hak Cipta", amount: 0 },
      { id: 2, title: "Patent", amount: 0 },
      { id: 3, title: "Merek", amount: 0 },
      { id: 4, title: "Desain Industri", amount: 0 },
    ],
  },
  {
    id: 3,
    batch: "Gelombang 3",
    title: "Belum Ada Kuota Pengajuan",
    range_submissions: "-",
    kouta: [
      { id: 1, title: "Hak Cipta", amount: 0 },
      { id: 2, title: "Patent", amount: 0 },
      { id: 3, title: "Merek", amount: 0 },
      { id: 4, title: "Desain Industri", amount: 0 },
    ],
  },
  {
    id: 4,
    batch: "Gelombang 4",
    title: "Belum Ada Kuota Pengajuan",
    range_submissions: "-",
    kouta: [
      { id: 1, title: "Hak Cipta", amount: 0 },
      { id: 2, title: "Patent", amount: 0 },
      { id: 3, title: "Merek", amount: 0 },
      { id: 4, title: "Desain Industri", amount: 0 },
    ],
  },
];
