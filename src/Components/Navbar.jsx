import React from "react";
import logo1 from "../assets/logo-1.png";
import githublogo from "../assets/github.svg";

const Navbar = () => {
  return (
    <div className="navwrapper z-20 bg-slate-800 fixed top-0 w-full">
      <nav className="flex p-3 text-white justify-between below-500:w-4/5 mx-auto items-center">
        <div className="relative inline-block group">
          <img className="w-32  hidden sm:block" src={logo1} alt="passVault-logo" />
          <img className="w-8 block sm:hidden" src="favicon.ico" alt="passVault-logo" />
          <div className="absolute bottom-[-10px] left-0 w-full h-1 bg-green-300 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
        </div>
        <ul className="flex gap-10 items-center">
          <li className="relative group border border-transparent px-4 py-1 overflow-hidden">
            <a href="#1" className="relative z-10 text-white transition-colors duration-500">
              Home
            </a>
            <div className="absolute inset-0 bg-green-300 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
          </li>
          <li className="relative group border border-transparent px-4 py-1 overflow-hidden">
            <a href="#2" className="relative z-10 text-white transition-colors duration-500">
              About
            </a>
            <div className="absolute inset-0 bg-green-300 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
          </li>
          <li className="relative group border border-transparent px-4 py-1 overflow-hidden">
            <a href="#3" className="relative z-10 text-white transition-colors duration-500">
              Contact
            </a>
            <div className="absolute inset-0 bg-green-300 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
