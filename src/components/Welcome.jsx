import React, { useState, useContext } from "react";
import { Tab, Tabs } from "@mui/material";
import logoIMG from "../../images/logo.png";

const Welcome = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center bg-[#0d1429] flex-col md:pb-[50px]">
      <div className="flex w-full justify-center items-center bg-[#0d1429] flex-col px-12 py-7">
        <div className="flex flex-col justify-center items-center w-full">
<<<<<<< HEAD
          {/* <img src={logoIMG} alt="logo" className="object-contain w-[500px]" /> */}
          <p className="flex text-[50px] text-white md:text-[60px] font-face-prototype justify-center w-full items-center md:text-start text-center">
=======
          <p className="text-[50px] text-white md:text-[60px] font-face-prototype">
>>>>>>> f249f873249f2a34cb32adb58301a08a7529034d
            {" "}
            MANGA READER
          </p>
        </div>
      </div>
<<<<<<< HEAD
=======
      <div className="flex justify-between w-full"></div>
>>>>>>> f249f873249f2a34cb32adb58301a08a7529034d
    </div>
  );
};

export default Welcome;
