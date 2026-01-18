"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./CamperCard.module.css";
import { Camper } from "@/types/camper";
import { useFavoritesStore } from "@/store/favoritesStore";

interface SpriteIconProps {
  id: string;
  className?: string;
  fill?: string;
}

function SpriteIcon({ id, className, fill }: SpriteIconProps) {
  return (
    <svg className={className} fill={fill || "currentColor"} aria-hidden="true">
      <use xlinkHref={`/sprite/sprite.svg#${id}`} />
    </svg>
  );
}

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(camper.id));

  const averageRating =
    camper.reviews?.length > 0
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

  const firstImage = camper.gallery?.length
    ? (() => {
        const img = camper.gallery[0] as string | { url?: string; original?: string };
        return typeof img === "string"
          ? img
          : img.original || img.url || "/images/placeholder.png";
      })()
    : "/images/placeholder.png";

  return (
    <article className={styles.card}>
      <Image
        src={firstImage}
        alt={camper.name}
        className={styles.image}
         width={292}
  height={320}
      />

      <div className={styles.content}>
        <header className={styles.header}>
          <h2>{camper.name}</h2>

          <div className={styles.grope}>
            <p className={styles.price}>€{camper.price}.00</p>

            <button
              className={styles.favorite}
              onClick={() => toggleFavorite(camper)}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <SpriteIcon
                id="icon-heart"
                fill={isFavorite ? "#E44848" : "#000"}
                className={styles.heartIcon}
              />
            </button>
          </div>
        </header>

        <div
          className={styles.ratingBlock}
          aria-label={`Rating ${averageRating.toFixed(1)} out of 5`}
        >
          <div className={styles.rating}>
            <SpriteIcon id="icon-star" className={styles.icon} fill="#F2C94C" />
            <span>{averageRating.toFixed(1)}</span>
            <span>({camper.reviews?.length || 0} Reviews)</span>
          </div>

          <div className={styles.locationBlock}>
            <SpriteIcon id="icon-Map-1" className={styles.locationIcon} />
            <span>{camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>
          {camper.description?.slice(0, 120)}...
        </p>

        <ul className={styles.features}>
          {featuresList
            .filter((f) => f.available)
            .map((f) => (
              <li key={f.id} className={styles.feature}>
                <SpriteIcon id={f.id} className={styles.icon} />
                {f.name}
              </li>
            ))}
        </ul>

        <Link href={`/catalog/${camper.id}`} className={styles.button}>
          Show more
        </Link>
      </div>
    </article>
  );
}