import React, { useEffect, useState } from "react";
import aesjs from "aes-js";

export const MangaReaderContext = React.createContext();

export const MangaReaderProvider = ({ children }) => {
  //   const envKey = import.meta.env.VITE_AES_CBC_KEY;
  //   const envIV = import.meta.env.VITE_AES_CBC_IV;

  const envIV = "jrQf#Fn7f6sxt2f^";
  const envKey = "#7gnZAVa&D43E@N%";

  const [pages, setPages] = useState([]);

  const [data, setData] = useState([]);

  const getLimitsFromURL = () => {
    let url = window.location.href.split("?");
    console.log(url[1]);
    var enc = new TextEncoder();
    let key = new Uint8Array(enc.encode(envKey));
    let iv = new Uint8Array(enc.encode(envIV));
    console.log(key);
    console.log(iv);
    var encryptedHex = url[1];

    try {
      var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
      var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
      var decryptedBytes = aesCbc.decrypt(encryptedBytes);
      var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
      console.log(decryptedText);
      decryptedText = decryptedText
        .replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
      decryptedText = decryptedText.replace(/[\u0000-\u0019]+/g, "");
      console.log(JSON.parse(decryptedText));
      var decryptedTextJSON = JSON.parse(decryptedText);
      setData([decryptedTextJSON]);
    } catch (error) {
      console.error(error);
      alert(
        "Something wrong with link to access page. You will not be able to access the manga chapters/levels."
      );
    }
  };

  useEffect(() => {
    getLimitsFromURL();
  }, []);

  return (
    <MangaReaderContext.Provider
      value={{
        pages,
        data,
        setPages,
      }}
    >
      {children}
    </MangaReaderContext.Provider>
  );
};
