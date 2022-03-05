/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import React, { useState } from 'react';
import Form from './Form';

// eslint-disable-next-line import/prefer-default-export
export function DisplayReviews(props) {
  // console.log({ reviews });
  const { reviews } = props;
  const [rev, setRev] = useState('');
  const [clicked, setClicked] = useState(false);

  function deleteRev(id) {
    // const RevCopy = { reviews };
    // RevCopy.map((item) => item.id).indexOf(id);
    // eslint-disable-next-line react/destructuring-assignment
    props.passChildData((oldArray) => [...oldArray, id]);
  }

  function handleEdit(value) {
    setRev(value);
    console.log(value);
    if (!clicked) {
      render(<Form test={value} />);
      setClicked(true);
    }
  }

  return (
    <div className="reviews">
      {reviews.slice(0, -1).map((review) => (
        <div className="rev">
          <h4>{review.title}</h4>
          <h4>Rating: {review.rating}/5</h4>
          <h5>{review.comment}</h5>
          <button type="button" className="edit" onClick={() => handleEdit(review.id)}>
            Edit
          </button>
          <button
            type="button"
            className="del"
            onClick={() => deleteRev(review.id)}
            style={{ background: 'red' }}
          >
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
