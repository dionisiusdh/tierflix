import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Row } from "./types";

interface Props {
  row: Row;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
}

export const MovieList: React.FC<Props> = ({ listId, listType, row }) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {(dropProvided) => (
        <div {...dropProvided.droppableProps}>
          <div>
            <div
              style={{
                display: "flex",
                backgroundColor: "pink",
                margin: "20px",
                minHeight: "85px",
              }}
              ref={dropProvided.innerRef}
            >
              {row.urls.map((url, index) => (
                <Draggable key={url} draggableId={url} index={index}>
                  {(dragProvided) => (
                    <div
                      {...dragProvided.dragHandleProps}
                      {...dragProvided.draggableProps}
                      ref={dragProvided.innerRef}
                    >
                      <img
                        style={{
                          width: "80px",
                          height: "80px",
                          marginRight: "5px",
                        }}
                        src={url}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};
