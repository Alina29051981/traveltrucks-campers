"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useCampersStore } from "@/store/campersStore";
import Gallery from "@/components/Gallery/Gallery";
import Features from "@/components/Features/Features";
import Reviews from "@/components/ReviewsList/ReviewsList";
import styles from "./DetailsPage.module.css";

export default function DetailsPage() {
  const params = useParams();
  const { campers } = useCampersStore();
  const [activeTab, setActiveTab] = useState<"features" | "reviews">("features");

  const camper = campers.find(c => c.id === params.id);

  if (!camper) return <p className={styles.message}>Camper not found</p>;

  const averageRating =
    camper.reviews && camper.reviews.length > 0
      ? camper.reviews.reduce((sum, r) => sum + r.reviewer_rating, 0) / camper.reviews.length
      : 0;

  return (
    <main className={styles.page}>
      {/* Назва */}
      <h1 className={styles.title}>{camper.name}</h1>

      {/* Рейтинг + Локація */}
      <div className={styles.ratingLocation}>
        <div className={styles.rating}>
          <span className={styles.stars}>⭐</span>
          <span className={styles.ratingValue}>{averageRating.toFixed(1)}</span>
          <span className={styles.reviews}>({camper.reviews?.length || 0} Reviews)</span>
        </div>
        <p className={styles.location}>{camper.location}</p>
      </div>

      {/* Ціна */}
      <p className={styles.price}>€{camper.price}.00</p>

      {/* Галерея */}
      <Gallery gallery={camper.gallery || []} />

      {/* Опис */}
      <p className={styles.description}>{camper.description}</p>

      {/* Двоколонкова частина: Ліва = таби, Права = Book now */}
      <div className={styles.detailsLayout}>
        {/* Ліва колонка: вкладки */}
        <div className={styles.leftColumn}>
          {/* Таби */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "features" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "reviews" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {/* Контент вкладки */}
          <div className={styles.tabContent}>
            {activeTab === "features" && <Features features={camper.features || []} camper={camper} />}
            {activeTab === "reviews" && <Reviews reviews={camper.reviews || []} />}
          </div>
        </div>

        {/* Права колонка: Book now */}
        <div className={styles.rightColumn}>
          <button className={styles.bookBtn}>Book now</button>
        </div>
      </div>
    </main>
  );
}
