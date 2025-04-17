import React from "react";
import "./App.css";
import WorldMap from "./components/WorldMap";

function App() {
  return (
    <div className="App">
      <h1>SOLIDE FINANCE</h1>
      <WorldMap countries={["France", "Germany", "Egypt", "Kenya"]} />

    </div>
  );
}

export default App;
