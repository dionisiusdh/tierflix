import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import { reorderRows } from "./utils/reorder";
import { MovieList } from "./components/MovieList";
import styled from "@emotion/styled";
import images from "./images.json";

import "./global.css";

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
      label: "",
      urls: images,
    },
  ]);

  React.useEffect(() => {
    const data = localStorage.getItem("tierflix-list");

    if (data) {
      setRows(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("tierflix-list", JSON.stringify(rows));
  });

  return (
    <Container>
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
            />
          ))}
        </div>
      </DragDropContext>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: url("./assets/images/main-bg-low-alpha.png") center center / cover
    no-repeat fixed;
  position: absolute;
  inset: 0px;
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

export default App;
