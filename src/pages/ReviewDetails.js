import React from "react";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attibutes {
          title,
          body,
          rating
        }
      }
    }
  }
`;

export default function ReviewDetails() {
  const { id } = useParams();
  console.log('data id', id);
  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/reviews/" + id
  // );
  const reviewData = useQuery(REVIEW, {
    variables: { id: id },
  });
  const { loading, error, data } = reviewData;

  console.log("data", reviewData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="review-card">
      <div className="rating">{data.attributes.rating}</div>
      <h2>{data.attributes.title}</h2>

      <small>console list</small>
      <p>{data.attributes.body}</p>
    </div>
  );
}
