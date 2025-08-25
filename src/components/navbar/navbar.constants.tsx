import type { NavItem } from "../../models/components/navbar/NavItem.model";

export const navMenu: NavItem[] = [
  {
    menuname: "Home",
    route: "/home",
    submenu: [],
  },
  {
    menuname: "About",
    route: "/about",
    submenu: [],
  },
  {
    menuname: "Services",
    submenu: [
      {
        menuname: "Weather",
        route: "/service/weather",
        submenu: [],
      },
      {
        menuname: "Stadistics",
        route: "/service/stadistics",
        submenu: [],
      },
    ],
  },
  {
    menuname: "Contact",
    route: "/contact",
    submenu: [],
  },
];
