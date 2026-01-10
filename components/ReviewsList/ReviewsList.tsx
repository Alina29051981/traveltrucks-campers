import { Review } from "@/types/camper";
import styles from "./ReviewsList.module.css";

interface CamperReviewsProps {
  reviews: Review[];
}

export default function CamperReviews({ reviews }: CamperReviewsProps) {
  if (reviews.length === 0) return <p className={styles.noReviews}>No reviews yet</p>;

  return (
    <div className={styles.reviews}>
      {reviews.map((r, i) => (
        <div key={i} className={styles.review}>
          <div className={styles.header}>
            <span className={styles.name}>{r.reviewer_name}</span>
            <span className={styles.rating}>⭐ {r.reviewer_rating}</span>
          </div>
          <p className={styles.comment}>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
