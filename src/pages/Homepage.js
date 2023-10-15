import React from "react";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
  reviews {
    data {
      id
      attributes {
        title
        rating
        body
      }
    }
  }
}
`;

export default function Homepage() {
  //   const { loading, error, data } = useFetch(
  //     "http://localhost:1337/api/reviews"
  //   );
  const gqlData = useQuery(REVIEWS);
  const { loading, error, data } = gqlData;

  console.log("data", gqlData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.reviews.data.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          <small>console list</small>
          <p>{review.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`} >Read more</Link>
        </div>
      ))}
    </div>
  );
}
