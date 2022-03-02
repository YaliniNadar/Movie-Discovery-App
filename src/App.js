import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [placeholder, setPlaceholder] = useState("Hi");

  useEffect(() => {
    fetch("/hello")
      .then((res) => res.json())
      .then((data) => {
        setPlaceholder(data.result);
      });
  }, []);
  
  return (
    <div className="App">
      <h1>Hi</h1>
      <p>Flask says {placeholder}</p>
    </div>
  );
}

export default App;
