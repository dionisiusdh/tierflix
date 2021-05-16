import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Row } from "../types/types";

interface Props {
  row: Row;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
}

export const MovieList: React.FC<Props> = ({ listId, listType, row }) => {
  return (
    <div>
      <Droppable
        droppableId={listId}
        type={listType}
        direction="horizontal"
        isCombineEnabled={false}
      >
        {(dropProvided) => (
          <div
            {...dropProvided.droppableProps}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                width: "5%",
                minHeight: "89px",
                minWidth: "85px",
                background: "#555",
                textAlign: "center",
                alignItems: "center",
                margin: "auto",
                verticalAlign: "middle",
                lineHeight: "89px",
              }}
            >
              {row.label}
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: "#564d4d",
                margin: "0",
                width: "100%",
                minHeight: "88.9px",
                overflowX: "auto",
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
                          width: "130px",
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
        )}
      </Droppable>
      <style>
        {`::-webkit-scrollbar {
            width: .1rem;
            height: .5rem;
          }
          
          ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
          }
          
          ::-webkit-scrollbar-thumb {
            background-color: darkgrey;
            border-radius: 10px;
          }`}
      </style>
    </div>
  );
};
