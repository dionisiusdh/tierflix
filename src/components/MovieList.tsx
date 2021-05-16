import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Row } from "../types/types";
import styled from "@emotion/styled";

interface Props {
  row: Row;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
}

export const MovieList: React.FC<Props> = ({ listId, listType, row }) => {
  return (
    <Container>
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
            <TierLabel>{row.label}</TierLabel>
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
      <style></style>
    </Container>
  );
};

const Container = styled.div``;

const TierLabel = styled.div`
  width: 5%;
  min-height: 89px;
  min-width: 85px;
  background: #555;
  text-align: center;
  align-items: center;
  margin: auto;
  vertical-align: middle;
  line-height: 89px;
  font-size: 28px;
`;
