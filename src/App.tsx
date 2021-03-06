import React from "react";
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import { reorderRows } from "./utils/reorder";
import { MovieList } from "./components/MovieList";
import { ColorMap } from "./types/types";
import Select from "react-select";
import styled from "@emotion/styled";
import data from "./data/data.json";
import datainit from "./data/datainit.json";
import datasmall from "./data/datasmall.json";

import "./global.css";

const sId = generate();
const aId = generate();
const bId = generate();
const cId = generate();
const dId = generate();
const unrankedId = generate();
const searchId = generate();

/**
 * TODO:
 * Share
 * Delete Show
 * Other styling
 */

const App = () => {
  const DEBUG = false;
  const movieData = DEBUG ? datasmall : data;
  const bkgColor: ColorMap = {
    S: "rgba(254, 163, 170, 1)",
    A: "rgba(248, 184, 139, 1)",
    B: "rgba(250, 248, 132, 1)",
    C: "rgba(186, 237, 145, 1)",
    D: "rgba(178, 206, 254, 1)",
    unranked: "#000000",
    search: "#000000",
  };
  const selectOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
  ];

  const [rows, setRows] = useState([
    {
      id: sId,
      label: "S",
      urls: [],
    },
    {
      id: aId,
      label: "A",
      urls: [],
    },
    {
      id: bId,
      label: "B",
      urls: [],
    },
    {
      id: cId,
      label: "C",
      urls: [],
    },
    {
      id: dId,
      label: "D",
      urls: [],
    },
    {
      id: unrankedId,
      label: "unranked",
      urls: datainit,
    },
    {
      id: searchId,
      label: "search",
      urls: [],
    },
  ]);

  const isMovieExist = (url: string) => {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].urls.includes(url)) {
        return true;
      }
    }
    return false;
  };

  const [searchTitle, setSearchTitle] = useState("");
  const [limitSearch, setLimitSearch] = useState(10);

  useEffect(() => {
    const imgResult: string[] = [];

    const searchResult = movieData.forEach((movie) =>
      movie.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      searchTitle.length > 2 &&
      !isMovieExist(movie.img) &&
      imgResult.length < limitSearch
        ? imgResult.push(movie.img)
        : null
    );

    if (imgResult.length != 0) {
      rows.pop();
      setRows([
        ...rows,
        {
          id: searchId,
          label: "search",
          urls: imgResult,
        },
      ]);
    } else {
      emptySearchRow();
    }
  }, [searchTitle, limitSearch]);

  useEffect(() => {
    const data = localStorage.getItem("tierflix-list");

    if (data) {
      setRows(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tierflix-list", JSON.stringify(rows));
  });

  const handleReset = () => {
    localStorage.removeItem("tierflix-list");
    window.location.reload();
  };

  const emptySearchRow = () => {
    rows.pop();
    setRows([
      ...rows,
      {
        id: searchId,
        label: "search",
        urls: [],
      },
    ]);
  };

  return (
    <Container>
      <Header>
        <TitleContainer>
          <img src="./assets/images/title.png" />
        </TitleContainer>
        <MenuContainer>
          <SelectContainer>
            <p>Limit Search Result:</p>
            <Select
              className="select"
              options={selectOptions}
              defaultValue={selectOptions.filter(
                (option) => option.label === "10"
              )}
              onChange={(e: any) => {
                e ? setLimitSearch(e.value) : null;
              }}
            />
          </SelectContainer>
          <button onClick={() => handleReset()}>Reset</button>
        </MenuContainer>
      </Header>
      <DragDropContainer>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            // dropped outside the list
            if (!destination) {
              return;
            }
            setRows(reorderRows(rows, source, destination));
          }}
        >
          <div>
            {rows.map((row) => (
              <MovieList
                internalScroll
                key={row.id}
                listId={row.id}
                listType="CARD"
                row={row}
                bkgColor={bkgColor[row.label]}
              />
            ))}
          </div>
          <SearchContainer>
            <input
              onChange={(e) => {
                setSearchTitle(e.target.value);
              }}
              placeholder="Your Netflix Show..."
            />
            {searchTitle ? <p>Showing results for: {searchTitle}</p> : <p></p>}
          </SearchContainer>
        </DragDropContext>
      </DragDropContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background: url("./assets/images/main-bg-low-alpha.png") center center / cover
    no-repeat fixed;
  position: absolute;
  inset: 0px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  h1 {
    color: #db0000;
    margin: 2vh 0;
    letter-spacing: 3px;
    font-size: 50px;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
  }

  img {
    height: 70px;
    width: 180px;
    margin: 10px 0;
  }

  button {
    width: 100px;
    min-width: 100px;
    height: 35px;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    background: rgba(249, 249, 249, 0.7);
    cursor: pointer;
    transition-duration: 0.2s;
    border-radius: 3px;
    border: none;

    &:hover {
      background: rgba(100, 100, 100, 0.5);
      color: rgba(249, 249, 249, 0.7);
      transition-duration: 0.2s;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

const MenuContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
`;

const SelectContainer = styled.div`
  width: 50%;
  font-family: Helvetica, sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;

  .select {
    min-width: 80px;
  }

  p {
    min-width: 150px;
    color: #fff;
    margin-right: 10px;
  }
`;

const DragDropContainer = styled.div`
  width: 100%;
  background: url("./assets/images/main-bg-low-alpha.png") center center / cover
    no-repeat fixed;
`;

const SearchContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 35px;

  p {
    width: auto;
    height: 20px;
    margin: 0 15px;
    color: #fff;
    letter-spacing: 1.6px;
    font-family: Helvetica, sans-serif;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 768px) {
      max-width: 45%;
      font-size: 10px;
    }
  }

  input {
    width: 22.5%;
    min-width: 200px;
    height: 30px;
    padding: 3px 7px;
    font-size: 17px;
    border-radius: 3px;
    border: none;
    outline: none;

    @media (max-width: 768px) {
      font-size: 12px;
      height: 25px;
    }
  }
`;

export default App;
