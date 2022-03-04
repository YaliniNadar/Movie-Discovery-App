import React from "react";

export function DisplayReviews({ reviews }) {
  // console.log({ reviews });
  return (
    <div>
      {reviews.map((review) => (
        <ul>
          <li>{review.movie_id}</li>
          <li>{review.comment}</li>
          <li>{review.rating}</li>
        </ul>
      ))}
    </div>
  );
}
