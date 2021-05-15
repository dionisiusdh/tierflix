import * as React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import { reorderRows } from "./reorder";
import { ColorMap } from "./types";
import { MovieList } from "./MovieList";

const aId = generate();
const unrankedId = generate();

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
      urls: [
        "https://d1qxviojg2h5lt.cloudfront.net/images/01CRXKFA2MRTVNWQ4CFD7A6RMJ/brooklynninenine400.png",
        "https://telanganatoday.com/wp-content/uploads/2019/05/STRANGER-THINGS-400x400.jpg",
      ],
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
