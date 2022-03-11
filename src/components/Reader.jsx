import React, { useState, useEffect, } from "react"
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import { BsFillArrowUpCircleFill } from "react-icons/bs"

const Reader = () => {
  const [chapters, setChapters] = useState([
    {id: 1, name: 'Chapter 1'},
  ])
  const [chapter, setChapter] = useState('')

  const [level, setLevel] = useState('')
  const [levels, setLevels] = useState([
    {id: 7, name: 'Level 7', pages: 4},
    {id: 13, name: 'Level 13', pages: 7},
    {id: 20, name: 'Level 20', pages: 8},
  ])

  const [page, setPage] = useState(0)
  const [pages, setPages] = useState([])

  // const fs = require('fs');
  // const dir = './directory';

  // fs.readdir(dir, (err, files) => {
  // console.log(files.length);
  // });

  const setPageArray = (chapters, chapter, levels, level) => {
    setPages([])
    chapters.map((thisChapter) => {
      if(thisChapter.id == chapter){
        levels.map((thisLevel) => {
          if(thisLevel.id == level) {
            console.log(thisLevel.pages)
            for (let i = 1; i <= thisLevel.pages; i++) {
              setPages((prevState) => [...prevState, { page: i}])
            }
          }
        })
      }
    })
    setPage(0)
  }

  useEffect(() => {
    
  }, [])

  return (
    <PerfectScrollbar className="flex md:flex-row w-full bg-[#0d1429] flex-col justify-center">
      <div className="fixed bottom-10 right-10">
        <BsFillArrowUpCircleFill className="text-gray-700 opacity-80 text-[100px] cursor-pointer" onClick={() => window.scrollTo(0,0)}/>
      </div>
      <div className="flex flex-col w-[70%] justify-start">
        <div className="flex md:flex-row flex-col m-3 w-full justify-between">
          <div className="flex md:flex-row flex-col m-3 w-[50%]">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" style={{color:"#fff"}}>Chapter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chapter}
                label="Chapter"
                onChange={(e) => {
                  setChapter(e.target.value)
                  setPageArray(chapters, e.target.value, levels, level)
                }}
                style={{color:"#fff",background:"#31313b"}}
              >
              {chapters.map((singleChapter) =>  <MenuItem key={singleChapter.id} value={singleChapter.id}>{singleChapter.name}</MenuItem>)}
              </Select>
            </FormControl>
            <div className="flex w-[20%] mx-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{color:"#fff"}}>Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={level}
                  label="Level"
                  onChange={(e) => {
                    setLevel(e.target.value)
                    setPageArray(chapters, chapter, levels, e.target.value)
                  }}
                  style={{color:"#fff",background:"#31313b"}}
                >
                  {levels.map((singleLevel) =>  <MenuItem key={singleLevel.id} value={singleLevel.id}>{singleLevel.name}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </div>
          
          <div className="flex md:flex-row flex-col m-3 w-[10%]">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" style={{color:"#fff"}}>Page</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={page}
                label="Page"
                onChange={(e) => setPage(e.target.value)}
                style={{color:"#fff",background:"#31313b"}}
              >
                <MenuItem value={0}>All Pages</MenuItem>
                {pages.map((singlePage) =>  <MenuItem key={singlePage.page} value={singlePage.page}>Page {singlePage.page}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>
        {pages.map((viewPage) => (
          (page == 0) ? (
            <div className="flex flex-col justify-center items-center">
              <img src={`../../images/comics/Chapter ${chapter}/Level ${level}/Post/${viewPage.page}.png`} alt="page" className="object-contain w-full" />
            </div>
          ) 
          : (page == viewPage.page) && (
            <div className="flex flex-col justify-center items-center">
              <img src={`../../images/comics/Chapter ${chapter}/Level ${level}/Post/${viewPage.page}.png`} alt="page" className="object-contain w-full" onClick={() => {
                setPage(page + 1)
                window.scrollTo(0, 0)}}/>
            </div>
          )
        ))}
        {chapter.length != 0 && level.length != 0 && <div className="flex md:flex-row flex-col m-3 w-full justify-between mt-10">
          <div className="flex md:flex-row flex-col m-3 w-[50%]">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" style={{color:"#fff"}}>Chapter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chapter}
                label="Chapter"
                onChange={(e) => {
                  setChapter(e.target.value)
                  setPageArray(chapters, e.target.value, levels, level)
                  window.scrollTo(0, 0)
                }}
                style={{color:"#fff",background:"#31313b"}}
              >
              {chapters.map((singleChapter) =>  <MenuItem key={singleChapter.id} value={singleChapter.id}>{singleChapter.name}</MenuItem>)}
              </Select>
            </FormControl>
            <div className="flex w-[20%] mx-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{color:"#fff"}}>Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={level}
                  label="Level"
                  onChange={(e) => {
                    setLevel(e.target.value)
                    setPageArray(chapters, chapter, levels, e.target.value)
                    window.scrollTo(0, 0)
                  }}
                  style={{color:"#fff",background:"#31313b"}}
                >
                  {levels.map((singleLevel) =>  <MenuItem key={singleLevel.id} value={singleLevel.id}>{singleLevel.name}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </div>
          
          <div className="flex md:flex-row flex-col m-3 w-[10%]">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" style={{color:"#fff"}}>Page</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={page}
                label="Page"
                onChange={(e) => {
                  setPage(e.target.value)
                  window.scrollTo(0, 0)
                }}
                style={{color:"#fff",background:"#31313b"}}
              >
                <MenuItem value={0}>All Pages</MenuItem>
                {pages.map((singlePage) =>  <MenuItem key={singlePage.page} value={singlePage.page}>Page {singlePage.page}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>}
      </div>
      
    
    </PerfectScrollbar>
  );
};

export default Reader;
