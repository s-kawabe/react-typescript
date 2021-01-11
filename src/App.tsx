import React from "react";
import "./App.css";
import Greets from "./Greets";

const App: React.FC = () => {
  return (
    <div className="App">
      <Greets name={"Patty"} times={3}>
        <span role="img" aria-label="rabbit">
          🐰
        </span>
      </Greets>
    </div>
  );
};

export default App;
