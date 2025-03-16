export type Section2Type = {
  id: number;
  title: string;
  amount: number;
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

export const Section2: Section2Type[] = [
  {
    id: 1,
    title: "Hak Cipta",
    amount: 600,
  },
  {
    id: 2,
    title: "Paten",
    amount: 300,
  },
  {
    id: 3,
    title: "Merek",
    amount: 100,
  },
  {
    id: 4,
    title: "Desain Industri",
    amount: 400,
  },
];

export const Section3: Section3Type[] = [
  {
    id: 1,
    title: "Hak Cipta",
    description: "Hak Cipta merupakan salah satu bagian dari kekayaan intelektual yang memiliki ruang lingkup objek dilindungi paling luas, karena mencakup ilmu pengetahuan, seni dan sastra (art and literary) yang di dalamnya mencakup pula program komputer.",
    url: "https://www.dgip.go.id/menu-utama/hak-cipta/pengenalan",
  },
  {
    id: 1,
    title: "Paten",
    description: "Hak Cipta merupakan salah satu bagian dari kekayaan intelektual yang memiliki ruang lingkup objek dilindungi paling luas, karena mencakup ilmu pengetahuan, seni dan sastra (art and literary) yang di dalamnya mencakup pula program komputer.",
    url: "https://www.dgip.go.id/menu-utama/paten/pengenalan",
  },
  {
    id: 1,
    title: "Merek",
    description: "Hak Cipta merupakan salah satu bagian dari kekayaan intelektual yang memiliki ruang lingkup objek dilindungi paling luas, karena mencakup ilmu pengetahuan, seni dan sastra (art and literary) yang di dalamnya mencakup pula program komputer.",
    url: "https://www.dgip.go.id/menu-utama/merek/pengenalan",
  },
  {
    id: 1,
    title: "Desain Industri",
    description: "Hak Cipta merupakan salah satu bagian dari kekayaan intelektual yang memiliki ruang lingkup objek dilindungi paling luas, karena mencakup ilmu pengetahuan, seni dan sastra (art and literary) yang di dalamnya mencakup pula program komputer.",
    url: "https://www.dgip.go.id/menu-utama/desain-industri/pengenalan",
  },
];

export const Section4: Section4Type[] = [
  {
    id: 1,
    batch: "Gelombang 1",
    title: "Pengajuan Hak Cipta sebanyak 56 dan Paten sebanyak 10",
    range_submissions: "15 Februari - 31 Maret",
    kouta: [
      {
        id: 1,
        title: "Hak Cipta",
        amount: 14,
      },
      {
        id: 2,
        title: "Paten",
        amount: 24,
      },
      {
        id: 3,
        title: "Merek",
        amount: 6,
      },
      {
        id: 4,
        title: "Desain Industri",
        amount: 7,
      },
    ],
  },
  {
    id: 1,
    batch: "Gelombang 2",
    title: "Pengajuan Hak Cipta sebanyak 56 dan Paten sebanyak 10",
    range_submissions: "15 Februari - 31 Maret",
    kouta: [
      {
        id: 1,
        title: "Hak Cipta",
        amount: 14,
      },
      {
        id: 2,
        title: "Paten",
        amount: 24,
      },
      {
        id: 3,
        title: "Merek",
        amount: 6,
      },
      {
        id: 4,
        title: "Desain Industri",
        amount: 7,
      },
    ],
  },
  {
    id: 1,
    batch: "Gelombang 3",
    title: "Pengajuan Hak Cipta sebanyak 56 dan Paten sebanyak 10",
    range_submissions: "15 Februari - 31 Maret",
    kouta: [
      {
        id: 1,
        title: "Hak Cipta",
        amount: 14,
      },
      {
        id: 2,
        title: "Paten",
        amount: 24,
      },
      {
        id: 3,
        title: "Merek",
        amount: 6,
      },
      {
        id: 4,
        title: "Desain Industri",
        amount: 7,
      },
    ],
  },
  {
    id: 1,
    batch: "Gelombang 4",
    title: "Pengajuan Hak Cipta sebanyak 56 dan Paten sebanyak 10",
    range_submissions: "15 Februari - 31 Maret",
    kouta: [
      {
        id: 1,
        title: "Hak Cipta",
        amount: 14,
      },
      {
        id: 2,
        title: "Paten",
        amount: 24,
      },
      {
        id: 3,
        title: "Merek",
        amount: 6,
      },
      {
        id: 4,
        title: "Desain Industri",
        amount: 7,
      },
    ],
  },
];
