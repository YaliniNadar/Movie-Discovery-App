import "./App.css";
import React, { useState, useEffect } from "react";
import { DisplayReviews } from "./components/displayRev";
import { Navbar } from "./components/Nav";

function App() {
  const [placeholder, setPlaceholder] = useState("Hi");
  const [username, setUsername] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/hello")
      .then((res) => res.json())
      .then((data) => {
        setPlaceholder(data.result);
      });
  }, []);

  useEffect(() => {
    fetch("/load_info")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((data) => {
        setUsername(data.username);
        setReviews(data.reviews[0]);
      });
  }, []);

  return (
    <div className="App">
      <Navbar username={username} />
      <h1>Hi</h1>
      <p>Flask says {placeholder}</p>
      <DisplayReviews username={username} reviews="Yooo" />
    </div>
  );
}

export default App;
