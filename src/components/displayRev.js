/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export function DisplayReviews(props) {
  // console.log({ reviews });
  const { reviews } = props;
  // const [clicked, setClicked] = useState(false);
  // const [ratings, setRatings] = useState([]);

  function deleteRev(id) {
    // const RevCopy = { reviews };
    props.setDelRev((oldArray) => [...oldArray, id]);
    props.setReviews((prev) => prev.filter((item) => item.id !== id));
  }

  function handleEdit(newRating, revId) {
    const valid = ['1', '2', '3', '4', '5'];
    if (valid.includes(newRating)) {
      console.log(revId);
      props.setRatings((prevState) => [
        ...prevState,
        {
          revId,
          newRating,
        },
      ]);
    }
  }

  return (
    <div className="reviews">
      {reviews.slice(0, -1).map((review) => (
        <div className="rev">
          <h4>{review.title}</h4>
          <h4>
            Rating:
            <span
              contentEditable="true"
              onInput={(e) => handleEdit(e.currentTarget.textContent, review.id)}
            >
              {review.rating}
            </span>
            /5
          </h4>
          <h5>{review.comment}</h5>
          {/* <button type="button" className="edit" onClick={() => handleEdit(review)}>
            Edit
          </button> */}
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
      <h3>Try editing rating value</h3>
    </div>
  );
}
