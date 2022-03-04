/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function DisplayReviews(props) {
  // console.log({ reviews });
  const { reviews } = props;
  return (
    <div className="reviews">
      {reviews.slice(0, -1).map((review) => (
        <div className="rev">
          <h4>{review.title}</h4>
          <h4>Rating: {review.rating}/5</h4>
          <h5>{review.comment}</h5>
          <button type="button" className="del" onClick={() => alert(review.id)}>
            X
          </button>
          <br />
        </div>
      ))}
    </div>
  );
}
