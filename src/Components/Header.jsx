import React, { useState } from "react";
import { BellIcon } from "../assets/Icons/Svg";
import userImage from "../assets/images/Avatar.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getHeadingTitleFromRoute } from "../utils/helpers";
import { makeApiRequest } from "../api/apiFunctions";
import { successType, toastMessage } from "../utils/toastMessage";

const Header = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const { pathname } = useLocation();
  const title = getHeadingTitleFromRoute(pathname);
  // State to track dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleLogout = () => {
    // make api call here
    // makeApiRequest({
    //   endPoint:LOGOUT_ENDPOINT
    // })
    toastMessage("Logged out successfully", successType);
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <header className="header flex py-4 px-4 sm:px-10 font-[sans-serif] min-h-[70px] tracking-wide relative z-50 sticky top-0">
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <div class="main_head_title">
            {pathname === "/dashboard" || pathname === "/" ? (
              <h5 class="text-lg font-normal gap-2">
                Good Morning
                <span class="text-[#01A933] font-bold text-xl">{userName}</span>
              </h5>
            ) : (
              <h2 class="text-lg ">{title}</h2>
            )}
          </div>
          {/* <div
            id="collapseMenu"
            className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="mb-6 hidden max-lg:block">
                <a href="javascript:void(0)">
                  <img
                    src="https://readymadeui.com/readymadeui.svg"
                    alt="logo"
                    className="w-36"
                  />
                </a>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]"
                >
                  Home
                </a>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
                >
                  Team
                </a>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
                >
                  Feature
                </a>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
                >
                  Blog
                </a>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
                >
                  About
                </a>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div> */}

          <div className="flex max-lg:ml-auto space-x-3">
            <button class="relative p-2 rounded-full rounded-full">
              {BellIcon}
            </button>
            <div className="relative inline-block text-left">
              {/* Profile Button with Image and Name */}
              <button
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={toggleDropdown}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={userImage} />
                  </div>
                  <span className="font-semibold text-gray-700">
                    {userName}
                  </span>
                </div>
              </button>

              {isOpen && (
                <div
                  id="dropdownMenu"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button id="toggleOpen" className="lg:hidden">
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
