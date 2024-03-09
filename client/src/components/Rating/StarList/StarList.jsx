import React, { useContext } from "react";
import {StarRatingContext} from "../StarRating/StarRating";
import Star from "../Star/Star";
import styles from './StarList.module.css'

function StarsList() {
  const { maxValue } = useContext(StarRatingContext);

  return (
    <div className={styles.starRating}>
      {[...Array(maxValue)].map((star, index) => {
        const value = index + 1;

        return (
          <Star
            key={index}
            value={value}
          />
        );
      })}
    </div>
  );
}

export default StarsList;