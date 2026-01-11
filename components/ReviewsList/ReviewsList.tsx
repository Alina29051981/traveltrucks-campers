import { Review } from "@/types/camper";
import styles from "./ReviewsList.module.css";
import Rating from "@/components/Rating/Rating";

interface CamperReviewsProps {
  reviews: Review[];
}

export default function CamperReviews({ reviews }: CamperReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return <p className={styles.noReviews}>No reviews yet</p>;
  }

  return (
    <div className={styles.reviews}>
  {reviews.map((r, i) => (
    <div key={i} className={styles.review}>
      <div className={styles.userBlock}>
        <span className={styles.avatar}>
          {r.reviewer_name[0].toUpperCase()}
        </span>
        <div className={styles.userInfo}>
          <span className={styles.name}>{r.reviewer_name}</span>
         
          <Rating value={r.reviewer_rating} size={16} />
        </div>
      </div>

      <p className={styles.comment}>{r.comment}</p>
    </div>
  ))}
</div>

  );
}

