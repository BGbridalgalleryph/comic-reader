import React, { useState, useEffect, useContext } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { MangaReaderContext } from "@context/MangaReaderContext";
import { useSwipeable } from "react-swipeable";
import LazyLoad, { forceCheck } from "react-lazyload";

const Reader = () => {
  const baseURL = import.meta.env.VITE_IMG_BASE;
  const imgBucketURL = import.meta.env.VITE_IMG_BUCKET;
  // const baseURL = "internal";
  // const imgBucketURL = "";

  const { pages, setPages, data } = useContext(MangaReaderContext);
  const [chapter, setChapter] = useState("none");
  const [page, setPage] = useState("all");
  const [maxPage, setMaxPage] = useState(0);

  // [\{"c\":1,\"l\":{\"7\":4,\"13\":7,\"20\":10}}]

  const setPageArray = (data, chaptr) => {
    setPages([]);
    console.log(data);
    data.map((dataChapter) => {
      console.log(dataChapter.chapter);
      if (dataChapter.chapter == chaptr) {
        setMaxPage(dataChapter.pages);
        for (let i = 0; i <= dataChapter.pages; i++) {
          setPages((prevState) => [...prevState, { page: i }]);
        }
      }
    });
    setPage(0);
  };

  const renderIMG = (chapter, page) => {
    // var imgUrl = new URL();
    // if (baseURL == "internal") {
    //   imgUrl = new URL(
    //     `../../images/comics/Chapter ${chapter}/${page}.png`,
    //     import.meta.url
    //   ).href;
    // } else if (baseURL == "external") {
    //   imgUrl = new URL(
    //     `${imgBucketURL}/Chapter ${chapter}/${page}.png`,
    //     import.meta.url
    //   ).href;
    // }

    forceCheck();

    const imgUrl = new URL(
      `../../images/comics/Chapter ${chapter}/${page}.png`,
      import.meta.url
    ).href;

    return (
      <LazyLoad height={500} offset={100}>
        <img
          src={imgUrl}
          onError={(ev) => {
            ev.target.style.visibility = "hidden";
            setPage(currentPage + 1);
          }}
          alt="page"
          className="object-contain md:w-full w-[90%]"
        />
      </LazyLoad>
    );
  };

  const renderIMGwithNext = (chapter, page, maxPage) => {
    let currentPage = page;
    if (maxPage == page) {
      currentPage -= 1;
    }

    // var imgUrl = new URL();
    // if (baseURL == "internal") {
    //   imgUrl = new URL(
    //     `../../images/comics/Chapter ${chapter}/${page}.png`,
    //     import.meta.url
    //   ).href;
    // } else if (baseURL == "external") {
    //   imgUrl = new URL(
    //     `${imgBucketURL}/Chapter ${chapter}/${page}.png`,
    //     import.meta.url
    //   ).href;
    // }

    const imgUrl = new URL(
      `../../images/comics/Chapter ${chapter}/${page}.png`,
      import.meta.url
    ).href;

    return (
      <LazyLoad height={500} offset={100}>
        <img
          src={imgUrl}
          onError={(ev) => {
            ev.target.style.visibility = "hidden";
            setPage(currentPage + 1);
          }}
          alt="page"
          className="object-contain md:w-full w-[90%]"
          onClick={() => {
            setPage(currentPage + 1);
            window.scrollTo(0, 0);
          }}
        />
      </LazyLoad>
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
        <div className="flex md:flex-row flex-col w-full my-3 md:justify-between justify-center items-center">
          <div className="flex md:flex-row flex-col md:w-[40%] my-3 w-[90%]">
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
                  setPageArray(data, e.target.value);
                }}
                style={{ color: "#fff", background: "#31313b" }}
              >
                {data.map((singleChapter) =>
                  singleChapter.chapter != 0 ? (
                    <MenuItem
                      key={singleChapter.chapter}
                      value={singleChapter.chapter}
                    >
                      Chapter {singleChapter.chapter}
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={singleChapter.chapter}
                      value={singleChapter.chapter}
                    >
                      Prologue
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            {/* <div className="flex md:w-[20%] w-full md:mx-2">
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
            </div> */}
          </div>

          <div className="flex md:flex-row flex-col   md:w-[15%] w-[90%]">
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
                <MenuItem value={"all"}>All Pages</MenuItem>
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
            page == "all"
              ? renderIMG(chapter, viewPage.page)
              : page == viewPage.page &&
                renderIMGwithNext(chapter, viewPage.page, maxPage)
          )}
          {(document.onkeydown = changePage)}
        </div>

        {chapter != "none" && (
          <div className="flex md:flex-row flex-col w-full my-3 md:justify-between justify-center items-center mt-10">
            <div className="flex md:flex-row flex-col my-3 md:w-[40%] w-[90%]">
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
                    setPageArray(data, e.target.value);
                    window.scrollTo(0, 0);
                  }}
                  style={{ color: "#fff", background: "#31313b" }}
                >
                  {data.map((singleChapter) =>
                    singleChapter.chapter != 0 ? (
                      <MenuItem
                        key={singleChapter.chapter}
                        value={singleChapter.chapter}
                      >
                        Chapter {singleChapter.chapter}
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key={singleChapter.chapter}
                        value={singleChapter.chapter}
                      >
                        Prologue
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              {/* <div className="flex md:w-[20%] w-full md:mx-2">
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
              </div> */}
            </div>

            <div className="flex md:flex-row flex-col md:w-[15%] w-[90%]">
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
