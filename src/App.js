import "./App.css";
import React, { useState, useEffect } from "react";
import { DisplayReviews } from "./components/displayRev";
import { Navbar } from "./components/Nav";

function App() {
  const [username, setUsername] = useState("");
  const [reviews, setReviews] = useState([]);

  // useEffect(() => {
  //   fetch("/hello")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPlaceholder(data.result);
  //     });
  // }, []);

  useEffect(() => {
    fetch("/load_info")
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);

        var reviewsCopy = data.reviews;
        reviewsCopy.push(reviews);
        setReviews(reviewsCopy);

        // setReviews(...reviews, ...reviewsCopy);
        console.log(data.reviews);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(reviews);

  return (
    <div className="App">
      <Navbar username={username} />
      <DisplayReviews reviews={reviews} />
      {/* <h4>{reviews[0].comment}</h4> */}
    </div>
  );
}

export default App;
