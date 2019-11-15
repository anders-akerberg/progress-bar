import * as React from "react";
import * as ReactDOM from "react-dom";

import "./styles.css";

import ProgressBar from "./ProgressBar";
import ProgressCircle from "./ProgressCircle";

const now = 60;

function App() {
  return (
    <div className="App">
      <h1>Circle</h1>

      <div style={{ display: "flex" }}>
        <ProgressCircle size="big" max={100}>
          <ProgressCircle now={45} key={1} />
          <ProgressCircle now={20} key={2} />
          <ProgressCircle color="#fa5b35" now={15} key={3} />
        </ProgressCircle>
        <ProgressCircle now={30} label="30%" />
        <ProgressCircle now={25} label="25%" size="small" />
      </div>

      <h2>Custom Colors</h2>
      <div style={{ display: "flex" }}>
        <ProgressCircle size="big" max={400}>
          <ProgressCircle now={250} key={1} />
          <ProgressCircle now={20} key={2} />
          <ProgressCircle color="#fa5b35" now={15} key={3} />
        </ProgressCircle>
        <ProgressCircle size="big" max={400} colors={["red", "green", "blue"]}>
          <ProgressCircle now={250} key={1} />
          <ProgressCircle now={20} key={2} />
          <ProgressCircle color="#fa5b35" now={15} key={3} />
        </ProgressCircle>
        <ProgressCircle color="purple" now={25} label="25%" size="small" />
      </div>

      <h1>Bars</h1>
      <h2>Basic</h2>
      <ProgressBar now={60} />
      <h2>Labels</h2>
      <ProgressBar now={now} label={`${now}%`} />
      <h2>Styles</h2>
      <h3>Animated</h3>
      <ProgressBar animated now={45} />
      <h2>Stacked</h2>
      <ProgressBar>
        <ProgressBar now={25} key={1} label="someLabel" />
        <ProgressBar now={25} key={2} />
        <ProgressBar animated now={30} key={3} />
      </ProgressBar>
      <h2>Size</h2>
      <h3>Small</h3>
      <ProgressBar animated now={45} size="small" />
      <ProgressBar size="small">
        <ProgressBar now={15} key={1} />
        <ProgressBar now={25} key={2} />
        <ProgressBar animated now={30} key={3} />
      </ProgressBar>
      <h3>Big</h3>
      <ProgressBar animated now={45} size="big" />
      <ProgressBar size="big">
        <ProgressBar now={15} key={1} label="someLabel" />
        <ProgressBar now={25} key={2} />
        <ProgressBar animated now={30} key={3} />
      </ProgressBar>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
