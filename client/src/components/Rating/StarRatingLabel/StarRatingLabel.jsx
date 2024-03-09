import React, { useContext } from "react";
import {StarRatingContext} from "../StarRating/StarRating";

function StarRatingLabel() {
  const { rating, labelText } = useContext(StarRatingContext);
  return (
    <div>{labelText}</div>
  );
}

export default StarRatingLabel;