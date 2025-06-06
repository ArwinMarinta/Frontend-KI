export type NavbarItem = {
  id: number;
  name: string;
  url: string;
};

export const NavbarData: NavbarItem[] = [
  {
    id: 1,
    name: "Beranda",
    url: "/",
  },
  // {
  //   id: 2,
  //   name: "Permohonan",
  //   url: "/pengajuan",
  // },
  {
    id: 2,
    name: "Unduhan",
    url: "/unduhan",
  },
  {
    id: 3,
    name: "FAQ",
    url: "/frequently-asked-question",
  },
  {
    id: 4,
    name: "Hubungi Kami",
    url: "/hubungi-kami",
  },
];
