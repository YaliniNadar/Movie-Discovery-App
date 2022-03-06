/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';

export default function Form(props) {
  const [rating, setRating] = useState(props.rating);

  function saveRating(e) {
    setRating(e.target.value);
  }
  return (
    <div>
      <form>
        <input type="number" min="1" max="5" defaultValue={rating} onChange={saveRating} />
        {/* <input type="text" /> */}
        <button type="button" onClick={saveRating}>
          Submit
        </button>
      </form>
      <h1>{rating}</h1>
    </div>
  );
}
