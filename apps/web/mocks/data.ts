import { SidebarItem } from "types";
import { BsFillBarChartFill } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { IoDocumentsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

export const NOTUS_MESSAGE = `

=========================================================
* Notus NextJS - v1.1.0 based on Tailwind Starter Kit by Creative Tim
=========================================================

* Product Page: https://www.creative-tim.com/product/notus-nextjs
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md)

* Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`;

export const SHARED_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    href: "/dashboard",
    text: "Dashboard",
    Icon: RxDashboard,
  },
  {
    href: "/operations",
    text: "Operations",
    Icon: CgArrowsExchangeAlt,
  },
  {
    href: "/investments",
    text: "Investments",
    Icon: BsFillBarChartFill,
  },
  {
    href: "/requests",
    text: "Requests",
    Icon: IoDocumentsOutline,
  },
];

// export const ADMIN_SIDEBAR_ITEMS: SidebarItem[] = [];

export const USER_SIDEBAR_ITEMS: SidebarItem[] = [
  {
    href: "/profile",
    text: "Profile",
    Icon: FaUser,
  },
];

export const APP_NAME = "My Investments Found";
