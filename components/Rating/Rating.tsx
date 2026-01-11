import React from "react";
import styles from "./Rating.module.css";

interface RatingProps {
  value: number; 
  max?: number;  
  size?: number; 
}

export default function Rating({ value, max = 5, size = 24 }: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={styles.rating}>
      {stars.map((star) => (
        <svg
          key={star}
          className={`${styles.star} ${star <= value ? styles.filled : ""}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
        </svg>
      ))}
    </div>
  );
}
