import React, { Component } from "react";
import ReactDOM from "react-dom";
import Questions from "./questions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

library.add(faGripVertical);

class App extends Component {
  render() {
    return <Questions />;
  }
}

// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));
