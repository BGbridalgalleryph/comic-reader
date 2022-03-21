import React, { useEffect, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import aes from 'js-crypto-aes'
import aesjs from 'aes-js'

export const MangaReaderContext = React.createContext();

export const MangaReaderProvider = ({ children }) => {

    const envKey = import.meta.env.VITE_AES_CBC_KEY
    const envIV = import.meta.env.VITE_AES_CBC_IV

    // const [chapters, setChapters] = useState([
    //     {id: 1, name: 'Chapter 1'},
    // ])

    // const [levels, setLevels] = useState([
    //     {id: 7, name: 'Level 7', pages: 4},
    //     {id: 13, name: 'Level 13', pages: 7},
    //     {id: 20, name: 'Level 20', pages: 8},
    // ])

    //const dataSample = [{"c": 1,"l": {"7": 4,"13": 7,"20": 8}}]

    const [pages, setPages] = useState([])

    const [data, setData] = useState([])

    const getLimitsFromURL = () => {
        let url = window.location.href.split('?')
        console.log(url[1])
        var enc = new TextEncoder()
        let key = new Uint8Array(enc.encode(envKey))
        let iv = new Uint8Array(enc.encode(envIV))
        console.log(key)
        console.log(iv)
        var encryptedHex = url[1]

        try {
            var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
            var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
            var decryptedBytes = aesCbc.decrypt(encryptedBytes);
            var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
            console.log(decryptedText)
            console.log(JSON.parse(decryptedText))
            setData([JSON.parse(decryptedText)])
        } catch (error) {
            console.error(error)
            alert("Something wrong with link to access page. You will not be able to access the manga chapters/levels.")
        }
        
    }

    useEffect(() => {
        getLimitsFromURL()
    }, [])
    

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
}