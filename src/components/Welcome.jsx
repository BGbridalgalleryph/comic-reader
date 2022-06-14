import React, { useState, useContext } from "react";
import { Tab, Tabs } from "@mui/material";
import logoIMG from "../../images/logo.png";

const Welcome = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center bg-[#0d1429] flex-col md:pb-[50px]">
      <div className="flex w-full justify-center items-center bg-[#0d1429] flex-col px-12 py-7">
        <div className="flex flex-col justify-center items-center w-full">
          {/* <img src={logoIMG} alt="logo" className="object-contain w-[500px]" /> */}
          <p className="flex text-[50px] text-white md:text-[60px] font-face-prototype justify-center w-full items-center md:text-start text-center">
            {" "}
            COMIC READER
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
