import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import { reorderRows } from "./utils/reorder";
import { MovieList } from "./components/MovieList";
import styled from "@emotion/styled";
import images from "./images.json";

import "./global.css";
import { ColorMap } from "./types/types";

const sId = generate();
const aId = generate();
const bId = generate();
const cId = generate();
const dId = generate();
const unrankedId = generate();

const App = () => {
  const [rows, setRows] = React.useState([
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
      urls: images,
    },
  ]);

  const [bkgColor] = React.useState<ColorMap>({
    S: "rgba(254, 163, 170, 1)",
    A: "rgba(248, 184, 139, 1)",
    B: "rgba(250, 248, 132, 1)",
    C: "rgba(186, 237, 145, 1)",
    D: "rgba(178, 206, 254, 1)",
    unranked: "#000000",
  });

  const [searchTitle, setSearchTitle] = React.useState("");

  const handleSearch = (title: string) => {
    let words = title.split(" ");
    words.map((word: string) => word.toLowerCase());
    setSearchTitle(words.join("-"));
  };

  React.useEffect(() => {
    const data = localStorage.getItem("tierflix-list");

    if (data) {
      setRows(JSON.parse(data));
    }

    fetch("https://flixable.com/title/alma-matters/").then((res) =>
      console.log(res.text())
    );
  }, []);

  React.useEffect(() => {
    localStorage.setItem("tierflix-list", JSON.stringify(rows));
  });

  return (
    <Container>
      <DragDropContainer>
        <TitleContainer>
          <h1>Tierflix</h1>
        </TitleContainer>
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
        </DragDropContext>
      </DragDropContainer>
      <SearchContainer>
        <h1>Add Your Own Show!</h1>
        <FormContainer>
          <form onSubmit={(e) => e.preventDefault()} />
          <input
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Your Netflix Show..."
          />
          <button>Add</button>
        </FormContainer>
      </SearchContainer>
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

const DragDropContainer = styled.div`
  width: 100%;
  background: url("./assets/images/main-bg-low-alpha.png") center center / cover
    no-repeat fixed;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #555;

  h1 {
    color: #fff;
    letter-spacing: 1.6px;
  }
`;

const TitleContainer = styled.div`
  display: block;
  text-align: center;

  h1 {
    color: #db0000;
    margin: 2vh 0;
    letter-spacing: 3px;
    font-size: 50px;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
  }
`;

const FormContainer = styled.div`
  display: flex;

  button {
    width: 80px;
    height: 30px;
  }
`;

export default App;
