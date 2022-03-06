/* eslint-disable react/destructuring-assignment */
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
  const [editMode, setEdit] = useState(false);
  const [ratings, setRatings] = useState([]);

  function deleteRev(id) {
    // const RevCopy = { reviews };
    props.setDelRev((oldArray) => [...oldArray, id]);
    props.setReviews((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEdit(review) {
    setRev(review.rating);
    console.log(review.rating);
    if (!clicked) {
      render(<Form rating={review.rating} />);
      setClicked(true);
    }
  }

  function handleEdit2(newRating, revId) {
    const valid = ['1', '2', '3', '4', '5'];
    if (valid.includes(newRating)) {
      console.log(revId);
      setRatings((prevState) => [
        ...prevState,
        {
          revId,
          newRating,
        },
      ]);
    }
  }
  console.log(ratings);
  return (
    <div className="reviews">
      {reviews.slice(0, -1).map((review) => (
        <div className="rev">
          <h4>{review.title}</h4>
          <h4>
            Rating:
            <span
              contentEditable="true"
              onInput={(e) => handleEdit2(e.currentTarget.textContent, review.id)}
            >
              {review.rating}
            </span>
            /5
          </h4>
          <h5>{review.comment}</h5>
          <button type="button" className="edit" onClick={() => handleEdit(review)}>
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
