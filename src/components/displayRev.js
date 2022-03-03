import React from "react";

export function DisplayReviews({ reviews }) {
  // console.log({ reviews });
  return (
    <div>
      <h4>{reviews.movie_id}</h4>
      <h4>{reviews.rating}</h4>
      <h4>{reviews.comment}</h4>
    </div>
  );
}
