/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import React, { useState } from 'react';
import Form from './Form';

// eslint-disable-next-line import/prefer-default-export
export function DisplayReviews(props) {
  // console.log({ reviews });
  const [rev, setRev] = useState('');
  const [clicked, setClicked] = useState(false);

  function handleEdit(value) {
    setRev(value);
    console.log(value);
    if (!clicked) {
      render(<Form test={value} />);
      setClicked(true);
    }
  }

  const { reviews } = props;
  return (
    <div className="reviews">
      {reviews.slice(0, -1).map((review) => (
        <div className="rev">
          <h4>{review.title}</h4>
          <h4>Rating: {review.rating}/5</h4>
          <h5>{review.comment}</h5>
          <button type="button" className="del" onClick={() => handleEdit(review.id)}>
            X
          </button>
          <br />
        </div>
      ))}
      <br />
      <br />
      <h1>this is {rev}</h1>
    </div>
  );
}
