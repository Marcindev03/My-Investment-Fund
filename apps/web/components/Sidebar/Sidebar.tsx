import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { APP_NAME, SHARED_SIDEBAR_ITEMS } from "mocks/data";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleDown,
  BsXLg,
} from "react-icons/bs";
import { useBreakpointValue } from "hooks";
import { FaUser } from "react-icons/fa";

const SIDEBAR_ITEMS_DEV_PREFIX = "/admin";

const SideBar: FC = () => {
  const sidebarButtonArrowDirection = useBreakpointValue({
    base: "vertical",
    sm: "vertical",
    md: "horizontal",
    lg: "horizontal",
    xl: "horizontal",
    "2xl": "horizontal",
  });
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <section className="flex items-center md:justify-between">
            <Link
              href="/"
              className="mr-4 md:block text-left md:pb-2
            text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm
            uppercase font-bold p-4 px-0"
            >
              {APP_NAME}
            </Link>
            <button
              className="cursor-pointer text-black opacity-50 w-10 h-10 flex justify-center items-center leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
            >
              {sidebarButtonArrowDirection === "vertical" ? (
                <BsChevronDoubleDown size="1.3em" />
              ) : (
                <BsChevronDoubleLeft size="1.3em" />
              )}
            </button>
          </section>
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="md:block text-left md:pb-2
                    text-blueGray-600 mr-0 inline-block whitespace-nowrap
                    text-sm uppercase font-bold p-4 px-0"
                  >
                    Notus NextJS
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <BsXLg />
                  </button>
                </div>
              </div>
            </div>

            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Management
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {SHARED_SIDEBAR_ITEMS.map(({ href, text, Icon }) => (
                <li className="items-center">
                  <Link
                    href={SIDEBAR_ITEMS_DEV_PREFIX + href}
                    className={
                      "flex items-center text-xs uppercase py-3 font-bold " +
                      (router.pathname.indexOf(href) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <>
                      <Icon
                        size="1.5em"
                        className={
                          `mr-2 text-sm ` +
                          (router.pathname.indexOf(href) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      />
                      {text}
                    </>
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Auth
            </h6>

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  href="/admin/users"
                  className="flex items-center text-blueGray-700
                  hover:text-blueGray-500 text-xs uppercase py-3 font-bold
                  "
                >
                  <FaUser className="text-blueGray-400 mr-2 text-sm" />
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
