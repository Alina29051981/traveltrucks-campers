import Link from "next/link";
import { useState } from "react";
import styles from "./CamperCard.module.css";
import { Camper } from "@/types/camper";

// Компонент для SVG-спрайту
interface SpriteIconProps {
  id: string;
  className?: string;
  fill?: string;
}

function SpriteIcon({ id, className, fill }: SpriteIconProps) {
  return (
    <svg className={className} fill={fill || "currentColor"}>
      <use xlinkHref={`/sprite/sprite.svg#${id}`} />
    </svg>
  );
}

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const [isFavorite, setIsFavorite] = useState(camper.isFavorite || false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const averageRating =
    camper.reviews.length > 0
      ? camper.reviews.reduce((sum, r) => sum + r.reviewer_rating, 0) /
        camper.reviews.length
      : 0;

  const featuresList = [
  { id: "icon-wind-1", name: "AC", available: camper.AC },
  { id: "icon-cup-hot-1", name: "Kitchen", available: camper.kitchen },
  { id: "icon-ph_shower", name: "Bathroom", available: camper.bathroom },
  { id: "icon-tv-1", name: "TV", available: camper.TV },
  { id: "icon-ui-radios", name: "Radio", available: camper.radio },
  { id: "icon-solar_fridge-outline", name: "Refrigerator", available: camper.refrigerator },
  { id: "icon-lucide_microwave", name: "Microwave", available: camper.microwave },
  { id: "icon-hugeicons_gas-stove", name: "Gas", available: camper.gas },
  { id: "icon-ion_water-outline", name: "Water", available: camper.water },
];


  return (
    <article className={styles.card}>
      <img
        src={camper.gallery[0].original}
        alt={camper.name}
        className={styles.image}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <h2>{camper.name}</h2>
          <span className={styles.price}>€{camper.price}.00</span>
        </div>

        {/* Серце */}
        <button
          className={styles.favorite}
          onClick={toggleFavorite}
          aria-label="Toggle Favorite"
        >
          <SpriteIcon
            id="icon-heart"
            fill={isFavorite ? "#E44848" : "#000"}
            className={styles.heartIcon}
          />
        </button>

        {/* Рейтинг */}
        <div className={styles.rating}>
          <span className={styles.stars}>
  <SpriteIcon id="icon-star" className={styles.icon} fill="#F2C94C" />
</span>
          <span className={styles.ratingValue}>{averageRating.toFixed(1)}</span>
          <span className={styles.reviews}>({camper.reviews.length} Reviews)</span>
        </div>

        <p className={styles.location}>{camper.location}</p>

        <p className={styles.description}>
          {camper.description.slice(0, 120)}...
        </p>

        {/* Features */}
     <div className={styles.features}>
  {featuresList
    .filter((f) => f.available)
    .map((f, index) => (
      <span key={index} className={styles.feature}>
        <SpriteIcon id={f.id} className={styles.icon} />
        {f.name}
      </span>
    ))}
</div>


        <Link href={`/catalog/${camper.id}`} className={styles.button}>
          Show more
        </Link>
      </div>
    </article>
  );
}
