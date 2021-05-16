import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import { reorderRows } from "./utils/reorder";
import { MovieList } from "./components/MovieList";
import images from "./images.json";

import "./global.css";

const sId = generate();
const aId = generate();
const bId = generate();
const cId = generate();
const dId = generate();
const unrankedId = generate();

/**
 * Scrape image
 * imgs = []
 * document.querySelectorAll('img.poster').forEach(x => imgs.push(x.src))
 * JSON.stringify(imgs)
 */

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
    <div style={{}}>
      <div style={{ display: "block", textAlign: "center" }}>
        <h1
          style={{
            color: "#db0000",
            marginTop: "5vh",
            letterSpacing: "3px",
            fontSize: "45px",
          }}
        >
          Tierflix
        </h1>
      </div>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          // // dropped outside the list
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
    </div>
  );
};

export default App;
