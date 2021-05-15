import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import { reorderRows } from "./reorder";
import { ColorMap } from "./types";
import { MovieList } from "./MovieList";
import images from "./images.json";

const aId = generate();
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
      id: aId,
      label: "a",
      urls: [],
    },
    {
      id: unrankedId,
      label: "unranked",
      urls: images,
    },
  ]);

  return (
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
        <button
          onClick={() => {
            setRows([
              {
                id: generate(),
                label: "",
                urls: [],
              },
              ...rows,
            ]);
          }}
        >
          Add Tier
        </button>
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
  );
};

export default App;
