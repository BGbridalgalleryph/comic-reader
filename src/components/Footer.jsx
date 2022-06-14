import React, { useState } from "react";
import {
  TiSocialFacebookCircular,
  TiSocialGithubCircular,
  TiSocialInstagramCircular,
  TiSocialGooglePlusCircular,
  TiSocialTwitterCircular,
  TiSocialLinkedinCircular,
} from "react-icons/ti";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer-market md:mt-80 mt-30">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-1 justify-center items-center flex-wrap sm:mt-0 mt-5 w-full">
          <a target="_blank" href="https://www.facebook.com/" rel="noreferrer">
            <TiSocialFacebookCircular
              fontSize={40}
              className="text-white cursor-pointer hover:text-pink-700 transition hover:duration-700"
            />
          </a>
          <a target="_blank" href="https://twitter.com/" rel="noreferrer">
            <TiSocialTwitterCircular
              fontSize={40}
              className="text-white cursor-pointer hover:text-pink-700 transition hover:duration-700"
            />
          </a>
          <a target="_blank" href="https://www.instagram.com/" rel="noreferrer">
            <TiSocialInstagramCircular
              fontSize={40}
              className="text-white cursor-pointer hover:text-pink-700 transition hover:duration-700"
            />
          </a>
          <a target="_blank" href="https://github.com/" rel="noreferrer">
            <TiSocialGithubCircular
              fontSize={40}
              className="text-white cursor-pointer hover:text-pink-700 transition hover:duration-700"
            />
          </a>
          {/* <a target="_blank" href="" rel="noreferrer">
        <TiSocialGooglePlusCircular fontSize={40} className="text-white cursor-pointer hover:text-pink-700 transition hover:duration-700" />
      </a> */}
          <a target="_blank" href="https://www.linkedin.com/" rel="noreferrer">
            <TiSocialLinkedinCircular
              fontSize={40}
              className="text-white cursor-pointer hover:text-pink-700 transition hover:duration-700"
            />
          </a>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col sm:flex-row">
        <p className="text-white text-sm text-center font-medium mt-2 mx-2 my-2 ">
          Sign up for our newsletter
        </p>
        <input
          placeholder="user@email.com"
          type="email"
          className="rounded-lg p-2 outline-none text-pink-700 border-2 text-sm white-glassmorphism md:w-[300px] w-[100%] my-2 focus:border-pink-700 tr transition focus:duration-700"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button
          type="button"
          className="rounded-lg outline text-white border px-3 justify-center item-center pb-2 mx-2 my-2 hover:border-pink-700 hover:text-pink-700 transition hover:duration-700"
        >
          <p className="text-sm text-center font-medium mt-2">SUBSCRIBE</p>
        </button>
      </div>

      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-xs">
          © 2022 Copyright: Murasaki7
        </p>
        <p className="text-white text-right text-xs">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
