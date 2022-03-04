import React from "react";

export function DisplayReviews(props) {
  // console.log({ reviews });
  return (
    <div className="rev">
      {props.reviews.slice(0, -1).map((review) => (
        <div>
          <h4>{review.movie_id}</h4>
          <h4>{review.comment}</h4>
          <h5>{review.rating}</h5>
          <button>X</button>
          <br />
        </div>
      ))}
    </div>
  );
}
