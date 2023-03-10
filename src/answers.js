import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle, getAnswerListStyle } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Answers = props => {
  const { question, questionNum } = props;
  return (
    <Droppable droppableId={`droppable${questionNum}`} type={`${questionNum}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getAnswerListStyle(snapshot.isDraggingOver)}
        >
          {question.answers.map((answer, index) => {
            return (
              <Draggable key={answer} draggableId={answer} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <span {...provided.dragHandleProps}>
                      <FontAwesomeIcon
                        icon={"grip-vertical"}
                        style={{ float: "left" }}
                      />
                    </span>
                    {answer}
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Answers;
