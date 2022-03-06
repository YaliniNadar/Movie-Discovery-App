import './App.css';
import React, { useState, useEffect } from 'react';
import { DisplayReviews } from './components/displayRev';
import { Navbar } from './components/Nav';

function App() {
  const [username, setUsername] = useState('');
  const [reviews, setReviews] = useState([]);
  const [delReviews, setDelReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState([]);

  function handleDelete(list) {
    console.log(list);
    try {
      fetch('/del_rev', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(list),
      }).then((response) => response.json());
    } catch (e) {
      console.log(e);
    }
  }

  function handleRatings(ratings) {
    console.log(ratings);
    try {
      fetch('/upt_rating', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(ratings),
      }).then((response) => response.json());
    } catch (e) {
      console.log(e);
    }
  }

  function handleComments(comments) {
    console.log(comments);
    try {
      fetch('/upt_comment', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(comments),
      })
        .then((response) => response.json())
        .then(alert('Sucessfuly Saved Changes'));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetch('/load_info')
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);

        const reviewsCopy = data.reviews;
        reviewsCopy.push(reviews);
        setReviews(reviewsCopy);

        // setReviews(...reviews, ...reviewsCopy);
        console.log(data.reviews);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(reviews);
  console.log(delReviews);
  console.log(ratings);
  console.log(comments);

  return (
    <div className="App">
      <Navbar username={username} />
      <DisplayReviews
        reviews={reviews}
        setDelRev={setDelReviews}
        setReviews={setReviews}
        setRatings={setRatings}
        setComments={setComments}
      />
      {/* <h4>{reviews[0].comment}</h4> */}
      <button
        type="button"
        className="button1"
        onClick={() => {
          handleDelete({ delReviews });
          handleRatings({ ratings });
          handleComments({ comments });
        }}
      >
        Save Changes
      </button>
    </div>
  );
}

export default App;
