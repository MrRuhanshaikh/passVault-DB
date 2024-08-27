import React from 'react'
import logo1 from "../assets/logo-1.png";
import githublogo from "../assets/github.svg";

const Footer = () => {
  return (
    <div className="navwrapper bg-slate-800 fixed z-10 w-full bottom-0 p-3">
        <div className="text-white text-sm gap-1 flex text-center justify-center items-center"><div>&copy;All Rights Reserved || Created with ❤️ By Ruhan Shaikh </div>
            <button onClick={()=>{window.open("https://github.com/MrRuhanshaikh", "_blank")}} className=" relative overflow-hidden px-4 py-1 rounded-md group">
              <img src={githublogo} alt="github-logo" className="relative z-10  transition-colors duration-500" />
              <div className="absolute inset-0 bg-green-500 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100"></div>
            </button></div>
            
    </div>
  )
}

export default Footer