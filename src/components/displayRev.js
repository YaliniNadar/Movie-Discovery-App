import React from "react";

export function DisplayReviews({ username, reviews }) {
  return (
    <div>
      <h4>{username}</h4>
      <h4>{reviews}</h4>
    </div>
  );
}
