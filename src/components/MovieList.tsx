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
  bkgColor?: string;
}

export const MovieList: React.FC<Props> = ({
  listId,
  listType,
  row,
  bkgColor,
}) => {
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
            <TierLabel style={{ backgroundColor: bkgColor }}>
              {row.label !== "unranked" ? row.label : ""}
            </TierLabel>
            <RowContainer ref={dropProvided.innerRef}>
              {row.urls.map((url, index) => (
                <Draggable key={url} draggableId={url} index={index}>
                  {(dragProvided) => (
                    <DragImgContainer
                      {...dragProvided.dragHandleProps}
                      {...dragProvided.draggableProps}
                      ref={dragProvided.innerRef}
                    >
                      <img src={url} />
                    </DragImgContainer>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </RowContainer>
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
  height: 87px;
  min-width: 85px;
  color: #000;
  text-align: center;
  align-items: center;
  margin: auto;
  vertical-align: middle;
  line-height: 89px;
  font-size: 28px;
  border: 1px solid #555;
`;

const RowContainer = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
  min-height: 88.9px;
  overflow-x: auto;
  background: linear-gradient(to right, #16222a, #3a6073);
  border: 1px solid #000;
`;

const DragImgContainer = styled.div`
  padding: 0;

  img {
    width: 130px;
    height: 80px;
    margin: 0;
    margin-right: 5px;
  }
`;
