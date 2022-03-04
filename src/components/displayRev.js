import React from "react";

export function DisplayReviews(props) {
  // console.log({ reviews });
  return (
    <div className="reviews">
      {props.reviews.slice(0, -1).map((review) => (
        <div className="rev">
          <h4>{review.title}</h4>
          <h4>Rating: {review.rating}/5</h4>
          <h5>{review.comment}</h5>
          <button className="del">X</button>
          <br />
        </div>
      ))}
    </div>
  );
}
