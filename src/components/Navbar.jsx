import React from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4, HiOutlineTicket } from "react-icons/hi";
import { AiOutlineClose, AiOutlineShop } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import logo from "../../images/logo.png";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex justify-between items-center bg-[#0d1429] flex-row mb-2">
      <div className="flex md:w-[20%] w-full flex-initial justify-start items-center cursor-pointer">
        <Link to={{ pathname: "/" }}>
          <img
            src={logo}
            alt="logo"
            className="object-contain w-full cursor-pointer px-3 md:mr-1"
          />
        </Link>
      </div>
      <Link to={"/"}>
        <p className="flex md:w-[9%] w-[15%] text-white text-[22px] font-face-prototype absolute z-50 top-5 right-[5%] cursor-pointer sm:right-0"></p>
      </Link>
      <ul className="text-white md:flex hidden w-full justify-between">
        <div className="flex justify-start ml-2">
          <Link to={"/"}>
            <li className="flex justify-center items-center px-4 cursor-pointer transition hover:duration-700 hover:bg-gray-600 rounded-sm text-lg py-3">
              <FaHome className="mr-2" /> Home
            </li>
          </Link>
          <li className="flex justify-center items-center px-4 h-full cursor-pointer transition hover:duration-700 hover:bg-gray-600 rounded-sm">
            <MdDashboard className="mr-2" /> Dashboard
          </li>
          <Link to={"/"}>
            <li
              className={
                "flex justify-center items-center px-4 h-full cursor-pointer transition hover:duration-700 hover:bg-gray-600 rounded-sm"
              }
            >
              <AiOutlineShop className="mr-2" />
              Marketplace
            </li>
          </Link>
          <Link to={"/"}>
            <li className="flex justify-center items-center px-4 h-full cursor-pointer transition hover:duration-700 hover:bg-gray-600 rounded-sm">
              <HiOutlineTicket className="mr-2" />
              Events
            </li>
          </Link>
        </div>
      </ul>
      {!toggleMenu && (
        <HiMenuAlt4
          fontSize={28}
          className="justify-end items-end w-full text-white md:hidden cursor-pointer"
          onClick={() => setToggleMenu(true)}
        />
      )}

      {toggleMenu && (
        <ul
          className="z-40 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
        >
          <li className="text-xl w-full my-2">
            <AiOutlineClose onClick={() => setToggleMenu(false)} />
          </li>
          <Link to={"/"}>
            <li className="flex justify-center items-center px-4 cursor-pointer transition hover:duration-700 hover:bg-gray-600 rounded-sm text-lg py-3">
              <FaHome className="mr-2" /> Home
            </li>
          </Link>
          <Link to={"/"}>
            <li className="flex justify-center items-center px-4 cursor-pointer transition hover:duration-700 hover:bg-gray-600 rounded-sm text-lg py-3">
              <MdDashboard className="mr-2" /> Dashboard
            </li>
          </Link>
          <Link to={"/"}>
            <li
              className={
                "flex justify-center items-center px-4 cursor-pointer transition hover:duration-700 hover:bg-gray-600 rounded-sm text-lg py-3"
              }
            >
              <AiOutlineShop className="mr-2" />
              Marketplace
            </li>
          </Link>
          <Link to={"/"}>
            <li className="flex justify-center items-center px-4 cursor-pointer transition hover:duration-700 hover:bg-gray-600 rounded-sm text-lg py-3">
              <HiOutlineTicket className="mr-2" />
              Events
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
