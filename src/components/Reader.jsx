import React, { useState, useEffect, useContext } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { MangaReaderContext } from "../context/MangaReaderContext";
import { useSwipeable } from "react-swipeable";

const Reader = () => {
  const { pages, setPages, data } = useContext(MangaReaderContext);
  const [chapter, setChapter] = useState("");
  const [level, setLevel] = useState("");
  const [levels, setLevels] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  // [{"c":1,"l":{"7":4,"13":7,"20":8}}]

  const setPageArray = (data, chapter, level) => {
    setPages([]);
    data.map((dataChapter) => {
      console.log(dataChapter.c);
      if (dataChapter.c == chapter) {
        let objEntries = Object.entries(dataChapter.l);
        setLevels(objEntries);
        objEntries.map((dataLevel) => {
          console.log(dataLevel);
          if (dataLevel[0] == level) {
            setMaxPage(dataLevel[1]);
            for (let i = 1; i <= dataLevel[1]; i++) {
              setPages((prevState) => [...prevState, { page: i }]);
            }
          }
        });
      }
    });
    setPage(0);
  };

  const renderIMG = (chapter, level, page) => {
    const imgUrl = new URL(
      `../../images/comics/Chapter ${chapter}/Level ${level}/Post/${page}.png`,
      import.meta.url
    ).href;
    return <img src={imgUrl} alt="page" className="object-contain w-full" />;
  };

  const renderIMGwithNext = (chapter, level, page, maxPage) => {
    let currentPage = page;
    if (maxPage == page) {
      currentPage -= 1;
    }

    const imgUrl = new URL(
      `../../images/comics/Chapter ${chapter}/Level ${level}/Post/${page}.png`,
      import.meta.url
    ).href;
    return (
      <img
        src={imgUrl}
        alt="page"
        className="object-contain w-full"
        onClick={() => {
          setPage(currentPage + 1);
          window.scrollTo(0, 0);
        }}
      />
    );
  };

  const changePage = (e) => {
    switch (e.keyCode) {
      case 37:
        console.log(page);
        if (page == 1) setPage(page);
        else if (page != 0) setPage(page - 1);
        break;
      case 39:
        console.log(page);
        if (page == maxPage) setPage(page);
        else if (page != 0) setPage(page + 1);
        break;
    }
  };

  const handlers = useSwipeable({
    onSwipedRight: (e) => {
      if (page == 1) setPage(page);
      else if (page != 0) setPage(page - 1);
    },
    onSwipedLeft: (e) => {
      if (page == maxPage) setPage(page);
      else if (page != 0) setPage(page + 1);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {}, []);

  return (
    <div className="flex md:flex-row w-full bg-[#0d1429] flex-col justify-center">
      <div className="fixed bottom-10 right-10">
        <BsFillArrowUpCircleFill
          className="text-gray-700 opacity-80 md:text-[100px] text-[50px] cursor-pointer transition hover:opacity-100 hover:duration-700"
          onClick={() => window.scrollTo(0, 0)}
        />
      </div>
      <div className="flex flex-col md:w-[70%] w-full justify-start">
        <div className="flex md:flex-row flex-col m-3 w-full justify-between">
          <div className="flex md:flex-row flex-col m-3 md:w-[50%] w-[90%]">
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#fff" }}
              >
                Chapter
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chapter}
                label="Chapter"
                onChange={(e) => {
                  setChapter(e.target.value);
                  setPageArray(data, e.target.value, level);
                }}
                style={{ color: "#fff", background: "#31313b" }}
              >
                {data.map((singleChapter) => (
                  <MenuItem key={singleChapter.c} value={singleChapter.c}>
                    Chapter {singleChapter.c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="flex md:w-[20%] w-full md:mx-2">
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "#fff" }}
                >
                  Level
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={level}
                  label="Level"
                  onChange={(e) => {
                    setLevel(e.target.value);
                    setPageArray(data, chapter, e.target.value);
                  }}
                  style={{ color: "#fff", background: "#31313b" }}
                >
                  {levels.map((singleLevel) => (
                    <MenuItem key={singleLevel[0]} value={singleLevel[0]}>
                      Level {singleLevel[0]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="flex md:flex-row flex-col m-3 md:w-[10%] w-[90%]">
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#fff" }}
              >
                Page
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={page}
                label="Page"
                onChange={(e) => setPage(e.target.value)}
                style={{ color: "#fff", background: "#31313b" }}
              >
                <MenuItem value={0}>All Pages</MenuItem>
                {pages.map((singlePage) => (
                  <MenuItem key={singlePage.page} value={singlePage.page}>
                    Page {singlePage.page}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div
          className="flex flex-col justify-center items-center w-full"
          {...handlers}
        >
          {pages.map((viewPage) =>
            page == 0
              ? renderIMG(chapter, level, viewPage.page)
              : page == viewPage.page &&
                renderIMGwithNext(chapter, level, viewPage.page, maxPage)
          )}
          {(document.onkeydown = changePage)}
        </div>

        {chapter.length != 0 && level.length != 0 && (
          <div className="flex md:flex-row flex-col m-3 w-full justify-between mt-10">
            <div className="flex md:flex-row flex-col m-3 md:w-[50%] w-[90%]">
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "#fff" }}
                >
                  Chapter
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={chapter}
                  label="Chapter"
                  onChange={(e) => {
                    setChapter(e.target.value);
                    setPageArray(data, e.target.value, level);
                    window.scrollTo(0, 0);
                  }}
                  style={{ color: "#fff", background: "#31313b" }}
                >
                  {data.map((singleChapter) => (
                    <MenuItem key={singleChapter.c} value={singleChapter.c}>
                      Chapter {singleChapter.c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="flex md:w-[20%] w-full md:mx-2">
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ color: "#fff" }}
                  >
                    Level
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={level}
                    label="Level"
                    onChange={(e) => {
                      setLevel(e.target.value);
                      setPageArray(data, chapter, e.target.value);
                      window.scrollTo(0, 0);
                    }}
                    style={{ color: "#fff", background: "#31313b" }}
                  >
                    {levels.map((singleLevel) => (
                      <MenuItem key={singleLevel[0]} value={singleLevel[0]}>
                        Level {singleLevel[0]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex md:flex-row flex-col m-3 md:w-[10%] w-[90%]">
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "#fff" }}
                >
                  Page
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={page}
                  label="Page"
                  onChange={(e) => {
                    setPage(e.target.value);
                    window.scrollTo(0, 0);
                  }}
                  style={{ color: "#fff", background: "#31313b" }}
                >
                  <MenuItem value={0}>All Pages</MenuItem>
                  {pages.map((singlePage) => (
                    <MenuItem key={singlePage.page} value={singlePage.page}>
                      Page {singlePage.page}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reader;
