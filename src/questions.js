import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Reorder, getItemStyle, getQuestionListStyle } from "./utils";
import Answers from "./answers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// fake data generator
const getQuestions = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `question-${k}`,
    content: `question ${k}`,
    answers: [`${k}1`, `${k}2`, `${k}3`]
  }));

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: getQuestions(3)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.type === "QUESTIONS") {
      console.log(`${result.source.index} , ${result.destination.index}`);
      const questions = Reorder(
        this.state.questions,
        result.source.index,
        result.destination.index
      );

      this.setState({
        questions
      });
    } else {
      const answers = Reorder(
        this.state.questions[parseInt(result.type, 10)].answers,
        result.source.index,
        result.destination.index
      );

      const questions = JSON.parse(JSON.stringify(this.state.questions));

      questions[result.type].answers = answers;

      this.setState({
        questions
      });
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" type="QUESTIONS">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getQuestionListStyle(snapshot.isDraggingOver)}
            >
              {this.state.questions.map((question, index) => (
                <Draggable
                  key={question.id}
                  draggableId={question.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {question.content}
                      <span {...provided.dragHandleProps}>
                        <FontAwesomeIcon
                          icon={"grip-vertical"}
                          style={{ float: "left" }}
                        />
                      </span>
                      <Answers question={question} questionNum={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Questions;
